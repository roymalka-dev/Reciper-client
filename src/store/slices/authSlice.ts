import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface authState {
  email: string | null;
  isAuthenticated: boolean;
  token: string | null;
  googleToken: string | null;
  authorization: string;
}

const initialState: authState = {
  email: null,
  isAuthenticated: false,
  token: null,
  googleToken: null,
  authorization: "USER",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string }>) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
    },
    setGoogleCredentials: (state, action: PayloadAction<{ token: string }>) => {
      state.isAuthenticated = true;
      state.googleToken = action.payload.token;
    },
    setAuthorization: (
      state,
      action: PayloadAction<{ authorization: string }>
    ) => {
      state.authorization = action.payload.authorization;
    },
    setEmail: (state, action: PayloadAction<{ email: string }>) => {
      state.email = action.payload.email;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.googleToken = null;
    },
  },
});

export const {
  setCredentials,
  setEmail,
  setGoogleCredentials,
  setAuthorization,
  logout,
} = authSlice.actions;
export default authSlice.reducer;
