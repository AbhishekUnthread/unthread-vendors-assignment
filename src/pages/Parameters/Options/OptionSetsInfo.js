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
} from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import _ from "lodash";

import InfoHeader from "../../../components/Header/InfoHeader";
import { SaveFooterTertiary } from "../../../components/SaveFooter/SaveFooter";
import { AntSwitch } from "../../../components/AntSwitch/AntSwitch";
import OptionsAttributeTable from "./OptionsAttributeTable";
import { DiscardModalSecondary } from "../../../components/Discard/DiscardModal";
import { DeleteModalSecondary } from "../../../components/DeleteModal/DeleteModal";
import PageLoader from "../../../components/Loader/PageLoader";
import OptionSet from "../../../components/Options/OptionSet/OptionSet";

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

const OptionSetsInfo = () => {
  return (
    <div className="page container-fluid position-relative user-group product-tab-page">
      <InfoHeader
        title="Create Option Sets"
        onBack={() => {}}
        onPrev={() => {}}
        onNext={() => {}}
        isEdit={false}
        hasPrev={0}
        hasNext={0}
      />

      <form className="product-form" noValidate>
        <div className="row mt-3">
          <div className="col-lg-9 mt-3">
            <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes mb-3">
              <div className="col-md-12 px-0 d-flex">
                <Grid container spacing={2}>
                  <Grid item md={6}>
                    <div className="d-flex mb-1">
                      <label className="small text-lightBlue me-2">
                        Enter Shared options Title
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
                        name="option.frontEndTitle"
                      />
                    </FormControl>
                  </Grid>

                  <Grid item md={6}>
                    <div>
                      <div className="d-flex  mb-1">
                        <p className="text-lightBlue me-2">
                          Apply to{" "}
                          <span style={{ color: "#5c6d8e" }}>(optional)</span>
                        </p>
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
                          name="option.apperance"
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
                    </div>
                  </Grid>
                </Grid>
              </div>
            </div>

            <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes">
              <div className="col-md-12 px-0 d-flex">
                <Grid container spacing={2}>
                  <Grid item sm={6}>
                    <div className="d-flex mb-1">
                      <label className="text-lightBlue me-2">
                        Make Option Sets
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
                    <FormHelperText>
                      <div className="d-flex mb-1">
                        <Tooltip title="Lorem ipsum" placement="top">
                          <img
                            src={info}
                            alt="info"
                            className=" c-pointer me-1"
                            width={8.5}
                          />
                        </Tooltip>
                        <label className="small">
                          If this product has options, like size or color then
                          add option
                        </label>
                      </div>
                    </FormHelperText>
                  </Grid>
                  <Grid
                    item
                    sm={6}
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <button className="button-gradient py-2 px-4 ms-3 c-pointer">
                      <p>+ Add Options</p>
                    </button>
                  </Grid>
                </Grid>
              </div>
              <OptionSet />
            </div>
          </div>
        </div>

        <SaveFooterTertiary
          show={true}
          onDiscard={() => {}}
          isLoading={false}
        />
      </form>
    </div>
  );
};

export default OptionSetsInfo;
