import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    product: {},
};

const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    updateproduct :(state,action)=>
    {
      state.product = action.payload;
    },
  },
});

export default productSlice.reducer;
export const { updateproduct } = productSlice.actions;
