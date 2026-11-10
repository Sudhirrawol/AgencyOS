import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema, type ProjectFormData } from "../schemas/projectSchema";
import {
  useCreateProjectMutation,
  useGetProjectClientsQuery,
} from "../services/projectApi";

function CreateProject() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      clientId: "",
      status: "planned",
    },
  });

  const {
    data: clientsData,
    isLoading: isClientsLoading,
    isError: isClientsError,
    refetch: refetchClients,
  } = useGetProjectClientsQuery(undefined, { refetchOnMountOrArgChange: true });

  const [createProject, { isLoading, isError, isSuccess }] =
    useCreateProjectMutation();

  const onSubmit = async (data: ProjectFormData) => {
    try {
      await createProject(data).unwrap();
      reset();
    } catch (error) {
      console.error("Create project failed:", error);
    }
  };

  const clients = clientsData?.userDetails ?? [];

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
          <label className="ao-label" htmlFor="project-client">
            Client
          </label>
          <select
            className="ao-input"
            id="project-client"
            disabled={isClientsLoading || isClientsError}
            {...register("clientId")}
          >
            <option value="">Select Client</option>
            {clients.map((client) => (
              <option key={client._id} value={client._id}>
                {client.name}
              </option>
            ))}
          </select>
          {isClientsLoading && <p>Loading clients...</p>}
          {isClientsError && (
            <div>
              <p className="ao-error">Failed to load clients.</p>
              <button type="button" onClick={() => refetchClients()}>
                Retry
              </button>
            </div>
          )}
          {!isClientsLoading && !isClientsError && clients.length === 0 && (
            <p>No clients found. Create a client first.</p>
          )}
          {errors.clientId && (
            <p className="ao-error">{errors.clientId.message}</p>
          )}
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
        <button
          className="ao-button"
          type="submit"
          disabled={
            isLoading ||
            isClientsLoading ||
            isClientsError ||
            clients.length === 0
          }
        >
          {isLoading ? "Creating..." : "+ Create Project"}
        </button>
      </div>

      {isError && (
        <p className="ao-error" role="alert">
          Failed to create project.
        </p>
      )}
      {isSuccess && <p role="status">Project created successfully.</p>}
    </form>
  );
}

export default CreateProject;
