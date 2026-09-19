import Image from 'next/image';
import Link from 'next/link';
import { ProductCard } from '@/components/product/ProductCard';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { JUST_DROPPED } from '@/data/catalog';
import { NEW_ARRIVALS } from '@/data/site';
import { image } from '@/lib/image';
import styles from './NewArrivals.module.css';

export function NewArrivals() {
  const editorial = image('lifestyle/life-68.jpg');

  return (
    <section className="section" aria-labelledby="new-arrivals-title">
      <div className="container">
        <header className={styles.head}>
          <Reveal>
            <p className="label accent">{NEW_ARRIVALS.eyebrow}</p>
            <h2 id="new-arrivals-title" className="display display-lg">
              {NEW_ARRIVALS.title[0]} <em>{NEW_ARRIVALS.title[1]}</em>
            </h2>
          </Reveal>
          <Reveal delay={120} className={styles.headAside}>
            <p className={styles.intro}>{NEW_ARRIVALS.body}</p>
            <Link href="/shop?filter=sets" className="text-link">
              Shop the sets
              <Icon name="arrow" />
            </Link>
          </Reveal>
        </header>

        <div className={styles.grid}>
          <Reveal variant="mask" className={styles.editorial}>
            <figure className={styles.figure}>
              <div className="frame">
                <Image
                  src={editorial.src}
                  alt="The Sunchild print worn on the water"
                  width={editorial.width}
                  height={editorial.height}
                  sizes="(max-width: 899px) 100vw, 42vw"
                  quality={85}
                />
              </div>
              <figcaption className="label">The Sunchild print</figcaption>
            </figure>
          </Reveal>

          <div className={styles.products}>
            {JUST_DROPPED.map((product, index) => (
              <ProductCard key={product.handle} product={product} delay={index * 80} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
