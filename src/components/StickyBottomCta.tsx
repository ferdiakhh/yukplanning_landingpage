import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, X, Heart } from 'lucide-react';

interface StickyBottomCtaProps {
  onOpenModal: () => void;
}

export const StickyBottomCta: React.FC<StickyBottomCtaProps> = ({ onOpenModal }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible || isDismissed) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-2xl animate-fade-in">
      <div className="bg-[#3B151C]/95 text-white backdrop-blur-md px-4 sm:px-6 py-3 rounded-2xl sm:rounded-full border border-[#8C3442]/60 shadow-2xl flex items-center justify-between gap-3">
        {/* Left Info */}
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <span className="w-8 h-8 rounded-full bg-[#6A2330] text-[#F9D6DC] flex items-center justify-center shrink-0 border border-white/20">
            <Heart className="w-4 h-4 fill-current text-[#F9D6DC]" />
          </span>
          <div className="min-w-0">
            <div className="text-xs sm:text-sm font-bold truncate flex items-center gap-1.5">
              <span>YukPlanning — Akses Selamanya</span>
              <span className="text-[10px] bg-[#C75D6E] text-white px-2 py-0.2 rounded-full font-semibold hidden sm:inline">
                Hemat 73%
              </span>
            </div>
            <div className="text-[11px] text-[#F2CAD2] truncate">
              Sekali bayar <strong>Rp 40.000</strong> • Tanpa tagihan bulanan
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenModal}
            className="animate-shimmer px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold text-[#5C222D] bg-white hover:bg-[#FFF5F7] rounded-xl sm:rounded-full transition-all flex items-center gap-1.5 shadow-md cursor-pointer whitespace-nowrap"
          >
            <span>Dapatkan Akun</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            aria-label="Tutup"
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-[#F2CAD2] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
