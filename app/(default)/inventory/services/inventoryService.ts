// services/manufacturerService.ts
import { 
  ManufacturerInterface, 
  FleetInterface, 
  FleetFormData, 
  ManufacturerFormData,
  ReassignFleetDataInterface,
  AssignFleetDataInterface,
  ReassignmentResponseInterface,
  AssignmentResponseInterface

} from "../types";
import { authenticatedFetch } from "@/lib/utils";

export const getManufacturers = async (): Promise<ManufacturerInterface[]> => {
  try {
    return await authenticatedFetch<ManufacturerInterface[]>('/api/manufacturers/')
  } catch (error) {
    console.error('Error fetching manufacturers:', error)
    throw new Error('An error occurred while fetching manufacturers')
  }
};

export const getFleets = async (): Promise<FleetInterface[]> => {
  try {
    return await authenticatedFetch<FleetInterface[]>('/api/fleets/')
  } catch (error) {
    console.error('Error fetching fleet:', error)
    throw new Error('An error occurred while fetching fleet')
  }
};

export const createFleet = async (data: FleetFormData): Promise<FleetInterface> => {
  try {
    return await authenticatedFetch<FleetInterface>('/api/fleets/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
  catch (error) {
    console.error('Error fetching fleet:', error)
    throw new Error('An error occurred while fetching fleet')
  }
}

export const createManufacturer = async (data: ManufacturerFormData): Promise<ManufacturerInterface> => {
  try {
    return await authenticatedFetch<ManufacturerInterface>('/api/manufacturers/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
  catch (error) {
    console.error('Error creating Manufacturer:', error)
    throw new Error('An error occurred while creating manufacturer')
  }
}

export const reassignFleetToAgent = async (data: ReassignFleetDataInterface): Promise<ReassignmentResponseInterface> => {
  try {
    return await authenticatedFetch<ReassignmentResponseInterface>('/api/fleets/reassign/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
  catch (error) {
    console.error('Error Reassigning Fleet:', error)
    throw new Error('An error occurred while reassigning fleet')
  }
}

export const assignFleetToAgent = async (data: AssignFleetDataInterface): Promise<AssignmentResponseInterface> => {
  try {
    return await authenticatedFetch<AssignmentResponseInterface>('/api/fleets/assign/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
  catch (error) {
    console.error('Error Assigning Fleet:', error)
    throw new Error('An error occurred while Assigning fleet')
  }
}