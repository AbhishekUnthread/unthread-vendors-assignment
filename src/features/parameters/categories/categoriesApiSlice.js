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
      invalidatesTags: ["SubCategories","Categories"],
    }),
    createSubCategory: builder.mutation({
      query: (subCategoryDetails) => ({
        url: "/parameters/subCategory",
        method: "POST",
        body: subCategoryDetails,
      }),
      invalidatesTags: ["SubCategories","Categories"],
    }),
    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `/parameters/category/hardDelete/${categoryId}`,
        method: "DELETE",
        body: categoryId,
      }),
      invalidatesTags: ["Categories"],
    }),
    bulkDeleteCategory: builder.mutation({
      query: ( details ) => ({
        url: `/parameters/category/bulkDelete`,
        method: "DELETE",
        body: details,
      }),
      invalidatesTags: ["Categories"],
    }),
    bulkDeleteSubCategory: builder.mutation({
      query: (details ) => ({
        url: `/parameters/subCategory/bulkDelete`,
        method: "DELETE",
        body: details,
      }),
      invalidatesTags: ["SubCategories"],
    }),
    deleteSubCategory: builder.mutation({
      query: (subCategoryId) => ({
        url: `/parameters/subCategory/hardDelete/${subCategoryId}`,
        method: "DELETE",
        body: subCategoryId,
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
    bulkEditTagCategory:builder.mutation({
      query: (updates) => ({
        url: `/parameters/category/bulkUpdate`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: ["Categories"],
    }),
    bulkEditTagSubCategory:builder.mutation({
      query: (updates) => ({
        url: `/parameters/subCategory/bulkUpdate`,
        method: "PUT",
        body: updates,
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
  useBulkEditTagCategoryMutation,
  useBulkEditTagSubCategoryMutation,
  useBulkDeleteCategoryMutation,
  useBulkDeleteSubCategoryMutation,
} = categoriesApiSlice;
