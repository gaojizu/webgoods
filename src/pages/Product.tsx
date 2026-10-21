import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Accordion } from '../components/Accordion';
import {
  ArrowRightIcon,
  CheckIcon,
  HeartIcon,
  LeafIcon,
  ShieldIcon,
  TruckIcon,
} from '../components/Icons';
import { ProductCard } from '../components/ProductCard';
import { QuantityStepper } from '../components/QuantityStepper';
import { Stars } from '../components/Stars';
import { useStore } from '../context/StoreContext';
import {
  categoryById,
  getOption,
  getProduct,
  relatedProducts,
  unitPrice,
  type Product,
} from '../data/products';
import { usePageTitle } from '../hooks/usePageTitle';
import { cx, formatMoney } from '../lib/utils';
import { NotFound } from './NotFound';

function ProductDetail({ product }: { product: Product }) {
  const { addToCart, isWished, toggleWishlist } = useStore();
  const [optionId, setOptionId] = useState(product.options[0].id);
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const option = getOption(product, optionId);
  const price = unitPrice(product, optionId);
  const images = [product.image, ...product.gallery];
  const category = categoryById(product.category);
  const wished = isWished(product.id);
  const related = relatedProducts(product, 4);

  usePageTitle(`${product.name} — STILLFORM`);

  const add = () => addToCart(product.id, optionId, qty);

  return (
    <div className="page pdp">
      <div className="container">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden>/</span>
          <Link to="/shop">Shop</Link>
          <span aria-hidden>/</span>
          <Link to={`/shop?category=${product.category}`}>{category.shortLabel}</Link>
          <span aria-hidden>/</span>
          <span>{product.name}</span>
        </nav>

        <div className="pdp-grid">
          <div className="pdp-gallery">
            <div className="pdp-thumbs">
              {images.map((image, index) => (
                <button
                  key={image + index}
                  type="button"
                  className={cx('pdp-thumb', activeImage === index && 'is-active')}
                  onClick={() => setActiveImage(index)}
                  aria-label={`View image ${index + 1} of ${images.length}`}
                  aria-pressed={activeImage === index}
                >
                  <img src={image} alt="" loading="lazy" />
                </button>
              ))}
            </div>
            <div className="pdp-stage">
              <img
                key={images[activeImage]}
                src={images[activeImage]}
                alt={`${product.name} — view ${activeImage + 1}`}
                width={1024}
                height={1280}
              />
              <span className="pdp-made">
                <LeafIcon size={14} /> One of a kind
              </span>
            </div>
          </div>

          <div className="pdp-info">
            <div className="pdp-badges">
              {product.badge && (
                <span className={cx('p-badge', product.badge === 'New' && 'p-badge--new')}>
                  {product.badge}
                </span>
              )}
              {product.stock <= 5 && (
                <span className="low-stock">
                  <span className="dot" /> Only {product.stock} left
                </span>
              )}
            </div>

            <h1 className="pdp-title">{product.name}</h1>
            <p className="pdp-tagline">{product.tagline}</p>

            <div className="pdp-rating">
              <Stars rating={product.rating} size={13} />
              <a href="#reviews">
                {product.rating.toFixed(1)} · {product.reviewCount} reviews
              </a>
            </div>

            <p className="pdp-price">
              {formatMoney(price)} <span>USD</span>
            </p>

            <p className="pdp-desc">{product.description[0]}</p>

            <div className="pdp-options">
              <div className="option-head">
                <span className="option-label">{product.optionLabel}</span>
                <span className="option-current">{option.label}</span>
              </div>
              <div className="option-row">
                {product.options.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={cx('option-btn', optionId === item.id && 'is-active')}
                    onClick={() => {
                      setOptionId(item.id);
                      setQty(1);
                    }}
                    aria-pressed={optionId === item.id}
                  >
                    <span className="option-btn-label">{item.label}</span>
                    {item.note && <span className="option-btn-note">{item.note}</span>}
                  </button>
                ))}
              </div>
            </div>

            <div className="pdp-buy">
              <QuantityStepper value={qty} onChange={setQty} max={product.stock} />
              <button type="button" className="btn btn--dark pdp-add" onClick={add}>
                Add to bag <span className="pdp-add-price">· {formatMoney(price * qty)}</span>
              </button>
              <button
                type="button"
                className={cx('pdp-wish', wished && 'is-on')}
                onClick={() => toggleWishlist(product.id)}
                aria-pressed={wished}
                aria-label={wished ? 'Remove from saved pieces' : 'Save this piece'}
              >
                <HeartIcon size={19} />
              </button>
            </div>

            <div className="pdp-assurance">
              <span>
                <TruckIcon size={17} /> Ships in 1–2 days
              </span>
              <span>
                <ShieldIcon size={17} /> 30-day returns
              </span>
              <span>
                <CheckIcon size={17} /> Free over $75
              </span>
            </div>

            <Accordion
              className="pdp-accordion"
              items={[
                {
                  title: 'Details & care',
                  content: (
                    <dl className="detail-list">
                      {product.details.map((detail) => (
                        <div key={detail.label}>
                          <dt>{detail.label}</dt>
                          <dd>{detail.value}</dd>
                        </div>
                      ))}
                    </dl>
                  ),
                },
                {
                  title: 'Shipping & returns',
                  content: (
                    <div className="acc-copy">
                      <p>
                        Orders leave the studio within 1–2 business days. Standard delivery is
                        3–5 business days in the US and 7–12 days internationally. Express
                        shipping is available at checkout.
                      </p>
                      <p>
                        Changed your mind? Return within 30 days in original condition for a full
                        refund. US return labels are on us.
                      </p>
                    </div>
                  ),
                },
                {
                  title: 'Our promise',
                  content: (
                    <div className="acc-copy">
                      <p>
                        Every piece is thrown, trimmed and glazed by hand, so small variations in
                        tone, speckle and shape are expected — they are how you know it was made
                        by a person, not a machine.
                      </p>
                      <p>Plastic-free packaging, always. Fired to last for years of daily use.</p>
                    </div>
                  ),
                },
              ]}
            />

            <p className="pdp-second-desc">{product.description[1]}</p>
          </div>
        </div>

        <section className="pdp-reviews" id="reviews">
          <div className="pdp-review-head">
            <div>
              <p className="eyebrow">
                <span className="eyebrow-rule" aria-hidden />
                Reviews
              </p>
              <h2 className="section-title">What people are saying</h2>
            </div>
            <div className="rating-summary">
              <strong>{product.rating.toFixed(1)}</strong>
              <div>
                <Stars rating={product.rating} size={13} />
                <span>Based on {product.reviewCount} reviews</span>
              </div>
            </div>
          </div>
          <div className="review-list">
            {product.reviews.map((review) => (
              <figure className="review-card review-card--wide" key={review.author + review.title}>
                <Stars rating={review.rating} size={13} />
                <h3>{review.title}</h3>
                <blockquote>“{review.body}”</blockquote>
                <figcaption>
                  <span>{review.author}</span>
                  <span>
                    {review.location} · {review.date}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="pdp-related">
          <div className="section-head">
            <div>
              <p className="eyebrow">
                <span className="eyebrow-rule" aria-hidden />
                Complete the set
              </p>
              <h2 className="section-title">Pairs well with</h2>
            </div>
            <Link to="/shop" className="link-arrow">
              Shop all <ArrowRightIcon size={15} />
            </Link>
          </div>
          <div className="grid grid--4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      </div>

      <div className="mobile-buy">
        <div className="mobile-buy-info">
          <span>{product.name}</span>
          <strong>{formatMoney(price * qty)}</strong>
        </div>
        <button type="button" className="btn btn--dark" onClick={add}>
          Add to bag
        </button>
      </div>
    </div>
  );
}

export function ProductPage() {
  const { slug } = useParams();
  const product = slug ? getProduct(slug) : undefined;

  if (!product) return <NotFound />;

  return <ProductDetail key={product.id} product={product} />;
}
