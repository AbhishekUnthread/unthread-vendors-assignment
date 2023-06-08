import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vendors:[]
};

const vendorSlice = createSlice({
  name: "vendors",
  initialState: initialState,
  reducers: {
   addVendors:((state,{payload})=>{
      state.vendors=payload
   })
  },
});

export const {addVendors} = vendorSlice.actions;
export const getVendors=(state)=>state.vendors.vendors
export default vendorSlice.reducer;
