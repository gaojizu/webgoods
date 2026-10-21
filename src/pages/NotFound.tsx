import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '../components/Icons';
import { usePageTitle } from '../hooks/usePageTitle';

export function NotFound() {
  usePageTitle('Page not found — STILLFORM');

  return (
    <div className="page not-found">
      <div className="container not-found-inner">
        <p className="eyebrow">
          <span className="eyebrow-rule" aria-hidden />
          404
        </p>
        <h1>
          This piece has
          <br />
          <em>left the shelf.</em>
        </h1>
        <p>
          The page you’re looking for has moved or sold out. The collection, however, is very much
          still here.
        </p>
        <div className="not-found-actions">
          <Link to="/shop" className="btn btn--dark">
            Shop the collection <ArrowRightIcon size={16} />
          </Link>
          <Link to="/" className="btn btn--ghost">
            Back home
          </Link>
        </div>
        <span className="not-found-mark" aria-hidden>
          ✳
        </span>
      </div>
    </div>
  );
}
