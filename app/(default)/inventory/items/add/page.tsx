// 'use client'
// // components/FormLibrary.tsx
// import { useEffect } from 'react';
// import { ChevronLeft } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';
// import { useFleetForm } from './useFleetForm';
// import { getDistributorAgents, } from '@/app/(auth)/services/authService';
// import { AgentInterface } from '@/app/(auth)/services/authService';
// import { useAlert } from '@/app/contexts/alertContext';
// import { FleetInterface } from '../../types';

// interface FormLibraryProps {
//   editData?: FleetInterface | null; // Add prop for edit data
// }

// export default function FormLibrary({ editData }: FormLibraryProps) {
//   const [agents, setAgents] = useState<AgentInterface[]>([])
//   const [loadingAgents, setLoadingAgents] = useState(true);
//   const router = useRouter();
//   const [isEditing] = useState(!!editData); // Determine if in edit mode
//   const { alert } = useAlert()

//   const [formData, setFormData] = useState({
//     name: editData?.name || '',
//     description: editData?.description || '',
//     assigned_agent_id: editData?.assigned_agent?.id?.toString() || ''
//   });


//   useEffect(() => {
//     const fetchAgents = async () => {
//       try {
//         const data = await getDistributorAgents();
//         setAgents(data);
//       } catch (err) {
//         console.error('Failed to fetch agents:', err);
//       } finally {
//         setLoadingAgents(false);
//       }
//     };

//     fetchAgents();
//   }, [editData]);

//   const { handleSubmit, isLoading, error } = useFleetForm({
//     isEdit: isEditing,
//     fleetId: editData?.id,
//     onSuccess: () => {
//       router.push('/inventory/fleets'); // Navigate to fleets list after success
//       alert({ text: `Fleet ${isEditing ? 'Updated' : 'Created'} Successfully`, type: "success" })
//     },
//     onError: () => {
//       alert({ text: `There was a problem ${isEditing ? 'Updating' : 'Creating'} the Fleet `, type: "error" })
//     }
//   });

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const onSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     await handleSubmit(formData);
//   };

//   return (
//     <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
//       <div className="mb-8">
//         <button
//           onClick={() => router.back()}
//           className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 mb-3"
//         >
//           <ChevronLeft className="w-4 h-4 mr-1" />
//           <span>Back</span>
//         </button>
//         <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
//           {isEditing ? 'Edit Fleet' : 'Create a Fleet'}
//         </h1>
//       </div>

//       <form onSubmit={onSubmit}>
//         {error && (
//           //   <Alert variant="destructive" className="mb-6">
//           //     <AlertDescription>{error}</AlertDescription>
//           //   </Alert>
//           <div>Error!!</div>
//         )}

//         <div className="space-y-8 mt-8">
//           <div className="grid gap-5 md:grid-cols-2">
//             <div>
//               <div>
//                 <label className="block text-sm font-medium mb-1" htmlFor="name">
//                   Fleet Name
//                 </label>
//                 <input
//                   id="name"
//                   name="name"
//                   className="form-input w-full"
//                   type="text"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//             </div>

//             <div>
//               <div>
//                 <label className="block text-sm font-medium mb-1" htmlFor="description">
//                   Fleet Description
//                 </label>
//                 <input
//                   id="description"
//                   name="description"
//                   className="form-input w-full"
//                   type="text"
//                   value={formData.description}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//             </div>
//             <div>
//               <div>
//                 <label className="block text-sm font-medium mb-1" htmlFor="description">
//                   Fleet Description
//                 </label>
//                 <select
//                   id="assigned_agent"
//                   name="assigned_agent_id"  // Match the formData property name
//                   className="form-select w-full"
//                   value={formData.assigned_agent_id}
//                   onChange={handleInputChange}  // Use the same handler
//                   required
//                   disabled={loadingAgents}
//                 >
//                   <option value="">Select an agent</option>
//                   {agents.map((agent) => (
//                     <option key={agent.id} value={agent.id}>
//                       {agent.email}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//             </div>
//             <div>
//               <div className="mt-[25px]">
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className={`btn bg-green-500 hover:bg-green-600 text-white w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
//                     }`}
//                 >
//                   {isLoading
//                     ? `${isEditing ? 'Updating...' : 'Creating...'}`
//                     : `${isEditing ? 'Update' : 'Create'} Fleet`}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }

'use client'
import { useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useItemForm } from './useItemForm';
import { getManufacturers, getFleets } from '../../services/inventoryService';
import { ManufacturerInterface, FleetInterface, TokenType } from '../../types';
import { useAlert } from '@/app/contexts/alertContext';
import { ItemInterface } from '../../types';

interface FormLibraryProps {
    editData?: ItemInterface | null;
}

export default function FormLibrary({ editData }: FormLibraryProps) {
    const [manufacturers, setManufacturers] = useState<ManufacturerInterface[]>([]);
    const [fleets, setFleets] = useState<FleetInterface[]>([]);
    const [loadingManufacturers, setLoadingManufacturers] = useState(true);
    const [loadingFleets, setLoadingFleets] = useState(true);
    const router = useRouter();
    const [isEditing] = useState(!!editData);
    const { alert } = useAlert();

    const [formData, setFormData] = useState({
        serial_number: editData?.serial_number || '',
        manufacturers: editData?.manufacturers?.id?.toString() || '',
        fleet: editData?.fleet?.id?.toString() || '',
        encoder_state: {
            token_type: editData?.encoder_state?.token_type || '' as TokenType,
            token_value: editData?.encoder_state?.token_value || '',
            secret_key: editData?.encoder_state?.secret_key || '',
            starting_code: editData?.encoder_state?.starting_code || '',
            max_count: editData?.encoder_state?.max_count?.toString() || '0', // Default value
            token: editData?.encoder_state?.token || '',
        }
    });

    const TOKEN_TYPE_OPTIONS: { value: TokenType; label: string }[] = [
        { value: 'ADD_TIME', label: 'Add Time' },
        { value: 'SET_TIME', label: 'Set Time' },
        { value: 'DISABLE_PAYG', label: 'Disable PAYG' },
        { value: 'COUNTER_SYNC', label: 'Counter Sync' },
    ];


    useEffect(() => {
        const fetchManufacturers = async () => {
            try {
                const data = await getManufacturers();
                setManufacturers(data);
            } catch (err) {
                console.error('Failed to fetch manufacturers:', err);
            } finally {
                setLoadingManufacturers(false);
            }
        };

        const fetchFleets = async () => {
            try {
                const data = await getFleets();
                setFleets(data);
            } catch (err) {
                console.error('Failed to fetch manufacturers:', err);
            } finally {
                setLoadingFleets(false);
            }
        };

        fetchFleets();
        fetchManufacturers();
    }, []);

    const { handleSubmit, isLoading, error } = useItemForm({
        isEdit: isEditing,
        itemId: editData?.id,
        onSuccess: () => {
            router.push('/inventory/items');
            alert({ text: `Item ${isEditing ? 'Updated' : 'Created'} Successfully`, type: "success" });
        },
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        if (name.startsWith('encoder_state.')) {
            const field = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                encoder_state: {
                    ...prev.encoder_state,
                    [field]: field === 'max_count' ? value.replace(/[^0-9]/g, '') : value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await handleSubmit({
            ...formData,
            encoder_state: {
                ...formData.encoder_state,
                max_count: parseInt(formData.encoder_state.max_count) || 100
            },
            manufacturers: formData.manufacturers ? parseInt(formData.manufacturers) : null,
            fleet: formData.fleet ? parseInt(formData.fleet) : null
        });
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
                    {isEditing ? 'Edit Item' : 'Create New Item'}
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
                        {/* Serial Number */}
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="serial_number">
                                Serial Number
                            </label>
                            <input
                                id="serial_number"
                                name="serial_number"
                                className="form-input w-full"
                                type="text"
                                value={formData.serial_number}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        {/* Manufacturer */}
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="manufacturers">
                                Manufacturer
                            </label>
                            <select
                                id="manufacturers"
                                name="manufacturers"
                                className="form-select w-full"
                                value={formData.manufacturers}
                                onChange={handleInputChange}
                                disabled={loadingManufacturers}
                            >
                                <option value="">Select Manufacturer</option>
                                {manufacturers.map(manufacturer => (
                                    <option key={manufacturer.id} value={manufacturer.id}>
                                        {manufacturer.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="fleet">
                                Fleets
                            </label>
                            <select
                                id="fleet"
                                name="fleet"
                                className="form-select w-full"
                                value={formData.fleet}
                                onChange={handleInputChange}
                                disabled={loadingFleets}
                            >
                                <option value="">Select Fleet</option>
                                {fleets.map(fleet => (
                                    <option key={fleet.id} value={fleet.id}>
                                        {fleet.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="encoder_state.token_type">
                                Token Type
                            </label>
                            <select
                                id="encoder_state.token_type"
                                name="encoder_state.token_type"
                                className="form-select w-full"
                                value={formData.encoder_state.token_type}
                                onChange={handleInputChange}
                            >
                                <option value="">Select Token Type</option>
                                {TOKEN_TYPE_OPTIONS.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="encoder_state.token_value">
                                Token Value
                            </label>
                            <input
                                id="encoder_state.token_value"
                                name="encoder_state.token_value"
                                className="form-input w-full"
                                type="text"
                                value={formData.encoder_state.token_value}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="encoder_state.secret_key">
                                Secret Key
                            </label>
                            <input
                                id="encoder_state.secret_key"
                                name="encoder_state.secret_key"
                                className="form-input w-full"
                                type="text"
                                value={formData.encoder_state.secret_key}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="encoder_state.starting_code">
                                Starting Code
                            </label>
                            <input
                                id="encoder_state.starting_code"
                                name="encoder_state.starting_code"
                                className="form-input w-full"
                                type="text"
                                value={formData.encoder_state.starting_code}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="encoder_state.max_count">
                                Max Count
                            </label>
                            <input
                                id="encoder_state.max_count"
                                name="encoder_state.max_count"
                                className="form-input w-full"
                                type="number"
                                value={formData.encoder_state.max_count}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="encoder_state.token">
                                Token
                            </label>
                            <input
                                id="encoder_state.token"
                                name="encoder_state.token"
                                className="form-input w-full"
                                type="text"
                                value={formData.encoder_state.token}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="mt-[25px]">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`btn bg-green-500 hover:bg-green-600 text-white w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                            >
                                {isLoading
                                    ? `${isEditing ? 'Updating...' : 'Creating...'}`
                                    : `${isEditing ? 'Update' : 'Create'} Item`}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}