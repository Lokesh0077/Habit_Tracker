import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';

const HabitCompletionChart = ({ data }) => {
  // Basic styling for the chart container
  const chartContainerStyle = {
    width: '100%',
    height: '300px', // Adjust height as needed
    marginTop: '20px',
  };

  return (
    <div style={chartContainerStyle}>
      <h2 className="text-xl font-bold mb-4 text-center">Habit Completions</h2>
      {data && data.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data} // Use the data prop here
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" /> {/* Uncomment for a grid */}
            <XAxis dataKey="name" /> {/* Display habit names on X-axis */}
            <YAxis /> {/* Y-axis for completion count */}
            <Tooltip />
            <Legend />
            <Bar dataKey="completions" fill="#8884d8" name="Completions" /> {/* Bar for completion count */}
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500 text-center">No data to display for this time range.</p>
      )}
    </div>
  );
};

export default HabitCompletionChart;
