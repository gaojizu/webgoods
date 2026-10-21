import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  FREE_SHIPPING_THRESHOLD,
  PROMO_CODES,
  getOption,
  products,
  unitPrice,
  type Product,
  type ProductOption,
} from '../data/products';
import { roundMoney } from '../lib/utils';

export interface CartLine {
  key: string;
  productId: string;
  optionId: string;
  qty: number;
}

export interface ResolvedLine {
  key: string;
  product: Product;
  option: ProductOption;
  qty: number;
  unitPrice: number;
  lineTotal: number;
}

interface StoreValue {
  cart: CartLine[];
  lines: ResolvedLine[];
  cartCount: number;
  subtotal: number;
  discount: number;
  promo: string | null;
  shippingRemaining: number;
  addToCart: (productId: string, optionId: string, qty?: number, openDrawer?: boolean) => void;
  updateQty: (key: string, qty: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  searchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  menuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  wishlist: string[];
  isWished: (id: string) => boolean;
  toggleWishlist: (id: string) => void;
}

const StoreContext = createContext<StoreValue | null>(null);

const read = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const write = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage can be unavailable in private mode — the store still works in memory */
  }
};

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>(() => read<CartLine[]>('stillform.cart.v1', []));
  const [promo, setPromo] = useState<string | null>(() => read<string | null>('stillform.promo.v1', null));
  const [wishlist, setWishlist] = useState<string[]>(() =>
    read<string[]>('stillform.wishlist.v1', []),
  );
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => write('stillform.cart.v1', cart), [cart]);
  useEffect(() => write('stillform.promo.v1', promo), [promo]);
  useEffect(() => write('stillform.wishlist.v1', wishlist), [wishlist]);

  const openCart = useCallback(() => {
    setCartOpen(true);
    setSearchOpen(false);
    setMenuOpen(false);
  }, []);

  const closeCart = useCallback(() => setCartOpen(false), []);
  const openSearch = useCallback(() => {
    setSearchOpen(true);
    setCartOpen(false);
    setMenuOpen(false);
  }, []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);
  const openMenu = useCallback(() => {
    setMenuOpen(true);
    setCartOpen(false);
    setSearchOpen(false);
  }, []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const addToCart = useCallback(
    (productId: string, optionId: string, qty = 1, openDrawer = true) => {
      const key = `${productId}:${optionId}`;
      setCart((prev) => {
        const existing = prev.find((line) => line.key === key);
        if (existing) {
          return prev.map((line) =>
            line.key === key ? { ...line, qty: Math.min(99, line.qty + qty) } : line,
          );
        }
        return [...prev, { key, productId, optionId, qty }];
      });
      if (openDrawer) openCart();
    },
    [openCart],
  );

  const updateQty = useCallback((key: string, qty: number) => {
    setCart((prev) =>
      qty < 1
        ? prev.filter((line) => line.key !== key)
        : prev.map((line) => (line.key === key ? { ...line, qty: Math.min(99, qty) } : line)),
    );
  }, []);

  const removeItem = useCallback((key: string) => {
    setCart((prev) => prev.filter((line) => line.key !== key));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    setPromo(null);
  }, []);

  const applyPromo = useCallback((code: string) => {
    const normalized = code.trim().toUpperCase();
    if (PROMO_CODES[normalized] !== undefined) {
      setPromo(normalized);
      return true;
    }
    return false;
  }, []);

  const removePromo = useCallback(() => setPromo(null), []);

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  }, []);

  const isWished = useCallback((id: string) => wishlist.includes(id), [wishlist]);

  const lines = useMemo<ResolvedLine[]>(
    () =>
      cart.flatMap((line) => {
        const product = products.find((p) => p.id === line.productId);
        if (!product) return [];
        const option = getOption(product, line.optionId);
        const price = unitPrice(product, line.optionId);
        return [
          {
            key: line.key,
            product,
            option,
            qty: line.qty,
            unitPrice: price,
            lineTotal: roundMoney(price * line.qty),
          },
        ];
      }),
    [cart],
  );

  const subtotal = useMemo(
    () => roundMoney(lines.reduce((sum, line) => sum + line.lineTotal, 0)),
    [lines],
  );
  const cartCount = useMemo(() => lines.reduce((sum, line) => sum + line.qty, 0), [lines]);
  const discount = useMemo(
    () => (promo ? roundMoney(subtotal * (PROMO_CODES[promo] ?? 0)) : 0),
    [promo, subtotal],
  );
  const shippingRemaining = Math.max(0, roundMoney(FREE_SHIPPING_THRESHOLD - subtotal));

  const value: StoreValue = {
    cart,
    lines,
    cartCount,
    subtotal,
    discount,
    promo,
    shippingRemaining,
    addToCart,
    updateQty,
    removeItem,
    clearCart,
    applyPromo,
    removePromo,
    cartOpen,
    openCart,
    closeCart,
    searchOpen,
    openSearch,
    closeSearch,
    menuOpen,
    openMenu,
    closeMenu,
    wishlist,
    isWished,
    toggleWishlist,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
}
