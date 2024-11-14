import React, { useState } from 'react';
import { useWorkerContext } from '../context/WorkerContext';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const WorkerList = () => {
  const { workers, addWorker, removeWorker } = useWorkerContext();
  const [newWorker, setNewWorker] = useState({ name: '', role: '', dailyWage: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newWorker.name && newWorker.role && newWorker.dailyWage) {
      addWorker({
        ...newWorker,
        id: Date.now().toString(),
        dailyWage: parseFloat(newWorker.dailyWage),
        isPresent: false,
        pendingAmount: 0,
      });
      setNewWorker({ name: '', role: '', dailyWage: '' });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Workers</h2>
      
      <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Worker Name"
          className="flex-1 p-2 border rounded"
          value={newWorker.name}
          onChange={(e) => setNewWorker({ ...newWorker, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Role"
          className="flex-1 p-2 border rounded"
          value={newWorker.role}
          onChange={(e) => setNewWorker({ ...newWorker, role: e.target.value })}
        />
        <input
          type="number"
          placeholder="Daily Wage"
          className="w-24 p-2 border rounded"
          value={newWorker.dailyWage}
          onChange={(e) => setNewWorker({ ...newWorker, dailyWage: e.target.value })}
        />
        <button
          type="submit"
          className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          <Plus className="w-5 h-5" />
        </button>
      </form>

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
            <div className="flex items-center gap-4">
              <span className="text-green-600 font-semibold">₹{worker.dailyWage}/day</span>
              <button
                onClick={() => removeWorker(worker.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkerList;