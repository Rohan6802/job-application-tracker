import mongoose, { Document, Schema } from "mongoose";

export interface IJob extends Document {
  company: string;
  position: string;
  status: "Applied" | "Interview" | "Offer" | "Rejected";
  location?: string;
  jobLink?: string;
  applicationDate?: Date;
  notes?: string;
}

const jobSchema = new Schema<IJob>(
  {
    company: { type: String, required: true, trim: true },
    position: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["Applied", "Interview", "Offer", "Rejected"],
      default: "Applied",
    },
    location: { type: String, trim: true },
    jobLink: { type: String, trim: true },
    applicationDate: { type: Date, required: true },
    notes: { type: String, trim: true },
  },
  { timestamps: true },
);

const Job = mongoose.model<IJob>("Job", jobSchema);

export default Job;
