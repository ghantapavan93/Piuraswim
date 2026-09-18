import Link from "next/link";
import { CartDrawer } from "@/components/commerce/CartDrawer";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ProductCard } from "@/components/product/ProductCard";
import { ALL_PRODUCTS } from "@/data/catalog";

const filters = ["all", "sets", "tops", "bottoms", "sunchild", "moonchild", "classics"] as const;
type Filter = (typeof filters)[number];
function filterProducts(filter: Filter) { if (filter === "all") return ALL_PRODUCTS; if (filter === "sets") return ALL_PRODUCTS.filter((p) => p.category === "tops"); if (filter === "tops" || filter === "bottoms") return ALL_PRODUCTS.filter((p) => p.category === filter); return ALL_PRODUCTS.filter((p) => p.collection === filter); }
export default async function ShopPage({ searchParams }: PageProps<"/shop">) { const query = await searchParams; const raw = typeof query.filter === "string" ? query.filter : "all"; const filter = (filters as readonly string[]).includes(raw) ? raw as Filter : "all"; const products = filterProducts(filter); return <><SiteHeader /><main className="shop-page"><div className="container"><header className="shop-head"><p className="label accent">The collection</p><h1 className="display display-lg">All swim <sup>16</sup></h1><p>Find the piece that feels most like you. Every style runs true to size.</p></header><nav className="shop-filters" aria-label="Filter swimwear">{filters.map((item) => <Link key={item} className={item === filter ? "is-active" : ""} href={item === "all" ? "/shop" : `/shop?filter=${item}`}>{item === "all" ? "All swim" : item}</Link>)}</nav><div className="shop-grid">{products.map((product, index) => <ProductCard key={product.handle} product={product} priority={index < 4} />)}</div></div></main><SiteFooter /><CartDrawer /></>; }
