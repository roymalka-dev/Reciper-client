import React, { useState } from "react";
import { Tooltip, IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

interface InformationTooltipProps {
  information: string | React.ReactNode;
}

const InformationTooltip: React.FC<InformationTooltipProps> = ({
  information,
}) => {
  const [open, setOpen] = useState(false);

  const handleTouchClick = () => {
    setOpen(!open);
  };

  if (React.isValidElement(information)) {
    return <>{information}</>;
  }

  return (
    <Tooltip
      title={information}
      placement="left"
      open={open}
      onClose={handleTouchClick}
      disableHoverListener
    >
      <IconButton onClick={handleTouchClick}>
        <InfoIcon />
      </IconButton>
    </Tooltip>
  );
};

export default InformationTooltip;
