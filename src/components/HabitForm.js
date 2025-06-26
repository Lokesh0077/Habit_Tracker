import React, { useState, useEffect } from 'react';

function HabitForm({ onAddHabit, editingHabit, onEditHabitSubmit }) {
  const [habitData, setHabitData] = useState(editingHabit || {
    name: '',
    emoji: '',
    frequency: 'daily',
    goal: '',
    reminderTime: '',
    category: 'general',
    difficulty: 'medium',
    color: '#4CAF50',
    description: '',
  });

  useEffect(() => {
    setHabitData(editingHabit || {
      name: '',
      emoji: '',
      frequency: 'daily',
      goal: '',
      reminderTime: '',
      category: 'general',
      difficulty: 'medium',
      color: '#4CAF50',
      description: '',
    });
  }, [editingHabit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHabitData({ ...habitData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingHabit) {
      onEditHabitSubmit({ ...editingHabit, ...habitData });
    } else {
      onAddHabit(habitData);
    }
    setHabitData({
      name: '',
      emoji: '',
      frequency: 'daily',
      goal: '',
      reminderTime: '',
      category: 'general',
      difficulty: 'medium',
      color: '#4CAF50',
      description: '',
    });
  };

  const categories = [
    'general',
    'morning routine',
    'evening routine',
    'health',
    'fitness',
    'mindfulness',
    'productivity',
    'learning',
  ];

  const difficulties = [
    { value: 'easy', label: 'Easy 😊' },
    { value: 'medium', label: 'Medium 😐' },
    { value: 'hard', label: 'Hard 😤' },
  ];

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-4 text-center dark:text-white">
        {editingHabit ? 'Edit Habit' : 'Add New Habit'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300">
            Habit Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={habitData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600"
            required
          />
        </div>

        <div>
          <label htmlFor="emoji" className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300">
            Emoji/Icon:
          </label>
          <input
            type="text"
            id="emoji"
            name="emoji"
            value={habitData.emoji}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600"
            placeholder="Enter an emoji 😊"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300">
            Category:
          </label>
          <select
            id="category"
            name="category"
            value={habitData.category}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="difficulty" className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300">
            Difficulty:
          </label>
          <select
            id="difficulty"
            name="difficulty"
            value={habitData.difficulty}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600"
          >
            {difficulties.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="frequency" className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300">
            Frequency:
          </label>
          <select
            id="frequency"
            name="frequency"
            value={habitData.frequency}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <div>
          <label htmlFor="reminderTime" className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300">
            Reminder Time:
          </label>
          <input
            type="time"
            id="reminderTime"
            name="reminderTime"
            value={habitData.reminderTime}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>

        <div>
          <label htmlFor="color" className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300">
            Color:
          </label>
          <input
            type="color"
            id="color"
            name="color"
            value={habitData.color}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full h-10 px-1 focus:outline-none focus:shadow-outline"
          />
        </div>

        <div>
          <label htmlFor="goal" className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300">
            Target Goal:
          </label>
          <input
            type="text"
            id="goal"
            name="goal"
            value={habitData.goal}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600"
            placeholder="e.g., '30 minutes' or '5 times'"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={habitData.description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600"
            rows="3"
            placeholder="Add notes or description for your habit"
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline dark:bg-blue-600 dark:hover:bg-blue-800"
          >
            {editingHabit ? 'Save Changes' : 'Add Habit'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default HabitForm;
