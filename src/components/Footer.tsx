import React from 'react';
import { Heart, ShieldCheck, Mail, Phone } from 'lucide-react';
import { LOGIN_URL, SUPPORT_EMAIL, SUPPORT_WHATSAPP } from '../config/env';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FAF5F2] border-t border-[#EFE2DF] py-12 sm:py-16 text-sm text-[#7A5A62]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 mb-10 sm:mb-14">
          {/* Brand Info */}
          <div className="md:col-span-5">
            <a
              href="#"
              className="flex items-center gap-2.5 text-2xl font-serif font-bold text-[#4A1D24] tracking-tight whitespace-nowrap mb-3"
            >
              <span className="w-8 h-8 rounded-full bg-[#F5D8DB] text-[#7A2A38] flex items-center justify-center text-sm font-serif italic border border-[#EAC5C9]">
                <Heart className="w-4 h-4 fill-[#C75D6E] text-[#C75D6E]" />
              </span>
              <span>YukPlanning</span>
            </a>
            <p className="text-xs text-[#7A5A62] max-w-sm leading-relaxed mb-4">
              Platform SaaS perencanaan pernikahan cerdas untuk calon pengantin Indonesia. Rencanakan bujet transparan, tabungan komitmen berdua, dan kelola 34+ checklist KUA tanpa stres finansial.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0F2] border border-[#F5CCD3] text-[11px] font-semibold text-[#873646]">
              <Heart className="w-3 h-3 fill-current" />
              <span>Dibuat dengan cinta untuk pernikahan bahagia</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <div className="text-xs font-semibold text-[#3B151C] uppercase tracking-wider mb-3">
              Solusi & Fitur
            </div>
            <ul className="space-y-2 text-xs">
              <li><a href="#fitur" className="hover:text-[#4A1D24] transition-colors">Tabungan Komitmen 50:50</a></li>
              <li><a href="#fitur" className="hover:text-[#4A1D24] transition-colors">Alokasi Anggaran Real-Time</a></li>
              <li><a href="#fitur" className="hover:text-[#4A1D24] transition-colors">Vendor Hub & Termin DP</a></li>
              <li><a href="#fitur" className="hover:text-[#4A1D24] transition-colors">Buku Tamu & RSVP Katering</a></li>
              <li><a href="#fitur" className="hover:text-[#4A1D24] transition-colors">34+ Checklist Persiapan KUA</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="text-xs font-semibold text-[#3B151C] uppercase tracking-wider mb-3">
              Eksplorasi
            </div>
            <ul className="space-y-2 text-xs">
              <li><a href="#simulasi" className="hover:text-[#4A1D24] transition-colors">Kalkulator Bujet Capeng</a></li>
              <li><a href="#simulasi" className="hover:text-[#4A1D24] transition-colors">Simulasi Setoran Bulanan</a></li>
              <li><a href="#testimoni" className="hover:text-[#4A1D24] transition-colors">Kisah Sukses Pasangan</a></li>
              <li><a href="#harga" className="hover:text-[#4A1D24] transition-colors">Paket Hari Bahagia (Rp 40rb)</a></li>
              <li><a href={LOGIN_URL} className="hover:text-[#4A1D24] font-medium transition-colors">Masuk Dashboard</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="text-xs font-semibold text-[#3B151C] uppercase tracking-wider mb-3">
              Bantuan & Kontak
            </div>
            <ul className="space-y-2 text-xs">
              <li><a href="#faq" className="hover:text-[#4A1D24] transition-colors">Pusat Bantuan / FAQ</a></li>
              <li className="flex items-center gap-1.5 text-[#8C6B72]">
                <Mail className="w-3.5 h-3.5 text-[#6A2330]" />
                <span>{SUPPORT_EMAIL}</span>
              </li>
              <li className="flex items-center gap-1.5 text-[#8C6B72]">
                <Phone className="w-3.5 h-3.5 text-[#4F7A43]" />
                <span>{SUPPORT_WHATSAPP}</span>
              </li>
              <li className="text-[#8C6B72]">Jakarta, Indonesia</li>
            </ul>
          </div>
        </div>

        {/* Quiet Footer Bar */}
        <div className="pt-8 border-t border-[#EFE0DB] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C6B72]">
          <div>
            © {new Date().getFullYear()} YukPlanning. Seluruh hak cipta dilindungi undang-undang.
          </div>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <span className="flex items-center gap-1 text-[#4F7A43]">
              <ShieldCheck className="w-3.5 h-3.5" />
              Keamanan Terenkripsi
            </span>
            <a href="#" className="hover:text-[#4A1D24] transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-[#4A1D24] transition-colors">Syarat & Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
