'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAlert } from '@/app/contexts/alertContext';
import { PaymentPlanInterface, IntervalType } from '../../types';
import { createPaymentPlan } from '../../services/payments-services';
import { usePaymentPlanForm } from './useFleetForm';

interface FormLibraryProps {
  editData?: PaymentPlanInterface | null; // Add prop for edit data
  isEdit?: boolean;
  paymentPlanId?: number | null;
}

export default function FormLibrary({ editData, isEdit, paymentPlanId }: FormLibraryProps) {
  const router = useRouter();
  const [isEditing] = useState(!!editData); // Determine if in edit mode
  const { alert } = useAlert();

  const [formData, setFormData] = useState({
    name: editData?.name || '',
    total_amount: editData?.total_amount || 0,
    interval_type: (editData?.interval_type as IntervalType) || 'monthly',
    interval_amount: editData?.interval_amount || 0,
  });

  const INTERVAL_TYPE_OPTIONS: { value: IntervalType; label: string }[] = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'total_amount' || name === 'interval_amount'
        ? Number(value) // Convert to number explicitly
        : value,
    }));
  };

  const { handleSubmit, isLoading, error } = usePaymentPlanForm({
    isEdit,
    paymentPlanId,
    onSuccess: () => {
      alert({ 
        text: `Payment Plan ${isEdit ? 'Updated' : 'Created'} Successfully`, 
        type: "success" 
      });
      router.push('/payments/payment-plans');
    },
    onError: (errorMessage) => {
      alert({ 
        text: errorMessage || 'An error occurred', 
        type: "error" 
      });
    }
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit(formData); // Use the hook's submit handler
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 mb-3"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          <span>Back</span>
        </button>
        <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
          {isEditing ? 'Edit Payment Plan' : 'Create a Payment Plan'}
        </h1>
      </div>
      <form onSubmit={onSubmit}>
        <div className="space-y-8 mt-8">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="name">
                  Payment Plan Name
                </label>
                <input
                  id="name"
                  name="name"
                  className="form-input w-full"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="total_amount">
                  Total Amount
                </label>
                <input
                  id="total_amount"
                  name="total_amount"
                  className="form-input w-full"
                  type="number"
                  step="0.01"
                  value={formData.total_amount}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="interval_type">
                  Interval Type
                </label>
                <select
                  id="interval_type"
                  name="interval_type"
                  className="form-select w-full"
                  value={formData.interval_type}
                  onChange={handleInputChange}
                  required
                >
                  {INTERVAL_TYPE_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="interval_amount">
                  Interval Amount
                </label>
                <input
                  id="interval_amount"
                  name="interval_amount"
                  className="form-input w-full"
                  type="number"
                  step="0.01"
                  value={formData.interval_amount}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div>
              <div className="mt-[25px]">
              <button
    type="submit"
    className="btn bg-green-500 hover:bg-green-600 text-white w-full"
    disabled={isLoading}
  >
    {isLoading ? 'Processing...' : (isEdit ? 'Update Payment Plan' : 'Create Payment Plan')}
  </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}