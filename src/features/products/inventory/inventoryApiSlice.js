import apiSlice from "../../../app/api/apiSlice";

export const inventoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllStores: builder.query({
      query: (queries = {}) => {
        const queryString = new URLSearchParams(queries).toString();

        return {
          url: `/store?${queryString}`,
        };
      },
      providesTags: ["Inventory"],
    }),

    getStoreCount: builder.query({
      query: (queries = {}) => {
        const queryString = new URLSearchParams(queries).toString();

        return {
          url: `/store/count?${queryString}`,
        };
      },
      providesTags: ["Inventory"],
    }),

    createStore: builder.mutation({
      query: (storeData) => ({
        url: "/store",
        method: "POST",
        body: storeData,
      }),
      invalidatesTags: ["Inventory"],
    }),

    editStore: builder.mutation({
      query: ({ id, details }) => ({
        url: `/store/${id}`,
        method: "PUT",
        body: details,
      }),
      invalidatesTags: ["Inventory"],
    }),

    bulkEditStore: builder.mutation({
      query: (updates) => ({
        url: "/store/bulkUpdate",
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: ["Inventory"],
    }),

    deleteStore: builder.mutation({
      query: (storeId) => ({
        url: `/store/${storeId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Inventory"],
    }),

    bulkDeleteStore: builder.mutation({
      query: (deletes) => ({
        url: "/store/bulkDelete",
        method: "DELETE",
        body: deletes,
      }),
      invalidatesTags: ["Inventory"],
    }),
  }),
});

export const {
  useGetAllStoresQuery,
  useGetStoreCountQuery,
  useCreateStoreMutation,
  useEditStoreMutation,
  useBulkEditStoreMutation,
  useDeleteStoreMutation,
  useBulkDeleteStoreMutation,
} = inventoryApiSlice;
