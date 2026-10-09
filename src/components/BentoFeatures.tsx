import React, { useState } from 'react';
import { 
  PiggyBank, 
  PieChart, 
  Store, 
  Users, 
  CheckSquare, 
  TrendingUp, 
  Clock, 
  ArrowUpRight,
  ShieldAlert,
  Coins
} from 'lucide-react';

export const BentoFeatures: React.FC = () => {
  // Interactive preview state for vendor hub
  const [selectedVendorCategory, setSelectedVendorCategory] = useState<'all' | 'deal' | 'nego'>('all');

  return (
    <section id="fitur" className="py-16 sm:py-20 bg-[#FDF9F6] border-t border-[#EFE2DF]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-10 sm:mb-14">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#9E5564] mb-2">
            01. Solusi Menyeluruh untuk Hari Bahagia
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#3B151C] tracking-tight">
            Semua Kebutuhan Perencanaan Pernikahan dalam Satu Alur yang Harmonis
          </h2>
          <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-[#6E5057] leading-relaxed">
            Tinggalkan catatan berantakan di spreadsheet dan grup WhatsApp yang mudah tenggelam. Kelola seluruh aspek finansial dan logistik secara transparan bersama pasangan Anda.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
          {/* Card 1 (Large - Col 7): Pencatatan Tabungan Komitmen Berdua */}
          <div className="md:col-span-7 bg-white p-5 sm:p-8 rounded-3xl border border-[#EEDBD7] shadow-xs flex flex-col justify-between hover:border-[#D9A5AE] transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="w-10 h-10 rounded-2xl bg-[#FFF0F2] text-[#A63A4B] flex items-center justify-center">
                  <PiggyBank className="w-5 h-5" />
                </span>
                <span className="text-xs font-semibold text-[#8C5E68]">
                  01. Finansial Bersama
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#3A141A] mb-2">
                Pencatatan Tabungan Komitmen Berdua yang Transparan & Adil
              </h3>
              <p className="text-sm text-[#6E5057] leading-relaxed mb-6">
                Bebas salah paham finansial. Dukung skema 50:50 maupun proporsional pendapatan. Sistem otomatis menghitung rekomendasi setoran bulanan dan mempertahankan streak kedisiplinan hingga hari pernikahan.
              </p>

              {/* Visual Interactive Preview Box */}
              <div className="p-4 bg-[#FAF5F2] rounded-2xl border border-[#EFE0DB]">
                <div className="flex items-center justify-between text-xs font-semibold text-[#3B151C] mb-2">
                  <span>Progres Komitmen Finansial</span>
                  <span className="text-[#A63A4B] font-bold">65.4% Terkumpul</span>
                </div>
                <div className="w-full h-3 bg-[#EAE0DC] rounded-full overflow-hidden flex mb-3">
                  <div className="h-full bg-[#5A879E]" style={{ width: '44%' }}></div>
                  <div className="h-full bg-[#C75D6E]" style={{ width: '22%' }}></div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white p-2.5 rounded-xl border border-[#EDE2DF]">
                    <div className="text-[11px] text-[#7D5A61]">Pria (amba)</div>
                    <div className="font-bold text-[#3B151C] mt-0.5">Rp 53.000.000 (68%)</div>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-[#EDE2DF]">
                    <div className="text-[11px] text-[#7D5A61]">Wanita (ciimut)</div>
                    <div className="font-bold text-[#3B151C] mt-0.5">Rp 25.500.000 (32%)</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-[#F2E5E1] flex items-center justify-between text-xs text-[#7D5A61]">
              <span className="flex items-center gap-1.5 font-medium">
                <Coins className="w-3.5 h-3.5 text-[#9E5564]" />
                Sinkronisasi otomatis antar smartphone calon pengantin
              </span>
            </div>
          </div>

          {/* Card 2 (Col 5): Alokasi Anggaran & Tracking Real-Time */}
          <div className="md:col-span-5 bg-white p-7 sm:p-8 rounded-3xl border border-[#EEDBD7] shadow-xs flex flex-col justify-between hover:border-[#D9A5AE] transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="w-10 h-10 rounded-2xl bg-[#F0F5EE] text-[#4F7A43] flex items-center justify-center">
                  <PieChart className="w-5 h-5" />
                </span>
                <span className="text-xs font-semibold text-[#8C5E68]">
                  02. Real-Time Tracking
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#3A141A] mb-2">
                Alokasi Anggaran & Kontrol Pagu Bujet Real-Time
              </h3>
              <p className="text-sm text-[#6E5057] leading-relaxed mb-6">
                Bagi total dana ke kategori esensial (Venue, Katering, Foto, MUA, Busana). Deteksi dini jika ada vendor yang berisiko over-budget sebelum kontrak ditandatangani.
              </p>

              {/* Visual Preview */}
              <div className="space-y-2.5">
                <div className="p-3 bg-[#FAF5F2] rounded-xl border border-[#EFE0DB] flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#3B151C]">Katering Prasmanan (38%)</span>
                    <div className="text-[11px] text-[#7D5A61]">Pagu: Rp 46 Jt • Terpakai: Rp 45.6 Jt</div>
                  </div>
                  <span className="text-[#4F7A43] font-bold bg-[#EBF5E9] px-2 py-0.5 rounded-md">
                    Aman
                  </span>
                </div>
                <div className="p-3 bg-[#FAF5F2] rounded-xl border border-[#EFE0DB] flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#3B151C]">Gedung & Akad (26%)</span>
                    <div className="text-[11px] text-[#7D5A61]">Pagu: Rp 32 Jt • DP Terbayar: Rp 16 Jt</div>
                  </div>
                  <span className="text-[#3D6980] font-bold bg-[#EDF3F7] px-2 py-0.5 rounded-md">
                    Termin 1
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-[#F2E5E1] text-xs text-[#7D5A61] flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-[#4F7A43]" />
              <span>Peringatan cerdas saat mendekati batas anggaran</span>
            </div>
          </div>

          {/* Card 3 (Col 4): Vendor Hub & Manajemen Kontrak */}
          <div className="md:col-span-4 bg-white p-5 sm:p-8 rounded-3xl border border-[#EEDBD7] shadow-xs flex flex-col justify-between hover:border-[#D9A5AE] transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="w-10 h-10 rounded-2xl bg-[#FFF6E9] text-[#A6752C] flex items-center justify-center">
                  <Store className="w-5 h-5" />
                </span>
                <span className="text-xs font-semibold text-[#8C5E68]">
                  03. Vendor Hub
                </span>
              </div>

              <h3 className="text-xl font-serif font-bold text-[#3A141A] mb-2">
                Manajemen Vendor & Jadwal Pelunasan Termin
              </h3>
              <p className="text-sm text-[#6E5057] leading-relaxed mb-3">
                Pantau status riset, negosiasi, booking deal, hingga termin pelunasan DP dan H-14 hari. Jangan sampai ada vendor terlambat bayar saat hari H.
              </p>

              {/* REAL WEDDING VENUE PHOTO */}
              <div className="relative rounded-2xl overflow-hidden mb-3 h-28 border border-[#EFE0DB] group">
                <img
                  src="/images/wedding_reception_venue.jpg"
                  alt="Venue Ballroom & Resepsi Pernikahan"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-2.5">
                  <span className="text-[11px] text-white font-medium">✨ Sasana Kriya Ballroom • DP Deal 50%</span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="p-2 bg-[#FAF5F2] rounded-xl border border-[#EFE0DB] flex items-center justify-between">
                  <span className="font-medium text-[#3B151C]">Sasana Kriya TMII</span>
                  <span className="font-bold text-[#2A7545] bg-[#EAF5E9] px-2 py-0.5 rounded-md">Deal (DP 50%)</span>
                </div>
                <div className="p-2 bg-[#FAF5F2] rounded-xl border border-[#EFE0DB] flex items-center justify-between">
                  <span className="font-medium text-[#3B151C]">Aroma Floral Decor</span>
                  <span className="font-bold text-[#A6752C] bg-[#FFF5E6] px-2 py-0.5 rounded-md">Negosiasi</span>
                </div>
              </div>
            </div>

            <div className="pt-5 mt-4 border-t border-[#F2E5E1] text-xs text-[#7D5A61] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#A6752C]" />
              <span>Reminder otomatis jatuh tempo pelunasan</span>
            </div>
          </div>

          {/* Card 4 (Col 4): Manajemen Tamu & Kuota Katering */}
          <div className="md:col-span-4 bg-white p-5 sm:p-8 rounded-3xl border border-[#EEDBD7] shadow-xs flex flex-col justify-between hover:border-[#D9A5AE] transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="w-10 h-10 rounded-2xl bg-[#F0F7F2] text-[#3D7D54] flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </span>
                <span className="text-xs font-semibold text-[#8C5E68]">
                  04. RSVP Presisi
                </span>
              </div>

              <h3 className="text-xl font-serif font-bold text-[#3A141A] mb-2">
                Daftar Tamu & Kontrol Kuota Katering (Anti-Mubazir)
              </h3>
              <p className="text-sm text-[#6E5057] leading-relaxed mb-4">
                Katering menyumbang 35–45% total anggaran. Pastikan jumlah porsi akurat dengan pelacakan status Hadir, Masih Menunggu Konfirmasi, atau Draf keluarga.
              </p>

              <div className="p-3 bg-[#FAF5F2] rounded-xl border border-[#EFE0DB] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#6E5057]">Target Undangan: 400 Pax</span>
                  <span className="font-bold text-[#3D7D54]">92% Konfirmasi</span>
                </div>
                <div className="w-full h-2 bg-[#E6D4D1] rounded-full overflow-hidden flex">
                  <div className="h-full bg-[#4F7A43]" style={{ width: '75%' }}></div>
                  <div className="h-full bg-[#4E7E9E]" style={{ width: '17%' }}></div>
                  <div className="h-full bg-[#D49842]" style={{ width: '8%' }}></div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-[#F2E5E1] text-xs text-[#7D5A61] flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-[#3D7D54]" />
              <span>Cegah kelebihan pesanan porsi makanan</span>
            </div>
          </div>

          {/* Card 5 (Col 4): Checklist Milestone Terstruktur */}
          <div className="md:col-span-4 bg-white p-5 sm:p-8 rounded-3xl border border-[#EEDBD7] shadow-xs flex flex-col justify-between hover:border-[#D9A5AE] transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="w-10 h-10 rounded-2xl bg-[#FFF2F0] text-[#8C3442] flex items-center justify-center">
                  <CheckSquare className="w-5 h-5" />
                </span>
                <span className="text-xs font-semibold text-[#8C5E68]">
                  05. Timeline & KUA
                </span>
              </div>

              <h3 className="text-xl font-serif font-bold text-[#3A141A] mb-2">
                34+ Checklist Terstruktur Khusus Pernikahan Indonesia
              </h3>
              <p className="text-sm text-[#6E5057] leading-relaxed mb-3">
                Panduan langkah demi langkah dari H-12 bulan: MCU pranikah puskesmas, berkas KUA/Catatan Sipil, seserahan & mahar, hingga gladi resik.
              </p>

              {/* REAL WEDDING RINGS & STATIONERY PHOTO */}
              <div className="relative rounded-2xl overflow-hidden mb-3 h-28 border border-[#EFE0DB] group">
                <img
                  src="/images/wedding_rings_flatlay.jpg"
                  alt="Detail Cincin Pernikahan & Checklist"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-2.5">
                  <span className="text-[11px] text-white font-medium">💍 Cincin Kawin, Mahar & Berkas KUA</span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="p-2 bg-[#FAF5F2] rounded-lg border border-[#EFE0DB] flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#4F7A43] text-white flex items-center justify-center text-[10px]">✓</span>
                  <span className="text-[#3A141A] font-medium">MCU Pranikah Puskesmas</span>
                </div>
                <div className="p-2 bg-[#FAF5F2] rounded-lg border border-[#EFE0DB] flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full border border-[#B89CA1]"></span>
                  <span className="text-[#3A141A] font-medium">Fitting Kebaya Akad & Jas</span>
                </div>
              </div>
            </div>

            <div className="pt-5 mt-4 border-t border-[#F2E5E1] text-xs text-[#7D5A61] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#8C3442]" />
              <span>Prioritas tinggi ditandai agar tidak terlewat</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
