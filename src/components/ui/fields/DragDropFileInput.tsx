/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useField, useFormikContext } from "formik";
import {
  Box,
  Typography,
  useTheme,
  Button,
  CircularProgress,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import InformationTooltip from "../tools/InformationTooltip";
import ImageExampleTooltip from "../tools/ImageExampleToolTip";
import ApiService from "@/services/ApiService";
import { appConfig } from "@/configs/app.config";
import Compressor from "compressorjs";

interface DragDropFileInputProps {
  name: string;
  label?: string;
  information?: string;
  imageExample?: string;
  disabled?: boolean;
}

const DragDropFileInput: React.FC<DragDropFileInputProps> = ({
  name,
  label,
  information,
  imageExample,
  disabled,
}) => {
  const theme = useTheme();
  const { setFieldValue, values } = useFormikContext();
  const [, meta] = useField(name);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const isError = Boolean(meta.touched && meta.error);

  const handleUploadToServer = async (file: File) => {
    setUploading(true);

    new Compressor(file, {
      quality: 0.6, // Quality of the image, default: 0.8
      maxWidth: 800, // Max width of the output image
      maxHeight: 600, // Max height of the output image
      convertSize: 500000, // Convert to JPEG if size exceeds 500KB
      success: async (compressedImage: Blob) => {
        const formData = new FormData();
        const filename = file.name.replace(/(\.[\w\d_-]+)$/i, " (image)$1");
        formData.append("image", compressedImage, filename);

        try {
          const response = await ApiService.post(
            "/storage/upload-image",
            formData
          );
          const newFileName = response.path.split("/").pop();
          setSelectedFileName(newFileName);
          setFieldValue(name, newFileName);
        } catch (error) {
          console.error("Error uploading image:", error);
          setSelectedFileName(null);
          setFieldValue(name, null);
        } finally {
          setUploading(false);
        }
      },
      error(error: any) {
        console.error(error);
        setUploading(false);
      },
    });
  };

  const handleRemoveFromServer = async () => {
    setUploading(true);
    try {
      await ApiService.delete(`storage/remove-image/${selectedFileName}`);
      setSelectedFileName("");
      setFieldValue(name, "");
      setUploading(false);
    } catch (error) {
      console.error("Error removing file:", error);
    }
  };

  const handleFileChange = async (file: File | null) => {
    if (file) {
      await handleUploadToServer(file);
    } else {
      setSelectedFileName(null); // Clear selected file name
      setFieldValue(name, null); // Reset Formik field value
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    handleFileChange(file);
  };

  const handleRemove = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    await handleRemoveFromServer();
    handleFileChange(null);
  };

  useEffect(() => {
    const fileUrl = (values as Record<string, string>)[name];
    if (fileUrl) {
      const fileName = fileUrl;
      setSelectedFileName(fileName || null);
    }
  }, [values, name]);

  return (
    <Box>
      {label && (
        <Box
          sx={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
        >
          <Typography variant="h6">{label}</Typography>
          {information && <InformationTooltip information={information} />}
          {imageExample && <ImageExampleTooltip imageUrl={imageExample} />}
        </Box>
      )}
      <Box
        sx={{
          border: `2px dashed ${theme.palette.primary.main}`,
          padding: "20px",
          textAlign: "center",
          cursor: "pointer",
          backgroundColor: isDragging
            ? theme.palette.secondary.light
            : isError
            ? theme.palette.error.light
            : theme.palette.action.hover,
          marginBottom: "5px",
          "&:hover": {
            backgroundColor: theme.palette.grey[200],
          },
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById(`fileInput-${name}`)?.click()}
      >
        {uploading ? (
          <CircularProgress />
        ) : disabled ? (
          <Typography sx={{ mt: 2 }}>
            {selectedFileName ? (
              <img
                height={300}
                width={"auto"}
                src={`${
                  appConfig.apiBaseUrl + appConfig.apiPrefix
                }/storage/get-image/${selectedFileName}`}
              ></img>
            ) : (
              "No image"
            )}
          </Typography>
        ) : selectedFileName ? (
          <>
            <Typography sx={{ mt: 2 }}>{selectedFileName}</Typography>
            <Button
              startIcon={<ClearIcon />}
              onClick={(e) => handleRemove(e)}
              sx={{ mt: 1 }}
            >
              Remove
            </Button>
          </>
        ) : (
          <Typography>
            Drag and drop a file here, or click to select a file
          </Typography>
        )}
        <input
          id={`fileInput-${name}`}
          name={name}
          type="file"
          onChange={(e) => handleChange(e)}
          style={{ display: "none" }}
          disabled={disabled}
        />
      </Box>

      {isError && (
        <Typography color="error" variant="body2">
          {meta.error}
        </Typography>
      )}
    </Box>
  );
};

export default DragDropFileInput;
