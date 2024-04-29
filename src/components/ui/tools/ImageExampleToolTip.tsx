import React, { useState } from "react";
import { Tooltip, IconButton, Dialog } from "@mui/material";
import PhotoIcon from "@mui/icons-material/Photo";

interface ImageExampleTooltipProps {
  imageUrl: string;
}

const ImageExampleTooltip: React.FC<ImageExampleTooltipProps> = ({
  imageUrl,
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="View example" placement="top">
        <IconButton onClick={handleClickOpen}>
          <PhotoIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="image-example-dialog-title"
        maxWidth="lg"
      >
        <img
          src={imageUrl}
          alt="Example"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </Dialog>
    </>
  );
};

export default ImageExampleTooltip;
