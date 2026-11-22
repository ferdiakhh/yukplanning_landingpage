import React, { useState } from 'react';
import { Menu, X, LogIn, Sparkles, ArrowRight, Heart } from 'lucide-react';
import { LOGIN_URL, SUPPORT_WHATSAPP } from '../config/env';

interface NavbarProps {
  onOpenModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Fitur Utama', href: '#fitur' },
    { label: 'Kalkulator Bujet', href: '#simulasi' },
    { label: 'Kisah Pasangan', href: '#testimoni' },
    { label: 'Harga Lifetime', href: '#harga' },
    { label: 'Tanya Jawab', href: '#faq' },
  ];

  return (
    <header className="sticky top-0 z-50 transition-all">
      {/* Top Subtle Announcement Ribbon */}
      <div className="bg-gradient-to-r from-[#5C222D] via-[#752838] to-[#5C222D] text-white py-1.5 px-4 text-center text-[11px] sm:text-xs font-medium flex items-center justify-center gap-2 shadow-xs">
        <Sparkles className="w-3.5 h-3.5 text-[#F7DF94] shrink-0" />
        <span className="truncate">
          <strong>Promo Akses Selamanya:</strong> Cukup sekali bayar <strong>Rp 40.000</strong> tanpa langganan bulanan.
        </span>
        <button
          type="button"
          onClick={onOpenModal}
          className="hidden sm:inline-flex items-center gap-1 font-bold text-[#FDE8EC] hover:text-white underline ml-1 cursor-pointer"
        >
          <span>Dapatkan Sekarang</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Main Glassmorphic Navigation Bar */}
      <div className="glass-nav">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between gap-4 md:gap-8">
          {/* Zone 1: Brand wordmark */}
          <a
            href="#"
            className="flex items-center gap-2.5 group whitespace-nowrap shrink-0 hover:opacity-95 transition-opacity"
          >
            <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-[#7A2A38] to-[#521B25] text-[#FFF0F2] flex items-center justify-center text-sm font-serif italic border border-[#EAC5C9] shadow-xs group-hover:scale-105 transition-transform">
              <Heart className="w-4 h-4 fill-[#F2CAD2] text-[#F2CAD2]" />
            </span>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-serif font-bold text-[#3B151C] tracking-tight leading-none">
                YukPlanning
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#9E5564] font-semibold mt-0.5">
                Wedding Planner
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation links (Desktop) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#6B4C53]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#4A1D24] transition-colors whitespace-nowrap shrink-0 py-1 relative group"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#8C3442] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Zone 3: Login Link + Primary Checkout CTA + Mobile Menu Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href={LOGIN_URL}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-[#5C222D] hover:bg-[#FAF0EE] rounded-xl transition-colors"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Masuk</span>
            </a>

            <button
              type="button"
              onClick={onOpenModal}
              className="animate-shimmer px-3.5 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#6A2330] hover:bg-[#561B26] active:scale-98 rounded-xl shadow-xs transition-all whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
            >
              <span>Beli Akses — Rp 40.000</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile hamburger button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              className="md:hidden p-2 text-[#5C222D] hover:bg-[#F5E8E5] rounded-xl transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-[#EEDBD7] bg-[#FFFDFC]/98 backdrop-blur-md px-5 py-4 space-y-2 animate-fade-in shadow-xl">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 px-3 text-sm font-medium text-[#4A2028] hover:bg-[#FAF2EE] rounded-xl transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-[#EFE0DB] space-y-2.5">
              <a
                href={LOGIN_URL}
                className="w-full py-2.5 text-sm font-semibold text-[#5C222D] bg-[#FFF2F0] border border-[#ECD1D5] rounded-xl flex items-center justify-center gap-1.5"
              >
                <LogIn className="w-4 h-4" />
                <span>Sudah Punya Akun? Masuk Dashboard</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenModal();
                }}
                className="w-full py-2.5 text-sm font-semibold text-white bg-[#6A2330] hover:bg-[#561B26] rounded-xl text-center shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Dapatkan Akses Selamanya — Rp 40.000</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="text-center pt-1 text-[11px] text-[#7A5A62]">
                Butuh bantuan? Hubungi WhatsApp: <strong>{SUPPORT_WHATSAPP}</strong>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
