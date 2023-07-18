import apiSlice from "../../../app/api/apiSlice";

export const cityApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCity: builder.query({
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
          url: `/master/city${queryString}`,
        };
      },
      providesTags: ["City"],
    })
  }),
});

export const {
    useGetAllCityQuery  
} = cityApiSlice;
