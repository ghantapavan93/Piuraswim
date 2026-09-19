# Piura Swim — redesign concept

A UI and UX concept for [piuraswim.com](https://piuraswim.com): Piura's real copy, catalog and photography, rebuilt around one idea (eternal summer between two coasts) and one job (make fit and sets easy to understand before checkout).

Live: https://piuraswim.vercel.app
Thesis: [docs/DESIGN_THESIS.md](docs/DESIGN_THESIS.md) · Sources: [docs/SOURCE_NOTES.md](docs/SOURCE_NOTES.md)

## Routes

| Route | What it proves |
| --- | --- |
| `/` | The editorial home: hero, new arrivals, Signature Triangle set builder, fit, collection, heritage, real women, runway, manifesto, Coastlines waitlist |
| `/shop` | Collection with views (all, sets, tops, bottoms) and prints (Sunchild, Moonchild, Classics); `?filter=` is the only state |
| `/product/[handle]` | Sixteen statically generated product pages: gallery, fit at a glance, sizes with sold-out states, complete the set, published details, mobile sticky buy bar |
| `/size-guide` | Chart, how to measure, a measurement matcher that only reads the chart |
| `/story`, `/waitlist`, `/contact` | Founder story in the founder's words, Coastlines waitlist, contact |

The fit guide and the bag are drawers available on every page.

## Run

```bash
npm install
npm run dev
```

Production check, the same commands CI would run:

```bash
npm run lint && npx tsc --noEmit && npm run build
```

## Structure

```
src/app/
  layout.tsx             fonts, metadata, providers, drawers, reveal observer, Organization JSON-LD
  (editorial)/           home, story, waitlist, contact: header floats over a photographic hero
  (commerce)/            shop, product/[handle], size-guide: solid header
  sitemap.ts, robots.ts  generated from the catalog
  globals.css            tokens, base, primitives (label, display, button, reveal states)
src/components/home/     one component per home section
src/components/product/  gallery, purchase panel, complete-the-set, cards, quick add
src/components/fit/      fit guide drawer, size chart, measurement matcher
src/components/commerce/ bag provider and drawer, waitlist and contact forms
src/components/layout/   announcement bar, header, mobile menu, footer, page hero
src/components/ui/       icon, sun mark, reveal observer, ambient video, size chips
src/components/seo/      JSON-LD script
src/data/                products.ts and image-manifest.ts (generated), fit.ts and site.ts (curated, verified copy)
src/lib/                 bag store, structured data, image lookup, utils
scripts/                 generators: catalog snapshot -> products.ts, public images -> image-manifest.ts
docs/                    design thesis, source notes, raw reference research
public/images/piura/     product, lifestyle and still photography; public/video/ the two hero loops and the runway film
```

Component styles are CSS Modules next to each component; design tokens live once in `globals.css`. Scroll reveals are a `data-reveal` attribute on the semantic element itself, observed once from the layout: no wrapper elements, no inline styles, and nothing is hidden when JavaScript is off.

## Data

`scripts/catalog.json` is a snapshot of the public storefront product data (titles, prices, sizes, availability, descriptions, fit notes, fabric copy). `node scripts/build-products.mjs` turns it into typed data; `node scripts/build-image-manifest.mjs` records the intrinsic size of every image so `<Image>` never causes layout shift. Hand-curated fit language and brand copy live in `src/data/fit.ts` and `src/data/site.ts`, each line traceable in the source notes.

## Not connected

There is no backend. The bag persists in localStorage and the Checkout button says so. Waitlist and contact forms validate and show their confirmation state. Availability is the snapshot taken at build time.
