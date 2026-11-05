import express from "express";
import projectRouter from "./routes/project.routes.js";

import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/projects", projectRouter);

app.get("/api/projects/health", (req, res) => {
  res.status(200).json({
    service: "project-service",
    status: "up",
  });
});

export default app;
