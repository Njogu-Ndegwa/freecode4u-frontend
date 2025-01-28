import Image from 'next/image'
import { GeneratedCodeResponse } from '@/app/(default)/inventory/types'
import { TransactionsProperties } from './transactions-properties'
import { useFlyoutContext } from '@/app/flyout-context'
import { useTransactionDetail } from './transaction-context'

interface TransactionsTableItemProps {
  transaction: GeneratedCodeResponse
  onCheckboxChange: (id: number, checked: boolean) => void
  isSelected: boolean
}

export default function TransactionsTableItem({ transaction, onCheckboxChange, isSelected }: TransactionsTableItemProps) {

  const { setFlyoutOpen } = useFlyoutContext()

  const { setTransaction } = useTransactionDetail()

  const {
    statusColor,
    amountColor,
  } = TransactionsProperties()  

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {        
    onCheckboxChange(transaction.id, e.target.checked)
  }

  const handleTransactionClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {    
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    setFlyoutOpen(true)
    setTransaction(transaction)
  }

  return (
    <tr>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        <div className="flex items-center">
          <label className="inline-flex">
            <span className="sr-only">Select</span>
            <input className="form-checkbox" type="checkbox" onChange={handleCheckboxChange} checked={isSelected} />
          </label>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap md:w-1/2">
        <div className="flex items-center">
          <div className="font-medium text-gray-800 dark:text-gray-100">
            <button onClick={(e) => handleTransactionClick(e)}>{transaction.token}</button>
          </div>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{transaction.token_type}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">
          <div className={`text-xs inline-flex font-medium rounded-full text-center px-2.5 py-1`}>{transaction.token_value}</div>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        <div className={`text-right font-medium`}>{transaction.max_count}</div>
      </td>
    </tr>
  )
}