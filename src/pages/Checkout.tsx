import { useRef, useState, type FormEvent, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRightIcon,
  CheckIcon,
  ChevronDownIcon,
  LockIcon,
  LeafIcon,
  ShieldIcon,
  TruckIcon,
} from '../components/Icons';
import { useStore, type ResolvedLine } from '../context/StoreContext';
import {
  EXPRESS_SHIPPING,
  FREE_SHIPPING_THRESHOLD,
  STANDARD_SHIPPING,
  TAX_RATE,
} from '../data/products';
import { usePageTitle } from '../hooks/usePageTitle';
import { cx, estimatedDelivery, formatMoney, roundMoney } from '../lib/utils';

type ShippingMethod = 'standard' | 'express';

interface FormState {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apt: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  shipping: ShippingMethod;
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
}

type TextField = Exclude<keyof FormState, 'shipping'>;

const emptyForm: FormState = {
  email: '',
  firstName: '',
  lastName: '',
  address: '',
  apt: '',
  city: '',
  state: '',
  zip: '',
  country: 'United States',
  shipping: 'standard',
  cardName: '',
  cardNumber: '',
  expiry: '',
  cvc: '',
};

interface Order {
  number: string;
  email: string;
  name: string;
  addressLine: string;
  items: ResolvedLine[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  delivery: string;
  cardLast4: string;
}

function Field({
  label,
  error,
  className,
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={cx('field', error && 'has-error', className)}>
      <span className="field-label">{label}</span>
      {children}
      {error && <span className="field-error">{error}</span>}
    </label>
  );
}

const formatCardNumber = (value: string) =>
  value
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, '$1 ');

const formatExpiry = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
};

export function Checkout() {
  const { lines, subtotal, discount, promo, cartCount, clearCart } = useStore();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [placing, setPlacing] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const timer = useRef<number | null>(null);

  usePageTitle(order ? 'Order confirmed — STILLFORM' : 'Checkout — STILLFORM');

  const shipping =
    form.shipping === 'express'
      ? EXPRESS_SHIPPING
      : subtotal >= FREE_SHIPPING_THRESHOLD
        ? 0
        : STANDARD_SHIPPING;
  const tax = roundMoney((subtotal - discount) * TAX_RATE);
  const total = roundMoney(subtotal - discount + shipping + tax);

  const setField = (key: TextField, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) {
      next.email = 'Enter a valid email address';
    }
    if (!form.firstName.trim()) next.firstName = 'Required';
    if (!form.lastName.trim()) next.lastName = 'Required';
    if (!form.address.trim()) next.address = 'Required';
    if (!form.city.trim()) next.city = 'Required';
    if (!form.state.trim()) next.state = 'Required';
    if (!/^[A-Za-z0-9][A-Za-z0-9 -]{1,9}$/.test(form.zip.trim())) next.zip = 'Enter a valid postal code';
    if (!form.cardName.trim()) next.cardName = 'Required';
    if (form.cardNumber.replace(/\s/g, '').length !== 16) next.cardNumber = 'Enter a 16-digit card number';
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry)) next.expiry = 'MM/YY';
    if (!/^\d{3,4}$/.test(form.cvc)) next.cvc = '3–4 digits';
    return next;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (placing) return;
    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      window.requestAnimationFrame(() => {
        const first = document.querySelector('.field.has-error');
        first?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
      return;
    }

    setPlacing(true);
    timer.current = window.setTimeout(() => {
      const delivery =
        form.shipping === 'express'
          ? `${estimatedDelivery(2)} – ${estimatedDelivery(3)}`
          : `${estimatedDelivery(4)} – ${estimatedDelivery(7)}`;

      setOrder({
        number: `SF-${Math.floor(100000 + Math.random() * 899999)}`,
        email: form.email,
        name: `${form.firstName} ${form.lastName}`,
        addressLine: `${form.address}${form.apt ? `, ${form.apt}` : ''}, ${form.city}, ${form.state} ${form.zip}, ${form.country}`,
        items: lines,
        subtotal,
        discount,
        shipping,
        tax,
        total,
        delivery,
        cardLast4: form.cardNumber.replace(/\s/g, '').slice(-4),
      });
      clearCart();
      setPlacing(false);
      window.scrollTo(0, 0);
    }, 1100);
  };

  const fillDemo = () => {
    setForm({
      email: 'alex.morgan@example.com',
      firstName: 'Alex',
      lastName: 'Morgan',
      address: '214 Alder Street',
      apt: 'Apt 4',
      city: 'Portland',
      state: 'OR',
      zip: '97205',
      country: 'United States',
      shipping: 'standard',
      cardName: 'Alex Morgan',
      cardNumber: '4242 4242 4242 4242',
      expiry: '04/29',
      cvc: '123',
    });
    setErrors({});
  };

  if (order) {
    return (
      <div className="page confirm">
        <div className="container confirm-inner">
          <span className="confirm-mark">
            <CheckIcon size={28} />
          </span>
          <p className="eyebrow">Order {order.number}</p>
          <h1 className="confirm-title">
            Thank you — <em>it’s on its way.</em>
          </h1>
          <p className="confirm-lede">
            A receipt is on its way to <strong>{order.email}</strong>. Your pieces will be wrapped
            by hand and shipped plastic-free from the studio.
          </p>

          <div className="confirm-meta">
            <div>
              <span>Estimated delivery</span>
              <strong>{order.delivery}</strong>
            </div>
            <div>
              <span>Shipping to</span>
              <strong>{order.name}</strong>
              <p>{order.addressLine}</p>
            </div>
            <div>
              <span>Payment</span>
              <strong>Card ending {order.cardLast4}</strong>
              <p>Demo transaction — no charge made</p>
            </div>
          </div>

          <div className="confirm-summary">
            <h2>In this order</h2>
            {order.items.map((item) => (
              <div className="confirm-line" key={item.key}>
                <img src={item.product.image} alt={item.product.name} width={52} height={65} />
                <div>
                  <strong>{item.product.name}</strong>
                  <span>{item.option.label} · Qty {item.qty}</span>
                </div>
                <span>{formatMoney(item.lineTotal)}</span>
              </div>
            ))}
            <div className="confirm-total">
              <span>Total paid</span>
              <strong>{formatMoney(order.total)}</strong>
            </div>
          </div>

          <div className="confirm-actions">
            <Link to="/shop" className="btn btn--dark">
              Keep browsing <ArrowRightIcon size={16} />
            </Link>
            <Link to="/" className="btn btn--ghost">
              Back home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cartCount === 0) {
    return (
      <div className="page checkout-page">
        <div className="container">
          <div className="empty-state empty-state--page">
            <span className="empty-mark" aria-hidden>
              ✳
            </span>
            <h1>Nothing to check out — yet.</h1>
            <p>Your bag is empty. Find something worth keeping.</p>
            <Link to="/shop" className="btn btn--dark">
              Explore the collection <ArrowRightIcon size={16} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page checkout-page">
      <div className="container">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden>/</span>
          <Link to="/cart">Your bag</Link>
          <span aria-hidden>/</span>
          <span>Checkout</span>
        </nav>

        <div className="checkout-head">
          <div>
            <p className="eyebrow">
              <span className="eyebrow-rule" aria-hidden />
              Secure checkout
            </p>
            <h1 className="page-title">Checkout</h1>
          </div>
          <div className="checkout-demo">
            <span>This is a demo store — no real payment is taken.</span>
            <button type="button" onClick={fillDemo}>
              Autofill demo details
            </button>
          </div>
        </div>

        <form className="checkout-layout" onSubmit={handleSubmit} noValidate>
          <div className="checkout-main">
            <section className="checkout-section">
              <div className="checkout-section-head">
                <span className="step-number">01</span>
                <h2>Contact</h2>
              </div>
              <Field label="Email address" error={errors.email}>
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => setField('email', event.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                />
              </Field>
              <p className="checkout-hint">Your receipt and tracking updates land here.</p>
            </section>

            <section className="checkout-section">
              <div className="checkout-section-head">
                <span className="step-number">02</span>
                <h2>Shipping address</h2>
              </div>
              <div className="field-grid field-grid--2">
                <Field label="First name" error={errors.firstName}>
                  <input
                    value={form.firstName}
                    onChange={(event) => setField('firstName', event.target.value)}
                    autoComplete="given-name"
                    placeholder="Alex"
                  />
                </Field>
                <Field label="Last name" error={errors.lastName}>
                  <input
                    value={form.lastName}
                    onChange={(event) => setField('lastName', event.target.value)}
                    autoComplete="family-name"
                    placeholder="Morgan"
                  />
                </Field>
              </div>
              <Field label="Street address" error={errors.address}>
                <input
                  value={form.address}
                  onChange={(event) => setField('address', event.target.value)}
                  autoComplete="street-address"
                  placeholder="214 Alder Street"
                />
              </Field>
              <Field label="Apartment, suite (optional)">
                <input
                  value={form.apt}
                  onChange={(event) => setField('apt', event.target.value)}
                  autoComplete="address-line2"
                  placeholder="Apt 4"
                />
              </Field>
              <div className="field-grid field-grid--3">
                <Field label="City" error={errors.city}>
                  <input
                    value={form.city}
                    onChange={(event) => setField('city', event.target.value)}
                    autoComplete="address-level2"
                    placeholder="Portland"
                  />
                </Field>
                <Field label="State / region" error={errors.state}>
                  <input
                    value={form.state}
                    onChange={(event) => setField('state', event.target.value)}
                    autoComplete="address-level1"
                    placeholder="OR"
                  />
                </Field>
                <Field label="Postal code" error={errors.zip}>
                  <input
                    value={form.zip}
                    onChange={(event) => setField('zip', event.target.value)}
                    autoComplete="postal-code"
                    placeholder="97205"
                  />
                </Field>
              </div>
              <Field label="Country">
                <span className="select-field select-field--full">
                  <select
                    value={form.country}
                    onChange={(event) => setField('country', event.target.value)}
                    autoComplete="country-name"
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                    <option>Australia</option>
                    <option>Germany</option>
                    <option>France</option>
                    <option>Japan</option>
                  </select>
                  <ChevronDownIcon size={15} className="select-caret" />
                </span>
              </Field>
            </section>

            <section className="checkout-section">
              <div className="checkout-section-head">
                <span className="step-number">03</span>
                <h2>Delivery</h2>
              </div>
              <div className="ship-options">
                <label className={cx('ship-option', form.shipping === 'standard' && 'is-active')}>
                  <input
                    type="radio"
                    name="shipping"
                    checked={form.shipping === 'standard'}
                    onChange={() => setForm((prev) => ({ ...prev, shipping: 'standard' }))}
                  />
                  <span className="ship-radio" aria-hidden />
                  <span className="ship-option-copy">
                    <strong>Standard</strong>
                    <span>4–7 business days · plastic-free packing</span>
                  </span>
                  <span className="ship-option-price">
                    {subtotal >= FREE_SHIPPING_THRESHOLD ? 'Free' : formatMoney(STANDARD_SHIPPING)}
                  </span>
                </label>
                <label className={cx('ship-option', form.shipping === 'express' && 'is-active')}>
                  <input
                    type="radio"
                    name="shipping"
                    checked={form.shipping === 'express'}
                    onChange={() => setForm((prev) => ({ ...prev, shipping: 'express' }))}
                  />
                  <span className="ship-radio" aria-hidden />
                  <span className="ship-option-copy">
                    <strong>Express</strong>
                    <span>2–3 business days · tracked and insured</span>
                  </span>
                  <span className="ship-option-price">{formatMoney(EXPRESS_SHIPPING)}</span>
                </label>
              </div>
            </section>

            <section className="checkout-section">
              <div className="checkout-section-head">
                <span className="step-number">04</span>
                <h2>Payment</h2>
                <span className="checkout-secure">
                  <LockIcon size={14} /> Encrypted
                </span>
              </div>
              <Field label="Card number" error={errors.cardNumber}>
                <span className="card-input">
                  <input
                    value={form.cardNumber}
                    onChange={(event) => setField('cardNumber', formatCardNumber(event.target.value))}
                    placeholder="4242 4242 4242 4242"
                    inputMode="numeric"
                    autoComplete="cc-number"
                  />
                  <span className="card-brand">VISA</span>
                </span>
              </Field>
              <div className="field-grid field-grid--2">
                <Field label="Expiry" error={errors.expiry}>
                  <input
                    value={form.expiry}
                    onChange={(event) => setField('expiry', formatExpiry(event.target.value))}
                    placeholder="MM/YY"
                    inputMode="numeric"
                    autoComplete="cc-exp"
                  />
                </Field>
                <Field label="Security code" error={errors.cvc}>
                  <input
                    value={form.cvc}
                    onChange={(event) => setField('cvc', event.target.value.replace(/\D/g, '').slice(0, 4))}
                    placeholder="CVC"
                    inputMode="numeric"
                    autoComplete="cc-csc"
                  />
                </Field>
              </div>
              <Field label="Name on card" error={errors.cardName}>
                <input
                  value={form.cardName}
                  onChange={(event) => setField('cardName', event.target.value)}
                  placeholder="Alex Morgan"
                  autoComplete="cc-name"
                />
              </Field>
              <p className="checkout-hint">
                <ShieldIcon size={15} /> Demo checkout. Use any 16-digit number — nothing is charged.
              </p>
            </section>

            <div className="checkout-mobile-cta">
              <div>
                <span>Total</span>
                <strong>{formatMoney(total)}</strong>
              </div>
              <button type="submit" className="btn btn--dark" disabled={placing}>
                {placing ? 'Placing order…' : 'Place order'}
              </button>
            </div>
          </div>

          <aside className="checkout-summary" aria-label="Order summary">
            <div className="checkout-summary-head">
              <h2>Order summary</h2>
              <Link to="/cart">Edit bag</Link>
            </div>

            <div className="checkout-items">
              {lines.map((line) => (
                <div className="checkout-item" key={line.key}>
                  <div className="checkout-item-media">
                    <img
                      src={line.product.image}
                      alt={line.product.name}
                      width={56}
                      height={70}
                    />
                    <span className="checkout-item-qty">{line.qty}</span>
                  </div>
                  <div className="checkout-item-body">
                    <strong>{line.product.name}</strong>
                    <span>{line.option.label}</span>
                  </div>
                  <span className="checkout-item-price">{formatMoney(line.lineTotal)}</span>
                </div>
              ))}
            </div>

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
            <p className="summary-note">USD · duties included</p>

            <button type="submit" className="btn btn--dark btn--block checkout-submit" disabled={placing}>
              {placing ? (
                <>
                  <span className="spinner" aria-hidden /> Placing order…
                </>
              ) : (
                <>
                  Place order · {formatMoney(total)} <ArrowRightIcon size={16} />
                </>
              )}
            </button>

            <ul className="summary-perks">
              <li>
                <LockIcon size={15} /> Secure, encrypted checkout
              </li>
              <li>
                <TruckIcon size={15} /> Carbon-neutral delivery
              </li>
              <li>
                <LeafIcon size={15} /> Plastic-free packaging
              </li>
            </ul>
            <p className="checkout-terms">
              By placing your order you agree to our terms and privacy policy. This demo does not
              process real payments.
            </p>
          </aside>
        </form>
      </div>
    </div>
  );
}
