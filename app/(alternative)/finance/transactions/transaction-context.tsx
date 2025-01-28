'use client'

import { createContext, useContext, useState } from 'react'
import { Transaction } from './transactions-table'
import { GeneratedCodeResponse } from '@/app/(default)/inventory/types'

interface TransactionDetailContextProps {
  transaction: GeneratedCodeResponse | null
  setTransaction: (transaction: GeneratedCodeResponse | null) => void
}

const TransactionDetailContext = createContext<TransactionDetailContextProps | undefined>(undefined)

export const TransactionDetailProvider = ({ children }: {
  children: React.ReactNode
}) => {
  const [transaction, setTransaction] = useState<GeneratedCodeResponse | null>(null)
  return (
    <TransactionDetailContext.Provider value={{ transaction, setTransaction }}>
      {children}
    </TransactionDetailContext.Provider>
  )
}

export const useTransactionDetail = () => {
  const context = useContext(TransactionDetailContext)
  if (!context) {
    throw new Error('useTransaction must be used within a TransactionProvider')
  }
  return context
}