import { TabConfig, formType } from "@/types/form.types";
import * as yup from "yup";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

declare module "yup" {
  interface MixedSchema {
    fileSize(maxSize: number, message: string): MixedSchema;
    fileType(allowedTypes: string[], message: string): MixedSchema;
  }
}

yup.addMethod(
  yup.mixed,
  "fileSize",
  function (this: yup.MixedSchema, maxSize: number, message: string) {
    return this.test("fileSize", message, function (value) {
      if (!value || !("size" in value)) {
        return true;
      }
      return (value as { size: number })?.size <= maxSize;
    });
  }
);

yup.addMethod(
  yup.mixed,
  "fileType",
  function (this: yup.MixedSchema, allowedTypes: string[], message: string) {
    return this.test("fileType", message, function (value) {
      if (!value || !("type" in value)) {
        return true;
      }
      return allowedTypes.includes(value.type as string);
    });
  }
);

export const generateValidationSchemas = <T extends formType>(
  tabs: TabConfig<T>[]
): yup.AnySchema[] => {
  return tabs.map((tab) => {
    const shape: Record<keyof T, yup.AnySchema> = {} as Record<
      keyof T,
      yup.AnySchema
    >;
    tab.fields.forEach((field) => {
      shape[field.name as keyof T] = field.validation;
    });
    return yup.object().shape(shape);
  });
};

export const generateInitialValues = <T extends formType>(
  tabs: TabConfig<T>[],
  currentValues: Partial<T> = {}
): T => {
  const initialValues = tabs.reduce((acc: Partial<T>, tab) => {
    tab.fields.forEach((field) => {
      acc[field.name as keyof T] =
        currentValues[field.name] ?? (field.initialValue as T[keyof T]);
    });
    return acc;
  }, {} as Partial<T>);

  return { ...initialValues, ...currentValues } as T;
};
