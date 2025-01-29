import { authenticatedFetch } from "@/lib/utils";
import { DistributorPaymentInterface, PaymentPlanInterface, DeletePaymentPlanResponse, PaymentPlanFormData } from "../types";


export const getDistributorPayments = async (
    distributorId: number
  ): Promise<DistributorPaymentInterface[]> => {
    try {
      return await authenticatedFetch<DistributorPaymentInterface[]>(
        `/api/distributors/${distributorId}/payments/`
      );
    } catch (error) {
      console.error('Error fetching distributor payments:', error);
      throw new Error('An error occurred while fetching distributor payments');
    }
  };

  export const getPaymentPlans = async (): Promise<PaymentPlanInterface[]> => {
    try {
      return await authenticatedFetch<PaymentPlanInterface[]>('/api/payment_plans/');
    } catch (error) {
      console.error('Error fetching payment plans:', error);
      throw new Error('An error occurred while fetching payment plans');
    }
  };

  export const deletePaymentPlan = async (pk: number): Promise<DeletePaymentPlanResponse> => {
    try {
      const url = `/api/payment_plans/${pk}/`;
      const response = await authenticatedFetch<DeletePaymentPlanResponse>(url, {
        method: 'DELETE', 
      });
      return response;
    } catch (error) {
      console.error('Error deleting payment plan:', error);
      throw new Error('An error occurred while deleting the payment plan');
    }
  };

  export const createPaymentPlan = async (
    data: PaymentPlanFormData
  ): Promise<DistributorPaymentInterface[]> => {
    try {
      return await authenticatedFetch<DistributorPaymentInterface[]>(
        '/api/payment_plans/create/',
        {
          method: 'POST',
          body: JSON.stringify(data),
        }
      );
    } catch (error) {
      console.error('Error creating payment plan:', error);
      throw new Error('An error occurred while creating payment plan');
    }
  };

  export const editPaymentPlan = async (pk: number, data: PaymentPlanFormData): Promise<DistributorPaymentInterface[]> => {
    try {
      return await authenticatedFetch<DistributorPaymentInterface[]>(
        `/api/payment_plans/${pk}/`,
        {
          method: 'PUT',
          body: JSON.stringify(data),
        }
      );
    } catch (error) {
      console.error('Error editing payment plan:', error);
      throw new Error('An error occurred while editing payment plan');
    }
  };

  export const getPaymentPlanById = async (pk: number): Promise<PaymentPlanInterface> => {
    try {
      const response = await authenticatedFetch<PaymentPlanInterface>(`/api/payment_plans/${pk}/`);
      return response;
    } catch (error) {
      console.error('Error fetching payment plan by ID:', error);
      throw new Error('An error occurred while fetching payment plan');
    }
  };