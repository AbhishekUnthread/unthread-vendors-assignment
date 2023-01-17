import React from "react";
import "./Variants.scss";
import {
  FormControl,
  OutlinedInput,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import convert from "../../../../assets/icons/convert.svg";

const Variants = () => {
  const [country, setCountry] = React.useState("india");

  const handleCountry = (event, newCountry) => {
    // if (newCountry !== null) {
    setCountry(newCountry);
    // }
  };

  return (
    <div className="bg-black-2 border-grey-5 rounded-3 p-3 row">
      <div className="d-flex col-12 px-0 justify-content-between">
        <div className="d-flex align-items-center">
          <h6 className="text-lightBlue me-auto text-lightBlue">Variants</h6>
        </div>
        <p className="text-blue-2">Add Variant</p>
      </div>
      <div className="d-flex col-12 px-0 mt-3">
        <p className="text-lightBlue me-4">Filter:</p>
        <p className="text-blue-2 me-3">Size</p>
        <p className="text-blue-2 me-3">Metal</p>
        <p className="text-blue-2 me-3">Metal Purity</p>
        <p className="text-blue-2 me-3">Diamond</p>
      </div>
      <div className="col-12">
        <ToggleButtonGroup
          value={country}
          onChange={handleCountry}
          aria-label="text formatting"
          className="row d-flex mt-3"
          size="small"
          exclusive
        >
          <ToggleButton value="markets" aria-label="markets" className="col-2">
            <p className="text-grey-6">Markets</p>
          </ToggleButton>
          <ToggleButton value="india" aria-label="india" className="col-3">
            <p className="text-grey-6">India • Default</p>
          </ToggleButton>
          <ToggleButton value="uk" aria-label="uk" className="col-2">
            UK
          </ToggleButton>
          <ToggleButton value="usa" aria-label="usa" className="col-2">
            USA
          </ToggleButton>
          <ToggleButton
            value="add"
            aria-label="add"
            className="col-3 button-gradient py-2 px-0 border-0"
          >
            <p>+ Add Market</p>
          </ToggleButton>
        </ToggleButtonGroup>
        {/* </div> */}
      </div>
      <div className="d-flex col-12 px-0 align-items-center justify-content-between my-3">
        <div className="d-flex align-items-center">
          <p className="text-lightBlue">Store Address:</p>
          <FormControl
            sx={{ background: "#15142A", width: 400 }}
            className="px-0 ms-3"
          >
            <OutlinedInput
              placeholder="Enter store address"
              size="small"
              defaultValue="JWL Bhaugh, Delhi 110001"
            />
          </FormControl>
        </div>
        <button className="button-grey py-2 px-3">
          <img src={convert} alt="convert" className="me-2" width={15} />
          <p>Auto Convert Price</p>
        </button>
      </div>
    </div>
  );
};

export default Variants;
