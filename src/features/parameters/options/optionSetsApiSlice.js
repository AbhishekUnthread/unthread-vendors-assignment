import apiSlice from "../../../app/api/apiSlice";

export const optionSetsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOptionSets: builder.query({
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
          url: `/parameters/optionSet/sets${queryString}`,
        };
      },
      transformResponse: (res) => res.data,
      providesTags: ["OptionSets"],
    }),
    createOptionSet: builder.mutation({
      query: (optionSetDetails) => ({
        url: "/parameters/optionSet/sets/single",
        method: "POST",
        body: optionSetDetails,
      }),
      transformResponse: (res) => res.data,
      invalidatesTags: ["OptionSets"],
    }),
    updateOptionSet: builder.mutation({
      query: ({ details, id }) => ({
        url: `/parameters/optionSet/sets/single/${id}`,
        method: "PUT",
        body: details,
      }),
      transformResponse: (res) => res.data,
      invalidatesTags: ["OptionSets"],
    }),
    deleteOptionSet: builder.mutation({
      query: (id) => ({
        url: `/parameters/optionSet/sets/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["OptionSets"],
    }),
  }),
});

export const {
  useGetAllOptionSetsQuery,
  useCreateOptionSetMutation,
  useUpdateOptionSetMutation,
  useDeleteOptionSetMutation,
} = optionSetsApiSlice;
