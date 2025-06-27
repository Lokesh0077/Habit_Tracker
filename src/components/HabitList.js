import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PencilIcon, 
  TrashIcon, 
  CheckCircleIcon,
  ClockIcon,
  ChartBarIcon,
  FireIcon
} from '@heroicons/react/24/outline';

import {
  PencilIcon as PencilIconSolid,
  TrashIcon as TrashIconSolid,
  CheckCircleIcon as CheckCircleIconSolid,
  ClockIcon as ClockIconSolid,
  ChartBarIcon as ChartBarIconSolid,
  FireIcon as FireIconSolid
} from '@heroicons/react/24/solid';

const HabitList = ({ habits, onToggleComplete, onDeleteHabit, onEditHabit }) => {
  // Group habits by category
  const groupedHabits = habits.reduce((acc, habit) => {
    const category = habit.category || 'General';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(habit);
    return acc;
  }, {});

  const getDifficultyEmoji = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return '😊';
      case 'medium':
        return '😐';
      case 'hard':
        return '😤';
      default:
        return '';
    }
  };

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
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="mt-8 space-y-8"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          My Habits
        </h2>
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <span className="flex items-center">
            <CheckCircleIconSolid className="w-4 h-4 mr-1" />
            {habits.filter(h => h.completed).length} completed
          </span>
          <span>•</span>
          <span className="flex items-center">
            <ChartBarIconSolid className="w-4 h-4 mr-1" />
            {habits.length} total
          </span>
        </div>
      </div>

      <AnimatePresence>
        {habits.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center p-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <ClockIconSolid className="w-12 h-12 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              No habits yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Start building better habits by adding your first one above!
            </p>
          </motion.div>
        ) : (
          Object.entries(groupedHabits).map(([category, categoryHabits]) => (
            <motion.div
              key={category}
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
            >
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-750 border-b border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white capitalize">
                  {category}
                </h3>
              </div>
              
              <div className="p-6 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence>
                  {categoryHabits.map((habit) => (
                    <motion.div
                      key={habit.id}
                      variants={itemVariants}
                      layout
                      className={`relative overflow-hidden rounded-xl shadow-sm transition-all duration-200 ${
                        habit.completed ? 'ring-2 ring-green-500' : 'hover:shadow-md'
                      }`}
                      style={{
                        backgroundColor: habit.completed ? `${habit.color}15` : 'white',
                        borderLeft: `4px solid ${habit.color}`,
                      }}
                    >
                      <div className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-2xl">{habit.emoji}</span>
                              <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                                {habit.name}
                              </h4>
                            </div>
                            
                            <div className="mt-2 space-y-2">
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                {habit.description}
                              </p>
                              
                              <div className="flex flex-wrap gap-2 text-xs">
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-200">
                                  {habit.frequency}
                                </span>
                                <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full dark:bg-purple-900 dark:text-purple-200">
                                  {getDifficultyEmoji(habit.difficulty)} {habit.difficulty}
                                </span>
                                {habit.goal && (
                                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full dark:bg-green-900 dark:text-green-200">
                                    Goal: {habit.goal}
                                  </span>
                                )}
                              </div>

                              {habit.reminderTime && (
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                  <ClockIconSolid className="w-4 h-4 mr-1" />
                                  {habit.reminderTime}
                                </div>
                              )}
                              
                              {habit.streak > 0 && (
                                <div className="flex items-center text-sm font-medium text-orange-500">
                                  <FireIconSolid className="w-4 h-4 mr-1" />
                                  {habit.streak} day streak!
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => onEditHabit(habit)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg dark:text-blue-400 dark:hover:bg-blue-900"
                            >
                              <PencilIconSolid className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => onDeleteHabit(habit.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg dark:text-red-400 dark:hover:bg-red-900"
                            >
                              <TrashIconSolid className="w-4 h-4" />
                            </motion.button>
                          </div>
                          
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onToggleComplete(habit.id)}
                            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                              habit.completed
                                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200'
                                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200'
                            }`}
                          >
                            <CheckCircleIconSolid className="w-5 h-5" />
                            <span>{habit.completed ? 'Completed' : 'Mark Done'}</span>
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          ))
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default HabitList;
