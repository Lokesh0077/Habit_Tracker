import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';

const HabitTrendChart = ({ data }) => {
  // Basic styling for the chart container
  const chartContainerStyle = {
    width: '100%',
    height: '300px', // Adjust height as needed
    marginTop: '20px',
  };

  return (
    <div style={chartContainerStyle}>
       <h2 className="text-xl font-bold mb-4 text-center">Habit Completion Trend</h2>
      {data && data.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data} // Use the data prop here
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" /> {/* Uncomment for a grid */}
            <XAxis dataKey="date" /> {/* Display dates on X-axis */}
            <YAxis /> {/* Y-axis for total completion count */}
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="completions" stroke="#8884d8" name="Total Completions" /> {/* Line for total completions */}
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500 text-center">No data to display for this time range.</p>
      )}
    </div>
  );
};

export default HabitTrendChart;
