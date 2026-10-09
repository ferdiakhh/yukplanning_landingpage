import React from 'react';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FAF5F2] border-t border-[#EFE2DF] py-10 sm:py-14 text-sm text-[#7A5A62]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Brand Info */}
          <div className="md:col-span-5">
            <a 
              href="#" 
              className="flex items-center gap-2.5 text-2xl font-serif font-semibold text-[#4A1D24] tracking-tight whitespace-nowrap mb-3"
            >
              <span className="w-8 h-8 rounded-full bg-[#F5D8DB] text-[#7A2A38] flex items-center justify-center text-sm font-serif italic border border-[#EAC5C9]">
                Y
              </span>
              <span>YukPlanner</span>
            </a>
            <p className="text-xs text-[#7A5A62] leading-relaxed max-w-sm mb-4">
              Platform SaaS wedding planner kolaboratif untuk pasangan calon pengantin Indonesia. Rencanakan pernikahan sakral impian dengan tabungan transparan, bujet terkontrol, dan relasi yang harmonis.
            </p>
            <div className="text-xs text-[#9E5564] flex items-center gap-1.5 font-serif italic">
              <Heart className="w-3.5 h-3.5 fill-current text-[#C75D6E]" />
              <span>Diciptakan dengan cinta untuk setiap janji suci berdua.</span>
            </div>
          </div>

          {/* Nav Mirrors */}
          <div className="md:col-span-2 md:col-start-7">
            <div className="text-xs font-semibold text-[#3B151C] uppercase tracking-wider mb-3">
              Fitur Utama
            </div>
            <ul className="space-y-2 text-xs">
              <li><a href="#fitur" className="hover:text-[#4A1D24] transition-colors">Tabungan Komitmen</a></li>
              <li><a href="#fitur" className="hover:text-[#4A1D24] transition-colors">Alokasi Anggaran Real-Time</a></li>
              <li><a href="#fitur" className="hover:text-[#4A1D24] transition-colors">Vendor Hub & Termin DP</a></li>
              <li><a href="#fitur" className="hover:text-[#4A1D24] transition-colors">RSVP Tamu & Kuota Katering</a></li>
              <li><a href="#fitur" className="hover:text-[#4A1D24] transition-colors">34+ Checklist Persiapan KUA</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="text-xs font-semibold text-[#3B151C] uppercase tracking-wider mb-3">
              Alat Bantu
            </div>
            <ul className="space-y-2 text-xs">
              <li><a href="#simulasi" className="hover:text-[#4A1D24] transition-colors">Kalkulator Bujet Capeng</a></li>
              <li><a href="#simulasi" className="hover:text-[#4A1D24] transition-colors">Simulasi Setoran Bulanan</a></li>
              <li><a href="#testimoni" className="hover:text-[#4A1D24] transition-colors">Kisah Sukses Pasangan</a></li>
              <li><a href="#harga" className="hover:text-[#4A1D24] transition-colors">Paket Hari Bahagia</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="text-xs font-semibold text-[#3B151C] uppercase tracking-wider mb-3">
              Bantuan & Kontak
            </div>
            <ul className="space-y-2 text-xs">
              <li><a href="#faq" className="hover:text-[#4A1D24] transition-colors">Pusat Bantuan / FAQ</a></li>
              <li><span className="text-[#8C6B72]">halo@yukplanner.com</span></li>
              <li><span className="text-[#8C6B72]">+62 812-9988-7766 (WhatsApp)</span></li>
              <li><span className="text-[#8C6B72]">Jakarta, Indonesia</span></li>
            </ul>
          </div>
        </div>

        {/* Quiet Footer Bar */}
        <div className="pt-8 border-t border-[#EFE0DB] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C6B72]">
          <div>
            © {new Date().getFullYear()} YukPlanner. Seluruh hak cipta dilindungi undang-undang.
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-[#4A1D24] transition-colors">Kebijakan Privasi</a>
            <span aria-hidden="true">·</span>
            <a href="#" className="hover:text-[#4A1D24] transition-colors">Syarat & Ketentuan</a>
            <span aria-hidden="true">·</span>
            <a href="#" className="hover:text-[#4A1D24] transition-colors">Keamanan Data Finansial</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
