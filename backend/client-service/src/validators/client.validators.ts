import z from "zod";

const createClientSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.email(),
  company: z.string().trim().min(1, "Company is required"),
  phone: z.string().optional(),
});

export const updateClientSchema = createClientSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  });

export default createClientSchema;
