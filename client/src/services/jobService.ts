import axios from "axios";
import type { Job, CreateJobData } from "../types/job";

const API_URL = "http://localhost:5000/api/jobs";

export const getJobs = async (): Promise<Job[]> => {
  const response = await axios.get<Job[]>(API_URL);
  return response.data;
};
export const createJob = async (job: CreateJobData): Promise<Job> => {
  const response = await axios.post<Job>(API_URL, job);
  return response.data;
};

export default { getJobs, createJob };
