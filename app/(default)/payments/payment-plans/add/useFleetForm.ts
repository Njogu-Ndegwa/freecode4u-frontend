'use client';

import { useState } from 'react';
import { PaymentPlanFormData, DistributorPaymentInterface } from '../../types';
import { createPaymentPlan, editPaymentPlan } from '../../services/payments-services';

interface UsePaymentPlanFormProps {
  isEdit?: boolean;
  paymentPlanId?: number | null;
  onSuccess?: (paymentPlan: DistributorPaymentInterface[]) => void;
  onError?: (error: string) => void;
}

export const usePaymentPlanForm = ({ 
  isEdit = false, 
  paymentPlanId = null,
  onSuccess,
  onError 
}: UsePaymentPlanFormProps = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: PaymentPlanFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      let paymentPlan: DistributorPaymentInterface[];

      if (isEdit && paymentPlanId) {
        paymentPlan = await editPaymentPlan(paymentPlanId, formData);
      } else {
        paymentPlan = await createPaymentPlan(formData);
      }
      if (onSuccess) {
        onSuccess(paymentPlan);
      }
      return paymentPlan;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      if (onError) {
        onError(errorMessage);
      }
      throw err; // Re-throw error for component-level handling
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleSubmit,
    isLoading,
    error,
  };
};