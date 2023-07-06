import apiSlice from "../../../app/api/apiSlice";

export const customerGroupApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
    })
  }),
});

export const {
    useGetAllCustomerGroupQuery
} = customerGroupApiSlice;
