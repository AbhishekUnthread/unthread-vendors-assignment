import React from "react";
import { styled, InputBase } from "@mui/material";
// ! MATERIAL ICONS IMPORTS
import SearchIcon from "@mui/icons-material/Search";
import { useDebounce } from "../../hooks/optimization";

// ? SEARCH INPUT STARTS HERE
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  "&:hover": {
    backgroundColor: "#1c1b33",
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: 0,
    width: "100%",
  },
  backgroundColor: "#1c1b33",
  height: "37.6px",
  //   marginRight: "8px",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  // padding: theme.spacing(0, 2),
  // padding: "0 8px",
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingLeft: theme.spacing(1.5),
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1.2, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    borderRadius: "5px",
  },
}));
// ? SEARCH INPUT ENDS HERE

const DEBOUNCE_TIME = 500;

const TableSearch = ({ searchValue, handleSearchChange }) => {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon sx={{ color: "#c8d8ff" }} />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        value={searchValue}
        onChange={handleSearchChange}
      />
    </Search>
  );
};

const TableSearchSecondary = (props) => {
  const { onChange, value, onSearchValueChange } = props;

  const debouncedSearch = useDebounce(() => {
    onChange(value);
  });

  const onSearch = (e) => {
    onSearchValueChange(e.target.value);
    debouncedSearch();
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon sx={{ color: "#c8d8ff" }} />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        onChange={onSearch}
        value={value}
      />
    </Search>
  );
};

export default TableSearch;
export { TableSearchSecondary };
