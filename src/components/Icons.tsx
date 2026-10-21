import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
  strokeWidth?: number;
};

function base({ size = 20, strokeWidth = 1.5, ...rest }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    focusable: false,
    ...rest,
  };
}

export const SearchIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4.5 4.5" />
  </svg>
);

export const BagIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M5.5 8h13l1 12.5h-15L5.5 8Z" />
    <path d="M9 8V6.2a3 3 0 0 1 6 0V8" />
  </svg>
);

export const MenuIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M3.5 7.5h17M3.5 16.5h17" />
  </svg>
);

export const CloseIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

export const PlusIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const MinusIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M5 12h14" />
  </svg>
);

export const ArrowRightIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M4 12h15" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

export const ChevronDownIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="m6 9.5 6 6 6-6" />
  </svg>
);

export const HeartIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M20.6 4.9a5.4 5.4 0 0 0-7.7 0L12 5.9l-.9-1a5.4 5.4 0 0 0-7.7 7.6l1 1L12 21l7.6-7.5 1-1a5.4 5.4 0 0 0 0-7.6Z" />
  </svg>
);

export const StarIcon = ({ size = 12, ...rest }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
    focusable={false}
    {...rest}
  >
    <path d="M12 2.4l2.95 6.06 6.65.92-4.85 4.7 1.2 6.62L12 17.55 6.05 20.7l1.2-6.62L2.4 9.38l6.65-.92L12 2.4Z" />
  </svg>
);

export const CheckIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="m5 12.5 4.5 4.5L19 7" />
  </svg>
);

export const TruckIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M2.5 6.5h11.5v10H2.5z" />
    <path d="M14 9.5h3.7l3.3 3.4v3.6h-7z" />
    <circle cx="6.5" cy="18" r="1.8" />
    <circle cx="17.5" cy="18" r="1.8" />
  </svg>
);

export const ShieldIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M12 2.8 19 5.6v5.2c0 4.4-2.9 7.7-7 9.4-4.1-1.7-7-5-7-9.4V5.6L12 2.8Z" />
    <path d="m8.8 11.8 2.2 2.2 4.2-4.4" />
  </svg>
);

export const LeafIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M20.5 3.5C11 3.5 4.5 8 4.5 14a5 5 0 0 0 5 5c6 0 11-6.5 11-15.5Z" />
    <path d="M4.5 20.5c2.2-4.5 5.5-7.8 10-10" />
  </svg>
);

export const TrashIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M4 7h16M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13" />
  </svg>
);

export const LockIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
    <path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7" />
  </svg>
);

export const FilterIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M4 6.5h16M7 12h10M10 17.5h4" />
  </svg>
);

export const InstagramIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.7" fill="currentColor" stroke="none" />
  </svg>
);

export const PinterestIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.5 20c1-1.6 1.6-3.1 1.9-4.3M10.2 13.4c-.4-1.5.4-3 2-3.2 1.6-.2 2.8.7 2.8 2.3 0 1.8-1 3.5-2.5 3.5-.9 0-1.6-.7-1.4-1.6" />
  </svg>
);
