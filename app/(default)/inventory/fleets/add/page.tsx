'use client'
// components/FormLibrary.tsx
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFleetForm } from './useFleetForm';


// export const metadata = {
//   title: 'Form - Mosaic',
//   description: 'Page description',
// };

export default function FormLibrary() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const { handleSubmit, isLoading, error } = useFleetForm({
    onSuccess: () => {
      router.push('/inventory/fleets'); // Navigate to fleets list after success
    },
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
          Create a Fleet
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
                  Fleet Name
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
                  Fleet Description
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
                  {isLoading ? 'Creating...' : 'Create Inventory'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}