import { createSlice } from "@reduxjs/toolkit";

const initialVendorState = {
  vendorId : "",
};

const vendorSlice = createSlice({
  name: "vendor",
  initialState: initialVendorState,
  reducers: {
    updateVendorId :(state,action)=>
    {
      state.vendorId = action.payload;
    },
  },
});

export default vendorSlice.reducer;
export const { updateVendorId } = vendorSlice.actions;
