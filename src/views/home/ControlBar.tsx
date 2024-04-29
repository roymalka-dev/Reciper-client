import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import SortIcon from "@mui/icons-material/Sort";
import BackupIcon from "@mui/icons-material/Backup";
import { useNavigate } from "react-router-dom";

interface recipeType {
  _id: string;
  name: string;
  performingUser: string;
}

interface recipeSorterType {
  name: string;
  comparator: (a: recipeType, b: recipeType) => number;
}

const recipeSorters: recipeSorterType[] = [
  {
    name: "none",
    comparator: () => 0,
  },
  {
    name: "name ↑",
    comparator: (a, b) => a.name.localeCompare(b.name),
  },
  {
    name: "name ↓",
    comparator: (a, b) => b.name.localeCompare(a.name),
  },
  {
    name: "user ↑",
    comparator: (a, b) => a.performingUser.localeCompare(b.performingUser),
  },
  {
    name: "user ↓",
    comparator: (a, b) => b.performingUser.localeCompare(a.performingUser),
  },
];

interface ControlBarProps {
  recipes: recipeType[];
  onSort: (sortedRecipes: recipeType[]) => void;
}

const ControlBar: React.FC<ControlBarProps> = ({ recipes, onSort }) => {
  const navigate = useNavigate();
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedSort, setSelectedSort] = useState<recipeSorterType>(
    recipeSorters[0]
  );

  const handleSortClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setSortAnchorEl(null);
  };

  const handleSortSelect = (sortName: string) => {
    const sorter =
      recipeSorters.find((sorter) => sorter.name === sortName) ||
      recipeSorters[0];
    setSelectedSort(sorter);
    if (!sorter) {
      setSelectedSort(selectedSort);
    }
    const sortedRecipes = [...recipes].sort(sorter.comparator);
    onSort(sortedRecipes);
  };
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton color="primary" onClick={() => navigate("/create-recipe")}>
          <BackupIcon />
        </IconButton>
        <IconButton color="primary" onClick={handleSortClick}>
          <SortIcon />
        </IconButton>
        <Menu
          anchorEl={sortAnchorEl}
          open={Boolean(sortAnchorEl)}
          onClose={handleSortClose}
        >
          {recipeSorters.map((sorter) => (
            <MenuItem
              key={sorter.name}
              onClick={() => handleSortSelect(sorter.name)}
            >
              <ListItemText primary={sorter.name} />
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default ControlBar;
