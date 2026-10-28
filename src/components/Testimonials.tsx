import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/products.ts';

export const Testimonials: React.FC = () => {
  return (
    <section id="reviews" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f5eadc]/50 border-t border-[#eadbc8]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold text-[#c49a55] uppercase tracking-widest block mb-2">
            Loved By Collectors
          </span>
          <h2 className="font-serif-brand text-3xl sm:text-4xl font-bold text-[#674832] mb-3">
            Words from Our Patrons
          </h2>
          <p className="text-sm sm:text-base text-[#796858] max-w-lg mx-auto">
            Real experiences from people who chose handcrafted gifts and bespoke creations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(testimonial => (
            <div
              key={testimonial.id}
              className="bg-white p-6 sm:p-7 rounded-xl border border-[#eadbc8] shadow-xs flex flex-col justify-between relative"
            >
              <Quote className="w-8 h-8 text-[#c49a55]/20 absolute top-5 right-5" />

              <div>
                {/* Stars */}
                <div className="flex items-center gap-1 mb-4 text-[#c49a55]">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-sm text-[#796858] leading-relaxed italic mb-6">
                  &ldquo;{testimonial.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-[#eee0cf] flex items-center justify-between">
                <div>
                  <h4 className="font-serif-brand text-base font-bold text-[#674832]">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-[#796858]">{testimonial.city}</p>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-[#25D366] font-medium bg-[#25D366]/10 px-2 py-0.5 rounded">
                  <CheckCircle className="w-3 h-3" />
                  <span>Verified Buyer</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
