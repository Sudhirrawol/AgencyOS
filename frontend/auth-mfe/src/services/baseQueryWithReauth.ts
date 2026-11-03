import {
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

// BaseQueryFn → Type for our custom API function.
// FetchArgs → Type for API request details.
// FetchBaseQueryError → Type for API errors.

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api/auth",
  credentials: "include",
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const url = typeof args === "string" ? args : args.url;
    if (["/login", "/register", "/refresh", "/logout"].includes(url)) {
      return result;
    }

    const refreshResult = await baseQuery(
      {
        url: "/refresh",
        method: "POST",
      },
      api,
      extraOptions,
    );
    console.log("Access token expired or unauthorized");
    if (!refreshResult.error) {
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};
// args → Request details, like "/profile".
// api → RTK Query utilities such as dispatch and getState.
// extraOptions → Additional options configured for the base query.
