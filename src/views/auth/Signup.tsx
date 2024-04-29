import { FormStepper } from "@/components/common/form/FormStepper";
import ApiService from "@/services/ApiService";
import { TabConfig, formType } from "@/types/form.types";
import { Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
const signUpTabs: TabConfig<formType>[] = [
  {
    tabName: "",
    fields: [
      {
        name: "firstName",
        label: "First Name",
        type: "text",
        initialValue: "",
        validation: yup.string().required("First Name is required").min(2),
      },
      {
        name: "lastName",
        label: "Last Name",
        type: "text",
        initialValue: "",
        validation: yup.string().required("Last Name is required").min(2),
      },
      {
        name: "email",
        label: "Email",
        type: "text",
        initialValue: "",
        validation: yup.string().required("App Name is required").email(),
      },
      {
        name: "password",
        label: "Password",
        type: "password",
        initialValue: "",
        validation: yup.string().required("Password is required").min(8),
      },
    ],
  },
];

const Signup = () => {
  const navigate = useNavigate();
  const submitRequest = async (request: formType) => {
    console.log(request);
    const response = await ApiService.post("auth/sign-up", request);
    if (response) {
      navigate(`/auth/sign-in`);
    } else {
      console.log("Sign up failed");
    }
  };

  return (
    <Box>
      <Typography sx={{ textAlign: "center", mb: 2 }} variant="h4" gutterBottom>
        Sign Up
      </Typography>
      <FormStepper
        tabs={signUpTabs}
        submit={(values) => submitRequest(values)}
      />
      <Typography
        sx={{ textAlign: "center", mt: 5 }}
        variant="body2"
        gutterBottom
      >
        Already registered? <Link to="/auth/sign-in">Sign In</Link>
      </Typography>
    </Box>
  );
};

export default Signup;
