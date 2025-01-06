import React, { useState } from 'react';

const Heatmap = ({ startDate, endDate, dataValues = [] }) => {
  let startingDate = new Date(startDate);
  let endingDate = new Date(endDate);

  const daysInMonth = Math.ceil((endingDate - startingDate) / (1000 * 60 * 60 * 24));

  const calendarGrid = Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(startingDate);
    date.setDate(startingDate.getDate() + i);
    return date.toISOString().slice(0, 10);
  });

  const dataMap = dataValues.reduce((map, entry) => {
    map[entry.Date] = entry.Count;
    return map;
  }, {});

  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isBoxSelected, setIsBoxSelected] = useState(false)
  const handleBoxClick = (day) => {
    const dayData = dataValues.find((data) => data.Date === day);
    if (dayData) {
      setTasks(dayData.TasksDone || []);
      setSelectedDate(day);
    } else {
      setTasks([]);
      setSelectedDate(day);
    }
  };

  return (
    <div className="flex flex-col items-center mt-8 space-y-6 w-full">
      {/* Task Display Area */}
      {isBoxSelected && (
        <div className="w-full max-w-3xl bg-gray-800 text-white rounded-lg p-4 shadow-lg">
          <h2 className="text-xl font-semibold border-b border-gray-700 pb-2 mb-4">
            Tasks you did on {selectedDate}
          </h2>
          <ul className="space-y-2 max-h-48 overflow-y-auto">
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <li
                  key={index}
                  className="p-2 rounded bg-gray-700 hover:bg-gray-600 transition"
                >
                  {task?.Task}
                </li>
              ))
            ) : (
              <p className="text-gray-400">No tasks available for this day.</p>
            )}
          </ul>
        </div>
      )}

      {/* Heatmap */}
      <div className="grid grid-cols-[repeat(18,minmax(0,1fr))] gap-2 w-full ">
        {calendarGrid.map((day, index) => {
          const intensity = dataMap[day] || 0;
          const bgColor =
          intensity > 10 ? 'bg-yellow-900' : intensity > 7 ? 'bg-yellow-800' : intensity > 6 ? 'bg-yellow-700' :  intensity > 5 ? 'bg-yellow-600' : intensity > 3 ? 'bg-yellow-300' : intensity > 2 ? 'bg-yellow-200' : intensity > 1 ? 'bg-yellow-100' : 'bg-white';
          const borderStyle = selectedDate === day ? 'border-2 border-white' : '';

          return (
            <span
              key={index}
              className={`w-6 h-6 rounded cursor-pointer transition-transform transform hover:scale-110 ${bgColor} ${borderStyle}`}
              title={`${dataMap[day] || 0} tasks done on ${day}`}
              onClick={() => {handleBoxClick(day)
                setIsBoxSelected(!isBoxSelected)
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Heatmap;
