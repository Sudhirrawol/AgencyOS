import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema, type ProjectFormData } from "../schemas/projectSchema";

function CreateProject() {
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
    console.log("Project data:", data);
  };

  return (
    <form className="ao-card" onSubmit={handleSubmit(onSubmit)}>
      <h2>Create Project</h2>

      <div className="ao-form-grid">
        <div className="ao-field">
          <label className="ao-label" htmlFor="project-name">
            Project Name
          </label>

          <input
            className="ao-input"
            type="text"
            id="project-name"
            placeholder="Enter project name"
            {...register("name")}
          />

          {errors.name && <p className="ao-error">{errors.name.message}</p>}
        </div>

        <div className="ao-field">
          <label className="ao-label" htmlFor="project-status">
            Project Status
          </label>

          <select
            className="ao-input"
            id="project-status"
            {...register("status")}
          >
            <option value="planned">Planned</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          {errors.status && <p className="ao-error">{errors.status.message}</p>}
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <button className="ao-button" type="submit">
          + Create Project
        </button>
      </div>
    </form>
  );
}

export default CreateProject;
