import apiSlice from "../../../app/api/apiSlice";

export const inventoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createStore: builder.mutation({
      query: (storeData) => ({
        url: "/store",
        method: "POST",
        body: storeData,
      }),
      invalidatesTags: ["Inventory"],
    }),
  }),
});

export const { useCreateStoreMutation } = inventoryApiSlice;
