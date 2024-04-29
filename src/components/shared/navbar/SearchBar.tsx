import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

interface SearchBarProps {
  searchHandler?: (searchQuery: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchHandler }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSubmit = () => {
    searchQuery.length > 0 && searchHandler && searchHandler(searchQuery);
    setSearchQuery("");
  };

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        backgroundColor: "transparent",
        boxShadow: "none",
        borderRadius: "20px", // Add rounded corners to the whole search bar
      }}
    >
      <InputBase
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit();
          }
        }}
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
        sx={{
          ml: 1,
          flex: 1,
          color: "white",
          border: "1px solid white",
          borderRadius: 2,
          padding: "10px 20px",
          "&::placeholder": {
            color: "rgba(255, 255, 255, 0.7)",
          },
          "&.Mui-focused": {
            borderColor: "rgba(255, 255, 255, 0.8)",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
        }}
        placeholder="Search"
        inputProps={{ "aria-label": "search" }}
      />
      <IconButton
        onClick={() => handleSubmit()}
        type="button"
        sx={{
          p: "10px",
          color: "white",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.2)",
          },
        }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
