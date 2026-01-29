import { combineReducers, configureStore } from "@reduxjs/toolkit";
import clientReducer from "./slice/client/clientSlice";
import clientTokenReducer from "./slice/client/clientTokenSlice";
import freelancerReducer from "./slice/freelancer/FreelanceSlice";
import freelancerToken from "./slice/freelancer/FreelancerToken";
import adminReducer from "./slice/admin/AdminSlice";
import adminToken from "./slice/admin/AdminTokenSlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// 🔹 Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "clientAuth",
    "clientToken",
    "freelancerAuth",
    "freelancerToken",
    "admintAuth",
    "admimToken",
  ],
};

// 🔹 reducers (inline – RTK auto combines)
const rootReducer = combineReducers({
  clientAuth: clientReducer,
  clientToken: clientTokenReducer,
  freelancerAuth: freelancerReducer,
  freelancerToken: freelancerToken,
  admintAuth: adminReducer,
  admimToken: adminToken,
});
// 🔹 wrap reducers with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // REQUIRED
    }),
});

export const persistor = persistStore(store);
export default store;

// 🔹 types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
