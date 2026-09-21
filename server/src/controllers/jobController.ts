import Job from "../models/Job.js";
import { Request, Response } from "express";

export const createJob = async (req: Request, res: Response) => {
  try {
    const {
      company,
      position,
      status,
      location,
      jobLink,
      applicationDate,
      notes,
    } = req.body;

    const newJob = new Job({
      company,
      position,
      status,
      location,
      jobLink,
      applicationDate,
      notes,
    });
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message || "server error" });
  }
};

export const getJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await Job.find();

    res.status(200).json(jobs);
  } catch (error: any) {
    console.error(error);

    res.status(500).json({ error: error.message || "server error" });
  }
};
