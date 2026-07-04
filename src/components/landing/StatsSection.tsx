'use client';

import { motion } from 'framer-motion';
import { Users, BookOpen, GraduationCap, Star } from 'lucide-react';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

const stats = [
  {
    icon: Users,
    target: 200000,
    suffix: '+',
    label: 'Students Worldwide',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    icon: BookOpen,
    target: 1000,
    suffix: '+',
    label: 'Practice Exercises',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: GraduationCap,
    target: 150,
    suffix: '+',
    label: 'Interactive Lessons',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
  {
    icon: Star,
    target: 98,
    suffix: '%',
    label: 'Satisfaction Rate',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as any },
  },
} as const;

export default function StatsSection() {
  return (
    <section className="relative py-20 bg-white dark:bg-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={cardVariants}
              whileHover={{ y: -5 }}
              className="glass-card rounded-2xl p-6 text-center group cursor-default 
                hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
            >
              <div
                className={`inline-flex p-3 rounded-xl ${stat.bgColor} mb-4 
                  group-hover:scale-110 transition-transform duration-300`}
              >
                <stat.icon size={24} className={stat.color} />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-1">
                <AnimatedCounter
                  value={stat.target}
                  suffix={stat.suffix}
                  duration={2.5}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
