import React from 'react';
import { Check, Sparkles, ArrowRight } from 'lucide-react';

interface PricingProps {
  onSelectPlan: (planName: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectPlan }) => {
  return (
    <section id="harga" className="py-16 sm:py-20 bg-[#FDF9F6] border-t border-[#EFE2DF]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#9E5564] mb-2">
            Investasi Terjangkau untuk Ketenangan Berdua
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#3B151C] tracking-tight">
            Transparan, Tanpa Biaya Tersembunyi
          </h2>
          <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-[#6E5057]">
            Cukup sekali bayar untuk mengawal seluruh rangkaian persiapan pernikahan Anda dari awal menabung hingga hari akad tiba.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* Plan 1: Kenalan (Gratis) */}
          <div className="bg-white p-5 sm:p-7 rounded-3xl border border-[#EEDBD7] shadow-xs flex flex-col justify-between hover:border-[#D6A7AD] transition-all">
            <div>
              <div className="text-xs font-semibold text-[#8C5E68] uppercase tracking-wider mb-2">
                Starter
              </div>
              <h3 className="font-serif font-bold text-xl text-[#3B151C] mb-1">
                Paket Kenalan
              </h3>
              <p className="text-xs text-[#7A5A62] mb-6">
                Eksplorasi awal untuk pasangan yang baru merencanakan tanggal.
              </p>

              <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-[#EFE0DB]">
                <span className="text-3xl font-serif font-bold text-[#3B151C]">Rp 0</span>
                <span className="text-xs text-[#7A5A62]">/ selamanya</span>
              </div>

              <div className="space-y-3 text-xs text-[#4A3237]">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#4F7A43] shrink-0" />
                  <span>1 Akun Pengguna</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#4F7A43] shrink-0" />
                  <span>Kalkulator simulasi target bujet</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#4F7A43] shrink-0" />
                  <span>Checklist standar 15 tugas nikah</span>
                </div>
                <div className="flex items-center gap-2 text-[#9A7A81]">
                  <span className="w-4 h-4 text-center shrink-0">✕</span>
                  <span>Tidak ada sinkronisasi 2 akun capeng</span>
                </div>
                <div className="flex items-center gap-2 text-[#9A7A81]">
                  <span className="w-4 h-4 text-center shrink-0">✕</span>
                  <span>Maksimal 3 pencatatan vendor</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <button
                type="button"
                onClick={() => onSelectPlan('Paket Kenalan')}
                className="w-full py-2.5 text-xs font-semibold text-[#5C222D] bg-[#FFF2F0] hover:bg-[#FCE6E3] border border-[#ECD1D5] rounded-xl transition-all cursor-pointer"
              >
                Mulai Gratis
              </button>
            </div>
          </div>

          {/* Plan 2: Hari Bahagia (Featured - One-Time Payment) */}
          <div className="bg-[#5C222D] text-white p-7 rounded-3xl border border-[#7A303D] shadow-xl flex flex-col justify-between relative transform md:-translate-y-2">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C75D6E] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Paling Populer & Terfavorit
            </div>

            <div>
              <div className="text-xs font-semibold text-[#F2CAD2] uppercase tracking-wider mb-2 mt-2">
                All-In-One Capeng
              </div>
              <h3 className="font-serif font-bold text-2xl text-white mb-1">
                Paket Hari Bahagia
              </h3>
              <p className="text-xs text-[#F2CAD2] mb-6">
                Akses penuh sampai hari H Anda tiba. Solusi terlengkap tanpa biaya langganan bulanan.
              </p>

              <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-white/15">
                <span className="text-3xl sm:text-4xl font-serif font-bold text-white">
                  Rp 149.000
                </span>
                <span className="text-xs text-[#F2CAD2]">/ sekali bayar sampai hari H</span>
              </div>

              <div className="space-y-3 text-xs text-[#FFF0F2]">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#F5C2C9] shrink-0 stroke-[3]" />
                  <span className="font-semibold">2 Akun Calon Pengantin tersinkron real-time</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#F5C2C9] shrink-0 stroke-[3]" />
                  <span>Unlimited pencatatan tabungan komitmen</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#F5C2C9] shrink-0 stroke-[3]" />
                  <span>Vendor Hub lengkap + reminder termin pembayaran</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#F5C2C9] shrink-0 stroke-[3]" />
                  <span>Manajemen kuota RSVP tamu & porsi katering</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#F5C2C9] shrink-0 stroke-[3]" />
                  <span>34+ Checklist lengkap KUA, MCU, & teknis Hari H</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#F5C2C9] shrink-0 stroke-[3]" />
                  <span>Ekspor laporan PDF & Excel untuk orang tua / WO</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <button
                type="button"
                onClick={() => onSelectPlan('Paket Hari Bahagia')}
                className="w-full py-3 text-xs font-bold text-[#5C222D] bg-white hover:bg-[#FFF5F7] rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-1.5"
              >
                <span>Pilih Paket Hari Bahagia</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Plan 3: Wedding Organizer & Pro */}
          <div className="bg-white p-7 rounded-3xl border border-[#EEDBD7] shadow-xs flex flex-col justify-between hover:border-[#D6A7AD] transition-all">
            <div>
              <div className="text-xs font-semibold text-[#8C5E68] uppercase tracking-wider mb-2">
                Profesional
              </div>
              <h3 className="font-serif font-bold text-xl text-[#3B151C] mb-1">
                WO & Vendor Hub
              </h3>
              <p className="text-xs text-[#7A5A62] mb-6">
                Untuk perencana pernikahan profesional & vendor yang mengelola banyak klien.
              </p>

              <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-[#EFE0DB]">
                <span className="text-3xl font-serif font-bold text-[#3B151C]">Rp 299.000</span>
                <span className="text-xs text-[#7A5A62]">/ bulan</span>
              </div>

              <div className="space-y-3 text-xs text-[#4A3237]">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#4F7A43] shrink-0" />
                  <span>Kelola hingga 10 pasangan pengantin aktif</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#4F7A43] shrink-0" />
                  <span>Multi-user tim WO & kolaborasi klien</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#4F7A43] shrink-0" />
                  <span>Custom branding logo WO pada laporan</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#4F7A43] shrink-0" />
                  <span>Master template bujet & rundown acara</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#4F7A43] shrink-0" />
                  <span>Dukungan prioritas via WhatsApp</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <button
                type="button"
                onClick={() => onSelectPlan('Paket WO & Pro')}
                className="w-full py-2.5 text-xs font-semibold text-[#5C222D] bg-[#FFF2F0] hover:bg-[#FCE6E3] border border-[#ECD1D5] rounded-xl transition-all cursor-pointer"
              >
                Hubungi Tim Partnership
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
