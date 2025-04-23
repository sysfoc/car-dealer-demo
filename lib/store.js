import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import userBillingSlice from "./features/user/userBilling";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const rootReducer = combineReducers({
  user: userSlice,
  billing: userBillingSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user","billing"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
