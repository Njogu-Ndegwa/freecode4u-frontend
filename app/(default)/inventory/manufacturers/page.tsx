'use client'
// ManufacturersTable.tsx
import { useState, useEffect } from 'react'
import Table from '@/components/table/table'
import { ManufacturerInterface } from '../types'
import { AgentInterface } from '@/app/(auth)/services/authService'
import { Pencil, Trash2, Plus, MoreHorizontal } from 'lucide-react'
// import { Alert, AlertDescription } from '@/components/ui/alert'
import { getManufacturers } from '../services/inventoryService'
import { TableColumn } from '@/components/table/table'
import { format } from 'date-fns';
import Link from 'next/link';
import DeleteButton from '@/components/delete-button'
import DateSelect from '@/components/date-select';
import FilterButton from '@/components/dropdown-filter';
import { useSelectedItems } from '@/app/selected-items-context';
import { SelectedItemsProvider } from '@/app/selected-items-context';
import DynamicDropdown from '@/components/dropdown-dynamic'
import { getDistributorAgents } from '@/app/(auth)/services/authService'
import { Agent } from 'http'
import { columns } from './tableColumns'
import { actions } from './tableActions'
export default function ManufacturersTableWrapper() {
  return (
    <SelectedItemsProvider>
      <ManufacturersTable />
    </SelectedItemsProvider>
  )
}
 function ManufacturersTable() {
  const [manufacturers, setManufacturers] = useState<ManufacturerInterface[]>([])
  const [agents, setAgents] = useState<AgentInterface[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { setSelectedItems } = useSelectedItems()
  const fetchManufacturers = async () => {
    try {
      const data = await getManufacturers()
      setManufacturers(data)
    } catch (err) {
      setError('Failed to fetch manufacturers')
    } finally {
      setLoading(false)
    }
  }

  const fetchAgents = async () => {
    try {
      const data = await getDistributorAgents()
      setAgents(data)
      console.log(data, "The Data----46---")
    } 
    catch(err) {

    }
    finally {

    } 

  }
  useEffect(() => {
    fetchAgents()
    fetchManufacturers()
  }, [])


  const handleSelectionChange = (selectedIds: number[]) => {
    setSelectedItems(selectedIds)
  }


  if (loading) {
    return <div className="p-8 text-center">Loading manufacturers...</div>
  }

const loadData = async () => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  fetchManufacturers();
  setSelectedItems([]);
};

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      {/* Header section */}
      <div className="sm:flex sm:justify-between sm:items-center mb-5">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
            Manufacturers
          </h1>
        </div>

        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
        <Link
            href="/inventory/manufacturers/add" // Replace with your desired path
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
            <span className="max-xs:sr-only">Create Manufacturer</span>
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
                {/* <DynamicDropdown agents={agents} onAgentSelect={handleAgentSelect} options={options} /> */}
                {/* Dropdown */}
                <DateSelect />
                {/* Filter button */}
                <FilterButton align="right" />
              </div>
      
            </div>     

      {/* Table section */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl">
        <Table
          data={manufacturers}
          columns={columns}
          totalCount={manufacturers.length}
          selectable
          actions={(row) => actions({ row, onDelete: loadData })}
          onSelectionChange={handleSelectionChange}
        />
      </div>
    </div>
  )
}