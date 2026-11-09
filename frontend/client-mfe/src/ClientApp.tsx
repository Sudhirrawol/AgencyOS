import { Provider } from "react-redux";
import { store } from "./store/store";
import {
  useGetClientsQuery,
  useDeleteClientMutation,
  type Client,
} from "./services/clientApi";
import ClientForm from "./components/ClientForm";

function ClientManagement() {
  const { data, isLoading, isError, refetch } = useGetClientsQuery();

  const [deleteClient, { isLoading: isDeleting }] = useDeleteClientMutation();

  const clients: Client[] = data?.userDetails ?? [];

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this client?")) {
      return;
    }

    try {
      await deleteClient(id).unwrap();
    } catch (error) {
      console.error("Failed to delete client:", error);
      window.alert("Failed to delete client.");
    }
  };

  return (
    <main className="ao-page">
      <div className="ao-page-header">
        <div>
          <h1>Client Management</h1>
          <p className="ao-subtitle">
            Manage your clients and business relationships
          </p>
        </div>
      </div>

      <section className="ao-card">
        <ClientForm />
      </section>

      <section className="ao-card">
        <h2>All Clients ({clients.length})</h2>

        {isLoading ? (
          <p className="ao-empty">Loading clients...</p>
        ) : isError ? (
          <div className="ao-empty">
            <p className="ao-error">Failed to load clients.</p>
            <button className="ao-button" onClick={() => refetch()}>
              Retry
            </button>
          </div>
        ) : clients.length === 0 ? (
          <p className="ao-empty">
            No clients found. Create your first client above.
          </p>
        ) : (
          <div className="ao-table-wrap">
            <table className="ao-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Company</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {clients.map((client) => (
                  <tr key={client._id}>
                    <td>{client.name}</td>
                    <td>{client.email}</td>
                    <td>{client.company}</td>
                    <td>{client.phone ?? "-"}</td>
                    <td>
                      <button
                        type="button"
                        className="ao-button ao-button-danger"
                        disabled={isDeleting}
                        onClick={() => handleDelete(client._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

export default function ClientApp() {
  return (
    <Provider store={store}>
      <ClientManagement />
    </Provider>
  );
}
