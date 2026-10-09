import React from 'react';
import { Heart, Quote } from 'lucide-react';
import { COUPLE_TESTIMONIALS } from '../data/mockData';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimoni" className="py-16 sm:py-20 bg-white border-t border-[#EFE2DF]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9E5564] mb-2">
            <Heart className="w-3.5 h-3.5 text-[#9E5564] fill-current" />
            <span>Kisah Pasangan Pengantin</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#3B151C] tracking-tight">
            Menuju Hari Bahagia dengan Hati Tenang dan Finansial Sehat
          </h2>
          <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-[#6E5057]">
            Dengarkan langsung dari pasangan yang telah melangkah ke pelaminan tanpa beban pinjaman dan tanpa drama alokasi bujet.
          </p>
        </div>

        {/* 3 Real Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {COUPLE_TESTIMONIALS.map((item, idx) => {
            const photoSrc = idx === 0 
              ? '/images/wedding_couple_sunset.jpg' 
              : idx === 1 
              ? '/images/hero_wedding_couple.jpg' 
              : '/images/wedding_rings_flatlay.jpg';

            return (
              <div
                key={idx}
                className="bg-[#FAF5F2] p-5 sm:p-7 rounded-3xl border border-[#EEDBD7] shadow-xs flex flex-col justify-between hover:border-[#D6A7AD] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={photoSrc}
                        alt={item.coupleNames}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-full object-cover border-2 border-[#EAC5C9] shadow-2xs"
                      />
                      <span className="text-xs font-serif font-bold text-[#5C222D]">
                        {item.avatarText}
                      </span>
                    </div>
                    <Quote className="w-5 h-5 text-[#D6A7AD]" />
                  </div>

                  {/* Measurable Outcome Kicker */}
                  <div className="text-xs font-bold text-[#5C222D] bg-[#FCEBEF] px-2.5 py-1 rounded-lg inline-block mb-3">
                    ✨ {item.savingsOutcome}
                  </div>

                  <p className="text-xs sm:text-sm text-[#4A3237] leading-relaxed italic">
                    "{item.quote}"
                  </p>
                </div>

                {/* Author Metadata - Unboxed Text with Separators */}
                <div className="pt-5 mt-6 border-t border-[#EFE0DB]">
                  <div className="font-serif font-bold text-sm text-[#3B151C]">
                    {item.coupleNames}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#7A5A62] mt-0.5">
                    <span>{item.location}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.weddingDate}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
