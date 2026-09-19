import type { Metadata } from 'next';
import Link from 'next/link';
import { FitGuideButton } from '@/components/fit/FitGuideButton';
import { ProductCard } from '@/components/product/ProductCard';
import { SetCard } from '@/components/product/SetCard';
import { ALL_PRODUCTS, getAllSets, type Product } from '@/data/catalog';
import { COLLECTIONS } from '@/data/site';
import { superscript } from '@/lib/utils';
import './page.css';

const VIEWS = [
  { key: 'all', label: 'All swim' },
  { key: 'sets', label: 'Sets' },
  { key: 'tops', label: 'Tops' },
  { key: 'bottoms', label: 'Bottoms' },
] as const;

const PRINTS = [
  { key: 'sunchild', label: COLLECTIONS.sunchild.short },
  { key: 'moonchild', label: COLLECTIONS.moonchild.short },
  { key: 'classics', label: COLLECTIONS.classics.short },
] as const;

type ViewKey = (typeof VIEWS)[number]['key'];
type PrintKey = (typeof PRINTS)[number]['key'];
type FilterKey = ViewKey | PrintKey;

const TITLES: Record<FilterKey, string> = {
  all: 'All swim',
  sets: 'Sets',
  tops: 'Tops',
  bottoms: 'Bottoms',
  sunchild: COLLECTIONS.sunchild.title,
  moonchild: COLLECTIONS.moonchild.title,
  classics: COLLECTIONS.classics.title,
};

const INTROS: Record<FilterKey, string> = {
  all: 'Sixteen pieces, sold as separates. Tops and bottoms are sized on their own.',
  sets: 'Every piece has a designed partner. A set is the two of them, priced as the two of them.',
  tops: 'Triangle, bandeau and minimal tops. Adjustable where the piece has ties.',
  bottoms: 'Cheeky, minimal coverage throughout. Size up for more, down for extra cheeky.',
  sunchild: COLLECTIONS.sunchild.blurb,
  moonchild: COLLECTIONS.moonchild.blurb,
  classics: COLLECTIONS.classics.blurb,
};

function isFilterKey(value: string | undefined): value is FilterKey {
  return [...VIEWS, ...PRINTS].some((entry) => entry.key === value);
}

function filterProducts(filter: FilterKey): Product[] {
  if (filter === 'all' || filter === 'sets') return ALL_PRODUCTS;
  if (filter === 'tops' || filter === 'bottoms') return ALL_PRODUCTS.filter((product) => product.category === filter);
  return ALL_PRODUCTS.filter((product) => product.collection === filter);
}

const hrefFor = (key: FilterKey) => (key === 'all' ? '/shop' : `/shop?filter=${key}`);

async function resolveFilter(searchParams: PageProps<'/shop'>['searchParams']): Promise<FilterKey> {
  const { filter } = await searchParams;
  const value = typeof filter === 'string' ? filter : undefined;
  return isFilterKey(value) ? value : 'all';
}

export async function generateMetadata({ searchParams }: PageProps<'/shop'>): Promise<Metadata> {
  const key = await resolveFilter(searchParams);
  return { title: `Shop ${TITLES[key]}`, description: INTROS[key] };
}

export default async function ShopPage({ searchParams }: PageProps<'/shop'>) {
  const active = await resolveFilter(searchParams);
  const sets = getAllSets();
  const products = filterProducts(active);
  const count = active === 'sets' ? sets.length : products.length;

  return (
    <main id="main" className="shop-page container">
      <header className="shop-page__head">
        <p className="label accent">The collection</p>
        <h1 className="shop-page__title display display-lg">
          {TITLES[active]} <sup className="shop-page__count">{superscript(count)}</sup>
        </h1>
        <p className="shop-page__intro">{INTROS[active]}</p>
        <p className="shop-page__fit-line">
          Every piece runs true to size, Small through X-Large.{' '}
          <FitGuideButton className="inline-link">Find your Piura fit</FitGuideButton>
        </p>
      </header>

      <nav className="shop-page__filters" aria-label="Filter the collection">
        <ul className="shop-page__views">
          {VIEWS.map((view) => (
            <li key={view.key}>
              <Link href={hrefFor(view.key)} className="shop-page__filter" aria-current={active === view.key ? 'page' : undefined}>
                {view.label}
                <sup>{superscript(view.key === 'sets' ? sets.length : filterProducts(view.key).length)}</sup>
              </Link>
            </li>
          ))}
        </ul>
        <ul className="shop-page__prints">
          <li className="shop-page__prints-label label">By print</li>
          {PRINTS.map((print) => (
            <li key={print.key}>
              <Link href={hrefFor(print.key)} className="shop-page__filter" aria-current={active === print.key ? 'page' : undefined}>
                {print.label}
                <sup>{superscript(filterProducts(print.key).length)}</sup>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {active === 'sets' ? (
        <div className="shop-page__set-grid">
          {sets.map((set, index) => (
            <SetCard key={set.top.handle} set={set} stagger={index % 3} />
          ))}
        </div>
      ) : (
        <div className="shop-page__grid">
          {products.map((product, index) => (
            <ProductCard key={product.handle} product={product} priority={index < 4} stagger={index % 4} />
          ))}
        </div>
      )}
    </main>
  );
}
