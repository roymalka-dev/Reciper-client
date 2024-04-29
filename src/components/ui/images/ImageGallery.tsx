import { appConfig } from "@/configs/app.config";
import { recipeType } from "@/types/data.types";
import { useMediaQuery, useTheme } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

interface ImageGalleryProps {
  data: recipeType[];
  handler?: (item: recipeType) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ data, handler }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const fallbackImageUrl = "https://via.placeholder.com/150";

  return (
    <ImageList
      sx={{ width: "100%", height: "auto" }}
      cols={isSmallScreen ? 1 : 3}
    >
      {data.map((item, index) => {
        const image =
          item.performingUser !== "Online" && item.image
            ? `${
                appConfig.apiBaseUrl + appConfig.apiPrefix
              }/storage/get-image/${item.image}`
            : item.image;

        return (
          <ImageListItem
            sx={{ minWidth: 250, cursor: "pointer" }}
            key={item.name + index}
            rows={1}
            onClick={() => handler && handler(item)}
          >
            <img
              src={image || fallbackImageUrl}
              alt={item.name}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.name}
              subtitle={<span>by: @{item?.performingUser.split("@")[0]}</span>}
              position="below"
            />
          </ImageListItem>
        );
      })}
    </ImageList>
  );
};

export default ImageGallery;
