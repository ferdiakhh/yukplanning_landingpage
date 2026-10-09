export interface DepositItem {
  id: string;
  title: string;
  contributor: 'pria' | 'wanita' | 'bersama';
  contributorName: string;
  date: string;
  amount: number;
}

export interface TaskItem {
  id: string;
  title: string;
  category: string;
  deadline: string;
  isCompleted: boolean;
  priority: 'Tinggi' | 'Sedang' | 'Rendah';
}

export interface VendorItem {
  id: string;
  name: string;
  category: string;
  status: 'Deal' | 'Negosiasi' | 'Riset';
  price: number;
  paidAmount: number;
  contact: string;
}

export interface PlanSimulation {
  totalBudget: number;
  monthsRemaining: number;
  splitRatio: number; // percentage male contributor, e.g. 50
  currentSavings: number;
}
