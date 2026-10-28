import React, { useState } from 'react';
import { Minus, Plus, MessageCircle, Trash2, Copy, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types/index.ts';
import {
  calculateCartTotals,
  formatCurrency,
  generateWhatsAppOrderUrl,
  WHATSAPP_NUMBER,
} from '../utils/cartLogic.ts';

interface CartSectionProps {
  items: CartItem[];
  onUpdateQuantity: (productId: number, delta: number) => void;
  onRemoveItem: (productId: number) => void;
  onClearCart: () => void;
}

export const CartSection: React.FC<CartSectionProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [copied, setCopied] = useState(false);
  const totals = calculateCartTotals(items);

  const handleWhatsAppOrder = () => {
    if (items.length === 0) {
      alert('Your cart is empty! Please add a product first.');
      return;
    }

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#674832', '#c49a55', '#25D366'],
      });
    } catch {
      // non-blocking
    }

    const url = generateWhatsAppOrderUrl(WHATSAPP_NUMBER, items);
    window.open(url, '_blank');
  };

  const handleCopy = () => {
    if (items.length === 0) return;
    const url = generateWhatsAppOrderUrl(WHATSAPP_NUMBER, items);
    const message = decodeURIComponent(url.split('?text=')[1] || '');
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="cart-section bg-[#f5eadc] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-y border-[#eadbc8]" id="cart">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-title text-center text-3xl sm:text-4xl font-serif-brand font-bold text-[#674832] mb-2">
          Your Shopping Cart
        </h2>
        <p className="section-subtitle text-center text-sm sm:text-base text-[#796858] mb-10">
          Your favourite creations, all in one place.
        </p>

        <div className="cart-box bg-white p-6 sm:p-8 rounded-xl border border-[#eadbc8] shadow-md">
          {/* Cart Items List */}
          <div id="cart-items" className="divide-y divide-[#eee0cf]">
            {items.length === 0 ? (
              <div className="py-12 text-center text-[#796858]">
                <p className="empty-cart text-base mb-4">
                  Your cart is empty. Explore our collection!
                </p>
                <a
                  href="#shop"
                  className="inline-block bg-[#674832] hover:bg-[#c49a55] text-white px-6 py-2.5 rounded text-sm font-medium transition-colors"
                >
                  Explore Collection
                </a>
              </div>
            ) : (
              items.map(item => (
                <div
                  key={item.product.id}
                  className="cart-item py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-14 h-14 object-cover rounded bg-[#f5eadc] border border-[#eadbc8] shrink-0"
                    />
                    <div>
                      <strong className="text-base text-[#674832] block font-serif-brand">
                        {item.product.name}
                      </strong>
                      <span className="text-xs text-[#796858]">
                        {formatCurrency(item.product.price)} each
                      </span>
                      {item.personalizationNote && (
                        <span className="block text-[11px] text-[#c49a55] mt-0.5">
                          Personalization: {item.personalizationNote}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6">
                    <div className="flex items-center border border-[#d8c3aa] rounded bg-[#fffaf3]">
                      <button
                        type="button"
                        aria-label={`Decrease ${item.product.name} quantity`}
                        onClick={() => onUpdateQuantity(item.product.id, -1)}
                        className="px-2.5 py-1 text-sm text-[#674832] hover:bg-[#f5eadc] transition-colors cursor-pointer"
                      >
                        −
                      </button>

                      <span className="px-3 text-sm font-semibold text-[#3c3028]">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        aria-label={`Increase ${item.product.name} quantity`}
                        onClick={() => onUpdateQuantity(item.product.id, 1)}
                        className="px-2.5 py-1 text-sm text-[#674832] hover:bg-[#f5eadc] transition-colors cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <strong className="text-base font-bold text-[#3c3028] min-w-20 text-right">
                      {formatCurrency(item.product.price * item.quantity)}
                    </strong>

                    <button
                      type="button"
                      aria-label={`Delete ${item.product.name}`}
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-[#796858] hover:text-red-600 p-1 cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Total Breakdown */}
          {items.length > 0 && (
            <div className="mt-8 pt-6 border-t border-[#eadbc8]">
              <div className="flex flex-col items-end gap-1 mb-6 text-sm">
                <div className="flex justify-between w-full sm:w-64 text-[#796858]">
                  <span>Subtotal:</span>
                  <span className="font-medium text-[#3c3028]">{formatCurrency(totals.subtotal)}</span>
                </div>
                <div className="flex justify-between w-full sm:w-64 text-[#796858]">
                  <span>Shipping:</span>
                  <span className="font-medium text-[#3c3028]">
                    {totals.shipping === 0 ? (
                      <span className="text-[#25D366] font-semibold">FREE</span>
                    ) : (
                      formatCurrency(totals.shipping)
                    )}
                  </span>
                </div>
                <div className="cart-total text-right text-2xl font-serif-brand font-bold text-[#674832] mt-2 pt-2 border-t border-[#eee0cf] w-full sm:w-64 flex justify-between">
                  <span>Total:</span>
                  <span>{formatCurrency(totals.total)}</span>
                </div>
              </div>

              {/* Cart Actions */}
              <div className="cart-actions flex flex-wrap items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClearCart}
                  className="px-5 py-2.5 border border-[#d8c3aa] bg-white hover:bg-[#f5eadc] text-[#674832] rounded text-sm font-medium transition-colors cursor-pointer"
                >
                  Clear Cart
                </button>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-4 py-2.5 border border-[#d8c3aa] bg-white hover:bg-[#f5eadc] text-[#674832] rounded text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied' : 'Copy Summary'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppOrder}
                  className="button bg-[#674832] hover:bg-[#c49a55] text-white px-6 py-2.5 rounded text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366] fill-current" />
                  <span>Order on WhatsApp</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
