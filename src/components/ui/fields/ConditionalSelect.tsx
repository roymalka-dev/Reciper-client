/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useField, useFormikContext } from "formik";
import {
  Box,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import InformationTooltip from "../tools/InformationTooltip";
import ImageExampleTooltip from "../tools/ImageExampleToolTip";

interface ConditionalSelectProps {
  name: string;
  selectLabel: string;
  textFieldLabel?: string;
  options: string[];
  information?: string;
  imageExample?: string;
  disabled?: boolean;
}

const ConditionalSelect: React.FC<ConditionalSelectProps> = ({
  name,
  selectLabel,
  textFieldLabel,
  options,
  information,
  imageExample,
  disabled,
}) => {
  const { setFieldValue, values } = useFormikContext<any>();
  const [field, meta, helpers] = useField(name);
  const [showTextField, setShowTextField] = useState(
    values[`${name}Other`] ? true : false
  );
  const isError = Boolean(meta.touched && meta.error);

  const handleSelectChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    setShowTextField(value === "Other");
    helpers.setValue(value);
    if (value !== "Other") {
      setFieldValue(`${name}Other`, "");
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Box sx={{ flex: 1 }}>
        <FormControl fullWidth error={isError} variant="outlined">
          <InputLabel>{selectLabel}</InputLabel>
          <Select
            {...field}
            label={selectLabel}
            onChange={handleSelectChange}
            value={field.value || ""}
            disabled={disabled}
          >
            {options.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
            <MenuItem key="other" value="Other">
              Other
            </MenuItem>
          </Select>
        </FormControl>
        {isError && <Box sx={{ color: "error.main" }}>{meta.error}</Box>}
      </Box>
      {information && <InformationTooltip information={information} />}
      {imageExample && <ImageExampleTooltip imageUrl={imageExample} />}

      {showTextField && (
        <TextField
          label={textFieldLabel || "Please specify"}
          fullWidth
          variant="outlined"
          margin="normal"
          value={values[`${name}Other`]}
          onChange={(e) => setFieldValue(`${name}Other`, e.target.value)}
        />
      )}
    </Box>
  );
};

export default ConditionalSelect;
