export const siteConfig = {
  name: "New Dragons Rising",
  shortName: "NDR",
  tagline: "Unleash Your Potential",
  description:
    "New Dragons Rising is a Filipino martial arts association in Stockton, CA, founded by Grandmaster Rudy Torres, teaching Escrima, Arnis, and Kali through the Mestizo Method.",
  url: "https://www.newdragonsrising.com",
  contact: {
    phone: "(209) 507-9630",
    phoneHref: "tel:+12095079630",
    email: "newdragonsrisingtek@gmail.com",
    address: {
      line1: "2614 East Poplar Street",
      city: "Stockton",
      state: "CA",
      zip: "95205",
    },
  },
} as const;

/**
 * TODO: the client's old Wix site links these icons to Wix's own template
 * accounts (facebook.com/wix, instagram.com/wix) instead of NDR's real
 * profiles. Do not ship these as-is — replace with the real NDR social
 * URLs before launch. Left null so the footer can hide an icon rather
 * than link somewhere wrong.
 */
export const socialLinks = {
  facebook: null as string | null, // TODO: real NDR Facebook URL
  instagram: null as string | null, // TODO: real NDR Instagram URL
};

export const primaryNav = [
  { label: "About", href: "/about" },
  { label: "Instructors", href: "/instructors" },
  { label: "Training Modules", href: "/modules" },
  { label: "Shop", href: "/shop" },
  { label: "Seminars & Events", href: "/seminars" },
  { label: "Blog", href: "/blog" },
  { label: "Book Online", href: "/book-online" },
  { label: "Contact", href: "/contact" },
] as const;

export const aboutNav = [
  { label: "The Association", href: "/about" },
  { label: "The Mestizo Method", href: "/about/mestizo-method" },
  { label: "Lineage", href: "/about/lineage" },
  { label: "In Memoriam: Rudy Torres Jr.", href: "/about/in-memoriam" },
] as const;

export const legalNav = [
  { label: "Privacy Policy", href: "/legal/privacy-policy" },
  { label: "Terms & Conditions", href: "/legal/terms-and-conditions" },
  { label: "Refund Policy", href: "/legal/refund-policy" },
  { label: "Shipping Policy", href: "/legal/shipping-policy" },
  { label: "Liability Waiver", href: "/legal/liability-waiver" },
  { label: "Accessibility Statement", href: "/legal/accessibility-statement" },
] as const;
