export interface ManufacturerInterface {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  // Add other fields as needed
}

export interface FleetInterface {
  id: number;
  name: string;
  description: string;
  assigned_agent: {
    id: number;
    email: string;
    user_type: string;
    distributor: number;
  } | null;
  created_at: string;
  updated_at: string;
  // Add other fields as needed
}

export interface FleetFormData {
  name: string;
  description: string;
}

export interface ManufacturerFormData {
  name: string;
  description: string;
}

export interface ReassignFleetDataInterface {
  new_agent_id: number
  fleet_ids: number[]
}

export interface AssignFleetDataInterface {
  agent_id: number
  fleet_ids: number[]
}

interface ReassignmentItem {
  fleet_id: number;
  old_agent_id: number;
}

interface AssignmentItem {
  fleet_ids: number;
  agent_id: number;
}

export interface ReassignmentResponseInterface {
  reassigned: ReassignmentItem[];
  errors: any[]; // or string[] depending on what type of errors you expect
}

export interface AssignmentResponseInterface {
  assigned_fleet_ids: AssignmentItem[];
  errors: any[]; // or string[] depending on what type of errors you expect
}
