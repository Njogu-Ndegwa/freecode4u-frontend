"use client"
// contexts/BannerContext.tsx
import { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react'
import Alert from '@/components/alert'

type AlertType = 'warning' | 'error' | 'success' | ''

interface AlertParams {
  text: string
  type: AlertType
}

interface AlertContextType {
  alert: (params: AlertParams) => void
}

const AlertContext = createContext<AlertContextType>({} as AlertContextType)

export function AlertProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [alertProps, setAlertProps] = useState<AlertParams>({ text: '', type: '' })
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const showAlert = ({ text, type }: AlertParams) => {
    // Clear any existing timeout
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    
    // Update Alert content and show
    setAlertProps({ text, type })
    setIsOpen(true)
    
    // Set timeout to hide after 1 second
    timeoutRef.current = setTimeout(() => setIsOpen(false), 3000)
  }
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <AlertContext.Provider value={{ alert: showAlert }}>
      {children}
      <Alert
        type={alertProps.type}
        open={isOpen}
        setOpen={setIsOpen}
      >
        {alertProps.text}
      </Alert>
    </AlertContext.Provider>
  )
}

export const useAlert = () => useContext(AlertContext)