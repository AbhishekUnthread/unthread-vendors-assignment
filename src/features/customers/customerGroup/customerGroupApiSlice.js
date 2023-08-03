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

  }),
});

export const {
  useCreateCustomerGroupMutation,
  useGetAllCustomerGroupQuery,
  useGetCustomerGroupCountQuery,
  useEditCustomerGroupMutation
} = customerGroupApiSlice;
