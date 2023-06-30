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
    categoryBulkCreateTag: builder.mutation({
      query: (tagsDetails) => ({
        url: "/parameters/category/bulkCreate",
        method: "POST",
        body: tagsDetails,
      }),
      invalidatesTags: ["Categories"],
    }),
    subCategoryBulkCreateTag: builder.mutation({
      query: (tagsDetails) => ({
        url: "/parameters/subCategory/bulkCreate",
        method: "POST",
        body: tagsDetails,
      }),
      invalidatesTags: ["SubCategories"],
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
        method: "PUT",
        body: {status:"draft"},
      }),
      invalidatesTags: ["Categories"],
    }),
    deleteSubCategory: builder.mutation({
      query: (subCategoryId) => ({
        url: `/parameters/subCategory/${subCategoryId}`,
        method: "PUT",
        body: {status:"draft"},
      }),
      invalidatesTags: ["SubCategories"],
    }),
    editCategory: builder.mutation({
      query: ({ id, details }) => ({
        url: `/parameters/category/${id}`,
        method: "PUT",
        body: details,
      }),
      invalidatesTags: ["Categories"],
    }),
    editSubCategory: builder.mutation({
      query: ({ id, details }) => ({
        url: `/parameters/subCategory/${id}`,
        method: "PUT",
        body: details,
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
  useEditCategoryMutation,
  useEditSubCategoryMutation,
  useCategoryBulkCreateTagMutation,
  useSubCategoryBulkCreateTagMutation,
} = categoriesApiSlice;
