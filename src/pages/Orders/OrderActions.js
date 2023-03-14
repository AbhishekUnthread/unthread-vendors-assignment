import React from "react";
// ! IMAGES IMPORTS
import productIcon from "../../assets/icons/productIcon.svg";
// ! MATERIAL IMPORTS
import {
  FormControlLabel,
  Checkbox,
  FormControl,
  OutlinedInput,
  MenuItem,
  Select,
} from "@mui/material";

const OrderActions = () => {
  // ? ORDER STATUS SELECT STARTS HERE
  const [orderStatus, setOrderStatus] = React.useState("");

  const handleOrderStatusChange = (event) => {
    setOrderStatus(event.target.value);
  };
  // ? GENDER SELECT ENDS HERE
  // ? CHECKBOX STARTS HERE
  const [checked, setChecked] = React.useState(false);

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };
  // ? CHECKBOX ENDS HERE
  return (
    <div className="bg-black-15 border-grey-5 rounded-8 p-3 row mt-4">
      <div className="d-flex justify-content-between align-items-center col-12 px-0">
        <div className="d-flex align-items-center">
          <img src={productIcon} alt="userIcon" width={16} />
          <h6 className="text-lightBlue fw-500 ms-2">Order Action</h6>
        </div>
      </div>

      <div className="d-flex justify-content-center col-12 px-0">
        <hr className="hr-grey-6 w-100 mt-3 mb-0" />
      </div>
      <div className="col-5 mt-3 ps-0">
        <div className="w-100 px-0">
          <p className="text-lightBlue mb-1">Order Status</p>

          <FormControl sx={{ m: 0, minWidth: 120, width: "100%" }} size="small">
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={orderStatus}
              onChange={handleOrderStatusChange}
              size="small"
            >
              <MenuItem value="" sx={{ fontSize: 13, color: "#5c6d8e" }}>
                None
              </MenuItem>
              <MenuItem value={10} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                Status 1
              </MenuItem>
              <MenuItem value={20} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                Status 2
              </MenuItem>
              <MenuItem value={20} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                Status 3
              </MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="col-7 mt-3 pe-0">
        <div className="w-100 px-0">
          <p className="text-lightBlue mb-1">Note</p>
          <FormControl className="w-100 px-0">
            <OutlinedInput placeholder="Type Something" size="small" />
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={handleCheckboxChange}
                inputProps={{ "aria-label": "controlled" }}
                size="small"
                style={{
                  color: "#5C6D8E",
                  marginRight: 0,
                  width: "auto",
                }}
              />
            }
            label="Send Notification to User"
            sx={{
              "& .MuiTypography-root": {
                fontSize: "0.75rem",
                color: "#c8d8ff",
                // color: "#5c6d8e",
              },
            }}
            className=" px-0"
          />
        </div>
      </div>
      <div className="d-flex justify-content-center col-12 px-0">
        <hr className="hr-grey-6 w-100 my-3" />
      </div>
      <div className="col-12 px-0">
        <button className="button-gradient py-2 px-4">
          <p>Update Status</p>
        </button>
      </div>
    </div>
  );
};

export default OrderActions;
