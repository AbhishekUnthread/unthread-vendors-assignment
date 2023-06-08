import apiSlice from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/user/login",
        method: "POST",
        body: credentials,
      }),
    }),
    signUp: builder.mutation({
      query: (userDetails) => ({
        url: "/user/register",
        method: "POST",
        body: userDetails,
      }),
    }),
    googleLogin: builder.query({
      query: () => ({
        url: "/connect/google",
      }),
    }),
  }),
});

export const { useLoginMutation, useSignUpMutation, useGoogleLoginQuery } =
  authApiSlice;
