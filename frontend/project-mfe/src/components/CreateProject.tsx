import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema, type ProjectFormData } from "../schemas/projectSchema";

function Createproject() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      status: "planned",
    },
  });
  const onSubmit = (data: ProjectFormData) => {
    console.log("Project data : ", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Create Project</h2>

      <div>
        <label htmlFor="project-name">Project Name</label>
        <input
          type="text"
          id="project-name"
          placeholder="Enter project name"
          {...register("name")}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="project-status">Project Status</label>
        <select id="project-status" {...register("status")}>
          <option value="planned">Planned</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        {errors.status && <p>{errors.status.message}</p>}
      </div>
      <button type="submit">Create Project</button>
    </form>
  );
}

export default Createproject;
