export interface Subscription {
  id: string;
  name: string;
  amount: number;
  currency: string;
  frequency: 'monthly' | 'quarterly' | 'annually';
  nextBillingDate: string;
  client?: {
    id: string;
    name: string;
  };
  owner: {
    id: string;
    name: string;
    email: string;
  };
  billingEmail: string;
  status: 'active' | 'cancelled' | 'pending';
  localAmount?: number;
  localCurrency?: string;
  exchangeRate?: number;
}