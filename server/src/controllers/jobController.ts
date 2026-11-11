import type { Response, NextFunction } from "express";
import mongoose from "mongoose";
import Job from "../models/Job.js";
import type { AuthRequest } from "../middleware/authMiddleware.js";

// Create a job
export const createJob = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: "Authentication required" });
      return;
    }

    const {
      company,
      position,
      status,
      location,
      jobLink,
      applicationDate,
      notes,
    } = req.body;

    const job = await Job.create({
      company,
      position,
      status,
      location,
      jobLink,
      applicationDate,
      notes,
      userId: new mongoose.Types.ObjectId(req.userId),
    });

    res.status(201).json(job);
  } catch (error) {
    next(error);
  }
};

// Get all jobs belonging to the logged-in user
export const getJobs = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: "Authentication required" });
      return;
    }

    const jobs = await Job.find({ userId: req.userId }).sort({
      createdAt: -1,
    });

    res.status(200).json(jobs);
  } catch (error) {
    next(error);
  }
};

// Get one job belonging to the logged-in user
export const getJobById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: "Authentication required" });
      return;
    }

    const id = req.params.id;
    if (typeof id !== "string") {
      res.status(400).json({ message: "Invalid Job Id" });
      return;
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid job ID" });
      return;
    }

    const job = await Job.findOne({
      _id: id,
      userId: req.userId,
    });

    if (!job) {
      res.status(404).json({ message: "Job not found" });
      return;
    }

    res.status(200).json(job);
  } catch (error) {
    next(error);
  }
};

// Update a job belonging to the logged-in user
export const updateJob = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: "Authentication required" });
      return;
    }

    const id = req.params.id;

    if (typeof id !== "string") {
      res.status(400).json({ message: "Invalid Job Id" });
      return;
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid job ID" });
      return;
    }

    // Only allow editable job fields; never accept userId from the client.
    const {
      company,
      position,
      status,
      location,
      jobLink,
      applicationDate,
      notes,
    } = req.body;

    const updates: Record<string, unknown> = {};

    if (company !== undefined) updates.company = company;
    if (position !== undefined) updates.position = position;
    if (status !== undefined) updates.status = status;
    if (location !== undefined) updates.location = location;
    if (jobLink !== undefined) updates.jobLink = jobLink;
    if (applicationDate !== undefined) {
      updates.applicationDate = applicationDate;
    }
    if (notes !== undefined) updates.notes = notes;

    const job = await Job.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { $set: updates },
      { new: true, runValidators: true },
    );

    if (!job) {
      res.status(404).json({ message: "Job not found" });
      return;
    }

    res.status(200).json(job);
  } catch (error) {
    next(error);
  }
};

// Delete a job belonging to the logged-in user
export const deleteJob = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: "Authentication required" });
      return;
    }

    const id = req.params.id;

    if (typeof id !== "string") {
      res.status(400).json({ message: "Invalid Job Id" });
      return;
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid job ID" });
      return;
    }

    const job = await Job.findOneAndDelete({
      _id: id,
      userId: req.userId,
    });

    if (!job) {
      res.status(404).json({ message: "Job not found" });
      return;
    }

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    next(error);
  }
};
