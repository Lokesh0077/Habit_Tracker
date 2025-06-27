import React from 'react';
import { motion } from 'framer-motion';
import {
  FireIcon,
  SparklesIcon,
  TrophyIcon,
  StarIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

import {
  FireIcon as FireIconSolid,
  SparklesIcon as SparklesIconSolid,
  TrophyIcon as TrophyIconSolid,
  StarIcon as StarIconSolid,
  ChartBarIcon as ChartBarIconSolid
} from '@heroicons/react/24/solid';

const AchievementBadges = ({ habits }) => {
  const achievements = [
    {
      id: 'streak',
      title: 'Longest Streak',
      icon: FireIconSolid,
      value: Math.max(...habits.map(h => h.streak || 0)),
      color: 'from-orange-400 to-red-500',
      description: 'days in a row'
    },
    {
      id: 'total',
      title: 'Total Habits',
      icon: SparklesIconSolid,
      value: habits.length,
      color: 'from-blue-400 to-indigo-500',
      description: 'habits tracked'
    },
    {
      id: 'completed',
      title: 'Completed Today',
      icon: TrophyIconSolid,
      value: habits.filter(h => h.completed).length,
      color: 'from-green-400 to-emerald-500',
      description: 'habits done today'
    },
    {
      id: 'perfect',
      title: 'Perfect Days',
      icon: StarIconSolid,
      value: habits.length > 0 ? Math.floor(Math.random() * 10) : 0, // Replace with actual perfect days calculation
      color: 'from-purple-400 to-pink-500',
      description: 'all habits completed'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    show: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Achievements
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {achievements.map((achievement) => {
          const Icon = achievement.icon;
          return (
            <motion.div
              key={achievement.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="relative overflow-hidden rounded-lg p-4"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-10`} />
              
              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${achievement.color} flex items-center justify-center mb-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {achievement.title}
                </h3>
                
                <div className="mt-1 flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {achievement.value}
                  </p>
                  <p className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                    {achievement.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {habits.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-6"
        >
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <ChartBarIconSolid className="w-8 h-8 text-gray-400 dark:text-gray-500" />
          </div>
          <p className="text-gray-500 dark:text-gray-400">
            Start tracking habits to unlock achievements!
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AchievementBadges; 