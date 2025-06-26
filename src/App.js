import React, { useState, useEffect, useMemo } from 'react';
import HabitForm from './components/HabitForm';
import HabitList from './components/HabitList';
import HabitHeatmap from './components/HabitHeatmap';
import HabitCompletionChart from './components/HabitCompletionChart';
import HabitTrendChart from './components/HabitTrendChart';
import HabitPieChart from './components/HabitPieChart';
import ThemeToggle from './components/ThemeToggle';
import TimeRangeSelector from './components/TimeRangeSelector';
import AchievementBadges from './components/AchievementBadges';
import StatisticsDashboard from './components/StatisticsDashboard';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  const [habits, setHabits] = useState([]); // State to hold the list of habits
  const [editingHabit, setEditingHabit] = useState(null); // State to hold the habit being edited
  const [selectedTimeRange, setSelectedTimeRange] = useState('30days'); // State to track selected time range
  const [activeTab, setActiveTab] = useState('habits'); // New state for tab management

  // Effect to load habits from local storage on initial mount
  useEffect(() => {
    const savedHabits = localStorage.getItem('habits');
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    }
  }, []); // The empty dependency array ensures this effect runs only once on mount

  // Effect to save habits to local storage whenever the 'habits' state changes
  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]); // This effect runs whenever the 'habits' state changes

  // Effect to schedule browser notifications
  useEffect(() => {
    const notificationTimers = {}; // To store timer IDs for cleanup

    habits.forEach(habit => {
      if (habit.reminderTime) {
        const [hours, minutes] = habit.reminderTime.split(':').map(Number);
        const now = new Date();
        const reminderDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);

        // If the reminder time for today has already passed, schedule for tomorrow
        if (reminderDate.getTime() < now.getTime()) {
          reminderDate.setDate(reminderDate.getDate() + 1);
        }

        const timeUntilReminder = reminderDate.getTime() - now.getTime();

        if (timeUntilReminder >= 0) {
          const timerId = setTimeout(() => {
            // Display the notification
            if (Notification.permission === 'granted') {
              new Notification(`Habit Reminder: ${habit.name}`, {
                body: `Time to complete your habit: ${habit.name}`,
                // You can add more options here, like an icon
                // icon: '/path/to/icon.png'
              });
            }
          }, timeUntilReminder);

          // Store the timer ID for cleanup
          notificationTimers[habit.id] = timerId;
        }
      }
    });

    // Cleanup function to clear timers
    return () => {
      Object.values(notificationTimers).forEach(timerId => {
        clearTimeout(timerId);
      });
    };
  }, [habits]); // This effect runs whenever the 'habits' state changes


  // Function to add a new habit to the state
  const addHabit = (habit) => {
    setHabits([...habits, { id: Date.now(), ...habit, completed: false, completionDates: [], reminderTime: null }]); // Added reminderTime
  };

  const toggleHabitComplete = (id) => {
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
        const updatedCompletionDates = habit.completed
          ? habit.completionDates.filter(date => date !== today) // Remove today if marking incomplete
          : [...habit.completionDates, today]; // Add today if marking complete

        return { ...habit, completed: !habit.completed, completionDates: updatedCompletionDates };
      }
      return habit;
    }));
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };

  const handleEditHabitSubmit = (updatedHabit) => {
    setHabits(habits.map(habit => {
      if (habit.id === updatedHabit.id) {
        return { ...habit, ...updatedHabit };
      }
      return habit;
    }));
    setEditingHabit(null); // Exit editing mode
  };

  // Function to start editing a habit
  const startEditing = (habit) => {
    setEditingHabit(habit);
  };

  // Function to request notification permission
  const requestNotificationPermission = () => {
    if ('Notification' in window) {
      Notification.requestPermission()
        .then(permission => {
          if (permission === 'granted') {
            console.log('Notification permission granted.');
            // You could potentially show a welcome notification here
          } else if (permission === 'denied') {
            console.warn('Notification permission denied.');
          }
        })
        .catch(error => {
          console.error('Error requesting notification permission:', error);
        });
    } else {
      console.warn('Browser does not support notifications.');
    }
  };


  const generateHeatmapData = (habits, selectedTimeRange) => {
    const today = new Date();
    let startDate = new Date(today);
    let endDate = new Date(today);
    let numberOfDays = 30;

    switch (selectedTimeRange) {
      case '7days':
        startDate.setDate(today.getDate() - 6);
        numberOfDays = 7;
        break;
      case '30days':
        startDate.setDate(today.getDate() - 29);
        numberOfDays = 30;
        break;
      case 'oneyear':
        startDate.setFullYear(today.getFullYear() - 1);
        // For a year, calculate the number of days accurately
        const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
        numberOfDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1; // Include both start and end day
        break;
      // Add cases for 'custom' range if needed
      default:
        startDate.setDate(today.getDate() - 29);
        numberOfDays = 30;
    }

    const dates = [];
    const dateMap = {};
    for (let i = 0; i < numberOfDays; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const dateString = date.toISOString().split('T')[0];
      dates.push(dateString);
      dateMap[dateString] = i;
    }

    const heatmapData = habits.map(habit => {
      const row = new Array(numberOfDays).fill(0); // Initialize row with 0s based on numberOfDays
      habit.completionDates.forEach(completionDate => {
        const dateIndex = dateMap[completionDate];
        if (dateIndex !== undefined) {
          row[dateIndex] = 1;
        }
      });
      return row;
    });

    return { data: heatmapData, dates: dates.map(date => date.slice(5)) }; // Return data and shortened dates
  };

  const calculateStreak = (habit) => {
    if (!habit.completionDates || habit.completionDates.length === 0) {
      return 0; // No completions, so no streak
    }

    // Sort completion dates in ascending order
    const sortedCompletionDates = habit.completionDates.sort((a, b) => new Date(a) - new Date(b));

    let currentStreak = 0;
    let today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight for accurate date comparison

    // Check if the habit was completed yesterday or today
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const latestCompletionDate = new Date(sortedCompletionDates[sortedCompletionDates.length - 1]);
    latestCompletionDate.setHours(0, 0, 0, 0);

    const isCompletedToday = latestCompletionDate.getTime() === today.getTime();
    const isCompletedYesterday = latestCompletionDate.getTime() === yesterday.getTime();

    if (isCompletedToday || isCompletedYesterday) {
      currentStreak = isCompletedToday ? 1 : 0; // Start streak calculation if completed today or yesterday

      // Iterate backward from the second to last completion date
      for (let i = sortedCompletionDates.length - (isCompletedToday ? 2 : 1); i >= 0; i--) {
        const currentDate = new Date(sortedCompletionDates[i]);
        currentDate.setHours(0, 0, 0, 0);

        const previousDate = new Date(sortedCompletionDates[i + 1]);
        previousDate.setHours(0, 0, 0, 0);

        // Calculate the difference in days
        const timeDiff = Math.abs(previousDate.getTime() - currentDate.getTime());
        const diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          currentStreak++; // Consecutive day
        } else if (diffDays > 1) {
          break; // Gap in streak
        }
        // If diffDays is 0, it's a duplicate date, continue
      }
    }

    return currentStreak;
  };

  const generateChartData = (habits, selectedTimeRange) => {
    const today = new Date();
    let startDate = new Date(today);
    let endDate = new Date(today);

    switch (selectedTimeRange) {
      case '7days':
        startDate.setDate(today.getDate() - 6);
        break;
      case '30days':
        startDate.setDate(today.getDate() - 29);
        break;
      case 'oneyear':
        startDate.setFullYear(today.getFullYear() - 1);
        break;
      // Add cases for 'custom' range if needed
      default:
        startDate.setDate(today.getDate() - 29);
    }

    // Format dates for comparison (YYYY-MM-DD)
    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = endDate.toISOString().split('T')[0];

    const chartData = habits.map(habit => {
      // Count completions within the selected time range
      const completionCount = habit.completionDates.filter(date => {
        // Check if the completion date is within the selected range
        return date >= formattedStartDate && date <= formattedEndDate;
      }).length;

      return {
        name: habit.name,
        completions: completionCount,
      };
    });

    return chartData;
  };

  const generateTrendChartData = (habits, selectedTimeRange) => {
    const today = new Date();
    let startDate = new Date(today);
    let endDate = new Date(today);
    let numberOfDays = 30; // Default for 30 days

    switch (selectedTimeRange) {
      case '7days':
        startDate.setDate(today.getDate() - 6);
        numberOfDays = 7;
        break;
      case '30days':
        startDate.setDate(today.getDate() - 29);
        numberOfDays = 30;
        break;
      case 'oneyear':
        startDate.setFullYear(today.getFullYear() - 1);
        // For a year, calculate the number of days accurately
        const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
        numberOfDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1; // Include both start and end day
        break;
      // Add cases for 'custom' range if needed
      default:
        startDate.setDate(today.getDate() - 29);
        numberOfDays = 30;
    }

    const dateDataMap = {}; // Map dates to total completions on that day

    // Initialize dateDataMap with all dates in the range and 0 completions
    for (let i = 0; i < numberOfDays; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const dateString = date.toISOString().split('T')[0];
      dateDataMap[dateString] = { date: dateString.slice(5), completions: 0 }; // Use shortened date for label
    }

    // Count total completions per day across all habits
    habits.forEach(habit => {
      habit.completionDates.forEach(completionDate => {
        // Check if the completion date is within the selected range
        if (completionDate >= startDate.toISOString().split('T')[0] && completionDate <= endDate.toISOString().split('T')[0]) {
          if (dateDataMap[completionDate]) {
            dateDataMap[completionDate].completions++;
          }
        }
      });
    });

    // Convert dateDataMap to an array sorted by date
    const trendChartData = Object.values(dateDataMap).sort((a, b) => new Date(a.date) - new Date(b.date));

    return trendChartData;
  };

  const generatePieChartData = (habits, selectedTimeRange) => {
    const today = new Date();
    let startDate = new Date(today);
    let endDate = new Date(today);
    let numberOfDays = 0; // To calculate total possible completions

    switch (selectedTimeRange) {
      case '7days':
        startDate.setDate(today.getDate() - 6);
        numberOfDays = 7;
        break;
      case '30days':
        startDate.setDate(today.getDate() - 29);
        numberOfDays = 30;
        break;
      case 'oneyear':
        startDate.setFullYear(today.getFullYear() - 1);
        const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
        numberOfDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;
        break;
      // Add cases for 'custom' range if needed
      default:
        startDate.setDate(today.getDate() - 29);
        numberOfDays = 30;
    }

    // Format dates for comparison (YYYY-MM-DD)
    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = endDate.toISOString().split('T')[0];

    let totalCompletions = 0;
    let totalPossibleCompletions = 0;

    habits.forEach(habit => {
      // Count completions within the selected time range
      const completionsInRange = habit.completionDates.filter(date => {
        return date >= formattedStartDate && date <= formattedEndDate;
      }).length;

      totalCompletions += completionsInRange;

      // For simplicity, assuming all habits are daily for calculating possible completions in the range.
      // In a real app, you would consider habit frequency and creation date.
      totalPossibleCompletions += numberOfDays;
    });

    const totalUncompleted = totalPossibleCompletions - totalCompletions;

    const pieChartData = [
      { name: 'Completed', value: totalCompletions },
      { name: 'Not Completed', value: totalUncompleted > 0 ? totalUncompleted : 0 }, // Ensure non-negative
    ];

    return pieChartData;
  };


  const habitsWithStreaks = useMemo(() => {
    return habits.map(habit => ({
      ...habit,
      streak: calculateStreak(habit),
    }));
  }, [habits]);


  const heatmapData = useMemo(() => generateHeatmapData(habits, selectedTimeRange), [habits, selectedTimeRange]);
  const chartData = useMemo(() => generateChartData(habits, selectedTimeRange), [habits, selectedTimeRange]); // Generate bar chart data
  const trendChartData = useMemo(() => generateTrendChartData(habits, selectedTimeRange), [habits, selectedTimeRange]); // Generate trend chart data
  const pieChartData = useMemo(() => generatePieChartData(habits, selectedTimeRange), [habits, selectedTimeRange]); // Generate pie chart data


  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
            Habit Tracker
          </h1>
          
          {/* Notification Permission Button */}
          <div className="flex justify-center mb-8">
            <button
              onClick={requestNotificationPermission}
              className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-full transition-colors duration-200 flex items-center space-x-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span>Enable Notifications</span>
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-full shadow-md p-1">
              <button
                onClick={() => setActiveTab('habits')}
                className={`px-6 py-2 rounded-full transition-colors duration-200 ${
                  activeTab === 'habits'
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Habits
              </button>
              <button
                onClick={() => setActiveTab('statistics')}
                className={`px-6 py-2 rounded-full transition-colors duration-200 ${
                  activeTab === 'statistics'
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Statistics
              </button>
            </div>
          </div>

          {/* Time Range Selector */}
          <TimeRangeSelector
            selectedTimeRange={selectedTimeRange}
            onTimeRangeChange={setSelectedTimeRange}
          />
          
          {activeTab === 'habits' ? (
            <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
              <div className="space-y-8">
                <HabitForm
                  onAddHabit={addHabit}
                  editingHabit={editingHabit}
                  onEditHabitSubmit={handleEditHabitSubmit}
                />
                <HabitList
                  habits={habits}
                  onToggleComplete={toggleHabitComplete}
                  onDeleteHabit={deleteHabit}
                  onEditHabit={startEditing}
                />
                <AchievementBadges habits={habits} />
              </div>
              
              <div className="space-y-8">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                  <HabitHeatmap
                    data={generateHeatmapData(habits, selectedTimeRange).data}
                    dates={generateHeatmapData(habits, selectedTimeRange).dates}
                    habitLabels={habits.map(h => h.name)}
                  />
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                  <HabitCompletionChart
                    data={generateChartData(habits, selectedTimeRange)}
                  />
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                  <HabitTrendChart
                    data={generateTrendChartData(habits, selectedTimeRange)}
                  />
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                  <HabitPieChart
                    data={generatePieChartData(habits, selectedTimeRange)}
                  />
                </div>
              </div>
            </div>
          ) : (
            <StatisticsDashboard
              habits={habits}
              selectedTimeRange={selectedTimeRange}
            />
          )}
        </div>
        <ThemeToggle />
      </div>
    </ThemeProvider>
  );
}

export default App;
