import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import type { CollectionKey } from '@/data/catalog';
import { COLLECTIONS } from '@/data/site';
import { image, type ImageKey } from '@/lib/image';
import styles from './CollectionStory.module.css';

const TILES: { key: CollectionKey; imageKey: ImageKey; alt: string }[] = [
  { key: 'sunchild', imageKey: 'lifestyle/life-64.jpg', alt: 'The Sunchild print at the beach' },
  { key: 'moonchild', imageKey: 'lifestyle/life-22.jpg', alt: 'The Moonchild print worn on a boat' },
  { key: 'classics', imageKey: 'lifestyle/life-37.jpg', alt: 'A Classics bikini above a rocky cove' },
];

export function CollectionStory() {
  return (
    <section className="section on-sand" aria-labelledby="collection-title">
      <div className="container">
        <Reveal className={styles.head}>
          <h2 id="collection-title" className="display display-lg">
            Meet <em>the collection.</em>
          </h2>
          <Link href="/shop" className="text-link">
            Shop all swim
            <Icon name="arrow" />
          </Link>
        </Reveal>

        <ul className={styles.tiles}>
          {TILES.map((tile, index) => {
            const asset = image(tile.imageKey);
            const collection = COLLECTIONS[tile.key];
            return (
              <Reveal key={tile.key} as="li" delay={index * 110} className={styles.tile}>
                <Link href={`/shop?filter=${tile.key}`} className={styles.link}>
                  <span className={`${styles.frame} frame`}>
                    <Image
                      src={asset.src}
                      alt={tile.alt}
                      width={asset.width}
                      height={asset.height}
                      sizes="(max-width: 719px) 100vw, 33vw"
                    />
                  </span>
                  <span className={styles.row}>
                    <span className={`${styles.title} display display-sm`}>{collection.title}</span>
                    <Icon name="arrow" size={16} className={styles.arrow} />
                  </span>
                  <span className={styles.blurb}>{collection.blurb}</span>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
