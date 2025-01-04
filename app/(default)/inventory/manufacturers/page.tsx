'use client'
// ManufacturersTable.tsx
import { useState, useEffect } from 'react'
import Table from '@/components/table/table'
import { ManufacturerInterface } from '../types'
import { Pencil, Trash2, Plus, MoreHorizontal } from 'lucide-react'
// import { Alert, AlertDescription } from '@/components/ui/alert'
import { getManufacturers } from '../services/inventoryService'
import { TableColumn } from '@/components/table/table'
import { format } from 'date-fns';
export default function ManufacturersTable() {
  const [manufacturers, setManufacturers] = useState<ManufacturerInterface[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
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

    fetchManufacturers()
  }, [])

  const columns: TableColumn<ManufacturerInterface>[] = [
    {
        header: 'ID',
        accessor: 'id' as keyof ManufacturerInterface,
        cellRenderer: (value: unknown, item: ManufacturerInterface) => (
          <div className="font-medium text-sky-600">
            {String(value)}
          </div>
        )
      },
    {
      header: 'Name',
      accessor: 'name' as keyof ManufacturerInterface,
      cellRenderer: (value: unknown, item: ManufacturerInterface) => (
        <div className="font-medium text-gray-800 dark:text-gray-100">
          {String(value)}
        </div>
      )
    },
    {
      header: 'Description',
      accessor: 'description' as keyof ManufacturerInterface,
      cellRenderer: (value: unknown, item: ManufacturerInterface) => (
        <div className="max-w-md truncate">{String(value)}</div>
      )
    },
    {
        header: 'Created At',
        accessor: 'created_at' as keyof ManufacturerInterface,
        cellRenderer: (value: unknown, item: ManufacturerInterface) => {
            const formattedDate = format(new Date(String(value)), 'MMM dd, yyyy HH:mm:ss');
            return <div className="max-w-md truncate">{formattedDate}</div>;
        }
    },
    {
        header: 'Updated At',
        accessor: 'updated_at' as keyof ManufacturerInterface,
        cellRenderer: (value: unknown, item: ManufacturerInterface) => {
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
    console.log('Selected manufacturers:', selectedIds)
  }

  if (loading) {
    return <div className="p-8 text-center">Loading manufacturers...</div>
  }

//   if (error) {
//     return (
//       <Alert variant="destructive">
//         <AlertDescription>{error}</AlertDescription>
//       </Alert>
//     )
//   }

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
          <button 
            onClick={() => console.log('Add manufacturer clicked')}
            className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white inline-flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            <span>Add Manufacturer</span>
          </button>
        </div>
      </div>

      {/* Table section */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl">
        <Table
          data={manufacturers}
          columns={columns}
          totalCount={manufacturers.length}
          selectable
          actions={actions}
          onSelectionChange={handleSelectionChange}
        />
      </div>
    </div>
  )
}