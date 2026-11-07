import React, { useState } from 'react';
import { Menu, X, LogIn } from 'lucide-react';
import { LOGIN_URL } from '../config/env';

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
    <header className="sticky top-0 z-50 glass-nav transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Brand wordmark */}
        <a
          href="#"
          className="flex items-center gap-2 sm:gap-2.5 text-xl sm:text-2xl font-serif font-semibold text-[#4A1D24] tracking-tight whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
        >
          <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#F5D8DB] text-[#7A2A38] flex items-center justify-center text-xs sm:text-sm font-serif italic border border-[#EAC5C9]">
            Y
          </span>
          <span>YukPlanning</span>
        </a>

        {/* Zone 2: Navigation links (Desktop) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#6B4C53]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-[#4A1D24] transition-colors whitespace-nowrap shrink-0 py-1"
            >
              {link.label}
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
            className="px-3.5 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#6A2330] hover:bg-[#561B26] active:scale-98 rounded-xl shadow-xs transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            Beli Akses — Rp 40.000
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
        <div className="md:hidden border-b border-[#EEDBD7] bg-[#FFFDFC]/98 backdrop-blur-md px-5 py-4 space-y-2 animate-fade-in shadow-lg">
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
          <div className="pt-2 border-t border-[#EFE0DB] space-y-2">
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
              className="w-full py-2.5 text-sm font-semibold text-white bg-[#6A2330] hover:bg-[#561B26] rounded-xl text-center shadow-xs cursor-pointer"
            >
              Dapatkan Akses Selamanya — Rp 40.000
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
