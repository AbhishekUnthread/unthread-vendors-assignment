import {
  Autocomplete,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputBase,
  OutlinedInput,
  Paper,
  Switch,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import React from "react";
import { AntSwitch } from "../../../../components/AntSwitch/AntSwitch";
import "./SEO.scss";
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

const SEO = () => {
  const [dense, setDense] = React.useState(false);
  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

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
    <div className="bg-black-2 border-grey-5 rounded-3 p-3 row">
      <div className="d-flex col-12 px-0">
        <h6 className="text-lightBlue me-auto">Search Engine Optimisation</h6>
        {/* <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        /> */}
        <AntSwitch
          inputProps={{ "aria-label": "ant design" }}
          checked={checkedSwitch}
          onChange={handleSwitchChange}
        />
      </div>
      {!checkedSwitch && (
        <React.Fragment>
          <div className="d-flex align-items-center mt-3 col-12 px-0">
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
            <button className="button-gradient py-2 px-3 ms-4">
              <p>Apply to all Products</p>
            </button>
          </div>
          {!checked && (
            <React.Fragment>
              <p className="text-lightBlue mb-2 mt-3 col-12 px-0">Page Title</p>
              <FormControl
                sx={{ background: "#15142A" }}
                className="col-12 px-0"
              >
                <OutlinedInput
                  placeholder="Please enter page title"
                  size="small"
                  defaultValue="Rings by JWL"
                />
                {/* <MyFormHelperText /> */}
              </FormControl>
              <small className="mt-1 text-grey-6 col-12 px-0">
                20 of 50 characters Used
              </small>
              <p className="text-lightBlue mb-2 mt-3 col-12 px-0">
                Meta Description
              </p>
              <TextareaAutosize
                aria-label="meta description"
                placeholder="Please enter meta description"
                style={{
                  background: "#15142A",
                  color: "white",
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
              <p className="text-lightBlue mb-2 mt-3 col-12 px-0">URL Handle</p>
              <FormControl
                sx={{ background: "#15142A" }}
                className="col-12 px-0"
              >
                <OutlinedInput
                  placeholder="Please enter page title"
                  size="small"
                  defaultValue="http://JWLewellers.com/rings-by-JWLewellers"
                />
                {/* <MyFormHelperText /> */}
              </FormControl>

              <p className="text-lightBlue mb-2 mt-3 col-12 px-0">
                Meta Keywords
              </p>
              <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                // sx={{ width: 300 }}
                options={taggedWithData}
                disableCloseOnSelect
                getOptionLabel={(option) => option.title}
                size="small"
                className="col-12 px-0 mb-2"
                sx={{ background: "#15142A" }}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                      checkedIcon={<CheckBoxIcon fontSize="small" />}
                      style={{ marginRight: 0 }}
                      checked={selected}
                      size="small"
                    />
                    {option.title}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField size="small" {...params} placeholder="Search" />
                )}
              />
            </React.Fragment>
          )}

          <div className="col-12 px-0 bg-black-9 border-grey-8 mt-3 rounded-3">
            <div className="d-flex flex-column p-3">
              <h6 className="text-lightBlue">Metadata Preview</h6>
              <p className="text-lightBlue mt-3 mb-2">Rings by JWL</p>
              <p className="text-blue-1">
                http://JWLewellers.com/rings-by-JWLewellers
              </p>
              <p className="mt-2 text-grey-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                sapiente officiis incidunt voluptas amet. Explicabo eaque ipsam
                neque ut deserunt libero, culpa doloribus aut debitis obcaecati
                cupiditate. Doloribus, odit facere.
              </p>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default SEO;
