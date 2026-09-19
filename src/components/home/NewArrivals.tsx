import { Photo } from '@/components/ui/Photo';
import Link from 'next/link';
import { ProductCard } from '@/components/product/ProductCard';
import { Icon } from '@/components/ui/Icon';
import { JUST_DROPPED } from '@/data/catalog';
import { NEW_ARRIVALS } from '@/data/site';
import { image } from '@/lib/image';
import './NewArrivals.css';

/** New arrivals as an index line and a grid, not another headline stack. */
export function NewArrivals() {
  const editorial = image('lifestyle/life-68.jpg');

  return (
    <section className="section" aria-labelledby="new-arrivals-title">
      <div className="container">
        <header className="new-arrivals__index" data-reveal="fade">
          <span className="new-arrivals__number label accent">{NEW_ARRIVALS.index}</span>
          <h2 id="new-arrivals-title" className="new-arrivals__title display display-md">
            {NEW_ARRIVALS.title[0]} <em>{NEW_ARRIVALS.title[1]}</em>
          </h2>
          <span className="new-arrivals__count label">{NEW_ARRIVALS.count}</span>
          <Link href="/shop?filter=sets" className="new-arrivals__link text-link">
            Shop the sets
            <Icon name="arrow" />
          </Link>
        </header>

        <div className="new-arrivals__grid">
          <figure className="new-arrivals__editorial" data-reveal="mask">
            <div className="frame">
              <Photo
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

          <div className="new-arrivals__products">
            {JUST_DROPPED.map((product, index) => (
              <ProductCard key={product.handle} product={product} stagger={index} />
            ))}
            <p className="new-arrivals__note">{NEW_ARRIVALS.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
