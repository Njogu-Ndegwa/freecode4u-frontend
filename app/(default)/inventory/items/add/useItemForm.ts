// hooks/useItemForm.ts
import { useState } from 'react';
import { createItem, updateItem } from '../../services/inventoryService';
import { ItemInterface } from '../../types';

interface UseItemFormProps {
  isEdit?: boolean;
  itemId?: number | null;
  onSuccess?: (item: ItemInterface) => void;
  onError?: (error: string) => void;
}

export const useItemForm = ({ 
  isEdit = false, 
  itemId,
  onSuccess,
  onError 
}: UseItemFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: any) => {
    setIsLoading(true);
    setError(null);

    let item: ItemInterface;

    try {
      if (isEdit && itemId) {
        item = await updateItem(itemId, formData);
      } else {
        item = await createItem(formData);
      }
      
      if (onSuccess) {
        onSuccess(item);
      }

      return item;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSubmit, isLoading, error };
};