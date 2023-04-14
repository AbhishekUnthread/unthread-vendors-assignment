import React from "react";
import { Link } from "react-router-dom";
// ! IMAGES IMPORTS
import arrowLeft from "../../../assets/icons/arrowLeft.svg";
import info from "../../../assets/icons/info.svg";
// ! MATERIAL IMPORTS
import { TextareaAutosize } from "@mui/base";
// ! COMPONENT IMPORTS
import OrderCartDetails from "../OrderCartDetails";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  Tooltip,
} from "@mui/material";

const CreateReturn = () => {
  // ? CHECKBOX STARTS HERE
  const [checked, setChecked] = React.useState(false);

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };
  // ? CHECKBOX ENDS HERE

  // ? USER ROLE SELECT STARTS HERE
  const [refundVia, setRefundVia] = React.useState("");

  const handleRefundVia = (event) => {
    setRefundVia(event.target.value);
  };
  // ? USER ROLE SELECT ENDS HERE

  return (
    <div className="page container-fluid position-relative user-group">
      <div className="row justify-content-between">
        <div className="d-flex align-items-center w-auto ps-0">
          <Link to="/orders/returnRefunds" className="d-flex">
            <img
              src={arrowLeft}
              alt="arrowLeft"
              width={9}
              className="c-pointer"
            />
          </Link>

          <div className="d-flex align-items-center ms-2">
            {/* <img
              src={rolesSuperAdmin}
              alt="role"
              className="me-2 ms-2"
              height={40}
              width={40}
            /> */}
            <div>
              <h5 className="text-lightBlue fw-500">Create Return</h5>
              <small className="mt-2 text-blue-2">#12345</small>
            </div>
          </div>
        </div>

        <div className="d-flex align-items-center w-auto pe-0">
          <button className="button-red-outline py-2 px-4">
            <p className="">Cancel</p>
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-9">
          <OrderCartDetails
            showCartButton={false}
            showEditButton={false}
            showBasicDetail={true}
            showItemAvailable={false}
            showActionButton={false}
            showFulfillButton={false}
            showResolveButton={false}
            showQCButton={false}
            showTrackingBox={false}
            showReturnButton={false}
            showExchangeButton={false}
            showCreateLabelButton={false}
            showCreateExchangeButton={false}
            showRefundAmountButton={false}
            showCustomerNote={false}
            showMadeOrderChip={true}
            showOrderID={false}
            showNoOfItems={true}
            showDetails={false}
            showRestocking={false}
            showConfirm={false}
            showSelectCheckbox={true}
          />

          <div className="bg-black-15 border-grey-5 rounded-8 p-3 mt-4 row">
            <div className="d-flex justify-content-between align-items-center col-12 px-0">
              <h6 className="text-lightBlue fw-500">Refunding Reason</h6>
            </div>
            <div className="d-flex justify-content-center col-12 px-0">
              <hr className="hr-grey-6 w-100 my-3 " />
            </div>
            <TextareaAutosize
              aria-label="meta description"
              placeholder="Type Something"
              style={{
                background: "#15142A",
                color: "#c8d8ff",
                borderRadius: 5,
              }}
              minRows={3}
              className="col-12"
            />
            <small className="mt-1 text-grey-6 font1 col-12 px-0 d-block">
              Note: Internal Purpose only, User can't see this
            </small>
          </div>

          <div className="bg-black-15 border-grey-5 rounded-8 p-3 mt-4 row">
            <div className="d-flex justify-content-between align-items-center col-12 px-0">
              <h6 className="text-lightBlue fw-500">Refund Amount</h6>
            </div>
            <div className="d-flex justify-content-center col-12 px-0">
              <hr className="hr-grey-6 w-100 my-0 mt-3" />
            </div>
            <div className=" col-md-6 mt-2 mb-1 ps-3 ps-md-0">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <p className="text-lightBlue">Enter Amount</p>
                  <Tooltip title="Lorem ipsum" placement="top">
                    <img
                      src={info}
                      alt="info"
                      className="ms-2 c-pointer"
                      width={13.5}
                    />
                  </Tooltip>
                </div>

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
                        width: "auto",
                      }}
                    />
                  }
                  label="Pay whole Amount"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: "0.75rem",
                      color: "#c8d8ff",
                      // maxWidth: "320px",
                    },
                  }}
                  className="px-0 me-0"
                />
              </div>

              <FormControl className="w-100 px-0">
                <OutlinedInput
                  placeholder="Enter Value"
                  size="small"
                  startAdornment={
                    <InputAdornment position="start">
                      <p className="text-lightBlue">₹</p>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <small className="mt-1 text-grey-6 font1 col-12 px-0 d-block">
                Total amount available to refund&nbsp;=&nbsp;₹&nbsp;45,000
              </small>
            </div>
            <div className=" col-md-6 mt-3 mb-1 pe-3 pe-md-0">
              <div
                className="d-flex align-items-center"
                style={{ marginBottom: "9px" }}
              >
                <p className="text-lightBlue">Refund Via</p>
                <Tooltip title="Lorem ipsum" placement="top">
                  <img
                    src={info}
                    alt="info"
                    className="ms-2 c-pointer"
                    width={13.5}
                  />
                </Tooltip>
              </div>

              <FormControl
                sx={{ m: 0, minWidth: 120, width: "100%" }}
                size="small"
              >
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={refundVia}
                  onChange={handleRefundVia}
                  size="small"
                >
                  <MenuItem value="" sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    None
                  </MenuItem>
                  <MenuItem value={10} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    Refund via Original Payment Mode
                  </MenuItem>
                  <MenuItem value={20} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    Refund to Store Credit
                  </MenuItem>
                  <MenuItem value={30} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    Refund via Paypal
                  </MenuItem>
                  <MenuItem value={40} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    Refund via Cash
                  </MenuItem>
                  <MenuItem value={50} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    Credit coupon code
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="d-flex col-md-6"></div>

            <div className="d-flex align-items-center  px-0 mt-3 mb-1">
              <p className="text-lightBlue"> Note for Customer</p>
              <Tooltip title="Lorem ipsum" placement="top">
                <img
                  src={info}
                  alt="info"
                  className="ms-2 c-pointer"
                  width={13.5}
                />
              </Tooltip>
            </div>
            <TextareaAutosize
              aria-label="meta description"
              placeholder="Type Something"
              style={{
                background: "#15142A",
                color: "#c8d8ff",
                borderRadius: 5,
              }}
              minRows={3}
              className="col-12 px-md-0 "
            />
            <small className="mt-1 text-grey-6 font1 col-12 px-0 d-block mb-0">
              Note: Internal Purpose only, User can't see this
            </small>
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
                    width: "auto",
                  }}
                />
              }
              label="Send notification to customer"
              sx={{
                "& .MuiTypography-root": {
                  fontSize: "0.75rem",
                  color: "#c8d8ff",
                  // maxWidth: "320px",
                },
              }}
              className="px-0 mb-3 mt-3"
            />
            <button className="button-gradient py-2 px-4 w-auto">
              <p>Refund&nbsp;₹&nbsp;90,000</p>
            </button>
          </div>
        </div>

        <div className="col-lg-3 pe-0 ps-0 ps-lg-3">
          <div className="bg-black-15 border-grey-5 rounded-8 p-3 mt-4">
            <h6 className="text-grey-6">Returning</h6>

            <div className="d-flex justify-content-center col-12 px-0">
              <hr className="hr-grey-6 w-100 my-3" />
            </div>

            {/* <div className="d-flex justify-content-between mt-2"> */}
            <p className="text-lightBlue d-block mb-2">
              The Fringe Diamond Ring
            </p>
            <p className="text-lightBlue d-block mb-2">Qty:&nbsp;1</p>
            <small className="text-grey-6 d-block">
              Product from Karol Bagh, Delhi
            </small>

            <div className="d-flex justify-content-center col-12 px-0">
              <hr className="hr-grey-6 w-100 my-3" />
            </div>
            <button className="button-gradient w-100 py-2 px-3">
              <p>Return&nbsp;1&nbsp;Item</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateReturn;
