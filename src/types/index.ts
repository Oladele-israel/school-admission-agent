export type Stage =
  | 'inquiry'
  | 'tour_booked'
  | 'tour_completed'
  | 'application_submitted'
  | 'fee_pending'
  | 'enrolled'
  | 'lost';

export type Role = 'admissions_officer' | 'bursar' | 'admin';

export type EscalationType = 'fee_negotiation' | 'complaint' | 'edge_case';

export interface Applicant {
  id: string;
  name: string;
  phone: string;
  stage: Stage;
  created_at: string;
}

export interface EscalationTask {
  id: string;
  applicant_id: string;
  applicant_name: string;
  type: EscalationType;
  snippet: string;
  status: 'pending' | 'resolved';
  assigned_role: Role;
  created_at: string;
}