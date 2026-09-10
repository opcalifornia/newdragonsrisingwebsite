import { NextResponse } from "next/server";
import * as z from "zod";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { getProductBySlug } from "@/lib/data/products";
import { getModuleBySlug } from "@/lib/data/modules";
import { getOptionalSession } from "@/lib/auth/dal";

const CartRequestSchema = z.object({
  type: z.literal("cart"),
  items: z
    .array(
      z.object({
        slug: z.string(),
        variant: z.string().optional(),
        quantity: z.number().int().min(1).max(50),
      }),
    )
    .min(1),
});

const ModuleRequestSchema = z.object({
  type: z.literal("module"),
  moduleSlug: z.string(),
});

const RequestSchema = z.discriminatedUnion("type", [CartRequestSchema, ModuleRequestSchema]);

/**
 * Creates a Stripe Checkout Session and returns its URL for the client
 * to redirect to. Prices are always resolved server-side from the
 * trusted catalog (src/lib/data/*) — a request never dictates its own
 * price, which matters once real money is involved.
 *
 * Returns 503 when Stripe isn't configured (no STRIPE_SECRET_KEY in
 * this environment) rather than a generic 500, so the client can show
 * "payment not connected" instead of an opaque error.
 */
export async function POST(request: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      { error: "not_configured", message: "Payment processing is not connected yet." },
      { status: 503 },
    );
  }

  const stripe = getStripe()!;
  const body = await request.json().catch(() => null);
  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const session = await getOptionalSession();
  // Derived from the incoming request, not siteConfig.url (which is the
  // eventual production domain) — this way redirects land back on
  // whatever's actually serving the request: localhost in dev, the
  // Vercel preview URL, or production, with no extra env var needed.
  const baseUrl = new URL(request.url).origin;

  let lineItems: {
    price_data: {
      currency: string;
      product_data: { name: string };
      unit_amount: number;
    };
    quantity: number;
  }[];
  let metadata: Record<string, string>;
  let successPath: string;

  if (parsed.data.type === "module") {
    const m = getModuleBySlug(parsed.data.moduleSlug);
    if (!m) {
      return NextResponse.json({ error: "unknown_module" }, { status: 404 });
    }
    if (!session) {
      return NextResponse.json({ error: "auth_required" }, { status: 401 });
    }
    lineItems = [
      {
        price_data: {
          currency: "usd",
          product_data: { name: m.title },
          unit_amount: Math.round(m.priceUsd * 100),
        },
        quantity: 1,
      },
    ];
    metadata = { type: "module", moduleSlug: m.slug, userId: session.userId };
    successPath = `/modules/${m.slug}`;
  } else {
    const resolved = parsed.data.items.map((item) => {
      const product = getProductBySlug(item.slug);
      if (!product) throw new Error(`Unknown product: ${item.slug}`);
      return { product, item };
    });

    lineItems = resolved.map(({ product, item }) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.variant ? `${product.name} (${item.variant})` : product.name,
        },
        unit_amount: Math.round(product.priceUsd * 100),
      },
      quantity: item.quantity,
    }));
    metadata = {
      type: "cart",
      userId: session?.userId ?? "",
      items: JSON.stringify(
        resolved.map(({ product, item }) => ({
          name: product.name,
          variant: item.variant ?? null,
          quantity: item.quantity,
          priceUsd: product.priceUsd,
        })),
      ),
    };
    successPath = "/checkout/success";
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    metadata,
    success_url: `${baseUrl}${successPath}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/cart`,
  });

  return NextResponse.json({ url: checkoutSession.url });
}
