import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { ProductCard } from './components/ProductCard.tsx';
import { ProductQuickViewModal } from './components/ProductQuickViewModal.tsx';
import { CartDrawer } from './components/CartDrawer.tsx';
import { CartSection } from './components/CartSection.tsx';
import { OurStory } from './components/OurStory.tsx';
import { Testimonials } from './components/Testimonials.tsx';
import { FaqSection } from './components/FaqSection.tsx';
import { CustomOrderModal } from './components/CustomOrderModal.tsx';
import { WhatsAppFloat } from './components/WhatsAppFloat.tsx';
import { Footer } from './components/Footer.tsx';
import { Toast } from './components/Toast.tsx';
import { PRODUCTS, CATEGORIES } from './data/products.ts';
import { Product, CartItem } from './types/index.ts';
import { calculateCartTotals, filterProducts } from './utils/cartLogic.ts';
import { SlidersHorizontal, Sparkles } from 'lucide-react';

const CART_STORAGE_KEY = 'luxelegacy_cart_v1';

export default function App() {
  // Cart state with localStorage hydration
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCustomOrderOpen, setIsCustomOrderOpen] = useState(false);
  const [toastProduct, setToastProduct] = useState<Product | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // storage unavailable
    }
  }, [cart]);

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1, personalizationNote?: string) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
          personalizationNote: personalizationNote || next[existingIndex].personalizationNote,
        };
        return next;
      }
      return [...prev, { product, quantity, personalizationNote }];
    });

    // Show toast
    setToastProduct(product);
    setTimeout(() => {
      setToastProduct(curr => (curr?.id === product.id ? null : curr));
    }, 3000);
  };

  const handleUpdateQuantity = (productId: number, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.product.id === productId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (productId: number) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totals = calculateCartTotals(cart);
  const filteredProducts = filterProducts(PRODUCTS, searchQuery, selectedCategory, sortBy);

  const getCartQuantityForProduct = (productId: number) => {
    const item = cart.find(i => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fffaf3] text-[#3c3028]">
      {/* Top Header */}
      <Header
        cartCount={totals.itemsCount}
        cartTotal={totals.total}
        onOpenCart={() => setIsCartDrawerOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenCustomModal={() => setIsCustomOrderOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero onOpenCustomModal={() => setIsCustomOrderOpen(true)} />

        {/* Shop Collection Section - Matches user ID and structure */}
        <section id="shop" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          {/* Section Titles */}
          <div className="text-center mb-10">
            <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl font-serif-brand font-bold text-[#674832] mb-3">
              Our Collection
            </h2>
            <p className="section-subtitle text-base sm:text-lg text-[#796858] max-w-xl mx-auto">
              Little creations, made with a lot of love.
            </p>
          </div>

          {/* Filter & Sort Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#eadbc8]">
            {/* Categories */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {CATEGORIES.map(cat => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                      isSelected
                        ? 'bg-[#674832] text-white shadow-sm'
                        : 'bg-[#f5eadc] text-[#674832] hover:bg-[#eadbc8]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Sorting & Result Count */}
            <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 text-xs sm:text-sm text-[#796858]">
              <span>
                Showing <strong>{filteredProducts.length}</strong> items
              </span>

              <div className="flex items-center gap-1.5 bg-white border border-[#d8c3aa] rounded-md px-2.5 py-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#674832]" />
                <label htmlFor="sort-select" className="sr-only">
                  Sort products
                </label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as any)}
                  className="bg-transparent border-none text-[#3c3028] text-xs outline-none cursor-pointer pr-1"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Search Term Active Indicator */}
          {searchQuery && (
            <div className="mb-6 flex items-center justify-between bg-[#f5eadc] px-4 py-2.5 rounded-lg text-xs sm:text-sm text-[#674832]">
              <span>
                Search results for: &ldquo;<strong>{searchQuery}</strong>&rdquo;
              </span>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="underline font-semibold hover:text-[#c49a55] ml-2"
              >
                Clear Search
              </button>
            </div>
          )}

          {/* Product Grid - id="products" preserves exact hook */}
          <div
            id="products"
            className="products grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7"
          >
            {filteredProducts.length === 0 ? (
              <div className="col-span-full py-16 text-center text-[#796858]">
                <p className="text-lg font-serif-brand text-[#674832] mb-2">
                  No matching handmade creations found.
                </p>
                <p className="text-sm mb-6">
                  Try searching for another keyword or browse all our treasures.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="px-5 py-2.5 bg-[#674832] text-white rounded text-xs font-semibold hover:bg-[#c49a55] transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onQuickView={prod => setQuickViewProduct(prod)}
                  cartQuantity={getCartQuantityForProduct(product.id)}
                />
              ))
            )}
          </div>
        </section>

        {/* Embedded In-Page Cart Section - Matches user ID and structure */}
        <CartSection
          items={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
        />

        {/* Our Story Section - Matches user ID and structure */}
        <OurStory />

        {/* Patron Reviews */}
        <Testimonials />

        {/* FAQs */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* WhatsApp Floating Button - Matches user's exact float element */}
      <WhatsAppFloat />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Product Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Bespoke Custom Commission Modal */}
      <CustomOrderModal
        isOpen={isCustomOrderOpen}
        onClose={() => setIsCustomOrderOpen(false)}
      />

      {/* Add to Cart Toast */}
      <Toast
        product={toastProduct}
        onViewCart={() => setIsCartDrawerOpen(true)}
        onClose={() => setToastProduct(null)}
      />
    </div>
  );
}
