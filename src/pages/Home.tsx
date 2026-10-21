import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Accordion } from '../components/Accordion';
import {
  ArrowRightIcon,
  CheckIcon,
  LeafIcon,
  ShieldIcon,
  TruckIcon,
} from '../components/Icons';
import { ProductCard } from '../components/ProductCard';
import { Reveal } from '../components/Reveal';
import { Stars } from '../components/Stars';
import { bestsellers, categories, newArrivals, products } from '../data/products';

const perks = [
  { icon: TruckIcon, title: 'Free shipping over $75', copy: 'Carbon-neutral delivery' },
  { icon: ShieldIcon, title: '30-day returns', copy: 'No questions, no fuss' },
  { icon: LeafIcon, title: 'Plastic-free packing', copy: 'Recycled, recyclable' },
  { icon: CheckIcon, title: 'Made by hand', copy: 'Small batches, always' },
];

const reviews = [
  {
    quote:
      'I bought the Arc Mug as a gift and ended up keeping it. Everything about it feels considered — the weight, the glaze, the handle.',
    name: 'Claire M.',
    place: 'London, UK',
  },
  {
    quote:
      'The parcel arrived plastic-free and beautifully wrapped. The vase is even better in person — the photos do not do the clay justice.',
    name: 'Noah P.',
    place: 'Brooklyn, NY',
  },
  {
    quote:
      'Three orders in and everything still looks new. These are the pieces we reach for every single day, not just when guests come over.',
    name: 'Sofia L.',
    place: 'Copenhagen, DK',
  },
];

const faqs = [
  {
    title: 'How long does shipping take?',
    content:
      'Orders leave the studio within 1–2 business days. Standard delivery takes 3–5 business days in the US and 7–12 days internationally. Express options are available at checkout.',
  },
  {
    title: 'Do you ship outside the United States?',
    content:
      'Yes — we ship to more than 40 countries. Duties and taxes are calculated at checkout, so there is nothing extra to pay when your parcel arrives.',
  },
  {
    title: 'What is your return policy?',
    content:
      'If a piece is not right, send it back within 30 days in its original condition for a full refund. We cover the return label for US orders and can help arrange international returns.',
  },
  {
    title: 'How should I care for my stoneware?',
    content:
      'Most of our pieces are dishwasher and microwave safe. Hand washing is recommended for anything with a bamboo handle or an unglazed finish. Avoid sudden temperature changes.',
  },
];

function SectionHead({
  eyebrow,
  title,
  link,
}: {
  eyebrow: string;
  title: string;
  link?: { to: string; label: string };
}) {
  return (
    <div className="section-head">
      <div>
        <p className="eyebrow">
          <span className="eyebrow-rule" aria-hidden />
          {eyebrow}
        </p>
        <h2 className="section-title">{title}</h2>
      </div>
      {link && (
        <Link to={link.to} className="link-arrow">
          {link.label} <ArrowRightIcon size={15} />
        </Link>
      )}
    </div>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="newsletter-success" role="status">
        <span className="newsletter-success-icon">
          <CheckIcon size={18} />
        </span>
        <div>
          <strong>You’re on the list.</strong>
          <p>Welcome to slower living — look out for our next studio letter.</p>
        </div>
      </div>
    );
  }

  return (
    <form className="newsletter-form" onSubmit={submit} noValidate>
      <label className="sr-only" htmlFor="newsletter-email">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
          setError('');
        }}
        placeholder="Your email address"
        autoComplete="email"
        aria-invalid={Boolean(error)}
      />
      <button type="submit" aria-label="Subscribe to the studio letter">
        <ArrowRightIcon size={20} />
      </button>
      {error && (
        <span className="newsletter-error" role="alert">
          {error}
        </span>
      )}
    </form>
  );
}

export function Home() {
  const categoryCount = (id: string) => products.filter((product) => product.category === id).length;

  return (
    <div className="home">
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="eyebrow-rule" aria-hidden />
              Spring 2026 — The Ember Series
            </p>
            <h1 className="hero-title">
              Objects for
              <br />
              <em>slower</em> living.
            </h1>
            <p className="hero-lede">
              Hand-thrown stoneware for the everyday table. Made in small batches in Portland,
              finished by hand, and built to be used for years — not seasons.
            </p>
            <div className="hero-actions">
              <Link to="/shop" className="btn btn--dark">
                Shop the collection <ArrowRightIcon size={16} />
              </Link>
              <Link to="/shop?category=tableware" className="btn btn--ghost">
                Tableware
              </Link>
            </div>
            <div className="hero-proof">
              <Stars rating={4.9} size={13} />
              <p>
                <strong>4.9</strong> from 1,200+ homes in 40 countries
              </p>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-frame">
              <img
                src="/images/hero.jpg"
                alt="Handmade stoneware mug, terracotta vase and bowl on a linen table in morning light"
                width={1024}
                height={1280}
              />
            </div>

            <Link to="/product/ember-vase" className="hero-card">
              <img src="/images/product-ember-vase.jpg" alt="" width={56} height={70} />
              <span className="hero-card-body">
                <span className="hero-card-eyebrow">New arrival</span>
                <strong>Ember Vase</strong>
                <span className="hero-card-price">From $68.00</span>
              </span>
              <span className="hero-card-arrow">
                <ArrowRightIcon size={15} />
              </span>
            </Link>

            <div className="hero-stamp" aria-hidden="true">
              <svg viewBox="0 0 120 120">
                <defs>
                  <path
                    id="stamp-path"
                    d="M60,60 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0"
                  />
                </defs>
                <text>
                  <textPath href="#stamp-path">
                    HANDMADE · SMALL BATCH · STONEWARE · PORTLAND OR ·
                  </textPath>
                </text>
              </svg>
              <span className="hero-stamp-center">✳</span>
            </div>
          </div>
        </div>
      </section>

      <section className="perks" aria-label="Why shop with STILLFORM">
        <div className="container perks-inner">
          {perks.map((perk) => (
            <div className="perk" key={perk.title}>
              <perk.icon size={20} />
              <div>
                <strong>{perk.title}</strong>
                <span>{perk.copy}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Shop by category"
            title="Made for the everyday table"
            link={{ to: '/shop', label: 'View all pieces' }}
          />
          <div className="category-grid">
            {categories.map((category, index) => (
              <Reveal key={category.id} delay={index * 70}>
                <Link to={`/shop?category=${category.id}`} className="cat-card">
                  <img src={category.image} alt={category.label} loading="lazy" />
                  <div className="cat-overlay">
                    <span className="cat-count">{categoryCount(category.id)} pieces</span>
                    <h3>{category.label}</h3>
                    <span className="cat-link">
                      Shop now <ArrowRightIcon size={14} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <SectionHead
            eyebrow="Most loved"
            title="The pieces that keep selling out"
            link={{ to: '/shop?sort=rating', label: 'Shop bestsellers' }}
          />
          <div className="grid grid--4">
            {bestsellers.map((product, index) => (
              <Reveal key={product.id} delay={index * 60}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="story" id="story">
        <div className="container story-inner">
          <Reveal className="story-media">
            <img
              src="/images/lifestyle-studio.jpg"
              alt="Hands shaping wet clay on a pottery wheel in the studio"
              loading="lazy"
            />
            <span className="story-tag">
              Portland, Oregon
              <br />
              Est. 2016
            </span>
          </Reveal>
          <Reveal className="story-copy" delay={100}>
            <p className="eyebrow">
              <span className="eyebrow-rule" aria-hidden />
              Our story
            </p>
            <h2 className="section-title">
              Made slowly.
              <br />
              Used daily.
            </h2>
            <p>
              Every STILLFORM piece begins on a wheel in our Portland studio. We throw in small
              runs, mix our own glazes and fire twice for strength — because the best objects are
              the ones you reach for without thinking.
            </p>
            <p>
              No seasonal churn. No plastic in the parcel. Just quiet, useful pottery that gets
              better with the years.
            </p>
            <div className="story-stats">
              <div>
                <strong>12</strong>
                <span>studio artisans</span>
              </div>
              <div>
                <strong>100%</strong>
                <span>natural stoneware</span>
              </div>
              <div>
                <strong>40+</strong>
                <span>countries shipped</span>
              </div>
            </div>
            <Link to="/shop" className="link-arrow">
              Explore the collection <ArrowRightIcon size={15} />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Just landed"
            title="New this season"
            link={{ to: '/shop?sort=new', label: 'See what’s new' }}
          />
          <div className="grid grid--4">
            {newArrivals.slice(0, 4).map((product, index) => (
              <Reveal key={product.id} delay={index * 60}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="reviews" id="reviews">
        <div className="container">
          <div className="reviews-head">
            <p className="eyebrow">
              <span className="eyebrow-rule" aria-hidden />
              1,200+ reviews
            </p>
            <h2 className="section-title">Loved in 40 countries</h2>
            <div className="reviews-rating">
              <Stars rating={5} size={14} />
              <span>4.9 average · 98% would recommend</span>
            </div>
          </div>
          <div className="review-grid">
            {reviews.map((review, index) => (
              <Reveal key={review.name} delay={index * 80}>
                <figure className="review-card">
                  <Stars rating={5} size={13} />
                  <blockquote>“{review.quote}”</blockquote>
                  <figcaption>
                    <span>{review.name}</span>
                    <span>{review.place}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section faq-section" id="faq">
        <div className="container faq-inner">
          <Reveal className="faq-head">
            <p className="eyebrow">
              <span className="eyebrow-rule" aria-hidden />
              Good to know
            </p>
            <h2 className="section-title">
              Shipping, care
              <br />
              and returns.
            </h2>
            <p>
              Ordered from overseas before? It is simpler than you think. Duties are paid up
              front and returns are easy.
            </p>
            <a href="mailto:hello@stillform.studio" className="link-arrow">
              Talk to a human <ArrowRightIcon size={15} />
            </a>
          </Reveal>
          <Reveal delay={100}>
            <Accordion items={faqs} />
          </Reveal>
        </div>
      </section>

      <section className="newsletter">
        <div className="container newsletter-inner">
          <p className="eyebrow eyebrow--light">The studio letter</p>
          <h2>A quieter inbox.</h2>
          <p>
            New pieces, studio notes and the occasional glaze experiment. Sent once a month,
            never more.
          </p>
          <NewsletterForm />
          <span className="newsletter-note">No noise. Unsubscribe any time.</span>
        </div>
      </section>
    </div>
  );
}
