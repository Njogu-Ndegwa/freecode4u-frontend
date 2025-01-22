'use client'
// components/FormLibrary.tsx
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useManufacturerForm } from './useManufacturersForm';
import { ManufacturerInterface } from '../../types';
import { useAlert } from '@/app/contexts/alertContext';

// export const metadata = {
//   title: 'Form - Mosaic',
//   description: 'Page description',
// };

interface FormLibraryProps {
  editData?: ManufacturerInterface | null; // Add prop for edit data
}


export default function FormLibrary({ editData }: FormLibraryProps) {
  const router = useRouter();
  const [isEditing] = useState(!!editData);
  const { alert } = useAlert()
  const [formData, setFormData] = useState({
    name: editData?.name || '',
    description: editData?.description || '',
  });

  const { handleSubmit, isLoading, error } = useManufacturerForm({
    isEdit: isEditing,
    manufacturerId: editData?.id,
    onSuccess: () => {
      router.push('/inventory/manufacturers'); // Navigate to manufacturers list after success
      alert({ text: `Manufacturer ${isEditing ? 'Updated' : 'Created'} Successfully`, type: "success" })
    },
    onError: () => {
      alert({ text: `There was a problem ${isEditing ? 'Updating' : 'Creating'} the Manufacturer `, type: "error" })
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit(formData);
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
          Create a Manufacturer
        </h1>
      </div>

      <form onSubmit={onSubmit}>
        {error && (
        //   <Alert variant="destructive" className="mb-6">
        //     <AlertDescription>{error}</AlertDescription>
        //   </Alert>
        <div>Error!!</div>
        )}

        <div className="space-y-8 mt-8">
          <div className="grid gap-5 md:grid-cols-3">
            <div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="name">
                  Manufacturer Name
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
                <label className="block text-sm font-medium mb-1" htmlFor="description">
                  Manufacturer Description
                </label>
                <input
                  id="description"
                  name="description"
                  className="form-input w-full"
                  type="text"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div>
              <div className="mt-[25px]">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`btn bg-green-500 hover:bg-green-600 text-white w-full ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                               {isLoading
                    ? `${isEditing ? 'Updating...' : 'Creating...'}`
                    : `${isEditing ? 'Update' : 'Create'} Manufacturer`}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}