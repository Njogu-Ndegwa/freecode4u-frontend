'use client'
// components/FormLibrary.tsx
import { useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFleetForm } from './useFleetForm';
import { getDistributorAgents, } from '@/app/(auth)/services/authService';
import { AgentInterface } from '@/app/(auth)/services/authService';
import { useAlert } from '@/app/contexts/alertContext';
import { FleetInterface } from '../../types';

interface FormLibraryProps {
  editData?: FleetInterface | null; // Add prop for edit data
}

export default function FormLibrary({ editData }: FormLibraryProps) {
  const [agents, setAgents] = useState<AgentInterface[]>([])
  const [loadingAgents, setLoadingAgents] = useState(true);
  const router = useRouter();
  const [isEditing] = useState(!!editData); // Determine if in edit mode
  const { alert } = useAlert()

  const [formData, setFormData] = useState({
    name: editData?.name || '',
    description: editData?.description || '',
    assigned_agent_id: editData?.assigned_agent?.id?.toString() || ''
  });


  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const data = await getDistributorAgents();
        setAgents(data);
      } catch (err) {
        console.error('Failed to fetch agents:', err);
      } finally {
        setLoadingAgents(false);
      }
    };

    fetchAgents();
  }, [editData]);

  const { handleSubmit, isLoading, error } = useFleetForm({
    isEdit: isEditing,
    fleetId: editData?.id,
    onSuccess: () => {
      router.push('/inventory/fleets'); // Navigate to fleets list after success
      alert({ text: `Fleet ${isEditing ? 'Updated' : 'Created'} Successfully`, type: "success" })
    },
    onError: () => {
      alert({ text: `There was a problem ${isEditing ? 'Updating' : 'Creating'} the Fleet `, type: "error" })
    }
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
          {isEditing ? 'Edit Fleet' : 'Create a Fleet'}
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
          <div className="grid gap-5 md:grid-cols-2">
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
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="description">
                  Fleet Description
                </label>
                <select
                  id="assigned_agent"
                  name="assigned_agent_id"  // Match the formData property name
                  className="form-select w-full"
                  value={formData.assigned_agent_id}
                  onChange={handleInputChange}  // Use the same handler
                  required
                  disabled={loadingAgents}
                >
                  <option value="">Select an agent</option>
                  {agents.map((agent) => (
                    <option key={agent.id} value={agent.id}>
                      {agent.email}
                    </option>
                  ))}
                </select>
              </div>

            </div>
            <div>
              <div className="mt-[25px]">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`btn bg-green-500 hover:bg-green-600 text-white w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                  {isLoading
                    ? `${isEditing ? 'Updating...' : 'Creating...'}`
                    : `${isEditing ? 'Update' : 'Create'} Fleet`}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}