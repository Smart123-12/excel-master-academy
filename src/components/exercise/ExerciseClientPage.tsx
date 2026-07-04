'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { exercises, lessons } from '@/data';
import { Spreadsheet } from '@/components/excel';
import { Button, Badge } from '@/components/ui';
import { ArrowLeft, Heart, Zap, Clock, AlertTriangle, Lightbulb, Check, X, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

interface ExerciseClientPageProps {
  exerciseId: string;
}

export default function ExerciseClientPage({ exerciseId }: ExerciseClientPageProps) {
  const exercise = exercises.find((ex) => ex.id === exerciseId);
  const lesson = exercise ? lessons.find((l) => l.id === exercise.lessonId) : null;

  // Simulator & scoring state
  const [lives, setLives] = useState(3);
  const [timer, setTimer] = useState(120);
  const [xpBonus, setXpBonus] = useState(0);
  const [currentHintIdx, setCurrentHintIdx] = useState(-1);
  const [showSolution, setShowSolution] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [userSubmission, setUserSubmission] = useState<{ cell: string; val: string | number; formula?: string }[]>([]);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  // Initialize values
  useEffect(() => {
    if (exercise) {
      setTimer(exercise.timeLimit);
      setLives(3);
      setIsCompleted(false);
      setShowSolution(false);
      setCurrentHintIdx(-1);
      setStatusMessage(null);
    }
  }, [exercise]);

  // Countdown timer
  useEffect(() => {
    if (isCompleted || lives <= 0 || timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, isCompleted, lives]);

  if (!exercise || !lesson) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-bold">Exercise Not Found</h1>
        <Button variant="primary" className="mt-4" href="/lessons">Back to Paths</Button>
      </div>
    );
  }

  // Cell change tracker
  const handleCellChange = (cellRef: string, formula: string, evaluatedValue: string | number) => {
    setUserSubmission((prev) => {
      const filtered = prev.filter((item) => item.cell.toUpperCase() !== cellRef.toUpperCase());
      return [...filtered, { cell: cellRef, val: evaluatedValue, formula }];
    });
  };

  // Answer validation trigger
  const handleSubmit = () => {
    if (lives <= 0 || isCompleted) return;

    let allCorrect = true;
    const errors: string[] = [];

    // Verify all expected cell answers are present and correct
    exercise.expectedAnswer.forEach((expected) => {
      const userCell = userSubmission.find((item) => item.cell.toUpperCase() === expected.cell.toUpperCase());
      
      if (!userCell) {
        allCorrect = false;
        errors.push(`Cell ${expected.cell} is empty.`);
        return;
      }

      // Check values
      const valueMatch = String(userCell.val).trim().toLowerCase() === String(expected.value).trim().toLowerCase();
      
      // Check formula if specified
      let formulaMatch = true;
      if (expected.formula && userCell.formula) {
        formulaMatch = userCell.formula.trim().replace(/\s/g, '').toLowerCase() === expected.formula.trim().replace(/\s/g, '').toLowerCase();
      }

      if (!valueMatch || !formulaMatch) {
        allCorrect = false;
        errors.push(`Value in cell ${expected.cell} is incorrect.`);
      }
    });

    if (allCorrect) {
      setIsCompleted(true);
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
      });
      // Calculate speed bonus
      const elapsed = exercise.timeLimit - timer;
      const speedBonus = elapsed <= exercise.bonusTimeThreshold ? 15 : 0;
      setXpBonus(speedBonus);
      setStatusMessage({
        type: 'success',
        text: `Correct! You earned +${exercise.xpReward + speedBonus} XP points!`,
      });
    } else {
      setLives((prev) => {
        const nextLives = prev - 1;
        if (nextLives <= 0) {
          setStatusMessage({
            type: 'error',
            text: 'Out of lives! Press reset to try again.',
          });
        } else {
          setStatusMessage({
            type: 'error',
            text: errors[0] || 'Incorrect answer. Try again!',
          });
        }
        return nextLives;
      });
    }
  };

  const handleReset = () => {
    setLives(3);
    setTimer(exercise.timeLimit);
    setCurrentHintIdx(-1);
    setShowSolution(false);
    setIsCompleted(false);
    setUserSubmission([]);
    setStatusMessage(null);
  };

  // Find next exercise
  const allLessonExercises = exercises.filter((ex) => ex.lessonId === lesson.id);
  const nextEx = allLessonExercises.find((ex) => ex.order === exercise.order + 1);

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-dark overflow-hidden font-sans">
      {/* Top Header Row */}
      <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-dark-light border-b border-gray-200 dark:border-gray-800 shadow-sm shrink-0 z-30 select-none">
        <div className="flex items-center gap-4">
          <Link href={`/lessons/${lesson.id}`} className="p-2 hover:bg-gray-100 dark:hover:bg-dark rounded-xl text-gray-500 hover:text-emerald-500 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-mono">{lesson.title}</span>
            <h1 className="text-lg font-bold text-[var(--text-primary)] leading-tight">{exercise.title}</h1>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center gap-6">
          {/* XP */}
          <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/20 px-3.5 py-1.5 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
            <Zap className="w-4 h-4 text-emerald-500 fill-emerald-500" />
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono">+{exercise.xpReward} XP</span>
          </div>

          {/* Timer */}
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-dark px-3.5 py-1.5 rounded-xl border border-gray-200 dark:border-gray-800">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className={`text-sm font-bold font-mono ${timer <= 30 ? 'text-rose-500 animate-pulse' : 'text-gray-600 dark:text-gray-300'}`}>
              {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
            </span>
          </div>

          {/* Lives */}
          <div className="flex items-center gap-1.5 bg-rose-50 dark:bg-rose-950/20 px-3.5 py-1.5 rounded-xl border border-rose-100 dark:border-rose-900/50">
            {Array.from({ length: 3 }).map((_, i) => (
              <Heart
                key={i}
                className={`w-4 h-4 ${i < lives ? 'text-rose-500 fill-rose-500' : 'text-gray-300 dark:text-gray-700'}`}
              />
            ))}
          </div>
        </div>
      </header>

      {/* Main Workspace split panel */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Left Side: Problem Detail Instruction Desk */}
        <div className="w-full lg:w-[40%] flex flex-col bg-white dark:bg-dark-light border-r border-gray-200 dark:border-gray-800 overflow-y-auto p-6 z-20">
          <div className="space-y-6 flex-1">
            {/* Context/Description */}
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 select-none">Exercise Goal</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {exercise.description}
              </p>
            </div>

            {/* Instruction List */}
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 select-none">Instructions</h3>
              <ol className="space-y-2.5">
                {exercise.instructions.map((inst, index) => (
                  <li key={index} className="flex gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <span className="w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 select-none">
                      {index + 1}
                    </span>
                    <span className="leading-normal">{inst}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Expected Answer Box */}
            <div className="p-4 bg-emerald-50/25 dark:bg-emerald-950/5 border border-emerald-150/45 rounded-2xl">
              <h4 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2 select-none">Expected Formula</h4>
              <div className="space-y-1">
                {exercise.expectedAnswer.map((ans, idx) => (
                  <p key={idx} className="text-xs font-mono text-gray-500 dark:text-gray-400">
                    Cell <span className="font-bold text-emerald-600 dark:text-emerald-400">{ans.cell}</span> should evaluate to: <span className="font-bold text-emerald-600 dark:text-emerald-400">{ans.value}</span>
                    {ans.formula && <> using formula: <span className="font-bold text-emerald-600 dark:text-emerald-400">{ans.formula}</span></>}
                  </p>
                ))}
              </div>
            </div>

            {/* Hint System */}
            {exercise.hints.length > 0 && (
              <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider select-none">Hints</h3>
                  {currentHintIdx < exercise.hints.length - 1 && (
                    <button
                      onClick={() => setCurrentHintIdx((prev) => prev + 1)}
                      className="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400 hover:underline font-semibold"
                    >
                      <Lightbulb className="w-3.5 h-3.5" />
                      Reveal Hint ({currentHintIdx + 2}/{exercise.hints.length})
                    </button>
                  )}
                </div>

                <AnimatePresence mode="popLayout">
                  {currentHintIdx >= 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/50 rounded-2xl text-xs text-amber-700 dark:text-amber-300 leading-relaxed"
                    >
                      {exercise.hints[currentHintIdx]}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Action validation trigger bar */}
          <div className="border-t border-gray-200 dark:border-gray-800 pt-6 mt-6 shrink-0 space-y-3">
            {statusMessage && (
              <div className={`p-4 rounded-xl flex items-start gap-2.5 text-xs font-semibold
                ${statusMessage.type === 'success' ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-150' : 'bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 border border-rose-150'}
              `}>
                {statusMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertTriangle className="w-4 h-4 shrink-0" />}
                <span>{statusMessage.text}</span>
              </div>
            )}

            <div className="flex gap-3">
              {lives <= 0 ? (
                <Button variant="primary" className="flex-1 justify-center" onClick={handleReset}>
                  Reset & Retry
                </Button>
              ) : isCompleted ? (
                nextEx ? (
                  <Button variant="primary" className="flex-1 justify-center" href={`/exercise/${nextEx.id}`}>
                    Next Exercise
                  </Button>
                ) : (
                  <Button variant="primary" className="flex-1 justify-center" href={`/lessons/${lesson.id}`}>
                    Finish Lesson
                  </Button>
                )
              ) : (
                <Button variant="primary" className="flex-1 justify-center" onClick={handleSubmit}>
                  Check Answer
                </Button>
              )}

              <Button
                variant="outline"
                onClick={() => setShowSolution(!showSolution)}
                className="font-bold shrink-0"
              >
                {showSolution ? 'Hide Solution' : 'Show Solution'}
              </Button>
            </div>

            {/* Solution Drawer Panel */}
            <AnimatePresence>
              {showSolution && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden border border-gray-200 dark:border-gray-800 rounded-2xl bg-gray-50 dark:bg-dark p-4 mt-2"
                >
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 select-none">Exercise Solution</h4>
                  <p className="text-sm font-mono text-emerald-600 dark:text-emerald-400 font-bold mb-2">{exercise.solution}</p>
                  <p className="text-xs text-gray-400 leading-relaxed">{exercise.solutionExplanation}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Spreadsheet simulator workspace */}
        <div className="flex-1 h-full p-6 bg-gray-50 dark:bg-dark overflow-hidden flex flex-col">
          <Spreadsheet
            dataset={exercise.dataset}
            onCellChange={handleCellChange}
            expectedAnswers={exercise.expectedAnswer}
            readOnly={isCompleted || lives <= 0}
          />
        </div>
      </div>
    </div>
  );
}
