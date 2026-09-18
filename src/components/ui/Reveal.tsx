"use client";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
export function Reveal({ children, delay = 0, mask = false, className }: { children: ReactNode; delay?: number; mask?: boolean; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { const node = ref.current; if (!node) return; const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { node.dataset.revealState = "in"; observer.unobserve(node); } }, { threshold: 0.12 }); observer.observe(node); return () => observer.disconnect(); }, []);
  return <div ref={ref} className={className} data-reveal={mask ? "mask" : ""} style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}>{children}</div>;
}
