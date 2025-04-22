import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: null,
  name: "",
  email: "",
  role: "",
  profileImg: "",
  userAgent: "",
  signupMethod: "",
  createdAt: null,
  updatedAt: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      return { ...state, ...action.payload };
    },
    logoutSuccess: () => initialState,
    deleteUser: () => initialState,
    updateUser(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { loginSuccess, logoutSuccess, deleteUser, updateUser } =
  userSlice.actions;
export default userSlice.reducer;
