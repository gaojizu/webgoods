import type { ReactNode } from 'react';
import { cx } from '../lib/utils';
import { useReveal } from '../hooks/useReveal';

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cx('reveal', visible && 'is-visible', className)}
      style={{ transitionDelay: visible ? `${delay}ms` : undefined }}
    >
      {children}
    </div>
  );
}
