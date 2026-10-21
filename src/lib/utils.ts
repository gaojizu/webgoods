export const asset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export const formatMoney = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

export const roundMoney = (value: number) => Math.round(value * 100) / 100;

export const cx = (...classes: (string | false | null | undefined)[]) =>
  classes.filter(Boolean).join(' ');

export const estimatedDelivery = (daysFromNow = 5) =>
  new Date(Date.now() + daysFromNow * 86400000).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
