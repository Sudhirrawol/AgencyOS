import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// 1. Client data structure returned by the backend
export interface Client {
  _id: string; // MongoDB-generated client ID
  name: string; // Client name
  email: string; // Client email
  company: string; // Company name
  phone?: string; // Optional phone number
}

// 2. Create request: reuse Client fields but exclude _id
// MongoDB generates _id, so frontend does not send it
export type CreateClientRequest = Omit<Client, "_id">;

// 3. Update request: ID identifies the client
// Partial allows updating only selected fields
export interface UpdateClientRequest {
  id: string;
  data: Partial<CreateClientRequest>;
}

// 4. Backend response for one client
// POST, GET by ID and PUT return userDetails
interface ClientResponse {
  message: string;
  userDetails: Client;
}

// 5. Backend response for GET all clients
interface ClientsResponse {
  message: string;
  userDetails: Client[];
}

// 6. Backend response for DELETE
interface DeleteClientResponse {
  message: string;
  deletedClient: Client;
}

// 7. Create the RTK Query API service
export const clientApi = createApi({
  // Key used to store this API's cache in Redux
  reducerPath: "clientApi",

  // Common URL for all client endpoints
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api/clients",
  }),

  // Declare cache tag for client-related data
  tagTypes: ["Clients"],

  // Define all API endpoints
  endpoints: (builder) => ({
    // GET /api/clients
    // Fetch all clients from MongoDB
    getClients: builder.query<ClientsResponse, void>({
      query: () => "",
      providesTags: ["Clients"],
    }),

    // GET /api/clients/:id
    // Fetch a client using its dynamic MongoDB ID
    getClientById: builder.query<ClientResponse, string>({
      query: (id) => `/${id}`,
      providesTags: ["Clients"],
    }),

    // POST /api/clients
    // Send form data to create a new client
    createClient: builder.mutation<ClientResponse, CreateClientRequest>({
      query: (data) => ({
        url: "",
        method: "POST",
        body: data,
      }),

      // Refresh subscribed client queries after creation
      invalidatesTags: ["Clients"],
    }),

    // PUT /api/clients/:id
    // Update an existing client using its ID
    updateClient: builder.mutation<ClientResponse, UpdateClientRequest>({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),

      // Refresh subscribed client queries after update
      invalidatesTags: ["Clients"],
    }),

    // DELETE /api/clients/:id
    // Delete a client using its ID
    deleteClient: builder.mutation<DeleteClientResponse, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),

      // Refresh subscribed client queries after deletion
      invalidatesTags: ["Clients"],
    }),
  }),
});

// 8. RTK Query automatically generates React hooks
export const {
  useGetClientsQuery,
  useGetClientByIdQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
} = clientApi;
