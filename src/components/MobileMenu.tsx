import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { categories } from '../data/products';
import { useBodyLock } from '../hooks/useBodyLock';
import { ArrowRightIcon, CloseIcon, SearchIcon } from './Icons';

export function MobileMenu() {
  const { menuOpen, closeMenu, openSearch } = useStore();
  const closeRef = useRef<HTMLButtonElement>(null);
  useBodyLock(menuOpen);

  useEffect(() => {
    if (!menuOpen) return;
    const timer = window.setTimeout(() => closeRef.current?.focus(), 60);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen, closeMenu]);

  return (
    <div className={`menu-root ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
      <div className="menu-panel" role="dialog" aria-modal="true" aria-label="Menu">
        <div className="menu-head">
          <span className="logo-word">STILLFORM</span>
          <button
            ref={closeRef}
            type="button"
            className="icon-btn"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <CloseIcon size={22} />
          </button>
        </div>

        <nav className="menu-nav" aria-label="Mobile">
          <Link to="/shop" onClick={closeMenu} className="menu-link">
            <span className="menu-index">01</span>
            <span>Shop all</span>
          </Link>
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/shop?category=${category.id}`}
              onClick={closeMenu}
              className="menu-link"
            >
              <span className="menu-index">0{index + 2}</span>
              <span>{category.label}</span>
            </Link>
          ))}
        </nav>

        <div className="menu-sub">
          <button
            type="button"
            className="menu-action"
            onClick={() => {
              closeMenu();
              openSearch();
            }}
          >
            <SearchIcon size={17} /> Search pieces
          </button>
          <Link to="/#story" onClick={closeMenu} className="menu-action">
            Our story <ArrowRightIcon size={16} />
          </Link>
          <Link to="/#faq" onClick={closeMenu} className="menu-action">
            Shipping &amp; returns <ArrowRightIcon size={16} />
          </Link>
        </div>

        <div className="menu-foot">
          <p>Portland, Oregon · Ships worldwide</p>
          <a href="mailto:hello@stillform.studio">hello@stillform.studio</a>
        </div>
      </div>
    </div>
  );
}
