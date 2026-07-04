'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard, Button } from '@/components/ui';
import { Check } from 'lucide-react';
import { pricingPlans } from '@/data';

export default function PricingPreview() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section className="py-24 bg-gray-50/50 dark:bg-dark/40 border-y border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-[var(--text-primary)]">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Choose the plan that fits your career goals. Cancel or upgrade at any time.
          </p>
          
          {/* Toggle Switch */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <span className={`text-sm ${!isAnnual ? 'text-emerald-600 font-semibold' : 'text-gray-400'}`}>Monthly</span>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
          {pricingPlans.map((plan) => {
            const price = plan.id === 'pro' && isAnnual ? 9 : plan.price;
            const period = plan.id === 'pro' && isAnnual ? 'month, billed annually' : plan.period;

            return (
              <GlassCard 
                key={plan.id}
                className={`flex flex-col justify-between relative ${plan.isPopular ? 'border-2 border-emerald-500 scale-102 shadow-emerald-500/10' : ''}`}
              >
                {plan.isPopular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white shadow-md uppercase tracking-wider">
                    Most Popular
                  </span>
                )}

                <div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1">{plan.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">{plan.description}</p>
                  
                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-4xl font-extrabold text-[var(--text-primary)] font-mono">${price}</span>
                    <span className="text-sm text-gray-400">/{period}</span>
                  </div>

                  {/* Feature list */}
                  <ul className="space-y-3.5 mb-8">
                    {plan.features.slice(0, 6).map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-300">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  variant={plan.isPopular ? 'primary' : 'outline'}
                  className="w-full"
                  href="/pricing"
                >
                  {plan.ctaText}
                </Button>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
