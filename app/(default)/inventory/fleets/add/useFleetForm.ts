// hooks/useFleetForm.ts
import { useState } from 'react';
import { FleetFormData, FleetInterface } from '../../types';
import { createFleet } from '../../services/inventoryService';

interface UseFleetFormProps {
  onSuccess?: (fleet: FleetInterface) => void;
  onError?: (error: string) => void;
}

export const useFleetForm = ({ onSuccess, onError }: UseFleetFormProps = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FleetFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const fleet = await createFleet(formData);
      if (onSuccess) {
        onSuccess(fleet);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      if (onError) {
        onError(errorMessage);
      }
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