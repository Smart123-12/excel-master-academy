'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { GlassCard, Button } from '@/components/ui';
import { Mail, MapPin, Clock, MessageSquare, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Support');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'success' | 'error' | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setStatus('error');
      return;
    }
    setStatus('success');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-gray-50/50 dark:bg-dark py-24 px-6 pt-28">
        <div className="max-w-7xl mx-auto w-full space-y-12">
          
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-[var(--text-primary)]">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              Have questions about billing, enterprise options, group licensing, or curriculum support? Send us a message!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start max-w-5xl mx-auto">
            {/* Left Column: Cards */}
            <div className="space-y-6">
              <GlassCard className="p-6 flex items-start gap-4">
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 rounded-2xl shrink-0">
                  <Mail className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <h4 className="font-bold text-[var(--text-primary)] text-sm">Email Support</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">support@excelmasteracademy.com</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Average response time: &lt; 24 hours</p>
                </div>
              </GlassCard>

              <GlassCard className="p-6 flex items-start gap-4">
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 rounded-2xl shrink-0">
                  <MapPin className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <h4 className="font-bold text-[var(--text-primary)] text-sm">Academy Office</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">100 Pine Street, Suite 1250</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">San Francisco, CA 94111</p>
                </div>
              </GlassCard>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-2">
              <GlassCard className="p-8 shadow-sm">
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6 select-none flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-emerald-500" />
                  Send Message
                </h3>

                {status === 'success' && (
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-150 text-emerald-700 dark:text-emerald-450 rounded-2xl flex items-center gap-2.5 text-xs font-semibold mb-6">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Your message has been sent successfully! Our support team will get back to you shortly.</span>
                  </div>
                )}

                {status === 'error' && (
                  <div className="p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-150 text-rose-700 dark:text-rose-455 rounded-2xl flex items-center gap-2.5 text-xs font-semibold mb-6">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Please fill in all required form fields before submitting.</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-400 font-bold uppercase block mb-1.5">Your Name</label>
                      <input
                        type="text"
                        placeholder="Alex Johnson"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 text-sm bg-gray-50 dark:bg-dark border border-[var(--border-color)] rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-[var(--text-primary)] transition"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 font-bold uppercase block mb-1.5">Email Address</label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 text-sm bg-gray-50 dark:bg-dark border border-[var(--border-color)] rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-[var(--text-primary)] transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-gray-400 font-bold uppercase block mb-1.5">Topic Subject</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-2 text-sm bg-gray-50 dark:bg-dark border border-[var(--border-color)] rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-500 font-semibold cursor-pointer transition"
                    >
                      <option value="Support">Curriculum / Exercises Help</option>
                      <option value="Billing">Billing & Subscription Support</option>
                      <option value="Enterprise">Enterprise / Group Discount Sales</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-gray-400 font-bold uppercase block mb-1.5">Message Content</label>
                    <textarea
                      placeholder="Write details of your questions or issue..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-3 text-sm bg-gray-50 dark:bg-dark border border-[var(--border-color)] rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-[var(--text-primary)] h-32 resize-none shadow-inner transition"
                    />
                  </div>

                  <Button variant="primary" type="submit" className="w-full justify-center py-2.5 font-bold mt-2">
                    Submit Message
                  </Button>
                </form>
              </GlassCard>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
