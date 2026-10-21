import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { FREE_SHIPPING_THRESHOLD } from '../data/products';
import { useBodyLock } from '../hooks/useBodyLock';
import { formatMoney } from '../lib/utils';
import { ArrowRightIcon, CheckIcon, CloseIcon } from './Icons';
import { QuantityStepper } from './QuantityStepper';

export function CartDrawer() {
  const {
    cartOpen,
    closeCart,
    lines,
    subtotal,
    cartCount,
    shippingRemaining,
    updateQty,
    removeItem,
  } = useStore();
  const navigate = useNavigate();
  const closeRef = useRef<HTMLButtonElement>(null);
  useBodyLock(cartOpen);

  useEffect(() => {
    if (!cartOpen) return;
    const timer = window.setTimeout(() => closeRef.current?.focus(), 120);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeCart();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', onKey);
    };
  }, [cartOpen, closeCart]);

  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const goCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <div className={`drawer-root ${cartOpen ? 'is-open' : ''}`} aria-hidden={!cartOpen}>
      <div className="drawer-overlay" onClick={closeCart} />
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping bag">
        <header className="drawer-head">
          <h2>
            Your bag <span>({cartCount})</span>
          </h2>
          <button
            ref={closeRef}
            type="button"
            className="icon-btn"
            onClick={closeCart}
            aria-label="Close bag"
          >
            <CloseIcon size={21} />
          </button>
        </header>

        {cartCount > 0 && (
          <div className="ship-meter">
            <p>
              {shippingRemaining > 0 ? (
                <>
                  You’re <strong>{formatMoney(shippingRemaining)}</strong> away from free shipping
                </>
              ) : (
                <>
                  <CheckIcon size={14} /> Free shipping unlocked
                </>
              )}
            </p>
            <div className="ship-track">
              <span style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        {cartCount === 0 ? (
          <div className="cart-empty">
            <span className="empty-orbit">
              <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M5.5 8h13l1 12.5h-15L5.5 8Z" />
                <path d="M9 8V6.2a3 3 0 0 1 6 0V8" />
              </svg>
            </span>
            <h3>Your bag is empty</h3>
            <p>Small-batch stoneware, made to be used every day.</p>
            <button
              type="button"
              className="btn btn--dark"
              onClick={() => {
                closeCart();
                navigate('/shop');
              }}
            >
              Explore the collection
            </button>
          </div>
        ) : (
          <>
            <div className="cart-lines">
              {lines.map((line) => (
                <div className="cart-line" key={line.key}>
                  <Link
                    to={`/product/${line.product.slug}`}
                    className="cart-line-media"
                    onClick={closeCart}
                  >
                    <img src={line.product.image} alt={line.product.name} width={80} height={100} />
                  </Link>
                  <div className="cart-line-body">
                    <div className="cart-line-top">
                      <div>
                        <Link
                          to={`/product/${line.product.slug}`}
                          className="cart-line-name"
                          onClick={closeCart}
                        >
                          {line.product.name}
                        </Link>
                        <p className="cart-line-option">
                          {line.option.label} · {formatMoney(line.unitPrice)}
                        </p>
                      </div>
                      <span className="cart-line-total">{formatMoney(line.lineTotal)}</span>
                    </div>
                    <div className="cart-line-actions">
                      <QuantityStepper
                        compact
                        value={line.qty}
                        max={line.product.stock}
                        onChange={(next) => updateQty(line.key, next)}
                        label={`Quantity for ${line.product.name}`}
                      />
                      <button
                        type="button"
                        className="cart-remove"
                        onClick={() => removeItem(line.key)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <footer className="drawer-foot">
              <div className="cart-subtotal">
                <span>Subtotal</span>
                <strong>{formatMoney(subtotal)}</strong>
              </div>
              <p className="cart-note">Shipping and taxes calculated at checkout.</p>
              <button type="button" className="btn btn--dark btn--block" onClick={goCheckout}>
                Checkout <ArrowRightIcon size={16} />
              </button>
              <div className="drawer-foot-links">
                <button
                  type="button"
                  onClick={() => {
                    closeCart();
                    navigate('/cart');
                  }}
                >
                  View bag
                </button>
                <button type="button" onClick={closeCart}>
                  Continue shopping
                </button>
              </div>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
