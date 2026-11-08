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
    // Ask for confirmation before deleting
    if (!window.confirm("Are you sure you want to delete this client?")) {
      return;
    }

    try {
      // DELETE /api/clients/:id
      await deleteClient(id).unwrap();
    } catch (error) {
      console.error("Failed to delete client:", error);
      window.alert("Failed to delete client.");
    }
  };
  if (isLoading) {
    return <p>Loading clients...</p>;
  }
  if (isError) {
    return (
      <div>
        <p>Failed to load clients</p>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );
  }
  return (
    <main>
      <h1>Client Management</h1>
      <ClientForm />
      {clients.length === 0 ? (
        <p>No clients found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Company</th>
              <th>Phone</th>
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
                    onClick={() => handleDelete(client._id)}
                    disabled={isDeleting}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}

function ClientApp() {
  return (
    <Provider store={store}>
      <ClientManagement />
    </Provider>
  );
}
export default ClientApp;
