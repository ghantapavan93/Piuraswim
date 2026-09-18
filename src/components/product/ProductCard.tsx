import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import { image } from "@/lib/image";
import { money } from "@/lib/utils";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const primary = image(product.images[0]);
  const alternate = product.images[1] ? image(product.images[1]) : primary;
  return <article className="product-card"><Link className="product-card-media" href={`/product/${product.handle}`}><Image src={primary.src} alt={product.title} width={primary.width} height={primary.height} priority={priority} sizes="(max-width: 700px) 82vw, (max-width: 1100px) 42vw, 25vw" /><Image className="product-card-alt" src={alternate.src} alt="" width={alternate.width} height={alternate.height} sizes="(max-width: 700px) 82vw, (max-width: 1100px) 42vw, 25vw" /><span className="product-card-arrow">↗</span></Link><div className="product-card-copy"><p>{product.collection === "classics" ? "The Classics" : `The ${product.collection[0].toUpperCase()}${product.collection.slice(1)} print`}</p><div><Link href={`/product/${product.handle}`}>{product.title}</Link><span>{money(product.price)}</span></div></div></article>;
}
