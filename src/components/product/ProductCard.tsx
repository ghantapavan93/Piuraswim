import { Photo } from '@/components/ui/Photo';
import Link from 'next/link';
import { printLabel, type Product } from '@/data/catalog';
import { image } from '@/lib/image';
import { money } from '@/lib/utils';
import { QuickAdd } from './QuickAdd';
import './ProductCard.css';

type ProductCardProps = {
  product: Product;
  /** Reveal stagger step within a row, 0 to 5. */
  stagger?: number;
  priority?: boolean;
  sizes?: string;
};

export function ProductCard({
  product,
  stagger = 0,
  priority = false,
  sizes = '(max-width: 719px) 50vw, (max-width: 1099px) 33vw, 25vw',
}: ProductCardProps) {
  const primary = image(product.images[0]);
  const alternate = product.images[1] ? image(product.images[1]) : null;
  const href = `/product/${product.handle}`;

  return (
    <article className="product-card" data-reveal="fade" data-reveal-delay={stagger || undefined}>
      <div className="product-card__media">
        <Link href={href} className="product-card__link frame" aria-label={product.title}>
          <Photo
            src={primary.src}
            alt={`${product.title}, front`}
            width={primary.width}
            height={primary.height}
            sizes={sizes}
            priority={priority}
            className="product-card__primary"
          />
          {alternate ? (
            <Photo
              src={alternate.src}
              alt=""
              width={alternate.width}
              height={alternate.height}
              sizes={sizes}
              className="product-card__alternate"
            />
          ) : null}
        </Link>
        <QuickAdd product={product} />
      </div>

      <div className="product-card__copy">
        <p className="product-card__print">{printLabel(product)}</p>
        <div className="product-card__row">
          <Link href={href} className="product-card__title">
            {product.title}
          </Link>
          <span className="product-card__price">{money(product.price)}</span>
        </div>
      </div>
    </article>
  );
}
