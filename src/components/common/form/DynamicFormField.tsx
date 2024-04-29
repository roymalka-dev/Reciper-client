/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Field } from "formik";
import { Checkbox, FormControlLabel } from "@mui/material";
import { FieldConfig, formType } from "@/types/form.types";
import ConditionalSelect from "@/components/ui/fields/ConditionalSelect";
import DragDropFileInput from "@/components/ui/fields/DragDropFileInput";
import MultiInputField from "@/components/ui/fields/MultiInputField";
import MultiSelectField from "@/components/ui/fields/MultiSelectField";
import SelectField from "@/components/ui/fields/SelectField";
import TextFieldWithInfo from "@/components/ui/fields/TextFieldAndInfo";
import PasswordField from "@/components/ui/fields/PasswordField";

/**
 * DynamicField component renders different form input fields based on the type provided in FieldConfig.
 * @param {FieldConfig<RequestType>} props - Component props containing field configuration.
 * @returns {JSX.Element} DynamicField component
 */
const DynamicField: React.FC<FieldConfig<formType>> = ({
  name,
  disabled,
  label,
  type,
  options,
  information,
  imageExample,
}) => {
  return (
    <Field name={name}>
      {({ field }: any) => {
        if (type === "checkbox") {
          return (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label={label}
            />
          );
        }

        if (type === "select") {
          return (
            <SelectField
              name={String(name)}
              label={label}
              options={options || []}
              information={information}
              imageExample={imageExample}
              disabled={disabled || false}
            />
          );
        }

        // Handle multi-select
        if (type === "multi-select") {
          return (
            <MultiSelectField
              name={String(name)}
              label={label}
              options={options || []}
              information={information}
              imageExample={imageExample}
              disabled={disabled || false}
            />
          );
        }

        if (type === "multi-input") {
          return (
            <MultiInputField
              name={String(name)}
              label={label}
              information={information}
              imageExample={imageExample}
              disabled={disabled || false}
            />
          );
        }

        if (type === "file") {
          return (
            <DragDropFileInput
              name={String(name)}
              label={label}
              information={information}
              imageExample={imageExample}
              disabled={disabled || false}
            />
          );
        }

        if (type === "conditional-select") {
          return (
            <ConditionalSelect
              name={String(name)}
              selectLabel={label}
              textFieldLabel="Specify Other"
              options={options || []}
              information={information}
              imageExample={imageExample}
              disabled={disabled || false}
            />
          );
        }
        if (type === "password") {
          return (
            <PasswordField
              name={String(name)}
              label={label}
              type={type}
              information={information}
              imageExample={imageExample || ""}
              InputLabelProps={{}}
              disabled={disabled || false}
            />
          );
        }

        return (
          <TextFieldWithInfo
            name={String(name)}
            label={label}
            type={type}
            information={information}
            imageExample={imageExample || ""}
            InputLabelProps={type === "date" ? { shrink: true } : {}}
            disabled={disabled || false}
          />
        );
      }}
    </Field>
  );
};

export default DynamicField;
