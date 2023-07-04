import apiSlice from "../../../app/api/apiSlice";

export const customerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCustomer: builder.mutation({
      query: (customerDetails) => ({
        url: "/customer",
        method: "POST",
        body: customerDetails,
      }),
      invalidatesTags: ["Customers"],
    })
  }),
});

export const {
  useCreateCustomerMutation
} = customerApiSlice;
