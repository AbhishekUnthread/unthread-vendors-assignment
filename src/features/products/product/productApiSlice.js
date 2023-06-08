import apiSlice from "../../../app/api/apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
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
          url: `/product-inventories${queryString}`,
        };
      },
      providesTags: ["Products"],
    }),
  }),
});

export const { useGetAllProductsQuery } = productApiSlice;
