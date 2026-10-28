import React, { useState } from 'react';
import { X, Sparkles, MessageCircle, Send } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../utils/cartLogic.ts';

interface CustomOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomOrderModal: React.FC<CustomOrderModalProps> = ({ isOpen, onClose }) => {
  const [orderType, setOrderType] = useState('Personalized Gift Box');
  const [recipient, setRecipient] = useState('');
  const [occasion, setOccasion] = useState('Birthday / Anniversary');
  const [budget, setBudget] = useState('₹1,000 - ₹2,500');
  const [details, setDetails] = useState('');
  const [quantity, setQuantity] = useState('1');

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let message = "Hello Luxelegacy! I'd like to commission a Custom / Bespoke Order:\n\n";
    message += `Type of Creation: ${orderType}\n`;
    message += `Quantity: ${quantity}\n`;
    message += `Occasion: ${occasion}\n`;
    if (recipient.trim()) message += `For: ${recipient.trim()}\n`;
    message += `Budget Range: ${budget}\n`;
    if (details.trim()) message += `Specific Ideas / Notes: ${details.trim()}\n`;
    message += "\nPlease let me know your thoughts and crafting timeline!";

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="custom-order-title"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="relative bg-[#fffdf9] rounded-xl max-w-lg w-full border border-[#eadbc8] shadow-2xl p-6 sm:p-7 z-10 my-8"
      >
        <button
          type="button"
          aria-label="Close modal"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#796858] hover:text-[#674832] hover:bg-[#f5eadc] rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f5eadc] text-[#674832] text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#c49a55]" />
            <span>Bespoke Creations</span>
          </div>
          <h2 id="custom-order-title" className="font-serif-brand text-2xl sm:text-3xl font-bold text-[#674832]">
            Request a Custom Order
          </h2>
          <p className="text-xs sm:text-sm text-[#796858] mt-1">
            Let us craft something one-of-a-kind for your milestone, wedding favors, or loved one.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#674832] mb-1">
              What would you like us to create?
            </label>
            <select
              value={orderType}
              onChange={e => setOrderType(e.target.value)}
              className="w-full text-xs sm:text-sm bg-white border border-[#d8c3aa] rounded p-2.5 text-[#3c3028] focus:outline-none focus:ring-1 focus:ring-[#c49a55]"
            >
              <option value="Personalized Gift Box">Personalized Gift Box</option>
              <option value="Custom Size / Color Art Piece">Custom Size / Color Art Piece</option>
              <option value="Wedding / Party Return Favors (Bulk)">Wedding / Party Return Favors (Bulk)</option>
              <option value="Custom Candle Hamper">Custom Candle Hamper</option>
              <option value="Handmade Jewelry / Accessory Set">Handmade Jewelry / Accessory Set</option>
              <option value="Other Bespoke Keepsake">Other Bespoke Keepsake</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#674832] mb-1">
                Quantity Needed
              </label>
              <input
                type="text"
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
                placeholder="e.g. 1 or 25 sets"
                className="w-full text-xs sm:text-sm bg-white border border-[#d8c3aa] rounded p-2 text-[#3c3028] focus:outline-none focus:ring-1 focus:ring-[#c49a55]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#674832] mb-1">
                Estimated Budget
              </label>
              <select
                value={budget}
                onChange={e => setBudget(e.target.value)}
                className="w-full text-xs sm:text-sm bg-white border border-[#d8c3aa] rounded p-2 text-[#3c3028] focus:outline-none focus:ring-1 focus:ring-[#c49a55]"
              >
                <option value="Under ₹1,000">Under ₹1,000</option>
                <option value="₹1,000 - ₹2,500">₹1,000 - ₹2,500</option>
                <option value="₹2,500 - ₹5,000">₹2,500 - ₹5,000</option>
                <option value="₹5,000+ (Bulk/Corporate)">₹5,000+ (Bulk / Event)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#674832] mb-1">
              Who is this special piece for? (Optional)
            </label>
            <input
              type="text"
              value={recipient}
              onChange={e => setRecipient(e.target.value)}
              placeholder="e.g. For my parents' 25th anniversary"
              className="w-full text-xs sm:text-sm bg-white border border-[#d8c3aa] rounded p-2 text-[#3c3028] focus:outline-none focus:ring-1 focus:ring-[#c49a55]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#674832] mb-1">
              Tell us your theme, colors, or ideas
            </label>
            <textarea
              rows={3}
              value={details}
              onChange={e => setDetails(e.target.value)}
              placeholder="e.g. Earthy tones, incorporate dried roses, gold leaf detailing, needed by next Friday..."
              className="w-full text-xs sm:text-sm bg-white border border-[#d8c3aa] rounded p-2 text-[#3c3028] focus:outline-none focus:ring-1 focus:ring-[#c49a55]"
            />
          </div>

          <div className="pt-3">
            <button
              type="submit"
              className="w-full bg-[#25D366] hover:bg-[#1ebd59] text-white py-3 rounded-md font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Discuss on WhatsApp (+91 9448620389)</span>
            </button>
            <p className="text-[11px] text-center text-[#796858] mt-2">
              Opens WhatsApp with your request directly sent to our artisan team.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
