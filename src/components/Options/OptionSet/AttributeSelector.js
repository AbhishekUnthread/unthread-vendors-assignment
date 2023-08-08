import { useEffect, useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import {
  useNavigate,
  useParams,
  useSearchParams,
  createSearchParams,
  Link,
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
import SubOptionSet from "./SubOptionSet";
import OptionSetCollapse from "./OptionSetCollapse";
import DeleteIconButton from "../../DeleteIconButton/DeleteIconButton";
import OptionChip from "../OptionChip/OptionChip";

import info from "../../../assets/icons/info.svg";

import {
  showSuccess,
  showError,
} from "../../../features/snackbar/snackbarAction";
import {
  useGetAllOptionsQuery,
  useGetAllAttributesQuery,
  useGetAllSubOptionsQuery,
  useGetAllSubAttributesQuery,
} from "../../../features/parameters/options/optionsApiSlice";

const FRONTEND_APPEARANCE = {
  dropDownList: "Drop-Down List",
  dropDownThumbnail: "Drop-Down List with Thumbnail",
  colorAndImageSwatches: "Color & Image Swatches",
  radioButtons: "Radio Buttons",
  rectangleButtons: "Rectangle Buttons",
  circleButtons: "Circle Buttons",
};

const AttributeSelector = (props) => {
  const {
    selectedOption,
    addAttributeHandler,
    selectedAttributes,
    attributesData,
    formik,
    index,
    isSubmitting,
  } = props;
  const [isTouched, setIsTouched] = useState(false);

  const attributeBlurHandler = () => {
    setIsTouched(true);
  };

  useEffect(() => {
    if (
      isSubmitting &&
      formik.values.option?.length &&
      formik.values.option[index].attribute[0].id
    ) {
      setIsTouched(true);
    }
  }, [isSubmitting]);

  return (
    <div>
      <div className="d-flex  mb-1">
        <p className="text-lightBlue me-2">{`Select ${selectedOption.title}`}</p>
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
          onChange={addAttributeHandler}
          onBlur={attributeBlurHandler}
          value={selectedAttributes}
          id="checkboxes-tags-demo"
          sx={{ width: "100%" }}
          options={attributesData?.data || []}
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
              <small className="text-lightBlue">{attribute.title}</small>
            </li>
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <OptionChip
                option={option}
                {...getTagProps({ index })}
                className="me-1"
              />
            ))
          }
          renderInput={(params) => <TextField size="small" {...params} />}
        />
        {isTouched &&
          formik.values?.option?.length &&
          !formik.values.option[index]?.attribute[0].metaAttributes.length && (
            <FormHelperText error>
              Minimum 1 attribute should be selected
            </FormHelperText>
          )}
      </FormControl>
    </div>
  );
};

export default AttributeSelector;
