export interface PaymentPlanInterface {
    id: number;
    name: string;
    total_amount: string;
    interval_type: string;
    interval_amount: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface Item {
    id: number;
    serial_number: string;
  }
  
  export interface CustomerInterface {
    id: number;
    name: string;
    email: string;
    phone_number: string;
    created_at: string;
    distributor: number;
    assigned_agent: number;
  }
  
  export interface DistributorPaymentInterface {
    id: number;
    payment_plan: PaymentPlanInterface;
    item: Item;
    amount_paid: string;
    paid_at: string;
    customer: CustomerInterface;
    note: string;
  }

  export interface DeletePaymentPlanResponse {
    message: string;
  }

  export type IntervalType = 'daily' | 'weekly' | 'monthly' | 'yearly';

  export interface PaymentPlanFormData {
    name: string;
    total_amount: number | string;
    interval_type: IntervalType;
    interval_amount: number | string;
  }

  