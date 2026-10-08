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
      <p>Location: {job.location}</p>
      <p>
        Application Date: {new Date(job.applicationDate).toLocaleDateString()}
      </p>
      {/* {job.jobLink && (
        <p>
          <a href={job.jobLink} target="_blank" rel="noopener noreferrer">
            View Job Posting
          </a>
        </p>
      )} */}
    </div>
  );
};

export default JobCard;
