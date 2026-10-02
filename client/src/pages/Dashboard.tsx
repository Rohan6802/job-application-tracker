import { useEffect, useState } from "react";
import type { Job, CreateJobData } from "../types/job";
import { getJobs, createJob } from "../services/jobService";
import JobCard from "../components/JobCard";
import JobForm from "../components/JobForm";

export const Dashboard = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const fetchedJobs = await getJobs();
      setJobs(fetchedJobs);
    };

    void fetchJobs();
  }, []);

  const handleCreateJob = async (jobData: CreateJobData) => {
    const newJob = await createJob(jobData);
    setJobs((currentJobs) => [newJob, ...currentJobs]);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Job Applications:</h2>
      {jobs.map((job) => (
        <JobCard key={job._id} job={job} />
      ))}
      <JobForm onSubmit={handleCreateJob} />
    </div>
  );
};

export default Dashboard;
