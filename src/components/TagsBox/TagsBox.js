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

import CustomerChip from "../../pages/Users/AddUser/CustomerChip";

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


const TagsBox = ({ tagsList = [], selectedTagList, formik }) => {
  const [openTags, setOpenTags] = React.useState(false);

  const handleTagList = (event, value) => {
    const newTag = value[value.length - 1].name;
    if (!formik.values.tags.includes(newTag)) {
      const updatedTags = [...formik.values.tags, newTag];
      selectedTagList(updatedTags);
    }
  };


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

  const removeTag = (tag) => {
    const updatedTags = formik.values.tags.filter(existingTag => existingTag !== tag);
    selectedTagList(updatedTags);
  };

  const openTag = Boolean(anchorTagEl);
  const idTag = openTag ? "simple-popover" : undefined;

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
        value={formik.values.tags || []}
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
        renderTags={(value) =>
          value.map((option) => (
            <div
              className={`rounded-pill d-flex align-items-center px-2 py-1 c-pointer`}
              style={{
                background:
                  "linear-gradient(303.01deg, #2f2e69 -4.4%, #514969 111.29%)",
              }}
            >
              <small className="fw-400 text-lightBlue">{option}</small>
              <button type="button" className="reset">
                <img 
                  src={cancel} 
                  alt="cancel" 
                  width={20} 
                  className="c-pointer" 
                  onClick={() => removeTag(option)}
                />
              </button>
            </div>
          ))
        }
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
