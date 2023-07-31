import apiSlice from "../../../app/api/apiSlice";

export const inventoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    getAllStores: builder.query({
      query: (queries = {}) => {
        // let queryString = "";
        // for (const key in queries) {
        //   if (queries[key]) {
        //     queryString = `${queryString}${queryString ? "&" : "?"}${key}=${
        //       queries[key]
        //     }`;
        //   }
        // }

        const queryString = new URLSearchParams(queries).toString();

        return {
          url: `/store?${queryString}`,
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
  }),
});

export const {useGetAllStoresQuery, useCreateStoreMutation } = inventoryApiSlice;
