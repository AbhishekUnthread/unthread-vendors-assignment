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
  }),
});

export const {
useGetAllDiscountsQuery,
useCreateDiscountMutation,
} = discountsApiSlice;
