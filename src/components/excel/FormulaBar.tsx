'use client';

import React from 'react';

interface FormulaBarProps {
  selectedCell: string | null;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export default function FormulaBar({ selectedCell, value, onChange, disabled = false }: FormulaBarProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 border border-[var(--border-color)] bg-gray-50 dark:bg-dark-light rounded-xl shadow-sm">
      <div className="w-20 px-3 py-1 text-xs font-mono font-bold text-center bg-white dark:bg-dark border border-[var(--border-color)] rounded-lg text-emerald-600 dark:text-emerald-400">
        {selectedCell || 'A1'}
      </div>
      <div className="text-gray-400 font-mono italic text-sm select-none font-semibold px-1">fx</div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="flex-1 px-3 py-1 text-sm font-mono bg-white dark:bg-dark border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-[var(--text-primary)]"
        placeholder="Enter formula or value (e.g. =SUM(B2:B6))"
      />
    </div>
  );
}
