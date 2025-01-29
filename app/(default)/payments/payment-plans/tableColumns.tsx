import { TableColumn } from '@/components/table/table'
import { format } from 'date-fns';
import { PaymentPlanInterface } from '../types';
import { Pencil, Trash2, Plus, MoreHorizontal } from 'lucide-react'

export const columns: TableColumn<PaymentPlanInterface>[] = [
    {
        header: 'ID',
        accessor: 'id' as keyof PaymentPlanInterface,
        cellRenderer: (value: unknown, item: PaymentPlanInterface) => (
            <div className="font-medium text-sky-600">
                {String(value)}
            </div>
        )
    },
    {
        header: 'Name',
        accessor: 'name' as keyof PaymentPlanInterface,
        cellRenderer: (value: unknown, item: PaymentPlanInterface) => (
            <div className="font-medium text-gray-800 dark:text-gray-100">
                {String(value)}
            </div>
        )
    },
    {
        header: 'Interval Amount',
        accessor: 'interval_amount' as keyof PaymentPlanInterface,
        cellRenderer: (value: unknown, item: PaymentPlanInterface) => (
            <div className="max-w-md truncate">{String(value)}</div>
        )
    },
    {
        header: 'Total Amount',
        accessor: 'total_amount' as keyof PaymentPlanInterface,
        cellRenderer: (value: unknown, item: PaymentPlanInterface) => (
            <div className="max-w-md truncate">
                {String(value)}
            </div>
        )
    },
    {
        header: 'Interval Type',
        accessor: 'interval_type' as keyof PaymentPlanInterface,
        cellRenderer: (value: unknown, item: PaymentPlanInterface) => (
            <div className="max-w-md truncate">
                {String(value)}
            </div>
        )
    },
    {
        header: 'Created At',
        accessor: 'created_at' as keyof PaymentPlanInterface,
        cellRenderer: (value: unknown, item: PaymentPlanInterface) => {
            const formattedDate = format(new Date(String(value)), 'MMM dd, yyyy HH:mm:ss');
            return <div className="max-w-md truncate">{formattedDate}</div>;
        }
    },
    {
        header: 'Updated At',
        accessor: 'updated_at' as keyof PaymentPlanInterface,
        cellRenderer: (value: unknown, item: PaymentPlanInterface) => {
            const formattedDate = format(new Date(String(value)), 'MMM dd, yyyy HH:mm:ss');
            return <div className="max-w-md truncate">{formattedDate}</div>;
        }
    }
]

export const dropdownOptions = [
    {
        id: 0,
        value: 'Delete'
    },
    {
        id: 1,
        value: 'Assign to Agent'
    },
    {
        id: 2,
        value: 'Re-assign Agent'
    }
]
