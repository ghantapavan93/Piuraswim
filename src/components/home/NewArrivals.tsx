import Image from 'next/image';
import Link from 'next/link';
import { ProductCard } from '@/components/product/ProductCard';
import { Icon } from '@/components/ui/Icon';
import { JUST_DROPPED } from '@/data/catalog';
import { NEW_ARRIVALS } from '@/data/site';
import { image } from '@/lib/image';
import styles from './NewArrivals.module.css';

/** New arrivals as an index line and a grid, not another headline stack. */
export function NewArrivals() {
  const editorial = image('lifestyle/life-68.jpg');

  return (
    <section className="section" aria-labelledby="new-arrivals-title">
      <div className="container">
        <header className={styles.index} data-reveal="fade">
          <span className={`${styles.number} label accent`}>{NEW_ARRIVALS.index}</span>
          <h2 id="new-arrivals-title" className={`${styles.title} display display-md`}>
            {NEW_ARRIVALS.title[0]} <em>{NEW_ARRIVALS.title[1]}</em>
          </h2>
          <span className={`${styles.count} label`}>{NEW_ARRIVALS.count}</span>
          <Link href="/shop?filter=sets" className={`${styles.link} text-link`}>
            Shop the sets
            <Icon name="arrow" />
          </Link>
        </header>

        <div className={styles.grid}>
          <figure className={styles.editorial} data-reveal="mask">
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

          <div className={styles.products}>
            {JUST_DROPPED.map((product, index) => (
              <ProductCard key={product.handle} product={product} stagger={index} />
            ))}
            <p className={styles.note}>{NEW_ARRIVALS.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
