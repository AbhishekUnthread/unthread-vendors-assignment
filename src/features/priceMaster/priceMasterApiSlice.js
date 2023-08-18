import apiSlice from "../../app/api/apiSlice";

export const priceMasterApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllMasters: builder.query({
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
          url: `/parameters/priceMaster/master${queryString}`,
        };
      },
      transformResponse: (res) => res.data,
      providesTags: ["PriceMaster"],
    }),
    createMaster: builder.mutation({
      query: (masterDetails) => ({
        url: "/parameters/priceMaster/master",
        method: "POST",
        body: masterDetails,
      }),
      transformResponse: (res) => res.data,
      invalidatesTags: ["PriceMaster"],
    }),
    updateMaster: builder.mutation({
      query: ({ details, id }) => ({
        url: `/parameters/priceMaster/master/${id}`,
        method: "PUT",
        body: details,
      }),
      transformResponse: (res) => res.data,
      invalidatesTags: ["PriceMaster"],
    }),
    deleteMaster: builder.mutation({
      query: (id) => ({
        url: `/parameters/priceMaster/master/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PriceMaster"],
    }),
  }),
});

export const {
  useGetAllMastersQuery,
  useCreateMasterMutation,
  useUpdateMasterMutation,
  useDeleteMasterMutation,
} = priceMasterApiSlice;
