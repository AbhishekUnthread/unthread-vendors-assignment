import React, { useEffect, useState ,useId} from "react";
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

const SEO = ({name,value, handleSeoChange }) => {
  const [multipleTags, setMultipleTags] = useState([]);
  const id = useId();
  // ? CHECKBOX STARTS HERE
  const [checked, setChecked] = React.useState(true);

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };
  // ? CHECKBOX ENDS HERE

  const seoFormik = useFormik({
    initialValues: {
      slug: "",
      title: "",
      urlHandle: "",
      description: "",
      metaKeywords: "",
    },
    enableReinitialize: true,
  });

  useEffect(()=>{
    if(value){
      seoFormik.setFieldValue("title",value.title)
      seoFormik.setFieldValue("urlHandle",value.urlHandle)
      seoFormik.setFieldValue("description",value.description)
      seoFormik.setFieldValue('slug',value.slug)
      setMultipleTags(value.metaKeywords || [])
    }else{
      seoFormik.setFieldValue("title",name)
    }
  },[value,name])

  useEffect(()=>{
    handleSeoChange({
      ...seoFormik.values,
      metaKeywords:multipleTags,
      slug: value?.slug ? value.slug : generateUniqueId(seoFormik.values.title)
    })
    console.log({
      ...seoFormik.values,
      metaKeywords:multipleTags,
      slug: value?.slug ? value.slug : generateUniqueId(seoFormik.values.title)
    })
  },[seoFormik.values])

  // ? SWITCH STARTS HERE
  const [checkedSwitch, setCheckedSwitch] = React.useState(true);
  const handleSwitchChange = (event) => {
    setCheckedSwitch(event.target.checked);
  };
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
          seoFormik.setFieldValue('metaKeywords',"")
        }
      });
    }
  };

  const handleDelete = (value) => {
    setMultipleTags((prevValues) => prevValues.filter((v) => v !== value));
  };

  function generateUniqueId(name="") {
    
  
    const formattedName = name?.toLowerCase()?.replace(/\s+/g, '-');
    const finalId = `${formattedName}${id}`;
  
    return finalId;
  }

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
                  color: "#c8d8ff",
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
                  name="urlHandle"
                  placeholder="Please enter Url"
                  size="small"
                  value={seoFormik.values.urlHandle}
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

          <div className="col-12 px-0 bg-black-13 border-grey-5 mt-3 rounded-8">
            <div className="d-flex flex-column p-3">
              <p className="text-lightBlue">Metadata Preview</p>
              <small className="text-lightBlue mt-3 mb-2 fw-500">
                {seoFormik.values.title}
              </small>
              <small className="text-blue-2">
                {seoFormik.values.urlHandle}
              </small>
              <small className="mt-2 text-grey-6">
                {seoFormik.values.description}
              </small>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default SEO;
