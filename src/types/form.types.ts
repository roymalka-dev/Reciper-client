import * as yup from "yup";

export type formType = {
  status: "pending" | "inProgress" | "done";
  [key: string]: string | number | boolean | string[] | Date | undefined;
};

export type FieldConfig<T extends formType> = {
  name: Extract<keyof T, string>;
  label: string;
  initialValue: string | string[] | boolean | number | Date | undefined;
  type:
    | "text"
    | "password"
    | "email"
    | "date"
    | "checkbox"
    | "select"
    | "multi-select"
    | "textarea"
    | "file"
    | "radio"
    | "number"
    | "multi-input"
    | "conditional-select";
  validation: yup.AnySchema;
  options?: string[];
  information?: string;
  imageExample?: string;
  disabled?: boolean;
};

export type TabConfig<T extends formType> = {
  tabName: string;
  fields: FieldConfig<T>[];
  bucketName?: string;
  submit?: (values: T) => void;
};
