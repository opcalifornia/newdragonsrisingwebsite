"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, ShoppingBag, User, X } from "lucide-react";
import { primaryNav, siteConfig } from "@/lib/site-config";
import { LogoMark } from "@/components/ui/logo-mark";
import { useCart } from "@/lib/cart-context";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { count } = useCart();
  const accountHref = isAuthenticated ? "/account" : "/login";
  const pathname = usePathname();

  useEffect(() => {
    // Re-checks on every navigation, not just mount: SiteHeader lives in
    // the shared root layout, so it doesn't remount after a login/logout
    // Server Action redirect — without this the icon could go stale.
    let cancelled = false;
    fetch("/api/session")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setIsAuthenticated(Boolean(data.authenticated));
      })
      .catch(() => {
        // Network hiccup — header just stays in the logged-out state.
      });
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-surface-border bg-black/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 font-display text-lg tracking-wide text-white"
        >
          <LogoMark />
          <span className="hidden sm:inline">{siteConfig.shortName}</span>
        </Link>

        <nav className="hidden lg:flex lg:items-center lg:gap-8">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-text-body transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href={accountHref}
            aria-label={isAuthenticated ? "My Account" : "Log In"}
            className="hidden text-text-body hover:text-white lg:block"
          >
            <User size={20} />
          </Link>

          <Link
            href="/cart"
            aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}
            className="relative hidden text-text-body hover:text-white lg:block"
          >
            <ShoppingBag size={20} />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-core px-1 text-[10px] text-white">
                {count}
              </span>
            )}
          </Link>

          <Link
            href="/join"
            className="hidden rounded-sm border border-red-core px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-core lg:block"
          >
            Join
          </Link>

          <Link href="/cart" aria-label="Cart" className="relative lg:hidden">
            <ShoppingBag size={22} className="text-white" />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-core px-1 text-[10px] text-white">
                {count}
              </span>
            )}
          </Link>

          <button
            type="button"
            className="text-white lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-surface-border bg-black px-4 py-4 lg:hidden">
          <ul className="flex flex-col gap-1">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded px-2 py-3 text-text-body hover:bg-surface hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={accountHref}
                className="block rounded px-2 py-3 text-text-body hover:bg-surface hover:text-white"
                onClick={() => setOpen(false)}
              >
                {isAuthenticated ? "My Account" : "Log In"}
              </Link>
            </li>
            <li>
              <Link
                href="/join"
                className="mt-2 block rounded-sm border border-red-core px-2 py-3 text-center text-white"
                onClick={() => setOpen(false)}
              >
                Join
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
