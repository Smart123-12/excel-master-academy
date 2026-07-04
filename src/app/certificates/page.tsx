'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { certificates } from '@/data';
import { GlassCard, Button, Badge } from '@/components/ui';
import { Award, CheckCircle, ShieldAlert, Sparkles, ExternalLink, Calendar, Search } from 'lucide-react';
import jsPDF from 'jspdf';

export default function CertificatesPage() {
  const [verifyId, setVerifyId] = useState('');
  const [verificationResult, setVerificationResult] = useState<typeof certificates[0] | null>(null);
  const [verifying, setVerifying] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyId.trim()) return;

    setVerifying(true);
    setTimeout(() => {
      const match = certificates.find((c) => c.certificateNumber.toLowerCase() === verifyId.toLowerCase().trim());
      setVerificationResult(match || null);
      setVerifying(false);
    }, 1000);
  };

  // PDF certificate download generator
  const handleDownloadPDF = (cert: typeof certificates[0]) => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'in',
      format: 'letter'
    });

    doc.setDrawColor(16, 185, 129); // Emerald
    doc.setLineWidth(0.15);
    doc.rect(0.5, 0.5, 10, 7.5);

    doc.setDrawColor(245, 158, 11); // Gold/Amber
    doc.setLineWidth(0.04);
    doc.rect(0.6, 0.6, 9.8, 7.3);

    doc.setTextColor(17, 24, 39);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(36);
    doc.text('EXCEL MASTER ACADEMY', 5.5, 1.8, { align: 'center' });

    doc.setTextColor(107, 114, 128);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.text('CERTIFICATE OF COMPLETION', 5.5, 2.3, { align: 'center' });

    doc.setFontSize(12);
    doc.text('This is proudly awarded to', 5.5, 3.1, { align: 'center' });

    doc.setTextColor(16, 185, 129);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(28);
    doc.text(cert.userName, 5.5, 3.8, { align: 'center' });

    doc.setTextColor(17, 24, 39);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text('for successfully completing the coursework and assessments for', 5.5, 4.4, { align: 'center' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text(cert.courseName, 5.5, 4.9, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text(`with a passing grade score of ${cert.score}%`, 5.5, 5.4, { align: 'center' });

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

    doc.setFontSize(8);
    doc.setTextColor(156, 163, 175);
    doc.text(`Certificate Verification ID: ${cert.certificateNumber}`, 5.5, 7.3, { align: 'center' });

    doc.save(`Certificate-${cert.courseName.replace(/\s+/g, '-')}.pdf`);
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-gray-50/50 dark:bg-dark py-24 px-6 pt-28">
        <div className="max-w-7xl mx-auto w-full space-y-12">
          
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-[var(--text-primary)]">
              Verifiable <span className="gradient-text">Certificates</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              Check credibility status, download credentials in high-res PDF format, or authenticate a certificate using verification numbers.
            </p>
          </div>

          {/* Grid Split: Verification checker vs Gallery list */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Left Column: Verification form checker panel */}
            <div className="space-y-6">
              <GlassCard className="p-6">
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3 select-none flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  Authenticate Credential
                </h3>
                <p className="text-xs text-gray-450 dark:text-gray-400 leading-relaxed mb-6">
                  Verify credential existence and verification integrity here using standard cert numbers.
                </p>

                <form onSubmit={handleVerify} className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="e.g. EMA-2024-00142"
                      value={verifyId}
                      onChange={(e) => setVerifyId(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 dark:bg-dark border border-[var(--border-color)] rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-[var(--text-primary)] shadow-inner"
                    />
                  </div>

                  <Button variant="primary" type="submit" className="w-full justify-center font-bold" loading={verifying}>
                    Verify Certificate
                  </Button>
                </form>
              </GlassCard>

              {/* Verification Results display feedback */}
              {verificationResult !== null && (
                <div className="p-6 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-150 rounded-3xl space-y-4">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                    <CheckCircle className="w-5 h-5" />
                    <span>Credential Verified</span>
                  </div>

                  <div className="space-y-2.5 text-xs text-[var(--text-primary)]">
                    <p><span className="text-gray-400 font-semibold uppercase">Recipient:</span> {verificationResult.userName}</p>
                    <p><span className="text-gray-400 font-semibold uppercase">Course:</span> {verificationResult.courseName}</p>
                    <p><span className="text-gray-400 font-semibold uppercase">Issue Date:</span> {verificationResult.issueDate}</p>
                    <p><span className="text-gray-400 font-semibold uppercase">Verification ID:</span> {verificationResult.certificateNumber}</p>
                  </div>
                  
                  <Button variant="outline" className="w-full justify-center text-xs font-semibold" onClick={() => handleDownloadPDF(verificationResult)}>
                    Download verified copy
                  </Button>
                </div>
              )}

              {verificationResult === null && verifyId && !verifying && (
                <div className="p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-150 rounded-2xl flex items-start gap-2.5 text-xs text-rose-700 dark:text-rose-450 font-semibold">
                  <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>No verified certificate found matching this verification number. Make sure the ID is correct.</span>
                </div>
              )}
            </div>

            {/* Right Column: List of earned certificate cards */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2 select-none">
                <Award className="w-6 h-6 text-emerald-500" />
                Earned Credentials ({certificates.length})
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certificates.map((cert) => (
                  <GlassCard key={cert.id} className="p-6 flex flex-col justify-between border border-emerald-500/10 h-64">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <Award className="w-8 h-8 text-emerald-500" />
                        <Badge text="VERIFIED" variant="success" size="sm" />
                      </div>
                      <h4 className="text-lg font-bold text-[var(--text-primary)] mb-1 leading-snug">{cert.courseName}</h4>
                      <p className="text-[10px] text-gray-400 font-mono mt-0.5">Credential: {cert.certificateNumber}</p>
                      
                      <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-4 select-none">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Issued on {cert.issueDate}</span>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <Button variant="primary" className="flex-1 justify-center text-xs font-semibold" onClick={() => handleDownloadPDF(cert)}>
                        Download Certificate
                      </Button>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
