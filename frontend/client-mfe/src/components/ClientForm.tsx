import { useState, type FormEvent } from "react";
import {
  useCreateClientMutation,
  type CreateClientRequest,
} from "../services/clientApi";

const initialForm: CreateClientRequest = {
  name: "",
  email: "",
  company: "",
  phone: "",
};

export default function ClientForm() {
  // Store values entered by the user
  const [formData, setFormData] = useState<CreateClientRequest>(initialForm);

  // RTK Query POST API hook
  const [createClient, { isLoading, isError }] = useCreateClientMutation();

  // Update the selected input field
  const handleChange = (field: keyof CreateClientRequest, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Submit form data to backend
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // POST /api/clients
      await createClient({
        name: formData.name.trim(),
        email: formData.email.trim(),
        company: formData.company.trim(),
        ...(formData.phone?.trim() ? { phone: formData.phone.trim() } : {}),
      }).unwrap();

      // Clear inputs after successful creation
      setFormData({ ...initialForm });
    } catch (error) {
      console.error("Create client failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Client</h2>

      <div className="ao-form-grid">
        <label className="ao-field">
          <span className="ao-label">Client Name</span>
          <input
            className="ao-input"
            placeholder="Enter client name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            required
          />
        </label>

        <label className="ao-field">
          <span className="ao-label">Email Address</span>
          <input
            className="ao-input"
            type="email"
            placeholder="client@example.com"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            required
          />
        </label>

        <label className="ao-field">
          <span className="ao-label">Company</span>
          <input
            className="ao-input"
            placeholder="Company name"
            value={formData.company}
            onChange={(e) => handleChange("company", e.target.value)}
            required
          />
        </label>

        <label className="ao-field">
          <span className="ao-label">Phone (Optional)</span>
          <input
            className="ao-input"
            type="tel"
            placeholder="Phone number"
            value={formData.phone ?? ""}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </label>
      </div>

      <div style={{ marginTop: 24 }}>
        <button className="ao-button" type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "+ Create Client"}
        </button>
      </div>

      {isError && (
        <p className="ao-error" role="alert">
          Failed to create client.
        </p>
      )}
    </form>
  );
}
