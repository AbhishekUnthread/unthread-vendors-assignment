import React from "react";
import "./CreateBundleDiscount.scss";
import { Link } from "react-router-dom";
// ! COMPONENT IMPORTS
import AppCountrySelect from "../../../components/AppCountrySelect/AppCountrySelect";
import AppStateSelect from "../../../components/AppStateSelect/AppStateSelect";
import AppMobileCodeSelect from "../../../components/AppMobileCodeSelect/AppMobileCodeSelect";
import UploadMediaBox from "../../../components/UploadMediaBox/UploadMediaBox";
import NotesBox from "../../../components/NotesBox/NotesBox";
import TagsBox from "../../../components/TagsBox/TagsBox";
// ! IMAGES IMPORTS
import arrowLeft from "../../../assets/icons/arrowLeft.svg";
import archivedGrey from "../../../assets/icons/archivedGrey.svg";
import editGrey from "../../../assets/icons/editGrey.svg";
import addUserUpload from "../../../assets/images/users/addUserUpload.svg";
import paginationRight from "../../../assets/icons/paginationRight.svg";
import paginationLeft from "../../../assets/icons/paginationLeft.svg";
import info from "../../../assets/icons/info.svg";
import arrowDown from "../../../assets/icons/arrowDown.svg";
// ! MATERIAL IMPORTS
import {
  FormControl,
  MenuItem,
  Select,
  InputAdornment,
  OutlinedInput,
  Checkbox,
  FormControlLabel,
  Chip,
  TextField,
  Autocomplete,
  Tooltip,
  ToggleButtonGroup,
  ToggleButton,
  RadioGroup,
  Radio,
  Popover,
} from "@mui/material";
import { DesktopDateTimePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// ! MATERIAL ICONS IMPORTS
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import TableSearch from "../../../components/TableSearch/TableSearch";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ProductStatusToggle from "../ProductStatusToggle";
import MaximumDiscountUsers from "../MaximumDiscountUsers";
import ScheduleDiscountCode from "../ScheduleDiscountCode";
import CustomerEligibility from "../CustomerEligibility";
import ReturnAndExchangeCondition from "../ReturnAndExchangeCondition";
import BundleProductDiscount from "../BundleProductDiscount";
import DiscountCombination from "../DiscountCombination";

const CreateBundleDiscount = () => {
  // * DISCOUNT PERCENT POPOVERS STARTS
  const [anchorDiscountPercentEl, setAnchorDiscountPercentEl] =
    React.useState(null);
  const handleDiscountPercent = (event) => {
    setAnchorDiscountPercentEl(event.currentTarget);
  };
  const handleDiscountPercentClose = () => {
    setAnchorDiscountPercentEl(null);
  };
  const openDiscountPercent = Boolean(anchorDiscountPercentEl);
  const idDiscountPercent = openDiscountPercent ? "simple-popover" : undefined;
  // * DICOUNT PERCENT POPOVERS ENDS

  return (
    <div className="page container-fluid position-relative">
      <div className="row justify-content-between">
        <div className="d-flex align-items-center w-auto ps-0">
          <Link to="/offers/bundleDiscount" className="d-flex">
            <img
              src={arrowLeft}
              alt="arrowLeft"
              width={9}
              className="c-pointer"
            />
          </Link>

          <h5 className="page-heading ms-2 ps-1">Create Bundle Discount</h5>
        </div>

        <div className="d-flex align-items-center w-auto pe-0">
          <button className="button-transparent me-1 py-2 px-3">
            <p className="text-lightBlue">Duplicate</p>
          </button>
          <img
            src={paginationLeft}
            alt="paginationLeft"
            className="c-pointer"
            width={30}
          />
          <img
            src={paginationRight}
            alt="paginationRight"
            className="c-pointer"
            width={30}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-9 mt-4">
          <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes">
            <div className="d-flex col-12 px-0 justify-content-between">
              <div className="d-flex align-items-center">
                <h6 className="text-lightBlue me-auto text-lightBlue fw-500">
                  Bundle Name
                </h6>
              </div>
            </div>
            <hr className="hr-grey-6 mt-3 mb-0" />
            <div className="col-12 px-0">
              <div className="row align-items-start">
                <div className="col-md-8 mt-3">
                  <div className="d-flex mb-1">
                    <p className="text-lightBlue">Enter Bundle Name</p>
                    <Tooltip title="Lorem ipsum" placement="top">
                      <img
                        src={info}
                        alt="info"
                        className="ms-2 c-pointer"
                        width={13.5}
                      />
                    </Tooltip>
                  </div>
                  <FormControl className="w-100 px-0">
                    <OutlinedInput
                      placeholder="Enter Bundle Name"
                      size="small"
                    />
                  </FormControl>

                  <small className="mt-1 text-grey-6 font1">
                    Internal use only, custoemr can't see this
                  </small>
                </div>
                <div className="col-md-4 mt-3">
                  <div className="d-flex mb-1">
                    <p className="text-lightBlue">Status</p>
                    <Tooltip title="Lorem ipsum" placement="top">
                      <img
                        src={info}
                        alt="info"
                        className="ms-2 c-pointer"
                        width={13.5}
                      />
                    </Tooltip>
                  </div>
                  <ProductStatusToggle />
                </div>
              </div>
            </div>
          </div>

          <BundleProductDiscount sectionTitle={"Create Bundle"} />
          <BundleProductDiscount sectionTitle={"Display Bundles on"} />

          <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes mt-4">
            <div className="d-flex col-12 px-0 justify-content-between">
              <div className="d-flex align-items-center">
                <h6 className="text-lightBlue me-auto text-lightBlue fw-500">
                  Offer Discount
                </h6>

                <Tooltip title="Lorem ipsum" placement="top">
                  <img
                    src={info}
                    alt="info"
                    className="ms-2 c-pointer"
                    width={13.5}
                  />
                </Tooltip>
              </div>
            </div>
            <hr className="hr-grey-6 my-3 " />
            <div className="col-12 px-0">
              <div className="d-flex mb-1">
                <p className="text-lightBlue">Discount</p>
                <Tooltip title="Lorem ipsum" placement="top">
                  <img
                    src={info}
                    alt="info"
                    className="ms-2 c-pointer"
                    width={13.5}
                  />
                </Tooltip>
              </div>

              <div className="discount-inputs-two">
                <FormControl className="px-0">
                  <OutlinedInput
                    placeholder="Enter Discount"
                    size="small"
                    endAdornment={
                      <InputAdornment
                        position="end"
                        aria-describedby={idDiscountPercent}
                        onClick={handleDiscountPercent}
                        className="c-pointer"
                      >
                        <span className="d-flex align-items-center">
                          <p className="text-lightBlue">Percentage</p>
                          <img src={arrowDown} alt="arrow" className="ms-2" />
                        </span>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <Popover
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  id={idDiscountPercent}
                  open={openDiscountPercent}
                  anchorEl={anchorDiscountPercentEl}
                  onClose={handleDiscountPercentClose}
                >
                  <div className="py-2 px-1">
                    <small className="text-lightBlue rounded-3 p-2 hover-back d-block">
                      Percentage Discount
                    </small>
                    <small className="text-lightBlue rounded-3 p-2 hover-back d-block">
                      Fixed Amount
                    </small>
                  </div>
                </Popover>
              </div>
            </div>
            <hr className="hr-grey-6 my-3 " />
            <div className="col-12 d-flex justify-content-between align-items-center px-0">
              <p className="text-lightBlue">Total Bundle Price</p>
              <div className="d-flex flex-column align-items-end">
                <div className="d-flex">
                  <h5 className="text-lightBlue fw-500">₹ 75,000</h5>
                  <h5 className="text-blue-1 fw-500 ms-3">
                    <s>₹ 1,25,000</s>
                  </h5>
                </div>
                <small className="text-grey-6 mt-2">
                  Save 50% off on buying bundle
                </small>
              </div>
            </div>
          </div>
          <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes mt-4">
            <div className="d-flex col-12 px-0 justify-content-between">
              <div className="d-flex align-items-center">
                <h6 className="text-lightBlue me-auto text-lightBlue fw-500">
                  Customise Frontend Bundle Section
                </h6>
              </div>
            </div>
            <hr className="hr-grey-6 mt-3 mb-0" />
            {/* <div className="col-12 px-0">
              <div className="row align-items-start"> */}
            <div className="col-md-12 mt-3 px-0">
              <div className="d-flex mb-1">
                <p className="text-lightBlue">Enter Bundle Title</p>
                <Tooltip title="Lorem ipsum" placement="top">
                  <img
                    src={info}
                    alt="info"
                    className="ms-2 c-pointer"
                    width={13.5}
                  />
                </Tooltip>
              </div>
              <FormControl className="w-100 px-0">
                <OutlinedInput placeholder="Enter Bundle Title" size="small" />
              </FormControl>

              <small className="mt-1 text-grey-6 font1">
                Customer can see this as section title
              </small>
            </div>
            <div className="col-md-12 mt-3 px-0">
              <div className="d-flex mb-1">
                <p className="text-lightBlue">Enter Subtitle</p>
                <Tooltip title="Lorem ipsum" placement="top">
                  <img
                    src={info}
                    alt="info"
                    className="ms-2 c-pointer"
                    width={13.5}
                  />
                </Tooltip>
              </div>
              <FormControl className="w-100 px-0">
                <OutlinedInput
                  placeholder="Enter Bundle Subt text"
                  size="small"
                />
              </FormControl>

              <small className="mt-1 text-grey-6 font1">
                Customer can see this as section subtitle
              </small>
            </div>
          </div>

          <ReturnAndExchangeCondition
            sectionHeading={"Return & Exchange Condition"}
          />
          <CustomerEligibility />
          <MaximumDiscountUsers />
          <DiscountCombination showBuy={false} showBulk={false} />
          <ScheduleDiscountCode />
        </div>
        {/* <div className="col-lg-3 mt-4 pe-0 ps-0 ps-lg-3">
          <div className="bg-black-15 border-grey-5 rounded-8 p-3">
            <small className="text-grey-6">Summary</small>
            <p className="text-blue-1 mt-3">Discount Code</p>
            <div className="d-flex align-items-center mt-1">
              <h5 className="fw-600 me-2 text-lightBlue">JWL20OFF</h5>
              <ContentCopyIcon
                sx={{
                  color: "#5c6d8e",
                  fontSize: 12,
                  cursor: "pointer",
                }}
              />
            </div>
            <hr className="hr-grey-6 my-3" />
            <p className="text-lightBlue">Types and Method</p>
            <small className="text-blue-1 fw-500 d-block mt-2">
              • Code&nbsp;&nbsp;|&nbsp;&nbsp;Discount Promo
            </small>
            <small className="text-blue-1 fw-500 d-block mt-1">
              • Amount off Order
            </small>
            <hr className="hr-grey-6 my-2" />
            <p className="text-lightBlue">Details</p>
            <div className="d-flex mt-1 flex-column">
              <small className="text-blue-1 fw-500 ps-2 d-block mt-1">
                • 20% off all Orders
              </small>
              <small className="text-blue-1 fw-500 ps-2 d-block mt-1">
                • Applies to single products
              </small>
              <small className="text-blue-1 fw-500 ps-2 d-block mt-1">
                • All Custoemrs
              </small>
              <small className="text-blue-1 fw-500 ps-2 d-block mt-1">
                • Unlimited Users
              </small>
              <small className="text-blue-1 fw-500 ps-2 d-block mt-1">
                • Activated Tomorrow
              </small>
            </div>
          </div>
        </div> */}

        <div className="col-lg-3 mt-4 pe-0 ps-0 ps-lg-3">
          <div className="bg-black-15 border-grey-5 rounded-8 p-3">
            <small className="text-grey-6">Summary</small>
            <div className="d-flex align-items-center mt-1">
              <h6 className="text-lightBlue fw-500">"Discount Name"</h6>
              <div className="rounded-pill d-flex table-status px-2 py-1 c-pointer ms-3">
                <small className="text-black fw-400">Active</small>
              </div>
            </div>

            <hr className="hr-grey-6 my-3" />
            <small className="text-grey-6">Product Discount</small>
            <div className="d-flex align-items-center mt-1">
              <small className="text-blue-1 fw-500">• Code&nbsp;&nbsp;|</small>
              <h6 className="fw-500 ms-2 me-2 text-lightBlue">JWL20OFF</h6>

              <Tooltip title="Copy" placement="top">
                <ContentCopyIcon
                  sx={{
                    color: "#5c6d8e",
                    fontSize: 12,
                    cursor: "pointer",
                  }}
                />
              </Tooltip>
            </div>

            <hr className="hr-grey-6 my-3" />
            <p className="text-lightBlue">Filters</p>
            <div className="d-flex align-items-center mt-1">
              <small className="text-blue-1 fw-500">
                • Discount applies to Categroy equals to Ring, Earring, Necklace
              </small>
            </div>
            <hr className="hr-grey-6 my-3" />
            <p className="text-lightBlue">Discount</p>
            <div className="d-flex align-items-center mt-1">
              <small className="text-blue-1 fw-500">
                • 50% off on Making charges
              </small>
            </div>
            <hr className="hr-grey-6 my-3" />
            <p className="text-lightBlue">Condition</p>
            <div className="d-flex mt-1 flex-column">
              <small className="text-blue-1 fw-500 d-block">
                Apply Discount only if
              </small>
              <small className="text-blue-1 fw-500 ps-2 d-block mt-1">
                • Order Amount is equal to ₹ 25,000
              </small>
              <small className="text-blue-1 fw-500 ps-2 d-block mt-1">
                • Quantity is equal to 2
              </small>
            </div>
            <hr className="hr-grey-6 my-3" />
            <p className="text-lightBlue">Details</p>
            <div className="d-flex mt-1 flex-column">
              <small className="text-blue-1 fw-500 d-block">
                Returns & Exchange not allowed
              </small>
              <small className="text-blue-1 fw-500 ps-2 d-block mt-1">
                • Unlimited uses
              </small>
              <small className="text-blue-1 fw-500 ps-2 d-block mt-1">
                • Activated tomorrow
              </small>
            </div>
          </div>
        </div>
      </div>

      <div className="row bottom-buttons pt-5 pb-3 justify-content-between">
        <div className="d-flex w-auto px-0">
          <Link
            to="/offers/bundleDiscount"
            className="button-red-outline py-2 px-4"
          >
            <p>Discard</p>
          </Link>
          {/* 
          <Link
            to="/offers/discounts"
            className="button-lightBlue-outline py-2 px-4 ms-3"
          >
            <p>Save as Draft</p>
          </Link> */}
        </div>
        <div className="d-flex w-auto px-0">
          <Link
            to="/offers/bundleDiscount"
            className="button-lightBlue-outline py-2 px-4 ms-3"
          >
            <p>Save & Add Another</p>
          </Link>
          <Link
            to="/offers/bundleDiscount"
            className="button-gradient py-2 px-4 w-auto ms-3"
          >
            <p>Save</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateBundleDiscount;
