'use client'

import Design2Table from '@/components/table/table2'
import { PaymentResponseInterface } from '@/app/(default)/inventory/types'
import { Design2TableColumn } from '@/components/table/table2'
import { format } from 'date-fns';

export default function TransactionsTable({ transactions }: { transactions: PaymentResponseInterface[] }) {

  const handleTransactionClick = (transaction: PaymentResponseInterface) => {
    console.log('-items')
  }

// Update your columns definition to use proper typing
const columns: Design2TableColumn<PaymentResponseInterface>[] = [
  {
    header: 'Customer',
    accessor: (item) => item.customer.email, // Use function accessor for nested properties
    cellRenderer: (value, item) => (
      <button 
        onClick={() => handleTransactionClick(item)}
        className="font-medium text-gray-800 dark:text-gray-100"
      >
        {value}
      </button>
    )
  },
  {
    header: 'Amount',
    accessor: 'amount_paid', // Direct key access works for top-level properties
    cellRenderer: (value) => (
      <span className="font-medium text-gray-800 dark:text-gray-100">{value}</span>
    )
  },
  {
    header: 'note',
    accessor: 'note',
    cellRenderer: (value) => (
      <div className="font-medium text-gray-800 dark:text-gray-100">
        {value}
      </div>
    )
  },
  {
    header: 'Created on',
    accessor: 'paid_at',
    align: 'right',
     cellRenderer: (value) => {
      const formattedDate = format(new Date(String(value)), 'MMM dd, yyyy HH:mm:ss');
      return <div className="font-medium text-gray-800 dark:text-gray-100">{formattedDate}</div>;
      }
  }
];

  return (
    <Design2Table
      data={transactions}
      columns={columns}
      selectable
    />
  )
}