import apiSlice from "../../../app/api/apiSlice";

export const productTabsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProductTabs: builder.query({
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
          url: `/parameters/productTab${queryString}`,
        };
      },
      transformResponse: (res) => res.data,
      providesTags: ["ProductTabs"],
    }),
    createProductTab: builder.mutation({
      query: (productTabDetails) => ({
        url: "/parameters/productTab",
        method: "POST",
        body: productTabDetails,
      }),
      invalidatesTags: ["ProductTabs"],
    }),
    deleteProductTab: builder.mutation({
      query: (productTabId) => ({
        url: `/parameters/productTab/${productTabId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ProductTabs"],
    }),
    editProductTab: builder.mutation({
      query: ({ id, details }) => ({
        url: `/parameters/productTab/${id}`,
        method: "PUT",
        body: details,
      }),
      invalidatesTags: ["ProductTabs"],
    }),
  }),
});

export const {
  useGetAllProductTabsQuery,
  useCreateProductTabMutation,
  useDeleteProductTabMutation,
  useEditProductTabMutation,
} = productTabsApiSlice;
