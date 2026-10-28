import React from 'react';
import { Heart, MessageCircle, MapPin, Mail, ShieldCheck } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../utils/cartLogic.ts';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#674832] text-white pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t border-[#eadbc8]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2">
            <h2 className="font-serif-brand text-3xl font-bold tracking-wider mb-2">
              Luxe<span className="text-[#c49a55]">legacy</span>
            </h2>
            <p className="text-sm text-[#f5eadc]/90 mb-4 font-serif-brand italic text-base">
              Handmade treasures. Timeless memories.
            </p>
            <p className="text-xs text-[#f5eadc]/80 leading-relaxed max-w-md mb-6">
              Every creation is lovingly handcrafted in India by local artisans using sustainable
              materials, slow craftsmanship, and wax-sealed packaging designed to celebrate life&apos;s special moments.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#f5eadc]">
              <ShieldCheck className="w-4 h-4 text-[#c49a55]" />
              <span>Safe Delivery Guarantee across India</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif-brand text-lg font-bold text-[#c49a55] mb-4">
              Explore
            </h3>
            <ul className="space-y-2 text-xs text-[#f5eadc]/80">
              <li>
                <a href="#home" className="hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#shop" className="hover:text-white transition-colors">Our Collection</a>
              </li>
              <li>
                <a href="#cart" className="hover:text-white transition-colors">Shopping Cart</a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">Our Story</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">Customer Reviews</a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-white transition-colors">Ordering & FAQs</a>
              </li>
            </ul>
          </div>

          {/* Contact & WhatsApp */}
          <div>
            <h3 className="font-serif-brand text-lg font-bold text-[#c49a55] mb-4">
              Get in Touch
            </h3>
            <p className="text-xs text-[#f5eadc]/80 mb-4">
              For orders, customizations, and corporate bulk gifting, message us on WhatsApp:
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebd59] text-white px-4 py-2.5 rounded text-xs font-semibold shadow-sm transition-colors mb-4"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>+91 9448620389</span>
            </a>
            <div className="space-y-1.5 text-[11px] text-[#f5eadc]/70">
              <p className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#c49a55]" />
                <span>Handcrafted in India • Ships Worldwide</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#c49a55]" />
                <span>support@luxelegacy.in</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#f5eadc]/70 text-center sm:text-left">
          <p>© <span id="year">{currentYear}</span> Luxelegacy. All rights reserved.</p>
          <p className="flex items-center justify-center gap-1">
            <span>Handmade with</span>
            <Heart className="w-3.5 h-3.5 text-[#c49a55] fill-current" />
            <span>for art & craft lovers</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
