'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { useTableSelection } from './table'

// types.ts
export interface Design2TableColumn<T> {
  header: string
  accessor: keyof T | ((item: T) => React.ReactNode)
  cellRenderer?: (value: any, item: T) => React.ReactNode
  align?: 'left' | 'center' | 'right'
  className?: string
}

interface Design2TableProps<T> {
  data: T[]
  columns: Design2TableColumn<T>[]
  selectable?: boolean
  onSelectionChange?: (selectedIds: any[]) => void
}

// Design2TableRow.tsx
interface Design2TableRowProps<T> {
  item: T
  columns: Design2TableColumn<T>[]
  selectable?: boolean
  isSelected?: boolean
  onCheckboxChange?: (id: any, checked: boolean) => void
}

function Design2TableRow<T extends { id: any }>({
  item,
  columns,
  selectable,
  isSelected,
  onCheckboxChange,
}: Design2TableRowProps<T>) {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckboxChange?.(item.id, e.target.checked)
  }

  const getCellContent = (column: Design2TableColumn<T>): React.ReactNode => {
    const value = typeof column.accessor === 'function' 
      ? column.accessor(item)
      : item[column.accessor as keyof T]
  
    if (column.cellRenderer) {
      return column.cellRenderer(value, item)
    }
  
    // Handle non-ReactNode values
    if (
      typeof value === 'object' && 
      value !== null && 
      !React.isValidElement(value)
    ) {
      return JSON.stringify(value)
    }
  
    return value as React.ReactNode
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
                onChange={handleCheckboxChange}
              />
            </label>
          </div>
        </td>
      )}
      
      {columns.map((column, index) => (
        <td
          key={index}
          className={`px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap ${
            column.align === 'right' ? 'text-right' :
            column.align === 'center' ? 'text-center' : 'text-left'
          } ${column.className || ''}`}
        >
          {getCellContent(column)}
        </td>
      ))}
    </tr>
  )
}

// Design2Table.tsx
export default function Design2Table<T extends { id: any }>({
  data,
  columns,
  selectable = false,
  onSelectionChange,
}: Design2TableProps<T>) {
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
    <div className="bg-white dark:bg-gray-900">
      <div className="overflow-x-auto">
        <table className="table-auto w-full dark:text-gray-300">
          <thead className="text-xs font-semibold uppercase text-gray-500 border-t border-b border-gray-200 dark:border-gray-700/60">
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
                <th
                  key={index}
                  className={`px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap ${
                    column.align === 'right' ? 'text-right' :
                    column.align === 'center' ? 'text-center' : 'text-left'
                  }`}
                >
                  <div className="font-semibold">{column.header}</div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60 border-b border-gray-200 dark:border-gray-700/60">
            {data.map((item) => (
              <Design2TableRow
                key={item.id}
                item={item}
                columns={columns}
                selectable={selectable}
                isSelected={selectedItems.includes(item.id)}
                onCheckboxChange={handleCheckboxChange}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}