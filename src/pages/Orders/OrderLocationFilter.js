import React from "react";
// ! IMAGES IMPORTS
import arrowDown from "../../assets/icons/arrowDown.svg";
// ! MATERIAL IMPORTS
import { Autocomplete, Popover, TextField } from "@mui/material";
// ! MATERIAL ICONS IMPORTS

const locationData = [
  { title: "Content 1", value: "content1" },
  { title: "Content 2", value: "content2" },
  { title: "Content 3", value: "content3" },
  { title: "Content 4", value: "content4" },
  { title: "Content 5", value: "content5" },
  { title: "Content 6", value: "content6" },
  { title: "Content 7", value: "content7" },
  { title: "Content 8", value: "content8" },
  { title: "Content 9", value: "content9" },
  { title: "Content 10", value: "content10" },
  { title: "Content 11", value: "content11" },
  { title: "Content 12", value: "content12" },
];

const OrderLocationFilter = () => {
  // * LOCATION POPOVERS STARTS
  const [anchorLocationEl, setAnchorLocationEl] = React.useState(null);

  const handleLocationClick = (event) => {
    setAnchorLocationEl(event.currentTarget);
  };

  const handleLocationClose = () => {
    setAnchorLocationEl(null);
  };

  const openLocation = Boolean(anchorLocationEl);
  const idLocation = openLocation ? "simple-popover" : undefined;
  // * LOCATION POPOVERS ENDS

  return (
    <React.Fragment>
      <button
        className="button-grey py-1 px-3 d-none d-md-block"
        aria-describedby={idLocation}
        variant="contained"
        onClick={handleLocationClick}
      >
        <small className="text-lightBlue">Location</small>
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
        id={idLocation}
        open={openLocation}
        anchorEl={anchorLocationEl}
        onClose={handleLocationClose}
      >
        <div className="py-2">
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            size="small"
            options={locationData}
            getOptionLabel={(option) => option.title}
            renderOption={(props, option) => (
              <li {...props}>
                <small className="text-lightBlue my-1">{option.title}</small>
              </li>
            )}
            sx={{
              width: 200,
            }}
            renderInput={(params) => (
              <TextField
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

export default OrderLocationFilter;
