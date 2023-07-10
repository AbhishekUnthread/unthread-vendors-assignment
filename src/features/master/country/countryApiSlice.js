import apiSlice from "../../../app/api/apiSlice";

export const countryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCountry: builder.query({
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
          url: `/master/country${queryString}`,
        };
      },
      providesTags: ["Country"],
    })
  }),
});

export const {
  useGetAllCountryQuery
} = countryApiSlice;
