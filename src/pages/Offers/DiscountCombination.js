import React from "react";
// ! MATERIAL IMPORTS
import { Checkbox, FormControlLabel } from "@mui/material";

const DiscountCombination = ({ showBuy, showBulk }) => {
  // ? CHECKBOX STARTS HERE
  const [checked, setChecked] = React.useState(false);

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };
  // ? CHECKBOX ENDS HERE

  return (
    <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes mt-4">
      <div className="d-flex col-12 px-0 justify-content-between">
        <div className="d-flex align-items-center">
          <h6 className="text-lightBlue me-auto text-lightBlue fw-500">
            Discount Combinations
          </h6>
          {/* <Tooltip title="Lorem ipsum" placement="top">
  <img
    src={info}
    alt="info"
    className="ms-2 c-pointer"
    width={13.5}
  />
</Tooltip> */}
        </div>
      </div>
      <hr className="hr-grey-6 mt-3 mb-0" />
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
        label="Product Discount"
        sx={{
          "& .MuiTypography-root": {
            fontSize: "0.75rem",
            color: "#c8d8ff",
            // color: "#5c6d8e",
          },
        }}
        className="px-0"
      />
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
        label="Cart Discount"
        sx={{
          "& .MuiTypography-root": {
            fontSize: "0.75rem",
            color: "#c8d8ff",
            // color: "#5c6d8e",
          },
        }}
        className="px-0"
      />
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
        label="Free Shipping"
        sx={{
          "& .MuiTypography-root": {
            fontSize: "0.75rem",
            color: "#c8d8ff",
            // color: "#5c6d8e",
          },
        }}
        className="px-0"
      />
      {showBuy && (
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
          label="Buy X, Get Y"
          sx={{
            "& .MuiTypography-root": {
              fontSize: "0.75rem",
              color: "#c8d8ff",
              // color: "#5c6d8e",
            },
          }}
          className="px-0"
        />
      )}
      {showBulk && (
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
          label="Bulk/Tiered Discount"
          sx={{
            "& .MuiTypography-root": {
              fontSize: "0.75rem",
              color: "#c8d8ff",
              // color: "#5c6d8e",
            },
          }}
          className="px-0"
        />
      )}
    </div>
  );
};

export default DiscountCombination;
