import { useCallback, useReducer, useEffect } from "react";

const initialState = {
  categoryName: "",
  categoryDescription: "",
  categoryStatus: "active",
  categoryNotes: "",
  startDate: "",
  endDate: "",
  categoryVisibility: false,
  categorySeo: {},
  categoryMediaUrl: "",
  checked: false,
};

const categoryEditReducer = (state, action) => {
  if (action.type === "ON_DATA_CHANGE") {
    return {
      ...state,
      ...action.data,
    };
  }

  return state;
};

export const UseEditCategory = () => {
  const [editCategoryState, dispatchEditCategory] = useReducer(
    categoryEditReducer,
    initialState
  );

  const onDataChange = useCallback((data) => {
    dispatchEditCategory({ type: "ON_DATA_CHANGE", data });
  }, []);

  // Usage:
  // Call onDataChange method with an object containing the updated state values to change the state dynamically.
  // For example:
  // const updatedData = {
  //   categoryName: "New Category Name",
  //   categoryDescription: "New Category Description",
  //   categoryStatus: "inactive",
  //   //...other properties
  // };
  // onDataChange(updatedData);

  return [editCategoryState, onDataChange];
};