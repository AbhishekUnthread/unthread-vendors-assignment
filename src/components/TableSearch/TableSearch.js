import { styled, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import _debounce from "lodash/debounce";

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
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
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

const DEBOUNCE_TIME = 500;

const TableSearch = (props) => {
  const { onChange } = props;

  const search = _debounce((value) => {
    onChange(value);
  }, DEBOUNCE_TIME);

  const onSearch = (e) => {
    search(e.target.value);
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
        
      />
    </Search>
  );
};

export default TableSearch;
