'use client'
// ManufacturersTable.tsx
import { useState, useEffect } from 'react'
import Table from '@/components/table/table'
import { FleetInterface, ItemInterface } from '../types'
import { getFleets, getItems, reAssignItemToFleet, assignItemToFleet } from '../services/inventoryService'

import Link from 'next/link';
import DynamicDropdown from '@/components/dropdown-dynamic';
import { getDistributorAgents, } from '@/app/(auth)/services/authService';

import { AgentInterface } from '@/app/(auth)/services/authService'
import { useSelectedItems } from '@/app/selected-items-context';
import DateSelect from '@/components/date-select';
import FilterButton from '@/components/dropdown-filter';
import { SelectedItemsProvider } from '@/app/selected-items-context';
import Alert from '@/components/alert';
import { useAlert } from '@/app/contexts/alertContext';
import FeedbackModal from '@/components/feedback-modal';
import { columns, dropdownOptions } from "./tableColumns";
import { actions } from './tableActions';
import { SearchableListModal } from '@/components/seachable-list-modal';
export default function ItemTableWrapper() {
  return (
    <SelectedItemsProvider>
      <ItemTable />
    </SelectedItemsProvider>
  )
}

function ItemTable() {
  const [fleets, setFleets] = useState<FleetInterface[]>([])
  const [items, setItems] = useState<ItemInterface[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [agents, setAgents] = useState<AgentInterface[]>([])
  const { setSelectedItems, selectedItems } = useSelectedItems()
  const [selectedFleetId, setSelectedFleetId] = useState<number | null>(null);
  const [isBannerOpen, setBannerOpen] = useState(false)
  const [dangerModalOpen, setDangerModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const { alert } = useAlert()

  const fetchFleets = async () => {
    try {
      const data = await getFleets()
      setFleets(data)
    } catch (err) {
      setError('Failed to fetch fleets')
    } finally {
      setLoading(false)
    }
  }

  const fetchItems = async () => {
    try {
      const data = await getItems()
      setItems(data)
    } catch (err) {
      setError('Failed to fetch fleets')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
    fetchFleets()

  }, [])


  const handleSelectionChange = (selectedIds: number[]) => {
    setSelectedItems(selectedIds)
  }

  const handleFleetSelect = (agent: any) => {
    setSelectedFleetId(agent.id); // Just set the ID, no actor here
  };

  const handleDropdownItemSelect = (option: any) => {
    setSelectedOption(option.id)
    if (option.id === 0) {
      setDangerModalOpen(true);
    } else if (option.id === 1 || option.id === 2) {
      setIsOpen(true)
    }
  }
  
  const loadData = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    fetchItems();
    setSelectedItems([]);
  };

  const handleActionClick = async (actor: string) => {
    if (selectedFleetId) {
      if (actor === "assign") {
        assignItemToFleet({ fleet_id: selectedFleetId, item_ids: selectedItems })
        alert({ text: "Item Assignment started Successfully", type: "success" })
        loadData()
      } else if (actor === "reAssign") {
        await reAssignItemToFleet({ fleet_id: selectedFleetId, item_ids: selectedItems })
        alert({ text: "Item ReAssignment started Successfully", type: "success" })
        loadData()
      }
    } else {
      alert({ text: "Select an Agent First", type: "error" })
    }
  };

  const filteredFleets = fleets.filter(fleet =>
    fleet.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return <div className="p-8 text-center">Loading Fleets...</div>
  }


  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      <FeedbackModal
        isOpen={dangerModalOpen}
        setIsOpen={setDangerModalOpen}
        variant="danger"
        title={`Delete ${1} item?`}
        content="Semper eget duis at tellus at urna condimentum mattis pellentesque lacus suspendisse faucibus interdum."
        confirmButtonLabel="Yes, Delete it"
      />
      <SearchableListModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Select a Fleet"
        items={filteredFleets}
        searchPlaceholder="Search for a fleet..."
        searchValue={searchQuery}
        onSearch={setSearchQuery}
        renderItem={(fleet) => fleet.name}
        onSelect={handleFleetSelect}
        selectedItemId={selectedFleetId}
        actionLabel={selectedOption === 1 ? 'Assign Item' : 'Re-assign Item'}
        onAction={() => handleActionClick(selectedOption === 1 ? 'assign' : 'reAssign')}
      />
      {/* Header section */}
      <div className="sm:flex sm:justify-between sm:items-center mb-5">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
            Items
          </h1>
        </div>

        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          <Link
            href="/inventory/items/add" // Replace with your desired path
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
            <span className="max-xs:sr-only">Create Item</span>
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
          <DynamicDropdown options={dropdownOptions} onDropdownItemSelect={handleDropdownItemSelect} />
          {/* Dropdown */}
          <DateSelect />
          {/* Filter button */}
          <FilterButton align="right" />
        </div>

      </div>
      {/* Table section */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl">
        <Table
          data={items}
          columns={columns}
          totalCount={fleets.length}
          selectable
          actions={(row) => actions({ row, onDelete: loadData })}
          onSelectionChange={handleSelectionChange}
        />
      </div>
    </div>
  )
}