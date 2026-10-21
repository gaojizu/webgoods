import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRightIcon, LeafIcon, LockIcon, TruckIcon } from '../components/Icons';
import { QuantityStepper } from '../components/QuantityStepper';
import { useStore } from '../context/StoreContext';
import {
  FREE_SHIPPING_THRESHOLD,
  STANDARD_SHIPPING,
  TAX_RATE,
} from '../data/products';
import { usePageTitle } from '../hooks/usePageTitle';
import { formatMoney, roundMoney } from '../lib/utils';

export function Cart() {
  const {
    lines,
    subtotal,
    discount,
    promo,
    applyPromo,
    removePromo,
    updateQty,
    removeItem,
    cartCount,
    shippingRemaining,
  } = useStore();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  usePageTitle('Your bag — STILLFORM');

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;
  const tax = roundMoney((subtotal - discount) * TAX_RATE);
  const total = roundMoney(subtotal - discount + shipping + tax);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const submitPromo = (event: FormEvent) => {
    event.preventDefault();
    if (!code.trim()) return;
    if (applyPromo(code)) {
      setError('');
      setCode('');
    } else {
      setError('That code is not valid. Try SLOW10.');
    }
  };

  if (cartCount === 0) {
    return (
      <div className="page cart-page">
        <div className="container">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden>/</span>
            <span>Your bag</span>
          </nav>
          <div className="empty-state empty-state--page">
            <span className="empty-mark" aria-hidden>
              ✳
            </span>
            <h1>Your bag is empty.</h1>
            <p>Good things begin with a mug. Or a vase. Or both.</p>
            <Link to="/shop" className="btn btn--dark">
              Explore the collection <ArrowRightIcon size={16} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page cart-page">
      <div className="container">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden>/</span>
          <span>Your bag</span>
        </nav>

        <div className="page-title-row">
          <div>
            <p className="eyebrow">
              <span className="eyebrow-rule" aria-hidden />
              Almost yours
            </p>
            <h1 className="page-title">
              Your bag <span>({cartCount})</span>
            </h1>
          </div>
          <Link to="/shop" className="link-arrow">
            Keep shopping <ArrowRightIcon size={15} />
          </Link>
        </div>

        <div className="cart-layout">
          <div className="cart-main">
            <div className="cart-table-head">
              <span>Piece</span>
              <span>Quantity</span>
              <span>Total</span>
            </div>

            {lines.map((line) => (
              <div className="cart-row" key={line.key}>
                <Link to={`/product/${line.product.slug}`} className="cart-row-media">
                  <img
                    src={line.product.image}
                    alt={line.product.name}
                    width={100}
                    height={125}
                  />
                </Link>
                <div className="cart-row-info">
                  <Link to={`/product/${line.product.slug}`} className="cart-row-name">
                    {line.product.name}
                  </Link>
                  <p className="cart-row-option">{line.option.label}</p>
                  <p className="cart-row-unit">{formatMoney(line.unitPrice)} each</p>
                  <button type="button" className="cart-remove" onClick={() => removeItem(line.key)}>
                    Remove
                  </button>
                </div>
                <div className="cart-row-qty">
                  <QuantityStepper
                    value={line.qty}
                    max={line.product.stock}
                    onChange={(next) => updateQty(line.key, next)}
                    label={`Quantity for ${line.product.name}`}
                  />
                </div>
                <span className="cart-row-total">{formatMoney(line.lineTotal)}</span>
              </div>
            ))}

            <div className="promo-box">
              <div className="promo-copy">
                <h2>Have a code?</h2>
                <p>Enter it here and we’ll take it off your total.</p>
                <button
                  type="button"
                  className="promo-demo"
                  onClick={() => {
                    setCode('SLOW10');
                    setError('');
                    applyPromo('SLOW10');
                  }}
                >
                  Try demo code SLOW10
                </button>
              </div>
              {promo ? (
                <div className="promo-applied">
                  <span>
                    <strong>{promo}</strong> applied
                  </span>
                  <button type="button" onClick={removePromo}>
                    Remove
                  </button>
                </div>
              ) : (
                <form className="promo-form" onSubmit={submitPromo} noValidate>
                  <label className="sr-only" htmlFor="promo">
                    Promo code
                  </label>
                  <input
                    id="promo"
                    value={code}
                    onChange={(event) => {
                      setCode(event.target.value);
                      setError('');
                    }}
                    placeholder="Promo code"
                    autoComplete="off"
                  />
                  <button type="submit" className="btn btn--ghost">
                    Apply
                  </button>
                  {error && (
                    <span className="form-error" role="alert">
                      {error}
                    </span>
                  )}
                </form>
              )}
            </div>

            <p className="cart-main-note">
              All orders are packed by hand in recycled, plastic-free materials. Gifts can be
              wrapped on request — just add a note at checkout.
            </p>
          </div>

          <aside className="cart-summary" aria-label="Order summary">
            <div className="ship-meter ship-meter--card">
              <p>
                {shippingRemaining > 0 ? (
                  <>
                    Add <strong>{formatMoney(shippingRemaining)}</strong> for free shipping
                  </>
                ) : (
                  <>Free shipping unlocked</>
                )}
              </p>
              <div className="ship-track">
                <span style={{ width: `${progress}%` }} />
              </div>
            </div>

            <h2>Order summary</h2>
            <dl className="summary-lines">
              <div>
                <dt>Subtotal</dt>
                <dd>{formatMoney(subtotal)}</dd>
              </div>
              {discount > 0 && (
                <div className="is-discount">
                  <dt>Discount ({promo})</dt>
                  <dd>−{formatMoney(discount)}</dd>
                </div>
              )}
              <div>
                <dt>Shipping</dt>
                <dd>{shipping === 0 ? <span className="free-tag">Free</span> : formatMoney(shipping)}</dd>
              </div>
              <div>
                <dt>Estimated tax</dt>
                <dd>{formatMoney(tax)}</dd>
              </div>
            </dl>
            <div className="summary-total">
              <span>Total</span>
              <strong>{formatMoney(total)}</strong>
            </div>
            <p className="summary-note">USD. Duties included for international orders.</p>
            <button
              type="button"
              className="btn btn--dark btn--block"
              onClick={() => navigate('/checkout')}
            >
              Continue to checkout <ArrowRightIcon size={16} />
            </button>
            <ul className="summary-perks">
              <li>
                <LockIcon size={15} /> Secure checkout
              </li>
              <li>
                <TruckIcon size={15} /> Carbon-neutral delivery
              </li>
              <li>
                <LeafIcon size={15} /> Plastic-free packaging
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
}
