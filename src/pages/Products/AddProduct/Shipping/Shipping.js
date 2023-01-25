import React from "react";
import "./Shipping.scss";
// ! COMPONENT IMPORTS
import AppCountrySelect from "../../../../components/AppCountrySelect/AppCountrySelect";
// ! MATERIAL IMPORTS
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputAdornment,
  OutlinedInput,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

const Shipping = () => {
  // ? TOGGLE BUTTONS STARTS HERE
  const [productType, setProductType] = React.useState("physical");
  const handleProductType = (event, newProductType) => {
    setProductType(newProductType);
  };
  // ? TOGGLE BUTTONS ENDS HERE

  // ? CHECKBOX STARTS HERE
  const [checked, setChecked] = React.useState(false);

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };
  // ? CHECKBOX ENDS HERE

  return (
    <div className="bg-black-15 border-grey-5 rounded-3 p-3 row shipping">
      <div className="d-flex col-12 px-0 justify-content-between">
        <div className="d-flex align-items-center">
          <h6 className="text-lightBlue me-auto text-lightBlue">Shipping</h6>
        </div>
        <p className="text-blue-2">Settings</p>
      </div>

      <div className="col-12">
        <ToggleButtonGroup
          value={productType}
          onChange={handleProductType}
          aria-label="text formatting"
          className="row d-flex mt-4 toggle"
          size="small"
          exclusive
        >
          <ToggleButton
            value="physical"
            aria-label="physical"
            style={{ width: 200 }}
          >
            <div className="d-flex">
              <p className="text-grey-6">Physical Product</p>
            </div>
          </ToggleButton>
          <ToggleButton
            value="digital"
            aria-label="digital"
            style={{ width: 200 }}
          >
            <div className="d-flex">
              <p className="text-grey-6">Digital Product</p>
            </div>
          </ToggleButton>
        </ToggleButtonGroup>

        {/* </div> */}
      </div>
      <hr className="hr-grey-6 mt-4 mb-3 col-12" />
      {productType === "physical" && (
        <React.Fragment>
          <p className="text-lightBlue col-12 px-0">
            Enter Product's Weight and Dimensions
          </p>
          <small className="text-grey-6 mt-1 col-12 px-0">
            Change Units in&nbsp;
            <span className="text-blue-2">Regional settings</span>
          </small>
          <div className="d-flex my-3 align-items-center shipping-inputs col-12 px-0">
            <FormControl sx={{ background: "#15142A" }} className="me-5">
              <OutlinedInput
                placeholder="Enter Weight"
                size="small"
                endAdornment={
                  <InputAdornment position="end">kg</InputAdornment>
                }
              />
            </FormControl>
            <FormControl sx={{ background: "#15142A" }} className="">
              <OutlinedInput
                placeholder="Enter Length"
                size="small"
                endAdornment={
                  <InputAdornment position="end">cm</InputAdornment>
                }
              />
            </FormControl>
            <p className="text-lightBlue mx-2">x</p>
            <FormControl sx={{ background: "#15142A" }} className="">
              <OutlinedInput
                placeholder="Enter Height"
                size="small"
                endAdornment={
                  <InputAdornment position="end">cm</InputAdornment>
                }
              />
            </FormControl>
            <p className="text-lightBlue mx-2">x</p>
            <FormControl sx={{ background: "#15142A" }} className="">
              <OutlinedInput
                placeholder="Enter Width"
                size="small"
                endAdornment={
                  <InputAdornment position="end">cm</InputAdornment>
                }
              />
            </FormControl>
          </div>
          <FormControlLabel
            // control={<Checkbox size="small" />}
            control={
              <Checkbox
                checked={checked}
                onChange={handleCheckboxChange}
                inputProps={{ "aria-label": "controlled" }}
                size="small"
              />
            }
            label="Is this item available for shipping abroad?"
            sx={{
              "& .MuiTypography-root": {
                fontSize: 13,
                color: "#c8d8ff",
              },
            }}
            className=" col-12 px-0 my-3"
          />
          {checked && (
            <React.Fragment>
              <div className="col-12 px-0">
                <p className="text-lightBlue">Custom Information</p>
                <small className="text-grey-6 mt-2 w-50 d-block">
                  Customs authorities use this information to calculate duties
                  when shipping internationally. Shown on printed customs forms.
                </small>
              </div>
              <div className="col-12 px-0 mt-4">
                <p className="text-lightBlue mb-2">Country/Region of Origin</p>
                <AppCountrySelect />
                <small className="text-grey-6 mt-1">
                  ⓘ Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </small>
              </div>
              <div className="col-12 px-0 mt-4 mb-3">
                <p className="text-lightBlue mb-2">
                  HS (Harmonized System) code
                </p>
                <AppCountrySelect />
                <small className="text-grey-6 mt-1">
                  ⓘ Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </small>
              </div>
            </React.Fragment>
          )}
        </React.Fragment>
      )}
      {productType === "digital" && (
        <p className="text-lightBlue">
          No Shipping Details and Weight will be assign to Digital
          Products,&nbsp;
          <span className="text-blue-2">Learn More about Digital Products</span>
        </p>
      )}
    </div>
  );
};

export default Shipping;
