import React, { useState } from "react";
// ! IMAGES IMPORTS
import info from "../../assets/icons/info.svg";
import cancel from "../../assets/icons/cancel.svg";
import arrowDown from "../../assets/icons/arrowDown.svg";
// ! MATERIAL IMPORTS
import {
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  OutlinedInput,
  Slide,
  Checkbox,
  FormControlLabel,
  TextField,
  Autocomplete,
  styled,
  InputBase,
  FormGroup,
  Popover,
  Tooltip,
} from "@mui/material";
// ! MATERIAL ICONS IMPORTS
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import SearchIcon from "@mui/icons-material/Search";

// ? DIALOG TRANSITION STARTS HERE
const Transition = React.forwardRef(function Transition(props, ref) {
  return (
    <Slide
      direction="up"
      ref={ref}
      {...props}
    />
  );
});
// ? DIALOG TRANSITION ENDS HERE

// ? SEARCH INPUT STARTS HERE
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  "&:hover": {},
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
  height: "30.6px",
  border: "1px solid #38395c",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1.5),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(0.8, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    borderRadius: "5px",
  },
}));
// ? SEARCH INPUT ENDS HERE

const taggedWithData = [
  { title: "Tag 1", value: "tag1" },
  { title: "Tag 2", value: "tag2" },
  { title: "Tag 3", value: "tag3" },
  { title: "Tag 4", value: "tag4" },
  { title: "Tag 5", value: "tag5" },
  { title: "Tag 6", value: "tag6" },
  { title: "Tag 7", value: "tag7" },
  { title: "Tag 8", value: "tag8" },
  { title: "Tag 9", value: "tag9" },
  { title: "Tag 10", value: "tag10" },
  { title: "Tag 11", value: "tag11" },
  { title: "Tag 12", value: "tag12" },
];

const TagsBox = ({ tagsList = [], selectedTagList }) => {
  const handleTagList = (event, value) => {
    selectedTagList(value.map((option) => option.name));
  };
  // ? TAGS DIALOG STARTS HERE
  const [openTags, setOpenTags] = React.useState(false);

  const handleTagsOpen = () => {
    setOpenTags(true);
  };

  const handleTagsClose = () => {
    setOpenTags(false);
  };

  const [anchorTagEl, setAnchorTagEl] = React.useState(null);

  const handleTagClick = (event) => {
    setAnchorTagEl(event.currentTarget);
  };

  const handleTagClose = () => {
    setAnchorTagEl(null);
  };

  const openTag = Boolean(anchorTagEl);
  const idTag = openTag ? "simple-popover" : undefined;

  console.log(tagsList, 'tagsList');
  return (
    <div className="bg-black-15 border-grey-5 rounded-8 p-3 mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex">
          <h6 className="text-lightBlue fw-500">Tags</h6>
          <Tooltip
            title="Lorem ipsum"
            placement="top">
            <img
              src={info}
              alt="info"
              className="ms-2 c-pointer"
              width={13.5}
            />
          </Tooltip>
        </div>
        <small
          className="text-blue-2 c-pointer"
          onClick={handleTagsOpen}>
          View all Tags
        </small>

        <Dialog
          open={openTags}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleTagsClose}
          aria-describedby="alert-dialog-slide-description"
          maxWidth="md"
          fullWidth={true}>
          <DialogTitle>
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="text-lightBlue fw-500">Tags</h5>
              <img
                src={cancel}
                alt="cancel"
                width={30}
                onClick={handleTagsClose}
                className="c-pointer"
              />
            </div>
          </DialogTitle>
          <hr className="hr-grey-6 my-0" />
          <DialogContent className="py-2 px-4">
            <div className="row">
              <div className="col-md-6 mt-2">
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon sx={{ color: "#c8d8ff" }} />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                  />
                </Search>
              </div>
              <div className="col-md-3 col-6 ps-md-0 pe-0 mt-2">
                <button
                  className="button-grey py-1 px-3 w-100"
                  variant="contained">
                  <p className="text-lightBlue">Alphabetical (A-Z)</p>
                  <img
                    src={arrowDown}
                    alt="arrowDown"
                    className="ms-2"
                  />
                </button>
              </div>
              <div className="col-md-3 col-6 mt-2">
                <button
                  className="button-gradient py-1 px-3 w-100"
                  onClick={handleTagClick}>
                  <p>Create a New Tag</p>
                </button>
                <Popover
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  id={idTag}
                  open={openTag}
                  anchorEl={anchorTagEl}
                  onClose={handleTagClose}
                  className="columns">
                  <div className="py-2 px-2">
                    <div className="d-flex mb-2 pt-1">
                      <small className="text-grey-6">Enter Tag Name</small>
                      <Tooltip
                        title="Lorem ipsum"
                        placement="top">
                        <img
                          src={info}
                          alt="info"
                          className="ms-2 c-pointer"
                          width={13.5}
                        />
                      </Tooltip>
                    </div>
                    <FormControl className="pb-1">
                      <OutlinedInput
                        placeholder="Enter Tag Name"
                        size="small"
                      />
                    </FormControl>
                  </div>
                </Popover>
              </div>
            </div>
            <p className="text-lightBlue mt-3 mb-2">458 Tags are listed below</p>

            <FormGroup className="tags-checkbox">
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    style={{
                      color: "#5C6D8E",
                    }}
                  />
                }
                label="Tags 1"
                className="me-0"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    style={{
                      color: "#5C6D8E",
                    }}
                  />
                }
                label="Tags 2"
                className="me-0"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    style={{
                      color: "#5C6D8E",
                    }}
                  />
                }
                label="Tags 3"
                className="me-0"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    style={{
                      color: "#5C6D8E",
                    }}
                  />
                }
                label="Tags 4"
                className="me-0"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    style={{
                      color: "#5C6D8E",
                    }}
                  />
                }
                label="Tags 5"
                className="me-0"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    style={{
                      color: "#5C6D8E",
                    }}
                  />
                }
                label="Tags 6"
                className="me-0"
              />
            </FormGroup>
          </DialogContent>
          <hr className="hr-grey-6 my-0" />
          <DialogActions className="d-flex justify-content-between px-4 py-3">
            <button
              className="button-grey py-2 px-5"
              onClick={handleTagsClose}>
              <p className="text-lightBlue">Cancel</p>
            </button>
            <button
              className="button-gradient py-2 px-5"
              onClick={handleTagsClose}>
              <p>Add 5 Tags</p>
            </button>
          </DialogActions>
        </Dialog>
      </div>
      <Autocomplete
        multiple
        id="checkboxes-tags-demo"
        sx={{ width: "100%" }}
        options={tagsList}
        disableCloseOnSelect
        getOptionLabel={(option) => option.name}
        onChange={handleTagList}
        size="small"
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
              checkedIcon={<CheckBoxIcon fontSize="small" />}
              checked={selected}
              size="small"
              style={{
                color: "#5C6D8E",
                marginRight: 0,
              }}
            />
            <small className="text-lightBlue">{option.name}</small>
          </li>
        )}
        renderInput={(params) => (
          <TextField
            size="small"
            {...params}
            placeholder="Search"
          />
        )}
      />
    </div>
  );
};

export default TagsBox;
