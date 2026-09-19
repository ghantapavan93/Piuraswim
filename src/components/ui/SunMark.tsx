const RAYS = 16;
const INNER = 23;
const OUTER = 33;

const rays = Array.from({ length: RAYS }, (_, index) => {
  const angle = (index * 2 * Math.PI) / RAYS;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x1: (50 + INNER * cos).toFixed(2),
    y1: (50 + INNER * sin).toFixed(2),
    x2: (50 + OUTER * cos).toFixed(2),
    y2: (50 + OUTER * sin).toFixed(2),
  };
});

const SYMBOL_ID = 'sun-mark';

/** Defines the emblem once per document; rendered in the root layout. */
export function SunMarkSymbol() {
  return (
    <svg className="visually-hidden" aria-hidden="true" focusable="false">
      <symbol id={SYMBOL_ID} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeLinecap="round">
        <circle cx="50" cy="50" r="15" />
        {rays.map((ray) => (
          <line key={ray.x2 + ray.y2} x1={ray.x1} y1={ray.y1} x2={ray.x2} y2={ray.y2} />
        ))}
      </symbol>
    </svg>
  );
}

type SunMarkProps = {
  size?: number;
  strokeWidth?: number;
  className?: string;
  title?: string;
};

/** Piura's sun emblem, a circle with sixteen short rays. Decorative unless a title is given. */
export function SunMark({ size = 32, strokeWidth = 1.3, className, title }: SunMarkProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      strokeWidth={strokeWidth}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <use href={`#${SYMBOL_ID}`} />
    </svg>
  );
}
