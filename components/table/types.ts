import { ReactNode } from 'react'

export interface TableTab {
  label: string
  count: number
  value: string
  isSelected?: boolean
}

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
  tabs?: TableTab[]
  onTabChange?: (value: string) => void
  onSearch?: (value: string) => void
  onDateChange?: (start: Date | null, end: Date | null) => void
  onFilter?: (filters: any) => void
  onSelectionChange?: (selectedIds: any[]) => void
}
