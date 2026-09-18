import { notFound } from "next/navigation";
import { CartDrawer } from "@/components/commerce/CartDrawer";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductPurchasePanel } from "@/components/product/ProductPurchasePanel";
import { ALL_PRODUCTS, getProduct } from "@/data/catalog";

export function generateStaticParams() { return ALL_PRODUCTS.map(({ handle }) => ({ handle })); }
export default async function ProductPage({ params }: PageProps<"/product/[handle]">) { const { handle } = await params; const product = getProduct(handle); if (!product) notFound(); return <><SiteHeader /><main className="product-page"><div className="product-layout"><ProductGallery product={product} /><ProductPurchasePanel product={product} /></div></main><SiteFooter /><CartDrawer /></>; }
