import type { Request, Response } from "express";
import z from "zod";
import {
  createProjectSchema,
  updateProjectSchema,
} from "../validators/project.validators.js";
import {
  createNewProject,
  getAllProjects,
  getPaginatedProjects,
  updateProjectById,
} from "../services/project.services.js";
import { request } from "node:http";
import mongoose from "mongoose";

export async function createProject(req: Request, res: Response) {
  try {
    const result = createProjectSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Invalid project data",
        errors: z.treeifyError(result.error),
      });
    }
    const project = await createNewProject(result.data);

    return res.status(201).json({
      message: "Project created succesfully",
      project,
    });
  } catch (error) {
    console.error("Create project error :", error);
    return res.status(500).json({
      message: "Failed to create project",
    });
  }
}

export async function getProjects(req: Request, res: Response) {
  try {
    const page = Number(req.query.page ?? 1);

    const limit = Number(req.query.limit ?? 10);

    if (
      !Number.isInteger(page) ||
      !Number.isInteger(limit) ||
      page < 1 ||
      limit < 1 ||
      limit > 100
    ) {
      return res.status(400).json({
        message: "Invalid pagination parameters",
      });
    }

    const result = await getPaginatedProjects(page, limit);

    return res.status(200).json({
      message: "Projects fetched succesfully",
      ...result,
    });
  } catch (error) {
    console.error("get projects error : ", error);

    return res.status(500).json({
      message: "Failed to fetch projects",
    });
  }
}

export async function updateProject(req: Request, res: Response) {
  try {
    const id = req.params.id;

    if (typeof id !== "string" || !mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid project ID",
      });
    }
    const result = updateProjectSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        errors: z.treeifyError(result.error),
      });
    }
    const updatedProject = await updateProjectById(id, result.data);

    if (!updatedProject) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    return res.status(200).json({
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (error) {
    console.error("Update project error:", error);

    return res.status(500).json({
      message: "Failed to update project",
    });
  }
}
