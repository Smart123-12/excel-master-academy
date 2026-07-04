'use client';

import React, { useState } from 'react';
import { GlassCard, Avatar, Badge, Button } from '@/components/ui';
import { Users, BarChart3, Settings, Award, DollarSign, ArrowUpRight, Search, Activity, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'analytics'>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const mockUsersList = [
    { name: 'Sarah Chen', email: 'sarah@example.com', plan: 'Pro Monthly', joined: '2024-10-01', status: 'Active' },
    { name: 'Marcus Williams', email: 'marcus@example.com', plan: 'Lifetime', joined: '2024-09-28', status: 'Active' },
    { name: 'Priya Patel', email: 'priya@example.com', plan: 'Free', joined: '2024-09-25', status: 'Inactive' },
    { name: 'James O\'Brien', email: 'james@example.com', plan: 'Pro Monthly', joined: '2024-09-22', status: 'Active' },
    { name: 'Yuki Tanaka', email: 'yuki@example.com', plan: 'Lifetime', joined: '2024-09-20', status: 'Active' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark flex font-sans">
      
      {/* Admin Panel Sidebar */}
      <aside className="w-64 bg-white dark:bg-dark-light border-r border-[var(--border-color)] p-6 flex flex-col justify-between shrink-0 hidden md:flex select-none z-30 shadow-sm">
        <div className="space-y-8">
          {/* Logo */}
          <Link href="/" className="text-xl font-black tracking-tight text-[var(--text-primary)] block">
            📊 Excel <span className="gradient-text">Master</span>
            <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold px-2 py-0.5 rounded-full ml-1.5 align-middle">
              ADMIN
            </span>
          </Link>

          {/* Nav links */}
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-3 transition
                ${activeTab === 'overview' 
                  ? 'bg-emerald-500 text-white shadow-md' 
                  : 'text-gray-550 hover:text-emerald-500 dark:text-gray-400'}`}
            >
              <Activity size={18} />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`w-full px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-3 transition
                ${activeTab === 'users' 
                  ? 'bg-emerald-500 text-white shadow-md' 
                  : 'text-gray-550 hover:text-emerald-500 dark:text-gray-400'}`}
            >
              <Users size={18} />
              Manage Users
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`w-full px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-3 transition
                ${activeTab === 'analytics' 
                  ? 'bg-emerald-500 text-white shadow-md' 
                  : 'text-gray-550 hover:text-emerald-500 dark:text-gray-400'}`}
            >
              <BarChart3 size={18} />
              Analytics
            </button>
          </nav>
        </div>

        {/* Bottom Exit */}
        <Button variant="outline" className="w-full justify-center text-xs font-semibold" href="/dashboard">
          Back to Student Panel
        </Button>
      </aside>

      {/* Main Admin Workspace Panel */}
      <main className="flex-1 overflow-y-auto p-8 pt-10">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Header Row */}
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4 select-none">
            <div>
              <h1 className="text-2xl font-extrabold text-[var(--text-primary)]">Admin Dashboard</h1>
              <p className="text-xs text-gray-400 mt-1">Academy configurations and statistics overview console</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Avatar src="" name="System Admin" size="sm" />
            </div>
          </div>

          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Widgets Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <GlassCard className="p-6 flex items-center gap-4">
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 rounded-2xl">
                    <Users className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-450 dark:text-gray-400 uppercase font-bold">Total Enrolls</span>
                    <h3 className="text-2xl font-bold font-mono text-[var(--text-primary)] mt-0.5">12,450</h3>
                  </div>
                </GlassCard>

                <GlassCard className="p-6 flex items-center gap-4">
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 rounded-2xl">
                    <DollarSign className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-450 dark:text-gray-400 uppercase font-bold">Revenue</span>
                    <h3 className="text-2xl font-bold font-mono text-[var(--text-primary)] mt-0.5">$45,670</h3>
                  </div>
                </GlassCard>

                <GlassCard className="p-6 flex items-center gap-4">
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 rounded-2xl">
                    <BookOpen className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-450 dark:text-gray-400 uppercase font-bold">Active Today</span>
                    <h3 className="text-2xl font-bold font-mono text-[var(--text-primary)] mt-0.5">892</h3>
                  </div>
                </GlassCard>

                <GlassCard className="p-6 flex items-center gap-4">
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 rounded-2xl">
                    <Award className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-450 dark:text-gray-400 uppercase font-bold">Passing Rate</span>
                    <h3 className="text-2xl font-bold font-mono text-[var(--text-primary)] mt-0.5">73%</h3>
                  </div>
                </GlassCard>
              </div>

              {/* Grid: Charts + Recent table logs */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent users table */}
                <div className="lg:col-span-2 bg-white dark:bg-dark-light border border-[var(--border-color)] rounded-3xl p-6 shadow-sm">
                  <h3 className="text-base font-bold text-[var(--text-primary)] mb-6 select-none flex items-center justify-between">
                    <span>Recent Student Signups</span>
                    <Link href="#" onClick={() => setActiveTab('users')} className="text-xs text-emerald-500 hover:underline flex items-center gap-1">
                      See all <ArrowUpRight size={14} />
                    </Link>
                  </h3>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left text-xs">
                      <thead>
                        <tr className="border-b border-[var(--border-color)] bg-gray-50 dark:bg-dark text-gray-400 font-bold select-none">
                          <th className="px-4 py-3">Name</th>
                          <th className="px-4 py-3">Plan</th>
                          <th className="px-4 py-3">Joined</th>
                          <th className="px-4 py-3 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[var(--border-color)] text-[var(--text-primary)]">
                        {mockUsersList.map((usr, i) => (
                          <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-dark/20 transition">
                            <td className="px-4 py-3.5 font-semibold">{usr.name}</td>
                            <td className="px-4 py-3.5 text-gray-400 font-semibold">{usr.plan}</td>
                            <td className="px-4 py-3.5 font-mono text-gray-500">{usr.joined}</td>
                            <td className="px-4 py-3.5 text-center">
                              <Badge text={usr.status} variant={usr.status === 'Active' ? 'success' : 'default'} size="sm" />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Quick operations */}
                <GlassCard className="p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-[var(--text-primary)] mb-4 select-none">Admin Operations</h3>
                    <p className="text-xs text-gray-400 leading-relaxed mb-6">
                      Perform administrative actions such as resetting catalog items, modifying lessons data parameters, or managing payments indexes.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-center text-xs font-semibold" onClick={() => alert('Feature disabled on visual mockup mode.')}>
                      Manage Subscriptions Index
                    </Button>
                    <Button variant="outline" className="w-full justify-center text-xs font-semibold" onClick={() => alert('Feature disabled on visual mockup mode.')}>
                      Upload Custom Dataset
                    </Button>
                  </div>
                </GlassCard>
              </div>
            </div>
          )}

          {/* USERS TAB */}
          {activeTab === 'users' && (
            <div className="bg-white dark:bg-dark-light border border-[var(--border-color)] rounded-3xl p-6 shadow-sm">
              <div className="flex items-center justify-between gap-6 mb-6 select-none flex-col sm:flex-row">
                <h3 className="text-base font-bold text-[var(--text-primary)]">User Accounts Registry</h3>
                {/* Search */}
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-xs bg-gray-50 dark:bg-dark border border-[var(--border-color)] rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-[var(--text-primary)] shadow-inner"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-xs">
                  <thead>
                    <tr className="border-b border-[var(--border-color)] bg-gray-50 dark:bg-dark text-gray-400 font-bold select-none">
                      <th className="px-4 py-3">Student</th>
                      <th className="px-4 py-3">Email</th>
                      <th className="px-4 py-3">Plan</th>
                      <th className="px-4 py-3">Joined Date</th>
                      <th className="px-4 py-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-color)] text-[var(--text-primary)]">
                    {mockUsersList
                      .filter((u) => u.name.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((usr, i) => (
                        <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-dark/20 transition">
                          <td className="px-4 py-3.5 font-semibold">{usr.name}</td>
                          <td className="px-4 py-3.5 text-gray-400 font-mono">{usr.email}</td>
                          <td className="px-4 py-3.5 text-gray-450 font-semibold">{usr.plan}</td>
                          <td className="px-4 py-3.5 font-mono text-gray-550">{usr.joined}</td>
                          <td className="px-4 py-3.5 text-center">
                            <Badge text={usr.status} variant={usr.status === 'Active' ? 'success' : 'default'} size="sm" />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ANALYTICS TAB */}
          {activeTab === 'analytics' && (
            <GlassCard className="p-8 text-center select-none py-20 border border-dashed border-[var(--border-color)]">
              <BarChart3 className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-[var(--text-primary)]">Analytical Charts Pending</h3>
              <p className="text-xs text-gray-400 max-w-sm mx-auto leading-relaxed mt-1">
                Visual graphic performance chart widgets will display here upon active database integration setups.
              </p>
            </GlassCard>
          )}

        </div>
      </main>
    </div>
  );
}
