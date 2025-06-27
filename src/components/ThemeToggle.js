import React from 'react';
import { motion } from 'framer-motion';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { SunIcon as SunIconSolid, MoonIcon as MoonIconSolid } from '@heroicons/react/24/solid';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 p-3 rounded-full shadow-lg bg-white dark:bg-gray-800 text-yellow-500 dark:text-blue-400"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
      >
        {theme === 'dark' ? (
          <MoonIconSolid className="w-6 h-6" />
        ) : (
          <SunIconSolid className="w-6 h-6" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle; 