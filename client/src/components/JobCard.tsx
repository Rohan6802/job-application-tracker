import type { Job } from "../types/job";

interface JobCardProps {
  job: Job;
  onEdit: (job: Job) => void;
  onDelete: (job: Job) => void;
}

export const JobCard = ({ job, onEdit, onDelete }: JobCardProps) => {
  return (
    <div className="job-card">
      <h3 className="job-company">Company: {job.company}</h3>
      <p className="job-position">Position: {job.position}</p>
      <p className="job-status">Status: {job.status}</p>
      <p className="job-location">Location: {job.location}</p>
      <p className="job-date">
        Application Date: {new Date(job.applicationDate).toLocaleDateString()}
      </p>
      <button className="edit-button" type="button" onClick={() => onEdit(job)}>
        Edit
      </button>
      <button
        className="delete-button"
        type="button"
        onClick={() => onDelete(job)}
      >
        Delete
      </button>
    </div>
  );
};

export default JobCard;
