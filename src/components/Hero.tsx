import React, { useRef } from 'react';
import { ArrowRight, Sparkles, HeartHandshake, ShieldCheck, Heart, Star } from 'lucide-react';
import { HeroVisual } from './HeroVisual';
import { InteractiveAppShowcase } from './InteractiveAppShowcase';

interface HeroProps {
  onOpenModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenModal }) => {
  const showcaseRef = useRef<HTMLDivElement>(null);

  const scrollToDemo = () => {
    showcaseRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-6 sm:pt-10 pb-16 sm:pb-20 overflow-hidden">
      {/* Delicate warm ambient blush glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] bg-gradient-to-b from-[#FCEBEF]/40 via-[#FDF5F2]/30 to-transparent pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* 2-COLUMN SPLIT HERO GRID: Romance on the Right, High Conversion on the Left */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-8 items-center mb-14 sm:mb-20">
          
          {/* Left Column (Content & Emotional Hook - 7 Cols) */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left">
            {/* Romantic Eyebrow Kicker */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:py-1.5 rounded-full bg-[#FFF0F2] border border-[#F5CCD3] text-[11px] sm:text-xs font-semibold text-[#8C3442]">
              <Heart className="w-3.5 h-3.5 fill-[#C75D6E] text-[#C75D6E] shrink-0" />
              <span>Platform Wedding Planner Kolaboratif</span>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <span className="text-[#A06443] hidden sm:inline">Transparan & Harmonis</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#3B151C] tracking-tight leading-[1.18] sm:leading-[1.15] text-balance">
              Dua Hati, Satu Rekening Impian Menuju Hari Bahagia.
            </h1>

            {/* Editorial Subtitle */}
            <p className="text-sm sm:text-lg text-[#664950] font-normal leading-relaxed max-w-xl">
              Tinggalkan stres dan perdebatan finansial. Catat tabungan komitmen berdua, alokasikan bujet real-time, kelola kontrak vendor, dan kontrol kuota katering tamu dalam satu wadah sakral yang transparan.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onOpenModal}
                className="px-7 py-3.5 text-sm font-semibold text-white bg-[#6A2330] hover:bg-[#541B26] active:scale-98 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Mulai Rencanakan Berdua — Gratis</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#simulasi"
                className="px-6 py-3.5 text-sm font-semibold text-[#5C222D] bg-[#FFF2F0] hover:bg-[#FCE6E3] border border-[#ECD1D5] rounded-xl transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#9E5564]" />
                <span>Simulasi Bujet Capeng</span>
              </a>
            </div>

            {/* Real Couple Social Proof Card Strip */}
            <div className="pt-4 border-t border-[#EFE0DB] flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Couple Avatars Stack with Real Photos */}
              <div className="flex items-center -space-x-2.5">
                <img
                  src="/images/hero_wedding_couple.jpg"
                  alt="Pasangan Pengantin Amba dan Ciimut"
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-2xs"
                />
                <img
                  src="/images/wedding_couple_sunset.jpg"
                  alt="Pasangan Pengantin Radit dan Tania"
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-2xs"
                />
                <span className="w-10 h-10 rounded-full bg-[#873646] text-white font-serif font-bold text-xs flex items-center justify-center border-2 border-white shadow-2xs">
                  D•N
                </span>
                <span className="w-10 h-10 rounded-full bg-[#DCA365] text-[#2E0F16] font-serif font-bold text-xs flex items-center justify-center border-2 border-white shadow-2xs">
                  F•A
                </span>
              </div>

              {/* Trust Metric Text */}
              <div>
                <div className="flex items-center gap-1 text-[#D48238]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                  <span className="text-xs font-bold text-[#3B151C] ml-1">4.9 / 5.0</span>
                </div>
                <div className="text-xs text-[#7A5B63] mt-0.5">
                  Dipercaya <strong className="text-[#3B151C] font-semibold">1.450+ pasangan calon pengantin</strong> di seluruh Indonesia
                </div>
              </div>
            </div>

            {/* Quick Testimonial Snippet Bubble with Real Couple Picture */}
            <div className="p-3 sm:p-3.5 bg-white rounded-2xl border border-[#EEDBD7] text-xs text-[#5C222D] shadow-2xs flex items-center gap-3 max-w-lg">
              <img
                src="/images/wedding_couple_sunset.jpg"
                alt="Radit & Tania"
                referrerPolicy="no-referrer"
                className="w-11 h-11 rounded-xl object-cover shrink-0 border border-[#EEDBD7]"
              />
              <p className="italic leading-snug">
                "Fitur tabungan berdua 50:50 dan alokasi kateringnya benar-benar menyelamatkan kami dari over-budget. Sangat recommended!"
                <span className="not-italic font-semibold block text-[11px] text-[#8C6B72] mt-0.5">
                  — Radit & Tania, Menikah September 2026
                </span>
              </p>
            </div>
          </div>

          {/* Right Column (Visual Centerpiece - 5 Cols) */}
          <div className="lg:col-span-5">
            <HeroVisual onOpenAppDemo={scrollToDemo} />
          </div>
        </div>

        {/* SECTION 2: LIVE PRODUCT FRAME INTERACTIVE SHOWCASE */}
        <div ref={showcaseRef} className="pt-8">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#9E5564] bg-[#FFF0F2] px-3.5 py-1 rounded-full border border-[#F5CCD3]">
              ✨ Coba Sendiri Fitur Aplikasinya
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#3B151C] mt-2 tracking-tight">
              Tampilan Langsung Dashboard YukPlanner
            </h2>
            <p className="text-xs sm:text-sm text-[#7A5A62] mt-1">
              Ganti tab di bawah untuk melihat Beranda, Pencatatan Tabungan, atau Todo List Persiapan. Anda juga bisa mencoba mencentang checklist atau mencatat setoran baru!
            </p>
          </div>

          {/* Interactive Live App Frame */}
          <InteractiveAppShowcase />
        </div>
      </div>
    </section>
  );
};
