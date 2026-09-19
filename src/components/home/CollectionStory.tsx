import { Photo } from '@/components/ui/Photo';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import type { CollectionKey } from '@/data/catalog';
import { COLLECTIONS } from '@/data/site';
import { image, type ImageKey } from '@/lib/image';
import './CollectionStory.css';

const TILES: { key: CollectionKey; index: string; imageKey: ImageKey; alt: string }[] = [
  { key: 'sunchild', index: '01', imageKey: 'lifestyle/life-64.jpg', alt: 'The Sunchild print at the beach' },
  { key: 'moonchild', index: '02', imageKey: 'lifestyle/life-22.jpg', alt: 'The Moonchild print worn on a boat' },
  { key: 'classics', index: '03', imageKey: 'lifestyle/life-37.jpg', alt: 'A Classics bikini above a rocky cove' },
];

/** The three families as one composition: the title takes the first cell of the grid. */
export function CollectionStory() {
  return (
    <section className="section on-sand" aria-labelledby="collection-title">
      <ul className="collection-story container">
        <li className="collection-story__lead" data-reveal="fade">
          <p className="label accent">The collection</p>
          <h2 id="collection-title" className="display display-lg">
            Meet <em>the collection.</em>
          </h2>
          <p className="collection-story__lead-body">Two prints and a family of solids. Every piece has a designed partner.</p>
          <Link href="/shop" className="text-link">
            Shop all swim
            <Icon name="arrow" />
          </Link>
        </li>

        {TILES.map((tile, index) => {
          const asset = image(tile.imageKey);
          const collection = COLLECTIONS[tile.key];
          return (
            <li key={tile.key} className="collection-story__tile" data-reveal="fade" data-reveal-delay={index + 1}>
              <Link href={`/shop?filter=${tile.key}`} className="collection-story__link">
                <span className="collection-story__frame frame">
                  <Photo
                    src={asset.src}
                    alt={tile.alt}
                    width={asset.width}
                    height={asset.height}
                    sizes="(max-width: 719px) 100vw, 25vw"
                  />
                  <span className="collection-story__index label">{tile.index}</span>
                </span>
                <span className="collection-story__row">
                  <span className="collection-story__title display display-sm">{collection.title}</span>
                  <Icon name="arrow" size={16} className="collection-story__arrow" />
                </span>
                <span className="collection-story__blurb">{collection.blurb}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
