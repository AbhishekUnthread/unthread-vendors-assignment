import { createSlice } from "@reduxjs/toolkit";

const initialCollectionState = {
  collectionId : "",
};

const collectionSlice = createSlice({
  name: "collection",
  initialState: initialCollectionState,
  reducers: {
    updateCollectionId :(state,action)=>
    {
      state.collectionId = action.payload;
    },
  },
});

export default collectionSlice.reducer;
export const { updateCollectionId } = collectionSlice.actions;
