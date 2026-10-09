import React, { useState } from 'react';
import { Calculator, ArrowRight, PiggyBank, Sparkles, AlertCircle } from 'lucide-react';

interface BudgetCalculatorProps {
  onOpenModalWithTarget?: (target: number) => void;
}

export const BudgetCalculator: React.FC<BudgetCalculatorProps> = ({ onOpenModalWithTarget }) => {
  const [targetBudget, setTargetBudget] = useState<number>(120000000);
  const [currentSavings, setCurrentSavings] = useState<number>(35000000);
  const [monthsRemaining, setMonthsRemaining] = useState<number>(8);
  const [splitRatio, setSplitRatio] = useState<number>(50); // % Pria (e.g. 50 = 50:50, 60 = 60:40)

  // Calculations
  const shortfall = Math.max(0, targetBudget - currentSavings);
  const monthlyTotalNeeded = monthsRemaining > 0 ? Math.ceil(shortfall / monthsRemaining) : 0;
  const maleMonthly = Math.round(monthlyTotalNeeded * (splitRatio / 100));
  const femaleMonthly = monthlyTotalNeeded - maleMonthly;

  const formatRupiah = (val: number) => {
    return 'Rp ' + val.toLocaleString('id-ID');
  };

  // Indonesian Wedding Industry Standard Allocations
  const allocations = [
    { name: 'Katering & Prasmanan', pct: 38, desc: 'Porsi tamu, gubukan, VIP', color: 'bg-[#5C222D]' },
    { name: 'Gedung / Venue & Akad', pct: 20, desc: 'Sewa ruang, perizinan, AC', color: 'bg-[#7A2D3C]' },
    { name: 'Dekorasi & Pelaminan', pct: 14, desc: 'Bunga segar, backdrop, lighting', color: 'bg-[#A64455]' },
    { name: 'Dokumentasi Foto & Video', pct: 10, desc: 'Cinematic teaser, album kolase', color: 'bg-[#5A879E]' },
    { name: 'Busana Pengantin & MUA', pct: 10, desc: 'Akad, resepsi, ortu & bridesmaid', color: 'bg-[#C75D6E]' },
    { name: 'Undangan & Cinderamata', pct: 4, desc: 'Website RSVP, souvenir tamu', color: 'bg-[#A6752C]' },
    { name: 'Dana Darurat / Cadangan', pct: 4, desc: 'Biaya tak terduga hari H', color: 'bg-[#4F7A43]' },
  ];

  return (
    <section id="simulasi" className="py-20 bg-white border-t border-[#EFE2DF]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9E5564] mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>Kalkulator Komitmen Capeng</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#3B151C] tracking-tight">
            Hitung Simulasi Tabungan & Pagu Anggaran Anda
          </h2>
          <p className="mt-3 text-base text-[#6E5057]">
            Cari tahu berapa yang perlu Anda dan pasangan tabung tiap bulan secara realistis agar target tercapai tanpa beban hutang.
          </p>
        </div>

        {/* Two-Column Interactive Calculator Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (5 cols) */}
          <div className="lg:col-span-5 bg-[#FAF5F2] p-6 sm:p-8 rounded-3xl border border-[#EEDBD7] space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#EFE0DB]">
              <span className="font-serif font-bold text-lg text-[#3B151C]">Parameter Rencana</span>
              <span className="text-xs text-[#8C5E68]">Bisa diubah fleksibel</span>
            </div>

            {/* Target Budget Input & Presets */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-[#5C222D] mb-1.5">
                <span>Target Total Anggaran</span>
                <span className="text-sm font-bold font-mono text-[#3B151C]">
                  {formatRupiah(targetBudget)}
                </span>
              </div>
              <input
                type="range"
                min="40000000"
                max="350000000"
                step="5000000"
                value={targetBudget}
                onChange={(e) => setTargetBudget(Number(e.target.value))}
                className="w-full h-2.5 bg-[#E6D4D1] rounded-lg appearance-none cursor-pointer accent-[#5C222D]"
              />
              <div className="grid grid-cols-4 gap-1.5 mt-2">
                {[60000000, 100000000, 150000000, 250000000].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setTargetBudget(preset)}
                    className={`py-1.5 text-center text-[10px] sm:text-[11px] font-medium rounded-lg border transition-all cursor-pointer ${
                      targetBudget === preset
                        ? 'bg-[#5C222D] text-white border-[#5C222D] font-bold shadow-2xs'
                        : 'bg-white text-[#7D5A61] border-[#E2CCC8] hover:border-[#5C222D]'
                    }`}
                  >
                    Rp {preset / 1000000} Jt
                  </button>
                ))}
              </div>
            </div>

            {/* Current Savings Input */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-[#5C222D] mb-1.5">
                <span>Tabungan Sudah Terkumpul</span>
                <span className="text-sm font-bold font-mono text-[#3B151C]">
                  {formatRupiah(currentSavings)}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max={targetBudget}
                step="2500000"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(Number(e.target.value))}
                className="w-full h-2 bg-[#E6D4D1] rounded-lg appearance-none cursor-pointer accent-[#5C222D]"
              />
            </div>

            {/* Months Remaining Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-[#5C222D] mb-1.5">
                <span>Sisa Waktu Menuju Hari H</span>
                <span className="text-sm font-bold text-[#3B151C]">{monthsRemaining} Bulan</span>
              </div>
              <input
                type="range"
                min="2"
                max="24"
                step="1"
                value={monthsRemaining}
                onChange={(e) => setMonthsRemaining(Number(e.target.value))}
                className="w-full h-2 bg-[#E6D4D1] rounded-lg appearance-none cursor-pointer accent-[#5C222D]"
              />
              <div className="flex justify-between text-[10px] text-[#8C6B72] mt-1">
                <span>2 Bulan</span>
                <span>6 Bulan</span>
                <span>12 Bulan</span>
                <span>24 Bulan</span>
              </div>
            </div>

            {/* Contribution Split Ratio (Pria vs Wanita) */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-[#5C222D] mb-1.5">
                <span>Skema Pembagian Setoran</span>
                <span className="text-xs font-bold text-[#3B151C]">
                  Pria {splitRatio}% : Wanita {100 - splitRatio}%
                </span>
              </div>
              <input
                type="range"
                min="30"
                max="70"
                step="5"
                value={splitRatio}
                onChange={(e) => setSplitRatio(Number(e.target.value))}
                className="w-full h-2 bg-[#E6D4D1] rounded-lg appearance-none cursor-pointer accent-[#5C222D]"
              />
              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setSplitRatio(50)}
                  className={`flex-1 py-1.5 text-xs rounded-lg border font-medium cursor-pointer ${
                    splitRatio === 50
                      ? 'bg-white text-[#5C222D] border-[#C75D6E] shadow-2xs'
                      : 'bg-[#F2E5E1] text-[#7D5A61] border-transparent'
                  }`}
                >
                  Sama Rata (50 : 50)
                </button>
                <button
                  type="button"
                  onClick={() => setSplitRatio(60)}
                  className={`flex-1 py-1.5 text-xs rounded-lg border font-medium cursor-pointer ${
                    splitRatio === 60
                      ? 'bg-white text-[#5C222D] border-[#C75D6E] shadow-2xs'
                      : 'bg-[#F2E5E1] text-[#7D5A61] border-transparent'
                  }`}
                >
                  Proporsional (60 : 40)
                </button>
              </div>
            </div>
          </div>

          {/* Results & Breakdown Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Recommended Monthly Commitments Banner */}
            <div className="bg-[#5C222D] text-white p-6 sm:p-7 rounded-3xl shadow-md border border-[#7A303D]">
              <div className="flex items-center justify-between text-xs font-semibold text-[#F2CAD2] mb-2 uppercase tracking-wider">
                <span>REKOMENDASI SETORAN RUTIN</span>
                <span>{monthsRemaining} Bulan Tersisa</span>
              </div>

              <div className="flex flex-wrap items-baseline gap-2 mb-4">
                <span className="text-3xl sm:text-4xl font-serif font-bold text-white">
                  {formatRupiah(monthlyTotalNeeded)}
                </span>
                <span className="text-xs text-[#E8B1BC]">/ bulan total berdua</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/15">
                <div className="bg-black/20 p-3.5 rounded-2xl border border-white/10">
                  <div className="text-xs text-[#E8B1BC] flex items-center justify-between">
                    <span>♂ Setoran Calon Suami ({splitRatio}%)</span>
                  </div>
                  <div className="text-lg font-bold font-serif text-white mt-0.5">
                    {formatRupiah(maleMonthly)}
                    <span className="text-xs font-sans font-normal text-[#E8B1BC]">/bln</span>
                  </div>
                </div>

                <div className="bg-black/20 p-3.5 rounded-2xl border border-white/10">
                  <div className="text-xs text-[#E8B1BC] flex items-center justify-between">
                    <span>♀ Setoran Calon Istri ({100 - splitRatio}%)</span>
                  </div>
                  <div className="text-lg font-bold font-serif text-white mt-0.5">
                    {formatRupiah(femaleMonthly)}
                    <span className="text-xs font-sans font-normal text-[#E8B1BC]">/bln</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs text-[#F7D8DF]">
                <span>Sisa kekurangan yang harus dipenuhi:</span>
                <span className="font-bold font-mono">{formatRupiah(shortfall)}</span>
              </div>
            </div>

            {/* Smart Allocation Breakdown for Indonesian Weddings */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#EEDBD7] shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-serif font-bold text-lg text-[#3B151C]">
                    Rekomendasi Alokasi Pagu Anggaran
                  </h4>
                  <p className="text-xs text-[#805D65]">
                    Standar distribusi biaya pernikahan Indonesia untuk menghindari pemborosan
                  </p>
                </div>
                <span className="text-xs font-semibold text-[#4F7A43] bg-[#EBF5E9] px-2.5 py-1 rounded-lg">
                  Formula Teruji
                </span>
              </div>

              {/* Stacked Percentage Bar */}
              <div className="w-full h-3 rounded-full overflow-hidden flex mb-5 bg-[#EFE0DB]">
                {allocations.map((a, i) => (
                  <div
                    key={i}
                    className={`h-full ${a.color}`}
                    style={{ width: `${a.pct}%` }}
                    title={`${a.name}: ${a.pct}%`}
                  ></div>
                ))}
              </div>

              {/* Category Breakdown Table */}
              <div className="space-y-2.5">
                {allocations.map((item, idx) => {
                  const categoryAmount = Math.round(targetBudget * (item.pct / 100));
                  return (
                    <div 
                      key={idx}
                      className="p-3 bg-[#FAF5F2] rounded-xl border border-[#EFE0DB] flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`w-3 h-3 rounded-full ${item.color} shrink-0`}></span>
                        <div>
                          <div className="font-bold text-[#3B151C]">{item.name}</div>
                          <div className="text-[11px] text-[#805D65]">{item.desc}</div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="font-bold font-mono text-[#3B151C]">
                          {formatRupiah(categoryAmount)}
                        </div>
                        <div className="text-[11px] text-[#8C5E68] font-medium">{item.pct}% dari total</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-[#F2E5E1] flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-[#7A5A62]">
                  💡 Gunakan estimasi ini langsung di akun YukPlanner Anda
                </span>
                <button
                  type="button"
                  onClick={() => onOpenModalWithTarget && onOpenModalWithTarget(targetBudget)}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-[#6A2330] hover:bg-[#541B26] rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
                >
                  <span>Buka Rencana dengan Bujet Ini</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
