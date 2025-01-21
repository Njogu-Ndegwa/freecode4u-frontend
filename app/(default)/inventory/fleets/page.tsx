'use client'
// ManufacturersTable.tsx
import { useState, useEffect } from 'react'
import Table from '@/components/table/table'
import { FleetInterface } from '../types'
import { Pencil, Trash2, Plus, MoreHorizontal } from 'lucide-react'
// import { Alert, AlertDescription } from '@/components/ui/alert'
import { getFleets, reassignFleetToAgent, assignFleetToAgent } from '../services/inventoryService'
import { TableColumn } from '@/components/table/table'
import { format } from 'date-fns';
import Link from 'next/link';
import DynamicDropdown from '@/components/dropdown-dynamic';
import { getDistributorAgents, } from '@/app/(auth)/services/authService';

import { AgentInterface } from '@/app/(auth)/services/authService'
import { useSelectedItems } from '@/app/selected-items-context';
import DateSelect from '@/components/date-select';
import FilterButton from '@/components/dropdown-filter';
import { SelectedItemsProvider } from '@/app/selected-items-context';
import Banner from '@/components/banner';
import Alert from '@/components/alert'
import { useAlert } from '@/app/contexts/alertContext'
export default function FleetTableWrapper() {
  return (
    <SelectedItemsProvider>
      <FleetTable />
    </SelectedItemsProvider>
  )
}

function FleetTable() {
  const [fleet, setFleets] = useState<FleetInterface[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [agents, setAgents] = useState<AgentInterface[]>([])
  const { setSelectedItems, selectedItems } = useSelectedItems()
  const [selectedAgentId, setSelectedAgentId] = useState<number | null>(null);
  const [isBannerOpen, setBannerOpen] = useState(false)
  const {alert} = useAlert()
  useEffect(() => {
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
    const fetchAgents = async () => {
      try {
        const data = await getDistributorAgents()
        setAgents(data)
      }
      catch (err) {

      }
      finally {

      }

    }
    fetchAgents()

    fetchFleets()
  }, [])

  const columns: TableColumn<FleetInterface>[] = [
    {
      header: 'ID',
      accessor: 'id' as keyof FleetInterface,
      cellRenderer: (value: unknown, item: FleetInterface) => (
        <div className="font-medium text-sky-600">
          {String(value)}
        </div>
      )
    },
    {
      header: 'Name',
      accessor: 'name' as keyof FleetInterface,
      cellRenderer: (value: unknown, item: FleetInterface) => (
        <div className="font-medium text-gray-800 dark:text-gray-100">
          {String(value)}
        </div>
      )
    },
    {
      header: 'Description',
      accessor: 'description' as keyof FleetInterface,
      cellRenderer: (value: unknown, item: FleetInterface) => (
        <div className="max-w-md truncate">{String(value)}</div>
      )
    },
    {
      header: 'Assigned Agent',
      accessor: 'assigned_agent.email' as keyof FleetInterface,
      cellRenderer: (value: unknown, item: FleetInterface) => (
        <div className="max-w-md truncate">
          {item.assigned_agent ? item.assigned_agent.email : '-'}
        </div>
      )
    },
    {
      header: 'Created At',
      accessor: 'created_at' as keyof FleetInterface,
      cellRenderer: (value: unknown, item: FleetInterface) => {
        const formattedDate = format(new Date(String(value)), 'MMM dd, yyyy HH:mm:ss');
        return <div className="max-w-md truncate">{formattedDate}</div>;
      }
    },
    {
      header: 'Updated At',
      accessor: 'updated_at' as keyof FleetInterface,
      cellRenderer: (value: unknown, item: FleetInterface) => {
        const formattedDate = format(new Date(String(value)), 'MMM dd, yyyy HH:mm:ss');
        return <div className="max-w-md truncate">{formattedDate}</div>;
      }
    }
  ]

  const actions = (
    <>
      <button
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        onClick={() => console.log('Edit clicked')}
      >
        <Pencil className="w-4 h-4 text-gray-500" />
        <span className="sr-only">Edit</span>
      </button>
      <button
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        onClick={() => console.log('Delete clicked')}
      >
        <Trash2 className="w-4 h-4 text-red-500" />
        <span className="sr-only">Delete</span>
      </button>
      <button
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        onClick={() => console.log('More options clicked')}
      >
        <MoreHorizontal className="w-4 h-4 text-gray-500" />
        <span className="sr-only">More options</span>
      </button>
    </>
  )

  const handleSelectionChange = (selectedIds: number[]) => {
    setSelectedItems(selectedIds)
  }

  const handleAgentSelect = (id: number) => {
    setSelectedAgentId(id); // Just set the ID, no actor here
  };

  const handleActionClick = async (actor: string) => {
    if (selectedAgentId) {
      // setBannerOpen(true)
      if (actor === "assign") {
        const response = await assignFleetToAgent({ agent_id: selectedAgentId, fleet_ids: selectedItems })
        alert({ text: "Fleet Assignment started Successfully", type: "success" })
      } else if (actor === "reAssign") {
        const response = await reassignFleetToAgent({ new_agent_id: selectedAgentId, fleet_ids: selectedItems })
        alert({ text: "Fleet ReAssignment started Successfully", type: "success" })
      }
    } else {
      alert({ text: "Select an Agent First", type: "error" })
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading Fleets...</div>
  }

  //   if (error) {
  //     return (
  //       <Alert variant="destructive">
  //         <AlertDescription>{error}</AlertDescription>
  //       </Alert>
  //     )
  //   }
  const options = [
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

  console.log(agents, "Agents")
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      <Alert
        type="success"
        open={isBannerOpen}
        setOpen={setBannerOpen}
      >
        Action completed successfully!
      </Alert>
      {/* Header section */}
      <div className="sm:flex sm:justify-between sm:items-center mb-5">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
            Fleets
          </h1>
        </div>

        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          <Link
            href="/inventory/fleets/add" // Replace with your desired path
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
            <span className="max-xs:sr-only">Create Fleet</span>
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
          <DynamicDropdown agents={agents} onAgentSelect={handleAgentSelect} onActionClick={handleActionClick} options={options} />
          {/* Dropdown */}
          <DateSelect />
          {/* Filter button */}
          <FilterButton align="right" />
        </div>

      </div>
      {/* Table section */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl">
        <Table
          data={fleet}
          columns={columns}
          totalCount={fleet.length}
          selectable
          actions={actions}
          onSelectionChange={handleSelectionChange}
        />
      </div>
    </div>
  )
}