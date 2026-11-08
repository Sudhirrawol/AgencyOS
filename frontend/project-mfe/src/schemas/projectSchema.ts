import z from "zod";

export const projectSchema = z.object({
  name: z.string().trim().min(3, "Minimum 3 characters required"),
  status: z.enum(["planned", "in-progress", "completed"]),
});
export type ProjectFormData = z.infer<typeof projectSchema>;
