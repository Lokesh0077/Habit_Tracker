import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#4CAF50', '#FF5722']; // Green for Completed, Orange for Not Completed

const HabitPieChart = ({ data }) => {
  // Basic styling for the chart container
  const chartContainerStyle = {
    width: '100%',
    height: '300px', // Adjust height as needed
    marginTop: '20px',
  };

  return (
    <div style={chartContainerStyle}>
       <h2 className="text-xl font-bold mb-4 text-center">Completion Rate</h2>
      {data && data.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={(entry) => `${entry.name}: ${entry.value}`} // Custom label format (optional)
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500 text-center">No data to display for this time range.</p>
      )}
    </div>
  );
};

export default HabitPieChart;
