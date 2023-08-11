import apiSlice from "../../../app/api/apiSlice";

export const discountsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllDiscounts: builder.query({
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
          url: `/discount/product${queryString}`,
        };
      },
      providesTags: ["Discounts"],
    }),
    createDiscount: builder.mutation({
      query: (discountDetails) => ({
        url: "/discount/product",
        method: "POST",
        body: discountDetails,
      }),
      invalidatesTags: ["Discounts"],
    }),

    deleteDiscount: builder.mutation({
      query: (discountId) => ({
        url: `/discount/product/${discountId}`,
        method: "DELETE",
        body: discountId,
      }),
      invalidatesTags: ["Discounts"],
    }),
    bulkDeleteDiscount:builder.mutation({
      query: (deletes) => ({
        url: `/discount/product`,
        method: "DELETE",
        body: deletes,
      }),
      invalidatesTags: ["Discounts"],
    }),
  }),
});

export const {
useGetAllDiscountsQuery,
useCreateDiscountMutation,
useDeleteDiscountMutation,
useBulkDeleteDiscountMutation,
} = discountsApiSlice;
