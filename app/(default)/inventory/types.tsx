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

// Items
export interface PaymentPlanInterface {
  id: number;
  name: string;
  total_amount: string;
  interval_type: string;
  interval_amount: string;
  created_at: string;
  updated_at: string;
}

export interface CustomerInterface {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  created_at: string;
  distributor: number;
  assigned_agent: number;
}

export interface ItemInterface {
  id: number;
  serial_number: string;
  manufacturers: ManufacturerInterface | null;
  fleet: FleetInterface | null;
  encoder_state: any; // Replace with specific type if available
  status: 'pending' | 'partially_paid' | 'fully_paid';
  payment_plan: PaymentPlanInterface | null;
  created_at: string;
  updated_at: string;
  customer: CustomerInterface | null;
}

export type TokenType = 'ADD_TIME' | 'SET_TIME' | 'DISABLE_PAYG' | 'COUNTER_SYNC';

export interface ItemFormData {
  serial_number: string;
  manufacturers?: number | null;
  fleet?: number | null;
  encoder_state?: {
    token_type?: TokenType;
    token_value?: string;
    secret_key?: string;
    starting_code?: string;
    max_count?: number;
    token?: string;
  };
  // Add other fields as needed
}