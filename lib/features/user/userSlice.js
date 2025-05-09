import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    loginFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    logoutSuccess: () => initialState,
    deleteUser: () => initialState,
    updateStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateUser(state, action) {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  deleteUser,
  updateStart,
  updateUser,
  updateFailure,
} = userSlice.actions;
export default userSlice.reducer;
