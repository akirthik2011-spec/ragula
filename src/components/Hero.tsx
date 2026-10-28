import React from 'react';
import { ArrowRight, ShieldCheck, Heart, Sparkles, Truck, Award } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../utils/cartLogic.ts';

interface HeroProps {
  onOpenCustomModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCustomModal }) => {
  return (
    <section
      id="home"
      className="relative min-h-[500px] lg:min-h-[580px] flex items-center bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(255,250,243,0.97) 0%, rgba(255,250,243,0.92) 45%, rgba(255,250,243,0.65) 100%), url('https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1600&q=80')`,
      }}
    >
      {/* Decorative subtle texture/accent */}
      <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-[#c49a55]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full relative z-10">
        <div className="max-w-2xl">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f5eadc] border border-[#eadbc8] text-[#674832] text-xs font-semibold uppercase tracking-widest mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#c49a55]" />
            <span>Slow-crafted artisanal collection</span>
          </div>

          {/* Heading - Preserves exact user title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-brand font-bold text-[#674832] leading-[1.1] mb-6 tracking-tight">
            Handmade with Love, <br className="hidden sm:inline" />
            <span className="italic font-normal text-[#c49a55]">Made for primium.</span>
          </h1>

          {/* Description - Preserves exact user copy */}
          <p className="text-base sm:text-lg text-[#796858] mb-8 leading-relaxed font-sans max-w-xl">
            Discover beautiful handmade creations, thoughtful gifts,
            and unique pieces made with creativity and care.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#shop"
              className="inline-flex items-center gap-2 bg-[#674832] hover:bg-[#c49a55] text-white px-7 py-3.5 rounded-md text-base font-medium shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Explore Our Collection</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={onOpenCustomModal}
              className="inline-flex items-center gap-2 bg-white hover:bg-[#f5eadc] text-[#674832] border border-[#eadbc8] px-6 py-3.5 rounded-md text-base font-medium shadow-sm transition-all cursor-pointer"
            >
              <Heart className="w-4 h-4 text-[#c49a55]" />
              <span>Custom Commissions</span>
            </button>
          </div>

          {/* Trust Value Props */}
          <div className="mt-12 pt-8 border-t border-[#eadbc8]/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-[#796858]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#f5eadc] flex items-center justify-center shrink-0 text-[#674832]">
                <Award className="w-3.5 h-3.5" />
              </div>
              <div>
                <strong className="block text-[#3c3028] font-semibold">100% Handcrafted</strong>
                <span>Small batch creations</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#f5eadc] flex items-center justify-center shrink-0 text-[#674832]">
                <Truck className="w-3.5 h-3.5" />
              </div>
              <div>
                <strong className="block text-[#3c3028] font-semibold">All-India Delivery</strong>
                <span>Safe transit guaranteed</span>
              </div>
            </div>

            <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
              <div className="w-7 h-7 rounded-full bg-[#f5eadc] flex items-center justify-center shrink-0 text-[#674832]">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <div>
                <strong className="block text-[#3c3028] font-semibold">Instant WhatsApp Order</strong>
                <span>Direct artisan contact</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
