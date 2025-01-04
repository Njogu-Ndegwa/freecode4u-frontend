'use client'
// types.ts
export interface TableColumn<T> {
  header: string
  accessor: keyof T | ((item: T) => React.ReactNode)
  className?: string
  cellRenderer?: (value: any, item: T) => React.ReactNode
}

export interface TableProps<T> {
  data: T[]
  columns: TableColumn<T>[]
  title?: string
  totalCount?: number
  selectable?: boolean
  actions?: React.ReactNode
  onSelectionChange?: (selectedIds: any[]) => void
}

// useTableSelection.ts
import { useState, useCallback, useEffect } from 'react'
import { ReactNode } from 'react'
export function useTableSelection<T extends { id: any }>(items: T[]) {
  const [selectedItems, setSelectedItems] = useState<T['id'][]>([])

  const isAllSelected = items.length > 0 && selectedItems.length === items.length

  const handleCheckboxChange = useCallback((id: T['id'], checked: boolean) => {
    setSelectedItems(prev => 
      checked ? [...prev, id] : prev.filter(item => item !== id)
    )
  }, [])

  const handleSelectAllChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedItems(e.target.checked ? items.map(item => item.id) : [])
  }, [items])

  return {
    selectedItems,
    isAllSelected,
    handleCheckboxChange,
    handleSelectAllChange,
  }
}

// TableRow.tsx
interface TableRowProps<T> {
  item: T
  columns: TableColumn<T>[]
  selectable?: boolean
  isSelected?: boolean
  onCheckboxChange?: (id: any, checked: boolean) => void
  actions?: React.ReactNode
}

function TableRow<T extends { id: any }>({ 
  item,
  columns,
  selectable,
  isSelected,
  onCheckboxChange,
  actions
}: TableRowProps<T>) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckboxChange?.(item.id, e.target.checked)
  }
  const getCellContent = (column: TableColumn<T>): ReactNode => {
    const value = typeof column.accessor === 'function' 
      ? column.accessor(item)
      : item[column.accessor]

    if (column.cellRenderer) {
      return column.cellRenderer(value, item)
    }

    // Ensure the value is safely renderable
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value)
    }

    return String(value)
  }
  return (
    <tr>
      {selectable && (
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
          <div className="flex items-center">
            <label className="inline-flex">
              <span className="sr-only">Select</span>
              <input
                type="checkbox"
                className="form-checkbox"
                checked={isSelected}
                onChange={handleChange}
              />
            </label>
          </div>
        </td>
      )}
      
      {columns.map((column, index) => (
        <td 
          key={index} 
          className={`px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap ${column.className || ''}`}
        >
          {getCellContent(column)}
        </td>
      ))}

      {actions && (
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
          <div className="space-x-1">
            {actions}
          </div>
        </td>
      )}
    </tr>
  )
}

// Table.tsx
export default function Table<T extends { id: any }>({
  data,
  columns,
  title,
  totalCount,
  selectable = false,
  actions,
  onSelectionChange
}: TableProps<T>) {
  const {
    selectedItems,
    isAllSelected,
    handleCheckboxChange,
    handleSelectAllChange,
  } = useTableSelection(data)

  useEffect(() => {
    onSelectionChange?.(selectedItems)
  }, [selectedItems, onSelectionChange])

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl relative">
      {title && (
        <header className="px-5 py-4">
          <h2 className="font-semibold text-gray-800 dark:text-gray-100">
            {title} {totalCount !== undefined && (
              <span className="text-gray-400 dark:text-gray-500 font-medium">
                {totalCount}
              </span>
            )}
          </h2>
        </header>
      )}

      <div className="overflow-x-auto">
        <table className="table-auto w-full dark:text-gray-300">
          <thead className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-t border-b border-gray-100 dark:border-gray-700/60">
            <tr>
              {selectable && (
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                  <div className="flex items-center">
                    <label className="inline-flex">
                      <span className="sr-only">Select all</span>
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={isAllSelected}
                        onChange={handleSelectAllChange}
                      />
                    </label>
                  </div>
                </th>
              )}
              
              {columns.map((column, index) => (
                <th key={index} className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">{column.header}</div>
                </th>
              ))}

              {actions && (
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Actions</div>
                </th>
              )}
            </tr>
          </thead>

          <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
            {data.map((item) => (
              <TableRow
                key={item.id}
                item={item}
                columns={columns}
                selectable={selectable}
                isSelected={selectedItems.includes(item.id)}
                onCheckboxChange={handleCheckboxChange}
                actions={actions}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}