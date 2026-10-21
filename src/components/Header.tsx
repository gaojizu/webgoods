import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { categories } from '../data/products';
import { BagIcon, MenuIcon, SearchIcon } from './Icons';

export function Header() {
  const { cartCount, openCart, openSearch, openMenu } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const category = new URLSearchParams(location.search).get('category');
  const isShopAll = location.pathname === '/shop' && !category;
  const onShop = location.pathname === '/shop';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        openSearch();
        return;
      }
      if (event.key === '/') {
        const target = event.target as HTMLElement | null;
        const tag = target?.tagName ?? '';
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag) || target?.isContentEditable) return;
        event.preventDefault();
        openSearch();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openSearch]);

  return (
    <>
      <div className="announce">
        <div className="container announce-inner">
          <span>Complimentary shipping over $75</span>
          <span className="announce-divider" aria-hidden />
          <span className="announce-extra">Handmade in small batches</span>
          <span className="announce-divider announce-extra" aria-hidden />
          <span>30-day easy returns</span>
        </div>
      </div>

      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container header-inner">
          <div className="header-left">
            <button
              type="button"
              className="icon-btn menu-toggle"
              onClick={openMenu}
              aria-label="Open menu"
            >
              <MenuIcon size={22} />
            </button>
            <nav className="primary-nav" aria-label="Primary">
              <Link to="/shop" className={isShopAll ? 'is-active' : undefined}>
                Shop all
              </Link>
              {categories.map((item) => (
                <Link
                  key={item.id}
                  to={`/shop?category=${item.id}`}
                  className={onShop && category === item.id ? 'is-active' : undefined}
                >
                  {item.shortLabel}
                </Link>
              ))}
            </nav>
          </div>

          <Link to="/" className="logo" aria-label="STILLFORM — home">
            <span className="logo-word">STILLFORM</span>
            <span className="logo-sub">Objects for slower living</span>
          </Link>

          <div className="header-actions">
            <button
              type="button"
              className="search-btn"
              onClick={openSearch}
              aria-label="Search products"
            >
              <SearchIcon size={18} />
              <span className="search-btn-label">Search</span>
              <kbd className="search-kbd">⌘K</kbd>
            </button>
            <button
              type="button"
              className="bag-btn"
              onClick={openCart}
              aria-label={`Open bag, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
            >
              <BagIcon size={19} />
              <span className="bag-btn-label">Bag</span>
              <span className="bag-count" key={cartCount}>
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
