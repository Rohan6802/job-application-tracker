import type { Job } from "../types/job";

interface JobCardProps {
  job: Job;
}

export const JobCard = ({ job }: JobCardProps) => {

  return (
    <div>
      <h3>Company: {job.company}</h3>
      <p>Position: {job.position}</p>
      <p>Status: {job.status}</p>
    </div>
  );
};

export default JobCard;
