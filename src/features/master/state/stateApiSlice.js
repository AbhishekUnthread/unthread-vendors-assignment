import apiSlice from "../../../app/api/apiSlice";

export const stateApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllState: builder.query({
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
          url: `/master/state${queryString}`,
        };
      },
      providesTags: ["State"],
    })
  }),
});

export const {
    useGetAllStateQuery
} = stateApiSlice;
