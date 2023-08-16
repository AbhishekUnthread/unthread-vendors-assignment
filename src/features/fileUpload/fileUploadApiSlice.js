import apiSlice from "../../app/api/apiSlice";

export const fileUploadApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getS3UploadUrl: builder.query({
      query: ({ fileName, fileSize, fileType, module }) => ({
        url: `/uploads?filename=${fileName}&filesize=${fileSize}&filetype=${fileType}&module=${module}`,
      }),
      invalidatesTags: ["FileManager"],
    }),
  }),
});

export const { useGetS3UploadUrlQuery } = fileUploadApiSlice;
