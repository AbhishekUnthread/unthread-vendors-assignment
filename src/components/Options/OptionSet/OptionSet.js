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

const OptionSet = (props) => {
  const { isEdit, onOptionDelete, index, formik, isSubmitting } = props;
  const [collapse, setCollapse] = useState(isEdit);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isTouched, setIsTouched] = useState(false);

  const {
    data: optionsData,
    isLoading: optionsIsLoading,
    error: optionsError,
    isError: optionsIsError,
    isSuccess: optionsIsSuccess,
  } = useGetAllOptionsQuery();
  const {
    data: attributesData,
    isLoading: attributesIsLoading,
    error: attributesError,
    isError: attributesIsError,
    isSuccess: attributesIsSuccess,
  } = useGetAllAttributesQuery(
    {
      attribute: selectedOption?._id,
    },
    {
      skip: selectedOption?._id ? false : true,
    }
  );
  const {
    data: subOptionsData,
    isLoading: subOptionsIsLoading,
    error: subOptionsError,
    isError: subOptionsIsError,
    isSuccess: subOptionsIsSuccess,
  } = useGetAllSubOptionsQuery(
    {
      attribute: selectedOption?._id,
    },
    {
      skip: selectedOption?._id ? false : true,
    }
  );

  const {
    data: subAttributesData,
    isLoading: subAttributesIsLoading,
    error: subAttributesError,
    isError: subAttributesIsError,
    isSuccess: subAttributesIsSuccess,
    isFetching: subAttributesDataIsFetching,
  } = useGetAllSubAttributesQuery(
    {
      attribute: selectedOption?._id,
    },
    {
      skip: selectedOption?._id ? false : true,
    }
  );

  const toggleCollapseHandler = () => {
    setCollapse((prevState) => {
      return !prevState;
    });
  };

  const addAttributeHandler = (_, attrs) => {
    const attributes = attrs.map((attr) => ({ id: attr._id }));
    formik.setFieldValue(
      `option[${index}].attribute[0].metaAttributes`,
      attributes
    );
  };

  const attributeBlurHandler = () => {
    setIsTouched(true);
  };

  const selectedAttributeIds = formik.values.option[
    index
  ].attribute[0].metaAttributes?.map((attr) => attr.id);

  const selectedAttributes =
    selectedAttributeIds.length && attributesData?.data?.length
      ? attributesData.data.filter((attr) =>
          selectedAttributeIds.includes(attr._id)
        )
      : [];

  useEffect(() => {
    optionsData?.data?.length &&
      formik.values.option[index].attribute[0].id &&
      setSelectedOption(
        optionsData.data.find((option) => {
          return option._id === formik.values.option[index].attribute[0].id;
        })
      );
  }, [formik.values.option, index, optionsData]);

  useEffect(() => {
    if (
      isSubmitting &&
      formik.values.option?.length &&
      formik.values.option[index].attribute[0].id
    ) {
      setIsTouched(true);
    }
  }, [isSubmitting]);

  return collapse ? (
    <OptionSetCollapse
      onEdit={toggleCollapseHandler}
      onOptionDelete={onOptionDelete}
      index={index}
    />
  ) : (
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
              sx={{ padding: "2px 0px" }}
              name={`option[${index}].attribute[0].id`}
              value={formik.values.option[index].attribute[0].id}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            >
              {optionsData?.data?.length &&
                optionsData.data.map((option) => {
                  return (
                    <MenuItem
                      key={option._id}
                      value={option._id}
                      sx={{ fontSize: 13, color: "#5c6d8e" }}
                    >
                      {option.title}
                    </MenuItem>
                  );
                })}
            </Select>
            {formik.touched?.option?.length &&
            !!formik.touched.option[index]?.attribute[0]?.id &&
            formik.errors?.option?.length &&
            formik.errors.option[index]?.attribute[0]?.id ? (
              <FormHelperText error>
                {formik.errors.option[index].attribute[0].id}
              </FormHelperText>
            ) : null}
          </FormControl>
        </Grid>
        {selectedOption && (
          <>
            <Grid item>
              <div className="small">
                <div className="text-grey-6" style={{ marginBottom: "3px" }}>
                  Frontend Name:
                </div>
                <div>
                  <span className="text-lightBlue">
                    {selectedOption.frontEndTitle}
                  </span>{" "}
                  <Link
                    to={`/parameters/options/edit/${selectedOption.srNo}`}
                    className="reset link"
                    style={{ cursor: "pointer" }}
                  >
                    (Change)
                  </Link>
                </div>
              </div>
            </Grid>
            <Grid item>
              <div className="small">
                <div className="text-grey-6" style={{ marginBottom: "3px" }}>
                  Input Field Type:
                </div>
                <div>
                  <span className="text-lightBlue">
                    {FRONTEND_APPEARANCE[selectedOption.apperance]}
                  </span>{" "}
                  <Link
                    to={`/parameters/options/edit/${selectedOption.srNo}`}
                    className="reset link"
                    style={{ cursor: "pointer" }}
                  >
                    (Change)
                  </Link>
                </div>
              </div>
            </Grid>
          </>
        )}
        <Grid item sx={{ marginLeft: "auto" }}></Grid>
      </Grid>
      {selectedOption && (
        <div className="mt-3">
          {selectedOption.metaSubAttributes.length ? (
            <ul className="reset">
              {attributesData?.data?.length &&
                attributesData?.data.map((attr) => {
                  return (
                    <li key={attr._id} className="d-block">
                      <SubOptionSet
                        attribute={attr}
                        index={index}
                        formik={formik}
                        isSubmitting={isSubmitting}
                      />
                    </li>
                  );
                })}
            </ul>
          ) : (
            <div>
              <div className="d-flex  mb-1">
                <p className="text-lightBlue me-2">{`Select ${selectedOption.title}`}</p>
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
                  onChange={addAttributeHandler}
                  onBlur={attributeBlurHandler}
                  values={selectedAttributes}
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
                      <small className="text-lightBlue">
                        {attribute.title}
                      </small>
                    </li>
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <OptionChip option={option} {...getTagProps({ index })} />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField size="small" {...params} />
                  )}
                />
                {isTouched &&
                  formik.errors?.option?.length &&
                  formik.errors.option[index]?.attribute[0].metaAttributes && (
                    <FormHelperText error>
                      {formik.errors.option[index].attribute[0].metaAttributes}
                    </FormHelperText>
                  )}
              </FormControl>
            </div>
          )}
        </div>
      )}
      <div className="d-flex justify-content-end mt-4">
        <button
          onClick={onOptionDelete.bind(null, {
            deleteIndex: index,
            message: "option",
          })}
          type="button"
          className="button-grey-outline py-2 px-4 ms-3 c-pointer"
          style={{ minWidth: "8rem" }}
        >
          <p>Discard</p>
        </button>

        <button
          type="button"
          onClick={toggleCollapseHandler}
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
