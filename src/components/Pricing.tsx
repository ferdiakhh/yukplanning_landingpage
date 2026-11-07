import React from 'react';
import { Check, Sparkles, ArrowRight, ShieldCheck, Zap, MailCheck } from 'lucide-react';

interface PricingProps {
  onSelectPlan: (planName: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectPlan }) => {
  const features = [
    'Akses Penuh Selamanya (Lifetime Access) — Tanpa Biaya Langganan Bulanan',
    'Manajemen Pos Anggaran Otomatis & Pelacakan Pembayaran DP/Lunas',
    'Tabungan Bersama Pasangan (Pria, Wanita, & Bersama 50:50) + Streak Bulanan',
    '9 Fase Milestone Pernikahan Indonesia & 34+ Checklist Tugas Terstruktur',
    'Manajemen Buku Tamu, Status RSVP, Kuota Pax Katering, & Undangan WhatsApp',
    'Vendor Hub Terintegrasi langsung dengan Pos Anggaran Pernikahan',
    'Akses Multi-Perangkat: Dashboard Web & Aplikasi Mobile (Android/iOS)',
    'Akun langsung aktif & dikirim otomatis ke email Anda setelah pembayaran',
  ];

  return (
    <section id="harga" className="py-16 sm:py-24 bg-[#FDF9F6] border-t border-[#EFE2DF]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#9E5564] bg-[#FFF0F2] px-3.5 py-1 rounded-full border border-[#F5CCD3] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Satu Harga Transparan • Sekali Bayar untuk Selamanya</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#3B151C] tracking-tight">
            Investasi Sekali, Tenang Sampai Hari Akad
          </h2>
          <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-[#6E5057]">
            Tidak ada paket gratis yang dibatasi atau tagihan bulanan yang membebani anggaran pernikahan Anda. Cukup satu kali pembayaran untuk seluruh fitur lengkap selamanya.
          </p>
        </div>

        {/* Single Focused Lifetime Card */}
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-[#5C222D] via-[#4B1A24] to-[#38121A] text-white rounded-3xl border border-[#7A303D] shadow-2xl overflow-hidden relative">
          <div className="p-6 sm:p-10 lg:p-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/15">
              <div>
                <div className="inline-flex items-center gap-1.5 bg-[#C75D6E] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
                  <Sparkles className="w-3 h-3" />
                  Paket Hari Bahagia — Lifetime Access
                </div>
                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white">
                  All-In-One Wedding Planner
                </h3>
                <p className="text-xs sm:text-sm text-[#F2CAD2] mt-1 max-w-md">
                  Seluruh fitur perencanaan pernikahan dari awal menabung hingga hari resepsi selesai.
                </p>
              </div>

              <div className="bg-black/25 p-5 rounded-2xl border border-white/15 text-left md:text-right shrink-0">
                <div className="text-xs text-[#F2CAD2] line-through">Rp 149.000</div>
                <div className="text-3xl sm:text-4xl font-serif font-bold text-white mt-0.5">
                  Rp 40.000
                </div>
                <div className="text-[11px] text-[#A3E099] font-semibold mt-1">
                  ✓ Sekali Bayar untuk Selamanya
                </div>
              </div>
            </div>

            {/* Feature Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-8 text-xs sm:text-sm text-[#FFF0F2]">
              {features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#A3E099] shrink-0 mt-0.5 stroke-[3]" />
                  <span className="leading-snug">{feat}</span>
                </div>
              ))}
            </div>

            {/* Action & Payment Info */}
            <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#F2CAD2]">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#A3E099]" />
                  Pembayaran Instan via <strong>Midtrans</strong> (QRIS, VA, E-Wallet)
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1.5">
                  <MailCheck className="w-4 h-4 text-[#F5C2C9]" />
                  Akun Dikirim Otomatis ke Email
                </span>
              </div>

              <button
                type="button"
                onClick={() => onSelectPlan('Paket Hari Bahagia (Lifetime Rp 40.000)')}
                className="w-full sm:w-auto px-7 py-4 text-sm font-bold text-[#5C222D] bg-white hover:bg-[#FFF5F7] rounded-xl transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2 shrink-0"
              >
                <Zap className="w-4 h-4 text-[#C75D6E] fill-current" />
                <span>Beli Akses Sekarang — Rp 40.000</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
