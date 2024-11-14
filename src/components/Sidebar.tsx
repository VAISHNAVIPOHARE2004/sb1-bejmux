import React from 'react';
import { Users, Calendar, DollarSign, ClipboardList, Home } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-green-800 text-white p-6">
      <div className="flex items-center gap-2 mb-8">
        <ClipboardList className="w-8 h-8" />
        <h1 className="text-xl font-bold">FarmTracker</h1>
      </div>
      
      <nav>
        <ul className="space-y-4">
          {[
            { icon: Home, text: 'Dashboard' },
            { icon: Users, text: 'Workers' },
            { icon: Calendar, text: 'Attendance' },
            { icon: DollarSign, text: 'Payments' },
          ].map((item, index) => (
            <li key={index}>
              <button className="flex items-center gap-3 p-2 w-full hover:bg-green-700 rounded-lg transition-colors">
                <item.icon className="w-5 h-5" />
                <span>{item.text}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;