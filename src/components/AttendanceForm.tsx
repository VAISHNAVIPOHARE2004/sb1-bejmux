import React, { useState } from 'react';
import { useWorkerContext } from '../context/WorkerContext';
import { Check, X } from 'lucide-react';

const AttendanceForm = () => {
  const { workers, markAttendance } = useWorkerContext();
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Daily Attendance</h2>
      
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="mb-4 p-2 border rounded"
      />

      <div className="space-y-2">
        {workers.map((worker) => (
          <div
            key={worker.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded"
          >
            <div>
              <h3 className="font-semibold">{worker.name}</h3>
              <p className="text-sm text-gray-600">{worker.role}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => markAttendance(worker.id, true)}
                className={`p-2 rounded ${
                  worker.isPresent
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={() => markAttendance(worker.id, false)}
                className={`p-2 rounded ${
                  !worker.isPresent
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceForm;