import { useEffect, useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import {
  useNavigate,
  useParams,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";
import {
  Chip,
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

import info from "../../../assets/icons/info.svg";

import {
  showSuccess,
  showError,
} from "../../../features/snackbar/snackbarAction";

const collectionsData = [
  { title: "Collection 1", value: "Collection1" },
  { title: "Collection 2", value: "Collection2" },
  { title: "Collection 3", value: "Collection3" },
  { title: "Collection 4", value: "Collection4" },
  { title: "Collection 5", value: "Collection5" },
  { title: "Collection 6", value: "Collection6" },
];

const SubOptionSet = (props) => {
  const { attribute } = props;
  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            inputProps={{ "aria-label": "controlled" }}
            size="small"
            style={{
              color: "#5C6D8E",
              marginRight: 0,
              width: "auto",
            }}
            name="option.isFilter"
          />
        }
        label={attribute.title}
        sx={{
          "& .MuiTypography-root": {
            color: "#c8d8ff",
            fontSize: "0.875rem",
          },
        }}
        className="px-0 mb-2"
      ></FormControlLabel>
      <ul>
        <li className="d-block mb-3">
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
        </li>
      </ul>
    </>
  );
};

export default SubOptionSet;
