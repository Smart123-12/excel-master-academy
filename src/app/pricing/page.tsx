'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { pricingPlans } from '@/data';
import { GlassCard, Button } from '@/components/ui';
import { Check, HelpCircle, ChevronDown, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
  {
    question: 'How do the interactive exercises work?',
    answer: 'Each lesson has matching exercises loaded directly in your browser using our built-in spreadsheet simulator. You type actual formulas like SUM, VLOOKUP, or IF and we calculate, parse, and validate your formula syntax and values immediately.',
  },
  {
    question: 'Can I get a refund if I am not satisfied?',
    answer: 'Yes! We offer a full 14-day 100% money-back guarantee. If you are not satisfied with your Pro features, contact our support team and we will issue a full refund immediately.',
  },
  {
    question: 'Are there student or team discounts available?',
    answer: 'Yes, we offer special rates for bulk licensing, universities, and student accounts. Please reach out via our contact page to get a quote tailored to your group size.',
  },
  {
    question: 'Do my certificates expire?',
    answer: 'No. Excel Master Academy certificates are permanent proof of your spreadsheet proficiency. They contain verifiable certificate IDs that you can link to your resume or LinkedIn profile.',
  },
  {
    question: 'What payment methods do you support?',
    answer: 'We accept all major credit cards, debit cards, PayPal, Google Pay, Apple Pay, Stripe, and Razorpay. All transaction details are encrypted and secure.',
  },
];

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-gray-50/50 dark:bg-dark py-24 px-6 pt-28">
        <div className="max-w-7xl mx-auto w-full space-y-20">
          
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-[var(--text-primary)]">
              Simple, Flexible <span className="gradient-text">Pricing</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              Unlock our complete interactive learning system, advanced formula challenges, certificates, and AI features.
            </p>

            {/* Toggle Switch */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <span className={`text-sm ${!isAnnual ? 'text-emerald-600 font-semibold' : 'text-gray-400'}`}>Monthly Billing</span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className="w-12 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 p-1 relative transition-colors duration-200"
              >
                <motion.div
                  className="w-4 h-4 rounded-full bg-emerald-600"
                  animate={{ x: isAnnual ? 24 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </button>
              <span className={`text-sm flex items-center gap-1.5 ${isAnnual ? 'text-emerald-600 font-semibold' : 'text-gray-400'}`}>
                Annually
                <span className="text-xs bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                  Save 20%
                </span>
              </span>
            </div>
          </div>

          {/* Pricing cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
            {pricingPlans.map((plan) => {
              const price = plan.id === 'pro' && isAnnual ? 9 : plan.price;
              const period = plan.id === 'pro' && isAnnual ? 'month, billed annually' : plan.period;

              return (
                <GlassCard 
                  key={plan.id}
                  className={`flex flex-col justify-between relative p-8 ${plan.isPopular ? 'border-2 border-emerald-500 scale-102 shadow-emerald-500/10' : ''}`}
                >
                  {plan.isPopular && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white shadow-md uppercase tracking-wider">
                      Most Popular
                    </span>
                  )}

                  <div>
                    <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-1">{plan.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">{plan.description}</p>
                    
                    {/* Price */}
                    <div className="flex items-baseline gap-1 mb-8">
                      <span className="text-4xl font-extrabold text-[var(--text-primary)] font-mono">${price}</span>
                      <span className="text-sm text-gray-400">/{period}</span>
                    </div>

                    {/* Features */}
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-300">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button 
                    variant={plan.isPopular ? 'primary' : 'outline'}
                    className="w-full justify-center"
                    onClick={() => alert('Secure Checkout: Stripe/Razorpay integrations will process this purchase (UI Mockup only).')}
                  >
                    {plan.ctaText}
                  </Button>
                </GlassCard>
              );
            })}
          </div>

          {/* Money Back Shield Alert Banner */}
          <div className="max-w-3xl mx-auto p-6 bg-emerald-50 dark:bg-emerald-950/20 rounded-3xl border border-emerald-100 dark:border-emerald-900/50 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left select-none">
            <div className="p-3 bg-white dark:bg-dark border border-emerald-100 dark:border-emerald-900/50 rounded-2xl">
              <Award className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h4 className="font-bold text-[var(--text-primary)] text-base">14-Day Money Back Guarantee</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Try out our Pro features completely risk-free. If you are not satisfied, write to us for an instant, no-questions-asked refund.
              </p>
            </div>
          </div>

          {/* FAQS Accordion list */}
          <div className="max-w-3xl mx-auto space-y-6 pt-10">
            <h2 className="text-3xl font-bold text-center text-[var(--text-primary)] mb-8 select-none">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div 
                    key={idx}
                    className="bg-white dark:bg-dark-light border border-[var(--border-color)] rounded-2xl overflow-hidden transition"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full px-6 py-4 flex items-center justify-between gap-4 text-left text-sm font-bold text-[var(--text-primary)] hover:text-emerald-500 transition"
                    >
                      <span className="flex items-center gap-2.5">
                        <HelpCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                        {faq.question}
                      </span>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-6 pb-5 pt-1 text-xs text-gray-500 dark:text-gray-400 leading-relaxed border-t border-[var(--border-color)] bg-gray-50/50 dark:bg-dark/20"
                        >
                          {faq.answer}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
