import { useState } from "react";
import type { CreateJobData, JobStatus } from "../types/job";

interface JobFormProps {
  initialValues?: CreateJobData;
  onSubmit: (job: CreateJobData) => Promise<void>;
}

const JobForm = ({ onSubmit, initialValues }: JobFormProps) => {
  const [formData, setFormData] = useState<CreateJobData>({
    company: initialValues?.company || "",
    position: initialValues?.position || "",
    status: initialValues?.status || "Applied",
    location: initialValues?.location || "",
    applicationDate:
      initialValues?.applicationDate || new Date().toISOString().slice(0, 10),
    jobLink: initialValues?.jobLink || "",
    notes: initialValues?.notes || "",
  });
  const [status, setStatus] = useState<{
    loading: boolean;
    error: string | null;
  }>({
    loading: false,
    error: null,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (status.loading) return;
    setStatus({ loading: true, error: null });

    try {
      await onSubmit(formData);

      setFormData({
        company: "",
        position: "",
        status: "Applied",
        location: "",
        applicationDate: new Date().toISOString().slice(0, 10),
        jobLink: "",
        notes: "",
      });
    } catch (err: unknown) {
      setStatus((prev) => ({
        ...prev,
        error:
          (err as Error).message || "Failed to submit the job application.",
      }));
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Error Banner */}
      {status.error && (
        <div style={{ color: "red", marginBottom: "1rem" }}>{status.error}</div>
      )}

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
      <label htmlFor="location-input">Location</label>
      <input
        id="location-input"
        type="text"
        name="location"
        value={formData.location}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
      />
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
      <label htmlFor="jobLink-input">Job Link</label>
      <input
        id="jobLink-input"
        type="url"
        name="jobLink"
        value={formData.jobLink}
        onChange={(e) => setFormData({ ...formData, jobLink: e.target.value })}
      />
      <label htmlFor="notes-input">Notes</label>
      <textarea
        id="notes-input"
        name="notes"
        value={formData.notes}
        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
      />
      <button type="submit" disabled={status.loading}>
        {status.loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default JobForm;
