import React, { useState } from 'react';
import { Heart, Calendar, Users, CheckCircle2, Copy, Check, ArrowRight, X } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTarget?: number;
  initialPlan?: string;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  initialTarget = 120000000,
  initialPlan = 'Paket Hari Bahagia',
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [groomName, setGroomName] = useState('Amba');
  const [brideName, setBrideName] = useState('Ciimut');
  const [weddingDate, setWeddingDate] = useState('2026-12-20');
  const [targetBudget, setTargetBudget] = useState(initialTarget);
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(`https://app.yukplanner.com/invite/${groomName.toLowerCase()}-${brideName.toLowerCase()}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const formatRupiah = (val: number) => {
    return 'Rp ' + val.toLocaleString('id-ID');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-[#EEDBD7] shadow-2xl overflow-hidden relative animate-fade-in max-h-[92vh] flex flex-col my-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-[#FAF4F2] text-[#7D5A61] hover:text-[#3B151C] flex items-center justify-center transition-colors cursor-pointer z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {step === 'form' ? (
          <div className="p-5 sm:p-8 overflow-y-auto">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9E5564] mb-1">
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Membuat Rencana Pernikahan Berdua</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#3B151C] mb-1 sm:mb-2">
              Satu Langkah Menuju Rencana Sakral
            </h3>
            <p className="text-xs text-[#7A5A62] mb-5 sm:mb-6">
              Yuk siapkan ruang bersama untuk mencatat tabungan komitmen dan alokasi bujet pernikahan Anda berdua.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#5C222D] mb-1">
                    Nama Calon Suami (Pria)
                  </label>
                  <input
                    type="text"
                    required
                    value={groomName}
                    onChange={(e) => setGroomName(e.target.value)}
                    placeholder="Contoh: Amba"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-[#DEC2C6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#873646]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#5C222D] mb-1">
                    Nama Calon Istri (Wanita)
                  </label>
                  <input
                    type="text"
                    required
                    value={brideName}
                    onChange={(e) => setBrideName(e.target.value)}
                    placeholder="Contoh: Ciimut"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-[#DEC2C6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#873646]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5C222D] mb-1">
                  Rencana Tanggal Akad / Resepsi
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={weddingDate}
                    onChange={(e) => setWeddingDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-[#DEC2C6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#873646] bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5C222D] mb-1">
                  Estimasi Target Anggaran Total
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="5000000"
                    value={targetBudget}
                    onChange={(e) => setTargetBudget(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-[#DEC2C6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#873646]"
                  />
                  <span className="absolute right-3.5 top-2.5 text-xs text-[#8C6B72]">
                    {formatRupiah(targetBudget)}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5C222D] mb-1">
                  Nomor WhatsApp atau Email Aktif
                </label>
                <input
                  type="text"
                  required
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  placeholder="0812xxxxxxxx atau nama@email.com"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-[#DEC2C6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#873646]"
                />
                <p className="text-[11px] text-[#9A7A81] mt-1">
                  Untuk mengirimkan link undangan kolaborasi langsung ke ponsel pasangan Anda.
                </p>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3 text-xs sm:text-sm font-semibold text-white bg-[#6A2330] hover:bg-[#541B26] rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Buka Dashboard Pernikahan Kami</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="p-6 sm:p-8 text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#FFF0F2] text-[#A63A4B] flex items-center justify-center mx-auto mb-4 border border-[#F5CCD3]">
              <Heart className="w-7 h-7 fill-current" />
            </div>

            <div className="text-xs font-semibold uppercase tracking-wider text-[#9E5564] mb-1">
              THE WEDDING OF
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#3B151C] mb-2">
              {groomName} & {brideName}
            </h3>
            <p className="text-xs text-[#7A5A62] mb-6">
              Rencana pernikahan Anda telah siap! Tanggal sakral: {weddingDate} • Target Bujet: {formatRupiah(targetBudget)}.
            </p>

            <div className="p-4 bg-[#FAF5F2] rounded-2xl border border-[#EFE0DB] mb-6 text-left">
              <div className="text-xs font-semibold text-[#5C222D] mb-1">
                Tautan Akses Kolaborasi Berdua:
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={`https://app.yukplanner.com/invite/${groomName.toLowerCase()}-${brideName.toLowerCase()}`}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#E0CBC6] rounded-xl font-mono text-[#5C222D]"
                />
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-3.5 py-2 text-xs font-semibold text-white bg-[#6A2330] hover:bg-[#541B26] rounded-xl flex items-center gap-1 cursor-pointer shrink-0"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Tersalin' : 'Salin'}</span>
                </button>
              </div>
              <p className="text-[11px] text-[#8C6B72] mt-2">
                Bagikan tautan ini ke pasangan Anda agar dia bisa langsung melihat dan ikut mencatat setoran tabungan.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="w-full py-3 text-xs sm:text-sm font-semibold text-white bg-[#6A2330] hover:bg-[#541B26] rounded-xl cursor-pointer"
              >
                Kembali ke Halaman Utama
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
