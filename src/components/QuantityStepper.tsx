import { MinusIcon, PlusIcon } from './Icons';
import { cx } from '../lib/utils';

export function QuantityStepper({
  value,
  onChange,
  max = 99,
  compact = false,
  label = 'Quantity',
}: {
  value: number;
  onChange: (next: number) => void;
  max?: number;
  compact?: boolean;
  label?: string;
}) {
  return (
    <div className={cx('qty', compact && 'qty--compact')} role="group" aria-label={label}>
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        aria-label="Decrease quantity"
      >
        <MinusIcon size={compact ? 13 : 15} />
      </button>
      <span aria-live="polite">{value}</span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        <PlusIcon size={compact ? 13 : 15} />
      </button>
    </div>
  );
}
