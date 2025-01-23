// services/manufacturerService.ts
import { 
  ManufacturerInterface, 
  FleetInterface, 
  FleetFormData, 
  ManufacturerFormData,
  ReassignFleetDataInterface,
  AssignFleetDataInterface,
  ReassignmentResponseInterface,
  AssignmentResponseInterface,
  ItemInterface,
  ItemFormData

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

export const getManufacturerById = async (id: string): Promise<ManufacturerInterface> => {
  try {
    if (!id) throw new Error('No manufacturer ID provided');
    
    return await authenticatedFetch<ManufacturerInterface>(`/api/manufacturers/${id}`);
  } catch (error) {
    console.error(`Error fetching manufacturer with ID ${id}:`, error);
    throw new Error('An error occurred while fetching manufacturer by ID');
  }
};

export const editManufacturer = async (id: number, data: ManufacturerFormData): Promise<ManufacturerInterface> => {
  try {
    return await authenticatedFetch<ManufacturerInterface>(`/api/manufacturers/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error('Error updating manufacturers:', error);
    throw new Error('An error occurred while updating manufacturers');
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

export const getFleetById = async (id: string): Promise<FleetInterface> => {
  try {
    if (!id) throw new Error('No fleet ID provided');
    
    return await authenticatedFetch<FleetInterface>(`/api/fleets/${id}`);
  } catch (error) {
    console.error(`Error fetching fleet with ID ${id}:`, error);
    throw new Error('An error occurred while fetching fleet by ID');
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

export const editFleet = async (id: number, data: FleetFormData): Promise<FleetInterface> => {
  try {
    return await authenticatedFetch<FleetInterface>(`/api/fleets/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error('Error updating fleet:', error);
    throw new Error('An error occurred while updating fleet');
  }
};

export const deleteFleet = async (id: number): Promise<{ message: string }> => {
  try {
    return await authenticatedFetch<{ message: string }>(`/api/fleets/${id}/`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error('Error deleting fleet:', error);
    throw new Error('An error occurred while deleting fleet');
  }
};

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

export const deleteManufacturer = async (id: number): Promise<{ message: string }> => {
  try {
    return await authenticatedFetch<{ message: string }>(`/api/manufacturers/${id}/`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error('Error deleting Manufacturer:', error);
    throw new Error('An error occurred while deleting manufacturer');
  }
};

// Items//

export const getItems = async (): Promise<ItemInterface[]> => {
  try {
    return await authenticatedFetch<ItemInterface[]>('/api/items/')
  } catch (error) {
    console.error('Error fetching items:', error)
    throw new Error('An error occurred while fetching items')
  }
};


export const createItem = async (data: ItemFormData): Promise<ItemInterface> => {
  try {
    return await authenticatedFetch<ItemInterface>('/api/items/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error('Error creating item:', error);
    throw new Error('An error occurred while creating item');
  }
};

// Optional: Add updateItem service
export const updateItem = async (id: number, data: ItemFormData): Promise<ItemInterface> => {
  try {
    return await authenticatedFetch<ItemInterface>(`/api/items/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error('Error updating item:', error);
    throw new Error('An error occurred while updating item');
  }
};

export const getItemById = async (id: string): Promise<ItemInterface> => {
  try {
    if (!id) throw new Error('No item ID provided');
    
    return await authenticatedFetch<ItemInterface>(`/api/items/${id}`);
  } catch (error) {
    console.error(`Error fetching item with ID ${id}:`, error);
    throw new Error('An error occurred while fetching item by ID');
  }
};