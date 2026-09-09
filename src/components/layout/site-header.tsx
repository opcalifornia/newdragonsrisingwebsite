"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { primaryNav, siteConfig } from "@/lib/site-config";
import { LogoMark } from "@/components/ui/logo-mark";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

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

        <div className="hidden lg:block">
          <Link
            href="/join"
            className="rounded-sm border border-red-core px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-core"
          >
            Join
          </Link>
        </div>

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
