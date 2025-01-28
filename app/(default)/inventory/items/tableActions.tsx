'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2, MoreHorizontal } from 'lucide-react';
import FeedbackModal from '@/components/feedback-modal';
import { deleteItem } from '../services/inventoryService';
import { useAlert } from '@/app/contexts/alertContext';
interface ActionProps {
    row: any; // Should match your FleetInterface type
    onDelete: () => void; 
}

export const actions = ({ row, onDelete }: ActionProps) => {


    const router = useRouter();
    const [dangerModalOpen, setDangerModalOpen] = useState(false)
    const { alert } = useAlert()
    const handleEdit = () => {
        router.push(`/inventory/items/edit/${row.id}`);
    };

    const handleDelete = () => {
        // Implement delete logic here
        setDangerModalOpen(true)
    };

    const handleConfirmDelete = async () => {
        try {
            // Assuming you have access to the fleet ID (from state/props)
            const response = await deleteItem(row.id);

            // Show success feedback
            alert({ text: response.message, type: "success" })
            console.log('Fleet deleted successfully:', response);

            // Close delete modal if needed
            setDangerModalOpen(false);

            // Call the onDelete callback after successful deletion
            if (onDelete) {
                onDelete();
            }


        } catch (error) {
            console.error('Delete failed:', error);
            // Show error feedback
            alert({ text: "Failed to delete Item. Please try again.", type: "error" })
        }
    };

    const handleMore = () => {
        // Implement more options logic here
        console.log('More options for:', row.id);
    };

    return (
        <>
            <button
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                onClick={handleEdit}
            >
                <Pencil className="w-4 h-4 text-gray-500" />
                <span className="sr-only">Edit</span>
            </button>
            <button
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                onClick={handleDelete}
            >
                <Trash2 className="w-4 h-4 text-red-500" />
                <span className="sr-only">Delete</span>
            </button>
            <button
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                onClick={handleMore}
            >
                <MoreHorizontal className="w-4 h-4 text-gray-500" />
                <span className="sr-only">More options</span>
            </button>
            <FeedbackModal
                isOpen={dangerModalOpen}
                setIsOpen={setDangerModalOpen}
                variant="danger"
                title={`Delete Item?`}
                content="Are you sure you want to delete this item?"
                confirmButtonLabel="Yes, Delete it"
                onConfirm={handleConfirmDelete}
            />
        </>
    );
};