// hooks/useFleetForm.ts
import { useState } from 'react';
import { ManufacturerFormData, ManufacturerInterface } from '../../types';
import { createManufacturer, editManufacturer } from '../../services/inventoryService';

interface UseManufacturerFormProps {
  isEdit?: boolean;
  manufacturerId?: number | null;
  onSuccess?: (manufacturer: ManufacturerInterface) => void;
  onError?: (error: string) => void;
}

export const useManufacturerForm = ({ 
  isEdit = false, 
  manufacturerId = null,
  onSuccess, 
  onError }: UseManufacturerFormProps = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: ManufacturerFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      let manufacturer: ManufacturerInterface;
      
      if (isEdit && manufacturerId) {
        manufacturer = await editManufacturer(manufacturerId, formData);
      } else {
        manufacturer = await createManufacturer(formData);
      }

      if (onSuccess) {
        onSuccess(manufacturer);
      }
      return manufacturer;
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