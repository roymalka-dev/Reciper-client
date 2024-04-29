import { PaletteOptions } from "@mui/material/styles";
import { tokens } from "./tokens";

export const lightPalette: PaletteOptions = {
  mode: "light",
  primary: {
    main: tokens.primary[500], // Vibrant purple
    light: tokens.primary[400], // Lighter purple
    dark: tokens.primary[600], // Deeper purple
  },
  secondary: {
    main: tokens.secondary[500], // Medium gray
    light: tokens.secondary[400], // Lighter gray
    dark: tokens.secondary[600], // Darker gray
  },
  grey: tokens.grey,
  background: {
    default: tokens.background.light, // Light grey background
    paper: tokens.background.main, // Main light background
  },
};

export const darkPalette: PaletteOptions = {
  mode: "dark",
  primary: {
    main: tokens.primary[300], // Deep purple
    light: tokens.primary[600], // Less intense deep purple
    dark: tokens.primary[800], // Even deeper purple
  },
  secondary: {
    main: tokens.secondary[700], // Dark gray
    light: tokens.secondary[600], // Less dark gray
    dark: tokens.secondary[800], // Near black
  },
  grey: tokens.grey,
  background: {
    default: tokens.background.darker, // Very dark grey
    paper: tokens.background.dark, // Dark grey
  },
};
