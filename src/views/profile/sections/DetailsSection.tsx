/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Avatar,
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { UserData } from "@/types/data.types";
import CreateIcon from "@mui/icons-material/Create";
import useFetch from "@/hooks/useFetch";
import useModal from "@/hooks/useModal";
import { CustomModal } from "@/components/common/modal/CustomModal";
import * as yup from "yup";
import { TabConfig, formType } from "@/types/form.types";
import ApiService from "@/services/ApiService";
import { FormStepper } from "@/components/common/form/FormStepper";
import { appConfig } from "@/configs/app.config";
import { toast } from "react-toastify";
import { toastConfig } from "@/configs/toast.config";
const DetailsSection: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);

  const modal = useModal();
  const { data, status, error, refetch } = useFetch<UserData>(
    "user/get-user-details",
    "GET",
    undefined,
    [],
    false
  );

  useEffect(() => {
    if (status === "success" && data && !error) {
      setUser(data);
    }
  }, [data, setUser, status]);

  const editDetailsFormTabs: TabConfig<formType>[] = useMemo(() => {
    return [
      {
        tabName: "details",
        fields: [
          {
            name: "firstName",
            label: "First Name",
            type: "text",
            initialValue: user?.firstName || "",
            validation: yup.string().optional().min(3).max(25),
          },
          {
            name: "lastName",
            label: "Last Name",
            type: "text",
            initialValue: user?.lastName || "",
            validation: yup.string().optional().min(3).max(25),
          },
        ],
      },
      {
        tabName: "image",
        fields: [
          {
            name: "image",
            label: "Image",
            type: "file",
            initialValue: user?.image || "",
            validation: yup.mixed(),
          },
        ],
      },
    ];
  }, [user?.image]);

  const generateEditDetailsForm = useCallback(() => {
    const submitDetails = async (details: formType) => {
      const response = await ApiService.put(`user/edit-details`, details);
      if (!response.error) {
        toast.success("Details edited successfully", toastConfig);
        refetch();
        return;
      }

      modal.closeModal();
    };

    return (
      <Box>
        <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>
          Edit Details
        </Typography>
        <FormStepper tabs={editDetailsFormTabs} submit={submitDetails} />
      </Box>
    );
  }, [modal, editDetailsFormTabs, user]);

  const handleDetailsEdit = () => {
    modal.setContent(() => generateEditDetailsForm());
    modal.openModal();
  };

  return (
    <Box>
      <Card sx={{ maxWidth: "100%", boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box display={"flex"}>
              <Avatar
                alt={`${user?.firstName} ${user?.lastName}`}
                src={
                  user?.image &&
                  `${
                    appConfig.apiBaseUrl + appConfig.apiPrefix
                  }/storage/get-image/${user?.image}`
                }
                sx={{ width: 100, height: 100 }}
              />
              <IconButton
                color="primary"
                aria-label="edit"
                size={"small"}
                onClick={handleDetailsEdit}
              >
                <CreateIcon />
              </IconButton>
            </Box>
            <Box display={"flex"}>
              <Typography variant="h5" component="div">
                {user?.firstName} {user?.lastName}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {user?.email}
            </Typography>
          </Box>
        </CardContent>
      </Card>
      <CustomModal
        open={modal.isOpen}
        title={""}
        handleClose={modal.closeModal}
        children={modal.content}
      />
    </Box>
  );
};

export default DetailsSection;
