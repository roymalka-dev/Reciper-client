/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import ImageGallery from "@/components/ui/images/ImageGallery";
import { Box, CircularProgress } from "@mui/material";
import ControlBar from "./ControlBar";
import PaginationBar from "./PaginationBar";
import { recipeType } from "@/types/data.types";
import useFetch from "@/hooks/useFetch";
import { useNavigate, useSearchParams } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const DATA_PER_PAGE = 9;
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const [recipes, setRecipes] = useState<recipeType[]>([]);
  const [displayedRecipes, setDisplayedRecipes] = useState<recipeType[]>([]);
  const query = searchParams.get("q") || "random";
  const { data, status, error, refetch } = useFetch<recipeType[]>(
    `recipe/query-recipe?q=${query}`,
    "GET",
    {},
    [],
    true
  );

  useEffect(() => {
    if (query.length > 3) {
      refetch();
    }
  }, [query]);

  useEffect(() => {
    if (status === "success" && data && !error) {
      setRecipes(data);
      const startIndex = (page - 1) * DATA_PER_PAGE;
      const endIndex = page * DATA_PER_PAGE;
      setDisplayedRecipes(data.slice(startIndex, endIndex));
    }
  }, [status, data]);

  useEffect(() => {
    const startIndex = (page - 1) * DATA_PER_PAGE;
    const endIndex = page * DATA_PER_PAGE;
    setDisplayedRecipes(recipes.slice(startIndex, endIndex));
  }, [page, recipes]);

  const itemHandler = (item: recipeType) => {
    navigate(`/recipe/${item._id}`);
  };

  const handleSort = (sortedRecipes: recipeType[]) => {
    setRecipes(sortedRecipes);
  };

  return status === "loading" ? (
    <CircularProgress />
  ) : (
    <Box>
      <ControlBar
        recipes={displayedRecipes}
        onSort={(sortedRecipes: any) => handleSort(sortedRecipes)}
      />
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <ImageGallery data={displayedRecipes} handler={itemHandler} />
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <PaginationBar
          pageCount={Math.ceil((recipes.length ?? 0) / DATA_PER_PAGE)}
          currentPage={page}
          setCurrentPage={setPage}
        />
      </Box>
    </Box>
  );
};

export default HomePage;
