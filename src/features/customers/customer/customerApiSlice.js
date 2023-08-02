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

    getSingleCustomer: builder.query({
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
          url: `/customer/getSingle/${queryString}`,
        };
      },
      providesTags: ["Customers"],
    }),

    getCustomersCount: builder.query({
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
          url: `/customer/count${queryString}`,
        };
      },
      providesTags: ["Customers"],
    }),
    
  }),
});

export const {
  useCreateCustomerMutation,
  useGetAllCustomersQuery,
  useGetSingleCustomerQuery,
  useGetCustomersCountQuery
} = customerApiSlice;
