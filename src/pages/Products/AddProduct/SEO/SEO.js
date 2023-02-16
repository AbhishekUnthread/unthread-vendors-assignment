import React from "react";
import "./SEO.scss";
// ! IMAGES IMPORTS
import info from "../../../../assets/icons/info.svg";
// ! COMPONENT IMPORTS
import { AntSwitch } from "../../../../components/AntSwitch/AntSwitch";
// ! MATERIAL IMPORTS
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  OutlinedInput,
  TextareaAutosize,
} from "@mui/material";

const SEO = () => {
  // ? CHECKBOX STARTS HERE
  const [checked, setChecked] = React.useState(true);

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };
  // ? CHECKBOX ENDS HERE

  // ? SWITCH STARTS HERE
  const [checkedSwitch, setCheckedSwitch] = React.useState(true);
  const handleSwitchChange = (event) => {
    setCheckedSwitch(event.target.checked);
  };
  // ? SWITCH ENDS HERE

  return (
    <div className="bg-black-15 border-grey-5 rounded-8 p-3 row">
      <div className="d-flex col-12 px-0 justifu-content-between">
        <div className="d-flex align-items-center me-auto">
          <h6 className="text-lightBlue me-auto fw-500">
            Search Engine Optimisation
          </h6>
          <img src={info} alt="info" className="ms-2" />
        </div>
        <AntSwitch
          inputProps={{ "aria-label": "ant design" }}
          checked={checkedSwitch}
          onChange={handleSwitchChange}
        />
      </div>
      {checkedSwitch && (
        <React.Fragment>
          <div className="d-flex align-items-center mt-3 col-12 px-0">
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
                  }}
                />
              }
              label="Auto Generate SEO "
              sx={{
                "& .MuiTypography-root": {
                  fontSize: 13,
                  color: "#c8d8ff",
                },
              }}
            />
            <p>
              <i className="text-grey-6">Powered by Kepler</i>
            </p>
          </div>
          {!checked && (
            <React.Fragment>
              <small className="text-lightBlue mb-2 mt-3 col-12 px-0">
                Page Title
              </small>
              <FormControl className="col-12 px-0">
                <OutlinedInput
                  placeholder="Please enter page title"
                  size="small"
                  defaultValue="Rings by JWL"
                />
              </FormControl>
              <small className="mt-1 text-grey-6 col-12 px-0">
                20 of 50 characters Used
              </small>
              <small className="text-lightBlue mb-2 mt-3 col-12 px-0">
                Meta Description
              </small>
              <TextareaAutosize
                aria-label="meta description"
                placeholder="Please enter meta description"
                style={{
                  background: "#15142A",
                  color: "#c8d8ff",
                  borderRadius: 5,
                }}
                minRows={5}
                defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua."
                className="col-12"
              />
              <small className="mt-1 text-grey-6 col-12 px-0">
                200 of 500 characters Used
              </small>
              <small className="text-lightBlue mb-2 mt-3 col-12 px-0">
                URL Handle
              </small>
              <FormControl className="col-12 px-0">
                <OutlinedInput
                  placeholder="Please enter page title"
                  size="small"
                  defaultValue="http://JWLewellers.com/rings-by-JWLewellers"
                />
              </FormControl>

              <small className="text-lightBlue mb-2 mt-3 col-12 px-0">
                Meta Keywords
              </small>
              <FormControl className="col-12 px-0">
                <OutlinedInput placeholder="Enter keywords" size="small" />
              </FormControl>
            </React.Fragment>
          )}

          <div className="col-12 px-0 bg-black-13 border-grey-5 mt-3 rounded-8">
            <div className="d-flex flex-column p-3">
              <p className="text-lightBlue">Metadata Preview</p>
              <small className="text-lightBlue mt-3 mb-2 fw-500">
                Rings by JWL
              </small>
              <small className="text-blue-2">
                http://JWLewellers.com/rings-by-JWLewellers
              </small>
              <small className="mt-2 text-grey-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                sapiente officiis incidunt voluptas amet. Explicabo eaque ipsam
                neque ut deserunt libero, culpa doloribus aut debitis obcaecati
                cupiditate. Doloribus, odit facere.
              </small>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default SEO;
