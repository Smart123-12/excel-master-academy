'use client';

import React, { useState, useMemo } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { mockUser, badges, achievements, certificates } from '@/data';
import { GlassCard, Button, Badge, ProgressBar, Avatar, Tabs } from '@/components/ui';
import { Award, ShieldAlert, Sparkles, BookOpen, Flame, Zap, Settings, HelpCircle, AlertCircle, Copy, Check } from 'lucide-react';
import jsPDF from 'jspdf';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'badges' | 'achievements' | 'certificates' | 'ai'>('profile');

  // AI tools state
  const [aiPrompt, setAiPrompt] = useState('');
  const [generatedFormula, setGeneratedFormula] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  // Tab selections
  const tabList = [
    { id: 'profile', label: 'Overview' },
    { id: 'badges', label: 'Badges' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'ai', label: 'AI Formula Generator' },
  ];

  // XP progress
  const xpPercent = Math.min((mockUser.xp / mockUser.xpToNextLevel) * 100, 100);

  // AI Formula Generator trigger
  const handleGenerateFormula = () => {
    if (!aiPrompt.trim()) return;
    
    const p = aiPrompt.toLowerCase();
    let formula = '=SUM(A1:A10)';
    
    if (p.includes('average') || p.includes('mean')) {
      formula = '=AVERAGE(B2:B20)';
    } else if (p.includes('vlookup') || p.includes('lookup')) {
      formula = '=VLOOKUP("E001", A2:C10, 3, FALSE)';
    } else if (p.includes('if')) {
      formula = '=IF(C2>=70, "Pass", "Fail")';
    } else if (p.includes('count')) {
      formula = '=COUNTIF(B2:B15, "Electronics")';
    } else if (p.includes('filter')) {
      formula = '=FILTER(A2:C10, C2:C10>500)';
    }

    setGeneratedFormula(formula);
    setIsCopied(false);
  };

  const handleCopyFormula = () => {
    navigator.clipboard.writeText(generatedFormula);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Generate certificate PDF download
  const handleDownloadPDF = (cert: typeof certificates[0]) => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'in',
      format: 'letter'
    });

    // Outer border
    doc.setDrawColor(16, 185, 129); // Emerald color
    doc.setLineWidth(0.15);
    doc.rect(0.5, 0.5, 10, 7.5);

    // Inner gold border
    doc.setDrawColor(245, 158, 11); // Amber color
    doc.setLineWidth(0.04);
    doc.rect(0.6, 0.6, 9.8, 7.3);

    // Title
    doc.setTextColor(17, 24, 39); // Gray 900
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(36);
    doc.text('EXCEL MASTER ACADEMY', 5.5, 1.8, { align: 'center' });

    // Subtitle
    doc.setTextColor(107, 114, 128); // Gray 500
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.text('CERTIFICATE OF COMPLETION', 5.5, 2.3, { align: 'center' });

    // Recipient text
    doc.setFontSize(12);
    doc.text('This is proudly awarded to', 5.5, 3.1, { align: 'center' });

    // Name
    doc.setTextColor(16, 185, 129); // Emerald 500
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(28);
    doc.text(cert.userName, 5.5, 3.8, { align: 'center' });

    // Course
    doc.setTextColor(17, 24, 39); // Gray 900
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text('for successfully completing the coursework and assessments for', 5.5, 4.4, { align: 'center' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text(cert.courseName, 5.5, 4.9, { align: 'center' });

    // Assessment Score
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text(`with a passing grade score of ${cert.score}%`, 5.5, 5.4, { align: 'center' });

    // Signatures / Dates
    doc.setDrawColor(229, 231, 235);
    doc.setLineWidth(0.01);
    doc.line(2, 6.5, 4.5, 6.5);
    doc.line(6.5, 6.5, 9, 6.5);

    doc.setFontSize(10);
    doc.setTextColor(156, 163, 175);
    doc.text('Date of Issue', 3.25, 6.75, { align: 'center' });
    doc.text('Academy Director Signature', 7.75, 6.75, { align: 'center' });

    doc.setTextColor(17, 24, 39);
    doc.setFont('helvetica', 'bold');
    doc.text(cert.issueDate, 3.25, 6.4, { align: 'center' });
    doc.text('Excel Master Team', 7.75, 6.4, { align: 'center' });

    // Certificate ID
    doc.setFontSize(8);
    doc.setTextColor(156, 163, 175);
    doc.text(`Certificate Verification ID: ${cert.certificateNumber}`, 5.5, 7.3, { align: 'center' });

    // Save
    doc.save(`Certificate-${cert.courseName.replace(/\s+/g, '-')}.pdf`);
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-gray-50/50 dark:bg-dark py-24 px-6 pt-28">
        <div className="max-w-7xl mx-auto w-full space-y-10">
          
          {/* Header Profile card */}
          <div className="bg-white dark:bg-dark-light p-8 rounded-3xl border border-[var(--border-color)] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
              <Avatar src={mockUser.avatar} name={mockUser.name} size="lg" level={mockUser.level} showLevel />
              <div>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--text-primary)]">
                    {mockUser.name}
                  </h1>
                  {mockUser.isPro && <Badge text="PRO" variant="pro" />}
                </div>
                <p className="text-gray-400 text-sm mt-1">{mockUser.email}</p>
                <p className="text-xs text-gray-500 mt-0.5">Joined Excel Master Academy in September 2024</p>
              </div>
            </div>

            {/* Level and XP progress */}
            <div className="w-full md:w-80 shrink-0 space-y-2">
              <div className="flex justify-between text-xs font-bold text-gray-400">
                <span>XP Progress</span>
                <span>{mockUser.xp} / {mockUser.xpToNextLevel} XP</span>
              </div>
              <ProgressBar value={xpPercent} />
              <p className="text-[10px] text-gray-400 font-semibold">{mockUser.xpToNextLevel - mockUser.xp} XP points to Level {mockUser.level + 1}</p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-white dark:bg-dark-light border border-[var(--border-color)] p-6 rounded-3xl">
            <div className="flex items-center gap-4 px-4 py-2 justify-center sm:justify-start border-r border-[var(--border-color)] last:border-0">
              <BookOpen className="w-6 h-6 text-emerald-500" />
              <div>
                <span className="text-xs text-gray-400 font-bold uppercase">Lessons Complete</span>
                <p className="text-lg font-extrabold text-[var(--text-primary)] font-mono">{mockUser.completedLessons.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 px-4 py-2 justify-center sm:justify-start border-r border-[var(--border-color)] last:border-0">
              <Flame className="w-6 h-6 text-amber-500 fill-amber-500" />
              <div>
                <span className="text-xs text-gray-400 font-bold uppercase">Learning Streak</span>
                <p className="text-lg font-extrabold text-[var(--text-primary)] font-mono">{mockUser.streak} Days</p>
              </div>
            </div>
            <div className="flex items-center gap-4 px-4 py-2 justify-center sm:justify-start last:border-0">
              <Zap className="w-6 h-6 text-emerald-500 fill-emerald-500" />
              <div>
                <span className="text-xs text-gray-400 font-bold uppercase">XP Balance</span>
                <p className="text-lg font-extrabold text-[var(--text-primary)] font-mono">{mockUser.xp} XP</p>
              </div>
            </div>
          </div>

          {/* Tabs bar switcher */}
          <div className="flex justify-center border-b border-[var(--border-color)] pb-1.5">
            <Tabs 
              tabs={tabList} 
              activeTab={activeTab} 
              onTabChange={(id) => setActiveTab(id as any)} 
            />
          </div>

          {/* Tab views panel display */}
          <div className="min-h-[20rem]">
            {activeTab === 'profile' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Personal Information */}
                <GlassCard className="p-6">
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-6 select-none flex items-center gap-2">
                    <Settings className="w-5 h-5 text-emerald-500" />
                    Account Settings
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-gray-400 font-bold uppercase block mb-1.5">Full Name</label>
                      <input 
                        type="text" 
                        defaultValue={mockUser.name}
                        className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-dark border border-[var(--border-color)] rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-[var(--text-primary)]"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 font-bold uppercase block mb-1.5">Email Address</label>
                      <input 
                        type="email" 
                        defaultValue={mockUser.email}
                        className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-dark border border-[var(--border-color)] rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-[var(--text-primary)]"
                      />
                    </div>
                    <Button variant="primary" className="w-full justify-center">Save Settings</Button>
                  </div>
                </GlassCard>

                {/* Subscriptions */}
                <GlassCard className="p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4 select-none">Membership Details</h3>
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 rounded-2xl flex items-center justify-between mb-6">
                      <div>
                        <span className="text-xs text-emerald-700 dark:text-emerald-300 font-bold uppercase">Current Plan</span>
                        <h4 className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">EMA Pro Membership</h4>
                      </div>
                      <Badge text="ACTIVE" variant="success" />
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Your Pro account has access to advanced lessons (VLOOKUP, Pivot Tables, LET/LAMBDA), custom PDF certificates, and AI tools. Billed at $9/month.
                    </p>
                  </div>
                  <Button variant="outline" className="w-full justify-center mt-6">Cancel Subscription</Button>
                </GlassCard>
              </div>
            )}

            {activeTab === 'badges' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-6">
                {badges.map((b) => (
                  <GlassCard 
                    key={b.id} 
                    className={`p-6 flex flex-col items-center text-center justify-between transition hover:scale-103
                      ${b.isEarned ? 'opacity-100' : 'opacity-40 grayscale'}
                    `}
                  >
                    <div className="text-4xl mb-3">{b.icon}</div>
                    <h4 className="text-sm font-bold text-[var(--text-primary)] mb-1 leading-snug">{b.name}</h4>
                    <p className="text-[10px] text-gray-400 leading-tight mb-3">{b.description}</p>
                    <Badge 
                      text={b.isEarned ? 'EARNED' : 'LOCKED'} 
                      variant={b.isEarned ? 'success' : 'default'} 
                      size="sm" 
                    />
                  </GlassCard>
                ))}
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="space-y-4">
                {achievements.map((ach) => {
                  const percent = Math.min((ach.progress / ach.target) * 100, 100);
                  return (
                    <GlassCard key={ach.id} className="p-6 flex items-center justify-between gap-6 flex-col sm:flex-row">
                      <div className="flex items-center gap-4 flex-col sm:flex-row text-center sm:text-left w-full sm:w-auto">
                        <div className="text-3xl p-2 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 rounded-xl">{ach.icon}</div>
                        <div>
                          <h4 className="font-bold text-[var(--text-primary)] text-sm">{ach.name}</h4>
                          <p className="text-xs text-gray-400 mt-0.5">{ach.description}</p>
                        </div>
                      </div>
                      
                      <div className="w-full sm:w-60 space-y-1.5 shrink-0">
                        <div className="flex justify-between text-[10px] font-bold text-gray-400 font-mono">
                          <span>{ach.progress} / {ach.target}</span>
                          <span>{Math.round(percent)}%</span>
                        </div>
                        <ProgressBar value={percent} />
                      </div>
                    </GlassCard>
                  );
                })}
              </div>
            )}

            {activeTab === 'certificates' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {certificates.map((cert) => (
                  <GlassCard key={cert.id} className="p-6 flex flex-col justify-between border-2 border-dashed border-emerald-500/20">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <Award className="w-8 h-8 text-emerald-500" />
                        <span className="text-xs text-gray-400 font-mono">{cert.issueDate}</span>
                      </div>
                      <h4 className="text-xl font-bold text-[var(--text-primary)] mb-1">{cert.courseName}</h4>
                      <p className="text-xs text-gray-400 mb-6">Credential ID: {cert.certificateNumber}</p>
                    </div>

                    <div className="flex gap-4">
                      <Button variant="primary" className="flex-1 justify-center" onClick={() => handleDownloadPDF(cert)}>
                        Download PDF Certificate
                      </Button>
                    </div>
                  </GlassCard>
                ))}
              </div>
            )}

            {activeTab === 'ai' && (
              <div className="max-w-2xl mx-auto space-y-6">
                <GlassCard className="p-6">
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2 select-none">
                    <Sparkles className="w-5 h-5 text-emerald-500" />
                    AI Excel Formula Generator
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-6">
                    Describe the calculation you want to make in plain English, and our AI assistant will draft the precise Excel formula you need.
                  </p>

                  <div className="space-y-4">
                    <textarea
                      placeholder="e.g. Find the average of column B for rows 2 to 20, or Sum cells A1 to A10"
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      className="w-full px-4 py-3 text-sm bg-gray-50 dark:bg-dark border border-[var(--border-color)] rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-[var(--text-primary)] h-28 resize-none shadow-inner"
                    />

                    <Button variant="primary" className="w-full justify-center font-bold" onClick={handleGenerateFormula}>
                      Draft Excel Formula
                    </Button>
                  </div>
                </GlassCard>

                {generatedFormula && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-150 rounded-2xl flex items-center justify-between gap-4"
                  >
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-1">Generated Formula</span>
                      <p className="text-base font-mono font-bold text-emerald-700 dark:text-emerald-300 truncate">
                        {generatedFormula}
                      </p>
                    </div>

                    <button
                      onClick={handleCopyFormula}
                      className="p-2.5 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 rounded-xl text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900 transition-colors shrink-0"
                    >
                      {isCopied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </motion.div>
                )}
              </div>
            )}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
