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
          url: `/parameters/category${queryString}`,
        };
      },
      providesTags: ["Categories"],
    }),
    getAllSubCategories: builder.query({
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
          url: `/parameters/subCategory${queryString}`,
        };
      },
      providesTags: ["SubCategories"],
    }),
    createCategory: builder.mutation({
      query: (categoryDetails) => ({
        url: "/parameters/category",
        method: "POST",
        body: categoryDetails,
      }),
      invalidatesTags: ["Categories"],
    }),
    createSubCategory: builder.mutation({
      query: (subCategoryDetails) => ({
        url: "/parameters/subCategory",
        method: "POST",
        body: subCategoryDetails,
      }),
      invalidatesTags: ["SubCategories"],
    }),
    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `/parameters/category/${categoryId}`,
        method: "DELETE",
        body: categoryId,
      }),
      invalidatesTags: ["Categories"],
    }),
    deleteSubCategory: builder.mutation({
      query: (subCategoryId) => ({
        url: `/parameters/subCategory/${subCategoryId}`,
        method: "DELETE",
        body: subCategoryId,
      }),
      invalidatesTags: ["SubCategories"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetAllSubCategoriesQuery,
  useCreateCategoryMutation,
  useCreateSubCategoryMutation,
  useDeleteCategoryMutation,
  useDeleteSubCategoryMutation,
} = categoriesApiSlice;
