'use client';

import type { ReactNode } from 'react';
import { useFitGuide } from './FitGuideProvider';

type FitGuideButtonProps = {
  children: ReactNode;
  className?: string;
};

/** Any control that opens the fit guide drawer. */
export function FitGuideButton({ children, className }: FitGuideButtonProps) {
  const { open } = useFitGuide();
  return (
    <button type="button" className={className} onClick={open}>
      {children}
    </button>
  );
}
