import { TableColumn } from '@/components/table/table'
import { format } from 'date-fns';
import { ItemInterface } from '../types'
import { Pencil, Trash2, Plus, MoreHorizontal } from 'lucide-react'

export const columns: TableColumn<ItemInterface>[] = [
    {
      header: 'ID',
      accessor: 'id',
      cellRenderer: (value: unknown, item: ItemInterface) => (
        <div className="font-medium text-sky-600">{String(value)}</div>
      )
    },
    {
      header: 'Serial Number',
      accessor: 'serial_number',
      cellRenderer: (value: unknown, item: ItemInterface) => (
        <div className="font-medium text-gray-800 dark:text-gray-100">
          {String(value)}
        </div>
      )
    },
    {
      header: 'Manufacturer',
      accessor: 'manufacturers',
      cellRenderer: (value: unknown, item: ItemInterface) => (
        <div className="max-w-md truncate">
          {item.manufacturers?.name || '-'}
        </div>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      cellRenderer: (value: unknown, item: ItemInterface) => {
        return (
          <span className={`inline-flex font-medium rounded-full text-center px-2.5 py-0.5 ${statusColor(item.status)}`}>
            {item.status.replace('_', ' ')}
          </span>
        );
      }
    },
    {
      header: 'Payment Plan',
      accessor: 'payment_plan',
      cellRenderer: (value: unknown, item: ItemInterface) => (
        <div className="max-w-md truncate">
          {item.payment_plan?.name || '-'}
        </div>
      )
    },
    {
      header: 'Customer',
      accessor: 'customer',
      cellRenderer: (value: unknown, item: ItemInterface) => (
        <div className="max-w-md truncate">
          {item.customer?.name || '-'}
        </div>
      )
    },
    {
      header: 'Created At',
      accessor: 'created_at',
      cellRenderer: (value: unknown, item: ItemInterface) => {
        const formattedDate = format(new Date(item.created_at), 'MMM dd, yyyy HH:mm:ss');
        return <div className="max-w-md truncate">{formattedDate}</div>;
      }
    },
    {
      header: 'Updated At',
      accessor: 'updated_at',
      cellRenderer: (value: unknown, item: ItemInterface) => {
        const formattedDate = format(new Date(item.updated_at), 'MMM dd, yyyy HH:mm:ss');
        return <div className="max-w-md truncate">{formattedDate}</div>;
      }
    }
  ];

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

const statusColor = (status: string): string => {
    switch (status) {
      case 'fully_paid':
        return 'bg-green-500/20 text-green-700';
      case 'partially_paid':
        return 'bg-yellow-500/20 text-yellow-700';
      case 'pending':
        return 'bg-red-500/20 text-red-700';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400';
    }
  };
  
