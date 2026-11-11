import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
} from "../controllers/jobController.js";

const router = express.Router();

router.post("/", authMiddleware, createJob);
router.get("/", authMiddleware, getJobs);
router.get("/:id", authMiddleware, getJobById);
router.patch("/:id", authMiddleware, updateJob);
router.delete("/:id", authMiddleware, deleteJob);

export default router;
