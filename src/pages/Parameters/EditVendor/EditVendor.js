import React, { useEffect, useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

// ! COMPONENT IMPORTS
import NotesBox from "../../../components/NotesBox/NotesBox";
import StatusBox from "../../../components/StatusBox/StatusBox";
import AddProducts from "../../../components/AddProducts/AddProducts";
import {
  useGetAllVendorsQuery,
  useEditVendorMutation,
} from "../../../features/parameters/vendors/vendorsApiSlice";
import {
  showError,
  showSuccess,
} from "../../../features/snackbar/snackbarAction";
import { SaveFooterTertiary } from "../../../components/SaveFooter/SaveFooter";
import { DiscardModalSecondary } from "../../../components/Discard/DiscardModal";
import InfoHeader from "../../../components/Header/InfoHeader";
import "./EditVendor.scss";

// ! ASSETS IMPORTS
import info from "../../../assets/icons/info.svg";

// ! MATERIAL IMPORTS
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  OutlinedInput,
  Tooltip,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import _ from "lodash";

const EditVendor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { id, filter } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [decodedObject, setDecodedObject] = useState(null);

  return (
    <div
      className="page container-fluid position-relative user-group"
      style={{ display: "grid", gridTemplateRows: "auto 1fr" }}
    >
      <InfoHeader
        title={"Edit Vendor"}
        onBack={() => {}}
        onPrev={() => {}}
        onNext={() => {}}
        isEdit={!!id}
      />
      <form
        className="vendor-form"
        style={{ display: "grid", gridTemplateRows: "1fr auto" }}
      >
        <div className="row mt-3" style={{ marginBottom: "80px" }}>
          <div className="col-lg-9 mt-3">
            <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes">
              <div className="col-md-12 px-0">
                <div className="d-flex mb-1">
                  <p className="text-lightBlue me-2">Name</p>
                  <Tooltip title="Enter Name" placement="top">
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
                    placeholder="Enter Vendor Name"
                    name="name"
                    autoFocus={true}
                  />
                </FormControl>

                <div className="small">
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="filter"
                        // onBlur={formik.handleBlur}
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
                        fontSize: "0.875rem",
                        color: "#c8d8ff",
                      },
                    }}
                    className=" px-0 me-1"
                  />
                  <span className="text-blue-2 c-pointer">(manage)</span>
                </div>
              </div>
            </div>

            <div className="bg-black-9 border-grey-5 rounded-8 p-3 row features mt-4">
              <div className="d-flex justify-content-between mb-2 px-0">
                <h6 className="text-lightBlue me-auto text-lightBlue col-auto ps-0 fw-500">
                  Add Products
                </h6>
              </div>
              <AddProducts />
            </div>
          </div>
          <div className="col-lg-3 mt-3 pe-0 ps-0 ps-lg-3">
            <StatusBox
              headingName={"Status"}
              toggleData={["active", "in-active"]}
            />
            <NotesBox name="notes" />
          </div>
        </div>
        <SaveFooterTertiary
          show={true}
          onDiscard={() => {}}
          isLoading={false}
        />
        <DiscardModalSecondary when={false} message="vendor tab" />
      </form>
    </div>
  );
};

export default EditVendor;
