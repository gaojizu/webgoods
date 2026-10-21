import { useState, type ReactNode } from 'react';
import { cx } from '../lib/utils';
import { PlusIcon } from './Icons';

export interface AccordionItem {
  title: string;
  content: ReactNode;
}

export function Accordion({
  items,
  defaultOpen = 0,
  className,
}: {
  items: AccordionItem[];
  defaultOpen?: number | null;
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div className={cx('accordion', className)}>
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div className={cx('acc-item', isOpen && 'is-open')} key={item.title}>
            <h3 className="acc-heading">
              <button
                type="button"
                className="acc-trigger"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : index)}
              >
                <span>{item.title}</span>
                <span className="acc-icon">
                  <PlusIcon size={16} />
                </span>
              </button>
            </h3>
            <div className="acc-panel">
              <div className="acc-panel-inner">
                <div className="acc-content">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
