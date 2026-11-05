import { Router } from "express";

import {
  createProject,
  getProjects,
  updateProject,
} from "../controllers/project.controller.js";

const router = Router();

router.post("/", createProject);
router.get("/", getProjects);
router.put("/:id", updateProject);

export default router;
