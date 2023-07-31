import { useState } from "react";
import "./PriceMaster.scss";
// ! COMPONENT IMPORTS
import RingStones from "./RingStones";
// ! IMAGES IMPORTS
import label from "../../../../assets/images/products/label.svg";
import info from "../../../../assets/icons/info.svg";
// ! MATERIAL IMPORTS
import {
  MenuItem,
  OutlinedInput,
  Select,
  Tooltip,
  FormControlLabel,
  Checkbox,
  Button,
  InputAdornment,
} from "@mui/material";
// ! MATERIAL ICONS IMPORTS

const PriceMaster = () => {
  const [showPriceBreakup, setShowPriceBreakup] = useState(true);

  return (
    <>
      <div className="bg-black-15 border-grey-5 rounded-8 p-3 mb-3 row price-master">
        <div className="d-flex col-12 px-0 justify-content-between align-items-center">
          <div className="d-flex flex-column">
            <div className="d-flex align-items-center">
              <h6 className="text-lightBlue fw-500 me-2">Price</h6>

              <Tooltip title="Lorem ipsum" placement="top">
                <img src={info} alt="info" className="c-pointer" width={13.5} />
              </Tooltip>
            </div>

            <small className="text-grey-6 mt-2">
              Price are coming from price master data
              <span className="text-blue-2">(Edit Price Master)</span>
            </small>
          </div>

          <div className="d-flex">
            <FormControlLabel
              control={
                <Checkbox
                  checked={showPriceBreakup}
                  onChange={(e) => setShowPriceBreakup(e.target.checked)}
                  color="primary"
                  sx={{ borderRadius: "50%" }}
                />
              }
              label="Show Price Breakup"
            />
          </div>
        </div>

        <hr className="hr-grey-6 mt-3 mb-3" />

        <div className="col-12">
          <div className="row py-3 border-grey-5 rounded-8 align-items-center bg-black-13 mt-3">
            <div className="row pt-2 pb-4">
              <div className="col-10">
                <span className="text-lightBlue">
                  Total Price (<span className="text-blue-1">Default:</span>
                  <span className="text-grey-6">
                    {" "}
                    12 . Gold . Yellow . 18KT . IJSI -
                    <span className="text-blue-2">change</span>{" "}
                  </span>
                  )
                </span>
              </div>

              <div className="col-2 text-right">
                <span className="text-blue-1">Rs 20,600</span>
              </div>
            </div>

            <div className="row py-1">
              <div className="col-10">
                <span className="text-grey-6">Metal Price</span>
              </div>

              <div className="col-2 text-right">
                <span className="text-grey-6">Rs 15,000</span>
              </div>
            </div>

            <div className="row py-1">
              <div className="col-10">
                <span className="text-grey-6">Diamond Price</span>
              </div>

              <div className="col-2 text-right">
                <span className="text-grey-6">Rs 4,000</span>
              </div>
            </div>

            <div className="row py-1">
              <div className="col-10">
                <span className="text-grey-6">Making Charges</span>
              </div>

              <div className="col-2 text-right">
                <span className="text-grey-6">Rs 1,000</span>
              </div>
            </div>

            <div className="row py-1">
              <div className="col-10">
                <span className="text-grey-6">GST</span>
              </div>

              <div className="col-2 text-right">
                <span className="text-grey-6">Rs 600</span>
              </div>
            </div>

            <div className="row pt-4 pb-1">
              <div className="col-9 d-flex align-items-baseline">
                <h6 className="text-lightBlue fw-400 me-2">Select Discounts</h6>

                <Tooltip title="Lorem ipsum" placement="top">
                  <img
                    src={info}
                    alt="info"
                    className="c-pointer"
                    width={13.5}
                  />
                </Tooltip>
              </div>

              <div className="col-3 d-flex align-items-baseline">
                <h6 className="text-lightBlue fw-400 me-2">Sale Price</h6>

                <Tooltip title="Lorem ipsum" placement="top">
                  <img
                    src={info}
                    alt="info"
                    className="c-pointer"
                    width={13.5}
                  />
                </Tooltip>
              </div>
            </div>

            <div className="row pt-1 pb-2">
              <div className="col-4 d-flex align-items-baseline">
                <Select defaultValue={20} className="w-100" size="small">
                  <MenuItem value={5}>5 %</MenuItem>

                  <MenuItem value={10}>10 %</MenuItem>

                  <MenuItem value={15}>15 %</MenuItem>

                  <MenuItem value={20}>20 %</MenuItem>

                  <MenuItem value={50}>50 %</MenuItem>

                  <MenuItem value={90}>90 %</MenuItem>

                  <MenuItem value={95}>95 %</MenuItem>
                </Select>
              </div>

              <div className="col-1 d-flex justify-content-center align-items-center">
                <span className="text-lightBlue fw-400">on</span>
              </div>

              <div className="col-4 d-flex align-items-baseline">
                <Select
                  defaultValue={"Making Charges"}
                  className="w-100"
                  size="small"
                >
                  <MenuItem value={"Metal Price"}>Metal Price</MenuItem>

                  <MenuItem value={"Diamond Price"}>Diamond Price</MenuItem>

                  <MenuItem value={"Making Charges"}>Making Charges</MenuItem>

                  <MenuItem value={"Total Price"}>Total Price</MenuItem>
                </Select>
              </div>

              <div className="col-3 d-flex align-items-baseline">
                <OutlinedInput placeholder="Sale Price" size="small" disabled />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black-15 border-grey-5 rounded-8 p-3 mb-3 row price-master">
        <div className="d-flex col-12 px-0 justify-content-between align-items-center">
          <div className="d-flex flex-column">
            <div className="d-flex align-items-center">
              <h6 className="text-lightBlue fw-500 me-2">Price Master Data</h6>

              <Tooltip title="Lorem ipsum" placement="top">
                <img src={info} alt="info" className="c-pointer" width={13.5} />
              </Tooltip>
            </div>

            <small className="text-grey-6 mt-2">
              Enter all the data related to jewelery product
            </small>
          </div>

          <div className="d-flex">
            <Button variant="text">
              <span className="text-blue-2">View Price Master</span>
            </Button>
          </div>
        </div>

        <hr className="hr-grey-6 mt-3 mb-3" />

        <div className="col-12">
          <div className="row py-3 border-grey-5 rounded-8 align-items-center bg-black-13 mt-3">
            <div className="row pt-2 pb-4">
              <div className="col-12 d-flex align-items-center">
                <img src={label} alt="label" width={50} />

                <h6 className="text-lightBlue fw-500 me-2">
                  Metal Information
                </h6>

                <Tooltip title="Lorem ipsum" placement="top">
                  <img
                    src={info}
                    alt="info"
                    className="c-pointer"
                    width={13.5}
                  />
                </Tooltip>
              </div>
            </div>

            <div className="row py-2">
              <div className="col-6">
                <p className="text-lightBlue mb-2">Metal Weight</p>

                <OutlinedInput
                  className="w-100"
                  placeholder="Enter Weight"
                  size="medium"
                  endAdornment={
                    <InputAdornment position="end">gms</InputAdornment>
                  }
                />
              </div>

              <div className="col-6">
                <p className="text-lightBlue mb-2">Gross / Net Weight</p>

                <OutlinedInput
                  className="w-100"
                  placeholder="Enter Weight"
                  size="medium"
                  endAdornment={
                    <InputAdornment position="end">gms</InputAdornment>
                  }
                />
              </div>
            </div>
          </div>

          {/* Diamond Section */}
          <RingStones icon={label} stone={"Diamond"} />

          {/* Gemstone Section */}
          <RingStones icon={label} stone={"Gemstone"} />

          {/* Pearl Section */}
          <RingStones icon={label} stone={"Pearl"} />
        </div>
      </div>
    </>
  );
};

export default PriceMaster;
