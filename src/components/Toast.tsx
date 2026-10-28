import React from 'react';
import { Check, ShoppingBag } from 'lucide-react';
import { Product } from '../types/index.ts';
import { formatCurrency } from '../utils/cartLogic.ts';

interface ToastProps {
  product: Product | null;
  onViewCart: () => void;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ product, onViewCart, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed top-24 right-4 sm:right-8 z-50 bg-white border border-[#c49a55] shadow-2xl rounded-lg p-3.5 flex items-center gap-3 animate-in slide-in-from-top-4 duration-300 max-w-sm">
      <div className="w-8 h-8 rounded-full bg-[#25D366]/20 text-[#25D366] flex items-center justify-center shrink-0">
        <Check className="w-4 h-4 stroke-[3]" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold text-[#674832] truncate">
          Added to your cart!
        </p>
        <p className="text-[11px] text-[#796858] truncate">
          {product.name} ({formatCurrency(product.price)})
        </p>
      </div>

      <button
        type="button"
        onClick={() => {
          onClose();
          onViewCart();
        }}
        className="px-2.5 py-1.5 bg-[#674832] hover:bg-[#c49a55] text-white text-xs font-medium rounded transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
      >
        <ShoppingBag className="w-3 h-3" />
        <span>View Cart</span>
      </button>
    </div>
  );
};
