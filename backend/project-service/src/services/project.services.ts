import Project from "../models/project.model.js";

import type z from "zod";

import { createProjectSchema } from "../validators/project.validators.js";

type projectQuery = {
  page: number;
  limit: number;
  search?: string | undefined;
  status?: string | undefined;
  sort?: string;
};

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

export async function getPaginatedProjects({
  page,
  limit,
  search,
  status,
  sort = "newest",
}: projectQuery) {
  console.log("Pagination values:", { page, limit });
  const skip = (page - 1) * limit;

  const filter: Record<string, unknown> = {};

  if (search) {
    const safeSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    filter.name = {
      $regex: safeSearch,
      $options: "i",
    };
  }
  if (status) {
    filter.status = status;
  }
  let sortOptions: Record<string, 1 | -1> = { createdAt: -1, _id: -1 };

  if (sort == "oldest") {
    sortOptions = { createdAt: 1, _id: 1 };
  } else if (sort === "name-asc") {
    sortOptions = { name: 1, _id: 1 };
  } else if (sort === "name-desc") {
    sortOptions = { name: -1, _id: -1 };
  }

  const [projects, total] = await Promise.all([
    Project.find(filter).sort(sortOptions).skip(skip).limit(limit),
    Project.countDocuments(filter),
  ]);
  // English: Check the actual pagination values received.
  // Hinglish: Service mein page aur limit ki values check karo.
  return {
    projects,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}
