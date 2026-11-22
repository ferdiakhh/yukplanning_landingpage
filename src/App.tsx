import React, { useCallback, useEffect, useState } from 'react';
import { Wrench } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BentoFeatures } from './components/BentoFeatures';
import { BudgetCalculator } from './components/BudgetCalculator';
import { ComparisonTable } from './components/ComparisonTable';
import { Testimonials } from './components/Testimonials';
import { Pricing } from './components/Pricing';
import { FaqSection } from './components/FaqSection';
import { CtaBanner } from './components/CtaBanner';
import { Footer } from './components/Footer';
import { OnboardingModal } from './components/OnboardingModal';
import { StickyBottomCta } from './components/StickyBottomCta';
import { MaintenanceExperience } from './components/MaintenanceExperience';
import { API_BASE_URL } from './config/env';

interface PublicSystemStatus {
  maintenance_mode: boolean;
  maintenance_message: string;
  support_whatsapp: string;
}

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInitialTarget, setModalInitialTarget] = useState<number>(120000000);
  const [modalInitialPlan, setModalInitialPlan] = useState<string>('Paket Hari Bahagia');

  const [systemStatus, setSystemStatus] = useState<PublicSystemStatus>({
    maintenance_mode: false,
    maintenance_message: '',
    support_whatsapp: '',
  });
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [maintenanceMinimized, setMaintenanceMinimized] = useState(false);

  const checkSystemStatus = useCallback(async () => {
    setIsCheckingStatus(true);
    try {
      const res = await fetch(`${API_BASE_URL}/public/app-config`);
      if (!res.ok) return;
      const json = await res.json();
      if (json?.data) {
        const isMaint = Boolean(json.data.maintenance_mode);
        setSystemStatus({
          maintenance_mode: isMaint,
          maintenance_message: String(json.data.maintenance_message || ''),
          support_whatsapp: String(json.data.support_whatsapp || ''),
        });
        if (!isMaint) {
          setMaintenanceMinimized(false);
        }
      }
    } catch {
      // Abaikan gangguan jaringan sementara agar landing page tetap tampil
    } finally {
      setIsCheckingStatus(false);
    }
  }, []);

  useEffect(() => {
    void checkSystemStatus();
  }, [checkSystemStatus]);

  const handleOpenModal = () => {
    if (systemStatus.maintenance_mode) {
      setMaintenanceMinimized(false);
      return;
    }
    setIsModalOpen(true);
  };

  const handleOpenModalWithTarget = (target: number) => {
    if (systemStatus.maintenance_mode) {
      setMaintenanceMinimized(false);
      return;
    }
    setModalInitialTarget(target);
    setIsModalOpen(true);
  };

  const handleSelectPlan = (planName: string) => {
    if (systemStatus.maintenance_mode) {
      setMaintenanceMinimized(false);
      return;
    }
    setModalInitialPlan(planName);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F4] text-[#2C2023] flex flex-col font-sans selection:bg-[#E8C5C8] selection:text-[#4A1D24]">
      {/* Full-Screen Creative Interactive Maintenance Overlay */}
      {systemStatus.maintenance_mode && !maintenanceMinimized && (
        <MaintenanceExperience
          message={systemStatus.maintenance_message}
          supportWhatsapp={systemStatus.support_whatsapp}
          isChecking={isCheckingStatus}
          onRecheck={checkSystemStatus}
          onMinimize={() => setMaintenanceMinimized(true)}
        />
      )}

      {/* Compact Sticky Banner when user chooses to browse features during maintenance */}
      {systemStatus.maintenance_mode && maintenanceMinimized && (
        <div className="sticky top-0 z-[60] bg-gradient-to-r from-[#5C222D] via-[#7A2B3A] to-[#5C222D] text-white px-4 py-2.5 text-xs flex flex-wrap items-center justify-center gap-3 shadow-md">
          <span className="inline-flex items-center gap-1.5 font-semibold">
            <Wrench className="w-3.5 h-3.5 text-[#F8DFB4]" />
            <span>
              Sistem sedang dalam pemeliharaan terjadwal — pembelian akun ditutup sementara.
            </span>
          </span>
          <button
            type="button"
            onClick={() => setMaintenanceMinimized(false)}
            className="px-3 py-1 rounded-full bg-white/15 hover:bg-white/25 font-bold text-[#F8DFB4] transition-colors cursor-pointer"
          >
            Lihat Status Pemeliharaan
          </button>
        </div>
      )}

      {/* Top Bar Navigation conforming to the 3-Zone Contract */}
      <Navbar onOpenModal={handleOpenModal} />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* Hero Section with Live Interactive App Frame */}
        <Hero onOpenModal={handleOpenModal} />

        {/* 5 Core Feature Pillars (Bento Grid) */}
        <BentoFeatures />

        {/* Interactive Wedding Savings & Budget Allocation Calculator */}
        <BudgetCalculator onOpenModalWithTarget={handleOpenModalWithTarget} />

        {/* Why YukPlanning over Spreadsheets & Manual Notes */}
        <ComparisonTable />

        {/* Real Couple Testimonials with Concrete Numbers */}
        <Testimonials />

        {/* Transparent Wedding Pricing Tiers */}
        <Pricing
          onSelectPlan={handleSelectPlan}
          maintenanceMode={systemStatus.maintenance_mode}
        />

        {/* Interactive FAQ Accordion */}
        <FaqSection />

        {/* High-Intent Closing CTA */}
        <CtaBanner onOpenModal={handleOpenModal} />
      </main>

      {/* Quiet, Compliant Footer */}
      <Footer />

      {/* Persistent Floating Quick Conversion Bar */}
      <StickyBottomCta onOpenModal={handleOpenModal} />

      {/* Interactive Personalized Onboarding Simulation Modal */}
      <OnboardingModal
        isOpen={isModalOpen && !systemStatus.maintenance_mode}
        onClose={() => setIsModalOpen(false)}
        initialTarget={modalInitialTarget}
        initialPlan={modalInitialPlan}
      />
    </div>
  );
}
