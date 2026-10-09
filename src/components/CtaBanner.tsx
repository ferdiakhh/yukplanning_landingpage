import React, { useState } from 'react';
import { Heart, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

interface CtaBannerProps {
  onOpenModal: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOpenModal }) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrPhone.trim()) {
      setErrorMsg('Silakan masukkan alamat email atau nomor WhatsApp');
      return;
    }
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrPhone);
    const isPhone = /^(\+62|62|0)8[1-9][0-9]{6,10}$/.test(emailOrPhone.replace(/[\s-]/g, ''));

    if (!isEmail && !isPhone) {
      setErrorMsg('Format email atau nomor WhatsApp tidak valid');
      return;
    }

    setErrorMsg('');
    setIsSubmitted(true);
  };

  return (
    <section className="py-16 sm:py-20 bg-[#FAF5F2]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-[#5C222D] text-white p-6 sm:p-12 lg:p-14 rounded-3xl border border-[#7A303D] shadow-xl text-center relative overflow-hidden group">
          {/* REAL WEDDING BACKGROUND PHOTO with Rich Wine Scrim */}
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

          {/* Subtle floral warmth backdrop glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#C75D6E]/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#3A141A]/50 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#F5CCD3] mx-auto mb-4 sm:mb-5 border border-white/15">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
            </span>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-[1.2]">
              Mulai Perjalanan Menuju Hari Bahagia Tanpa Beban Stres Finansial
            </h2>
            <p className="mt-3 sm:mt-4 text-xs sm:text-base text-[#F7D8DF] leading-relaxed">
              Bergabunglah dengan ribuan calon pengantin yang merencanakan hari pernikahan mereka dengan harmonis, transparan, dan penuh ketenangan hati.
            </p>

            {isSubmitted ? (
              <div className="mt-8 p-4 bg-white/15 rounded-2xl border border-white/20 text-center animate-fade-in">
                <CheckCircle2 className="w-8 h-8 text-[#A3E099] mx-auto mb-2" />
                <h4 className="font-serif font-bold text-lg text-white">
                  Tautan Undangan Rencana Telah Disiapkan!
                </h4>
                <p className="text-xs text-[#F2CAD2] mt-1">
                  Kami telah mengirimkan akses percobaan instan untuk Anda dan calon pasangan Anda. Selamat merencanakan hari bahagia berdua!
                </p>
                <button
                  type="button"
                  onClick={onOpenModal}
                  className="mt-4 px-5 py-2 text-xs font-bold text-[#5C222D] bg-white hover:bg-[#FFF5F7] rounded-xl cursor-pointer"
                >
                  Lengkapi Data Pasangan Sekarang →
                </button>
              </div>
            ) : (
              <div className="mt-8">
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-2 max-w-md mx-auto">
                  <div className="w-full relative">
                    <input
                      type="text"
                      placeholder="Masukkan Email atau No WhatsApp"
                      value={emailOrPhone}
                      onChange={(e) => {
                        setEmailOrPhone(e.target.value);
                        setErrorMsg('');
                      }}
                      className="w-full px-4 py-3.5 text-xs sm:text-sm bg-white text-[#3B151C] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E8B1BC] placeholder:text-[#A8888F]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3.5 text-xs sm:text-sm font-bold text-white bg-[#873646] hover:bg-[#993E50] rounded-xl transition-all whitespace-nowrap shrink-0 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <span>Mulai Gratis</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
                {errorMsg && (
                  <p className="text-xs text-[#FFAEBA] mt-2 font-medium">
                    ⚠️ {errorMsg}
                  </p>
                )}
              </div>
            )}

            <div className="flex items-center justify-center gap-4 text-xs text-[#E8B1BC] mt-8 pt-6 border-t border-white/10">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#F5C2C9]" />
                Gratis coba tanpa kartu kredit
              </span>
              <span aria-hidden="true">·</span>
              <span>Enkripsi privasi finansial</span>
              <span aria-hidden="true">·</span>
              <span>Batal kapan saja</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
