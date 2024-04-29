import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import themeReducer from "./slices/themeSlice";
import authReducer from "./slices/authSlice";
import formReducer from "./slices/formSlice";
const rootReducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
  form: formReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["theme", "auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PURGE",
        ],
        ignoredPaths: ["form", "auth"],
      },
      immutableCheck: false,
      thunk: true,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
