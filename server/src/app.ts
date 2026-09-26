import express from "express";
import cors from "cors";
import jobRoutes from "./routes/jobRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import { Request, Response } from "express";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

app.use("/api/jobs", jobRoutes);
app.use((req: Request, res: Response) => {
  res
    .status(404)
    .json({ message: `Route ${req.method} ${req.originalUrl} not found` });
});
app.use(errorMiddleware);

export default app;
