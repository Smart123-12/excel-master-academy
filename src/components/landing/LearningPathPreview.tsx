'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BookOpen, ChevronRight } from 'lucide-react';
import { lessons } from '@/data';

const levels = [
  {
    label: 'Beginner',
    color: 'bg-green-500',
    lightBg: 'bg-green-50 dark:bg-green-500/10',
    textColor: 'text-green-700 dark:text-green-400',
    borderColor: 'border-green-200 dark:border-green-500/30',
    difficulty: 'beginner' as const,
  },
  {
    label: 'Intermediate',
    color: 'bg-blue-500',
    lightBg: 'bg-blue-50 dark:bg-blue-500/10',
    textColor: 'text-blue-700 dark:text-blue-400',
    borderColor: 'border-blue-200 dark:border-blue-500/30',
    difficulty: 'intermediate' as const,
  },
  {
    label: 'Advanced',
    color: 'bg-purple-500',
    lightBg: 'bg-purple-50 dark:bg-purple-500/10',
    textColor: 'text-purple-700 dark:text-purple-400',
    borderColor: 'border-purple-200 dark:border-purple-500/30',
    difficulty: 'advanced' as const,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export default function LearningPathPreview() {
  return (
    <section className="py-24 bg-white dark:bg-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Your Learning <span className="gradient-text">Path</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A structured curriculum from first formula to advanced mastery.
          </p>
        </motion.div>

        {/* Learning Paths */}
        <div className="space-y-10">
          {levels.map((level) => {
            const levelLessons = lessons.filter(
              (l) => l.difficulty === level.difficulty
            );
            return (
              <motion.div
                key={level.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {/* Level Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-3 h-3 rounded-full ${level.color}`} />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {level.label}
                  </h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {levelLessons.length} lessons
                  </span>
                </div>

                {/* Lesson Cards */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                >
                  {levelLessons.slice(0, 4).map((lesson) => (
                    <motion.div
                      key={lesson.id}
                      variants={itemVariants}
                      whileHover={{ y: -4 }}
                      className={`glass-card rounded-xl p-4 border ${level.borderColor} 
                        hover:shadow-lg transition-all duration-300 cursor-pointer group`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl flex-shrink-0">
                          {lesson.icon}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                            {lesson.title}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {lesson.duration} · {lesson.xpReward} XP
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/lessons"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-primary 
                text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-xl 
                hover:shadow-primary/30 transition-all group"
            >
              <BookOpen size={18} />
              View All Lessons
              <ChevronRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
