import { createSlice } from "@reduxjs/toolkit";

const initialSnackbarState = {
  message: null,
  duration: 2000,
  type: "",
  open: false,
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: initialSnackbarState,
  reducers: {
    show(state, action) {
      const { message, duration, type } = action.payload;
      state.message = message;
      state.duration = duration || state.duration;
      state.type = type;
      state.open = true;
    },
    reset(state) {
      state.message = initialSnackbarState.message;
      state.duration = initialSnackbarState.duration;
      state.type = initialSnackbarState.type;
      state.open = initialSnackbarState.open;
    },
  },
});

export default snackbarSlice.reducer;
export const snackbarActions = snackbarSlice.actions;
