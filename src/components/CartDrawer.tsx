import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, Copy, Check, Sparkles, MapPin, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types/index.ts';
import {
  calculateCartTotals,
  formatCurrency,
  generateWhatsAppOrderUrl,
  estimateDeliveryDays,
  WHATSAPP_NUMBER,
  FREE_SHIPPING_THRESHOLD,
} from '../utils/cartLogic.ts';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: number, delta: number) => void;
  onRemoveItem: (productId: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [pinCode, setPinCode] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customNote, setCustomNote] = useState('');
  const [copied, setCopied] = useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const totals = calculateCartTotals(items);
  const deliveryEstimate = estimateDeliveryDays(pinCode);

  const handleWhatsAppOrder = () => {
    if (items.length === 0) return;

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#674832', '#c49a55', '#25D366', '#f5eadc'],
      });
    } catch {
      // non-blocking
    }

    const url = generateWhatsAppOrderUrl(WHATSAPP_NUMBER, items, {
      customerName,
      pinCode,
      customNote,
    });

    window.open(url, '_blank');
  };

  const handleCopyOrderText = () => {
    const url = generateWhatsAppOrderUrl(WHATSAPP_NUMBER, items, {
      customerName,
      pinCode,
      customNote,
    });
    const message = decodeURIComponent(url.split('?text=')[1] || '');
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
    >
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Slide-over panel */}
      <div className="relative w-full max-w-md bg-[#fffdf9] h-full shadow-2xl flex flex-col z-10 border-l border-[#eadbc8]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#eadbc8] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <h2 id="cart-drawer-title" className="font-serif-brand text-2xl font-bold text-[#674832]">
              Your Cart
            </h2>
            <span className="text-xs bg-[#f5eadc] text-[#674832] font-semibold px-2 py-0.5 rounded-full">
              {totals.itemsCount} {totals.itemsCount === 1 ? 'item' : 'items'}
            </span>
          </div>

          <button
            type="button"
            aria-label="Close cart"
            onClick={onClose}
            className="p-1.5 text-[#796858] hover:text-[#674832] hover:bg-[#f5eadc] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress bar */}
        {items.length > 0 && (
          <div className="bg-[#f5eadc]/60 px-5 py-3 border-b border-[#eadbc8] text-xs">
            {totals.isFreeShipping ? (
              <p className="text-[#674832] font-semibold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#c49a55]" />
                <span>You unlocked <strong>FREE all-India shipping!</strong></span>
              </p>
            ) : (
              <div>
                <p className="text-[#796858] mb-1.5">
                  Add <strong className="text-[#674832]">{formatCurrency(totals.amountNeededForFreeShipping)}</strong> more for <strong>FREE Delivery</strong>!
                </p>
                <div className="w-full bg-[#eadbc8] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#c49a55] h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(100, (totals.subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#796858]">
              <div className="w-16 h-16 rounded-full bg-[#f5eadc] flex items-center justify-center text-[#c49a55] mb-4">
                <Gift className="w-8 h-8" />
              </div>
              <h3 className="font-serif-brand text-xl font-bold text-[#674832] mb-1">
                Your cart is empty
              </h3>
              <p className="text-sm text-[#796858] mb-6 max-w-xs">
                Explore our collection of handcrafted keepsakes, candles, and artisan gift boxes.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="bg-[#674832] hover:bg-[#c49a55] text-white px-6 py-2.5 rounded text-sm font-medium transition-colors"
              >
                Start Exploring
              </button>
            </div>
          ) : (
            items.map(item => (
              <div
                key={item.product.id}
                className="flex gap-3 bg-white p-3.5 rounded-lg border border-[#eee0cf] shadow-2xs items-start"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded bg-[#f5eadc] shrink-0 border border-[#eadbc8]"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-serif-brand text-base font-bold text-[#674832] truncate">
                      {item.product.name}
                    </h4>
                    <button
                      type="button"
                      aria-label={`Remove ${item.product.name} from cart`}
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-[#796858] hover:text-red-600 p-1 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-[#796858] mb-2">
                    {formatCurrency(item.product.price)} each
                  </p>

                  {item.personalizationNote && (
                    <p className="text-[11px] text-[#c49a55] bg-[#fffaf3] p-1 rounded border border-[#eadbc8] mb-2 line-clamp-1">
                      Note: &ldquo;{item.personalizationNote}&rdquo;
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    {/* Quantity modifier */}
                    <div className="flex items-center border border-[#d8c3aa] rounded bg-[#fffaf3]">
                      <button
                        type="button"
                        aria-label={`Decrease quantity of ${item.product.name}`}
                        onClick={() => onUpdateQuantity(item.product.id, -1)}
                        className="px-2 py-1 text-xs text-[#674832] hover:bg-[#f5eadc]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-semibold text-[#3c3028]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label={`Increase quantity of ${item.product.name}`}
                        onClick={() => onUpdateQuantity(item.product.id, 1)}
                        className="px-2 py-1 text-xs text-[#674832] hover:bg-[#f5eadc]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-sm font-bold text-[#3c3028]">
                      {formatCurrency(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Delivery & Notes inputs */}
          {items.length > 0 && (
            <div className="space-y-3 pt-3 border-t border-[#eadbc8]">
              {/* Delivery PIN Code Checker */}
              <div className="bg-white p-3 rounded-lg border border-[#eadbc8]">
                <label
                  htmlFor="cart-drawer-pincode"
                  className="text-xs font-semibold text-[#674832] flex items-center gap-1.5 mb-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#c49a55]" />
                  <span>Check Estimated Delivery (India PIN)</span>
                </label>
                <div className="flex gap-2">
                  <input
                    id="cart-drawer-pincode"
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit PIN (e.g. 560001)"
                    value={pinCode}
                    onChange={e => setPinCode(e.target.value.replace(/\D/g, ''))}
                    className="flex-1 text-xs bg-[#fffaf3] border border-[#d8c3aa] rounded p-2 focus:outline-none focus:ring-1 focus:ring-[#c49a55]"
                  />
                </div>
                {deliveryEstimate && (
                  <p className="text-[11px] text-[#25D366] font-medium mt-1.5 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Est: {deliveryEstimate}</span>
                  </p>
                )}
                {pinCode.length === 6 && !deliveryEstimate && (
                  <p className="text-[11px] text-amber-700 mt-1.5">
                    Please enter a valid 6-digit Indian PIN code.
                  </p>
                )}
              </div>

              {/* Customer Name & Gift Note */}
              <div className="bg-white p-3 rounded-lg border border-[#eadbc8] space-y-2">
                <div>
                  <label
                    htmlFor="cart-drawer-name"
                    className="text-xs font-semibold text-[#674832] block mb-1"
                  >
                    Your Name (for parcel & WhatsApp chat)
                  </label>
                  <input
                    id="cart-drawer-name"
                    type="text"
                    placeholder="e.g. Priya Sharma"
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    className="w-full text-xs bg-[#fffaf3] border border-[#d8c3aa] rounded p-2 focus:outline-none focus:ring-1 focus:ring-[#c49a55]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="cart-drawer-note"
                    className="text-xs font-semibold text-[#674832] block mb-1"
                  >
                    Gift Message or Special Instructions
                  </label>
                  <textarea
                    id="cart-drawer-note"
                    rows={2}
                    placeholder="e.g. Free handwritten note text, anniversary wishes, or packing request"
                    value={customNote}
                    onChange={e => setCustomNote(e.target.value)}
                    className="w-full text-xs bg-[#fffaf3] border border-[#d8c3aa] rounded p-2 focus:outline-none focus:ring-1 focus:ring-[#c49a55]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 bg-white border-t border-[#eadbc8] space-y-3">
            {/* Totals */}
            <div className="space-y-1.5 text-xs text-[#796858]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#3c3028]">
                  {formatCurrency(totals.subtotal)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>All-India Shipping</span>
                <span>
                  {totals.shipping === 0 ? (
                    <span className="text-[#25D366] font-semibold uppercase">FREE</span>
                  ) : (
                    formatCurrency(totals.shipping)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#674832] pt-2 border-t border-[#eee0cf]">
                <span>Total</span>
                <span>{formatCurrency(totals.total)}</span>
              </div>
            </div>

            {/* Primary Order Button */}
            <button
              type="button"
              onClick={handleWhatsAppOrder}
              className="w-full bg-[#25D366] hover:bg-[#1ebd59] text-white py-3 px-4 rounded-md font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Order on WhatsApp ({formatCurrency(totals.total)})</span>
            </button>

            {/* Secondary actions: Copy & Clear */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCopyOrderText}
                className="flex-1 py-2 px-3 border border-[#d8c3aa] hover:bg-[#f5eadc] rounded text-xs font-medium text-[#674832] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied Order Summary!' : 'Copy Order Text'}</span>
              </button>

              <button
                type="button"
                onClick={onClearCart}
                className="py-2 px-3 text-xs text-red-600 hover:bg-red-50 rounded border border-transparent hover:border-red-200 transition-colors cursor-pointer"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
