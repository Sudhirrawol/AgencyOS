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
  }),
});

export const { useGetProjectsQuery, useCreateProjectMutation } = projectApi;
