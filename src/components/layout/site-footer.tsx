import Link from "next/link";
import { FacebookIcon, InstagramIcon } from "@/components/ui/social-icons";
import {
  aboutNav,
  legalNav,
  primaryNav,
  siteConfig,
  socialLinks,
} from "@/lib/site-config";
import { RattanDivider } from "@/components/ui/rattan-divider";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-surface-border bg-black">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <RattanDivider className="mb-12" />

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-lg text-white">
              {siteConfig.name}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              {siteConfig.tagline}
            </p>
            <div className="mt-4 flex gap-4">
              {socialLinks.facebook ? (
                <a
                  href={socialLinks.facebook}
                  aria-label="Facebook"
                  className="text-text-muted hover:text-red-core"
                >
                  <FacebookIcon className="h-5 w-5" />
                </a>
              ) : null}
              {socialLinks.instagram ? (
                <a
                  href={socialLinks.instagram}
                  aria-label="Instagram"
                  className="text-text-muted hover:text-red-core"
                >
                  <InstagramIcon className="h-5 w-5" />
                </a>
              ) : null}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-white">Explore</p>
            <ul className="mt-3 space-y-2 text-sm text-text-muted">
              {primaryNav.slice(0, 5).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium text-white">About</p>
            <ul className="mt-3 space-y-2 text-sm text-text-muted">
              {aboutNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium text-white">Contact</p>
            <ul className="mt-3 space-y-2 text-sm text-text-muted">
              <li>
                <a
                  href={siteConfig.contact.phoneHref}
                  className="hover:text-white"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-white"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                {siteConfig.contact.address.line1}
                <br />
                {siteConfig.contact.address.city},{" "}
                {siteConfig.contact.address.state}{" "}
                {siteConfig.contact.address.zip}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-surface-border pt-6 text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
