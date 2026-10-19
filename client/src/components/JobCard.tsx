import type { Job } from "../types/job";

interface JobCardProps {
  job: Job;
  onEdit: (job: Job) => void;
  onDelete: (job: Job) => void;
}

export const JobCard = ({ job, onEdit, onDelete }: JobCardProps) => {
  return (
    <div>
      <h3>Company: {job.company}</h3>
      <p>Position: {job.position}</p>
      <p>Status: {job.status}</p>
      <p>Location: {job.location}</p>
      <p>
        Application Date: {new Date(job.applicationDate).toLocaleDateString()}
      </p>
      <button type="button" onClick={() => onEdit(job)}>
        Edit
      </button>
      <button type="button" onClick={() => onDelete(job)}>
        Delete
      </button>
    </div>
  );
};

export default JobCard;
