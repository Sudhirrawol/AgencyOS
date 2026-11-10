import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Project {
  _id: string;
  name: string;
  status: string;
  clientId: string;
}

interface ProjectResponse {
  projects: Project[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface ProjectQueryParams {
  search?: string;
  status?: string;
  sort?: string;
  page?: number;
  limit?: number;
}
export interface CreateProjectRequest {
  name: string;
  status: Project["status"];
  clientId: string;
}

export interface UpdateProjectRequest {
  id: string;
  data: Partial<CreateProjectRequest>;
}

export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3002/api/",
  }),
  tagTypes: ["Projects"],
  endpoints: (builder) => ({
    getProjects: builder.query<ProjectResponse, ProjectQueryParams>({
      query: ({ search, status, sort, page, limit }) => ({
        url: "projects",
        params: {
          ...(search?.trim() ? { search: search.trim() } : {}),
          ...(status ? { status } : {}),
          ...(sort ? { sort } : {}),
          page,
          limit,
        },
      }),
      providesTags: ["Projects"],
    }),
    createProject: builder.mutation({
      query: (newProject) => ({
        url: "projects",
        method: "POST",
        body: newProject,
      }),
      invalidatesTags: ["Projects"],
    }),
    updateProject: builder.mutation<
      { message: string; project: Project },
      UpdateProjectRequest
    >({
      query: ({ id, data }) => ({
        url: `projects/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Projects"],
    }),
    getProjectClients: builder.query<
      { message: string; userDetails: { _id: string; name: string }[] },
      void
    >({
      queryFn: async (_arg, _api, _extraOptions, baseQuery) => {
        const result = await baseQuery({
          url: "http://localhost:3001/api/clients",
        });

        if (result.error) {
          return { error: result.error };
        }

        return {
          data: result.data as {
            message: string;
            userDetails: { _id: string; name: string }[];
          },
        };
      },
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useGetProjectClientsQuery,
} = projectApi;
