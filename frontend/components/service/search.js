import * as React from "react";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";
import { useState } from "react";
import { Close } from "@mui/icons-material";

export default function SearchInput(props) {
  const { handleSearch } = props;
  const [searchInput, setSearchInput] = useState("");
  const searchHandler = (val) => {
    setSearchInput(val);
    handleSearch(val);
  };

  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
    >
      <IconButton sx={{ p: "10px" }} aria-label="search" disabled={true}>
        <SearchIcon />
      </IconButton>
      <TextField
        id="filled-search"
        label="Search"
        fullWidth
        value={searchInput}
        onChange={(event) => searchHandler(event.target.value)}
      />
      <IconButton
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={() => searchHandler("")}
      >
        <Close />
      </IconButton>
    </Paper>
  );
}
