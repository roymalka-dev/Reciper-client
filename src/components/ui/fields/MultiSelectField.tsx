import React from "react";
import { useField, useFormikContext } from "formik";
import {
  Box,
  Select,
  MenuItem,
  OutlinedInput,
  Chip,
  Typography,
  InputLabel,
  FormControl,
} from "@mui/material";
import InformationTooltip from "../tools/InformationTooltip";
import ImageExampleTooltip from "../tools/ImageExampleToolTip";

interface MultiSelectFieldProps {
  name: string;
  disabled?: boolean;
  label: string;
  options: string[];
  information?: string;
  imageExample?: string;
}

const MultiSelectField: React.FC<MultiSelectFieldProps> = ({
  name,
  label,
  options,
  information,
  imageExample,
  disabled,
}) => {
  const { setFieldValue } = useFormikContext<string[]>();
  const [field, meta] = useField(name);
  const isError = Boolean(meta.touched && meta.error);

  const handleDelete = (valueToRemove: string) => {
    const newValue = (field.value as string[]).filter(
      (value) => value !== valueToRemove
    );
    setFieldValue(name, newValue);
  };

  return (
    <FormControl fullWidth error={isError} variant="outlined" sx={{ mb: 2 }}>
      <InputLabel>{label}</InputLabel>
      <Select
        {...field}
        disabled={disabled}
        multiple
        value={field.value || []}
        onChange={(event) => setFieldValue(name, event.target.value)}
        input={<OutlinedInput id={`${name}-select`} label={label} />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value: string) => (
              <Chip
                key={value}
                label={value}
                onDelete={(event) => {
                  event.stopPropagation(); // Prevent the select dropdown from opening
                  handleDelete(value);
                }}
                onMouseDown={(event) => {
                  // Prevent the select dropdown from opening
                  event.stopPropagation();
                }}
              />
            ))}
          </Box>
        )}
        MenuProps={{
          MenuListProps: { disableListWrap: true },
        }}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      {information && <InformationTooltip information={information} />}
      {imageExample && <ImageExampleTooltip imageUrl={imageExample} />}
      {isError && (
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {meta.error}
        </Typography>
      )}
    </FormControl>
  );
};

export default MultiSelectField;
