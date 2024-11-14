import React from 'react';
import { useWorkerContext } from '../context/WorkerContext';
import WorkerList from './WorkerList';
import AttendanceForm from './AttendanceForm';
import PaymentSection from './PaymentSection';

const Dashboard = () => {
  const { workers } = useWorkerContext();

  return (
    <div className="flex-1 overflow-auto p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome to FarmTracker</h1>
        <p className="text-gray-600">Manage your farm workers efficiently</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Total Workers</h3>
          <p className="text-3xl font-bold text-green-600">{workers.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Present Today</h3>
          <p className="text-3xl font-bold text-blue-600">
            {workers.filter(w => w.isPresent).length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Pending Payments</h3>
          <p className="text-3xl font-bold text-red-600">
            ₹{workers.reduce((acc, curr) => acc + (curr.pendingAmount || 0), 0)}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <WorkerList />
          <PaymentSection />
        </div>
        <AttendanceForm />
      </div>
    </div>
  );
};

export default Dashboard;