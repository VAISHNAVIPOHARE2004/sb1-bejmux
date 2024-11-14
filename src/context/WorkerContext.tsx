import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Worker {
  id: string;
  name: string;
  role: string;
  dailyWage: number;
  isPresent: boolean;
  pendingAmount: number;
}

interface WorkerContextType {
  workers: Worker[];
  addWorker: (worker: Worker) => void;
  removeWorker: (id: string) => void;
  markAttendance: (id: string, present: boolean) => void;
  recordPayment: (id: string, amount: number) => void;
}

const WorkerContext = createContext<WorkerContextType | undefined>(undefined);

export const WorkerProvider = ({ children }: { children: ReactNode }) => {
  const [workers, setWorkers] = useState<Worker[]>([]);

  const addWorker = (worker: Worker) => {
    setWorkers([...workers, worker]);
  };

  const removeWorker = (id: string) => {
    setWorkers(workers.filter(w => w.id !== id));
  };

  const markAttendance = (id: string, present: boolean) => {
    setWorkers(workers.map(worker => {
      if (worker.id === id) {
        const pendingAmount = present 
          ? worker.pendingAmount + worker.dailyWage 
          : worker.pendingAmount;
        return { ...worker, isPresent: present, pendingAmount };
      }
      return worker;
    }));
  };

  const recordPayment = (id: string, amount: number) => {
    setWorkers(workers.map(worker => {
      if (worker.id === id) {
        return { ...worker, pendingAmount: worker.pendingAmount - amount };
      }
      return worker;
    }));
  };

  return (
    <WorkerContext.Provider value={{ 
      workers, 
      addWorker, 
      removeWorker, 
      markAttendance, 
      recordPayment 
    }}>
      {children}
    </WorkerContext.Provider>
  );
};

export const useWorkerContext = () => {
  const context = useContext(WorkerContext);
  if (context === undefined) {
    throw new Error('useWorkerContext must be used within a WorkerProvider');
  }
  return context;
};