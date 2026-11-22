import React from 'react';
import { Heart, Quote, Star, CheckCircle } from 'lucide-react';
import { COUPLE_TESTIMONIALS } from '../data/mockData';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimoni" className="py-16 sm:py-24 bg-white border-t border-[#EFE2DF]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#9E5564] bg-[#FFF0F2] px-3.5 py-1 rounded-full border border-[#F5CCD3] mb-3">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Kisah Nyata Pasangan Bahagia</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#3B151C] tracking-tight">
            Menuju Hari Bahagia dengan Hati Tenang dan Finansial Sehat
          </h2>
          <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-[#6E5057]">
            Dengarkan langsung dari pasangan yang telah melangkah ke pelaminan tanpa beban pinjaman dan tanpa drama alokasi bujet.
          </p>
        </div>

        {/* 3 Real Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {COUPLE_TESTIMONIALS.map((item, idx) => {
            const hasPhoto = idx < 2;
            const photoSrc = idx === 0 
              ? '/images/wedding_couple_sunset.jpg' 
              : '/images/hero_wedding_couple.jpg';

            return (
              <div
                key={idx}
                className="bg-[#FAF5F2] p-6 sm:p-8 rounded-3xl border border-[#EEDBD7] shadow-xs flex flex-col justify-between hover:border-[#D6A7AD] hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {hasPhoto ? (
                        <img
                          src={photoSrc}
                          alt={item.coupleNames}
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 rounded-full object-cover border-2 border-[#EAC5C9] shadow-2xs"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#873646] to-[#5C222D] text-[#FFF0F2] font-serif font-bold text-sm flex items-center justify-center border-2 border-[#EAC5C9] shadow-2xs">
                          {item.avatarText}
                        </div>
                      )}
                      <div>
                        <div className="font-serif font-bold text-sm text-[#3B151C] leading-snug">
                          {item.coupleNames}
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-[#4F7A43] font-medium mt-0.5">
                          <CheckCircle className="w-3 h-3" />
                          <span>Pengguna Terverifikasi</span>
                        </div>
                      </div>
                    </div>
                    <Quote className="w-5 h-5 text-[#D6A7AD]" />
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 text-[#D48238] mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  {/* Measurable Outcome Kicker */}
                  <div className="text-xs font-bold text-[#5C222D] bg-[#FCEBEF] px-3 py-1 rounded-xl inline-block mb-3 border border-[#F5CCD3]/60">
                    ✨ {item.savingsOutcome}
                  </div>

                  <p className="text-xs sm:text-sm text-[#4A3237] leading-relaxed italic">
                    "{item.quote}"
                  </p>
                </div>

                {/* Author Metadata */}
                <div className="pt-5 mt-6 border-t border-[#EFE0DB]">
                  <div className="flex items-center justify-between text-xs text-[#7A5A62]">
                    <span>{item.location}</span>
                    <span className="font-medium text-[#8C3442]">{item.weddingDate}</span>
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
