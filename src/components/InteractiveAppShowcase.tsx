import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Calendar, 
  CheckCircle2, 
  PiggyBank, 
  Users, 
  Store, 
  Plus, 
  Flame, 
  Sparkles, 
  ListTodo, 
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { INITIAL_DEPOSITS, INITIAL_TASKS } from '../data/mockData';
import { DepositItem, TaskItem } from '../types';

export const InteractiveAppShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'beranda' | 'cashflow' | 'todolist'>('beranda');
  
  // Real-time ticking countdown to Dec 20, 2026
  const [timeLeft, setTimeLeft] = useState({
    days: 71,
    hours: 8,
    minutes: 56,
    seconds: 35,
  });

  useEffect(() => {
    const targetDate = new Date('2026-12-20T08:00:00').getTime();
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  // Interactive state for deposits
  const [deposits, setDeposits] = useState<DepositItem[]>(INITIAL_DEPOSITS);
  const [depositFilter, setDepositFilter] = useState<'all' | 'pria' | 'wanita' | 'bersama'>('all');
  const [showAddDepositModal, setShowAddDepositModal] = useState(false);
  const [newDepositTitle, setNewDepositTitle] = useState('Alokasi Tabungan Gaji Bersama');
  const [newDepositContributor, setNewDepositContributor] = useState<'pria' | 'wanita' | 'bersama'>('bersama');
  const [newDepositAmount, setNewDepositAmount] = useState('5000000');

  // Interactive state for tasks
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);

  const toggleTask = (taskId: string) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, isCompleted: !t.isCompleted } : t));
  };

  const completedCount = tasks.filter(t => t.isCompleted).length;
  const completionPercentage = Math.round((completedCount / tasks.length) * 100);

  // Dynamic calculations for deposits
  const totalSavings = deposits.reduce((acc, curr) => acc + curr.amount, 0);
  const targetBudget = 120000000;
  const savingsPercentage = ((totalSavings / targetBudget) * 100).toFixed(1);
  const remainingBudget = Math.max(0, targetBudget - totalSavings);

  const maleTotal = deposits.filter(d => d.contributor === 'pria').reduce((acc, c) => acc + c.amount, 0);
  const femaleTotal = deposits.filter(d => d.contributor === 'wanita').reduce((acc, c) => acc + c.amount, 0);
  const sharedTotal = deposits.filter(d => d.contributor === 'bersama').reduce((acc, c) => acc + c.amount, 0);

  const handleAddDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseInt(newDepositAmount.replace(/\D/g, ''), 10) || 1000000;
    const contributorLabel = newDepositContributor === 'pria' ? 'amba (Pria)' : newDepositContributor === 'wanita' ? 'ciimut (Wanita)' : 'Keduanya (Bersama)';
    
    const newEntry: DepositItem = {
      id: `dep-${Date.now()}`,
      title: newDepositTitle || 'Setoran Tabungan',
      contributor: newDepositContributor,
      contributorName: contributorLabel,
      date: 'Hari ini',
      amount: amountNum,
    };

    setDeposits([newEntry, ...deposits]);
    setShowAddDepositModal(false);
    setNewDepositTitle('Alokasi Tabungan Tambahan');
  };

  const filteredDeposits = deposits.filter(d => {
    if (depositFilter === 'all') return true;
    return d.contributor === depositFilter;
  });

  const formatRupiah = (num: number) => {
    return 'Rp ' + num.toLocaleString('id-ID');
  };

  return (
    <div className="w-full">
      {/* Device frame header / interactive view switcher */}
      <div className="bg-[#FAF4EE] border border-[#ECD9D5] rounded-2xl shadow-xl overflow-hidden">
        {/* Browser Top Chrome */}
        <div className="px-3.5 sm:px-5 py-2.5 sm:py-3.5 bg-[#F6ECE7] border-b border-[#ECD9D5] flex items-center justify-between gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#E8A5A5]"></div>
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#E4CEB5]"></div>
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#BFD4B2]"></div>
            <span className="ml-1 sm:ml-2 text-[11px] sm:text-xs font-medium text-[#7D5A61] hidden sm:inline">
              app.yukplanner.com/amba-ciimut
            </span>
          </div>

          {/* Interactive view tabs (Mobile friendly scrollable) */}
          <div className="flex items-center gap-1 bg-[#EFE3DD] p-1 rounded-xl overflow-x-auto max-w-full">
            <button
              type="button"
              onClick={() => setActiveTab('beranda')}
              className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-[11px] sm:text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === 'beranda'
                  ? 'bg-white text-[#561B26] shadow-xs'
                  : 'text-[#7D5A61] hover:text-[#561B26]'
              }`}
            >
              <span className="hidden sm:inline">1. </span>Beranda
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('cashflow')}
              className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-[11px] sm:text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === 'cashflow'
                  ? 'bg-white text-[#561B26] shadow-xs'
                  : 'text-[#7D5A61] hover:text-[#561B26]'
              }`}
            >
              <span className="hidden sm:inline">2. </span>Tabungan<span className="hidden md:inline"> & Anggaran</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('todolist')}
              className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-[11px] sm:text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === 'todolist'
                  ? 'bg-white text-[#561B26] shadow-xs'
                  : 'text-[#7D5A61] hover:text-[#561B26]'
              }`}
            >
              <span className="hidden sm:inline">3. </span>Todo List<span className="hidden md:inline"> Persiapan</span>
            </button>
          </div>

          <div className="text-xs text-[#8C6B72] font-medium hidden md:flex items-center gap-1 shrink-0">
            <ShieldCheck className="w-3.5 h-3.5 text-[#5C222D]" />
            <span>Mode Demo Interaktif</span>
          </div>
        </div>

        {/* Product Interior View */}
        <div className="p-3.5 sm:p-6 lg:p-8 bg-gradient-to-br from-[#FFFDFC] via-[#FAF5F1] to-[#F7EDE7] min-h-[540px]">
          {/* Header Bar within app */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-[#EED9D5]">
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-semibold tracking-wider text-[#A06443] uppercase mb-0.5 sm:mb-1">
                <span>THE WEDDING OF</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1 text-[#6B4C53]">
                  <Calendar className="w-3 h-3 text-[#A06443]" />
                  20 Des 2026
                </span>
                <span aria-hidden="true">·</span>
                <span className="text-[#874A55] font-medium">#AmbaCiimutMenikah</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#3B151C] tracking-tight">
                amba & ciimut
              </h2>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setActiveTab('todolist')}
                className="flex-1 sm:flex-none justify-center px-3 sm:px-3.5 py-2 text-xs font-semibold text-[#5C222D] bg-[#FFF2F0] hover:bg-[#FCE5E2] border border-[#EAC5C9] rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ListTodo className="w-3.5 h-3.5 text-[#7A2A38]" />
                <span>Todo List</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('cashflow');
                  setShowAddDepositModal(true);
                }}
                className="flex-1 sm:flex-none justify-center px-3 sm:px-3.5 py-2 text-xs font-semibold text-white bg-[#6A2330] hover:bg-[#541B26] rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Catat Setoran</span>
              </button>
            </div>
          </div>

          {/* VIEW 1: BERANDA (DASHBOARD) */}
          {activeTab === 'beranda' && (
            <div className="mt-6 space-y-6">
              {/* Quick Stat Tiles */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div 
                  onClick={() => setActiveTab('todolist')}
                  className="bg-white p-4 rounded-2xl border border-[#EEDBD7] shadow-xs hover:border-[#D6A7AD] transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-8 h-8 rounded-xl bg-[#F0F5EE] text-[#4F7A43] flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4" />
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#B89CA1] group-hover:text-[#5C222D] group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <div className="text-xs text-[#7D5A61] font-medium">Kesiapan Acara</div>
                  <div className="text-lg font-bold text-[#3A141A] font-serif mt-0.5">
                    {completionPercentage}% Selesai
                  </div>
                  <div className="text-[11px] text-[#9A7A81] mt-0.5">
                    {completedCount} dari {tasks.length} Tugas
                  </div>
                </div>

                <div 
                  onClick={() => setActiveTab('cashflow')}
                  className="bg-white p-4 rounded-2xl border border-[#EEDBD7] shadow-xs hover:border-[#D6A7AD] transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-8 h-8 rounded-xl bg-[#FFF0F2] text-[#A63A4B] flex items-center justify-center">
                      <PiggyBank className="w-4 h-4" />
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#B89CA1] group-hover:text-[#5C222D] group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <div className="text-xs text-[#7D5A61] font-medium">Tabungan Komitmen</div>
                  <div className="text-lg font-bold text-[#3A141A] font-serif mt-0.5">
                    {savingsPercentage}% Target
                  </div>
                  <div className="text-[11px] text-[#A63A4B] font-medium flex items-center gap-1 mt-0.5">
                    <Flame className="w-3 h-3" />
                    <span>3 Bulan Disiplin</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#EEDBD7] shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-8 h-8 rounded-xl bg-[#F0F7F2] text-[#3D7D54] flex items-center justify-center">
                      <Users className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="text-xs text-[#7D5A61] font-medium">Konfirmasi Tamu</div>
                  <div className="text-lg font-bold text-[#3A141A] font-serif mt-0.5">
                    4 Pax Hadir
                  </div>
                  <div className="text-[11px] text-[#9A7A81] mt-0.5">
                    dari 29 Kuota Katering
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#EEDBD7] shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-8 h-8 rounded-xl bg-[#FDF5E6] text-[#A67C2E] flex items-center justify-center">
                      <Store className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="text-xs text-[#7D5A61] font-medium">Vendor Utama</div>
                  <div className="text-lg font-bold text-[#3A141A] font-serif mt-0.5">
                    4 Vendor Deal
                  </div>
                  <div className="text-[11px] text-[#A67C2E] font-medium mt-0.5">
                    1 Masih Negosiasi
                  </div>
                </div>
              </div>

              {/* Main Dual Row: Countdown Card & Tabungan Bersama Card */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
                {/* Countdown Card (Burgundy) */}
                <div className="lg:col-span-5 bg-[#5C222D] text-white p-4.5 sm:p-6 rounded-3xl shadow-md border border-[#7A3340] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                      <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-white/10 flex items-center justify-center text-[#F9D6DC]">
                        <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                      </span>
                      <div>
                        <h4 className="font-serif font-bold text-base sm:text-lg text-white">Menuju Hari Bahagia</h4>
                        <p className="text-[11px] sm:text-xs text-[#F2CAD2]">Hitungan sakral akad & resepsi</p>
                      </div>
                    </div>

                    {/* Countdown Digits */}
                    <div className="grid grid-cols-4 gap-1.5 sm:gap-2 text-center py-2 sm:py-4">
                      <div className="bg-[#42151D] p-2 sm:p-3 rounded-xl sm:rounded-2xl border border-white/10">
                        <div className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-white">
                          {timeLeft.days}
                        </div>
                        <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#E8B1BC] mt-0.5 font-medium">
                          Hari
                        </div>
                      </div>
                      <div className="bg-[#42151D] p-2 sm:p-3 rounded-xl sm:rounded-2xl border border-white/10">
                        <div className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-white">
                          {String(timeLeft.hours).padStart(2, '0')}
                        </div>
                        <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#E8B1BC] mt-0.5 font-medium">
                          Jam
                        </div>
                      </div>
                      <div className="bg-[#42151D] p-2 sm:p-3 rounded-xl sm:rounded-2xl border border-white/10">
                        <div className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-white">
                          {String(timeLeft.minutes).padStart(2, '0')}
                        </div>
                        <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#E8B1BC] mt-0.5 font-medium">
                          Menit
                        </div>
                      </div>
                      <div className="bg-[#42151D] p-2 sm:p-3 rounded-xl sm:rounded-2xl border border-white/10">
                        <div className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-[#FFD1DA]">
                          {String(timeLeft.seconds).padStart(2, '0')}
                        </div>
                        <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#E8B1BC] mt-0.5 font-medium">
                          Detik
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 sm:pt-4 mt-2 border-t border-white/15">
                    <p className="text-[11px] sm:text-xs italic text-[#F7D8DF] text-center font-serif">
                      "Dua hati, satu tujuan, melangkah bersama selamanya..."
                    </p>
                  </div>
                </div>

                {/* Tabungan Bersama Card */}
                <div className="lg:col-span-7 bg-white p-4.5 sm:p-6 rounded-3xl border border-[#EEDBD7] shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-xl bg-[#FFF0F2] text-[#A63A4B] flex items-center justify-center">
                          <PiggyBank className="w-4 h-4" />
                        </span>
                        <div>
                          <h4 className="font-bold text-[#3B151C]">Tabungan Bersama</h4>
                          <p className="text-xs text-[#805D65]">Progres tabungan & komitmen finansial</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#A63A4B] bg-[#FFF2F4] px-2.5 py-1 rounded-lg border border-[#F5CCD3]">
                        <Flame className="w-3.5 h-3.5" />
                        <span>3 Bulan Disiplin</span>
                      </div>
                    </div>

                    {/* Progress Headline */}
                    <div className="flex flex-wrap items-baseline gap-2 mb-2">
                      <span className="text-2xl sm:text-3xl font-serif font-bold text-[#3A141A]">
                        {formatRupiah(totalSavings)}
                      </span>
                      <span className="text-xs text-[#7A5A62]">
                        dari {formatRupiah(targetBudget)} target
                      </span>
                      <span className="ml-auto text-xs font-bold text-[#5C222D] bg-[#FCEBEF] px-2 py-0.5 rounded-md">
                        {savingsPercentage}% Tercapai
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-3 bg-[#F0E4E1] rounded-full overflow-hidden mb-5">
                      <div 
                        className="h-full bg-gradient-to-r from-[#873646] to-[#C75D6E] rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, Number(savingsPercentage))}%` }}
                      ></div>
                    </div>

                    {/* Capeng Contribution Split */}
                    <div className="p-3.5 bg-[#FBF6F3] rounded-2xl border border-[#EFE0DB]">
                      <div className="flex items-center justify-between text-xs font-medium text-[#7D5A61] mb-2">
                        <span>Komposisi Tabungan Capeng</span>
                        <span className="text-[#A06443] font-semibold">Saran: Rp 7 Jt/bln</span>
                      </div>
                      
                      {/* Dual Color Bar (Pria vs Wanita) */}
                      <div className="w-full h-2.5 bg-[#E6D4D1] rounded-full overflow-hidden flex mb-2">
                        <div 
                          className="h-full bg-[#5A879E]" 
                          style={{ width: `${(maleTotal / totalSavings) * 100}%` }}
                          title="Pria"
                        ></div>
                        <div 
                          className="h-full bg-[#C75D6E]" 
                          style={{ width: `${(femaleTotal / totalSavings) * 100}%` }}
                          title="Wanita"
                        ></div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between text-xs text-[#6B4C53] pt-1">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#5A879E]"></span>
                          <span>Pria: {formatRupiah(maleTotal)} ({Math.round((maleTotal / totalSavings) * 100)}%)</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#C75D6E]"></span>
                          <span>Wanita: {formatRupiah(femaleTotal)} ({Math.round((femaleTotal / totalSavings) * 100)}%)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 mt-2 border-t border-[#F2E5E1] text-xs">
                    <span className="text-[#4F7A43] font-medium flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>Total {deposits.length} kali setoran tercatat</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveTab('cashflow')}
                      className="text-[#6A2330] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      Kelola Tabungan & Anggaran →
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Row: Fokus Minggu Ini & Kelola Tamu */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-[#EEDBD7] shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-[#FFF2F0] text-[#8C3442] flex items-center justify-center text-xs font-bold">
                        📌
                      </span>
                      <div>
                        <h5 className="font-bold text-sm text-[#3A141A]">Fokus Minggu Ini</h5>
                        <p className="text-[11px] text-[#8C6B72]">🎯 Venue & Akad • H-3 Bulan</p>
                      </div>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setActiveTab('todolist')}
                      className="text-xs text-[#8C3442] font-semibold hover:underline cursor-pointer"
                    >
                      Semua Tugas →
                    </button>
                  </div>
                  <div className="p-3 bg-[#FAF6F3] rounded-xl border border-[#EFE0DB] flex items-start gap-3">
                    <span className="w-4 h-4 rounded-full border border-[#C5A3A8] mt-0.5 shrink-0"></span>
                    <div>
                      <div className="text-xs font-semibold text-[#3A141A]">
                        Koordinasi perizinan lingkungan & keamanan gedung
                      </div>
                      <div className="text-[11px] text-[#7D5A61] mt-0.5">
                        Venue • <span className="text-[#A06443] font-medium">Sedang Berjalan</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#EEDBD7] shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-[#F0F7F2] text-[#3D7D54] flex items-center justify-center text-xs font-bold">
                        👥
                      </span>
                      <div>
                        <h5 className="font-bold text-sm text-[#3A141A]">Kelola Tamu & Vendor Hub</h5>
                        <p className="text-[11px] text-[#8C6B72]">Status RSVP & Katering (29 Pax Kuota)</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-[#FAF6F3] rounded-xl border border-[#EFE0DB]">
                    <div className="w-full h-2 bg-[#E4D5D2] rounded-full overflow-hidden flex mb-2">
                      <div className="h-full bg-[#4F7A43]" style={{ width: '15%' }} title="Hadir"></div>
                      <div className="h-full bg-[#4E7E9E]" style={{ width: '40%' }} title="Menunggu"></div>
                      <div className="h-full bg-[#D49842]" style={{ width: '45%' }} title="Draf"></div>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-[#6B4C53]">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#4F7A43]"></span> 4 Hadir
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#4E7E9E]"></span> 12 Menunggu
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#D49842]"></span> 13 Draf
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 2: CASHFLOW / TABUNGAN & ANGGARAN */}
          {activeTab === 'cashflow' && (
            <div className="mt-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column: Big Budget Summary */}
                <div className="lg:col-span-6 space-y-4">
                  {/* Total Tabungan Terkumpul Card */}
                  <div className="bg-[#5C222D] text-white p-6 rounded-3xl shadow-sm border border-[#78303C]">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs uppercase tracking-wider text-[#F2CAD2] font-semibold">
                        TOTAL TABUNGAN TERKUMPUL
                      </span>
                      <span className="px-2.5 py-1 text-xs font-bold text-white bg-white/15 rounded-lg">
                        {savingsPercentage}% Tercapai
                      </span>
                    </div>

                    <div className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
                      {formatRupiah(totalSavings)}
                    </div>

                    <div className="w-full h-2.5 bg-black/25 rounded-full overflow-hidden mb-5">
                      <div 
                        className="h-full bg-[#F5C2C9] rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, Number(savingsPercentage))}%` }}
                      ></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/15 text-xs">
                      <div>
                        <div className="text-[#E8B1BC]">Target Anggaran</div>
                        <div className="font-bold text-sm text-white mt-0.5">
                          {formatRupiah(targetBudget)}
                        </div>
                      </div>
                      <div>
                        <div className="text-[#E8B1BC]">Sisa Kebutuhan</div>
                        <div className="font-bold text-sm text-[#FFD1DA] mt-0.5">
                          {formatRupiah(remainingBudget)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dual Stat Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-2xl border border-[#EEDBD7] shadow-xs">
                      <div className="flex items-center justify-between text-xs text-[#7A5A62] font-medium">
                        <span>Streak Nabung</span>
                        <Flame className="w-3.5 h-3.5 text-[#C75D6E]" />
                      </div>
                      <div className="text-xl font-bold font-serif text-[#3A141A] mt-1">
                        3 Bulan
                      </div>
                      <div className="text-[11px] text-[#A63A4B] font-semibold mt-0.5 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Bulan ini aman
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-[#EEDBD7] shadow-xs">
                      <div className="flex items-center justify-between text-xs text-[#7A5A62] font-medium">
                        <span>Saran per Bulan</span>
                        <Sparkles className="w-3.5 h-3.5 text-[#A06443]" />
                      </div>
                      <div className="text-xl font-bold font-serif text-[#3A141A] mt-1">
                        {formatRupiah(Math.round(remainingBudget / 6))}
                      </div>
                      <div className="text-[11px] text-[#7A5A62] mt-0.5">
                        Untuk sisa 6 bulan
                      </div>
                    </div>
                  </div>

                  {/* Kontribusi Pasangan breakdown */}
                  <div className="bg-white p-5 rounded-2xl border border-[#EEDBD7] shadow-xs">
                    <div className="flex items-center justify-between text-xs font-semibold text-[#3A141A] mb-3">
                      <span>Kontribusi Pasangan</span>
                      <span className="text-[#A06443] bg-[#FDF6EE] px-2 py-0.5 rounded-md border border-[#F3DEC8]">
                        Bersama: {formatRupiah(sharedTotal)} (50:50)
                      </span>
                    </div>

                    <div className="w-full h-2.5 bg-[#EFE3E0] rounded-full overflow-hidden flex mb-3">
                      <div 
                        className="h-full bg-[#5A879E]" 
                        style={{ width: `${(maleTotal / totalSavings) * 100}%` }}
                      ></div>
                      <div 
                        className="h-full bg-[#C75D6E]" 
                        style={{ width: `${(femaleTotal / totalSavings) * 100}%` }}
                      ></div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-[#F4F8FA] rounded-xl border border-[#DEEBF1]">
                        <div className="text-[#4E768C] font-medium">amba (Pria)</div>
                        <div className="text-sm font-bold text-[#2A4959] mt-0.5">
                          {formatRupiah(maleTotal)}
                        </div>
                      </div>
                      <div className="p-3 bg-[#FFF6F7] rounded-xl border border-[#FBE3E6]">
                        <div className="text-[#964755] font-medium">ciimut (Wanita)</div>
                        <div className="text-sm font-bold text-[#5C222D] mt-0.5">
                          {formatRupiah(femaleTotal)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Riwayat Setoran */}
                <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-[#EEDBD7] shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-xl bg-[#FFF2F0] text-[#8C3442] flex items-center justify-center text-xs font-bold">
                          🕒
                        </span>
                        <div>
                          <h4 className="font-bold text-[#3B151C]">Riwayat Setoran</h4>
                          <p className="text-xs text-[#805D65]">
                            {filteredDeposits.length} transaksi tercatat
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setShowAddDepositModal(true)}
                        className="px-3 py-1.5 text-xs font-semibold text-[#5C222D] bg-[#FFF2F4] hover:bg-[#FCE6EA] border border-[#F5CCD3] rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Tambah Setoran
                      </button>
                    </div>

                    {/* Filter buttons */}
                    <div className="flex items-center gap-1.5 p-1 bg-[#FAF4F1] rounded-xl mb-4">
                      <button
                        type="button"
                        onClick={() => setDepositFilter('all')}
                        className={`px-3 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                          depositFilter === 'all'
                            ? 'bg-white text-[#561B26] shadow-2xs font-semibold'
                            : 'text-[#7D5A61] hover:text-[#561B26]'
                        }`}
                      >
                        Semua
                      </button>
                      <button
                        type="button"
                        onClick={() => setDepositFilter('pria')}
                        className={`px-3 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                          depositFilter === 'pria'
                            ? 'bg-white text-[#561B26] shadow-2xs font-semibold'
                            : 'text-[#7D5A61] hover:text-[#561B26]'
                        }`}
                      >
                        amba (Pria)
                      </button>
                      <button
                        type="button"
                        onClick={() => setDepositFilter('wanita')}
                        className={`px-3 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                          depositFilter === 'wanita'
                            ? 'bg-white text-[#561B26] shadow-2xs font-semibold'
                            : 'text-[#7D5A61] hover:text-[#561B26]'
                        }`}
                      >
                        ciimut (Wanita)
                      </button>
                      <button
                        type="button"
                        onClick={() => setDepositFilter('bersama')}
                        className={`px-3 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                          depositFilter === 'bersama'
                            ? 'bg-white text-[#561B26] shadow-2xs font-semibold'
                            : 'text-[#7D5A61] hover:text-[#561B26]'
                        }`}
                      >
                        Bersama (50:50)
                      </button>
                    </div>

                    {/* Transaction List */}
                    <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                      {filteredDeposits.map((item) => (
                        <div 
                          key={item.id}
                          className="p-3.5 rounded-2xl bg-[#FFFDFD] border border-[#EFE0DB] hover:border-[#D6A7AD] transition-all flex items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-3">
                            <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold ${
                              item.contributor === 'pria'
                                ? 'bg-[#EBF2F6] text-[#3D6980]'
                                : item.contributor === 'wanita'
                                ? 'bg-[#FDF0F2] text-[#A63A4B]'
                                : 'bg-[#FFF6E9] text-[#A6752C]'
                            }`}>
                              {item.contributor === 'pria' ? '♂' : item.contributor === 'wanita' ? '♀' : '🤝'}
                            </span>
                            <div>
                              <div className="text-xs font-bold text-[#3B151C]">
                                {item.title}
                              </div>
                              <div className="text-[11px] text-[#805D65] flex items-center gap-1.5 mt-0.5">
                                <span className="font-medium">{item.contributorName}</span>
                                <span>•</span>
                                <span>{item.date}</span>
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-xs font-bold text-[#2A7545] font-mono tabular-nums">
                              +{formatRupiah(item.amount)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-3 border-t border-[#F2E5E1] text-[11px] text-[#7D5A61] flex items-center justify-between">
                    <span>💡 Tips: Setor tabungan secara berkala di awal tanggal gajian.</span>
                  </div>
                </div>
              </div>

              {/* Simulation Add Modal */}
              {showAddDepositModal && (
                <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-[#EEDBD7] shadow-2xl">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-serif font-bold text-lg text-[#3B151C]">
                        Catat Setoran Baru
                      </h4>
                      <button
                        type="button"
                        onClick={() => setShowAddDepositModal(false)}
                        className="text-[#9A7A81] hover:text-[#3B151C] text-sm p-1 cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>

                    <form onSubmit={handleAddDeposit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#5C222D] mb-1">
                          Keterangan Setoran
                        </label>
                        <input
                          type="text"
                          value={newDepositTitle}
                          onChange={(e) => setNewDepositTitle(e.target.value)}
                          className="w-full px-3.5 py-2 text-xs border border-[#DEC2C6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#873646]"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#5C222D] mb-1">
                          Penyetor
                        </label>
                        <select
                          value={newDepositContributor}
                          onChange={(e) => setNewDepositContributor(e.target.value as any)}
                          className="w-full px-3.5 py-2 text-xs border border-[#DEC2C6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#873646] bg-white"
                        >
                          <option value="pria">amba (Pria)</option>
                          <option value="wanita">ciimut (Wanita)</option>
                          <option value="bersama">Keduanya (Bersama 50:50)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#5C222D] mb-1">
                          Nominal Setoran (Rp)
                        </label>
                        <input
                          type="number"
                          step="500000"
                          value={newDepositAmount}
                          onChange={(e) => setNewDepositAmount(e.target.value)}
                          className="w-full px-3.5 py-2 text-xs border border-[#DEC2C6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#873646]"
                          required
                        />
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setShowAddDepositModal(false)}
                          className="px-4 py-2 text-xs text-[#7D5A61] hover:bg-slate-100 rounded-xl cursor-pointer"
                        >
                          Batal
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 text-xs font-semibold text-white bg-[#6A2330] hover:bg-[#541B26] rounded-xl cursor-pointer"
                        >
                          Simpan & Update Progres
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* VIEW 3: TODO LIST PERSIAPAN */}
          {activeTab === 'todolist' && (
            <div className="mt-6 space-y-6">
              {/* Top Banner Progress */}
              <div className="bg-[#5C222D] text-white p-6 rounded-3xl shadow-sm border border-[#78303C]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-wider text-[#F2CAD2] font-semibold">
                    KESIAPAN CHECKLIST PERNIKAHAN
                  </span>
                  <span className="px-2.5 py-1 text-xs font-bold text-white bg-white/15 rounded-lg">
                    {completionPercentage}% Selesai
                  </span>
                </div>

                <div className="text-2xl sm:text-3xl font-serif font-bold text-white mb-3">
                  {completedCount} dari {tasks.length} Tugas Selesai
                </div>

                <div className="w-full h-2.5 bg-black/25 rounded-full overflow-hidden mb-5">
                  <div 
                    className="h-full bg-[#E8B1BC] rounded-full transition-all duration-300"
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div className="bg-black/20 p-2.5 rounded-xl">
                    <div className="text-[10px] text-[#E8B1BC]">Kategori Aktif</div>
                    <div className="font-bold text-white mt-0.5">9</div>
                  </div>
                  <div className="bg-black/20 p-2.5 rounded-xl">
                    <div className="text-[10px] text-[#E8B1BC]">Berjalan</div>
                    <div className="font-bold text-white mt-0.5">{tasks.length - completedCount}</div>
                  </div>
                  <div className="bg-black/20 p-2.5 rounded-xl">
                    <div className="text-[10px] text-[#E8B1BC]">Selesai</div>
                    <div className="font-bold text-white mt-0.5">{completedCount}</div>
                  </div>
                  <div className="bg-black/20 p-2.5 rounded-xl">
                    <div className="text-[10px] text-[#E8B1BC]">Sisa Tugas</div>
                    <div className="font-bold text-white mt-0.5">{tasks.length - completedCount}</div>
                  </div>
                </div>
              </div>

              {/* Task Cards: Fokus Segera (Prioritas Tinggi) */}
              <div className="bg-white p-6 rounded-3xl border border-[#EEDBD7] shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-[#FFF2F0] text-[#A63A4B] flex items-center justify-center text-xs font-bold">
                      ⚡
                    </span>
                    <div>
                      <h4 className="font-bold text-[#3B151C]">Fokus Segera (Checklist Interaktif)</h4>
                      <p className="text-xs text-[#805D65]">
                        Klik lingkaran untuk menandai tugas telah selesai
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#A63A4B] bg-[#FFF2F4] px-2.5 py-1 rounded-lg">
                    Prioritas Tinggi
                  </span>
                </div>

                <div className="space-y-3">
                  {tasks.map((task) => (
                    <div 
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        task.isCompleted
                          ? 'bg-[#F7F9F6] border-[#D9E6D5] opacity-80'
                          : 'bg-[#FFFDFD] border-[#EFE0DB] hover:border-[#D6A7AD]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                            task.isCompleted
                              ? 'bg-[#4F7A43] text-white'
                              : 'border-2 border-[#C5A3A8] hover:border-[#873646]'
                          }`}
                        >
                          {task.isCompleted && <Check className="w-3 h-3 stroke-[3]" />}
                        </button>
                        <div>
                          <div className={`text-xs sm:text-sm font-semibold transition-all ${
                            task.isCompleted ? 'line-through text-[#8C7A7E]' : 'text-[#3A141A]'
                          }`}>
                            {task.title}
                          </div>
                          <div className="text-[11px] text-[#7D5A61] mt-0.5 flex items-center gap-2">
                            <span>{task.category}</span>
                            <span>•</span>
                            <span>{task.deadline}</span>
                          </div>
                        </div>
                      </div>

                      <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${
                        task.isCompleted
                          ? 'text-[#4F7A43] bg-[#EBF5E9]'
                          : task.priority === 'Tinggi'
                          ? 'text-[#A63A4B] bg-[#FFF0F2]'
                          : 'text-[#8C6B3D] bg-[#FDF6EB]'
                      }`}>
                        {task.isCompleted ? 'Selesai' : task.priority}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Milestone Categories */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded-2xl border border-[#EEDBD7] shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#3B151C]">Venue & Akad</span>
                    <span className="text-xs font-bold text-[#5C222D]">50%</span>
                  </div>
                  <div className="w-full h-2 bg-[#F0E4E1] rounded-full overflow-hidden mb-2">
                    <div className="h-full bg-[#5C222D]" style={{ width: '50%' }}></div>
                  </div>
                  <div className="text-[11px] text-[#7D5A61]">Survey lokasi, booking TMII, perizinan</div>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-[#EEDBD7] shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#3B151C]">Vendor Utama</span>
                    <span className="text-xs font-bold text-[#5C222D]">40%</span>
                  </div>
                  <div className="w-full h-2 bg-[#F0E4E1] rounded-full overflow-hidden mb-2">
                    <div className="h-full bg-[#5C222D]" style={{ width: '40%' }}></div>
                  </div>
                  <div className="text-[11px] text-[#7D5A61]">Foto/video, katering prasmanan, dekorasi</div>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-[#EEDBD7] shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#3B151C]">Busana & Penampilan</span>
                    <span className="text-xs font-bold text-[#5C222D]">25%</span>
                  </div>
                  <div className="w-full h-2 bg-[#F0E4E1] rounded-full overflow-hidden mb-2">
                    <div className="h-full bg-[#5C222D]" style={{ width: '25%' }}></div>
                  </div>
                  <div className="text-[11px] text-[#7D5A61]">Fitting kebaya akad & jas, MUA</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
