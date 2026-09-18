/**
 * Brand copy and facts used across the concept. Everything quoted here is
 * taken from piuraswim.com; see docs/SOURCE_NOTES.md for the page each line
 * comes from. Section framing (eyebrows, chapter labels) is ours.
 */

import type { CollectionKey } from './products';

export const BRAND = {
  name: 'Piura Swim',
  wordmark: 'Piura',
  descriptor: 'Swim',
  origin: 'Designed in Miami. Crafted in Peru.',
  originLong: 'Designed in Miami. Crafted in Peru, the city of eternal heat.',
  coordinates: '5°12′ S · Piura, Perú',
  instagram: 'https://www.instagram.com/piuraswim',
  instagramHandle: '@piuraswim',
} as const;

export const NAV = [
  { href: '/shop', label: 'Shop' },
  { href: '/shop?filter=sets', label: 'Sets' },
  { href: '/story', label: 'Story' },
  { href: '/waitlist', label: 'Waitlist' },
] as const;

export const SERVICE = {
  freeShippingThreshold: 100,
  shipping: 'Free US shipping on orders over $100.',
  exchanges: 'Easy exchanges. 14-day, hassle-free.',
  exchangesLong: "Easy exchanges. If the fit isn't right, write to us and we'll make it right.",
  sizes: 'True to size, Small through X-Large.',
  fabric: 'Luxury fabric, crafted in Peru.',
} as const;

export const HERO = {
  eyebrow: 'Nº 01 · Eternal Heat',
  title: ['A love letter', 'to the water.'],
  body: 'Timeless, flattering bikinis for the women who feel most alive near the water. Designed in Miami. Crafted in Peru.',
  primary: { href: '/shop', label: 'Shop the collection' },
  secondary: { href: '/product/sunchild-triangle-top', label: 'The Signature Triangle' },
} as const;

export const COLLECTIONS: Record<CollectionKey, { title: string; short: string; blurb: string }> = {
  sunchild: {
    title: 'The Sunchild print',
    short: 'Sunchild',
    blurb: 'The signature Piura pattern, in triangle, bandeau and mesh cuts.',
  },
  moonchild: {
    title: 'The Moonchild print',
    short: 'Moonchild',
    blurb: 'The signature pattern in its cooler register. The perfect blend of statement and simplicity.',
  },
  classics: {
    title: 'The Classics',
    short: 'Classics',
    blurb: 'Solid colour pieces with side ties, scrunch backs and mesh detailing. Bella, Bali, Sara and Marina.',
  },
};

export const SIGNATURE_SET = {
  eyebrow: 'The signature set',
  title: ['The Signature', 'Triangle.'],
  body: "The set that started it all, and the one we've spent the most time perfecting. From the flattering, cheeky fit to the proportions of the top, top and bottom are designed as one: a timeless set that becomes the one you pack for every trip.",
  tagline: 'Top + bottom, designed as one',
  topHandles: { sunchild: 'sunchild-triangle-top', moonchild: 'moonchild-triangle-top' },
  bottomHandles: { sunchild: 'sunchild-triangle-bottom', moonchild: 'moonchild-triangle-bottom' },
} as const;

export const HERITAGE = {
  eyebrow: 'Our heritage',
  title: ['The city of', 'eternal heat.'],
  body: "Every piece is crafted in Peru, where our founder's story begins. The bikinis her grandmother sent from Peru were flattering, unlike anything she could find in the U.S. Every Piura piece carries that inheritance: warmth, the ocean, and the endless-summer feeling of living by the water.",
  chapters: [
    {
      key: 'miami',
      index: 'I',
      place: 'Miami',
      title: 'Practically raised in a bikini.',
      quote:
        'Growing up in Miami, my family spent almost every weekend at the beach, so I practically grew up in a bikini. My favorite bikinis were always the ones my grandma would bring me from Peru. They were flattering, unique, and unlike anything I could find in the U.S.',
    },
    {
      key: 'peru',
      index: 'II',
      place: 'Piura, Perú',
      title: 'Piura, the city of eternal heat.',
      quote:
        "Piura is a coastal city in northern Peru known as the 'City of Eternal Heat.' Since my bikinis were inspired by Peru and originally made there, the name felt like the perfect fit.",
    },
    {
      key: 'now',
      index: 'III',
      place: 'Between two coasts',
      title: 'More than a swimwear brand.',
      quote:
        "Inspired by my roots in Peru and life in Miami, Piura became more than a swimwear brand. It's a celebration of endless summers, iconic coastlines, and the confidence that comes from putting on a bikini you truly feel amazing in.",
    },
  ],
  attribution: 'The founder',
} as const;

export const STORY_LONGFORM = {
  miami: [
    'Growing up in Miami, my family spent almost every weekend at the beach, so I practically grew up in a bikini. My favorite bikinis were always the ones my grandma would bring me from Peru. They were flattering, unique, and unlike anything I could find in the U.S.',
    "As I got older, I realized I still couldn't find bikinis that felt timeless, feminine, and flattering in the way I wanted. Most styles felt too bulky or simply weren't my style, so I always found myself ordering swimwear from overseas. That's when I knew one day I wanted to create my own.",
    'Years later, after building a following on social media and helping promote so many other brands, I realized it was finally time to bet on myself. I saved up the money I earned bartending and poured everything into starting Piura, despite having no idea what I was doing. I just knew the only way to make my dream happen was to start.',
  ],
  peru: [
    "Piura is a coastal city in northern Peru known as the 'City of Eternal Heat.' Since my bikinis were inspired by Peru and originally made there, the name felt like the perfect fit.",
    "To me, Piura represents warmth, the ocean, and that endless summer feeling I wanted the brand to capture. It reminds me of where I come from while representing the life I've always loved, living by the water. The name always felt like it was meant to be.",
  ],
  now: [
    "Inspired by my roots in Peru and life in Miami, Piura became more than a swimwear brand. It's a celebration of endless summers, iconic coastlines, and the confidence that comes from putting on a bikini you truly feel amazing in.",
    'My hope is that every woman who wears Piura feels confident, beautiful, and ready to collect memories and embrace every adventure.',
  ],
} as const;

export const REAL_WOMEN = {
  eyebrow: 'Worn by real women',
  quote: ["I've never felt", 'this good', 'in a bikini.'],
  caption: 'The sentence we hear most',
  note: 'Golden hour, candid, never over-edited.',
  tag: 'Tag @piuraswim to be featured.',
} as const;

export const RUNWAY = {
  eyebrow: 'Miami Swim Week',
  title: ['Piura on', 'the runway.'],
  caption: 'Swim Week 2026 · Miami',
} as const;

export const MANIFESTO = {
  title: ['Confident. Effortless.', 'Free.'],
  body: 'Piura is a reminder to collect memories, wear confidence, and feel your best through every destination.',
} as const;

export const COASTLINES = {
  eyebrow: 'The next drop',
  name: 'Coastlines.',
  body: 'As seen at Swim Week 2026. Cut in small numbers. Join the waitlist to shop the collection first.',
  access: '24-hour early access to preorder the next drop before it goes live.',
  accessLong: 'Waitlist members receive private access one day before the collection goes live.',
  formNote: "Add your number if you'd like a text when access opens.",
} as const;

export const FOOTER_CAPTURE = {
  eyebrow: 'The waitlist',
  title: ['First access to new drops,', 'before anyone else.'],
} as const;
