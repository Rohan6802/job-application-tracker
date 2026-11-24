import axios from "axios";
import type { Job, CreateJobData } from "../types/job";

const API_URL = import.meta.env.VITE_API_URL;

const getAuthConfig = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const getJobs = async (token: string): Promise<Job[]> => {
  const response = await axios.get<Job[]>(API_URL, getAuthConfig(token));
  return response.data;
};

export const createJob = async (
  job: CreateJobData,
  token: string,
): Promise<Job> => {
  const response = await axios.post<Job>(API_URL, job, getAuthConfig(token));
  return response.data;
};

export const updateJob = async (
  id: string,
  job: CreateJobData,
  token: string,
): Promise<Job> => {
  const response = await axios.patch<Job>(
    `${API_URL}/${id}`,
    job,
    getAuthConfig(token),
  );
  return response.data;
};

export const deleteJob = async (id: string, token: string): Promise<void> => {
  await axios.delete<void>(`${API_URL}/${id}`, getAuthConfig(token));
};

export default { getJobs, createJob, updateJob, deleteJob };
