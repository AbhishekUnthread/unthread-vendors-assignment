import { createSlice } from "@reduxjs/toolkit";

const initialVendorState = {
    categoryId : "",
};

const categroySlice = createSlice({
  name: "category",
  initialState: initialVendorState,
  reducers: {
    updateCategoryId :(state,action)=>
    {
      state.categoryId = action.payload;
    },
  },
});

export default categroySlice.reducer;
export const { updateCategoryId } = categroySlice.actions;
