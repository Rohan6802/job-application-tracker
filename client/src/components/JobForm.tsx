import { useState } from "react";
import type { CreateJobData, JobStatus } from "../types/job";

interface JobFormProps {
  initialValues?: CreateJobData;
  onSubmit: (job: CreateJobData) => void;
}

const JobForm = ({ onSubmit, initialValues }: JobFormProps) => {
  const [formData, setFormData] = useState<CreateJobData>({
    company: initialValues?.company || "",
    position: initialValues?.position || "",
    status: initialValues?.status || "Applied",
    applicationDate:
      initialValues?.applicationDate || new Date().toISOString().slice(0, 10),
  });
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formData);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="company-input">Company</label>
      <input
        id="company-input"
        type="text"
        name="company"
        value={formData.company}
        required
        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
      />
      <label htmlFor="position-input">Position</label>
      <input
        id="position-input"
        type="text"
        name="position"
        required
        value={formData.position}
        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
      />
      <label htmlFor="status-input">Status</label>
      <select
        id="status-input"
        name="status"
        value={formData.status}
        onChange={(e) =>
          setFormData({ ...formData, status: e.target.value as JobStatus })
        }
      >
        <option value="Applied">Applied</option>
        <option value="Interview">Interviewing</option>
        <option value="Offer">Offer Received</option>
        <option value="Rejected">Rejected</option>
      </select>
      <label htmlFor="applicationDate-input">Application Date</label>
      <input
        id="applicationDate-input"
        type="date"
        name="applicationDate"
        value={formData.applicationDate}
        required
        onChange={(e) =>
          setFormData({ ...formData, applicationDate: e.target.value })
        }
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default JobForm;
