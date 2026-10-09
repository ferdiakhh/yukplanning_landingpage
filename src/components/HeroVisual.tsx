import React, { useState } from 'react';
import { Heart, Sparkles, Flame, Calendar, PiggyBank, ArrowUpRight } from 'lucide-react';

interface HeroVisualProps {
  onOpenAppDemo: () => void;
}

export const HeroVisual: React.FC<HeroVisualProps> = ({ onOpenAppDemo }) => {
  const [activeCard, setActiveCard] = useState<'savings' | 'countdown' | 'vendor'>('savings');

  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none px-1 sm:px-0">
      {/* Ambient background glow */}
      <div className="absolute -top-6 -right-6 w-60 sm:w-80 h-60 sm:h-80 bg-gradient-to-br from-[#EAB0B8]/30 via-[#F7D2B7]/25 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-6 -left-6 w-60 sm:w-72 h-60 sm:h-72 bg-gradient-to-tr from-[#C75D6E]/20 via-[#F5D8DB]/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Wedding Arched Canvas */}
      <div className="relative rounded-t-[100px] sm:rounded-t-[130px] rounded-b-3xl border border-[#EAC5C9] bg-gradient-to-b from-[#FFFDFD] via-[#FAF4F0] to-[#F5ECE6] p-3 sm:p-6 shadow-xl sm:shadow-2xl overflow-visible">
        
        {/* Subtle decorative botanical corner flourishes in SVG */}
        <div className="absolute top-3 left-4 sm:top-4 sm:left-6 text-[#D9A3AC]/40 pointer-events-none">
          <svg width="36" height="36" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" className="sm:w-12 sm:h-12">
            <path d="M6 30C12 24 20 18 32 10C36 7 42 6 42 6C42 6 41 12 38 16C30 28 24 36 18 42" strokeLinecap="round" />
            <path d="M18 24C16 20 16 16 19 13C22 10 26 10 30 12" strokeLinecap="round" />
            <path d="M26 32C24 36 24 40 27 43" strokeLinecap="round" />
          </svg>
        </div>

        <div className="absolute top-3 right-4 sm:top-4 sm:right-6 text-[#D9A3AC]/40 pointer-events-none transform -scale-x-100">
          <svg width="36" height="36" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" className="sm:w-12 sm:h-12">
            <path d="M6 30C12 24 20 18 32 10C36 7 42 6 42 6C42 6 41 12 38 16C30 28 24 36 18 42" strokeLinecap="round" />
            <path d="M18 24C16 20 16 16 19 13C22 10 26 10 30 12" strokeLinecap="round" />
          </svg>
        </div>

        {/* Central Romantic Arch Visual Composition with Real Wedding Photo */}
        <div className="relative rounded-t-[88px] sm:rounded-t-[110px] rounded-b-2xl overflow-hidden text-white p-4 pt-10 sm:p-6 sm:pt-12 min-h-[410px] sm:min-h-[470px] flex flex-col justify-between border border-[#8C3E4C]/50 shadow-inner group">
          
          {/* REAL WEDDING COUPLE PHOTOGRAPH (Full bleed arched backdrop) */}
          <img
            src="/images/hero_wedding_couple.jpg"
            alt="Foto Romantis Calon Pengantin Wedding Planner"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-top filter brightness-[0.88] contrast-[1.05] group-hover:scale-103 transition-transform duration-700 pointer-events-none"
            onError={(e) => {
              // Graceful fallback if image is blocked
              (e.target as HTMLElement).style.display = 'none';
            }}
          />

          {/* Measured Editorial Contrast Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#240A0F] via-[#240A0F]/55 to-[#240A0F]/25 pointer-events-none" />

          {/* Top Brand & Monogram Lockup */}
          <div className="relative text-center z-10 drop-shadow-md">
            {/* Wax seal monogram badge */}
            <div className="inline-flex items-center justify-center w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-gradient-to-br from-[#DCA365] to-[#A86E35] text-[#2E0F16] shadow-lg border-2 border-[#F7E1C8] mb-2 sm:mb-2.5">
              <span className="font-serif font-bold text-sm sm:text-base tracking-tighter italic">A • C</span>
            </div>
            
            <div className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#F9D6DC] font-semibold mb-0.5">
              THE WEDDING JOURNEY
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight drop-shadow-sm">
              amba & ciimut
            </h3>
            <p className="text-[11px] sm:text-xs text-[#F2CAD2] mt-0.5 font-editorial italic">
              "20 Desember 2026 • Bersama Mengukir Janji Suci"
            </p>
          </div>

          {/* Center Space & Live Countdown Pill Badge */}
          <div className="relative my-4 flex items-center justify-center z-10">
            <div className="bg-[#1F070B]/85 backdrop-blur-md text-[#F9D6DC] px-4 py-1.5 rounded-full text-xs font-semibold border border-[#E8B1BC]/40 shadow-xl flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E88290] animate-pulse"></span>
              <Calendar className="w-3.5 h-3.5 text-[#F5C2C9]" />
              <span>H-71 Hari Menuju Akad</span>
            </div>
          </div>

          {/* Quick Stats Grid inside Arch */}
          <div className="relative z-10 pt-3 sm:pt-4 border-t border-white/20 grid grid-cols-2 gap-2 text-center text-xs backdrop-blur-xs">
            <div className="bg-black/40 backdrop-blur-md p-2.5 rounded-xl border border-white/15">
              <div className="text-[9px] sm:text-[10px] text-[#E8B1BC] uppercase font-semibold">Terkumpul</div>
              <div className="text-xs sm:text-sm font-bold font-serif text-white mt-0.5">Rp 78,5 Jt</div>
              <div className="text-[9px] sm:text-[10px] text-[#A3E099] font-medium">65% Target</div>
            </div>
            <div className="bg-black/40 backdrop-blur-md p-2.5 rounded-xl border border-white/15">
              <div className="text-[9px] sm:text-[10px] text-[#E8B1BC] uppercase font-semibold">Tamu Undangan</div>
              <div className="text-xs sm:text-sm font-bold font-serif text-white mt-0.5">400 Pax</div>
              <div className="text-[9px] sm:text-[10px] text-[#F5CCD3] font-medium">92% RSVP Siap</div>
            </div>
          </div>
        </div>

        {/* FLOATING GLASSMORPHISM CARDS (Positioned responsively) */}
        
        {/* Floating Card 1: Top-Left Tabungan Komitmen */}
        <div 
          onClick={() => setActiveCard('savings')}
          className={`absolute -top-3 left-1 sm:-left-5 max-w-[170px] sm:max-w-[220px] bg-white/95 backdrop-blur-md p-2.5 sm:p-3.5 rounded-2xl border border-[#ECD1D5] shadow-lg sm:shadow-xl transition-all cursor-pointer hover:scale-102 z-20 ${
            activeCard === 'savings' ? 'ring-2 ring-[#873646]' : ''
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-[#4A1D24]">
              <PiggyBank className="w-3 h-3 text-[#A63A4B]" />
              Tabungan
            </span>
            <span className="text-[9px] font-bold text-[#A63A4B] bg-[#FFF0F2] px-1 py-0.5 rounded flex items-center gap-0.5">
              <Flame className="w-2.5 h-2.5" />
              3 Bln 🔥
            </span>
          </div>
          <div className="text-xs sm:text-base font-serif font-bold text-[#3B151C]">
            Rp 78.500.000
          </div>
          <div className="w-full h-1 sm:h-1.5 bg-[#F0E4E1] rounded-full overflow-hidden my-1 flex">
            <div className="h-full bg-[#5A879E]" style={{ width: '68%' }}></div>
            <div className="h-full bg-[#C75D6E]" style={{ width: '32%' }}></div>
          </div>
          <div className="flex justify-between text-[9px] text-[#7D5A61]">
            <span>amba: 68%</span>
            <span>ciimut: 32%</span>
          </div>
        </div>

        {/* Floating Card 2: Bottom-Right Vendor Deal Confirmed */}
        <div 
          onClick={() => setActiveCard('vendor')}
          className={`absolute -bottom-3 right-1 sm:-right-5 max-w-[170px] sm:max-w-[230px] bg-white/95 backdrop-blur-md p-2.5 sm:p-3.5 rounded-2xl border border-[#ECD1D5] shadow-lg sm:shadow-xl transition-all cursor-pointer hover:scale-102 z-20 ${
            activeCard === 'vendor' ? 'ring-2 ring-[#873646]' : ''
          }`}
        >
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-[#EBF5E9] text-[#2A7545] flex items-center justify-center text-[10px] sm:text-xs font-bold shrink-0">
              ✓
            </span>
            <div>
              <div className="text-[10px] sm:text-[11px] font-bold text-[#3B151C] leading-tight truncate max-w-[110px] sm:max-w-none">
                Sasana Kriya TMII
              </div>
              <div className="text-[9px] text-[#7A5A62]">
                DP 50% Aman
              </div>
            </div>
          </div>
          <div className="text-[9px] sm:text-[10px] text-[#4F7A43] font-medium bg-[#F0F7EE] px-1.5 py-0.5 rounded mt-1 flex items-center justify-between">
            <span>Deal Gedung</span>
            <span className="font-bold">Rp 32 Jt</span>
          </div>
        </div>

        {/* Floating Card 3: Top Right Badge */}
        <div className="absolute top-1/2 right-2 -translate-y-1/2 hidden sm:flex items-center gap-2 bg-[#2E0F16]/90 text-white backdrop-blur-md py-1.5 px-3 rounded-xl border border-white/20 shadow-lg text-xs z-20">
          <Sparkles className="w-3.5 h-3.5 text-[#F7DF94]" />
          <div>
            <div className="font-bold text-[10px]">Real-Time Sync</div>
            <div className="text-[9px] text-[#E8B1BC]">Koneksi Berdua</div>
          </div>
        </div>
      </div>

      {/* Switcher below frame */}
      <div className="mt-5 text-center flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
        <span className="text-xs text-[#7A5A62] font-medium">
          💍 Ingin mencoba demo dashboard lengkap?
        </span>
        <button
          type="button"
          onClick={onOpenAppDemo}
          className="text-xs font-bold text-[#6A2330] hover:text-[#4A1D24] bg-white px-3.5 py-1.5 rounded-xl border border-[#EAC5C9] shadow-2xs hover:shadow-xs flex items-center gap-1 cursor-pointer transition-all"
        >
          <span>Eksplorasi Demo di Bawah</span>
          <ArrowUpRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
