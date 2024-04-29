import { Outlet, useNavigate } from "react-router-dom";
import { Box, Paper } from "@mui/material";
import { store } from "@/store/store";
import { useEffect } from "react";

const AuthLayout = () => {
  const navigate = useNavigate();
  const token =
    store.getState().auth.googleToken || store.getState().auth.token;

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "background.default",
        padding: 3,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: "400px",
          padding: 3,
          borderRadius: "8px",
          boxSizing: "border-box",
        }}
      >
        <Outlet />
      </Paper>
    </Box>
  );
};

export default AuthLayout;
