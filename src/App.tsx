import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { MobileMenu } from './components/MobileMenu';
import { SearchOverlay } from './components/SearchOverlay';
import { StoreProvider } from './context/StoreContext';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { ProductPage } from './pages/Product';
import { Shop } from './pages/Shop';

function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const timer = window.setTimeout(() => {
        document
          .getElementById(location.hash.replace('#', ''))
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
      return () => window.clearTimeout(timer);
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  return null;
}

export default function App() {
  return (
    <StoreProvider>
      <div className="app">
        <ScrollManager />
        <Header />
        <MobileMenu />
        <SearchOverlay />
        <CartDrawer />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:slug" element={<ProductPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </StoreProvider>
  );
}
