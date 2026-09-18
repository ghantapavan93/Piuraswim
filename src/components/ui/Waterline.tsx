import type { ReactNode } from "react";

type WaterlineProps = {
  children?: ReactNode;
  className?: string;
};

/** A quiet visual thread used only where water has a real narrative role. */
export function Waterline({ children, className = "" }: WaterlineProps) {
  return <div className={`waterline ${className}`.trim()} aria-hidden={children ? undefined : true}>{children}</div>;
}
