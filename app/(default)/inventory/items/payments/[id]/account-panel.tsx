'use client'
import { SelectedItemsProvider } from '@/app/selected-items-context'
import { FlyoutProvider } from '@/app/flyout-context'
import DeleteButton from '@/components/delete-button';
import SearchForm from '@/components/search-form';
import OrdersTable from './orders-table'
import PaginationClassic from '@/components/pagination-classic'
import { useEffect, useState } from 'react';
import { fetchItemPayments } from '../../../services/inventoryService';
import { PaymentResponseInterface } from '../../../types';

function Payments({itemId} : {itemId:string}) {

  const [payments, setPayments] = useState<PaymentResponseInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setIsLoading(true);
        const payments = await fetchItemPayments(itemId);
        setPayments(payments);
      } catch (err) {
        setError('Failed to load code history');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayments();
  }, [itemId]);

  if (isLoading) {
    return <div className="p-6">Loading code history...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="grow">
      <div className="p-6 space-y-6">
        <h2 className="text-2xl text-gray-800 dark:text-gray-100 font-bold mb-5">Code History</h2>
        <OrdersTable transactions={payments} />
        <div className="mt-8">
          <PaginationClassic />
        </div>
      </div>
    </div>
  )
}

export default function Orders({ itemId }: { itemId: any }) {
  return (
    <SelectedItemsProvider>
      <FlyoutProvider>
          <Payments itemId={itemId}/>
      </FlyoutProvider>
    </SelectedItemsProvider>
  )
}