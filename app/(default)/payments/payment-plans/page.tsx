'use client'
// ManufacturersTable.tsx
import { useState, useEffect } from 'react'
import Table from '@/components/table/table'
import { PaymentPlanInterface } from '../types';

import Link from 'next/link';
import { getPaymentPlans } from '../services/payments-services';

import { useSelectedItems } from '@/app/selected-items-context';
import DateSelect from '@/components/date-select';
import FilterButton from '@/components/dropdown-filter';
import { SelectedItemsProvider } from '@/app/selected-items-context';
import { columns } from "./tableColumns";
import { actions } from './tableActions';
export default function FleetTableWrapper() {
  return (
    <SelectedItemsProvider>
      <FleetTable />
    </SelectedItemsProvider>
  )
}

function FleetTable() {
  const [payments, setPayments] = useState<PaymentPlanInterface[]>([])
  const [loading, setLoading] = useState(true)
  const { setSelectedItems } = useSelectedItems()


  const fetchPaymentPlans = async () => {
    try {
      const data = await getPaymentPlans()
      setPayments(data)
    } catch (err) {
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    fetchPaymentPlans()
  }, [])


  const handleSelectionChange = (selectedIds: number[]) => {
    setSelectedItems(selectedIds)
  }

  
  const loadData = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    fetchPaymentPlans();
    setSelectedItems([]);
  };


  if (loading) {
    return <div className="p-8 text-center">Loading Payment Plans...</div>
  }


  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">

      {/* Header section */}
      <div className="sm:flex sm:justify-between sm:items-center mb-5">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
            Payment Plans
          </h1>
        </div>

        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          <Link
            href="/payments/payment-plans/add" // Replace with your desired path
            className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white flex items-center justify-center"
          >
            <svg
              className="fill-current shrink-0 xs:hidden"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span className="max-xs:sr-only">Create Payment Plan</span>
          </Link>
        </div>
      </div>
      <div className="sm:flex sm:justify-between sm:items-center mb-5">

        {/* Left side */}
        <div className="mb-4 sm:mb-0">
          <ul className="flex flex-wrap -m-1">
            <li className="m-1">
              <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-transparent shadow-sm bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-800 transition">All <span className="ml-1 text-gray-400 dark:text-gray-500">67</span></button>
            </li>
            <li className="m-1">
              <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 transition">Paid <span className="ml-1 text-gray-400 dark:text-gray-500">14</span></button>
            </li>
            <li className="m-1">
              <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 transition">Due <span className="ml-1 text-gray-400 dark:text-gray-500">34</span></button>
            </li>
            <li className="m-1">
              <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 transition">Overdue <span className="ml-1 text-gray-400 dark:text-gray-500">19</span></button>
            </li>
          </ul>
        </div>

        {/* Right side */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          {/* Delete button */}
          {/* <DynamicDropdown options={dropdownOptions} onDropdownItemSelect={handleDropdownItemSelect} /> */}
          {/* Dropdown */}
          <DateSelect />
          {/* Filter button */}
          <FilterButton align="right" />
        </div>

      </div>
      {/* Table section */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl">
        <Table
          data={payments}
          columns={columns}
          totalCount={payments.length}
          selectable
          actions={(row) => actions({ row, onDelete: loadData })}
          onSelectionChange={handleSelectionChange}
        />
      </div>
    </div>
  )
}