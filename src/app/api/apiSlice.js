import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.REACT_APP_BASE_URL}/api`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    token && headers.set("authorization", `Bearer ${token}`);
    return headers;
  },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
  }

  return result;
};

const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  tagTypes: [],
  endpoints: (builder) => ({}),
});

export default apiSlice;
