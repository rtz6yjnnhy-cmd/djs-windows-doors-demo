import { business } from "./content";

// Public URL of the deployed site (GitHub Pages project site). Used for
// canonical links, Open Graph, sitemap, robots and structured data.
export const SITE_URL = "https://rtz6yjnnhy-cmd.github.io/djs-windows-doors-demo";

export const site = {
  name: business.name,
  shortName: "DJ's Windows & Doors",
  title: "DJ's Windows and Doors Installation LLC | Windows & Doors in Atlanta, GA",
  description:
    "Window and door replacement, sales and installation in Metro Atlanta and across Georgia. Entry doors, patio doors and replacement windows, installed right. Request a free quote.",
  ogImage: "og-image.jpg",
  ogImageAlt: "DJ's Windows & Doors logo with a new arched window and a navy entry door installed by DJ's",
};

// schema.org HomeAndConstructionBusiness. Only facts the site states:
// no street address or hours until the client confirms them.
export const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": `${SITE_URL}/#business`,
  name: business.name,
  alternateName: site.shortName,
  slogan: "Installed right.",
  description: site.description,
  url: `${SITE_URL}/`,
  telephone: "+1-470-659-8625",
  logo: `${SITE_URL}/icons/icon-512.png`,
  image: `${SITE_URL}/${site.ogImage}`,
  areaServed: [
    { "@type": "City", name: "Atlanta", containedInPlace: { "@type": "State", name: "Georgia" } },
    { "@type": "AdministrativeArea", name: "Metro Atlanta" },
    { "@type": "State", name: "Georgia" },
  ],
  knowsAbout: ["Window replacement", "Window installation", "Entry door installation", "Patio door installation"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Windows and doors",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Window replacement & installation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Entry & patio door installation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Window & door sales" } },
    ],
  },
};
