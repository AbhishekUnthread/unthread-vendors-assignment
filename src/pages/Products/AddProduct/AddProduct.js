import React from "react";
import "./AddProduct.scss";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// ! COMPONENT IMPORTS
import ProductInfo from "./ProductInfo/ProductInfo";
import MoreFeatures from "./MoreFeatures/MoreFeatures";
import SEO from "./SEO/SEO";
import Shipping from "./Shipping/Shipping";
import Variants from "./Variants/Variants";
import Options from "./Options/Options";
import Attributes from "./Attributes/Attributes";
import AppReactImageGallery from "../../../components/AppReactImageGallery/AppReactImageGallery";
// ! IMAGES IMPORTS
import arrowLeft from "../../../assets/icons/arrowLeft.svg";
import info from "../../../assets/icons/info.svg";
import paginationRight from "../../../assets/icons/paginationRight.svg";
import paginationLeft from "../../../assets/icons/paginationLeft.svg";
import gold from "../../../assets/images/products/gold.svg";
import silver from "../../../assets/images/products/silver.svg";
import platinum from "../../../assets/images/products/platinum.svg";
// ! MATERIAL IMPORTS
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Tab,
  Tabs,
  Tooltip,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";

// ? TABS STARTS HERE
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
// ? TABS ENDS HERE

const AddProduct = () => {
  const [value, setValue] = React.useState(0);
  const productInfo = useSelector(state=> state.product.product)

  // ? TABS STARTS HERE
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleTabChange = () => {
    value < 6 && setValue(value + 1);
  };

  function getIcon(isDone) {
    if (isDone) {
        return <DoneIcon sx={{ color: "#1AD598", fontSize: 20 }} />;
    } else {
        return <CloseIcon sx={{ color: "#EA3A3D", fontSize: 20 }} />;
    }
}

  // ? TABS ENDS HERE

  // ? SIZE SELECT STARTS HERE
  const [size, setSize] = React.useState("");
  // const [metal, setMetal] = React.useState("");
  // const [diamond, setDiamond] = React.useState("");

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };
  // ? SIZE SELECT ENDS HERE

  // const handleMetalChange = (e) => {
  //   // const newData = e.target.value;
  //   // console.log(e.target.value);
  //   if (e.target.value) {
  //     setMetal(e.target.value);
  //     var elems = document
  //       .querySelector(".metal-radio")
  //       .querySelectorAll(".MuiFormControlLabel-root.active");
  //     [].forEach.call(elems, function (el) {
  //       el.classList.remove("active");
  //     });
  //     e.target.closest("label").classList.toggle("active");
  //   }
  // };

  // const handleDiamondChange = (e) => {
  //   if (e.target.value) {
  //     setMetal(e.target.value);
  //     var elems = document
  //       .querySelector(".diamond-radio")
  //       .querySelectorAll(".MuiFormControlLabel-root.active");
  //     [].forEach.call(elems, function (el) {
  //       el.classList.remove("active");
  //     });
  //     e.target.closest("label").classList.toggle("active");
  //   }
  // };

  return (
    <div className="page container-fluid position-relative">
      <div className="row justify-content-between">
        <div className="d-flex align-items-center w-auto ps-0">
          <Link to="/products/allProducts" className="d-flex">
            <img
              src={arrowLeft}
              alt="arrowLeft"
              width={9}
              className="c-pointer"
            />
          </Link>

          <h5 className="page-heading ms-2 ps-1">Add Product</h5>
        </div>
        <div className="d-flex align-items-center w-auto pe-0">
          <button className="button-transparent me-1 py-2 px-3">
            <p className="text-lightBlue">Duplicate</p>
          </button>
          <button className="button-transparent me-1 py-2 px-3">
            <p className="text-lightBlue">Preview</p>
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
        <div className="col-lg-9 mt-3">
          <div className="row flex-column mb-2">
            <Box
              sx={{ width: "100%" }}
              className="d-flex justify-content-between tabs-header-box mb-4"
            >
              {/* variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile */}
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="scrollable force tabs example"
                className="tabs"
              >
                <Tab label="Product Info" className="tabs-head" />
                <Tab label="Attributes" className="tabs-head" />
                <Tab label="Options" className="tabs-head" />
                <Tab label="Variants" className="tabs-head" />
                <Tab label="Shipping" className="tabs-head" />
                <Tab label="SEO" className="tabs-head" />
                <Tab label="More Features" className="tabs-head" />
              </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
              <ProductInfo />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Attributes />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Options />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <Variants />
            </TabPanel>
            <TabPanel value={value} index={4}>
              <Shipping />
            </TabPanel>
            <TabPanel value={value} index={5}>
              <SEO />
            </TabPanel>
            <TabPanel value={value} index={6}>
              <MoreFeatures />
            </TabPanel>
          </div>
        </div>
        <div className="col-lg-3 mt-3 pe-0 ps-0 ps-lg-3">
          <div className="bg-black-15 border-grey-5 rounded-8 p-3">
            <h6 className="text-grey-6 mb-3">Preview:</h6>
            <AppReactImageGallery />
            <p className="mt-3 text-lightBlue">{productInfo?.title}</p>
            <small className="text-grey-6 my-2">
              SKU123456&nbsp;|&nbsp;JWLellers
            </small>
            <div>
              <small className="text-grey-6">Diamond Ring</small>
            </div>
            <div className="d-flex my-4 flex-wrap">
              <h6 className="text-lightBlue">₹ {productInfo?.price?.price}</h6>
              <small className="ms-2 me-3 text-grey-6 ">
                <s>₹ {productInfo?.price?.price}</s>
              </small>
              <small className="text-lightBlue">{productInfo?.price?.discount}%&nbsp;OFF</small>
            </div>
            <p className="text-lightBlue mb-2">Size:</p>
            <FormControl
              sx={{ m: 0, minWidth: 120, width: "100%" }}
              size="small"
            >
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={size}
                onChange={handleSizeChange}
                size="small"
              >
                <MenuItem value="" sx={{ fontSize: 13, color: "#5c6d8e" }}>
                  None
                </MenuItem>
                <MenuItem value={10} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                  S
                </MenuItem>
                <MenuItem value={20} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                  M
                </MenuItem>
                <MenuItem value={30} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                  L
                </MenuItem>
                <MenuItem value={40} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                  XL
                </MenuItem>
              </Select>
            </FormControl>
            <p className="text-lightBlue mt-3">Metal</p>
            {/* <FormControl className="mt-2 custom-radio-buttons metal-radio">
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={productMetal.name}
                name="radio-buttons-group"
                row
              >
                {productMetal.map((e, index) => (
                  <FormControlLabel
                    value={e.name}
                    control={<Radio size="small" />}
                    label={e.name}
                    className={`mb-2 custom-radio${index} radio-buttons`}
                    onChange={(e) => {
                      handleMetalChange(e);
                    }}
                    key={index}
                  />
                ))}
              </RadioGroup>
            </FormControl> */}
            <div className="d-flex align-items-center flex-wrap">
              <div className="d-flex border-grey-5 py-1 px-2 mt-2 rounded-3 me-2">
                <img src={gold} alt="gold" width={15} />
                <small className="text-grey-6 ms-2">Gold</small>
              </div>
              <div className="d-flex border-grey-5 py-1 px-2 mt-2 rounded-3 me-2">
                <img src={silver} alt="silver" width={15} />
                <small className="text-grey-6 ms-2">Silver</small>
              </div>
              <div className="d-flex border-grey-5 py-1 px-2 mt-2 rounded-3 me-2">
                <img src={platinum} alt="platinum" width={15} />
                <small className="text-grey-6 ms-2">Platinum</small>
              </div>
            </div>
            <p className="text-lightBlue mt-3">Diamond</p>
            <div className="d-flex align-items-center flex-wrap">
              <div className="d-flex border-grey-5 py-1 px-2 rounded-3 me-2 mt-2">
                <small className="text-grey-6">IJ-SI</small>
              </div>
              <div className="d-flex border-grey-5 py-1 px-2 rounded-3 me-2 mt-2">
                <small className="text-grey-6">JK-VSSI</small>
              </div>
              <div className="d-flex border-grey-5 py-1 px-2 rounded-3 me-2 mt-2">
                <small className="text-grey-6">GH-VSSI</small>
              </div>
              <div className="d-flex border-grey-5 py-1 px-2 rounded-3 me-2 mt-2">
                <small className="text-grey-6">EF-VVS</small>
              </div>
            </div>
            {/* <FormControl className="mt-2 custom-radio-buttons diamond-radio">
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label-diamond"
                defaultValue={productDiamond.name}
                name="radio-buttons-group-diamond"
                row
              >
                {productDiamond.map((e, index) => (
                  <FormControlLabel
                    value={e.name}
                    control={<Radio size="small" />}
                    label={e.name}
                    className={`mb-2 custom-radio${index} radio-buttons`}
                    onChange={(e) => {
                      handleDiamondChange(e);
                    }}
                    key={index}
                  />
                ))}
              </RadioGroup>
            </FormControl> */}
          </div>
          <div className="bg-black-15 border-grey-5 rounded-8 p-3 row mx-0 mt-4">
            <div className="col-12 px-0">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex me-1">
                  <h6 className="text-lightBlue px-0 fw-500 me-2">
                    Product Applicable For
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
                <small className="c-pointer text-blue-2">Edit</small>
              </div>
              <div className="d-flex align-items-center mb-2">
              {getIcon(productInfo?.availableFor?.isReturnable)}
                <p className="text-lightBlue ms-2">Returnable</p>
              </div>
              <div className="d-flex align-items-center mb-2">
              {getIcon(productInfo?.availableFor?.isCod)}
                <p className="text-lightBlue ms-2">COD</p>
              </div>
              <div className="d-flex align-items-center mb-2">
              {getIcon(productInfo?.availableFor?.isLifeTimeExchange)}
                <p className="text-lightBlue ms-2">Lifetime Exchange</p>
              </div>
              <div className="d-flex align-items-center mb-2">
              {getIcon(productInfo?.availableFor?.isLifeTimeBuyBack)}
                <p className="text-lightBlue ms-2">Lifetime Buyback</p>
              </div>
              <div className="d-flex align-items-center mb-2">
              {getIcon(productInfo?.availableFor?.isNextDayShipping)}
                <p className="text-lightBlue ms-2">Next Day Shipping</p>
              </div>
              <div className="d-flex align-items-center mb-2">
              {getIcon(productInfo?.availableFor?.isTryOn)}
                <p className="text-lightBlue ms-2">Enable Try On</p>
              </div>
              <div className="d-flex align-items-center mb-2">
              {getIcon(productInfo?.availableFor?.isViewSimilarItem)}
                <p className="text-lightBlue ms-2">
                  Enable to View Similar Items
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default AddProduct;
