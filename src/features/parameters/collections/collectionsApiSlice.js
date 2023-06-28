import apiSlice from "../../../app/api/apiSlice";

export const collectionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCollections: builder.query({
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
          url: `/parameters/collection${queryString}`,
        };
      },
      providesTags: ["Collections"],
    }),
    createCollection: builder.mutation({
      query: (collectionDetails) => ({
        url: "/parameters/collection",
        method: "POST",
        body: collectionDetails,
      }),
      invalidatesTags: ["Collections"],
    }),
    deleteCollection: builder.mutation({
      query: (collectionId) => ({
        url: `/parameters/collection/${collectionId}`,
        method: "DELETE",
        body: collectionId,
      }),
      invalidatesTags: ["Collections"],
    }),
    editCollection: builder.mutation({
      query: ({ id, details }) => ({
        url: `/parameters/collection/${id}`,
        method: "PUT",
        body: details,
      }),
      invalidatesTags: ["Collections"],
    }),
    bulkEditCollection: builder.mutation({
      query: ({ updates }) => ({
        url: `/parameters/collection/bulkUpdate`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: ["Collections"],
    })
  }),
});

export const {
  useGetAllCollectionsQuery,
  useCreateCollectionMutation,
  useDeleteCollectionMutation,
  useEditCollectionMutation,
  useBulkEditCollectionMutation,
} = collectionApiSlice;
