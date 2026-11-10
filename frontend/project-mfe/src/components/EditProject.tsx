import { useEffect, useState, type FormEvent } from "react";
import { useUpdateProjectMutation, type Project } from "../services/projectApi";

interface EditProjectProps {
  project: Project;
  onClose: () => void;
}

function EditProject({ project, onClose }: EditProjectProps) {
  const [name, setName] = useState(project.name);
  const [status, setStatus] = useState(project.status);

  const [updateProject, { isLoading, isError }] = useUpdateProjectMutation();

  useEffect(() => {
    setName(project.name);
    setStatus(project.status);
  }, [project._id, project.name, project.status]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) return;

    try {
      await updateProject({
        id: project._id,
        data: {
          name: trimmedName,
          status,
        },
      }).unwrap();

      onClose();
    } catch (error) {
      console.error("Failed to update project:", error);
    }
  };

  return (
    <form className="ao-card" onSubmit={handleSubmit}>
      <h2>Edit Project</h2>

      <div className="ao-form-grid">
        <div className="ao-field">
          <label className="ao-label" htmlFor="edit-project-name">
            Project Name
          </label>
          <input
            id="edit-project-name"
            className="ao-input"
            value={name}
            onChange={(event) => setName(event.target.value)}
            minLength={1}
            required
          />
        </div>

        <div className="ao-field">
          <label className="ao-label" htmlFor="edit-project-status">
            Status
          </label>
          <select
            id="edit-project-status"
            className="ao-input"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option value="planned">Planned</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {isError && (
        <p className="ao-error" role="alert">
          Failed to update project.
        </p>
      )}

      <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
        <button
          className="ao-button"
          type="submit"
          disabled={isLoading || !name.trim()}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>

        <button
          className="ao-button ao-button-outline"
          type="button"
          onClick={onClose}
          disabled={isLoading}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EditProject;
