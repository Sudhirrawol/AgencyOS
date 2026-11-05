import Project from "../models/project.model.js";

import type z from "zod";

import { createProjectSchema } from "../validators/project.validators.js";
import { setHeapSnapshotNearHeapLimit } from "v8";

type CreateProjectData = z.output<typeof createProjectSchema>;

export async function createNewProject(data: CreateProjectData) {
  const project = new Project(data);
  return await project.save();
}
export async function getAllProjects() {
  return await Project.find({});
}

export async function updateProjectById(
  id: string,
  data: Record<string, unknown>,
) {
  return await Project.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

export async function getPaginatedProjects(page: number, limit: number) {
  const skip = (page - 1) * limit;

  const [projects, total] = await Promise.all([
    Project.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
    Project.countDocuments(),
  ]);

  return {
    projects,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}
