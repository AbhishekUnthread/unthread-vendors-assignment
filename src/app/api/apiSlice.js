import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logoutHandler } from "../../features/auth/authAction";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BASE_URL,
  // baseUrl: "",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    token && headers.set("authorization", `Bearer ${token}`);
    return headers;
  },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    api.dispatch(logoutHandler());
  }

  return result;
};

const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  tagTypes: [
    "Categories",
    "SubCategories",
    "Products",
    "Vendors",
    "Collections",
    "TagsManager",
    "ProductTabs",
    "Options",
    "Attributes",
    "SubOptions",
    "SubAttributes",
    "Customers",
    "CustomerGroup",
    "CustomersAddress",
    "Country",
    "State",
    "City",
    "Seos",
  ],
  endpoints: (builder) => ({}),
});

export default apiSlice;
