# Piura: eternal summer between two coasts

Piura's advantage is not a bigger catalog but a point of view it already owns: Miami gives it energy, Peru gives it memory, water connects the two. The bikini is the physical expression of that world. This concept makes the premise legible, then gets out of the way of the product.

The customer problem is confidence. She cannot try the suit on through a screen, so the interface must answer the fitting-room questions before checkout: how much coverage, how adjustable, will it hold, what size, which top belongs with which bottom. The UX thesis follows: fall in love with the world, understand the fit, build the right set, and buy without the interface getting louder than the photography.

## How the home page reads

Each section has its own structure and one job.

1. **Hero.** Piura's own line, "A love letter to the water", over the shoreline film and a single button. An art-directed poster loads first; the loop only on screen, never for reduced-motion or save-data users.
2. **Just dropped.** An index line (number, title, count, link), one editorial photograph, four honest product cards.
3. **The Signature Triangle.** The commerce centre. Print, top size and bottom size on one panel, one action adds both. The set price is the two prices added, nothing invented.
4. **Fit is everything.** Three large letters, A, B, C, carry the measurements, the between-sizes guidance and a button into the fit guide, which the header offers on every page.
5. **Meet the collection.** The title sits inside the grid; Sunchild, Moonchild and the Classics take the other three cells, staggered.
6. **The city of eternal heat.** Heritage on deep water: a chapter index, the founder's own words, a lead photograph and a small one.
7. **Worn by real women.** Piura's line and its candid golden-hour images as a contact strip.
8. **Piura on the runway.** A still with a play control and a filmstrip of real frames.
9. **Confident. Effortless. Free.** Centred, then Coastlines, its name running across the seam into the finale photograph, and the waitlist.

## Fit as a system

Every product page opens with *Fit at a glance*: silhouette, coverage, adjustability, support and lining from the fit notes Piura already writes, plus the two facts stated on every page (true to size, model wears S). Sold-out sizes stay visible, struck through. The published between-sizes line sits under the chips. The fit guide drawer carries the chart, how to measure, and a matcher that only looks numbers up in that chart: tops follow the bust row, bottoms take the larger of waist and hips. The size chart made quicker to read, not a recommendation engine.

## Sets as the shopping unit

Every piece has a designed partner. The product page shows it with its own size selector and one *Add the set* action; the bag suggests the partner of whatever was just added, pre-set to the same size when it exists. Only the four Signature Triangle pieces are labelled *Designed as one*, because Piura says so.

## Visual system

The palette is sampled from Piura's photography: sun-washed ivory, warm sand, wet-ink brown, deep water for dark chapters, a restrained ember. Photography carries the colour. Two type families: Archivo, wide with a true italic, for display; Instrument Sans for everything else. Motion is limited to reveals, image masks, hover crossfades and drawers, off under reduced motion.

## What was refused

No invented model measurements, founder name, fabric claims, shipping times, stock counts, reviews, awards or discounts. No urgency copy. No autoplaying 26 MB video. No animation or UI libraries. Where the site publishes no fact, the interface stays quiet.

## Engineering

Next.js 16, server components by default, small client islands. Route groups give editorial pages a floating header, shopping pages a solid one. Tokens in one global stylesheet, component styles as CSS Modules. Reveals are one attribute on the semantic element, observed once from the layout: no wrappers, no inline styles, content visible without JavaScript. Catalog and image manifest are generated from the storefront snapshot. Product JSON-LD with an offer per size, generated sitemap and robots, native disclosures and progress, radio-group sizes, focus management in drawers, a skip link.
