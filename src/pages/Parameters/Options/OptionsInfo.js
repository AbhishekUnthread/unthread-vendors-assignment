import { useEffect, useCallback, useReducer } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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
} from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import _ from "lodash";

import AddCustomField from "../../../components/AddCustomField/AddCustomField";
import AddCustomFieldTable from "../../../components/AddCustomField/AddCustomFieldTable";
import InfoHeader from "../../../components/Header/InfoHeader";
import { UploadMediaSmall } from "../../../components/UploadMediaBox/UploadMedia";
import { SaveFooterSecondary } from "../../../components/SaveFooter/SaveFooter";
import ConfirmationModal from "../../../components/ConfirmationModal/ConfirmationModal";
import Attribute from "../../../components/Options/Attribute/Attribute";

import info from "../../../assets/icons/info.svg";

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

const OptionsInfo = () => {
  return (
    <div className="page container-fluid position-relative user-group product-tab-page">
      <InfoHeader
        title={"Create Options"}
        onBack={() => {}}
        onPrev={() => {}}
        onNext={() => {}}
        isEdit={false}
      />
      <form className="product-form" noValidate onSubmit={() => {}}>
        <div className="row mt-3">
          <div className="col-lg-9 mt-3">
            <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes">
              <div className="col-md-12 px-0 d-flex">
                <Grid container spacing={2}>
                  <Grid item md={12}>
                    <Grid container spacing={2}>
                      <Grid item md={6}>
                        <div className="d-flex mb-1">
                          <label className="small text-lightBlue me-2">
                            Option Name
                          </label>
                          <Tooltip title="Lorem ipsum" placement="top">
                            <img
                              src={info}
                              alt="info"
                              className=" c-pointer"
                              width={13.5}
                            />
                          </Tooltip>
                        </div>
                        <FormControl className="w-100 px-0">
                          <OutlinedInput
                            size="small"
                            sx={{ paddingLeft: 0 }}
                            name="title"
                          />
                        </FormControl>
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
                            />
                          }
                          label="Include in Filters"
                          sx={{
                            "& .MuiTypography-root": {
                              fontSize: "0.7rem",
                              color: "#c8d8ff",
                            },
                          }}
                          className=" px-0"
                        ></FormControlLabel>
                      </Grid>
                      <Grid item md={6}>
                        <div className="d-flex mb-1">
                          <label className="small text-lightBlue me-2">
                            Frontend Name
                          </label>
                          <Tooltip title="Lorem ipsum" placement="top">
                            <img
                              src={info}
                              alt="info"
                              className=" c-pointer"
                              width={13.5}
                            />
                          </Tooltip>
                        </div>
                        <FormControl className="w-100 px-0">
                          <OutlinedInput
                            size="small"
                            sx={{ paddingLeft: 0 }}
                            name="title"
                          />
                        </FormControl>
                        <FormHelperText>
                          Customer will see this on frontend
                        </FormHelperText>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item md={12}>
                    <div className="d-flex  mb-1">
                      <p className="text-lightBlue me-2">Frontend Appearance</p>
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
                      <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        size="small"
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
                </Grid>
              </div>
            </div>
          </div>
        </div>
        <SaveFooterSecondary
          show={true}
          onDiscard={() => {}}
          isLoading={false}
        />
      </form>
    </div>
  );
};

export default OptionsInfo;
