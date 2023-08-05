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
import OptionChip from "../OptionChip/OptionChip";

import info from "../../../assets/icons/info.svg";

import {
  showSuccess,
  showError,
} from "../../../features/snackbar/snackbarAction";

const SubOptionSet = (props) => {
  const {
    attribute,
    index,
    formik,
    isSubmitting,
    selectedAttributeIds,
    subOptions,
    subAttributes,
  } = props;

  const addSingleAttributeHandler = (e) => {
    const isChecked = e.target.checked;

    let updatedAttributes = [];
    if (isChecked) {
      updatedAttributes = formik.values.option[
        index
      ].attribute[0].metaAttributes.concat({
        id: attribute._id,
        metaSubAttribute: [],
      });
    } else {
      updatedAttributes = formik.values.option[
        index
      ].attribute[0].metaAttributes.filter((attr) => attr.id !== attribute._id);
    }
    formik.setFieldValue(
      `option[${index}].attribute[0].metaAttributes`,
      updatedAttributes
    );
  };

  const isAttributeAdded = selectedAttributeIds.includes(attribute._id);

  console.log(subOptions);

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
            onChange={addSingleAttributeHandler}
            checked={isAttributeAdded}
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
        {isAttributeAdded &&
          subOptions.map((subOp) => {
            if (subOp.metaAttribute === attribute._id) {
              const childSubAttributes = subAttributes.filter(
                (subAttr) => subAttr.metaSubAttribute._id === subOp._id
              );
              return (
                <li className="d-block mb-3" key={subOp._id}>
                  <div className="d-flex  mb-1">
                    <p className="text-lightBlue me-2">{`Select ${attribute.title} ${subOp.title}`}</p>
                    <Tooltip title="Lorem ipsum" placement="top">
                      <img
                        src={info}
                        alt="info"
                        className=" c-pointer"
                        width={13.5}
                      />
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
                      // onChange={addAttributeHandler}
                      // onBlur={attributeBlurHandler}
                      // values={selectedAttributes}
                      id="checkboxes-tags-demo"
                      sx={{ width: "100%" }}
                      options={childSubAttributes}
                      disableCloseOnSelect
                      getOptionLabel={(attribute) => attribute.title}
                      size="small"
                      renderOption={(props, attribute, { selected }) => (
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
                          <small className="text-lightBlue">
                            {attribute.title}
                          </small>
                        </li>
                      )}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <OptionChip
                            option={option}
                            {...getTagProps({ index })}
                          />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField size="small" {...params} />
                      )}
                    />
                    {/* {isTouched &&
                    formik.errors?.option?.length &&
                    formik.errors.option[index]?.attribute[0]
                      .metaAttributes && (
                      <FormHelperText error>
                        {
                          formik.errors.option[index].attribute[0]
                            .metaAttributes
                        }
                      </FormHelperText>
                    )} */}
                  </FormControl>
                </li>
              );
            }
            return null;
          })}
      </ul>
    </>
  );
};

export default SubOptionSet;
