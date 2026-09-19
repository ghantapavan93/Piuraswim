'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const PENDING = '[data-reveal]:not([data-reveal-state])';

/**
 * One observer for every `data-reveal` element on the page. Server components
 * only add the attribute to their own semantic element; this marks it
 * `data-reveal-state="in"` when it scrolls into view. Nothing is wrapped and
 * nothing is styled inline. Content added later (client-rendered grids, route
 * changes) is picked up through a MutationObserver.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const revealAll = () =>
      document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element) => {
        element.dataset.revealState = 'in';
      });

    if (typeof IntersectionObserver === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealAll();
      return;
    }

    const intersection = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.revealState = 'in';
          intersection.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );

    const observeWithin = (root: ParentNode) =>
      root.querySelectorAll<HTMLElement>(PENDING).forEach((element) => intersection.observe(element));

    observeWithin(document);

    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches(PENDING)) intersection.observe(node);
          observeWithin(node);
        });
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      intersection.disconnect();
      mutations.disconnect();
    };
  }, [pathname]);

  return null;
}
