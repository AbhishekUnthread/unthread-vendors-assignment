import apiSlice from "../../../app/api/apiSlice";

export const filemanagerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFiles: builder.query({
      query: (searchParams = {}) => {
        const queryString = new URLSearchParams(searchParams).toString();
        return { url: `/gallery/file?${queryString}` };
      },
      providesTags: ["FileManager"],
    }),

    editFile: builder.mutation({
      query: ({ id, fileData }) => ({
        url: `/gallery/file/${id}`,
        method: "PUT",
        body: fileData,
      }),
      invalidatesTags: ["FileManager"],
    }),

    bulkEditFile: builder.mutation({
      query: (updates) => ({
        url: "/gallery/file/bulkUpdate",
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: ["FileManager"],
    }),

    deleteFile: builder.mutation({
      query: (id) => ({
        url: `/gallery/file/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FileManager"],
    }),

    bulkDeleteFiles: builder.mutation({
      query: (deletes) => ({
        url: "/gallery/file/bulkDelete",
        method: "DELETE",
        body: deletes,
      }),
      invalidatesTags: ["FileManager"],
    }),

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

    bulkDeleteFolders: builder.mutation({
      query: (deletes) => ({
        url: "/store/bulkDelete",
        method: "DELETE",
        body: deletes,
      }),
      invalidatesTags: ["FileManager"],
    }),
  }),
});

export const {
  useGetFilesQuery,
  useEditFileMutation,
  useBulkEditFileMutation,
  useDeleteFileMutation,
  useBulkDeleteFilesMutation,
  useGetFoldersQuery,
  useCreateFolderMutation,
  useEditFolderMutation,
  useDeleteFolderMutation,
  useBulkDeleteFoldersMutation,
} = filemanagerApiSlice;
