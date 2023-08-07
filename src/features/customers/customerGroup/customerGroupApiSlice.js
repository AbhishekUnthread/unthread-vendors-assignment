import apiSlice from "../../../app/api/apiSlice";

export const customerGroupApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    createCustomerGroup: builder.mutation({
      query: (customerGroupDetails) => ({
        url: "/customerGroup",
        method: "POST",
        body: customerGroupDetails,
      }),
      invalidatesTags: ["CustomerGroup"],
    }),

    getAllCustomerGroup: builder.query({
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
          url: `/customerGroup${queryString}`,
        };
      },
      providesTags: ["CustomerGroup"],
    }),

    getCustomerGroupCount: builder.query({
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
          url: `/customerGroup/count${queryString}`,
        };
      },
      providesTags: ["CustomerGroup"],
    }),

    editCustomerGroup: builder.mutation({
      query: ({ id, details }) => ({
        url: `/customerGroup/${id}`,
        method: "PUT",
        body: details,
      }),
      invalidatesTags: ["CustomerGroup"],
    }),

    deleteCustomerGroup: builder.mutation({
      query: (customerGroupId) => ({
        url: `/customerGroup/${customerGroupId}`,
        method: "DELETE",
        body: customerGroupId,
      }),
      invalidatesTags: ["CustomerGroup"],
    }),

    bulkEditCustomerGroup: builder.mutation({
      query: (updates) => ({
        url: `/customerGroup/bulkUpdate`,
        method: "PUT",
        body: updates ,
      }),
      invalidatesTags: ["CustomerGroup"],
    }),

    bulkDeleteCustomerGroup: builder.mutation({
      query: (groupDelete) => ({
        url: `/customerGroup/bulkDelete`,
        method: "DELETE",
        body: groupDelete,
      }),
      invalidatesTags: ["CustomerGroup"],
    }),

  }),
});

export const {
  useCreateCustomerGroupMutation,
  useGetAllCustomerGroupQuery,
  useGetCustomerGroupCountQuery,
  useEditCustomerGroupMutation,
  useDeleteCustomerGroupMutation,
  useBulkEditCustomerGroupMutation,
  useBulkDeleteCustomerGroupMutation
} = customerGroupApiSlice;
