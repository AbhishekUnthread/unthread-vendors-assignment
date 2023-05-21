import apiSlice from "../../../app/api/apiSlice";

export const collectionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCollections: builder.query({
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
          url: `/product-collections${queryString}`,
        };
      },
      providesTags: ["Collection"],
    }),
  }),
});

export const { useGetAllCollectionsQuery } = collectionApiSlice;
