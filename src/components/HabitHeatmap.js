import React from 'react';
import { HeatmapGrid } from 'react-heatmap-grid';

const HabitHeatmap = ({ data, dates, habitLabels }) => {
  // Basic styling for the heatmap container
  const containerStyle = {
    width: '100%',
    overflowX: 'auto', // Add horizontal scroll if needed
    paddingBottom: '10px', // Add some space for the scrollbar
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4 text-center">Habit Completion Heatmap</h2>
      <div style={containerStyle}>
        {data && data.length > 0 && dates && dates.length > 0 && habitLabels && habitLabels.length > 0 ? (
          <HeatmapGrid
            data={data}
            xLabels={dates}
            yLabels={habitLabels}
            // Customize colors and other appearance options here
            cellRender={(x, y, value) => {
              const habitName = habitLabels[y]; // Get the habit name using the y-coordinate
              const date = dates[x]; // Get the date using the x-coordinate
              const completionStatus = value === 1 ? 'Completed' : 'Not Completed';
              const tooltipText = `${habitName} on ${date}: ${completionStatus}`;

              return (
                <div title={tooltipText}>
                  {/* You can optionally render something inside the cell, like a checkmark or an empty circle */}
                  {/* {value === 1 ? '✓' : ''} */}
                </div>
              );
            }}
            cellStyle={(x, y, value) => ({
              background: value === 1 ? '#4CAF50' : '#EEEEEE', // Green for completed, light gray for not completed
              // Example with a slightly different completed color:
              // background: value === 1 ? '#66BB6A' : '#EEEEEE',
              // Example with more distinction:
              // background: value === 1 ? '#2E7D32' : '#E0E0E0',
              borderRadius: '4px',
              // Example border:
              // border: '1px solid #CCCCCC',
            })}
            cellHeight="25px" // Adjust cell height as needed
            xLabelsStyle={() => ({ fontSize: '.65rem', textTransform: 'uppercase' })}
            yLabelsStyle={() => ({ fontSize: '.8rem' })}
          />
        ) : (
          <p className="text-gray-500 text-center">Add some habits and mark them as done to see the heatmap.</p>
        )}
      </div>
    </div>
  );
};

export default HabitHeatmap;
