import React from 'react';

const TimeRangeSelector = ({ selectedTimeRange, onTimeRangeChange }) => {
  const timeRanges = [
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: 'oneyear', label: 'Last Year' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-8">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
        Time Range
      </h3>
      <div className="flex flex-wrap gap-2">
        {timeRanges.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onTimeRangeChange(value)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
              ${
                selectedTimeRange === value
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
              }
            `}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeRangeSelector; 