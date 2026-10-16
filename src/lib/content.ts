// Demo content. The email is still a placeholder until DJ's confirms theirs;
// confirm every claim with the client before going live.

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
  { label: "Why DJ's", href: "#why" },
  { label: "Projects", href: "#projects" },
  { label: "Service Area", href: "#area" },
  { label: "Contact", href: "#contact" },
];

export const services = [
  {
    code: "S—01",
    title: "Window Installation",
    text: "Double-hung, casement, sliding and picture windows, measured to the opening and set plumb, level and square.",
    image: asset("/images/service-window-install.jpg"),
    alt: "Installer fitting a new window frame into an opening",
  },
  {
    code: "S—02",
    title: "Door Installation",
    text: "Entry, patio and French doors hung to swing true, close quiet and lock tight, with the trim finished to match.",
    image: asset("/images/service-door.jpg"),
    alt: "Craftsman porch with a natural wood front door",
  },
  {
    code: "S—03",
    title: "Replacement & Retrofit",
    text: "Old, drafty units out; efficient ones in. Flashed, insulated and sealed so Georgia heat and humidity stay outside.",
    image: asset("/images/service-sealing.jpg"),
    alt: "Close-up of sealant being applied around a window frame",
  },
  {
    code: "S—04",
    title: "Material Sales",
    text: "Windows, doors and installation materials sold direct, with straight advice on what fits your home and budget.",
    image: asset("/images/service-materials.jpg"),
    alt: "Tall black-framed casement windows opened onto greenery",
  },
];

export const reasons = [
  {
    title: "One crew, start to finish",
    text: "The people who measure your openings are the people who install them. No hand-offs, no surprises.",
  },
  {
    title: "Sealed for Georgia weather",
    text: "Flashing, insulation and sealant done properly, because humidity and summer storms find every shortcut.",
  },
  {
    title: "Materials direct from us",
    text: "Buy the product and the installation in one place, with one quote and one point of contact.",
  },
  {
    title: "Statewide service",
    text: "From the North Georgia mountains to the coast. If you're in Georgia, we'll come to you.",
  },
];

export const stats = [
  { value: 159, suffix: "", label: "Georgia counties served" },
  { value: 1, suffix: "", label: "Crew from measure to clean-up" },
  { value: 100, suffix: "%", label: "Free, no-pressure quotes" },
];

export const projects = [
  {
    id: "01",
    title: "Stone & shingle two-story",
    spec: "14 windows · double entry door",
    image: asset("/images/project-stone-dusk.jpg"),
    alt: "Stone and shingle house at dusk with warm light in every window",
  },
  {
    id: "02",
    title: "Craftsman under the maple",
    spec: "11 double-hung · 2 picture windows",
    image: asset("/images/project-maple-craftsman.jpg"),
    alt: "Craftsman home with a red Japanese maple in the front yard",
  },
  {
    id: "03",
    title: "Porch & entry refresh",
    spec: "1 entry door · 4 double-hung",
    image: asset("/images/project-porch-door.jpg"),
    alt: "Front porch with a red entry door and white railings",
  },
];

export const gallery = [
  { image: asset("/images/gallery-pines.jpg"), alt: "Stone house among tall pines at dusk", caption: "Fig. 04 — Among the pines", span: "md:col-span-7", aspect: "aspect-[4/3]" },
  { image: asset("/images/gallery-wood-doors.jpg"), alt: "Carved wood double doors with glass panels", caption: "Fig. 05 — Wood entry", span: "md:col-span-5", aspect: "aspect-[4/5]" },
  { image: asset("/images/gallery-sunroom.jpg"), alt: "Sunroom with wicker furniture and wide windows", caption: "Fig. 06 — Afternoon sunroom", span: "md:col-span-4", aspect: "aspect-[4/5]" },
  { image: asset("/images/gallery-two-story.jpg"), alt: "Two-story craftsman with a front porch", caption: "Fig. 07 — Two-story craftsman", span: "md:col-span-8", aspect: "aspect-[16/10]" },
  { image: asset("/images/gallery-light-floor.jpg"), alt: "Sunlight falling across a hardwood floor", caption: "Fig. 08 — Light on oak", span: "md:col-span-5", aspect: "aspect-[5/4]" },
  { image: asset("/images/gallery-brick-arch.jpg"), alt: "Brick porch arch framed by trees", caption: "Fig. 09 — Brick & arch", span: "md:col-span-7", aspect: "aspect-[16/10]" },
];

// Sample reviews for the demo; must be replaced with real ones.
export const testimonials = [
  {
    quote: "The house is quieter, the rooms hold their temperature, and the crew left the place cleaner than they found it.",
    who: "Homeowner · Metro Atlanta",
  },
  {
    quote: "They measured twice, showed up when they said, and the new patio door slides like it weighs nothing.",
    who: "Homeowner · Coastal Georgia",
  },
  {
    quote: "Bought the windows and the install in one place. One quote, one phone number, no runaround.",
    who: "Homeowner · Middle Georgia",
  },
];

export const regions = [
  { name: "Metro Atlanta", cities: "Atlanta · Marietta · Alpharetta · Decatur" },
  { name: "North Georgia", cities: "Gainesville · Dalton · Blue Ridge · Rome" },
  { name: "Athens & East", cities: "Athens · Augusta · Madison" },
  { name: "Middle Georgia", cities: "Macon · Warner Robins · Milledgeville" },
  { name: "West & South", cities: "Columbus · Albany · Valdosta" },
  { name: "Coastal Georgia", cities: "Savannah · Brunswick · St. Marys" },
];
