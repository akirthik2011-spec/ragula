import React from 'react';
import { Eye, ShoppingBag, Star, Check } from 'lucide-react';
import { Product } from '../types/index.ts';
import { formatCurrency } from '../utils/cartLogic.ts';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  cartQuantity: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
  cartQuantity,
}) => {
  return (
    <article className="group bg-white border border-[#eee0cf] rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between">
      {/* Image container */}
      <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden bg-[#f5eadc]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-[#674832]/90 backdrop-blur-xs text-[#fffaf3] text-[11px] font-semibold px-2.5 py-1 rounded-sm tracking-wide shadow-sm">
            {product.badge}
          </span>
        )}

        {/* Quick View Button on Hover */}
        <button
          type="button"
          aria-label={`Quick view details for ${product.name}`}
          onClick={() => onQuickView(product)}
          className="absolute inset-x-4 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/95 hover:bg-white text-[#674832] py-2 rounded shadow-md text-xs font-semibold flex items-center justify-center gap-1.5 backdrop-blur-xs"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Quick View</span>
        </button>
      </div>

      {/* Info Container */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1 mb-1.5 text-xs text-[#796858]">
            <div className="flex items-center text-[#c49a55]">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="font-semibold text-[#3c3028]">{product.rating.toFixed(1)}</span>
            <span>({product.reviewsCount})</span>
          </div>

          {/* Title */}
          <h3 className="font-serif-brand text-lg sm:text-xl font-bold text-[#674832] mb-1 group-hover:text-[#c49a55] transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-[#796858] mb-3 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div>
          {/* Price */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg sm:text-xl font-bold text-[#3c3028]">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#796858] line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className={`w-full py-2.5 px-4 rounded text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
              cartQuantity > 0
                ? 'bg-[#c49a55] text-white hover:bg-[#674832]'
                : 'bg-[#674832] text-white hover:bg-[#c49a55]'
            }`}
          >
            {cartQuantity > 0 ? (
              <>
                <Check className="w-4 h-4" />
                <span>In Cart ({cartQuantity}) • Add More</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
