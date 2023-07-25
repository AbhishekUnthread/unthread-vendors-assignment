import React, { useEffect, useState } from "react";
import "./SEO.scss";
// ! IMAGES IMPORTS
import info from "../../../../assets/icons/info.svg";
// ! COMPONENT IMPORTS
import { AntSwitch } from "../../../../components/AntSwitch/AntSwitch";
// ! MATERIAL IMPORTS
import {
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  OutlinedInput,
  TextareaAutosize,
  Tooltip,
} from "@mui/material";
import { useFormik } from "formik";
import { useCreateSeoMutation } from "../../../../features/seo/seoApiSlice";
import { useDispatch } from "react-redux";
import {
  showError,
  showSuccess,
} from "../../../../features/snackbar/snackbarAction";
import _ from "lodash";
const SEO = ({ seoName, seoValue, handleSeoChange, refrenceId }) => {
  const [multipleTags, setMultipleTags] = useState([]);
  const [isFirstTimeRender, setIsFirstTimeRender] = useState(true);
  const [retainValue, setReatinValue] = useState(seoValue ? seoValue : {});
  const dispatch = useDispatch();
  // ? CHECKBOX STARTS HERE

  const [viewAll, setViewAll] = useState(false);
  let seoItems = {};

  const [
    createSeo,
    {
      isLoading: createSeoIsLoading,
      isSuccess: createSeoIsSuccess,
      error: createSeoError,
    },
  ] = useCreateSeoMutation();

  function generateUrlName(name = "") {
    const formattedName =
      "https://example.com/" + name?.toLowerCase()?.replace(/\s+/g, "-");
    return formattedName;
  }

  function isEmpty(obj) {
    for (var prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        return false;
      }
    }

    return true;
  }

  // ? CHECKBOX ENDS HERE
  const seoFormik = useFormik({
    initialValues: {
      title: seoValue.title || seoName,
      slug: "https://example.com/" + seoName,
      description: seoValue.description ? seoValue.description : "",
      metaKeywords: "",
    },
    enableReinitialize: true,
  });
  useEffect(() => {
    if (!isEmpty(seoValue) && isFirstTimeRender === true && seoName !== "") {
      setMultipleTags(
        seoValue && seoValue.metaKeywords ? seoValue.metaKeywords : []
      );
      setIsFirstTimeRender(false);
    }

    if (isEmpty(seoValue) && isFirstTimeRender === true && seoName !== "") {
      setMultipleTags([]);
      setIsFirstTimeRender(false);
    }
  }, [seoValue, seoName, isFirstTimeRender]);

  function handleSubmit() {
    seoItems.title = seoFormik.values?.title;
    if (
      seoFormik.initialValues.slug !== seoFormik.values.slug ||
      seoValue?.slug !== seoFormik.values.slug
    ) {
      seoItems.slug = seoFormik.values.slug;
    }
    if (seoFormik.values?.description) {
      seoItems.description = seoFormik.values?.description;
    }
    if (multipleTags.length > 0) {
      seoItems.metaKeywords = multipleTags;
    }
    handleSeoChange(seoItems);
  }

  useEffect(() => {
    if (!_.isEqual(seoFormik.initialValues, seoFormik.values)) {
      seoItems.metaKeywords = multipleTags;
      seoItems.description = seoFormik.values?.description;
      seoItems.title = seoFormik.values?.title;
      seoItems.slug = seoFormik.values.slug;
      handleSeoChange(seoItems);
    }
  }, [seoFormik.values]);

  function handleSeoCreate() {
    let seoItems = {};
    seoItems.title = seoFormik.values?.title;
    seoItems.refrenceId = refrenceId;
    if (
      seoFormik.initialValues.slug !== seoFormik.values.slug ||
      seoValue?.slug !== seoFormik.values.slug
    ) {
      seoItems.slug = seoFormik.values.slug;
    }
    if (seoFormik.values?.description) {
      seoItems.description = seoFormik.values?.description;
    }
    if (multipleTags.length > 0) {
      seoItems.metaKeywords = multipleTags;
    }
    createSeo(seoItems)
      .unwrap()
      .then(() => {
        handleSeoChange({});
        dispatch(showSuccess({ message: "Seo created for this category" }));
      })
      .catch((err) => dispatch(showError({ message: err?.data?.message })));
  }

  // ? SWITCH ENDS HERE
  const handleAddMultiple = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      seoFormik.validateForm().then(() => {
        if (seoFormik.values.metaKeywords !== "") {
          seoFormik.setFieldTouched("metaKeywords", true);
          setMultipleTags((prevValues) => [
            ...prevValues,
            seoFormik.values.metaKeywords,
          ]);
          seoFormik.setFieldValue("metaKeywords", "");
        }
      });
    }
  };

  const handleDelete = (value) => {
    console.log(value);
    setMultipleTags((prevValues) => prevValues.filter((v) => v !== value));
  };

  return (
    <div className="bg-black-15 border-grey-5 rounded-8 p-3 row">
      <div className="d-flex col-12 px-0 justifu-content-between">
        <div className="d-flex align-items-center me-auto">
          <h6 className="text-lightBlue me-auto fw-500">
            Search Engine Optimisation
          </h6>
          <Tooltip title="Lorem ipsum" placement="top">
            <img
              src={info}
              alt="info"
              className="c-pointer ms-2"
              width={13.5}
            />
          </Tooltip>
        </div>
      </div>

      <div className="d-flex align-items-center mt-3 col-12 px-0">
        <FormControlLabel
          control={
            <Checkbox
              // checked={checked}
              // onChange={handleCheckboxChange}
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
              color: "#C8D8FF",
            },
          }}
        />
        <p>
          <i className="text-grey-6">Powered by Kepler</i>
        </p>
      </div>
      <div className="col-12 px-0 bg-black-13 border-grey-5 mt-3 rounded-8">
        <div className="d-flex flex-column p-3">
          <div className="d-flex justify-content-between">
            <p className="text-lightBlue">Metadata Preview</p>
            {viewAll == false ? (
              <small
                className="text-lightBlue text-blue-2 c-pointer"
                onClick={() => {
                  handleSubmit();
                  setViewAll((prevState) => !prevState);
                }}
              >
                SEO Edit
              </small>
            ) : (
              <small
                className="text-lightBlue text-blue-2 c-pointer"
                onClick={() => {
                  handleSeoCreate();
                  setViewAll((prevState) => !prevState);
                }}
              >
                Save
              </small>
            )}
          </div>
          <small className="text-lightBlue mt-3 mb-2 fw-500">
            {seoFormik.values.title}
          </small>
          <small className="text-blue-2">{seoFormik.values.slug}</small>
          <small className="mt-2 text-grey-6">
            {seoFormik.values.description}
          </small>
        </div>
      </div>
      {viewAll && (
        <React.Fragment>
          <small className="text-lightBlue mb-2 mt-3 col-12 px-0">
            Page Title
          </small>
          <FormControl className="col-12 px-0">
            <OutlinedInput
              name="title"
              placeholder="Please enter page title"
              size="small"
              value={seoFormik.values.title}
              onChange={seoFormik.handleChange}
              onBlur={seoFormik.handleBlur}
            />
          </FormControl>
          <small className="mt-1 text-grey-6 col-12 px-0">
            20 of 50 characters Used
          </small>
          <small className="text-lightBlue mb-2 mt-3 col-12 px-0">
            Meta Description
          </small>
          <TextareaAutosize
            name="description"
            aria-label="meta description"
            placeholder="Please enter meta description"
            style={{
              background: "#15142A",
              color: "#C8D8FF",
              borderRadius: 5,
            }}
            minRows={5}
            value={seoFormik.values.description}
            onChange={seoFormik.handleChange}
            onBlur={seoFormik.handleBlur}
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
              name="slug"
              placeholder="Please enter Url"
              size="small"
              value={seoFormik.values.slug}
              onChange={seoFormik.handleChange}
              onBlur={seoFormik.handleBlur}
            />
          </FormControl>
          <small className="text-lightBlue mb-2 mt-3 col-12 px-0">
            Meta Keywords
          </small>
          <FormControl className="col-12 px-0">
            <OutlinedInput
              name="metaKeywords"
              value={seoFormik.values.metaKeywords}
              onChange={seoFormik.handleChange}
              onBlur={seoFormik.handleBlur}
              onKeyDown={handleAddMultiple}
              placeholder="Enter keywords"
              size="small"
            />
            <div className="d-flex">
              {multipleTags &&
                multipleTags.map((data) => {
                  return (
                    <Chip
                      label={data}
                      onDelete={() => handleDelete(data)}
                      onClick={() => {}}
                      size="small"
                      className="mt-3 me-2"
                    ></Chip>
                  );
                })}
            </div>
          </FormControl>
        </React.Fragment>
      )}
    </div>
  );
};
export default SEO;
