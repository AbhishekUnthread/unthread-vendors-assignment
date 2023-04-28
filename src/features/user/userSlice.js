import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  email: null,
  id: null,
  provider: null,
  username: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    set(state, action) {
      const { email, id, provider, username } = action.payload;
      state.email = email;
      state.id = id;
      state.provider = provider;
      state.username = username;
    },
    reset(state) {
      state.email = initialUserState.email;
      state.id = initialUserState.id;
      state.provider = initialUserState.provider;
      state.username = initialUserState.username;
    },
  },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
