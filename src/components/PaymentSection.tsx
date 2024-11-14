import React, { useState } from 'react';
import { useWorkerContext } from '../context/WorkerContext';
import { DollarSign } from 'lucide-react';

const PaymentSection = () => {
  const { workers, recordPayment } = useWorkerContext();
  const [selectedWorker, setSelectedWorker] = useState('');
  const [amount, setAmount] = useState('');

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedWorker && amount) {
      recordPayment(selectedWorker, parseFloat(amount));
      setSelectedWorker('');
      setAmount('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Record Payment</h2>
      
      <form onSubmit={handlePayment} className="space-y-4">
        <div>
          <select
            value={selectedWorker}
            onChange={(e) => setSelectedWorker(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Worker</option>
            {workers.map((worker) => (
              <option key={worker.id} value={worker.id}>
                {worker.name} (Pending: ₹{worker.pendingAmount})
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="flex-1 p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2"
          >
            <DollarSign className="w-4 h-4" />
            Pay
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentSection;