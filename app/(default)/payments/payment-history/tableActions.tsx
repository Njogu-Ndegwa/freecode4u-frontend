'use client'

import { MoreHorizontal } from 'lucide-react';
interface ActionProps {
    row: any; // Should match your FleetInterface type
    onDelete: () => void; 
}

export const actions = ({ row, onDelete }: ActionProps) => {


    const handleMore = () => {
        // Implement more options logic here
        console.log('More options for:', row.id);
    };

    return (
        <>
            <button
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                onClick={handleMore}
            >
                <MoreHorizontal className="w-4 h-4 text-gray-500" />
                <span className="sr-only">More options</span>
            </button>
        </>
    );
};