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
          url: `/products${queryString}`,
        };
      },
      providesTags: ["Products"],
    }),
    createProduct: builder.mutation({
      query: (ProductsDetails) => ({
        url: "/products",
        method: "POST",
        body: ProductsDetails,
      }),
      invalidatesTags: ["Products"],
    }),
    editProduct: builder.mutation({
      query: ({ id, details }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: details,
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const { useGetAllProductsQuery, useCreateProductMutation ,useEditProductMutation} =
  productApiSlice;
