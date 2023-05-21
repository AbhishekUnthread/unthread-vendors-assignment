import apiSlice from "../../../app/api/apiSlice";

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
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
          url: `/product-categories${queryString}`,
        };
      },
      providesTags: ["Categories"],
    }),
    getAllSubCategories: builder.query({
      query: () => ({
        url: "/product-sub-categories",
      }),
      providesTags: ["SubCategories"],
    }),
  }),
});

export const { useGetAllCategoriesQuery, useGetAllSubCategoriesQuery } =
  categoriesApiSlice;
