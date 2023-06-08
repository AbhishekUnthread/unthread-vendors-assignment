import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  email: null,
  userId: null,
  userName: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    set(state, action) {
      const { email, userId, userName } = action.payload;
      state.email = email;
      state.userId = userId;
      state.userName = userName;
    },
    reset(state) {
      state.email = initialUserState.email;
      state.userId = initialUserState.userId;
      state.userName = initialUserState.userName;
    },
  },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
