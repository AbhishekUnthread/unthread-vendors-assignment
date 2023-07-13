import apiSlice from "../../app/api/apiSlice";

export const seoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSeo: builder.query({
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
          url: `/seos${queryString}`,
        };
      },
      providesTags: ["Seos"],
    }),
    createSeo: builder.mutation({
      query: (SeosDeatails) => ({
        url: "/seos",
        method: "POST",
        body: SeosDeatails,
      }),
      invalidatesTags: ["Seos"],
    }),
    deleteSeo: builder.mutation({
      query: (SeosId) => ({
        url: `/seos/${SeosId}`,
        method: "DELETE",
        body: SeosId,
      }),
      invalidatesTags: ["Seos"],
    }),
    hardDeleteSeo: builder.mutation({
      query: (SeosId) => ({
        url: `/seos/hardDelete/${SeosId}`,
        method: "DELETE",
        body: SeosId,
      }),
      invalidatesTags: ["Seos"],
    }),
    editSeo: builder.mutation({
      query: ({ id, details }) => ({
        url: `/seos/${id}`,
        method: "PUT",
        body: details,
      }),
      invalidatesTags: ["Seos"],
    })
  }),
});

export const {
    useGetAllSeoQuery,
    useCreateSeoMutation,
    useDeleteSeoMutation,
    useEditSeoMutation,
} = seoApiSlice;
