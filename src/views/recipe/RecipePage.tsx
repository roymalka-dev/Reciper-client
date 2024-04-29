import useFetch from "@/hooks/useFetch";
import { recipeType } from "@/types/data.types";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Divider,
  CircularProgress,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LiveChat from "./LiveChat";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import ChatIcon from "@mui/icons-material/Chat";
import { appConfig } from "@/configs/app.config";
const RecipePage = () => {
  const user = useSelector((state: RootState) => state.auth.email);
  const { id } = useParams();
  const [recipe, setRecipe] = useState<recipeType | null>(null);
  const [openChat, setOpenChat] = useState(false);
  const { data, status, error } = useFetch<recipeType>(
    `recipe/get-recipe/${id}`
  );

  useEffect(() => {
    if (error) {
      //toast.error(error?.message || t("site.messages.error.default"),toastConfig)
      console.error("Request error: ", error);
    }
  }, [error]);

  useEffect(() => {
    if (status === "success" && data) {
      setRecipe(data);
    }
  }, [data, setRecipe, status]);

  const image =
    recipe?.performingUser !== "Online" && recipe?.image
      ? `${appConfig.apiBaseUrl + appConfig.apiPrefix}/storage/get-image/${
          recipe?.image
        }`
      : recipe?.image;

  return status === "loading" ? (
    <CircularProgress />
  ) : (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Card raised sx={{ maxWidth: "100%", mx: "auto", mb: 4 }}>
        <CardMedia
          component="img"
          height="300"
          image={image}
          alt={recipe?.name}
        />
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {recipe?.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Recipe by @{recipe?.performingUser.split("@")[0]}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body1">{recipe?.description}</Typography>
          {recipe?.instructions.map((instruction, index) => (
            <Typography key={index} variant="body2" sx={{ mt: 2 }}>
              {index + 1}. {instruction}
            </Typography>
          ))}
        </CardContent>
      </Card>

      <Box
        sx={{
          maxWidth: "100%",
          mx: "auto",
          height: "auto",
          border: "1px solid #ccc",
          borderRadius: 2,
          p: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            startIcon={<ChatIcon />}
            onClick={() => setOpenChat(!openChat)}
            sx={{
              textTransform: "none",
              boxShadow: "none",
              "&:hover": {
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              },
            }}
          >
            {openChat ? "Close Chat" : "Open Chat"}
          </Button>
        </Box>

        {openChat && <LiveChat chatId={id || ""} performingUser={user || ""} />}
      </Box>
    </Box>
  );
};

export default RecipePage;
