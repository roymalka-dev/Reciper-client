import { FormStepper } from "@/components/common/form/FormStepper";
import ApiService from "@/services/ApiService";
import {
  setCredentials,
  setEmail,
  setGoogleCredentials,
} from "@/store/slices/authSlice";
import { TabConfig, formType } from "@/types/form.types";
import { Box, Divider, Typography } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
const signInTabs: TabConfig<formType>[] = [
  {
    tabName: "",
    fields: [
      {
        name: "email",
        label: "Email",
        type: "text",
        initialValue: "test@gmail.com",
        validation: yup.string().required("App Name is required").email(),
      },
      {
        name: "password",
        label: "Password",
        type: "password",
        initialValue: "12345678",
        validation: yup.string().required("Password is required").min(8),
      },
    ],
  },
];

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const setUserGoogleAuthorization = async (credential: string) => {
    dispatch(
      setGoogleCredentials({
        token: credential,
      })
    );

    const userData = await ApiService.get("user/get-user-details");
    dispatch(setEmail({ email: userData.data.email }));
    navigate(`/`);
  };

  const submitRequest = async (request: formType) => {
    const response = await ApiService.post("auth/sign-in", request);
    if (response.token) {
      dispatch(
        setCredentials({
          token: response.token,
        })
      );
      dispatch(setEmail({ email: response.email }));
      navigate(`/`);
    } else {
      alert("Sign in failed");
    }
  };

  return (
    <Box>
      <Typography sx={{ textAlign: "center", mb: 2 }} variant="h4" gutterBottom>
        Welcome Back
      </Typography>
      <Box
        sx={{
          mb: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          margin: "20px 0",
        }}
      >
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            setUserGoogleAuthorization(
              credentialResponse.credential || "not-valid-token"
            );
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          margin: "20px 0",
        }}
      >
        <Divider sx={{ flexGrow: 1 }} />
        <Typography sx={{ mx: 2, color: "text.secondary" }}>OR</Typography>
        <Divider sx={{ flexGrow: 1 }} />
      </Box>

      <FormStepper
        tabs={signInTabs}
        submit={(values) => submitRequest(values)}
      />
      <Typography
        sx={{ textAlign: "center", mt: 5 }}
        variant="body2"
        gutterBottom
      >
        Not registered yet? <Link to="/auth/sign-up">Sign Up</Link>
      </Typography>
    </Box>
  );
};

export default Signin;
