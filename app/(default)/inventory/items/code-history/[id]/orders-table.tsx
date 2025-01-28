'use client'

import Design2Table from '@/components/table/table2'
import { PaymentResponseInterface, GeneratedCodeResponse } from '@/app/(default)/inventory/types'
import { Design2TableColumn } from '@/components/table/table2'
import { format } from 'date-fns';

export default function TransactionsTable({ transactions }: { transactions: GeneratedCodeResponse[] }) {

  const handleTransactionClick = (transaction: GeneratedCodeResponse) => {
    console.log('-items')
  }

// Update your columns definition to use proper typing
const columns: Design2TableColumn<GeneratedCodeResponse>[] = [
  {
    header: 'Token',
    accessor: (item) => item.token, // Use function accessor for nested properties
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
    header: 'Token Type',
    accessor: 'token_type', // Direct key access works for top-level properties
    cellRenderer: (value) => (
      <span className="font-medium text-gray-800 dark:text-gray-100">{value}</span>
    )
  },
  {
    header: 'Token Value',
    accessor: 'token_value',
    cellRenderer: (value) => (
      <div className="font-medium text-gray-800 dark:text-gray-100">
        {value}
      </div>
    )
  },
  {
    header: 'Max Count',
    accessor: 'max_count',
    cellRenderer: (value) => (
      <div className="font-medium text-gray-800 dark:text-gray-100">
        {value}
      </div>
    )
  },
  {
    header: 'Created At',
    accessor: 'created_at',
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