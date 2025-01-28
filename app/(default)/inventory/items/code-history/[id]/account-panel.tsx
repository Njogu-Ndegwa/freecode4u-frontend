import { SelectedItemsProvider } from '@/app/selected-items-context'
import { FlyoutProvider } from '@/app/flyout-context'
import OrdersTable from './orders-table'
import PaginationClassic from '@/components/pagination-classic'
import { useEffect, useState } from 'react';
import { generateItemCode } from '../../../services/inventoryService'
import { GeneratedCodeResponse } from '../../../types'
function Transactions({itemId} : {itemId:string}) {

  const [transactions, setTransactions] = useState<GeneratedCodeResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchCodes = async () => {
      try {
        setIsLoading(true);
        const codes = await generateItemCode(itemId);
        setTransactions(codes);
      } catch (err) {
        setError('Failed to load code history');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCodes();
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
        <OrdersTable transactions={transactions} />
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
          <Transactions itemId={itemId}/>
      </FlyoutProvider>
    </SelectedItemsProvider>
  )
}