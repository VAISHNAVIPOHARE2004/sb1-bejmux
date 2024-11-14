import React from 'react';
import { Users, Calendar, DollarSign, ClipboardList } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import { WorkerProvider } from './context/WorkerContext';

function App() {
  return (
    <WorkerProvider>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <Dashboard />
      </div>
    </WorkerProvider>
  );
}

export default App;