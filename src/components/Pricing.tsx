import React, { useEffect, useState } from 'react';
import { Check, Sparkles, ArrowRight, ShieldCheck, Zap, MailCheck, Lock } from 'lucide-react';
import { API_BASE_URL } from '../config/env';

interface PricingProps {
  onSelectPlan: (planName: string) => void;
  maintenanceMode?: boolean;
}

interface PublicAppConfig {
  lifetime_price_idr: number;
  original_price_idr: number;
  maintenance_mode: boolean;
  maintenance_message: string;
  announcement_banner: string;
}

function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export const Pricing: React.FC<PricingProps> = ({ onSelectPlan, maintenanceMode = false }) => {
  const [lifetimePrice, setLifetimePrice] = useState<number>(40000);
  const [originalPrice, setOriginalPrice] = useState<number>(149000);
  const [announcementBanner, setAnnouncementBanner] = useState<string>('');

  useEffect(() => {
    let active = true;
    fetch(`${API_BASE_URL}/public/app-config`)
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (!active || !json?.data) return;
        const cfg = json.data as PublicAppConfig;
        if (typeof cfg.lifetime_price_idr === 'number' && cfg.lifetime_price_idr >= 0) {
          setLifetimePrice(cfg.lifetime_price_idr);
        }
        if (typeof cfg.original_price_idr === 'number' && cfg.original_price_idr >= 0) {
          setOriginalPrice(cfg.original_price_idr);
        }
        if (typeof cfg.announcement_banner === 'string') {
          setAnnouncementBanner(cfg.announcement_banner.trim());
        }
      })
      .catch(() => {
        // Fallback aman ke harga default jika backend belum terhubung
      });
    return () => {
      active = false;
    };
  }, []);

  const features = [
    'Akses Penuh Selamanya (Lifetime Access) — Tanpa Biaya Langganan Bulanan',
    'Manajemen Pos Anggaran Otomatis & Pelacakan Pembayaran DP / Pelunasan',
    'Tabungan Bersama Pasangan (Pria, Wanita, & Bersama 50:50) + Streak Bulanan',
    '9 Fase Milestone Pernikahan Indonesia & 34+ Checklist Tugas Terstruktur',
    'Manajemen Buku Tamu, Status RSVP, Kuota Pax Katering, & Undangan WhatsApp',
    'Vendor Hub Terintegrasi langsung dengan Pos Anggaran Pernikahan',
    'Akses Multi-Perangkat: Dashboard Web & Smartphone (Android/iOS)',
    'Akun langsung aktif & password dikirim otomatis ke email setelah pembayaran',
  ];

  const paymentBadges = [
    'QRIS',
    'BCA Virtual Account',
    'Mandiri Livin',
    'BNI Virtual Account',
    'BRI BRIVA',
    'GoPay',
    'ShopeePay',
  ];

  const formattedPrice = formatRupiah(lifetimePrice);
  const showOriginalStrike = originalPrice > lifetimePrice;

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
          {announcementBanner && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFF0F2] border border-[#F5CCD3] text-xs font-semibold text-[#5C222D]">
              <Sparkles className="w-3.5 h-3.5 text-[#C75D6E]" />
              <span>{announcementBanner}</span>
            </div>
          )}
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
                  Seluruh fitur perencanaan pernikahan dari awal menabung hingga resepsi selesai tanpa batas durasi.
                </p>
              </div>

              <div className="bg-black/25 p-5 rounded-2xl border border-white/15 text-left md:text-right shrink-0">
                {showOriginalStrike && (
                  <div className="text-xs text-[#F2CAD2] line-through">
                    {formatRupiah(originalPrice)}
                  </div>
                )}
                <div className="text-3xl sm:text-4xl font-serif font-bold text-white mt-0.5">
                  {formattedPrice}
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

            {/* Payment Methods Badges Strip */}
            <div className="pt-4 pb-6 border-t border-white/15">
              <div className="text-xs text-[#F2CAD2] mb-2 font-medium flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#A3E099]" />
                <span>Metode Pembayaran Resmi via Midtrans:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {paymentBadges.map((badge) => (
                  <span
                    key={badge}
                    className="px-2.5 py-1 text-[11px] font-semibold bg-white/10 hover:bg-white/15 rounded-lg border border-white/10 text-white transition-colors"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Action & Instant Delivery Info */}
            <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#F2CAD2]">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#A3E099]" />
                  Keamanan Pembayaran Midtrans Terenkripsi
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1.5">
                  <MailCheck className="w-4 h-4 text-[#F5C2C9]" />
                  Akun Langsung Aktif 10 Detik
                </span>
              </div>

              <button
                type="button"
                onClick={() => onSelectPlan(`Paket Hari Bahagia (Lifetime ${formattedPrice})`)}
                className="animate-shimmer w-full sm:w-auto px-7 py-4 text-sm font-bold text-[#5C222D] bg-white hover:bg-[#FFF5F7] rounded-xl transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2 shrink-0"
              >
                <Zap className="w-4 h-4 text-[#C75D6E] fill-current" />
                <span>
                  {maintenanceMode
                    ? 'Pemeliharaan Berlangsung — Lihat Status'
                    : `Beli Akses Sekarang — ${formattedPrice}`}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
