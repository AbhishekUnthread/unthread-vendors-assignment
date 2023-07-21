import apiSlice from "../../app/api/apiSlice";

export const fileUploadApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getS3UploadUrl: builder.query({
      query: ({ fileName }) => ({
        url: `/uploads?filename=${fileName}`,
      }),
    }),
    uploadUrl: builder.mutation({
      query: ({ fileName }) => ({
        url: `/uploads?filename=${fileName}`,
      }),
      transformResponse: (res) => res.data,
    }),
  }),
});

export const { useGetS3UploadUrlQuery, useUploadUrlMutation } =
  fileUploadApiSlice;
