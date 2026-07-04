'use client';

import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FormulaEngine } from '@/lib/formulaParser';

interface CellData {
  value: string;
  evaluated?: string | number;
}

interface SpreadsheetProps {
  dataset?: {
    headers: string[];
    rows: (string | number)[][];
  };
  onCellChange?: (cellRef: string, formula: string, evaluatedValue: string | number) => void;
  highlightCells?: string[];
  readOnly?: boolean;
  expectedAnswers?: {
    cell: string;
    value: string | number;
    formula?: string;
  }[];
}

function colToLetter(col: number): string {
  return String.fromCharCode(65 + col);
}

function cellId(row: number, col: number): string {
  return `${colToLetter(col)}${row + 1}`;
}

export default function Spreadsheet({
  dataset,
  onCellChange,
  highlightCells = [],
  readOnly = false,
  expectedAnswers = [],
}: SpreadsheetProps) {
  const headers = useMemo(() => dataset?.headers || ['A', 'B', 'C', 'D', 'E'], [dataset]);
  const rows = useMemo(() => dataset?.rows || [
    [10, 20, 30, '', ''],
    [15, 25, 35, '', ''],
    [20, 30, 40, '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ], [dataset]);

  const totalCols = headers.length;
  const totalRows = Math.max(rows.length + 5, 12); // Extra rows for practice

  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [cellValues, setCellValues] = useState<Record<string, string>>({});
  const [editingCell, setEditingCell] = useState<string | null>(null);
  const [formulaBarValue, setFormulaBarValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize values
  useEffect(() => {
    const vals: Record<string, string> = {};
    
    // Headers in row 1 (row 0 in 0-based)
    headers.forEach((h, ci) => {
      vals[cellId(0, ci)] = String(h);
    });

    // Data rows
    rows.forEach((row, ri) => {
      row.forEach((val, ci) => {
        vals[cellId(ri + 1, ci)] = String(val);
      });
    });

    setCellValues(vals);
    setSelectedCell('A2'); // Default selection below headers
    setFormulaBarValue(vals['A2'] || '');
  }, [headers, rows]);

  // Create cell value getter for formula engine
  const getCellValue = useCallback((ref: string): string | number | null => {
    const rawVal = cellValues[ref];
    if (rawVal === undefined || rawVal === '') return null;
    return rawVal;
  }, [cellValues]);

  // Instantiate formula engine
  const engine = useMemo(() => new FormulaEngine(getCellValue), [getCellValue]);

  // Evaluate single cell
  const evaluateCell = useCallback((id: string): string | number => {
    const rawVal = cellValues[id];
    if (!rawVal) return '';
    if (String(rawVal).startsWith('=')) {
      const res = engine.evaluate(rawVal);
      if (res instanceof Error || (res && typeof res === 'object' && 'type' in res)) {
        return String(res);
      }
      return res;
    }
    const num = Number(rawVal);
    if (rawVal !== '' && !isNaN(num)) return num;
    return rawVal;
  }, [cellValues, engine]);

  // Evaluated cache
  const evaluatedValues = useMemo(() => {
    const cache: Record<string, string | number> = {};
    Object.keys(cellValues).forEach((id) => {
      cache[id] = evaluateCell(id);
    });
    return cache;
  }, [cellValues, evaluateCell]);

  const handleCellClick = useCallback((id: string) => {
    setSelectedCell(id);
    setFormulaBarValue(cellValues[id] || '');
  }, [cellValues]);

  const handleCellDoubleClick = useCallback((id: string) => {
    if (readOnly) return;
    setEditingCell(id);
    setFormulaBarValue(cellValues[id] || '');
    setTimeout(() => inputRef.current?.focus(), 0);
  }, [cellValues, readOnly]);

  const updateCell = useCallback((id: string, value: string) => {
    setCellValues((prev) => {
      const next = { ...prev, [id]: value };
      
      // Temporary formula engine with the new state
      const tempEngine = new FormulaEngine((ref) => {
        const raw = ref === id ? value : next[ref];
        if (raw === undefined || raw === '') return null;
        return raw;
      });

      let evaluated = value;
      if (value.startsWith('=')) {
        const res = tempEngine.evaluate(value);
        evaluated = String(res);
      }

      // Notify callback if any
      onCellChange?.(id, value, evaluated);
      return next;
    });
  }, [onCellChange]);

  const handleCellInputChange = useCallback((id: string, value: string) => {
    setFormulaBarValue(value);
    updateCell(id, value);
  }, [updateCell]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setEditingCell(null);
      // Move selected down
      const match = id.match(/^([A-Z]+)(\d+)$/);
      if (match) {
        const col = match[1];
        const row = parseInt(match[2], 10);
        const nextId = `${col}${row + 1}`;
        setSelectedCell(nextId);
        setFormulaBarValue(cellValues[nextId] || '');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      setEditingCell(null);
      // Move selected right
      const match = id.match(/^([A-Z]+)(\d+)$/);
      if (match) {
        const col = match[1];
        const row = parseInt(match[2], 10);
        const colIdx = col.charCodeAt(0) - 65;
        const nextCol = String.fromCharCode(65 + colIdx + 1);
        const nextId = `${nextCol}${row}`;
        setSelectedCell(nextId);
        setFormulaBarValue(cellValues[nextId] || '');
      }
    } else if (e.key === 'Escape') {
      setEditingCell(null);
    }
  }, [cellValues]);

  const handleFormulaBarChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormulaBarValue(val);
    if (selectedCell) {
      updateCell(selectedCell, val);
    }
  }, [selectedCell, updateCell]);

  // Check expected answer states
  const getValidationStyle = useCallback((id: string) => {
    const expected = expectedAnswers.find((ans) => ans.cell.toUpperCase() === id.toUpperCase());
    if (!expected) return '';

    const userVal = evaluatedValues[id];
    const userFormula = cellValues[id] || '';

    // Check value matching
    const valueMatch = String(userVal).trim().toLowerCase() === String(expected.value).trim().toLowerCase();
    
    // Check formula matching if required
    let formulaMatch = true;
    if (expected.formula) {
      formulaMatch = userFormula.trim().replace(/\s/g, '').toLowerCase() === expected.formula.trim().replace(/\s/g, '').toLowerCase();
    }

    if (valueMatch && formulaMatch) {
      return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800';
    } else if (userFormula !== '') {
      return 'bg-rose-50 text-rose-700 dark:bg-rose-950/20 dark:text-rose-400 border border-rose-300 dark:border-rose-800';
    }
    return '';
  }, [expectedAnswers, evaluatedValues, cellValues]);

  return (
    <motion.div
      className="flex flex-col h-full border border-[var(--border-color)] rounded-2xl overflow-hidden bg-white dark:bg-dark-light shadow-xl"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Excel Formula Bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--border-color)] bg-gray-50 dark:bg-dark">
        <div className="w-20 px-3 py-1 text-xs font-mono font-bold text-center bg-white dark:bg-dark-light border border-[var(--border-color)] rounded-lg text-emerald-600 dark:text-emerald-400 shadow-sm">
          {selectedCell || 'A1'}
        </div>
        <div className="text-gray-400 font-mono italic text-sm select-none font-semibold px-1">fx</div>
        <input
          type="text"
          value={formulaBarValue}
          onChange={handleFormulaBarChange}
          disabled={readOnly}
          className="flex-1 px-3 py-1 text-sm font-mono bg-white dark:bg-dark-light border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-[var(--text-primary)] shadow-sm"
          placeholder="Enter value or formula (e.g. =SUM(B2:B6))"
        />
      </div>

      {/* Spreadsheet Grid */}
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              {/* Corner header */}
              <th className="sticky top-0 left-0 z-30 w-12 min-w-12 bg-gray-100 dark:bg-dark-lighter border-b border-r border-[var(--border-color)]" />
              {/* Column headers */}
              {Array.from({ length: totalCols }, (_, ci) => (
                <th
                  key={ci}
                  className="sticky top-0 z-10 min-w-28 px-3 py-2 text-xs font-bold text-center text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-dark-lighter border-b border-r border-[var(--border-color)] select-none"
                >
                  {colToLetter(ci)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: totalRows }, (_, ri) => (
              <tr key={ri} className="group">
                {/* Row label */}
                <td className="sticky left-0 z-10 w-12 min-w-12 px-2 py-1 text-xs font-bold text-center text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-dark-lighter border-b border-r border-[var(--border-color)] select-none">
                  {ri + 1}
                </td>
                {/* Cells */}
                {Array.from({ length: totalCols }, (_, ci) => {
                  const id = cellId(ri, ci);
                  const isSelected = selectedCell === id;
                  const isEditing = editingCell === id;
                  const rawVal = cellValues[id] || '';
                  const evalVal = evaluatedValues[id] ?? '';
                  const valStyle = getValidationStyle(id);
                  const isHighlighted = highlightCells.includes(id);

                  return (
                    <td
                      key={ci}
                      className={`relative min-w-28 border-b border-r border-[var(--border-color)] cursor-cell select-none
                        ${isSelected ? 'ring-2 ring-emerald-500 ring-inset z-10' : ''}
                        ${isHighlighted ? 'bg-emerald-50/40 dark:bg-emerald-950/10' : ''}
                        ${valStyle}
                      `}
                      onClick={() => handleCellClick(id)}
                      onDoubleClick={() => handleCellDoubleClick(id)}
                    >
                      {isEditing ? (
                        <input
                          ref={inputRef}
                          type="text"
                          value={rawVal}
                          onChange={(e) => handleCellInputChange(id, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(e, id)}
                          onBlur={() => setEditingCell(null)}
                          className="absolute inset-0 w-full h-full px-3 py-1 text-sm font-mono bg-white dark:bg-dark focus:outline-none text-[var(--text-primary)] z-20"
                        />
                      ) : (
                        <div className={`px-3 py-1.5 text-sm truncate font-mono text-[var(--text-primary)] ${typeof evalVal === 'number' ? 'text-right' : 'text-left'}`}>
                          {evalVal}
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-4 py-2 text-xs text-gray-500 dark:text-gray-400 border-t border-[var(--border-color)] bg-gray-50 dark:bg-dark select-none">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">Sheet 1</span>
        </div>
        <div className="font-mono">
          {selectedCell ? `Active Cell: ${selectedCell}` : 'Ready'}
        </div>
      </div>
    </motion.div>
  );
}
