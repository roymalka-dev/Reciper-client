import Navbar from "@/components/shared/navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Box, useTheme } from "@mui/material";
import { useScrollToTop } from "@/hooks/useScrollToTop";

const MainLayout = () => {
  const theme = useTheme();
  useScrollToTop();
  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          bgcolor: theme.palette.background.paper,
          boxShadow: 1,
          borderRadius: 3,
          p: 1,
          mt: { xs: 10, sm: 10, md: 10, lg: 10 },
          zIndex: 0,
          minWidth: { xs: "auto", sm: 300 },
          minHeight: 800,
          width: { xs: "100%", md: "90%", lg: "90%" },
          mx: "auto",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
