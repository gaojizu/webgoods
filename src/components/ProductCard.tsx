import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { categoryById, type Product } from '../data/products';
import { cx, formatMoney } from '../lib/utils';
import { HeartIcon, PlusIcon } from './Icons';
import { Stars } from './Stars';

export function ProductCard({ product, eager = false }: { product: Product; eager?: boolean }) {
  const { addToCart, isWished, toggleWishlist } = useStore();
  const wished = isWished(product.id);
  const category = categoryById(product.category);

  return (
    <article className="p-card">
      <div className="p-media">
        <Link
          to={`/product/${product.slug}`}
          className="p-media-link"
          aria-label={`View ${product.name}`}
        >
          <img
            src={product.image}
            alt={product.name}
            width={1024}
            height={1280}
            loading={eager ? 'eager' : 'lazy'}
          />
        </Link>

        {product.badge && (
          <span className={cx('p-badge', product.badge === 'New' && 'p-badge--new')}>
            {product.badge}
          </span>
        )}

        <button
          type="button"
          className={cx('p-wish', wished && 'is-on')}
          onClick={() => toggleWishlist(product.id)}
          aria-pressed={wished}
          aria-label={
            wished
              ? `Remove ${product.name} from your saved pieces`
              : `Save ${product.name} to your saved pieces`
          }
        >
          <HeartIcon size={16} />
        </button>

        <button
          type="button"
          className="p-quick"
          onClick={() => addToCart(product.id, product.options[0].id)}
          aria-label={`Add ${product.name} to bag`}
        >
          <PlusIcon size={15} />
          <span>Add to bag</span>
        </button>
      </div>

      <div className="p-info">
        <div className="p-title-row">
          <Link to={`/product/${product.slug}`} className="p-name">
            {product.name}
          </Link>
          <span className="p-price">{formatMoney(product.price)}</span>
        </div>
        <div className="p-meta">
          <span className="p-category">{category.shortLabel}</span>
          <span className="p-rating">
            <Stars rating={product.rating} size={10} />
            <span>{product.rating.toFixed(1)}</span>
          </span>
        </div>
      </div>
    </article>
  );
}
