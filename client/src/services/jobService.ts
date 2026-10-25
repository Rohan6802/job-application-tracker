import axios from "axios";
import type { Job, CreateJobData } from "../types/job";

const API_URL = import.meta.env.VITE_API_URL;

export const getJobs = async (): Promise<Job[]> => {
  const response = await axios.get<Job[]>(API_URL);
  return response.data;
};
export const createJob = async (job: CreateJobData): Promise<Job> => {
  const response = await axios.post<Job>(API_URL, job);
  return response.data;
};

export const updateJob = async (
  id: string,
  job: CreateJobData,
): Promise<Job> => {
  const response = await axios.patch<Job>(`${API_URL}/${id}`, job);
  return response.data;
};

export const deleteJob = async (id: string): Promise<void> => {
  await axios.delete<void>(`${API_URL}/${id}`);
};
export default { getJobs, createJob, updateJob, deleteJob };
