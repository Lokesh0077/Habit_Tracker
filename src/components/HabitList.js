import React from 'react';

const HabitList = ({ habits, onToggleComplete, onDeleteHabit, onEditHabit }) => {
  // Group habits by category
  const groupedHabits = habits.reduce((acc, habit) => {
    const category = habit.category || 'general';
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

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center dark:text-white">My Habits</h2>
      {habits.length === 0 ? (
        <div className="text-center p-8">
          <p className="text-gray-500 dark:text-gray-400 text-lg">No habits added yet.</p>
          <p className="text-gray-400 dark:text-gray-500 mt-2">Start by adding a new habit above!</p>
        </div>
      ) : (
        Object.entries(groupedHabits).map(([category, categoryHabits]) => (
          <div key={category} className="mb-8">
            <h3 className="text-xl font-semibold mb-4 capitalize dark:text-white">
              {category}
            </h3>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {categoryHabits.map((habit) => (
                <div
                  key={habit.id}
                  className="relative p-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
                  style={{
                    backgroundColor: habit.completed ? `${habit.color}33` : 'white',
                    borderLeft: `4px solid ${habit.color}`,
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl">{habit.emoji}</span>
                        <h4 className="text-lg font-semibold dark:text-white">
                          {habit.name}
                        </h4>
                      </div>
                      
                      <div className="mt-2 space-y-1">
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {habit.description}
                        </p>
                        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                          <span>{habit.frequency}</span>
                          <span>•</span>
                          <span>
                            {getDifficultyEmoji(habit.difficulty)} {habit.difficulty}
                          </span>
                          {habit.goal && (
                            <>
                              <span>•</span>
                              <span>Goal: {habit.goal}</span>
                            </>
                          )}
                        </div>
                        {habit.reminderTime && (
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            🔔 Reminder: {habit.reminderTime}
                          </div>
                        )}
                        {habit.streak > 0 && (
                          <div className="text-sm font-semibold text-orange-500">
                            🔥 {habit.streak} {habit.streak === 1 ? 'day' : 'days'} streak!
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onToggleComplete(habit.id)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                          habit.completed
                            ? 'bg-green-500 text-white hover:bg-green-600'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {habit.completed ? '✓ Done' : 'Mark Done'}
                      </button>
                      <button
                        onClick={() => onEditHabit(habit)}
                        className="px-3 py-1 rounded-full text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
                      >
                        Edit
                      </button>
                    </div>
                    <button
                      onClick={() => onDeleteHabit(habit.id)}
                      className="p-1 text-red-500 hover:text-red-700 transition-colors duration-200"
                      title="Delete habit"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default HabitList;
