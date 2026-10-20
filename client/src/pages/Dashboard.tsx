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
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

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
    setIsFormOpen(false);
  };

  const handleEditJob = async (job: Job) => {
    setEdit(job);
    setIsFormOpen(true);
  };
  const handleUpdateJob = async (jobData: CreateJobData) => {
    if (!edit) return;

    const updatedJob = await updateJob(edit._id, jobData);

    setJobs((currentJobs) =>
      currentJobs.map((job) => (job._id === updatedJob._id ? updatedJob : job)),
    );
    setEdit(null);
    setIsFormOpen(false);
  };
  const handleDeleteJob = async (job: Job) => {
    await deleteJob(job._id);
    setJobs((currentJobs) => currentJobs.filter((j) => j._id !== job._id));
  };
  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>
      <button
        type="button"
        className="add-job-button"
        onClick={() => {
          setEdit(null);
          setIsFormOpen(true);
        }}
      >
        + Add Job Application
      </button>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Applications</h3>
          <p>{totalApplications}</p>
        </div>
        <div className="stat-card">
          <h3>Applied</h3>
          <p>{appliedCount}</p>
        </div>
        <div className="stat-card">
          <h3>Interview</h3>
          <p>{interviewCount}</p>
        </div>
        <div className="stat-card">
          <h3>Offer</h3>
          <p>{offerCount}</p>
        </div>
        <div className="stat-card">
          <h3>Rejected</h3>
          <p>{rejectedCount}</p>
        </div>
      </div>
      <h2 className="section-title">Job Applications:</h2>
      <div className="toolbar">
        <input
          className="search-input"
          type="text"
          placeholder="Search by company or position"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <label htmlFor="status-filter">Filter by Status:</label>
        <select
          className="filter-select"
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
          className="filter-select"
          id="sort-order"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
      {sortedJobs.map((job) => (
        <JobCard
          key={job._id}
          job={job}
          onEdit={handleEditJob}
          onDelete={handleDeleteJob}
        />
      ))}
      {isFormOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{edit ? "Edit Application" : "Add Application"}</h2>

            {edit ? (
              <JobForm
                key={edit._id}
                initialValues={edit}
                onSubmit={handleUpdateJob}
                onCancel={() => {
                  setEdit(null);
                  setIsFormOpen(false);
                }}
              />
            ) : (
              <JobForm
                onSubmit={handleCreateJob}
                onCancel={() => setIsFormOpen(false)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
