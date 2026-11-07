import React from 'react';
import { Heart, ArrowRight, ShieldCheck, Zap, MailCheck } from 'lucide-react';

interface CtaBannerProps {
  onOpenModal: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOpenModal }) => {
  return (
    <section className="py-16 sm:py-20 bg-[#FAF5F2]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-[#5C222D] text-white p-6 sm:p-12 lg:p-14 rounded-3xl border border-[#7A303D] shadow-xl text-center relative overflow-hidden group">
          <img
            src="/images/wedding_couple_sunset.jpg"
            alt="Pernikahan Impian Tanpa Beban Stres Finansial"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.28] contrast-[1.1] pointer-events-none"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3B141C]/92 via-[#5C222D]/85 to-[#2E0F16]/90 pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#F5CCD3] mx-auto mb-4 sm:mb-5 border border-white/15">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
            </span>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-[1.2]">
              Mulai Perjalanan Menuju Hari Bahagia Tanpa Beban Stres Finansial
            </h2>
            <p className="mt-3 sm:mt-4 text-xs sm:text-base text-[#F7D8DF] leading-relaxed">
              Cukup sekali bayar <strong>Rp 40.000 untuk selamanya</strong>. Akun YukPlanning Anda langsung dibuat otomatis dan dikirimkan ke email Anda detik itu juga.
            </p>

            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={onOpenModal}
                className="px-8 py-4 text-sm sm:text-base font-bold text-[#5C222D] bg-white hover:bg-[#FFF5F7] rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <Zap className="w-4 h-4 text-[#C75D6E] fill-current" />
                <span>Dapatkan Akses Selamanya — Rp 40.000</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#E8B1BC] mt-8 pt-6 border-t border-white/10">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#F5C2C9]" />
                Pembayaran Aman via Midtrans
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <MailCheck className="w-3.5 h-3.5 text-[#F5C2C9]" />
                Akun Otomatis ke Email
              </span>
              <span aria-hidden="true">·</span>
              <span>Sekali Bayar untuk Selamanya</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
