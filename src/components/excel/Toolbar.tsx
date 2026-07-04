'use client';

import React from 'react';
import { 
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, 
  ChevronDown, ArrowUpAZ, ArrowDownAZ, Filter, Undo, Redo 
} from 'lucide-react';

export default function Toolbar() {
  return (
    <div className="flex items-center gap-1 p-1.5 border border-[var(--border-color)] bg-gray-50 dark:bg-dark-light rounded-xl shadow-sm overflow-x-auto">
      {/* Undo/Redo */}
      <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-dark rounded text-gray-600 dark:text-gray-300" title="Undo">
        <Undo size={16} />
      </button>
      <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-dark rounded text-gray-600 dark:text-gray-300" title="Redo">
        <Redo size={16} />
      </button>
      
      <div className="w-[1px] h-5 bg-gray-300 dark:bg-gray-700 mx-1" />

      {/* Font selector */}
      <div className="flex items-center gap-1 px-2 py-1 text-xs bg-white dark:bg-dark border border-[var(--border-color)] rounded shadow-sm cursor-pointer text-[var(--text-primary)]">
        <span>Calibri</span>
        <ChevronDown size={12} />
      </div>

      {/* Font size */}
      <div className="flex items-center gap-1 px-2 py-1 text-xs bg-white dark:bg-dark border border-[var(--border-color)] rounded shadow-sm cursor-pointer text-[var(--text-primary)]">
        <span>11</span>
        <ChevronDown size={12} />
      </div>

      <div className="w-[1px] h-5 bg-gray-300 dark:bg-gray-700 mx-1" />

      {/* Formatting */}
      <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-dark rounded text-gray-700 dark:text-gray-300 font-bold" title="Bold">
        <Bold size={16} />
      </button>
      <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-dark rounded text-gray-700 dark:text-gray-300" title="Italic">
        <Italic size={16} />
      </button>
      <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-dark rounded text-gray-700 dark:text-gray-300" title="Underline">
        <Underline size={16} />
      </button>

      <div className="w-[1px] h-5 bg-gray-300 dark:bg-gray-700 mx-1" />

      {/* Alignment */}
      <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-dark rounded text-gray-700 dark:text-gray-300" title="Align Left">
        <AlignLeft size={16} />
      </button>
      <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-dark rounded text-gray-700 dark:text-gray-300" title="Align Center">
        <AlignCenter size={16} />
      </button>
      <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-dark rounded text-gray-700 dark:text-gray-300" title="Align Right">
        <AlignRight size={16} />
      </button>

      <div className="w-[1px] h-5 bg-gray-300 dark:bg-gray-700 mx-1" />

      {/* Actions */}
      <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-dark rounded text-gray-700 dark:text-gray-300" title="Sort Ascending">
        <ArrowUpAZ size={16} />
      </button>
      <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-dark rounded text-gray-700 dark:text-gray-300" title="Sort Descending">
        <ArrowDownAZ size={16} />
      </button>
      <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-dark rounded text-gray-700 dark:text-gray-300" title="Filter">
        <Filter size={16} />
      </button>
    </div>
  );
}
