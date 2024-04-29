import { Modal, Box, Typography } from "@mui/material";

type CustomModalProps = {
  open: boolean;
  title: string;
  handleClose: () => void;
  children?: React.ReactNode;
};

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxWidth: "80%",
  maxHeight: "80%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};

const contentStyle = {
  overflowY: "auto",
  mt: 2,
  maxHeight: "calc(100% - 48px)",
};

export const CustomModal: React.FC<CustomModalProps> = ({
  open,
  title,
  handleClose,
  children,
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          {title}
        </Typography>
        <Box sx={contentStyle}>{children}</Box>
      </Box>
    </Modal>
  );
};
