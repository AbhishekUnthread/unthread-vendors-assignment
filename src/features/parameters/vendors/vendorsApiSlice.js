import apiSlice from "../../../app/api/apiSlice";

export const vendorsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllVendors: builder.query({
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
          url: `/parameters/vendor${queryString}`,
        };
      },
      providesTags: ["Vendors"],
    }),
    createVendor: builder.mutation({
      query: (vendorDetails) => ({
        url: "/parameters/vendor",
        method: "POST",
        body: vendorDetails,
      }),
      invalidatesTags: ["Vendors"],
    }),
    bulkCreateVendor: builder.mutation({
      query: (vendorsDetail) => ({
        url: "/parameters/vendor/bulkCreate",
        method: "POST",
        body: vendorsDetail,
      }),
      invalidatesTags: ["Vendors"],
    }),
    deleteVendor: builder.mutation({
      query: (vendorId) => ({
        url: `/parameters/vendor/${vendorId}`,
        method: "DELETE",
        body: vendorId,
      }),
      invalidatesTags: ["Vendors"],
    }),
    editVendor: builder.mutation({
      query: ({ id, details }) => ({
        url: `/parameters/vendor/${id}`,
        method: "PUT",
        body: details,
      }),
      invalidatesTags: ["Vendors"],
    }),
    bulkEditVendor:builder.mutation({
      query: (updates) => ({
        url: `/parameters/vendor/bulkUpdate`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: ["Vendors"],
    }),
  }),
});

export const {
  useGetAllVendorsQuery,
  useCreateVendorMutation,
  useDeleteVendorMutation,
  useEditVendorMutation,
  useBulkCreateVendorMutation,
  useBulkEditVendorMutation,
} = vendorsApiSlice;
