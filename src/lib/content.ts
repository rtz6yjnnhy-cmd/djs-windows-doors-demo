// Demo content. Photos are real DJ's jobs (public/images/work, optimized from
// public/images/real). The email is still a placeholder until DJ's confirms
// theirs; confirm every claim with the client before going live.

import { asset } from "./asset";

export const business = {
  name: "DJ's Windows and Doors Installation LLC",
  phone: "(470) 659-8625",
  phoneHref: "tel:+14706598625",
  email: "quotes@djswindowsanddoors.com",
  hours: "Mon–Sat · 7am–6pm",
};

export const nav = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Projects", href: "#projects" },
  { label: "Service Area", href: "#area" },
  { label: "Contact", href: "#contact" },
];

// Windows and doors get identical structure and weight on the page.
export const productLines = [
  {
    code: "Windows",
    title: "Window Replacement & Installation",
    text: "New and replacement windows measured to the opening, set plumb, level and square, then flashed and sealed against Georgia heat and storms.",
    types: ["Double-hung", "Casement", "Sliding", "Picture", "Bay & bow"],
    image: asset("/images/work/arched-window-new.jpg"),
    alt: "New white arched-top window with grids set in a brick wall",
  },
  {
    code: "Doors",
    title: "Entry & Patio Door Installation",
    text: "Entry, patio and French doors hung to swing true, slide smooth and lock tight, with weatherstripping and trim finished to match the house.",
    types: ["Entry", "Patio sliding", "French", "Storm", "Garage entry"],
    image: asset("/images/work/red-entry-door.jpg"),
    alt: "Red entry door with glass sidelites on a gray-sided porch",
  },
];

export const supportServices = [
  {
    title: "Replacement & retrofit",
    text: "Old, drafty windows and doors out; efficient ones in, with the opening checked and squared first.",
  },
  {
    title: "Window & door sales",
    text: "Buy the product direct, with straight advice on what fits your home, and have it installed by the same crew.",
  },
];

export const processSteps = [
  {
    title: "Measure",
    text: "Every opening measured and the window or door specified before anything comes out.",
  },
  {
    title: "Remove",
    text: "The old unit comes out clean, and the opening is checked for rot, level and square.",
  },
  {
    title: "Install",
    text: "The new window or door is set plumb, level and square, and fastened to spec.",
  },
  {
    title: "Seal & finish",
    text: "Flashed, insulated and sealed, then trimmed so it looks like it was always there.",
  },
];

export const reasons = [
  {
    title: "One crew, start to finish",
    text: "The people who measure your windows and doors are the people who install them. No hand-offs, no surprises.",
  },
  {
    title: "Sealed for Georgia weather",
    text: "Flashing, insulation and sealant done properly, because humidity and summer storms find every shortcut.",
  },
  {
    title: "Windows and doors in one quote",
    text: "Buy the product and the installation in one place, with one price and one point of contact.",
  },
  {
    title: "Based in Metro Atlanta",
    text: "Close enough to come back when you need us, and we travel statewide for larger projects.",
  },
];

export const stats = [
  { value: 1, suffix: "", label: "Crew from measure to clean-up" },
  { value: 1, suffix: "", label: "Quote for windows and doors" },
  { value: 100, suffix: "%", label: "Free, no-pressure quotes" },
];

// Real before/after pairs, cropped so the same opening lines up in both photos.
export const projects = [
  {
    id: "01",
    title: "Arched window replacement",
    spec: "Arched-top window with grids · brick front",
    before: asset("/images/work/ba-arch-before.jpg"),
    after: asset("/images/work/ba-arch-after.jpg"),
    beforeLabel: "Before",
    alt: "arched window in a brick wall",
  },
  {
    id: "02",
    title: "Entry door, sidelites & transom",
    spec: "Entry door · 2 sidelites · half-round transom",
    before: asset("/images/work/ba-entry-before.jpg"),
    after: asset("/images/work/ba-entry-after.jpg"),
    beforeLabel: "Before",
    alt: "entry door with an oval glass, two sidelites and a half-round transom, seen from inside",
  },
  {
    id: "03",
    title: "Arched window, mid-install to finished",
    spec: "Arched window over 3-lite picture unit",
    before: asset("/images/work/ba-install-before.jpg"),
    after: asset("/images/work/ba-install-after.jpg"),
    beforeLabel: "During",
    alt: "tall arched window over a three-lite picture window in a brick gable",
  },
];

export const gallery = [
  { image: asset("/images/work/entry-door-stone.jpg"), alt: "White entry door with oval glass, sidelites and a half-round transom in a stone front", caption: "Entry door & transom" },
  { image: asset("/images/work/french-patio-doors.jpg"), alt: "White French patio doors with full glass on a back deck", caption: "French patio doors" },
  { image: asset("/images/work/arched-window-finished.jpg"), alt: "Finished arched window over a three-lite unit in a red brick gable", caption: "Arched window, finished" },
  { image: asset("/images/work/entry-door-interior.jpg"), alt: "New entry door with leaded oval glass and sidelites, seen from the foyer", caption: "Entry door, from the foyer" },
  { image: asset("/images/work/arched-windows-evening.jpg"), alt: "Three arched windows glowing warm at dusk behind a hedge", caption: "Arched windows at dusk" },
  { image: asset("/images/work/navy-entry-door.jpg"), alt: "Navy blue entry door with half glass and sidelites in a brick entry", caption: "Navy entry door" },
];

export const heroPhotos = [
  { image: asset("/images/work/hero-arched-windows.jpg"), alt: "Arched windows glowing warm at dusk", caption: "Windows" },
  { image: asset("/images/work/hero-navy-door.jpg"), alt: "Navy entry door with half glass and sidelites", caption: "Doors" },
];

// Sample reviews for the demo; must be replaced with real ones.
export const testimonials = [
  {
    quote: "New windows and a new front door in two days. The house is quieter and the crew left it cleaner than they found it.",
    who: "Homeowner · Marietta",
  },
  {
    quote: "They measured twice, showed up when they said, and the new patio door slides like it weighs nothing.",
    who: "Homeowner · Decatur",
  },
  {
    quote: "Bought the windows and the doors and the install in one place. One quote, one phone number, no runaround.",
    who: "Homeowner · Alpharetta",
  },
];

export const metroCities = [
  "Atlanta", "Marietta", "Alpharetta", "Roswell", "Sandy Springs", "Decatur",
  "Smyrna", "Kennesaw", "Dunwoody", "Lawrenceville", "Duluth", "Peachtree City",
  "Johns Creek", "Stone Mountain", "McDonough", "Douglasville",
];

export const otherRegions = "North Georgia · Athens · Augusta · Macon · Columbus · Savannah & the coast";
