import { createSlice } from "@reduxjs/toolkit";

const initialTagsState = {
  tagId : "",
};

const tagsSlice = createSlice({
  name: "tags",
  initialState: initialTagsState,
  reducers: {
    updateTagId :(state,action)=>
    {
      state.tagId = action.payload;
    },
  },
});

export default tagsSlice.reducer;
export const { updateTagId } = tagsSlice.actions;
