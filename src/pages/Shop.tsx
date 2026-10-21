import { useCallback, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ChevronDownIcon, CloseIcon } from '../components/Icons';
import { ProductCard } from '../components/ProductCard';
import { Reveal } from '../components/Reveal';
import { categories, categoryById, products, type CategoryId } from '../data/products';
import { usePageTitle } from '../hooks/usePageTitle';
import { cx } from '../lib/utils';

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'rating', label: 'Top rated' },
  { value: 'new', label: 'Newest' },
];

const priceFilters = [
  { value: 'all', label: 'All prices' },
  { value: 'under-50', label: 'Under $50' },
  { value: '50-100', label: '$50 – $100' },
  { value: 'over-100', label: 'Over $100' },
];

export function Shop() {
  const [params, setParams] = useSearchParams();
  const category = params.get('category') ?? 'all';
  const query = params.get('q') ?? '';
  const sort = params.get('sort') ?? 'featured';
  const price = params.get('price') ?? 'all';

  const activeCategory = categories.find((item) => item.id === category);
  const title = query ? 'Search results' : activeCategory ? activeCategory.label : 'Everyday objects, made to last';
  const lede = query
    ? `Pieces matching “${query}”.`
    : activeCategory
      ? activeCategory.blurb
      : 'Hand-thrown stoneware in small batches — for the table, the windowsill and the quiet corners in between.';

  usePageTitle(
    query
      ? `Search: ${query} — STILLFORM`
      : activeCategory
        ? `${activeCategory.label} — STILLFORM`
        : 'Shop the collection — STILLFORM',
  );

  const update = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(params);
      if (!value || value === 'all' || (key === 'sort' && value === 'featured')) next.delete(key);
      else next.set(key, value);
      setParams(next, { replace: true });
    },
    [params, setParams],
  );

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    let list = products.filter((product) => {
      if (category !== 'all' && product.category !== category) return false;
      if (term) {
        const haystack = [
          product.name,
          product.tagline,
          product.description.join(' '),
          categoryById(product.category).label,
          product.details.map((detail) => detail.value).join(' '),
        ]
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(term)) return false;
      }
      if (price === 'under-50' && product.price >= 50) return false;
      if (price === '50-100' && (product.price < 50 || product.price > 100)) return false;
      if (price === 'over-100' && product.price <= 100) return false;
      return true;
    });

    list = [...list];
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    if (sort === 'rating') list.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
    if (sort === 'new') list.sort((a, b) => Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)));
    return list;
  }, [category, price, query, sort]);

  const hasFilters = category !== 'all' || price !== 'all' || Boolean(query) || sort !== 'featured';
  const clearAll = () => setParams(new URLSearchParams(), { replace: true });

  return (
    <div className="page shop">
      <div className="container shop-head">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden>/</span>
          <span>{activeCategory ? activeCategory.label : 'Shop'}</span>
        </nav>
        <div className="shop-title-row">
          <div>
            <p className="eyebrow">
              <span className="eyebrow-rule" aria-hidden />
              The collection
            </p>
            <h1 className="shop-title">{title}</h1>
            <p className="shop-lede">{lede}</p>
          </div>
          <span className="shop-total">
            {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}
          </span>
        </div>
      </div>

      <div className="container shop-body">
        <div className="shop-toolbar">
          <div className="chip-row" role="group" aria-label="Filter by category">
            <button
              type="button"
              className={cx('chip', category === 'all' && 'is-active')}
              onClick={() => update('category', 'all')}
            >
              All pieces
            </button>
            {categories.map((item) => (
              <button
                key={item.id}
                type="button"
                className={cx('chip', category === item.id && 'is-active')}
                onClick={() => update('category', item.id as CategoryId)}
              >
                {item.shortLabel}
              </button>
            ))}
          </div>

          <div className="shop-tools">
            <div className="select-field">
              <select
                aria-label="Filter by price"
                value={price}
                onChange={(event) => update('price', event.target.value)}
              >
                {priceFilters.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDownIcon size={14} className="select-caret" />
            </div>
            <div className="select-field">
              <select
                aria-label="Sort products"
                value={sort}
                onChange={(event) => update('sort', event.target.value)}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    Sort: {option.label}
                  </option>
                ))}
              </select>
              <ChevronDownIcon size={14} className="select-caret" />
            </div>
          </div>
        </div>

        {query && (
          <div className="query-banner">
            <span>
              Results for <strong>“{query}”</strong>
            </span>
            <button type="button" onClick={() => update('q', '')}>
              <CloseIcon size={14} /> Clear search
            </button>
          </div>
        )}

        {hasFilters && (
          <div className="results-meta">
            <span>
              Showing {filtered.length} of {products.length} pieces
            </span>
            <button type="button" onClick={clearAll}>
              Clear all filters
            </button>
          </div>
        )}

        {filtered.length > 0 ? (
          <div className="grid grid--3 shop-grid">
            {filtered.map((product, index) => (
              <Reveal key={product.id} delay={Math.min(index, 5) * 50}>
                <ProductCard product={product} eager={index < 3} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span className="empty-mark" aria-hidden>
              ✳
            </span>
            <h2>Nothing here — yet.</h2>
            <p>
              No pieces match those filters. Try a different category, price range or search term.
            </p>
            <button type="button" className="btn btn--dark" onClick={clearAll}>
              Clear filters
            </button>
          </div>
        )}

        <div className="shop-note">
          <p>
            Not sure where to start? <Link to="/product/arc-mug">The Arc Mug</Link> is where most
            people begin.
          </p>
          <span>Every piece ships plastic-free.</span>
        </div>
      </div>
    </div>
  );
}
