/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Formik, Form, useFormikContext } from "formik";
import { Stepper, Step, StepLabel, Button, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { TabConfig, formType } from "@/types/form.types";
import {
  generateValidationSchemas,
  generateInitialValues,
} from "@/utils/form.utils";
import { RootState } from "@/store/store";
import { resetForm, updateForm } from "@/store/slices/formSlice";
import DynamicFormField from "./DynamicFormField";

const AutoSave = () => {
  const dispatch = useDispatch();
  const formikContext = useFormikContext();

  useEffect(() => {
    const handleSave = () => {
      if (formikContext.dirty) {
        dispatch(
          updateForm(formikContext.values as Partial<Record<string, any>>)
        );
        formikContext.setSubmitting(false);
      }
    };

    const interval = setInterval(handleSave, 5000); // Save every 5 seconds

    return () => clearInterval(interval);
  }, [formikContext, dispatch]);

  return null;
};

/**
 * FormStepper component renders a form with a stepper to navigate through different steps.
 * @param {object} props - Component props.
 * @param {TabConfig<T>[]} props.tabs - Configuration of form tabs.
 * @param {string} props.bucketName - Name of the bucket.
 * @param {(request: T) => void} props.submit - Function to handle form submission.
 * @returns {JSX.Element} FormStepper component.
 */
export const FormStepper = <T extends formType>({
  tabs,
  submit,
}: {
  tabs: TabConfig<T>[];
  submit: (request: T) => void;
}) => {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState<number>(0);
  const isLastStep = activeStep === tabs.length - 1;
  const savedFormData = useSelector((state: RootState) => state.form.formData);
  const validationSchemas = generateValidationSchemas<T>(tabs);
  const initialValues = generateInitialValues<T>(tabs, savedFormData);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchemas[activeStep]}
      onSubmit={(values, actions) => {
        if (!isLastStep) {
          setActiveStep((prev) => prev + 1);
          dispatch(updateForm(values));
        } else {
          dispatch(resetForm());
          try {
            submit(values);
          } catch (error) {
            console.error("Error submitting form:", error);
          }
        }
        actions.setTouched({});
        actions.setSubmitting(false);
      }}
    >
      {() => (
        <Form>
          <AutoSave />
          <Stepper activeStep={activeStep} alternativeLabel>
            {tabs.length > 1 &&
              tabs.map((tab, index) => (
                <Step key={index}>
                  <StepLabel>{tab.tabName}</StepLabel>
                </Step>
              ))}
          </Stepper>

          <Box sx={{ mt: 2 }}>
            {tabs[activeStep].fields.map((field, index) => (
              <Box key={`${field.name}-${index}`} sx={{ mt: 2 }}>
                <DynamicFormField {...field} />
              </Box>
            ))}
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            {tabs.length > 1 && (
              <Button
                disabled={activeStep === 0}
                onClick={() => setActiveStep((prev) => prev - 1)}
              >
                Back
              </Button>
            )}

            <Button
              type="submit"
              sx={{
                mt: 2,
                mx: "auto",
                display: tabs.length < 2 ? "block" : "inline-block",
              }}
            >
              {isLastStep ? "Submit" : "Next"}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};
