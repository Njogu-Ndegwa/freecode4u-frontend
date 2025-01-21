// hooks/useFleetForm.ts
import { useState } from 'react';
import { ManufacturerFormData, ManufacturerInterface } from '../../types';
import { createManufacturer } from '../../services/inventoryService';

interface UseManufacturerFormProps {
  onSuccess?: (manufacturer: ManufacturerInterface) => void;
  onError?: (error: string) => void;
}

export const useManufacturerForm = ({ onSuccess, onError }: UseManufacturerFormProps = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: ManufacturerFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const manufacturer = await createManufacturer(formData);
      if (onSuccess) {
        onSuccess(manufacturer);
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