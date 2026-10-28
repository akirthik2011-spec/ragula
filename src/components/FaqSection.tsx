import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { FAQS } from '../data/products.ts';
import { WHATSAPP_NUMBER } from '../utils/cartLogic.ts';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faqs" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#fffaf3]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f5eadc] text-[#674832] text-xs font-semibold uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-[#c49a55]" />
            <span>Got Questions?</span>
          </div>
          <h2 className="font-serif-brand text-3xl sm:text-4xl font-bold text-[#674832] mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-[#796858]">
            Everything you need to know about placing orders, shipping, and customization.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-lg border border-[#eadbc8] overflow-hidden transition-all shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full py-4 px-5 text-left font-serif-brand text-base sm:text-lg font-bold text-[#674832] flex items-center justify-between gap-4 hover:bg-[#fffdf9] transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#c49a55] transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-[#796858] leading-relaxed border-t border-[#eee0cf] pt-3 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-10 p-5 rounded-xl bg-[#f5eadc] border border-[#eadbc8] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-serif-brand text-lg font-bold text-[#674832]">
              Have a special inquiry or bulk order?
            </h4>
            <p className="text-xs text-[#796858]">
              We are always here on WhatsApp to help with custom designs and delivery timelines.
            </p>
          </div>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Luxelegacy! I have a question about placing an order.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebd59] text-white px-4 py-2.5 rounded-md text-xs font-semibold shadow-sm shrink-0 transition-colors"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Chat with us on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
