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
      invalidatesTags: ["SubAttributes"],
    }),
  }),
});

export const {
  useGetAllOptionsQuery,
  useCreateOptionMutation,
  useGetAllAttributesQuery,
  useCreateAttributeMutation,
  useGetAllSubOptionsQuery,
  useCreateSubOptionMutation,
  useGetAllSubAttributesQuery,
  useCreateSubAttributeMutation,
} = optionsApiSlice;
