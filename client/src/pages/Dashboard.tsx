import { useEffect, useState } from "react";
import type { Job, CreateJobData } from "../types/job";
import {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
} from "../services/jobService";
import JobCard from "../components/JobCard";
import JobForm from "../components/JobForm";

export const Dashboard = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [edit, setEdit] = useState<Job | null>(null);

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

  const handleEditJob = async (job: Job) => {
    setEdit(job);
  };
  const handleUpdateJob = async (jobData: CreateJobData) => {
    if (!edit) return;

    const updatedJob = await updateJob(edit._id, jobData);

    setJobs((currentJobs) =>
      currentJobs.map((job) => (job._id === updatedJob._id ? updatedJob : job)),
    );
    setEdit(null);
  };
  const handleDeleteJob = async (job: Job) => {
    await deleteJob(job._id);
    setJobs((currentJobs) => currentJobs.filter((j) => j._id !== job._id));
  };
  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Job Applications:</h2>
      {jobs.map((job) => (
        <JobCard
          key={job._id}
          job={job}
          onEdit={handleEditJob}
          onDelete={handleDeleteJob}
        />
      ))}
      {edit ? (
        <JobForm
          key={edit._id}
          initialValues={edit}
          onSubmit={handleUpdateJob}
          onCancel={() => setEdit(null)}
        />
      ) : (
        <JobForm onSubmit={handleCreateJob} />
      )}
    </div>
  );
};

export default Dashboard;
