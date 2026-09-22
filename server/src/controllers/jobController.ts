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

export const getJobById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);

    if (!job) {
      res.status(404).json({ message: `Job with Id ${id} does not exist` });
      return;
    }
    res.status(200).json(job);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message || "server error" });
  }
};

export const updateJob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const jobUpdate = req.body;

    const updatedJob = await Job.findByIdAndUpdate(id, jobUpdate, {
      new: true,
    });
    if (!updatedJob) {
      res.status(404).json({ message: `Job with Id ${id} does not exist` });
      return;
    }
    res.status(200).json(updatedJob);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message || "server error" });
  }
};
