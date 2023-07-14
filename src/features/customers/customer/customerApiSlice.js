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
    }),

    getAllCustomers: builder.query({
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
          url: `/customer${queryString}`,
        };
      },
      providesTags: ["Customers"],
    }),

    getCustomer: builder.query({
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
          url: `/customer${queryString}`,
        };
      },
      providesTags: ["Customers"],
    }),
    
  }),
});

export const {
  useCreateCustomerMutation,
  useGetAllCustomersQuery,
  useGetCustomerQuery
} = customerApiSlice;
