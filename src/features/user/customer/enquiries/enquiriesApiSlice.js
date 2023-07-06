import apiSlice from "../../../../app/api/apiSlice";

export const enquiriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllEnquiries: builder.query({
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
          url: `/tickets/list${queryString}`,
        };
      },
      providesTags: ["Enquiries"],
    }),
  }),
});

export const {
  useGetAllEnquiriesQuery,
} = enquiriesApiSlice;
