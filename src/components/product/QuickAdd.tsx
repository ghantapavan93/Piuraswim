'use client';

import { useState } from 'react';
import { useCart } from '@/components/commerce/CartProvider';
import { Icon } from '@/components/ui/Icon';
import { SIZES, isAvailable, type Product, type Size } from '@/data/catalog';
import './QuickAdd.css';

/**
 * Add-from-the-grid for shoppers who already know their size. Appears on hover
 * or keyboard focus; touch devices go through the product page instead.
 */
export function QuickAdd({ product }: { product: Product }) {
  const { add } = useCart();
  const [added, setAdded] = useState<Size | null>(null);

  function handleAdd(size: Size) {
    add(product, size);
    setAdded(size);
    window.setTimeout(() => setAdded(null), 1200);
  }

  return (
    <div className="quick-add">
      <span className="quick-add__label">Quick add</span>
      <div className="quick-add__sizes">
        {SIZES.map((size) => {
          const inStock = isAvailable(product, size);
          return (
            <button
              key={size}
              type="button"
              className="quick-add__size"
              disabled={!inStock}
              onClick={() => handleAdd(size)}
              aria-label={`Add ${product.title}, size ${size}${inStock ? '' : ', sold out'}`}
            >
              {added === size ? <Icon name="check" size={12} /> : size}
            </button>
          );
        })}
      </div>
    </div>
  );
}
