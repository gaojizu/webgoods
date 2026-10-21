import { StarIcon } from './Icons';

export function Stars({
  rating,
  size = 12,
  className,
}: {
  rating: number;
  size?: number;
  className?: string;
}) {
  return (
    <span className={`stars ${className ?? ''}`} aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <StarIcon
          key={index}
          size={size}
          className={index < Math.round(rating) ? 'star is-on' : 'star'}
        />
      ))}
    </span>
  );
}
