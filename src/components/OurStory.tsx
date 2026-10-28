import React from 'react';
import { Sparkles, Feather, HeartHandshake, PackageCheck } from 'lucide-react';

export const OurStory: React.FC = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#fffaf3] relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f5eadc] text-[#674832] text-xs font-semibold uppercase tracking-wider mb-3">
            <Feather className="w-3.5 h-3.5 text-[#c49a55]" />
            <span>Behind the Craft</span>
          </div>
          <h2 className="section-title text-3xl sm:text-4xl font-serif-brand font-bold text-[#674832] mb-4">
            The Story of Luxelegacy
          </h2>
          <div className="w-16 h-0.5 bg-[#c49a55] mx-auto mb-6" />

          {/* User's exact prompt story text */}
          <div className="about space-y-4 text-base sm:text-lg text-[#796858] leading-relaxed max-w-2xl mx-auto">
            <p>
              At Luxelegacy, we believe that handmade things carry a special
              kind of magic. Every creation is inspired by imagination,
              crafted with care, and designed to make ordinary moments feel
              extraordinary.
            </p>
            <p className="font-serif-brand text-xl text-[#674832] italic">
              &ldquo;Thank you for supporting creativity and choosing handmade.&rdquo;
            </p>
          </div>
        </div>

        {/* Visual Craft Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
          <div className="bg-white p-6 rounded-lg border border-[#eadbc8] text-center shadow-xs">
            <div className="w-12 h-12 rounded-full bg-[#f5eadc] flex items-center justify-center mx-auto mb-4 text-[#674832]">
              <Sparkles className="w-6 h-6 text-[#c49a55]" />
            </div>
            <h3 className="font-serif-brand text-lg font-bold text-[#674832] mb-2">
              Earth-Conscious Materials
            </h3>
            <p className="text-xs text-[#796858] leading-relaxed">
              We source raw mulberry paper, seasoned wood, unbleached cotton, and mineral clays from local craft communities.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-[#eadbc8] text-center shadow-xs">
            <div className="w-12 h-12 rounded-full bg-[#f5eadc] flex items-center justify-center mx-auto mb-4 text-[#674832]">
              <HeartHandshake className="w-6 h-6 text-[#c49a55]" />
            </div>
            <h3 className="font-serif-brand text-lg font-bold text-[#674832] mb-2">
              Slow Artisan Crafting
            </h3>
            <p className="text-xs text-[#796858] leading-relaxed">
              No robotic factory assembly. Every piece is hand-poured, hand-stitched, and individually perfected with care.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-[#eadbc8] text-center shadow-xs">
            <div className="w-12 h-12 rounded-full bg-[#f5eadc] flex items-center justify-center mx-auto mb-4 text-[#674832]">
              <PackageCheck className="w-6 h-6 text-[#c49a55]" />
            </div>
            <h3 className="font-serif-brand text-lg font-bold text-[#674832] mb-2">
              Heirloom Wax Packaging
            </h3>
            <p className="text-xs text-[#796858] leading-relaxed">
              Wrapped in biodegradable honeycombing, enclosed with a wax seal stamp and handwritten calligraphy note.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
