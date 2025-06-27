import React from 'react';
import { motion } from 'framer-motion';
import { CalendarIcon as CalendarIconSolid } from '@heroicons/react/24/solid';

const TimeRangeSelector = ({ selectedTimeRange, onTimeRangeChange }) => {
  const timeRanges = [
    { id: '7days', label: '7 Days' },
    { id: '30days', label: '30 Days' },
    { id: 'oneyear', label: '1 Year' }
  ];

  return (
    <div className="relative">
      <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-1">
        {timeRanges.map((range) => (
          <motion.button
            key={range.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onTimeRangeChange(range.id)}
            className={`
              relative px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200
              ${selectedTimeRange === range.id
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
              }
            `}
          >
            <span className="flex items-center space-x-1">
              <CalendarIconSolid className="w-4 h-4" />
              <span>{range.label}</span>
            </span>
            {selectedTimeRange === range.id && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute inset-0 bg-blue-500 rounded-lg -z-10"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default TimeRangeSelector; 