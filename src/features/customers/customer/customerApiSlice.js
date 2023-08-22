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

    editCustomer: builder.mutation({
      query: ({ id, details }) => ({
        url: `/customer/${id}`,
        method: "PUT",
        body: details,
      }),
      invalidatesTags: ["Customers"],
    }),

    bulkEditCustomer: builder.mutation({
      query: (updates) => ({
        url: `/customer/bulkUpdate`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: ["Customers"],
    }),

    deleteCustomer: builder.mutation({
      query: (customerId) => ({
        url: `/customer/${customerId}`,
        method: "DELETE",
        body: customerId,
      }),
      invalidatesTags: ["Customers"],
    }),

    bulkDeleteCustomer: builder.mutation({
      query: (deleteCusotomer) => ({
        url: `/customer/bulkDelete`,
        method: "DELETE",
        body: deleteCusotomer,
      }),
      invalidatesTags: ["Customers"],
    }),
  }),
});

export const {
  useCreateCustomerMutation,
  useGetAllCustomersQuery,
  useGetSingleCustomerQuery,
  useGetCustomersCountQuery,
  useEditCustomerMutation,
  useBulkEditCustomerMutation,
  useDeleteCustomerMutation,
  useBulkDeleteCustomerMutation,
} = customerApiSlice;
