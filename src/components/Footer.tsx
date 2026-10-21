import { Link } from 'react-router-dom';
import { categories } from '../data/products';
import { InstagramIcon, PinterestIcon } from './Icons';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              STILLFORM
            </Link>
            <p>
              Hand-thrown stoneware, made in small batches and shipped plastic-free from our
              Portland studio to homes around the world.
            </p>
            <div className="footer-social">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="STILLFORM on Instagram"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                aria-label="STILLFORM on Pinterest"
              >
                <PinterestIcon size={18} />
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h3>Shop</h3>
            <Link to="/shop">All pieces</Link>
            {categories.map((category) => (
              <Link key={category.id} to={`/shop?category=${category.id}`}>
                {category.label}
              </Link>
            ))}
          </div>

          <div className="footer-col">
            <h3>Studio</h3>
            <Link to="/#story">Our story</Link>
            <Link to="/#story">The making</Link>
            <Link to="/#reviews">Reviews</Link>
            <a href="mailto:hello@stillform.studio">Contact us</a>
          </div>

          <div className="footer-col">
            <h3>Help</h3>
            <Link to="/#faq">Shipping &amp; returns</Link>
            <Link to="/#faq">Product care</Link>
            <Link to="/#faq">FAQs</Link>
            <span className="footer-note">Ships worldwide</span>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 STILLFORM</span>
          <span className="footer-locale">United States · USD $</span>
          <span className="footer-pay">Visa · Mastercard · Amex · PayPal</span>
        </div>
      </div>
    </footer>
  );
}
