import apiSlice from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/local",
        method: "POST",
        body: credentials,
      }),
    }),
    signUp: builder.mutation({
      query: (userDetails) => ({
        url: "/auth/local/register",
        method: "POST",
        body: userDetails,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignUpMutation } = authApiSlice;
