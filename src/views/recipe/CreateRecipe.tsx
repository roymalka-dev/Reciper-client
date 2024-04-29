import { FormStepper } from "@/components/common/form/FormStepper";
import { toastConfig } from "@/configs/toast.config";
import ApiService from "@/services/ApiService";
import { TabConfig, formType } from "@/types/form.types";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

const createRecipeTabs: TabConfig<formType>[] = [
  {
    tabName: "General Information",
    fields: [
      {
        name: "name",
        label: "Name",
        type: "text",
        initialValue: "",
        validation: yup.string().required("Name is required").min(3).max(25),
      },
      {
        name: "description",
        label: "Description",
        type: "text",
        initialValue: "",
        validation: yup
          .string()
          .required("Description is required")
          .min(3)
          .max(50),
      },
    ],
  },
  {
    tabName: "Instructions",
    fields: [
      {
        name: "instructions",
        label: "",
        type: "multi-input",
        initialValue: [""],
        validation: yup.array().of(yup.string().min(3).max(50)),
        information:
          "Add the instructions for the recipe. You can add as many as you want.",
      },
    ],
  },
  {
    tabName: "Image",
    fields: [
      {
        name: "image",
        label: "Image",
        type: "file",
        initialValue: "",
        validation: yup.mixed(),
      },
    ],
  },
  {
    tabName: "review",
    fields: [
      {
        name: "name",
        label: "Name",
        type: "text",
        disabled: true,
        initialValue: "",
        validation: yup.string().required("Name is required").min(3).max(25),
      },
      {
        name: "description",
        label: "Description",
        type: "text",
        initialValue: "",
        validation: yup
          .string()
          .required("Description is required")
          .min(3)
          .max(50),
        disabled: true,
      },
      {
        name: "instructions",
        label: "Instructions",
        type: "multi-input",
        initialValue: [""],
        validation: yup.array().of(yup.string().min(3).max(50)),
        disabled: true,
      },
      {
        name: "image",
        label: "Image",
        type: "file",
        initialValue: "",
        validation: yup.mixed(),
        disabled: true,
      },
    ],
  },
];

const CreateRecipe = () => {
  const navigate = useNavigate();

  const submitRequest = async (request: formType) => {
    const response = await ApiService.post("recipe/create-recipe", request);
    if (response) {
      toast.success("Created successfully", toastConfig);
      navigate(`/recipe/${response.data._id}`);
    }
  };
  return (
    <Box>
      <Typography sx={{ textAlign: "center", mb: 2 }} variant="h4" gutterBottom>
        Create recipe
      </Typography>
      <FormStepper
        tabs={createRecipeTabs}
        submit={(values) => submitRequest(values)}
      />
    </Box>
  );
};

export default CreateRecipe;
