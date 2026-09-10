import "server-only";

/**
 * ⚠️ PLACEHOLDER DATA STORE — same in-memory caveats as mock-db.ts and
 * enrollment-db.ts. Records completed shop orders so /account can show
 * real order history once a user has actually paid via Stripe.
 */

export type Order = {
  id: string;
  userId: string | null;
  stripeSessionId: string;
  items: { name: string; variant?: string; quantity: number; priceUsd: number }[];
  totalUsd: number;
  createdAt: string;
};

type OrdersDb = { orders: Map<string, Order> };

const globalForDb = globalThis as unknown as { __ndrOrdersDb?: OrdersDb };

const db: OrdersDb = globalForDb.__ndrOrdersDb ?? { orders: new Map() };
if (process.env.NODE_ENV !== "production") {
  globalForDb.__ndrOrdersDb = db;
}

export async function recordOrder(order: Omit<Order, "id" | "createdAt">): Promise<Order> {
  const full: Order = {
    ...order,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  db.orders.set(full.id, full);
  return full;
}

export async function getOrdersForUser(userId: string): Promise<Order[]> {
  return [...db.orders.values()]
    .filter((o) => o.userId === userId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getOrderByStripeSessionId(sessionId: string): Promise<Order | null> {
  for (const order of db.orders.values()) {
    if (order.stripeSessionId === sessionId) return order;
  }
  return null;
}
