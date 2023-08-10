import apiSlice from "../../../app/api/apiSlice";

export const filemanagerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFolders: builder.query({
      query: (searchParams = {}) => {
        const queryString = new URLSearchParams(searchParams).toString();
        return { url: `/gallery/folder?${queryString}` };
      },
      providesTags: ["FileManager"],
    }),

    createFolder: builder.mutation({
      query: (folderData) => ({
        url: "/gallery/folder",
        method: "POST",
        body: folderData,
      }),
      invalidatesTags: ["FileManager"],
    }),

    editFolder: builder.mutation({
      query: ({ id, folderData }) => ({
        url: `/gallery/folder/${id}`,
        method: "PUT",
        body: folderData,
      }),
      invalidatesTags: ["FileManager"],
    }),

    deleteFolder: builder.mutation({
      query: (id) => ({
        url: `/gallery/folder/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FileManager"],
    }),
  }),
});

export const { useGetFoldersQuery, useCreateFolderMutation, useEditFolderMutation, useDeleteFolderMutation } = filemanagerApiSlice;
// export const { useGetAllFoldersQuery, useCreateNewFolderMutation } = filemanagerApiSlice;
