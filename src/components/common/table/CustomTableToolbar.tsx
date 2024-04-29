import React, { ChangeEvent } from "react";
import { Toolbar, TextField, Box } from "@mui/material";

/**
 * Interface for the props of the CustomTableToolbar component.
 */
interface CustomTableToolbarProps {
  /**
   * Function to handle the change event of the search input field.
   * It receives the change event as a parameter, allowing the parent component to control the behavior upon search input changes.
   */
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;

  /**
   * An optional array of functions that return JSX elements, representing custom toolbar elements such as buttons or filters.
   * These elements are rendered alongside the search input field in the toolbar.
   */
  toolbar?: (() => JSX.Element)[];
}

/**
 * CustomTableToolbar component provides a search input and optional additional toolbar elements for the CustomTable component.
 * It is designed to be placed above the table, providing user interaction capabilities such as searching and actions via toolbar buttons.
 *
 * @param {CustomTableToolbarProps} props The properties for the CustomTableToolbar component.
 * @returns {JSX.Element} The rendered toolbar with a search field and optional additional elements.
 */
const CustomTableToolbar: React.FC<CustomTableToolbarProps> = ({
  onSearchChange,
  toolbar,
}) => {
  return (
    <Toolbar sx={{ position: "sticky", top: 0, zIndex: 1 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        sx={{ mt: 1 }}
      >
        <Box flexGrow={1} maxWidth="100%" display={"flex"}>
          <TextField
            fullWidth
            label={"Search"}
            id="fullWidth"
            onChange={onSearchChange}
            sx={{ maxWidth: { sm: 300, md: 500 } }}
          />
        </Box>

        <Box>
          <Box sx={{ mt: 1, display: "flex" }}>
            {toolbar?.map((button: () => JSX.Element) => {
              return (
                <Box sx={{ m: 1 }} key={button.toString()}>
                  {button()}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Toolbar>
  );
};

export default CustomTableToolbar;
