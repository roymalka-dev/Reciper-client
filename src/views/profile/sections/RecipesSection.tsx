/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { tableRowsType } from "@/types/table.types";
import { Typography, Button, Box } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";
import { comperators } from "@/utils/comperators.utils";
import CustomTable from "@/components/common/table/CustomTable";
import AddIcon from "@mui/icons-material/Add";
import { tableDataGenerator } from "@/utils/table.utils";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useFetch from "@/hooks/useFetch";
import ApiService from "@/services/ApiService";
import useModal from "@/hooks/useModal";
import { CustomModal } from "@/components/common/modal/CustomModal";
import { TabConfig, formType } from "@/types/form.types";
import * as yup from "yup";
import { FormStepper } from "@/components/common/form/FormStepper";
import { toast } from "react-toastify";
import { toastConfig } from "@/configs/toast.config";
const RecpiesSection = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState<tableRowsType[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<tableRowsType | null>(
    null
  );

  const { data, status, error, refetch } = useFetch("user/get-user-recipes");
  const modal = useModal();
  useEffect(() => {
    if (data && status !== "loading" && !error) {
      setRows(data);
    } else if (error) {
      console.log(error);
    }
  }, [data, status, error]);

  const handleDeleteRecipe = async (id: string) => {
    const deleteRecipe = async () => {
      const response = await ApiService.delete(`user/delete-recipe/${id}`);
      if (!response.error) {
        toast.success(`Recipe ${id} deleted successfully`, toastConfig);
      }
      modal.closeModal();
      refetch();
    };

    try {
      modal.setContent(
        <Box>
          <Typography>Are you sure you want to delete this recipe?</Typography>

          <Button onClick={modal.closeModal}>No</Button>
          <Button onClick={deleteRecipe}>Yes</Button>
        </Box>
      );
      modal.openModal();

      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const editRecipeTabs: TabConfig<formType>[] = useMemo(() => {
    return [
      {
        tabName: "General Information",
        fields: [
          {
            name: "name",
            label: "Name",
            type: "text",
            initialValue: selectedRecipe?.name || "",
            validation: yup
              .string()
              .required("Name is required")
              .min(3)
              .max(25),
          },
          {
            name: "description",
            label: "Description",
            type: "text",
            initialValue: selectedRecipe?.description || "",
            validation: yup
              .string()
              .required("Description is required")
              .min(3)
              .max(50),
          },
        ],
      },
      {
        tabName: "Instructions",
        fields: [
          {
            name: "instructions",
            label: "",
            type: "multi-input",
            initialValue: selectedRecipe?.instructions || [""],
            validation: yup.array().of(yup.string().min(3).max(50)),
            information:
              "Add the instructions for the recipe. You can add as many as you want.",
          },
        ],
      },
      {
        tabName: "Image",
        fields: [
          {
            name: "image",
            label: "Image",
            type: "file",
            initialValue: selectedRecipe?.image || "",
            validation: yup.mixed(),
          },
        ],
      },
      {
        tabName: "review",
        fields: [
          {
            name: "name",
            label: "Name",
            type: "text",
            disabled: true,
            initialValue: selectedRecipe?.name || "",
            validation: yup
              .string()
              .required("Name is required")
              .min(3)
              .max(25),
          },
          {
            name: "description",
            label: "Description",
            type: "text",
            initialValue: selectedRecipe?.description || "",
            validation: yup
              .string()
              .required("Description is required")
              .min(3)
              .max(50),
            disabled: true,
          },
          {
            name: "instructions",
            label: "Instructions",
            type: "multi-input",
            initialValue: selectedRecipe?.instructions || [""],
            validation: yup.array().of(yup.string().min(3).max(50)),
            disabled: true,
          },
          {
            name: "image",
            label: "Image",
            type: "file",
            initialValue: selectedRecipe?.image || "",
            validation: yup.mixed(),
            disabled: true,
          },
        ],
      },
    ];
  }, [selectedRecipe]);

  const generateEditRecipeForm = useCallback(
    ({ id }: { id: string }) => {
      const submitConfiguration = async (details: formType) => {
        const RecipeToEdit = details;
        const response = await ApiService.put(
          `user/edit-recipe/${id}`,
          RecipeToEdit
        );
        if (!response.error) {
          toast.success("Recipe edited successfully", toastConfig);
          refetch();
          return;
        }

        modal.closeModal();
      };

      return (
        <Box>
          <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>
            Edit {selectedRecipe?.name}
          </Typography>
          <FormStepper tabs={editRecipeTabs} submit={submitConfiguration} />
        </Box>
      );
    },
    [modal, editRecipeTabs, selectedRecipe]
  );

  useEffect(() => {
    if (selectedRecipe) {
      modal.setContent(() =>
        generateEditRecipeForm({
          id: selectedRecipe._id,
        })
      );
      modal.openModal();
    }
  }, [selectedRecipe]);

  const editRecipeHandler = (row: tableRowsType) => {
    setSelectedRecipe(row);
  };

  const cols = [
    {
      name: "_id",
      render: (value: any) => <Typography>{value}</Typography>,
      comparator: comperators.string,
    },
    {
      name: "name",
      render: (value: any) => <Typography>{value}</Typography>,
      comparator: comperators.string,
    },
    {
      name: "description",
      render: (value: any) => <Typography>{value}</Typography>,
      comparator: comperators.string,
    },

    {
      name: "createdAt",
      render: (value: any) => (
        <Typography>
          {new Date(value).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Typography>
      ),
      comparator: comperators.date,
    },
    {
      name: "options-launch",
      render: (_value: string, row: tableRowsType) => (
        <Button onClick={() => navigate(`/recipe/${row._id}`)}>
          <LaunchRoundedIcon />
        </Button>
      ),
    },
    {
      name: "options-edit",
      render: (_value: string, row: tableRowsType) => (
        <Button onClick={() => editRecipeHandler(row)}>
          <EditIcon />
        </Button>
      ),
    },
    {
      name: "options-delete",
      render: (_value: string, row: tableRowsType) => (
        <Button onClick={() => handleDeleteRecipe(row._id)}>
          <DeleteIcon />
        </Button>
      ),
    },
  ];

  const addButton: () => JSX.Element = () => {
    return (
      <Button onClick={() => navigate("/create-recipe")} variant="outlined">
        <AddIcon />
      </Button>
    );
  };

  const toolbar = [addButton];

  const tableData = tableDataGenerator({ rows, cols });

  return (
    <Box>
      <CustomTable data={tableData} toolbar={toolbar} loading={false} />
      <CustomModal
        open={modal.isOpen}
        title={""}
        handleClose={modal.closeModal}
        children={modal.content}
      />
    </Box>
  );
};

export default RecpiesSection;
