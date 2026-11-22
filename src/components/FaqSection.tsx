import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import { FAQS } from '../data/mockData';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const categories = ['Semua', ...Array.from(new Set(FAQS.map(f => f.category || 'Umum')))];

  const filteredFaqs = selectedCategory === 'Semua'
    ? FAQS
    : FAQS.filter(f => f.category === selectedCategory);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-white border-t border-[#EFE2DF]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#9E5564] bg-[#FFF0F2] px-3.5 py-1 rounded-full border border-[#F5CCD3] mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Pertanyaan yang Sering Diajukan</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#3B151C] tracking-tight">
            Semua yang Perlu Anda Ketahui
          </h2>
          <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-[#6E5057]">
            Transparan, jelas, dan dirancang untuk memberikan ketenangan pikiran bagi kedua calon mempelai.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setSelectedCategory(cat);
                setOpenIndex(0);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#5C222D] text-white shadow-xs'
                  : 'bg-[#FAF5F2] text-[#7A5A62] hover:bg-[#F5ECE8] border border-[#EEDBD7]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3 sm:space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#FAF5F2] rounded-2xl border border-[#EEDBD7] overflow-hidden transition-all hover:border-[#D6A7AD]"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-6 text-left flex items-center justify-between gap-3 sm:gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    {faq.category && (
                      <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold text-[#8C3442] bg-[#FFF0F2] rounded-md border border-[#F5CCD3] shrink-0">
                        {faq.category}
                      </span>
                    )}
                    <span className="font-serif font-semibold text-sm sm:text-lg text-[#3B151C] leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <span
                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white flex items-center justify-center text-[#5C222D] shrink-0 transition-transform duration-200 border border-[#EEDBD7] ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </span>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-6 pb-5 sm:pb-6 pt-1 text-xs sm:text-sm text-[#664950] leading-relaxed border-t border-[#EFE0DB]/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
