import type { ReactNode } from 'react';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';

/** Pages that open on full-bleed photography: the header floats over the hero until the page scrolls. */
export default function EditorialLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader overlay />
      {children}
      <SiteFooter />
    </>
  );
}
