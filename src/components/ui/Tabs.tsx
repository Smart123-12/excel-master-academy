'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export default function Tabs({
  tabs,
  activeTab,
  onTabChange,
  className = '',
}: TabsProps) {
  return (
    <div
      className={`flex items-center gap-1 p-1 rounded-xl bg-gray-100 dark:bg-dark-light ${className}`}
      role="tablist"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onTabChange(tab.id)}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              isActive
                ? 'text-primary-700 dark:text-primary-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="active-tab-bg"
                className="absolute inset-0 bg-white dark:bg-dark-lighter rounded-lg shadow-sm"
                transition={{
                  type: 'spring',
                  stiffness: 350,
                  damping: 30,
                }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {tab.icon && <span className="shrink-0">{tab.icon}</span>}
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
