import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import { TextField } from "@mui/material";
import { useState } from "react";

export default function SearchInput() {
  const [searchInput, setSearchInput] = useState("");
  const handleSearch = () => {
    alert(searchInput);
    setSearchInput("");
  };

  //onChange maybe too much
  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
    >
      <IconButton sx={{ p: "10px" }} aria-label="search" onClick={handleSearch}>
        <SearchIcon />
      </IconButton>
      {/*<InputBase*/}
      {/*    sx={{ ml: 1, flex: 1 }}*/}
      {/*    placeholder="Search "*/}
      {/*    onChange={event => setSearchInput(event.target.value)}*/}
      {/*    defaultValue={searchInput}*/}
      {/*    // inputProps={{ 'aria-label': 'search google maps' }}*/}
      {/*/>*/}
      <TextField
        id="filled-search"
        label="Search"
        // type="search"
        // variant="filled"
        fullWidth
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
      />
    </Paper>
  );
}
