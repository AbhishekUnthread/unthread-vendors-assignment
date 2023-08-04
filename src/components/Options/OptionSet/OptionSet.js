import { useEffect, useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import {
  useNavigate,
  useParams,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";
import {
  FormControl,
  OutlinedInput,
  Tooltip,
  Grid,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  Autocomplete,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormGroup,
  InputAdornment,
  InputBase,
  Popover,
  Radio,
  RadioGroup,
  Slide,
  styled,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import _ from "lodash";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import SearchIcon from "@mui/icons-material/Search";

import InfoHeader from "../../Header/InfoHeader";
import { SaveFooterTertiary } from "../../SaveFooter/SaveFooter";
import { AntSwitch } from "../../AntSwitch/AntSwitch";
import { DiscardModalSecondary } from "../../Discard/DiscardModal";
import { DeleteModalSecondary } from "../../DeleteModal/DeleteModal";
import PageLoader from "../../Loader/PageLoader";
import SubOptionSet from "./SubOptionSet";

import info from "../../../assets/icons/info.svg";

import {
  showSuccess,
  showError,
} from "../../../features/snackbar/snackbarAction";

const FRONTEND_APPEARANCE = [
  {
    id: 1,
    value: "dropDownList",
    text: "Drop-Down List",
  },
  {
    id: 2,
    value: "dropDownThumbnail",
    text: "Drop-Down List with Thumbnail",
  },
  {
    id: 3,
    value: "colorAndImageSwatches",
    text: "Color & Image Swatches",
  },
  {
    id: 4,
    value: "radioButtons",
    text: "Radio Buttons",
  },
  {
    id: 5,
    value: "rectangleButtons",
    text: "Rectangle Buttons",
  },
  {
    id: 6,
    value: "circleButtons",
    text: "Circle Buttons",
  },
];

const collectionsData = [
  { title: "Collection 1", value: "Collection1" },
  { title: "Collection 2", value: "Collection2" },
  { title: "Collection 3", value: "Collection3" },
  { title: "Collection 4", value: "Collection4" },
  { title: "Collection 5", value: "Collection5" },
  { title: "Collection 6", value: "Collection6" },
];

const OptionSet = () => {
  return (
    <div className="bg-black-13 border-grey-5 rounded-8 p-3 features mt-4 ">
      <div className="d-flex  mb-1">
        <p className="text-lightBlue me-2">Select Options Name</p>
        <Tooltip title="Lorem ipsum" placement="top">
          <img src={info} alt="info" className=" c-pointer" width={13.5} />
        </Tooltip>
      </div>
      <Grid
        container
        spacing={4}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Grid item sm={4}>
          <FormControl
            sx={{
              m: 0,
              minWidth: 120,
              width: "100%",
            }}
            size="small"
          >
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              size="small"
              name="option.apperance"
              sx={{ padding: "2px 0px" }}
            >
              {FRONTEND_APPEARANCE.map((appearance) => {
                return (
                  <MenuItem
                    key={appearance.id}
                    value={appearance.value}
                    sx={{ fontSize: 13, color: "#5c6d8e" }}
                  >
                    {appearance.text}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <div className="small">
            <div className="text-grey-6" style={{ marginBottom: "3px" }}>
              Frontend Name:
            </div>
            <div>
              <span className="text-lightBlue">Size</span>{" "}
              <button className="reset link">(Change)</button>
            </div>
          </div>
        </Grid>
        <Grid item>
          <div className="small">
            <div className="text-grey-6" style={{ marginBottom: "3px" }}>
              Input Field Type:
            </div>
            <div>
              <span className="text-lightBlue">Drop Down List</span>{" "}
              <button className="reset link">(Change)</button>
            </div>
          </div>
        </Grid>
        <Grid item></Grid>
      </Grid>
      <div className="mt-3">
        {/* <div>
          <div className="d-flex  mb-1">
            <p className="text-lightBlue me-2">Frontend Appearance</p>
            <Tooltip title="Lorem ipsum" placement="top">
              <img src={info} alt="info" className=" c-pointer" width={13.5} />
            </Tooltip>
          </div>
          <FormControl
            sx={{
              m: 0,
              minWidth: 120,
              width: "100%",
            }}
            size="small"
          >
            <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              sx={{ width: "100%" }}
              options={collectionsData}
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
              renderInput={(params) => <TextField size="small" {...params} />}
            />
          </FormControl>
        </div> */}
        <ul className="reset">
          <li className="d-block">
            <SubOptionSet />
          </li>
          <li className="d-block">
            <SubOptionSet />
          </li>
        </ul>
      </div>
      <div className="d-flex justify-content-end mt-4">
        <button
          className="button-grey-outline py-2 px-4 ms-3 c-pointer"
          style={{ minWidth: "8rem" }}
        >
          <p>Discard</p>
        </button>

        <button
          className="button-gradient py-2 px-4 ms-3 c-pointer"
          style={{ minWidth: "8rem" }}
        >
          <p>Save</p>
        </button>
      </div>
    </div>
  );
};

export default OptionSet;
