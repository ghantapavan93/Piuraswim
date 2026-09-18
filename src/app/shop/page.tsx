import Link from "next/link";
import { CartDrawer } from "@/components/commerce/CartDrawer";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ProductCard } from "@/components/product/ProductCard";
import { ALL_PRODUCTS } from "@/data/catalog";
import { Reveal } from "@/components/ui/Reveal";

const filterConfig = [
  { key: "all", label: "All Swim" },
  { key: "sets", label: "Sets" },
  { key: "tops", label: "Tops" },
  { key: "bottoms", label: "Bottoms" },
  { key: "sunchild", label: "The Sunchild Print" },
  { key: "moonchild", label: "The Moonchild Print" },
  { key: "classics", label: "The Classics" },
] as const;

type FilterKey = (typeof filterConfig)[number]["key"];

function filterProducts(filter: FilterKey) {
  if (filter === "all") return ALL_PRODUCTS;
  if (filter === "sets") return ALL_PRODUCTS.filter((p) => p.category === "tops");
  if (filter === "tops" || filter === "bottoms") return ALL_PRODUCTS.filter((p) => p.category === filter);
  return ALL_PRODUCTS.filter((p) => p.collection === filter);
}

function getFilterCount(filter: FilterKey) {
  return filterProducts(filter).length;
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const query = await searchParams;
  const raw = typeof query.filter === "string" ? query.filter : "all";
  const activeFilter: FilterKey = filterConfig.some((f) => f.key === raw)
    ? (raw as FilterKey)
    : "all";

  const products = filterProducts(activeFilter);
  const activeLabel = filterConfig.find((f) => f.key === activeFilter)?.label ?? "All Swim";
  const totalCount = products.length;

  return (
    <>
      <SiteHeader />
      <main className="shop-page">
        <div className="container">
          <header className="shop-head">
            <Reveal>
              <p className="label text-ember">Curated Collection</p>
              <h1 className="display-xl shop-main-title">
                {activeLabel} <sup>{totalCount}</sup>
              </h1>
              <p className="shop-main-sub">
                Timeless, flattering bikinis designed in Miami and crafted in Peru. Every style runs true to size.
              </p>
            </Reveal>
          </header>

          <nav className="shop-filters-bar" aria-label="Filter swimwear catalog">
            {filterConfig.map((item) => {
              const count = getFilterCount(item.key);
              const isActive = item.key === activeFilter;
              return (
                <Link
                  key={item.key}
                  className={`shop-filter-pill ${isActive ? "is-active" : ""}`}
                  href={item.key === "all" ? "/shop" : `/shop?filter=${item.key}`}
                >
                  <span>{item.label}</span>
                  <small>({count})</small>
                </Link>
              );
            })}
          </nav>

          <div className="shop-grid">
            {products.map((product, index) => (
              <ProductCard
                key={product.handle}
                product={product}
                priority={index < 4}
              />
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
      <CartDrawer />
    </>
  );
}
