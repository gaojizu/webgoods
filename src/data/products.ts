import { asset } from '../lib/utils';

export type CategoryId = 'tableware' | 'vases' | 'teaware' | 'objects';

export interface Category {
  id: CategoryId;
  label: string;
  shortLabel: string;
  blurb: string;
  image: string;
}

export interface ProductOption {
  id: string;
  label: string;
  note?: string;
  priceDelta: number;
}

export interface Review {
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  body: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategoryId;
  tagline: string;
  price: number;
  image: string;
  gallery: string[];
  description: string[];
  optionLabel: string;
  options: ProductOption[];
  details: { label: string; value: string }[];
  rating: number;
  reviewCount: number;
  badge?: string;
  isNew?: boolean;
  bestseller?: boolean;
  stock: number;
  reviews: Review[];
}

export const FREE_SHIPPING_THRESHOLD = 75;
export const STANDARD_SHIPPING = 8;
export const EXPRESS_SHIPPING = 18;
export const TAX_RATE = 0.08;
export const PROMO_CODES: Record<string, number> = { SLOW10: 0.1 };

export const categories: Category[] = [
  {
    id: 'tableware',
    label: 'Tableware',
    shortLabel: 'Tableware',
    blurb: 'Mugs, bowls and plates for the everyday table.',
    image: asset('/images/product-still-plate.jpg'),
  },
  {
    id: 'vases',
    label: 'Vases & planters',
    shortLabel: 'Vases',
    blurb: 'Quiet forms for branches, stems and green things.',
    image: asset('/images/product-ember-vase.jpg'),
  },
  {
    id: 'teaware',
    label: 'Teaware',
    shortLabel: 'Teaware',
    blurb: 'Slow pots for slow mornings.',
    image: asset('/images/product-kanso-teapot.jpg'),
  },
  {
    id: 'objects',
    label: 'Objects',
    shortLabel: 'Objects',
    blurb: 'Small pieces that make a room feel considered.',
    image: asset('/images/product-onda-tray.jpg'),
  },
];

const sharedGallery = [asset('/images/lifestyle-table.jpg'), asset('/images/lifestyle-studio.jpg')];

export const products: Product[] = [
  {
    id: 'arc-mug',
    slug: 'arc-mug',
    name: 'Arc Mug',
    category: 'tableware',
    tagline: 'A generous everyday mug with a handle that fits just right.',
    price: 32,
    image: asset('/images/product-arc-mug.jpg'),
    gallery: sharedGallery,
    description: [
      'Thrown in our Portland studio from high-fired stoneware, the Arc Mug has a gently tapered body, a soft thumb rest and a sand glaze that lets the iron in the clay show through. It holds twelve ounces — enough for a proper morning coffee, sturdy enough for every day.',
      'Each piece is finished by hand, so tone and speckle vary slightly. No two mugs are exactly alike, and that is the point.',
    ],
    optionLabel: 'Set',
    options: [
      { id: 'single', label: 'Single', note: '1 mug', priceDelta: 0 },
      { id: 'pair', label: 'Set of 2', note: 'Save $6', priceDelta: 26 },
      { id: 'four', label: 'Set of 4', note: 'Save $24', priceDelta: 72 },
    ],
    details: [
      { label: 'Material', value: 'High-fired stoneware, food-safe sand glaze' },
      { label: 'Dimensions', value: '3.4" H × 3.2" Ø · 12 oz' },
      { label: 'Care', value: 'Dishwasher and microwave safe' },
    ],
    rating: 4.9,
    reviewCount: 214,
    badge: 'Bestseller',
    bestseller: true,
    stock: 24,
    reviews: [
      {
        author: 'Maya R.',
        location: 'Portland, OR',
        rating: 5,
        date: 'March 2026',
        title: 'The handle is exactly right',
        body: 'I reach for this mug before any other. It is substantial without feeling heavy, and the glaze has a lovely quiet speckle in person.',
      },
      {
        author: 'Daniel K.',
        location: 'Copenhagen, DK',
        rating: 5,
        date: 'February 2026',
        title: 'Bought two, then four more',
        body: 'Gave a pair to my sister and immediately ordered a set for myself. They survive the dishwasher beautifully.',
      },
    ],
  },
  {
    id: 'ember-vase',
    slug: 'ember-vase',
    name: 'Ember Vase',
    category: 'vases',
    tagline: 'A tall, quiet silhouette for a single branch or a whole armful.',
    price: 68,
    image: asset('/images/product-ember-vase.jpg'),
    gallery: sharedGallery,
    description: [
      'The Ember Vase is shaped on the wheel and altered while the clay is still soft, giving every neck a slightly different tilt. Unlined terracotta keeps the outside matte and warm; a sealed interior makes it watertight.',
      'Pair it with dried stems or a few garden clippings. Every vase is one of a kind.',
    ],
    optionLabel: 'Height',
    options: [
      { id: 'tall', label: 'Tall', note: '11 in', priceDelta: 0 },
      { id: 'grand', label: 'Grand', note: '14 in', priceDelta: 20 },
    ],
    details: [
      { label: 'Material', value: 'Unglazed terracotta with sealed interior' },
      { label: 'Dimensions', value: '11" H × 4.5" Ø (Tall) · 14" H (Grand)' },
      { label: 'Care', value: 'Hand wash, wipe dry. Keep out of standing water' },
    ],
    rating: 4.8,
    reviewCount: 96,
    badge: 'New',
    isNew: true,
    stock: 12,
    reviews: [
      {
        author: 'Elena M.',
        location: 'Austin, TX',
        rating: 5,
        date: 'April 2026',
        title: 'Even better in person',
        body: 'The clay is textured and warm, and the shape is perfectly off-balance. It looks like something from a gallery.',
      },
      {
        author: 'Tom S.',
        location: 'London, UK',
        rating: 4,
        date: 'March 2026',
        title: 'Beautiful, handle with care',
        body: 'Lovely piece for dried branches. I would not put it anywhere it might get knocked over — it is lighter than it looks.',
      },
    ],
  },
  {
    id: 'kanso-teapot',
    slug: 'kanso-teapot',
    name: 'Kanso Teapot',
    category: 'teaware',
    tagline: 'An easy-pouring teapot with a hand-tied bamboo handle.',
    price: 96,
    image: asset('/images/product-kanso-teapot.jpg'),
    gallery: sharedGallery,
    description: [
      'Kanso means simplicity — a good place to start with a teapot. The rounded body holds heat, the short spout pours clean, and the removable stainless-steel infuser makes loose-leaf tea effortless.',
      'The bamboo handle is tied by hand in the studio and darkens gently with use.',
    ],
    optionLabel: 'Capacity',
    options: [
      { id: '600', label: '600 ml', note: '2–3 cups', priceDelta: 0 },
      { id: '900', label: '900 ml', note: '4–5 cups', priceDelta: 22 },
    ],
    details: [
      { label: 'Material', value: 'Stoneware, cream glaze, bamboo handle' },
      { label: 'Capacity', value: '600 ml / 20 oz · 900 ml / 30 oz' },
      { label: 'Care', value: 'Hand wash recommended. Not for stovetop use' },
    ],
    rating: 4.9,
    reviewCount: 68,
    badge: 'Bestseller',
    bestseller: true,
    stock: 8,
    reviews: [
      {
        author: 'Sofie B.',
        location: 'Aarhus, DK',
        rating: 5,
        date: 'February 2026',
        title: 'My Sunday ritual',
        body: 'Pours without a single drip and keeps the second cup warm. The infuser is easy to rinse out, which matters.',
      },
      {
        author: 'James L.',
        location: 'Toronto, CA',
        rating: 5,
        date: 'January 2026',
        title: 'Worth the wait',
        body: 'Ships from the US and arrived sooner than expected. The bamboo handle is beautiful and comfortable.',
      },
    ],
  },
  {
    id: 'dune-bowl',
    slug: 'dune-bowl',
    name: 'Dune Bowl',
    category: 'tableware',
    tagline: 'A low, wide bowl for everything from oats to olives.',
    price: 44,
    image: asset('/images/product-dune-bowl.jpg'),
    gallery: sharedGallery,
    description: [
      'Wide enough to serve, shallow enough to eat from. The Dune Bowl is pressed with a softly irregular rim and finished in a pale sand glaze that feels like a worn stone.',
      'It is the bowl that ends up on the table for almost every meal.',
    ],
    optionLabel: 'Size',
    options: [
      { id: 'medium', label: 'Medium', note: '8.7 in', priceDelta: 0 },
      { id: 'large', label: 'Large', note: '11 in', priceDelta: 16 },
    ],
    details: [
      { label: 'Material', value: 'Stoneware, pale sand matte glaze' },
      { label: 'Dimensions', value: '8.7" Ø × 2.6" H (Medium) · 11" Ø (Large)' },
      { label: 'Care', value: 'Dishwasher, microwave and oven safe' },
    ],
    rating: 4.7,
    reviewCount: 132,
    stock: 18,
    reviews: [
      {
        author: 'Priya N.',
        location: 'San Francisco, CA',
        rating: 5,
        date: 'March 2026',
        title: 'Everyday favourite',
        body: 'We use it for grain bowls, pasta and popcorn. The rim is what makes it — it feels hand-made, not mass-produced.',
      },
      {
        author: 'Lucas F.',
        location: 'Berlin, DE',
        rating: 4,
        date: 'January 2026',
        title: 'Smaller than expected',
        body: 'The medium is perfect for one person. If you are serving a family, order the large.',
      },
    ],
  },
  {
    id: 'halo-pitcher',
    slug: 'halo-pitcher',
    name: 'Halo Pitcher',
    category: 'teaware',
    tagline: 'A soft olive glaze and a handle made for pouring.',
    price: 56,
    image: asset('/images/product-halo-pitcher.jpg'),
    gallery: sharedGallery,
    description: [
      'A pitcher that earns its place on the table: water at dinner, milk at breakfast, flowers on a Sunday. The Halo is dipped in a soft olive glaze that pools a little darker at the base.',
      'The handle is pulled by hand, so no two are identical.',
    ],
    optionLabel: 'Capacity',
    options: [
      { id: '1l', label: '1 L', note: 'Everyday', priceDelta: 0 },
      { id: '15l', label: '1.5 L', note: 'For the table', priceDelta: 14 },
    ],
    details: [
      { label: 'Material', value: 'Stoneware, olive matte glaze' },
      { label: 'Capacity', value: '1 L / 34 oz · 1.5 L / 50 oz' },
      { label: 'Care', value: 'Hand wash recommended' },
    ],
    rating: 4.8,
    reviewCount: 54,
    badge: 'New',
    isNew: true,
    stock: 6,
    reviews: [
      {
        author: 'Hannah W.',
        location: 'Melbourne, AU',
        rating: 5,
        date: 'March 2026',
        title: 'The colour is stunning',
        body: 'A muted, glazed olive that looks expensive. It pours cleanly and the handle is genuinely comfortable.',
      },
      {
        author: 'Marco D.',
        location: 'Milan, IT',
        rating: 4,
        date: 'February 2026',
        title: 'Lovely but small',
        body: 'The 1 L size is best for water for two. I added the larger one for dinner parties.',
      },
    ],
  },
  {
    id: 'still-plate',
    slug: 'still-plate',
    name: 'Still Plate',
    category: 'tableware',
    tagline: 'The everyday plate, with an edge that looks hand-made because it is.',
    price: 28,
    image: asset('/images/product-still-plate.jpg'),
    gallery: sharedGallery,
    description: [
      'A dinner plate with a low, curved rim that keeps everything on it. Each one is pressed and trimmed by hand, then fired with an off-white glaze that reads warm rather than stark.',
      'Start with one, or give the table a set.',
    ],
    optionLabel: 'Set',
    options: [
      { id: 'single', label: 'Single', note: '1 plate', priceDelta: 0 },
      { id: 'four', label: 'Set of 4', note: 'Save $16', priceDelta: 68 },
    ],
    details: [
      { label: 'Material', value: 'Stoneware, warm off-white glaze' },
      { label: 'Dimensions', value: '10.5" Ø × 1" H' },
      { label: 'Care', value: 'Dishwasher, microwave and oven safe' },
    ],
    rating: 4.8,
    reviewCount: 187,
    stock: 30,
    reviews: [
      {
        author: 'Grace T.',
        location: 'Chicago, IL',
        rating: 5,
        date: 'February 2026',
        title: 'Bought the set of four',
        body: 'They look like the plates you save for guests, but we use them every single day. Still no chips after three months.',
      },
      {
        author: 'Ben A.',
        location: 'Amsterdam, NL',
        rating: 5,
        date: 'December 2025',
        title: 'Beautiful weight',
        body: 'Not too heavy, not too delicate. The slightly uneven rim makes the whole table feel warmer.',
      },
    ],
  },
  {
    id: 'column-candle-holder',
    slug: 'column-candle-holder',
    name: 'Column Candle Holder',
    category: 'objects',
    tagline: 'A slim column for slow evenings and taper candles.',
    price: 38,
    image: asset('/images/product-column-candle-holder.jpg'),
    gallery: sharedGallery,
    description: [
      'A quiet object with a strong shadow. The Column is thrown from dark stoneware and left with a matte, almost chalky finish that contrasts with the glow of a taper.',
      'Weighted at the base so it stays put. Fits standard taper candles.',
    ],
    optionLabel: 'Set',
    options: [
      { id: 'single', label: 'Single', note: '1 holder', priceDelta: 0 },
      { id: 'pair', label: 'Pair', note: 'Save $10', priceDelta: 28 },
    ],
    details: [
      { label: 'Material', value: 'Stoneware, charcoal matte glaze' },
      { label: 'Dimensions', value: '6.7" H × 1.8" Ø · fits standard tapers' },
      { label: 'Care', value: 'Wipe clean. Candle not included' },
    ],
    rating: 4.6,
    reviewCount: 41,
    badge: 'New',
    isNew: true,
    stock: 3,
    reviews: [
      {
        author: 'Nora P.',
        location: 'Brooklyn, NY',
        rating: 5,
        date: 'March 2026',
        title: 'Perfect on a dinner table',
        body: 'The charcoal finish is deep and matte. A pair looks beautiful with a low bouquet between them.',
      },
      {
        author: 'Ines C.',
        location: 'Lisbon, PT',
        rating: 4,
        date: 'February 2026',
        title: 'Simple and sturdy',
        body: 'Exactly as pictured. The base is heavy enough that I do not worry about it tipping.',
      },
    ],
  },
  {
    id: 'ridge-tumbler',
    slug: 'ridge-tumbler',
    name: 'Ridge Tumbler',
    category: 'tableware',
    tagline: 'Fluted tumblers that feel as good as they look.',
    price: 26,
    image: asset('/images/product-ridge-tumbler.jpg'),
    gallery: sharedGallery,
    description: [
      'Ridges pressed into the clay give the Ridge Tumbler its grip and its shadow. The terracotta glaze is deep and warm, and the shape is just right for water, wine or a small dessert.',
      'Sold as a set of two or four, because they tend to disappear from the cupboard.',
    ],
    optionLabel: 'Set',
    options: [
      { id: 'two', label: 'Set of 2', note: 'Save $6', priceDelta: 0 },
      { id: 'four', label: 'Set of 4', note: 'Save $12', priceDelta: 20 },
    ],
    details: [
      { label: 'Material', value: 'Stoneware, terracotta glaze' },
      { label: 'Dimensions', value: '3.5" H × 3" Ø · 8 oz each' },
      { label: 'Care', value: 'Dishwasher safe' },
    ],
    rating: 4.9,
    reviewCount: 165,
    badge: 'Bestseller',
    bestseller: true,
    stock: 20,
    reviews: [
      {
        author: 'Amelia J.',
        location: 'Seattle, WA',
        rating: 5,
        date: 'March 2026',
        title: 'Weighted and wonderful',
        body: 'They feel lovely in the hand and the fluting catches the light. Bought a second set as a wedding gift.',
      },
      {
        author: 'Ravi S.',
        location: 'Vancouver, CA',
        rating: 5,
        date: 'January 2026',
        title: 'Great for wine',
        body: 'Unexpectedly perfect for a casual glass of red. The colour is a warm, earthy terracotta.',
      },
    ],
  },
  {
    id: 'terra-planter',
    slug: 'terra-planter',
    name: 'Terra Planter',
    category: 'vases',
    tagline: 'A rounded home for the plant that is outgrowing its pot.',
    price: 52,
    image: asset('/images/product-terra-planter.jpg'),
    gallery: sharedGallery,
    description: [
      'The Terra Planter is generous where it matters: a wide belly for roots, a rim deep enough to water, and a drainage hole with a matching saucer. Finished in a blush clay with tiny speckles of iron.',
      'Looks just as good empty.',
    ],
    optionLabel: 'Size',
    options: [
      { id: 'small', label: 'Small', note: '6 in', priceDelta: 0 },
      { id: 'large', label: 'Large', note: '8 in', priceDelta: 20 },
    ],
    details: [
      { label: 'Material', value: 'Stoneware, blush clay finish' },
      { label: 'Dimensions', value: '6" H × 6.5" Ø (Small) · 8" H × 8.5" Ø (Large)' },
      { label: 'Care', value: 'Drainage hole and saucer included. Wipe clean' },
    ],
    rating: 4.7,
    reviewCount: 73,
    stock: 9,
    reviews: [
      {
        author: 'Kate H.',
        location: 'Dublin, IE',
        rating: 5,
        date: 'February 2026',
        title: 'My monstera is happy',
        body: 'A proper drainage hole and a saucer that actually fits. It looks far more expensive than it is.',
      },
      {
        author: 'Owen B.',
        location: 'Wellington, NZ',
        rating: 4,
        date: 'January 2026',
        title: 'Lovely blush tone',
        body: 'Subtle colour, good weight. The small is on the compact side, so check the dimensions.',
      },
    ],
  },
  {
    id: 'onda-tray',
    slug: 'onda-tray',
    name: 'Onda Tray',
    category: 'objects',
    tagline: 'A wavy-edged tray for the middle of the table.',
    price: 64,
    image: asset('/images/product-onda-tray.jpg'),
    gallery: sharedGallery,
    description: [
      'Onda means wave. The rim of this serving tray rises and falls just enough to keep things in place, with a sand glaze that shows the motion of the hand that made it.',
      'Use it for bread, fruit, candles or nothing at all.',
    ],
    optionLabel: 'Size',
    options: [{ id: 'one', label: 'One size', note: '14 × 8 in', priceDelta: 0 }],
    details: [
      { label: 'Material', value: 'Stoneware, sand glaze' },
      { label: 'Dimensions', value: '14" L × 8" W × 1.2" H' },
      { label: 'Care', value: 'Hand wash recommended' },
    ],
    rating: 4.8,
    reviewCount: 38,
    badge: 'New',
    isNew: true,
    stock: 4,
    reviews: [
      {
        author: 'Camille V.',
        location: 'Montréal, CA',
        rating: 5,
        date: 'April 2026',
        title: 'The wavy edge makes it',
        body: 'It has become our permanent centrepiece, even when it is just holding a few lemons.',
      },
      {
        author: 'Ethan R.',
        location: 'Denver, CO',
        rating: 4,
        date: 'March 2026',
        title: 'Great size for bread',
        body: 'Fits a whole loaf with room for oil. Slightly heavier than expected, which I like.',
      },
    ],
  },
];

export const categoryById = (id: CategoryId) => categories.find((c) => c.id === id)!;

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const getOption = (product: Product, optionId: string) =>
  product.options.find((o) => o.id === optionId) ?? product.options[0];

export const unitPrice = (product: Product, optionId: string) =>
  product.price + getOption(product, optionId).priceDelta;

export const productBySlug = getProduct;

export const bestsellers = products.filter((p) => p.bestseller);
export const newArrivals = products.filter((p) => p.isNew);

export const relatedProducts = (product: Product, limit = 4) => {
  const same = products.filter((p) => p.id !== product.id && p.category === product.category);
  const rest = products.filter((p) => p.id !== product.id && p.category !== product.category);
  return [...same, ...rest].slice(0, limit);
};
