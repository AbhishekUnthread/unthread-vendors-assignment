import apiSlice from "../../../app/api/apiSlice";

export const tagsManagerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTags: builder.query({
      query: (queries) => {
        let queryString = "";
        for (const key in queries) {
          if (queries[key]) {
            queryString = `${queryString}${queryString ? "&" : "?"}${key}=${
              queries[key]
            }`;
          }
        }
        return {
          url: `/parameters/tagManager${queryString}`,
        };
      },
      providesTags: ["TagsManager"],
    }),
    createTag: builder.mutation({
      query: (tagsDetails) => ({
        url: "/parameters/tagManager",
        method: "POST",
        body: tagsDetails,
      }),
      invalidatesTags: ["TagsManager"],
    }),
    bulkCreateTag: builder.mutation({
      query: (tagsDetails) => ({
        url: "/parameters/tagManager/bulkCreate",
        method: "POST",
        body: tagsDetails,
      }),
      invalidatesTags: ["TagsManager"],
    }),

    deleteTag: builder.mutation({
      query: (tagId) => ({
        url: `/parameters/tagManager/hardDelete/${tagId}`,
        method: "DELETE",
        body: tagId,
      }),
      invalidatesTags: ["TagsManager"],
    }),
    bulkDeleteTag:builder.mutation({
      query: (deletes) => ({
        url: `parameters/tagManager/bulkDelete`,
        method: "DELETE",
        body: deletes,
      }),
      invalidatesTags: ["TagsManager"],
    }),
    editTag: builder.mutation({
      query: ({ id, details }) => ({
        url: `/parameters/tagManager/${id}`,
        method: "PUT",
        body: details,
      }),
      invalidatesTags: ["TagsManager"],
    }),
    bulkEditTag:builder.mutation({
      query: (updates) => ({
        url: `/parameters/tagManager/bulkUpdate`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: ["TagsManager"],
    })




  }),
});

export const {
  useGetAllTagsQuery,
  useCreateTagMutation,
  useDeleteTagMutation,
  useEditTagMutation,
  useBulkCreateTagMutation,
  useBulkEditTagMutation,
  useBulkDeleteTagMutation,
} = tagsManagerApiSlice;
