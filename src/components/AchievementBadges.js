import React from 'react';

const badges = {
  streakBadges: [
    { id: 'streak-7', name: '7 Day Streak', emoji: '🔥', requirement: 7 },
    { id: 'streak-30', name: '30 Day Streak', emoji: '🌟', requirement: 30 },
    { id: 'streak-100', name: '100 Day Streak', emoji: '💫', requirement: 100 },
  ],
  completionBadges: [
    { id: 'completion-10', name: '10 Completions', emoji: '🎯', requirement: 10 },
    { id: 'completion-50', name: '50 Completions', emoji: '🎪', requirement: 50 },
    { id: 'completion-100', name: '100 Completions', emoji: '🏆', requirement: 100 },
  ],
  habitBadges: [
    { id: 'habits-3', name: '3 Active Habits', emoji: '🌱', requirement: 3 },
    { id: 'habits-5', name: '5 Active Habits', emoji: '🌿', requirement: 5 },
    { id: 'habits-10', name: 'Habit Master', emoji: '🌳', requirement: 10 },
  ],
};

const AchievementBadge = ({ badge, earned, progress }) => {
  const progressPercentage = Math.min((progress / badge.requirement) * 100, 100);

  return (
    <div className={`relative p-4 rounded-lg ${earned ? 'bg-primary-100 dark:bg-primary-900' : 'bg-gray-100 dark:bg-gray-800'}`}>
      <div className="flex items-center space-x-3">
        <span className="text-2xl">{badge.emoji}</span>
        <div className="flex-1">
          <h4 className={`font-medium ${earned ? 'text-primary-700 dark:text-primary-300' : 'text-gray-500 dark:text-gray-400'}`}>
            {badge.name}
          </h4>
          <div className="mt-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                earned ? 'bg-primary-500' : 'bg-gray-400'
              }`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
            {progress} / {badge.requirement}
          </p>
        </div>
        {earned && (
          <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

const AchievementBadges = ({ habits }) => {
  // Calculate achievements
  const calculateAchievements = () => {
    const achievements = {
      streaks: {},
      completions: {},
      habitCount: habits.length,
    };

    habits.forEach(habit => {
      // Calculate streak achievements
      if (habit.streak >= 7) achievements.streaks['streak-7'] = true;
      if (habit.streak >= 30) achievements.streaks['streak-30'] = true;
      if (habit.streak >= 100) achievements.streaks['streak-100'] = true;

      // Calculate completion achievements
      const completions = habit.completionDates.length;
      if (completions >= 10) achievements.completions['completion-10'] = true;
      if (completions >= 50) achievements.completions['completion-50'] = true;
      if (completions >= 100) achievements.completions['completion-100'] = true;
    });

    return achievements;
  };

  const achievements = calculateAchievements();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">
        Achievements & Badges
      </h3>

      <div className="space-y-6">
        {/* Streak Badges */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">
            Streak Badges
          </h4>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {badges.streakBadges.map(badge => (
              <AchievementBadge
                key={badge.id}
                badge={badge}
                earned={achievements.streaks[badge.id]}
                progress={Math.max(...habits.map(h => h.streak || 0))}
              />
            ))}
          </div>
        </div>

        {/* Completion Badges */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">
            Completion Badges
          </h4>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {badges.completionBadges.map(badge => (
              <AchievementBadge
                key={badge.id}
                badge={badge}
                earned={achievements.completions[badge.id]}
                progress={Math.max(...habits.map(h => h.completionDates.length))}
              />
            ))}
          </div>
        </div>

        {/* Habit Count Badges */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">
            Habit Badges
          </h4>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {badges.habitBadges.map(badge => (
              <AchievementBadge
                key={badge.id}
                badge={badge}
                earned={achievements.habitCount >= badge.requirement}
                progress={achievements.habitCount}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementBadges; 