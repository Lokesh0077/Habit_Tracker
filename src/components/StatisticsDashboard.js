import React from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
} from 'recharts';

const StatisticsDashboard = ({ habits, selectedTimeRange }) => {
  // Calculate success rate per habit
  const calculateSuccessRates = () => {
    return habits.map(habit => {
      const totalDays = habit.completionDates.length;
      const successRate = (totalDays / getTimeRangeDays(selectedTimeRange)) * 100;
      return {
        name: habit.name,
        successRate: Math.round(successRate * 10) / 10,
        completions: totalDays,
      };
    });
  };

  // Calculate best performing days
  const calculateBestDays = () => {
    const dayCount = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    habits.forEach(habit => {
      habit.completionDates.forEach(date => {
        const day = new Date(date).getDay();
        dayCount[day]++;
      });
    });

    return Object.entries(dayCount).map(([day, count]) => ({
      name: dayNames[parseInt(day)],
      completions: count,
    }));
  };

  // Calculate best performing times
  const calculateBestTimes = () => {
    const timeSlots = Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      completions: 0,
    }));

    habits.forEach(habit => {
      if (habit.reminderTime) {
        const hour = parseInt(habit.reminderTime.split(':')[0]);
        timeSlots[hour].completions++;
      }
    });

    return timeSlots.map(slot => ({
      name: `${slot.hour}:00`,
      completions: slot.completions,
    }));
  };

  // Calculate habit correlations
  const calculateHabitCorrelations = () => {
    const correlations = [];
    
    for (let i = 0; i < habits.length; i++) {
      for (let j = i + 1; j < habits.length; j++) {
        const habit1 = habits[i];
        const habit2 = habits[j];
        
        const dates1 = new Set(habit1.completionDates);
        const dates2 = new Set(habit2.completionDates);
        
        const commonDates = [...dates1].filter(date => dates2.has(date));
        const correlation = commonDates.length / Math.sqrt(dates1.size * dates2.size);
        
        correlations.push({
          x: habit1.name,
          y: habit2.name,
          correlation: Math.round(correlation * 100),
        });
      }
    }
    
    return correlations;
  };

  // Helper function to get number of days in selected time range
  const getTimeRangeDays = (range) => {
    switch (range) {
      case '7days':
        return 7;
      case '30days':
        return 30;
      case 'oneyear':
        return 365;
      default:
        return 30;
    }
  };

  const successRates = calculateSuccessRates();
  const bestDays = calculateBestDays();
  const bestTimes = calculateBestTimes();
  const correlations = calculateHabitCorrelations();

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">
          Success Rates
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={successRates}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="successRate" name="Success Rate (%)" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">
            Best Performing Days
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bestDays}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completions" name="Completions" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">
            Best Performing Times
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={bestTimes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="completions"
                  name="Completions"
                  stroke="#ffc658"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">
          Habit Correlations
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" type="category" />
              <YAxis dataKey="y" type="category" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter
                data={correlations}
                fill="#8884d8"
                shape="circle"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          <p>Correlation strength is represented by circle size. Larger circles indicate stronger correlations between habits.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">
          Overall Performance
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={successRates}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name="Success Rate"
                dataKey="successRate"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StatisticsDashboard; 