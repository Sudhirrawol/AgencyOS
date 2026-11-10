import { z } from "zod";

export const projectSchema = z.object({
  name: z.string().trim().min(3, "Minimum 3 characters required"),

  clientId: z
    .string()
    .regex(/^[a-fA-F0-9]{24}$/, "Please select a valid client"),

  status: z.enum(["planned", "in-progress", "completed"]),
});

export type ProjectFormData = z.infer<typeof projectSchema>;
