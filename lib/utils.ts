import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { getToken } from "./auth"


const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

// Generic API call function with authentication
export async function authenticatedFetch<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  const token = getToken()
  
  if (!token) {
    throw new Error('No authentication token found')
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...options.headers,
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    if (response.status === 401) {
      // Handle token expiration
      // You might want to redirect to login or refresh token here
      localStorage.removeItem('accessToken')
      throw new Error('Authentication token expired')
    }
    throw new Error(`API call failed: ${response.statusText}`)
  }

  return response.json()
}