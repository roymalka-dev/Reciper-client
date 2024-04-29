import { ThemeState } from "@/types/theme.types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ThemeState = {
  mode: "light",
  direction: "ltr",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleThemeMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    toggleThemeDirection: (state) => {
      state.direction = state.direction === "ltr" ? "rtl" : "ltr";
    },
  },
});

export const { toggleThemeMode, toggleThemeDirection } = themeSlice.actions;

export default themeSlice.reducer;
