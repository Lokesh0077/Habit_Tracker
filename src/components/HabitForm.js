import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusIcon, CheckIcon } from '@heroicons/react/24/outline';

const HabitForm = ({ onAddHabit, editingHabit, onEditHabitSubmit }) => {
  const [formData, setFormData] = useState({
    name: editingHabit ? editingHabit.name : '',
    description: editingHabit ? editingHabit.description : '',
    frequency: editingHabit ? editingHabit.frequency : 'daily',
    category: editingHabit ? editingHabit.category : '',
    difficulty: editingHabit ? editingHabit.difficulty : 'medium',
    goal: editingHabit ? editingHabit.goal : '',
    reminderTime: editingHabit ? editingHabit.reminderTime : '',
    color: editingHabit ? editingHabit.color : '#4CAF50',
    emoji: editingHabit ? editingHabit.emoji : '🎯'
  });

  const emojiOptions = ['🎯', '💪', '📚', '🏃‍♂️', '🧘‍♀️', '🥗', '💧', '😴', '🎨', '🎵', '✍️', '🧠'];
  const colorOptions = [
    '#4CAF50', '#2196F3', '#9C27B0', '#F44336', '#FF9800', 
    '#795548', '#607D8B', '#E91E63', '#3F51B5', '#009688'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingHabit) {
      onEditHabitSubmit({ ...editingHabit, ...formData });
    } else {
      onAddHabit(formData);
    }
    setFormData({
      name: '',
      description: '',
      frequency: 'daily',
      category: '',
      difficulty: 'medium',
      goal: '',
      reminderTime: '',
      color: '#4CAF50',
      emoji: '🎯'
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        {editingHabit ? 'Edit Habit' : 'Create New Habit'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Choose Emoji
              </label>
              <div className="grid grid-cols-6 gap-2">
                {emojiOptions.map((emoji) => (
                  <motion.button
                    key={emoji}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, emoji }))}
                    className={`text-2xl p-2 rounded-lg ${
                      formData.emoji === emoji 
                        ? 'bg-blue-100 dark:bg-blue-900' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {emoji}
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Choose Color
              </label>
              <div className="grid grid-cols-5 gap-2">
                {colorOptions.map((color) => (
                  <motion.button
                    key={color}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, color }))}
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: color }}
                  >
                    {formData.color === color && (
                      <CheckIcon className="w-5 h-5 text-white mx-auto" />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                rows="3"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                placeholder="e.g., Health, Learning, Fitness"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Frequency
              </label>
              <select
                name="frequency"
                value={formData.frequency}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Difficulty
              </label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Goal
              </label>
              <input
                type="text"
                name="goal"
                value={formData.goal}
                onChange={handleInputChange}
                placeholder="e.g., Run 5km, Read 20 pages"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Reminder Time
              </label>
              <input
                type="time"
                name="reminderTime"
                value={formData.reminderTime}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-lg flex items-center justify-center space-x-2 hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
        >
                     <PlusIcon className="w-5 h-5" />
          <span>{editingHabit ? 'Update Habit' : 'Create Habit'}</span>
        </motion.button>
      </form>
    </motion.div>
  );
};

export default HabitForm;
