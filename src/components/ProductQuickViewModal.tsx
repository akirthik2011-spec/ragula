import React, { useState } from 'react';
import { X, Star, Check, ShoppingBag, MessageCircle, Sparkles, Clock, Ruler } from 'lucide-react';
import { Product } from '../types/index.ts';
import { formatCurrency, generateWhatsAppInquiryUrl, WHATSAPP_NUMBER } from '../utils/cartLogic.ts';

interface ProductQuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, note?: string) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [personalizationNote, setPersonalizationNote] = useState('');
  const [selectedImage, setSelectedImage] = useState(product?.image || '');

  React.useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
      setQuantity(1);
      setPersonalizationNote('');
    }
  }, [product]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const images = [product.image, ...(product.additionalImages || [])];

  const handleAdd = () => {
    onAddToCart(product, quantity, personalizationNote);
    onClose();
  };

  const whatsAppUrl = generateWhatsAppInquiryUrl(WHATSAPP_NUMBER, product);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="relative bg-[#fffdf9] rounded-xl max-w-3xl w-full border border-[#eadbc8] shadow-2xl overflow-hidden z-10 my-8"
      >
        {/* Close Button */}
        <button
          type="button"
          aria-label="Close product preview"
          onClick={onClose}
          className="absolute top-3 right-3 z-30 p-2 bg-white/90 hover:bg-white text-[#674832] rounded-full border border-[#eadbc8] shadow-sm transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Gallery side */}
          <div className="p-6 bg-[#f5eadc]/40 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#eadbc8]">
            <div className="aspect-square rounded-lg overflow-hidden bg-white border border-[#eadbc8] shadow-inner mb-4">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-300"
              />
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-16 rounded border-2 overflow-hidden shrink-0 transition-all ${
                      selectedImage === img
                        ? 'border-[#c49a55] ring-2 ring-[#c49a55]/20'
                        : 'border-[#eadbc8] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details side */}
          <div className="p-6 flex flex-col justify-between max-h-[80vh] overflow-y-auto">
            <div>
              {/* Badge & Category */}
              <div className="flex items-center gap-2 mb-2">
                {product.badge && (
                  <span className="bg-[#674832] text-[#fffaf3] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    {product.badge}
                  </span>
                )}
                <span className="text-xs uppercase tracking-wider text-[#796858] font-medium">
                  {product.category.replace('-', ' ')}
                </span>
              </div>

              {/* Title */}
              <h2
                id="modal-product-title"
                className="font-serif-brand text-2xl sm:text-3xl font-bold text-[#674832] mb-2 leading-tight"
              >
                {product.name}
              </h2>

              {/* Price & Rating */}
              <div className="flex items-center justify-between pb-4 border-b border-[#eadbc8] mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-[#3c3028]">
                    {formatCurrency(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-[#796858] line-through">
                      {formatCurrency(product.originalPrice)}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 text-xs text-[#796858]">
                  <Star className="w-4 h-4 text-[#c49a55] fill-current" />
                  <span className="font-bold text-[#3c3028]">{product.rating.toFixed(1)}</span>
                  <span>({product.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Long Description */}
              <p className="text-sm text-[#796858] leading-relaxed mb-4">
                {product.longDescription || product.description}
              </p>

              {/* Craft Specifications */}
              <div className="space-y-2 mb-4 text-xs text-[#3c3028]">
                {product.dimensions && (
                  <div className="flex items-center gap-2 text-[#796858]">
                    <Ruler className="w-4 h-4 text-[#c49a55] shrink-0" />
                    <span>Dimensions: <strong>{product.dimensions}</strong></span>
                  </div>
                )}
                {product.leadTime && (
                  <div className="flex items-center gap-2 text-[#796858]">
                    <Clock className="w-4 h-4 text-[#c49a55] shrink-0" />
                    <span>Crafting lead time: <strong>{product.leadTime}</strong></span>
                  </div>
                )}
              </div>

              {/* Materials */}
              {product.materials && product.materials.length > 0 && (
                <div className="mb-4">
                  <span className="text-xs font-semibold text-[#674832] uppercase tracking-wider block mb-1.5">
                    Artisan Materials
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.materials.map((mat, i) => (
                      <span
                        key={i}
                        className="text-[11px] bg-[#f5eadc] text-[#674832] px-2.5 py-1 rounded-sm border border-[#eadbc8]"
                      >
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Custom Personalization Note Input */}
              {product.customizable && (
                <div className="mb-5 p-3 bg-[#f5eadc]/50 rounded-lg border border-[#eadbc8]">
                  <label
                    htmlFor="personalization-input"
                    className="block text-xs font-semibold text-[#674832] mb-1 flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#c49a55]" />
                    <span>Personalize this creation (Optional)</span>
                  </label>
                  <input
                    id="personalization-input"
                    type="text"
                    placeholder="e.g. Recipient name / custom note for handwritten tag"
                    value={personalizationNote}
                    onChange={e => setPersonalizationNote(e.target.value)}
                    className="w-full text-xs bg-white border border-[#d8c3aa] rounded p-2 text-[#3c3028] focus:outline-none focus:ring-1 focus:ring-[#c49a55]"
                  />
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-[#eadbc8] space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity selector */}
                <div className="flex items-center border border-[#d8c3aa] rounded bg-white">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-sm text-[#674832] hover:bg-[#f5eadc] transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-sm font-semibold min-w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-sm text-[#674832] hover:bg-[#f5eadc] transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart button */}
                <button
                  type="button"
                  onClick={handleAdd}
                  className="flex-1 bg-[#674832] hover:bg-[#c49a55] text-white py-2.5 px-4 rounded text-sm font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart ({formatCurrency(product.price * quantity)})</span>
                </button>
              </div>

              {/* Direct WhatsApp ask */}
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 border border-[#25D366] text-[#128C7E] hover:bg-[#25D366]/10 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Ask Artisan on WhatsApp about this piece</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
