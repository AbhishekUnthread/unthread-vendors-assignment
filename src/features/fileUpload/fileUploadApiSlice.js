import apiSlice from "../../app/api/apiSlice";

export const fileUploadApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getS3UploadUrl: builder.query({
      query: ({ fileName }) => ({
        url: `/uploads?filename=${fileName}`,
      }),
    }),
  }),
});

export const { useGetS3UploadUrlQuery } = fileUploadApiSlice;
