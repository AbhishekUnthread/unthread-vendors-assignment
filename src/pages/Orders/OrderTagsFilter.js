import React from "react";
// ! IMAGES IMPORTS
import arrowDown from "../../assets/icons/arrowDown.svg";
// ! MATERIAL IMPORTS
import { Autocomplete, Checkbox, Popover, TextField } from "@mui/material";
// ! MATERIAL ICONS IMPORTS
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

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

const OrderTagsFilter = () => {
  // * TAGGED WITH POPOVERS STARTS
  const [anchorTaggedWithEl, setAnchorTaggedWithEl] = React.useState(null);

  const handleTaggedWithClick = (event) => {
    setAnchorTaggedWithEl(event.currentTarget);
  };

  const handleTaggedWithClose = () => {
    setAnchorTaggedWithEl(null);
  };

  const openTaggedWith = Boolean(anchorTaggedWithEl);
  const idTaggedWith = openTaggedWith ? "simple-popover" : undefined;
  // * TAGGED WITH POPOVERS ENDS

  return (
    <React.Fragment>
      <button
        className="button-grey py-2 px-3 d-none d-md-block"
        aria-describedby={idTaggedWith}
        variant="contained"
        onClick={handleTaggedWithClick}
      >
        <small className="text-lightBlue">Tagged With</small>
        <img src={arrowDown} alt="arrowDown" className="ms-2" />
      </button>

      <Popover
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        id={idTaggedWith}
        open={openTaggedWith}
        anchorEl={anchorTaggedWithEl}
        onClose={handleTaggedWithClose}
      >
        <div className="py-2">
          <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            sx={{ width: 300 }}
            options={taggedWithData}
            disableCloseOnSelect
            getOptionLabel={(option) => option.title}
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
                <small className="text-lightBlue">{option.title}</small>
              </li>
            )}
            renderInput={(params) => (
              <TextField
                size="small"
                {...params}
                placeholder="Search"
                inputRef={(input) => input?.focus()}
              />
            )}
          />
        </div>
      </Popover>
    </React.Fragment>
  );
};

export default OrderTagsFilter;
