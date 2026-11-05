import { z } from "zod";

// Common fields for CREATE and UPDATE
const projectFields = z.object({
  name: z.string().trim().min(1, "Project name is required"),

  description: z.string().trim().optional(),

  clientId: z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid client ID"),

  status: z.enum(["planned", "in-progress", "completed"]),

  startDate: z.coerce.date().optional(),

  endDate: z.coerce.date().optional(),
});

// CREATE validation
export const createProjectSchema = projectFields
  .extend({
    status: projectFields.shape.status.default("planned"),
  })
  .refine(
    (data) =>
      !data.startDate || !data.endDate || data.endDate >= data.startDate,
    {
      message: "End date cannot be earlier than start date",
      path: ["endDate"],
    },
  );
// UPDATE validation
export const updateProjectSchema = projectFields
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  })
  .refine(
    (data) =>
      !data.startDate || !data.endDate || data.endDate >= data.startDate,
    {
      message: "End date cannot be earlier than start date",
      path: ["endDate"],
    },
  );
