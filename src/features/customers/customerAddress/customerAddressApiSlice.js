import apiSlice from "../../../app/api/apiSlice";

export const customerAddressApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCustomerAddress: builder.mutation({
      query: (customerAddressDetails) => ({
        url: "/customerAddress",
        method: "POST",
        body: customerAddressDetails,
      }),
      invalidatesTags: ["CustomersAddress"],
    }),

    editCustomerAddress: builder.mutation({
      query: ({ id, details }) => ({
        url: `/customerAddress/${id}`,
        method: "PUT",
        body: details,
      }),
      invalidatesTags: ["CustomersAddress"],
    }),
  }),
});

export const {
    useCreateCustomerAddressMutation,
    useEditCustomerAddressMutation
} = customerAddressApiSlice;
