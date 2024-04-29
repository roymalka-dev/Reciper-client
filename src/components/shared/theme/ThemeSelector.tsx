import { useDispatch, useSelector } from "react-redux";
import { FormControlLabel, useTheme } from "@mui/material";
import { toggleThemeMode } from "@/store/slices/themeSlice";
import { RootState } from "@/store/store";
import { ThemeSwitch } from "@/components/ui/switch/ThemeSwitch";

/**
 * ThemeSelector is a component that allows users to toggle between light and dark modes of the application.
 * It utilizes a custom switch component (`ThemeSwitch`) to render the toggle,
 * and interacts with the Redux store to manage the theme state.
 */
const ThemeSelector = () => {
  const dispatch = useDispatch();
  // Use MUI's useTheme hook to access the current theme properties if needed.
  const theme = useTheme();

  // Retrieve the current theme mode from the Redux store.
  const currentTheme = useSelector((state: RootState) => state.theme.mode);

  /**
   * Handles the change event of the theme switch.
   * It dispatches an action to toggle the theme mode in the Redux store and
   * saves the current theme mode to localStorage for persistence across sessions.
   */
  const handleChange = () => {
    dispatch(toggleThemeMode());
    // Persist the current theme mode to localStorage.
    localStorage.setItem("theme", currentTheme === "dark" ? "light" : "dark");
  };

  return (
    <FormControlLabel
      id="theme-selector"
      control={
        <ThemeSwitch
          sx={{ m: 1 }}
          checked={currentTheme === "dark"}
          onChange={handleChange}
          theme={theme}
        />
      }
      label="" // The label is empty as the switch is self-explanatory in the context of its usage, but could be customized if needed.
    />
  );
};

export default ThemeSelector;
