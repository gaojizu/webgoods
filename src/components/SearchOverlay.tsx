import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { bestsellers, categoryById, products } from '../data/products';
import { useBodyLock } from '../hooks/useBodyLock';
import { formatMoney } from '../lib/utils';
import { CloseIcon, SearchIcon } from './Icons';

const popular = ['Mug', 'Vase', 'Teapot', 'Tray'];

export function SearchOverlay() {
  const { searchOpen, closeSearch } = useStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  useBodyLock(searchOpen);

  useEffect(() => {
    if (!searchOpen) return;
    setQuery('');
    const timer = window.setTimeout(() => inputRef.current?.focus(), 80);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeSearch();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', onKey);
    };
  }, [searchOpen, closeSearch]);

  const trimmed = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (!trimmed) return [];
    return products
      .filter((product) => {
        const haystack = [
          product.name,
          product.tagline,
          product.description.join(' '),
          categoryById(product.category).label,
        ]
          .join(' ')
          .toLowerCase();
        return haystack.includes(trimmed);
      })
      .slice(0, 6);
  }, [trimmed]);

  const suggestions = trimmed ? results : bestsellers.slice(0, 3);

  const goToResults = (value: string) => {
    const term = value.trim();
    closeSearch();
    navigate(term ? `/shop?q=${encodeURIComponent(term)}` : '/shop');
  };

  return (
    <div className={`search-root ${searchOpen ? 'is-open' : ''}`} aria-hidden={!searchOpen}>
      <div className="search-backdrop" onClick={closeSearch} />
      <div className="search-panel" role="dialog" aria-modal="true" aria-label="Search products">
        <form
          className="search-form"
          onSubmit={(event) => {
            event.preventDefault();
            goToResults(query);
          }}
        >
          <SearchIcon size={22} className="search-form-icon" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search mugs, vases, teaware…"
            aria-label="Search products"
          />
          {query && (
            <button
              type="button"
              className="search-clear"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              aria-label="Clear search"
            >
              <CloseIcon size={16} />
            </button>
          )}
          <button type="button" className="search-close" onClick={closeSearch} aria-label="Close search">
            Close
          </button>
        </form>

        <div className="search-body">
          {!trimmed && (
            <div className="search-popular">
              <span className="search-label">Popular searches</span>
              <div className="search-chips">
                {popular.map((term) => (
                  <button key={term} type="button" onClick={() => goToResults(term)}>
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="search-results-head">
            <span className="search-label">
              {trimmed ? `${results.length} ${results.length === 1 ? 'result' : 'results'}` : 'Most loved'}
            </span>
            {trimmed && results.length > 0 && (
              <button type="button" className="search-see-all" onClick={() => goToResults(query)}>
                See all
              </button>
            )}
          </div>

          {suggestions.length > 0 ? (
            <ul className="search-results">
              {suggestions.map((product) => (
                <li key={product.id}>
                  <Link
                    to={`/product/${product.slug}`}
                    onClick={closeSearch}
                    className="search-result"
                  >
                    <img src={product.image} alt="" width={56} height={70} loading="lazy" />
                    <span className="search-result-body">
                      <span className="search-result-name">{product.name}</span>
                      <span className="search-result-meta">
                        {categoryById(product.category).shortLabel} · {formatMoney(product.price)}
                      </span>
                    </span>
                    <span className="search-result-arrow">↗</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="search-empty">
              <p>No pieces match “{query.trim()}”.</p>
              <button type="button" onClick={() => goToResults('')}>
                Browse the full collection
              </button>
            </div>
          )}
        </div>

        <div className="search-foot">
          <span>
            <kbd>↵</kbd> to see all results
          </span>
          <span>
            <kbd>esc</kbd> to close
          </span>
        </div>
      </div>
    </div>
  );
}
