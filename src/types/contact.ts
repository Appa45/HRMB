export type ContactStage = "Lead" | "Prospect" | "Qualified" | "Customer";
export type DatabaseView = "table" | "board";

export interface Contact {
  id: string;
  name: string;
  email?: string;
  company?: string;
  role?: string;
  owner?: string;
  labels: string[];
  stage: ContactStage;
  notes?: string;
  avatarColor: string;
}
