import React from 'react';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../utils/cartLogic.ts';

export const WhatsAppFloat: React.FC = () => {
  return (
    <aside aria-label="Direct WhatsApp Contact" className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
      {/* Tooltip / Prompt bubble on desktop */}
      <span className="hidden sm:inline-block bg-white text-[#3c3028] text-xs font-semibold px-3 py-1.5 rounded-full shadow-md border border-[#eadbc8] animate-bounce">
        💬 Chat with artisan
      </span>

      <a
        className="whatsapp-float inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebd59] text-white px-4 py-3 sm:px-5 sm:py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm font-semibold tracking-wide font-sans cursor-pointer"
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact Luxelegacy on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span>WhatsApp Us</span>
      </a>
    </aside>
  );
};
