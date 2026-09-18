type IconName = "arrow" | "bag" | "menu" | "close" | "plus" | "minus" | "chevron";
export function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (name === "arrow") return <svg {...common}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>;
  if (name === "bag") return <svg {...common}><path d="M6.5 8.5h11l1 12h-13l1-12Z" /><path d="M9 8.5V6a3 3 0 0 1 6 0v2.5" /></svg>;
  if (name === "menu") return <svg {...common}><path d="M3 7h18M3 12h18M3 17h18" /></svg>;
  if (name === "close") return <svg {...common}><path d="m6 6 12 12M18 6 6 18" /></svg>;
  if (name === "plus") return <svg {...common}><path d="M12 5v14M5 12h14" /></svg>;
  if (name === "minus") return <svg {...common}><path d="M5 12h14" /></svg>;
  return <svg {...common}><path d="m6 9 6 6 6-6" /></svg>;
}
