import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authslice";
import jobSlice from "./jobslice";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import companyslice from "./companyslice";
import applicationSlice from "./applicationslice";

const persistConfig = {
  key: "root",
  version: 1,
  storage: storage.default,
};

const rootReducer = combineReducers({
  auth: authReducer,
  jobs: jobSlice,
  company: companyslice,
  application : applicationSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
