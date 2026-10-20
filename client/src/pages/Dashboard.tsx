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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const totalApplications = jobs.length;

  const appliedCount = jobs.filter((job) => job.status === "Applied").length;
  const interviewCount = jobs.filter(
    (job) => job.status === "Interview",
  ).length;
  const offerCount = jobs.filter((job) => job.status === "Offer").length;
  const rejectedCount = jobs.filter((job) => job.status === "Rejected").length;

  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  const filteredJobs = jobs.filter((job) => {
    const matchesSearchTerm =
      job.company.toLowerCase().includes(lowerCaseSearchTerm) ||
      job.position.toLowerCase().includes(lowerCaseSearchTerm);
    const statusMatches = statusFilter === "All" || job.status === statusFilter;
    return matchesSearchTerm && statusMatches;
  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortOrder === "newest") {
      return (
        new Date(b.applicationDate).getTime() -
        new Date(a.applicationDate).getTime()
      );
    } else {
      return (
        new Date(a.applicationDate).getTime() -
        new Date(b.applicationDate).getTime()
      );
    }
  });

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
      <div>
        <h3>Total Applications</h3>
        <p>{totalApplications}</p>
      </div>
      <div>
        <h3>Applied</h3>
        <p>{appliedCount}</p>
      </div>
      <div>
        <h3>Interview</h3>
        <p>{interviewCount}</p>
      </div>
      <div>
        <h3>Offer</h3>
        <p>{offerCount}</p>
      </div>
      <div>
        <h3>Rejected</h3>
        <p>{rejectedCount}</p>
      </div>

      <h2>Job Applications:</h2>
      <input
        type="text"
        placeholder="Search by company or position"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <label htmlFor="status-filter">Filter by Status:</label>
      <select
        id="status-filter"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
      </select>
      <label htmlFor="sort-order">Sort by Date:</label>
      <select
        id="sort-order"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>
      {sortedJobs.map((job) => (
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
