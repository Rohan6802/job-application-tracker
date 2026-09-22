import express from "express";
import {
  createJob,
  getJobs,
  getJobById,
  updateJob,
} from "../controllers/jobController.js";

const router = express.Router();

router.post("/", createJob);
router.get("/", getJobs);
router.get("/:id", getJobById);
router.patch("/:id", updateJob);

export default router;
