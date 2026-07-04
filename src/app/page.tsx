import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  HeroSection,
  StatsSection,
  FeaturesSection,
  HowItWorksSection,
  TestimonialsSection,
  PricingPreview,
  CTASection,
} from '@/components/landing';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 overflow-x-hidden pt-16">
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <PricingPreview />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
