import { TableColumn } from '@/components/table/table'
import { format } from 'date-fns';
import { DistributorPaymentInterface } from '../types';
import { Pencil, Trash2, Plus, MoreHorizontal } from 'lucide-react'

// export const columns: TableColumn<DistributorPaymentInterface>[] = [
//     {
//         header: 'ID',
//         accessor: 'id' as keyof DistributorPaymentInterface,
//         cellRenderer: (value: unknown, item: DistributorPaymentInterface) => (
//             <div className="font-medium text-sky-600">
//                 {String(value)}
//             </div>
//         )
//     },
//     {
//         header: 'Item',
//         accessor: 'item.serial_number' as keyof DistributorPaymentInterface,
//         cellRenderer: (value: unknown, item: DistributorPaymentInterface) => (
//             <div className="max-w-md truncate">{item.item.serial_number ? item.item.serial_number : "-"}</div>
//         )
//     },
//     {
//         header: 'Amount Paid',
//         accessor: 'amount_paid' as keyof DistributorPaymentInterface,
//         cellRenderer: (value: unknown, item: DistributorPaymentInterface) => (
//             <div className="font-medium text-gray-800 dark:text-gray-100">
//                 {String(value)}
//             </div>
//         )
//     },

//     {
//         header: 'Customer',
//         accessor: 'customer.name' as keyof DistributorPaymentInterface,
//         cellRenderer: (value: string, item: DistributorPaymentInterface) => (
//             <div className="max-w-md truncate">
//                 {item.customer.name ? item.customer.name : "-" }
//             </div>
//         )
//     },
//     {
//         header: 'Payment Plan',
//         accessor: 'payment_plan.name' as keyof DistributorPaymentInterface,
//         cellRenderer: (value: string, item: DistributorPaymentInterface) => (
//             <div className="max-w-md truncate">
//                 {item.payment_plan.name ? item.payment_plan.name : "-"}
//             </div>
//         )
//     },
//     {
//         header: 'Paid At',
//         accessor: 'paid_at' as keyof DistributorPaymentInterface,
//         cellRenderer: (value: unknown, item: DistributorPaymentInterface) => {
//             const formattedDate = format(new Date(String(value)), 'MMM dd, yyyy HH:mm:ss');
//             return <div className="max-w-md truncate">{formattedDate}</div>;
//         }
//     },
// ]
export const columns = [
    {
      header: 'ID',
      accessor: (item: DistributorPaymentInterface) => item.id,
      cellRenderer: (value: number) => (
        <div className="font-medium text-sky-600">{value}</div>
      )
    },
    {
      header: 'Item',
      accessor: (item: DistributorPaymentInterface) => item.item?.serial_number || '-',
      cellRenderer: (value: string) => (
        <div className="max-w-md truncate">{value}</div>
      )
    },
    {
      header: 'Amount Paid',
      accessor: (item: DistributorPaymentInterface) => item.amount_paid,
      cellRenderer: (value: string) => (
        <div className="font-medium text-gray-800 dark:text-gray-100">
          {value}
        </div>
      )
    },
    {
      header: 'Customer',
      accessor: (item: DistributorPaymentInterface) => item.customer?.name || '-',
      cellRenderer: (value: string) => (
        <div className="max-w-md truncate">{value}</div>
      )
    },
    {
      header: 'Payment Plan',
      accessor: (item: DistributorPaymentInterface) => item.payment_plan?.name || '-',
      cellRenderer: (value: string) => (
        <div className="max-w-md truncate">{value}</div>
      )
    },
    {
      header: 'Paid At',
      accessor: (item: DistributorPaymentInterface) => item.paid_at,
      cellRenderer: (value: string) => {
        // Server-safe date formatting
        const formattedDate = format(new Date(String(value)), 'MMM dd, yyyy HH:mm:ss');
        return <div className="max-w-md truncate">{formattedDate}</div>;
      }
    },
  ];
export const dropdownOptions = [
    {
        id: 0,
        value: 'Delete'
    }
]
