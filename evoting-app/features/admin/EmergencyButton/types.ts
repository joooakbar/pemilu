export type EmergencyAction = "SUSPEND" | "RESUME" | "END";

export interface Election {
  id: string;
  nama: string;
  status: string;
}

export interface EmergencyButtonProps {
  election: Election;
}
