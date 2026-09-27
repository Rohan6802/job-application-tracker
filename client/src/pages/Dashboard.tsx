import { useEffect, useState } from "react";
import type { Job } from "../types/job";
import { getJobs } from "../services/jobService";
import JobCard from "../components/JobCard";

export const Dashboard = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const fetchedJobs = await getJobs();
      setJobs(fetchedJobs);
    };

    void fetchJobs();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Job Applications:</h2>
      {jobs.map((job) => (
        <JobCard key={job._id} job={job} />
      ))}
    </div>
  );
};

export default Dashboard;
