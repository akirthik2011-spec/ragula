import React, { useState } from 'react';
import { ShoppingBag, Search, Sparkles, Menu, X, Heart, MessageCircle } from 'lucide-react';
import { formatCurrency, WHATSAPP_NUMBER } from '../utils/cartLogic.ts';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenCustomModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  searchQuery,
  onSearchChange,
  onOpenCustomModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-[#674832] text-[#f5eadc] px-4 py-2 text-xs md:text-sm font-medium tracking-wide text-center flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#c49a55] shrink-0" />
        <span>Complimentary handwritten calligraphy card with every order • Free shipping above ₹999</span>
        <span className="hidden md:inline text-[#c49a55]">•</span>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-1 underline underline-offset-2 hover:text-white transition-colors"
        >
          <MessageCircle className="w-3 h-3 text-[#25D366]" /> Chat on WhatsApp
        </a>
      </div>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#fffdf9]/95 backdrop-blur-md border-b border-[#eadbc8] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Logo */}
            <a
              href="#home"
              className="text-2xl sm:text-3xl font-serif-brand font-bold text-[#674832] tracking-wider flex items-center gap-1 group"
            >
              <span>Luxe</span>
              <span className="text-[#c49a55] group-hover:underline transition-all">legacy</span>
              <span className="text-xs font-sans tracking-widest text-[#796858] font-normal uppercase hidden sm:inline ml-2 pl-2 border-l border-[#eadbc8]">
                Handmade
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-[#674832]">
              <a href="#home" className="hover:text-[#c49a55] transition-colors">
                Home
              </a>
              <a href="#shop" className="hover:text-[#c49a55] transition-colors">
                Shop Collection
              </a>
              <a href="#about" className="hover:text-[#c49a55] transition-colors">
                Our Story
              </a>
              <a href="#reviews" className="hover:text-[#c49a55] transition-colors">
                Artisan Praise
              </a>
              <a href="#faqs" className="hover:text-[#c49a55] transition-colors">
                FAQs
              </a>
              <button
                type="button"
                onClick={onOpenCustomModal}
                className="text-[#674832] hover:text-[#c49a55] flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#c49a55]" />
                Custom Order
              </button>
            </nav>

            {/* Actions: Search, Custom Orders, Cart */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Search Toggle / Input */}
              <div className="relative flex items-center">
                {showSearchInput ? (
                  <div className="flex items-center bg-white border border-[#d8c3aa] rounded-full px-3 py-1.5 shadow-sm w-44 sm:w-60 transition-all">
                    <Search className="w-4 h-4 text-[#796858] shrink-0 mr-2" />
                    <input
                      type="text"
                      placeholder="Search creations..."
                      value={searchQuery}
                      onChange={e => onSearchChange(e.target.value)}
                      autoFocus
                      className="w-full text-xs sm:text-sm bg-transparent border-none outline-none text-[#3c3028] placeholder-[#796858]/60"
                    />
                    <button
                      type="button"
                      aria-label="Close search"
                      onClick={() => {
                        setShowSearchInput(false);
                        onSearchChange('');
                      }}
                      className="text-[#796858] hover:text-[#674832] ml-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    aria-label="Search creations"
                    onClick={() => setShowSearchInput(true)}
                    className="p-2 text-[#674832] hover:text-[#c49a55] hover:bg-[#f5eadc]/50 rounded-full transition-colors cursor-pointer"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Direct Custom Order Button (Desktop) */}
              <button
                type="button"
                onClick={onOpenCustomModal}
                className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#674832] bg-[#f5eadc] hover:bg-[#eadbc8] transition-colors border border-[#d8c3aa]"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#c49a55]" />
                Bespoke Order
              </button>

              {/* Cart Trigger */}
              <button
                type="button"
                aria-label={`Open shopping cart with ${cartCount} items`}
                onClick={onOpenCart}
                className="relative flex items-center gap-2 bg-[#674832] hover:bg-[#c49a55] text-white px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-md text-sm font-medium transition-all shadow-sm group cursor-pointer active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Cart</span>
                <span
                  id="cart-count"
                  className="bg-[#c49a55] group-hover:bg-[#674832] text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-5 text-center leading-none"
                >
                  {cartCount}
                </span>
                {cartTotal > 0 && (
                  <span className="hidden lg:inline text-xs text-[#f5eadc] font-normal border-l border-white/20 pl-2">
                    {formatCurrency(cartTotal)}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                type="button"
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-[#674832] hover:text-[#c49a55] hover:bg-[#f5eadc]/60 rounded-md"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#fffdf9] border-t border-[#eadbc8] px-5 py-4 space-y-3 shadow-lg">
            <nav className="flex flex-col space-y-2 text-[15px] font-medium text-[#674832]">
              <a
                href="#home"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#c49a55]"
              >
                Home
              </a>
              <a
                href="#shop"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#c49a55]"
              >
                Shop Collection
              </a>
              <a
                href="#cart"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#c49a55] flex items-center justify-between"
              >
                <span>Cart ({cartCount})</span>
                <span className="text-xs bg-[#f5eadc] px-2 py-0.5 rounded font-bold">
                  {formatCurrency(cartTotal)}
                </span>
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#c49a55]"
              >
                Our Story
              </a>
              <a
                href="#reviews"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#c49a55]"
              >
                Reviews
              </a>
              <a
                href="#faqs"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#c49a55]"
              >
                FAQs
              </a>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCustomModal();
                }}
                className="w-full text-left py-2 text-[#c49a55] font-semibold flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Request Custom Piece
              </button>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
