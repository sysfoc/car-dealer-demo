const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  userBilling: null,
  loading: false,
  error: null,
};

const userBillingSlice = createSlice({
  name: "billing",
  initialState,
  reducers: {
    billingStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    billingSuccess: (state, action) => {
      state.userBilling = action.payload;
      state.loading = false;
      state.error = null;
    },
    billingFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { billingStart, billingSuccess, billingFailure } =
  userBillingSlice.actions;
export default userBillingSlice.reducer;
