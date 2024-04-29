import React, { useState, useEffect, ChangeEvent } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton"; // Import ListItemButton
import ListItemText from "@mui/material/ListItemText";
import { itemsType } from "@/types/app.types";

interface AsyncTextFieldWithDropdownProps {
  id: string;
  width: number | string;
  label: string;
  items: itemsType[];
  searchHandler: (value: string) => void;
  itemHandler: (value: string | number) => void;
  loading?: boolean;
}

const AsyncTextFieldWithDropdown: React.FC<AsyncTextFieldWithDropdownProps> = ({
  id,
  width,
  label,
  items,
  searchHandler,
  itemHandler,
  loading,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setOpen(items.length > 0);
  }, [items, loading]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    searchHandler(event.target.value);
  };

  return (
    <Box sx={{ width, position: "relative" }}>
      <TextField
        id={id}
        label={label}
        variant="outlined"
        fullWidth
        onChange={handleChange}
        InputProps={{
          endAdornment: loading ? (
            <CircularProgress color="inherit" size={20} />
          ) : null,
        }}
      />
      {open && (
        <List
          sx={{
            position: "absolute",
            width: "100%",
            zIndex: 2,
            bgcolor: "background.paper",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(0, 0, 0, 0.12)",
            maxHeight: 300,
            overflow: "auto",
            borderRadius: 2,
          }}
        >
          {items.map((option) => (
            <ListItem
              disablePadding
              key={option.id.toString()}
              onClick={() => {
                itemHandler(option.id);
                setOpen(false); // Close the dropdown when an item is clicked
              }}
            >
              <ListItemButton
                sx={{
                  width: "100%",
                  "&:hover": {
                    backgroundColor: "primary.main", // Change the background color on hover
                    ".MuiListItemText-primary": {
                      color: "secondary.contrastText", // Change the text color on hover (optional)
                    },
                  },
                }}
              >
                <ListItemText primary={`${option.name} ${option.id}`} />
              </ListItemButton>
            </ListItem>
          ))}
          {items.length === 0 && !loading && (
            <ListItem>
              <ListItemText primary="No results" />
            </ListItem>
          )}
        </List>
      )}
    </Box>
  );
};

export default AsyncTextFieldWithDropdown;
