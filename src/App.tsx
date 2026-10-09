import React, { useState } from 'react';
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

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInitialTarget, setModalInitialTarget] = useState<number>(120000000);
  const [modalInitialPlan, setModalInitialPlan] = useState<string>('Paket Hari Bahagia');

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleOpenModalWithTarget = (target: number) => {
    setModalInitialTarget(target);
    setIsModalOpen(true);
  };

  const handleSelectPlan = (planName: string) => {
    setModalInitialPlan(planName);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F4] text-[#2C2023] flex flex-col font-sans selection:bg-[#E8C5C8] selection:text-[#4A1D24]">
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

        {/* Why YukPlanner over Spreadsheets & Manual Notes */}
        <ComparisonTable />

        {/* Real Couple Testimonials with Concrete Numbers */}
        <Testimonials />

        {/* Transparent Wedding Pricing Tiers */}
        <Pricing onSelectPlan={handleSelectPlan} />

        {/* Interactive FAQ Accordion */}
        <FaqSection />

        {/* High-Intent Closing CTA */}
        <CtaBanner onOpenModal={handleOpenModal} />
      </main>

      {/* Quiet, Compliant Footer */}
      <Footer />

      {/* Interactive Personalized Onboarding Simulation Modal */}
      <OnboardingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialTarget={modalInitialTarget}
        initialPlan={modalInitialPlan}
      />
    </div>
  );
}
