import apiSlice from "../../../app/api/apiSlice";

export const optionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOptions: builder.query({
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
          url: `/parameters/optionSet/attribute${queryString}`,
        };
      },
      transformResponse: (res) => res.data,
      providesTags: ["Options"],
    }),
    createOption: builder.mutation({
      query: (optionDetails) => ({
        url: "/parameters/optionSet/attribute",
        method: "POST",
        body: optionDetails,
      }),
      transformResponse: (res) => res.data,
      invalidatesTags: ["Options"],
    }),
    updateOption: builder.mutation({
      query: ({ details, id }) => ({
        url: `/parameters/optionSet/attribute/${id}`,
        method: "PUT",
        body: details,
      }),
      transformResponse: (res) => res.data,
      invalidatesTags: ["Options"],
    }),
    deleteOption: builder.mutation({
      query: (id) => ({
        url: `/parameters/optionSet/attribute/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Options"],
    }),
    getAllAttributes: builder.query({
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
          url: `/parameters/optionSet/metaAttribute${queryString}`,
        };
      },
      transformResponse: (res) => res.data,
      providesTags: ["Attributes"],
    }),
    createAttribute: builder.mutation({
      query: (attributeDetails) => ({
        url: "/parameters/optionSet/metaAttribute",
        method: "POST",
        body: attributeDetails,
      }),
      transformResponse: (res) => res.data,
      invalidatesTags: ["Attributes"],
    }),
    updateAttribute: builder.mutation({
      query: ({ details, id }) => ({
        url: `/parameters/optionSet/metaAttribute/${id}`,
        method: "PUT",
        body: details,
      }),
      transformResponse: (res) => res.data,
      invalidatesTags: ["Attributes"],
    }),
    deleteAttribute: builder.mutation({
      query: (id) => ({
        url: `/parameters/optionSet/metaAttribute/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Attributes"],
    }),
    getAllSubOptions: builder.query({
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
          url: `/parameters/optionSet/metaSubAttribute${queryString}`,
        };
      },
      transformResponse: (res) => res.data,
      providesTags: ["SubOptions"],
    }),
    createSubOption: builder.mutation({
      query: (subOptionDetails) => ({
        url: "/parameters/optionSet/metaSubAttribute",
        method: "POST",
        body: subOptionDetails,
      }),
      transformResponse: (res) => res.data,
      invalidatesTags: ["SubOptions"],
    }),
    updateSubOption: builder.mutation({
      query: ({ details, id }) => ({
        url: `/parameters/optionSet/metaSubAttribute/${id}`,
        method: "PUT",
        body: details,
      }),
      transformResponse: (res) => res.data,
      invalidatesTags: ["SubOptions"],
    }),
    deleteSubOption: builder.mutation({
      query: (id) => ({
        url: `/parameters/optionSet/metaSubAttribute/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SubOptions"],
    }),
    getAllSubAttributes: builder.query({
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
          url: `/parameters/optionSet/metaSubAttributeValue${queryString}`,
        };
      },
      transformResponse: (res) => res.data,
      providesTags: ["SubAttributes"],
    }),
    createSubAttribute: builder.mutation({
      query: (subAttributeDetails) => ({
        url: "/parameters/optionSet/metaSubAttributeValue",
        method: "POST",
        body: subAttributeDetails,
      }),
      transformResponse: (res) => res.data,
      invalidatesTags: ["SubAttributes"],
    }),
    updateSubAttribute: builder.mutation({
      query: ({ details, id }) => ({
        url: `/parameters/optionSet/metaSubAttributeValue/${id}`,
        method: "PUT",
        body: details,
      }),
      transformResponse: (res) => res.data,
      invalidatesTags: ["SubAttributes"],
    }),
    deleteSubAttribute: builder.mutation({
      query: (id) => ({
        url: `/parameters/optionSet/metaSubAttributeValue/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SubAttributes"],
    }),
  }),
});

export const {
  useGetAllOptionsQuery,
  useCreateOptionMutation,
  useUpdateOptionMutation,
  useDeleteOptionMutation,
  useGetAllAttributesQuery,
  useCreateAttributeMutation,
  useUpdateAttributeMutation,
  useDeleteAttributeMutation,
  useGetAllSubOptionsQuery,
  useCreateSubOptionMutation,
  useUpdateSubOptionMutation,
  useDeleteSubOptionMutation,
  useGetAllSubAttributesQuery,
  useCreateSubAttributeMutation,
  useUpdateSubAttributeMutation,
  useDeleteSubAttributeMutation,
} = optionsApiSlice;
