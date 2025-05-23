export interface Quote {
  id: string;
  name: string;
  email: string;
  phone: string;
  origin?: string;
  destination?: string;
  moveDate: string;
  serviceType: string;
  message?: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
}