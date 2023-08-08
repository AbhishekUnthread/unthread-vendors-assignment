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

const SubAttributeSelector = (props) => {
  const {
    subAttributesData,
    attrId,
    subOpId,
    formik,
    optionIndex,
    isSubmitting,
    isAttributeAdded,
  } = props;
  const [isTouched, setIsTouched] = useState(false);

  const subAttributeBlurHandler = () => {
    setIsTouched(true);
  };

  const attrIndex = formik.values.option[
    optionIndex
  ].attribute[0].metaAttributes.findIndex((attr) => attr.id === attrId);
  const subOpIndex = formik.values.option[
    optionIndex
  ].attribute[0].metaAttributes[attrIndex].metaSubAttribute.findIndex(
    (subOp) => subOp.id === subOpId
  );
  const addSubAttributeHandler = (_, subAttrs) => {
    const subAttributes = subAttrs.map((subAttr) => subAttr._id);
    formik.setFieldValue(
      `option[${optionIndex}].attribute[0].metaAttributes[${attrIndex}].metaSubAttribute[${subOpIndex}].metaSubAttributeValue`,
      subAttributes
    );
  };
  const subAttributes = formik.values.option[
    optionIndex
  ].attribute[0].metaAttributes[attrIndex].metaSubAttribute[
    subOpIndex
  ].metaSubAttributeValue?.map((subAttr) => {
    if (typeof subAttr === "string") {
      return subAttr;
    }
    return subAttr._id;
  });

  const selectedSubAttributeIds = subAttributes || [];

  const selectedSubAttributes =
    selectedSubAttributeIds.length && subAttributesData?.length
      ? subAttributesData.filter((subAttr) =>
          selectedSubAttributeIds.includes(subAttr._id)
        )
      : [];

  useEffect(() => {
    if (isSubmitting && isAttributeAdded) {
      setIsTouched(true);
    }
  }, [isSubmitting]);

  useEffect(() => {
    const subAttributes = formik.values.option[
      optionIndex
    ].attribute[0].metaAttributes[attrIndex].metaSubAttribute[
      subOpIndex
    ].metaSubAttributeValue.map((subAttr) => {
      if (typeof subAttr === "string") {
        return subAttr;
      }
      return subAttr._id;
    });
    formik.setFieldValue(
      `option[${optionIndex}].attribute[0].metaAttributes[${attrIndex}].metaSubAttribute[${subOpIndex}].metaSubAttributeValue`,
      subAttributes
    );
  }, []);

  return (
    <div>
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
          onChange={addSubAttributeHandler}
          onBlur={subAttributeBlurHandler}
          value={selectedSubAttributes}
          id="checkboxes-tags-demo"
          sx={{ width: "100%" }}
          options={subAttributesData || []}
          disableCloseOnSelect
          getOptionLabel={(subAttr) => subAttr.title}
          size="small"
          renderOption={(props, subAttr, { selected }) => (
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
              <small className="text-lightBlue">{subAttr.title}</small>
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
          !formik.values.option[optionIndex].attribute[0].metaAttributes[
            attrIndex
          ].metaSubAttribute[subOpIndex].metaSubAttributeValue?.length && (
            <FormHelperText error>
              Minimum 1 sub attribute should be selected
            </FormHelperText>
          )}
      </FormControl>
    </div>
  );
};

export default SubAttributeSelector;
