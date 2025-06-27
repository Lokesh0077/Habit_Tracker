import React from 'react';
import HeatMap from '@uiw/react-heat-map';

const HabitHeatmap = ({ data, dates, habitLabels }) => {
  // Transform data into the format required by @uiw/react-heat-map
  const transformData = () => {
    const heatmapData = [];
    data.forEach((habitData, habitIndex) => {
      habitData.forEach((value, dateIndex) => {
        if (value === 1) {
          heatmapData.push({
            date: dates[dateIndex],
            count: 1,
            habit: habitLabels[habitIndex]
          });
        }
      });
    });
    return heatmapData;
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4 text-center">Habit Completion Heatmap</h2>
      <div className="overflow-x-auto">
        {data && data.length > 0 && dates && dates.length > 0 && habitLabels && habitLabels.length > 0 ? (
          <div className="space-y-4">
            {habitLabels.map((habit, index) => (
              <div key={habit} className="bg-white p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">{habit}</h3>
                <HeatMap
                  value={transformData().filter(d => d.habit === habit)}
                  width={800}
                  height={100}
                  rectSize={12}
                  startDate={new Date(dates[0])}
                  endDate={new Date(dates[dates.length - 1])}
                  rectProps={{
                    rx: 2,
                  }}
                  legendRender={rect => null}
                  rectColor={value => {
                    return value ? '#4CAF50' : '#EEEEEE';
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">Add some habits and mark them as done to see the heatmap.</p>
        )}
      </div>
    </div>
  );
};

export default HabitHeatmap;
