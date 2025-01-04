// services/manufacturerService.ts
import { ManufacturerInterface } from "../types";
import { authenticatedFetch } from "@/lib/utils";

export const getManufacturers = async (): Promise<ManufacturerInterface[]> => {
  try {
    return await authenticatedFetch<ManufacturerInterface[]>('/api/manufacturers/')
  } catch (error) {
    console.error('Error fetching manufacturers:', error)
    throw new Error('An error occurred while fetching manufacturers')
  }
};