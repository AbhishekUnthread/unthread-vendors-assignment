import apiSlice from "../../../app/api/apiSlice";

export const bundleDiscountsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBundleDiscounts: builder.query({
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
          url: `/discount/bundle${queryString}`,
        };
      },
      providesTags: ["BundleDiscounts"],
    }),
    createBundleDiscount: builder.mutation({
      query: (discountDetails) => ({
        url: "/discount/bundle",
        method: "POST",
        body: discountDetails,
      }),
      invalidatesTags: ["BundleDiscounts"],
    }),

    deleteBundleDiscount: builder.mutation({
      query: (bundleDiscountId) => ({
        url: `/discount/bundle/${bundleDiscountId}`,
        method: "DELETE",
        body: bundleDiscountId,
      }),
      invalidatesTags: ["BundleDiscounts"],
    }),
    bulkDeleteBundleDiscount:builder.mutation({
      query: (deletes) => ({
        url: `/discount/bundle/bulkDelete`,
        method: "DELETE",
        body: deletes,
      }),
      invalidatesTags: ["BundleDiscounts"],
    }),
  }),
});

export const {
    useGetAllBundleDiscountsQuery,
    useCreateBundleDiscountMutation,
    useDeleteBundleDiscountMutation,
    useBulkDeleteBundleDiscountMutation,
} = bundleDiscountsApiSlice;
