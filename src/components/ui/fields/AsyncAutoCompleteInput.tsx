import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { itemsType } from "@/types/app.types";

interface AsyncAutoCompleteInputProps {
  id: string;
  width: number | string;
  label: string;
  items: itemsType[];
  searchHandler: (value: string) => void;
  itemHandler: (value: string | number) => void;
  loading?: boolean;
}

const AsyncAutoCompleteInput = ({
  id,
  width,
  label,
  items,
  searchHandler,
  itemHandler,
  loading,
}: AsyncAutoCompleteInputProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ width, borderRadius: 3 }}>
      <Autocomplete
        key={id}
        id={id}
        open={open}
        onInputChange={(_event, value, reason) => {
          if (reason === "input") searchHandler(value);
        }}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        onChange={(_event, value: itemsType | null) => {
          if (value) itemHandler(value.id);
        }}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionLabel={(option) => option.name}
        options={items}
        loading={loading}
        noOptionsText="No results"
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading && <CircularProgress color="inherit" size={20} />}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            {option.name + " " + option.id}
          </li>
        )}
      />
    </Box>
  );
};

export default AsyncAutoCompleteInput;
