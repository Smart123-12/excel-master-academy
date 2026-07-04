'use client';

import React, { useState, useMemo } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { threads, mockUser } from '@/data';
import { GlassCard, Button, Avatar, Badge } from '@/components/ui';
import { MessageSquare, ThumbsUp, Pin, Search, PlusCircle, Filter } from 'lucide-react';

export default function CommunityPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'popular'>('recent');

  const filteredThreads = useMemo(() => {
    return threads
      .filter((t) => {
        const matchesCategory = activeCategory === 'All' || t.category === activeCategory;
        const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              t.content.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'popular') {
          return b.upvotes - a.upvotes;
        }
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [activeCategory, searchQuery, sortBy]);

  const categories = ['All', 'Help', 'Discussion', 'Showcase'];

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-gray-50/50 dark:bg-dark py-24 px-6 pt-28">
        <div className="max-w-7xl mx-auto w-full space-y-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-[var(--text-primary)]">
                Community <span className="gradient-text">Forum</span>
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                Ask questions, share dashboards, and discuss Excel tips with other students.
              </p>
            </div>
            
            <Button 
              variant="primary" 
              className="flex items-center gap-2 font-bold w-full sm:w-auto justify-center"
              onClick={() => alert('New discussion threads can be created on active API integration (UI Mockup).')}
            >
              <PlusCircle className="w-4 h-4" />
              New Discussion
            </Button>
          </div>

          {/* Filtering Controls Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white dark:bg-dark-light p-4 rounded-3xl border border-[var(--border-color)]">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search forum..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-white dark:bg-dark border border-[var(--border-color)] rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-[var(--text-primary)] shadow-inner"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-4 items-center w-full md:w-auto">
              {/* Category tabs */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 md:pb-0 select-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition
                      ${activeCategory === cat
                        ? 'bg-emerald-500 border-emerald-500 text-white shadow'
                        : 'bg-white dark:bg-dark border-[var(--border-color)] text-gray-500 hover:text-emerald-500'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="w-[1px] h-6 bg-gray-300 dark:bg-gray-700 hidden md:block" />

              {/* Sort selector */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1.5 text-xs bg-white dark:bg-dark border border-[var(--border-color)] rounded-xl focus:outline-none text-gray-500 font-semibold cursor-pointer"
              >
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>

          {/* Threads List */}
          <div className="space-y-4">
            {filteredThreads.length > 0 ? (
              filteredThreads.map((t) => (
                <GlassCard 
                  key={t.id}
                  className={`p-6 hover:border-emerald-400 dark:hover:border-emerald-800 transition cursor-pointer relative
                    ${t.isPinned ? 'border border-emerald-500/30 bg-emerald-50/10 dark:bg-emerald-950/5' : ''}`}
                >
                  <div className="flex items-start gap-4">
                    {/* Votes column */}
                    <div className="flex flex-col items-center bg-gray-50 dark:bg-dark/40 px-2.5 py-1.5 rounded-xl border border-[var(--border-color)] select-none shrink-0 text-gray-500 dark:text-gray-400">
                      <ThumbsUp className="w-4 h-4 mb-1" />
                      <span className="text-xs font-bold font-mono">{t.upvotes}</span>
                    </div>

                    {/* Main post contents */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        {t.isPinned && (
                          <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase bg-emerald-100 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                            <Pin className="w-3 h-3" /> Pinned
                          </span>
                        )}
                        <Badge 
                          text={t.category}
                          variant={t.category === 'Help' ? 'danger' : t.category === 'Showcase' ? 'success' : 'info'}
                          size="sm"
                        />
                        <span className="text-[10px] text-gray-400 font-semibold">Posted {new Date(t.createdAt).toLocaleDateString()}</span>
                      </div>

                      <h3 className="text-lg font-bold text-[var(--text-primary)] leading-snug">
                        {t.title}
                      </h3>
                      <p className="text-xs text-gray-400 leading-normal line-clamp-2">
                        {t.content}
                      </p>

                      {/* Tags list */}
                      <div className="flex flex-wrap gap-1.5 pt-1.5">
                        {t.tags.map((tag, i) => (
                          <span key={i} className="text-[10px] font-mono text-gray-400 bg-gray-50 dark:bg-dark/60 border border-[var(--border-color)] px-2 py-0.5 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* User profile row */}
                      <div className="flex items-center justify-between pt-4 border-t border-[var(--border-color)] mt-4">
                        <div className="flex items-center gap-2">
                          <Avatar src={t.author.avatar} name={t.author.name} size="sm" level={t.author.level} showLevel />
                          <span className="text-xs font-bold text-[var(--text-primary)]">{t.author.name}</span>
                        </div>

                        <div className="flex items-center gap-1.5 text-gray-400 text-xs select-none">
                          <MessageSquare className="w-4 h-4" />
                          <span>{t.commentCount} comments</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              ))
            ) : (
              <div className="text-center py-24 bg-white/50 dark:bg-dark-light/20 rounded-3xl border border-dashed border-[var(--border-color)] select-none">
                <MessageSquare className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 text-lg font-semibold">No discussions found matching filters.</p>
              </div>
            )}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
