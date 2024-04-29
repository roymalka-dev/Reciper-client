// TextFieldWithInfo.tsx
import React from "react";
import { useField } from "formik";
import { Box, TextField, TextFieldProps } from "@mui/material";
import InformationTooltip from "../tools/InformationTooltip";
import ImageExampleTooltip from "../tools/ImageExampleToolTip";

type PasswordFieldProps = TextFieldProps & {
  name: string;
  label: string;
  information?: string;
  imageExample: string;
  disabled?: boolean;
};

const PasswordField: React.FC<PasswordFieldProps> = ({
  name,
  label,
  information,
  imageExample,
  disabled,
  ...textFieldProps
}) => {
  const [field, meta] = useField(name);
  const isError = Boolean(meta.touched && meta.error);

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <TextField
        {...field}
        {...textFieldProps}
        error={isError}
        helperText={isError ? meta.error : ""}
        label={label}
        type="password"
        fullWidth
        variant="outlined"
        disabled={disabled}
      />
      {information && <InformationTooltip information={information} />}
      {imageExample && <ImageExampleTooltip imageUrl={imageExample} />}
    </Box>
  );
};

export default PasswordField;
