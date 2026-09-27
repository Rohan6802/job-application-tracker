export type JobStatus = "Applied" | "Interview" | "Offer" | "Rejected";

export interface Job {
  _id: string;
  company: string;
  position: string;
  status: JobStatus;
  location?: string;
  jobLink?: string;
  applicationDate: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
