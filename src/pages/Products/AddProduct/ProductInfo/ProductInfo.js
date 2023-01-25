import React, { useMemo } from "react";
import "./ProductInfo.scss";
import AppTextEditor from "../../../../components/AppTextEditor/AppTextEditor";
import { useDropzone } from "react-dropzone";
// ! IMAGES IMPORTS
import info from "../../../../assets/icons/info.svg";
import productInfoMedia1 from "../../../../assets/images/products/productInfoMedia1.svg";
import productInfoMedia2 from "../../../../assets/images/products/productInfoMedia2.svg";
// ! MATERIAL IMPORTS
import {
  Autocomplete,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
// ! MATERIAL ICONS IMPORTS
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

// ? FILE UPLOAD STARTS HERE
const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "0",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#5C6D8E",
  borderStyle: "dashed",
  //   backgroundColor: "",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  cursor: "pointer",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};
// ? FILE UPLOAD ENDS HERE

// ? COLLECTIONS AUTOCOMPLETE STARTS HERE
const collectionsData = [
  { title: "Collection 1", value: "Collection1" },
  { title: "Collection 2", value: "Collection2" },
  { title: "Collection 3", value: "Collection3" },
  { title: "Collection 4", value: "Collection4" },
  { title: "Collection 5", value: "Collection5" },
  { title: "Collection 6", value: "Collection6" },
  { title: "Collection 7", value: "Collection7" },
  { title: "Collection 8", value: "Collection8" },
  { title: "Collection 9", value: "Collection9" },
  { title: "Collection 10", value: "Collection10" },
  { title: "Collection 11", value: "Collection11" },
  { title: "Collection 12", value: "Collection12" },
];
// ? COLLECTIONS AUTOCOMPLETE ENDS HERE

const ProductInfo = () => {
  // ? CATEGORY DROPDOWN STARTS HERE
  const [category, setCategory] = React.useState("");
  const handleCategory = (event) => {
    setCategory(event.target.value);
  };
  // ? CATEGORY DROPDOWN ENDS HERE

  // ? SUB-CATEGORY DROPDOWN STARTS HERE
  const [subCategory, setSubCategory] = React.useState("");
  const handleSubCategory = (event) => {
    setSubCategory(event.target.value);
  };
  // ? SUB-CATEGORY DROPDOWN ENDS HERE

  // ? VENDOR NAME DROPDOWN STARTS HERE
  const [vendorName, setVendorName] = React.useState("");
  const handleVendorName = (event) => {
    setVendorName(event.target.value);
  };
  // ? VENDOR NAME DROPDOWN ENDS HERE

  // ? DISCOUNT DROPDOWN STARTS HERE
  const [discount, setDiscount] = React.useState("");
  const handleDiscount = (event) => {
    setDiscount(event.target.value);
  };
  // ? DISCOUNT DROPDOWN ENDS HERE

  // ? DYNAMIC DISCOUNT DROPDOWN STARTS HERE
  const [dynamicDiscount, setDynamicDiscount] = React.useState("");
  const handleDynamicDiscount = (event) => {
    setDynamicDiscount(event.target.value);
  };
  // ? DISCOUNT DROPDOWN ENDS HERE

  // ? TOGGLE BUTTONS STARTS HERE
  const [productStatus, setPoductStatus] = React.useState("active");
  const handleProductStatus = (event, newProductStatus) => {
    setPoductStatus(newProductStatus);
  };
  // ? TOGGLE BUTTONS ENDS HERE

  // ? FILE UPLOAD STARTS HERE
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        "image/*": [".jpeg", ".jpg", ".png"],
      },
    });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );
  // ? FILE UPLOAD ENDS HERE

  // ? CHECKBOX STARTS HERE
  const [checkedPrice, setCheckedPrice] = React.useState(false);

  const handlePriceRequest = (event) => {
    setCheckedPrice(event.target.checked);
    if (checkedDynamic) {
      setCheckedDynamic(false);
    }
  };

  const [checkedDynamic, setCheckedDynamic] = React.useState(false);

  const handleDynamicPrice = (event) => {
    setCheckedDynamic(event.target.checked);
    if (checkedPrice) {
      setCheckedPrice(false);
    }
  };

  const [checkedTrackInventory, setCheckedTrackInventory] =
    React.useState(false);

  const handleInventory = (event) => {
    setCheckedTrackInventory(event.target.checked);
  };

  const [checkedSellOutofStock, setCheckedSellOutofStock] =
    React.useState(false);

  const handleSellOutofStock = (event) => {
    setCheckedSellOutofStock(event.target.checked);
  };
  // ? CHECKBOX ENDS HERE

  // ? RADIO BUTTON STARTS HERE
  const [trackInventory, setTrackInventory] = React.useState("productLevel");

  const handleTrackInventory = (event) => {
    setTrackInventory(event.target.value);
  };

  // ? RADIO BUTTON ENDS HERE

  // ?DYNAMIC TEXT EDITOR STARTS HERE
  const [openDynamicTextEditor, setOpenDynamicTextEditor] =
    React.useState(false);

  const handleDynamicTextEditor = () => {
    !openDynamicTextEditor
      ? setOpenDynamicTextEditor(true)
      : setOpenDynamicTextEditor(false);
  };
  // ? DYNAMIC TEXT EDITOR ENDS HERE

  // ? TOGGLE BUTTON STARTS HERE
  const [productDetails, setProductDetails] =
    React.useState("productInformation");

  const handleProductDetails = (event, newProduct) => {
    setProductDetails(newProduct);
  };
  // ? TOGGLE BUTTON ENDS HERE

  return (
    <React.Fragment>
      <div className="bg-black-15 border-grey-5 rounded-3 p-3 row productInfo">
        <div className="col-12 px-0">
          <div className="row">
            <div className="col-8">
              <div className="d-flex mb-1">
                <p className="text-lightBlue">Title</p>
                <img src={info} alt="info" className="ms-2" width={13.5} />
              </div>
              <FormControl
                sx={{ background: "#15142A" }}
                className="col-7 px-0"
              >
                <OutlinedInput placeholder="Enter Title" size="small" />
              </FormControl>
            </div>
            <div className="col-4">
              <div className="d-flex mb-1">
                <p className="text-lightBlue">Product Status</p>
                <img src={info} alt="info" className="ms-2" width={13.5} />
              </div>
              <ToggleButtonGroup
                value={productStatus}
                onChange={handleProductStatus}
                aria-label="text formatting"
                className="row d-flex px-2 productInfo-toggle"
                size="small"
                exclusive
              >
                <ToggleButton
                  value="active"
                  aria-label="active"
                  style={{ width: "50%" }}
                  className="productInfo-toggle__active"
                >
                  <div className="d-flex">
                    <p className="text-grey-6">Active</p>
                  </div>
                </ToggleButton>
                <ToggleButton
                  value="draft"
                  aria-label="draft"
                  style={{ width: "50%" }}
                  className="productInfo-toggle__draft"
                >
                  <div className="d-flex">
                    <p className="text-grey-6">Draft</p>
                  </div>
                </ToggleButton>
              </ToggleButtonGroup>
              <small className="text-grey-6 mt-1">ⓘ Schedule Product</small>
            </div>
          </div>
        </div>
        <div className="col-12 px-0 mt-3">
          <div className="d-flex justify-content-between mb-1">
            <p className="text-lightBlue mb-1">Description</p>
            <button
              className="py-0 px-3 button-gradient"
              onClick={handleDynamicTextEditor}
            >
              <p>Add Dynamic Fields</p>
            </button>
          </div>
          <AppTextEditor />

          {openDynamicTextEditor && (
            <div className="mt-3">
              <div className="d-flex justify-content-between align-items-center">
                <ToggleButtonGroup
                  value={productDetails}
                  exclusive
                  onChange={handleProductDetails}
                  aria-label="text alignment"
                >
                  <ToggleButton
                    value="productInformation"
                    aria-label="productInformation"
                  >
                    <p className="text-capitalize text-lightBlue">
                      Product Information
                    </p>
                  </ToggleButton>
                  <ToggleButton value="inspiration" aria-label="inspiration">
                    <p className="text-capitalize text-lightBlue">
                      Inspiration
                    </p>
                  </ToggleButton>
                  <ToggleButton value="careGuide" aria-label="careGuide">
                    <p className="text-capitalize text-lightBlue">Care Guide</p>
                  </ToggleButton>
                  <ToggleButton value="shipping" aria-label="shipping">
                    <p className="text-capitalize text-lightBlue">Shipping</p>
                  </ToggleButton>
                </ToggleButtonGroup>
                <p className="text-blue-2">Customise</p>
              </div>
              <AppTextEditor />
            </div>
          )}
        </div>

        <hr className="hr-grey-6 my-3" />
        <div className="col-12">
          <div className="row">
            <p className="text-lightBlue col-12 px-0">Media</p>
          </div>
          <div className="row">
            <div className="col-3 ps-0">
              <div {...getRootProps({ style })} className="mt-3">
                <input
                  id="primary"
                  {...getInputProps()}
                  // onChange={(event) => {
                  //   uploadFileToCloud(event, "primary");
                  //   event.target.value = null;
                  // }}
                />
                <img src={productInfoMedia1} className="w-100" alt="" />
              </div>
              <button className="button-grey-gradient py-2 w-100 mt-4">
                <p>Primary Image</p>
              </button>
            </div>
            <div className="col-9 pe-0">
              <div {...getRootProps({ style })} className="mt-3">
                <input
                  id="primary"
                  {...getInputProps()}
                  // onChange={(event) => {
                  //   uploadFileToCloud(event, "primary");
                  //   event.target.value = null;
                  // }}
                />
                <img src={productInfoMedia2} className="w-100" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black-15 border-grey-5 rounded-3 p-3 row productInfo mt-4">
        <div className="col-12">
          <div className="row mb-3">
            <h6 className="text-lightBlue col-12 px-0">Product Type</h6>
          </div>
          <div className="row">
            <div className="col-4 ps-0">
              <div className="d-flex mb-1">
                <p className="text-lightBlue">Category</p>
                <img src={info} alt="info" className="ms-2" width={13.5} />
              </div>
              <FormControl
                sx={{ m: 0, minWidth: 120 }}
                size="small"
                className="w-100"
              >
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={category}
                  placeholder="Rings"
                  onChange={handleCategory}
                  sx={{ background: "#15142A" }}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value={"productTitle"}>Product Title</MenuItem>
                  <MenuItem value={"sku"}>SKU</MenuItem>
                  <MenuItem value={"vendorName"}>Vendor Name</MenuItem>
                  <MenuItem value={"category"}>Category</MenuItem>
                  <MenuItem value={"subCategory"}>Sub Category</MenuItem>
                  <MenuItem value={"collection"}>Collection</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="col-4 ps-0">
              <div className="d-flex mb-1">
                <p className="text-lightBlue">Sub-Category</p>
                <img src={info} alt="info" className="ms-2" width={13.5} />
              </div>
              <FormControl
                sx={{ m: 0, minWidth: 120 }}
                size="small"
                className="w-100"
              >
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={subCategory}
                  placeholder="Rings"
                  onChange={handleSubCategory}
                  sx={{ background: "#15142A" }}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value={"productTitle"}>Product Title</MenuItem>
                  <MenuItem value={"sku"}>SKU</MenuItem>
                  <MenuItem value={"vendorName"}>Vendor Name</MenuItem>
                  <MenuItem value={"category"}>Category</MenuItem>
                  <MenuItem value={"subCategory"}>Sub Category</MenuItem>
                  <MenuItem value={"collection"}>Collection</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="col-4 px-0">
              <div className="d-flex mb-1">
                <p className="text-lightBlue">Vendor Name</p>
                <img src={info} alt="info" className="ms-2" width={13.5} />
              </div>
              <FormControl
                sx={{ m: 0, minWidth: 120 }}
                size="small"
                className="w-100"
              >
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={vendorName}
                  placeholder="Rings"
                  onChange={handleVendorName}
                  sx={{ background: "#15142A" }}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value={"productTitle"}>Product Title</MenuItem>
                  <MenuItem value={"sku"}>SKU</MenuItem>
                  <MenuItem value={"vendorName"}>Vendor Name</MenuItem>
                  <MenuItem value={"category"}>Category</MenuItem>
                  <MenuItem value={"subCategory"}>Sub Category</MenuItem>
                  <MenuItem value={"collection"}>Collection</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="col-12 px-0 mt-3">
              <div className="d-flex mb-1">
                <p className="text-lightBlue">Collections</p>
                <img src={info} alt="info" className="ms-2" width={13.5} />
              </div>
              <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                sx={{ width: "100%", background: "#15142A" }}
                options={collectionsData}
                disableCloseOnSelect
                getOptionLabel={(option) => option.title}
                size="small"
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                      checkedIcon={<CheckBoxIcon fontSize="small" />}
                      style={{ marginRight: 0 }}
                      checked={selected}
                      size="small"
                    />
                    <p className="text-lightBlue">{option.title}</p>
                  </li>
                )}
                renderInput={(params) => (
                  <TextField size="small" {...params} placeholder="Search" />
                )}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black-15 border-grey-5 rounded-3 p-3 row productInfo mt-4">
        <div className="col-12 px-0">
          <div className="d-flex mb-3">
            <h6 className="text-lightBlue px-0">Price</h6>
            <img src={info} alt="info" className="ms-2" width={15} />
          </div>
          <div className="row">
            <div className="col-8">
              <div className="d-flex mb-1">
                <p className="text-lightBlue">Enter Price of the product</p>
                <img src={info} alt="info" className="ms-2" width={13.5} />
              </div>

              <FormControl
                sx={{ background: "#15142A", width: "100%" }}
                className="col-7 px-0"
              >
                <OutlinedInput
                  placeholder="Enter Price"
                  size="small"
                  disabled={checkedDynamic}
                />
              </FormControl>
            </div>
            <div className="col-4 ps-0">
              <div className="d-flex mb-1">
                <p className="text-lightBlue">Select Discount</p>
                <img src={info} alt="info" className="ms-2" width={13.5} />
              </div>
              <FormControl
                sx={{ m: 0, minWidth: 120, background: "#15142A" }}
                size="small"
                className="w-100"
              >
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={discount}
                  placeholder="Rings"
                  onChange={handleDiscount}
                  disabled={checkedDynamic}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value={5}>5%</MenuItem>
                  <MenuItem value={10}>10%</MenuItem>
                  <MenuItem value={20}>20%</MenuItem>
                  <MenuItem value={30}>30%</MenuItem>
                  <MenuItem value={40}>40%</MenuItem>
                  <MenuItem value={50}>50%</MenuItem>
                  <MenuItem value={60}>60%</MenuItem>
                  <MenuItem value={70}>70%</MenuItem>
                  <MenuItem value={80}>80%</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="col-12 mt-3">
              <FormControlLabel
                // control={<Checkbox size="small" />}
                control={
                  <Checkbox
                    checked={checkedPrice}
                    onChange={handlePriceRequest}
                    inputProps={{ "aria-label": "controlled" }}
                    size="small"
                  />
                }
                label="Price on Request"
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: 13,
                    color: "#c8d8ff",
                  },
                }}
              />
              <img src={info} alt="info" className="" width={13.5} />
            </div>
            {checkedPrice && (
              <div className="col-12 mt-1 mb-3">
                <button className="button-gradient w-auto py-2">
                  <p>Edit Price on Request Setting</p>
                </button>
              </div>
            )}
            <div className="col-12">
              <FormControlLabel
                // control={<Checkbox size="small" />}
                control={
                  <Checkbox
                    checked={checkedDynamic}
                    onChange={handleDynamicPrice}
                    inputProps={{ "aria-label": "controlled" }}
                    size="small"
                  />
                }
                label="Enable Dynamic Pricing"
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: 13,
                    color: "#c8d8ff",
                  },
                }}
              />
              <img src={info} alt="info" className="" width={13.5} />
            </div>
            {checkedDynamic && (
              <React.Fragment>
                <div className="col-12 mt-1 mb-3">
                  <button className="button-gradient w-auto py-2">
                    <p>Edit Price Master</p>
                  </button>
                </div>
                <div className="col-12">
                  <div className="d-flex justify-content-between mb-3">
                    <small className="text-lightBlue">
                      Calculated Total Price
                    </small>
                    <small className="text-lightBlue">Rs&nbsp;20,600</small>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <small className="text-grey-6">Metal Price</small>
                    <small className="text-grey-6">Rs&nbsp;15,000</small>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <small className="text-grey-6">Diamond Price</small>
                    <small className="text-grey-6">Rs&nbsp;4,000</small>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <small className="text-grey-6">Making Charges</small>
                    <small className="text-grey-6">Rs&nbsp;1,000</small>
                  </div>
                  <div className="d-flex justify-content-between">
                    <small className="text-grey-6">GST</small>
                    <small className="text-grey-6">Rs&nbsp;600</small>
                  </div>
                </div>

                <div className="col-4 mt-3">
                  <div className="d-flex mb-1">
                    <p className="text-lightBlue">Select Discount</p>
                    <img src={info} alt="info" className="ms-2" width={13.5} />
                  </div>
                  <FormControl
                    sx={{ m: 0, minWidth: 120 }}
                    size="small"
                    className="w-100"
                  >
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      value={dynamicDiscount}
                      placeholder="Rings"
                      onChange={handleDynamicDiscount}
                    >
                      <MenuItem value="">None</MenuItem>
                      <MenuItem value={5}>5%</MenuItem>
                      <MenuItem value={10}>10%</MenuItem>
                      <MenuItem value={20}>20%</MenuItem>
                      <MenuItem value={30}>30%</MenuItem>
                      <MenuItem value={40}>40%</MenuItem>
                      <MenuItem value={50}>50%</MenuItem>
                      <MenuItem value={60}>60%</MenuItem>
                      <MenuItem value={70}>70%</MenuItem>
                      <MenuItem value={80}>80%</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
      <div className="bg-black-15 border-grey-5 rounded-3 p-3 row productInfo mt-4">
        <div className="col-12 px-0">
          <div className="d-flex mb-3">
            <h6 className="text-lightBlue px-0">Inventory</h6>
            <img src={info} alt="info" className="ms-2" width={15} />
          </div>
          <div className="row">
            <div className="col-6">
              <div className="d-flex mb-1">
                <p className="text-lightBlue">SKU</p>
                <img src={info} alt="info" className="ms-2" width={13.5} />
              </div>

              <FormControl
                sx={{ background: "#15142A", width: "100%" }}
                className="col-7 px-0"
              >
                <OutlinedInput placeholder="DSERFC12540" size="small" />
              </FormControl>
            </div>
            <div className="col-6">
              <div className="d-flex mb-1">
                <p className="text-lightBlue">Barcode (ISBN, UPC, GTIN etc.)</p>
                <img src={info} alt="info" className="ms-2" width={13.5} />
              </div>

              <FormControl
                sx={{ background: "#15142A", width: "100%" }}
                className="col-7 px-0"
              >
                <OutlinedInput placeholder="" size="small" />
              </FormControl>
            </div>
            <div className="col-12 mt-3">
              <FormControlLabel
                // control={<Checkbox size="small" />}
                control={
                  <Checkbox
                    checked={checkedTrackInventory}
                    onChange={handleInventory}
                    inputProps={{ "aria-label": "controlled" }}
                    size="small"
                  />
                }
                label="Track Inventory"
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: 13,
                    color: "#c8d8ff",
                  },
                }}
              />
              <img src={info} alt="info" className="" width={13.5} />
            </div>
            {checkedTrackInventory && (
              <React.Fragment>
                <div className="col-12">
                  <FormControlLabel
                    // control={<Checkbox size="small" />}
                    control={
                      <Checkbox
                        checked={checkedSellOutofStock}
                        onChange={handleSellOutofStock}
                        inputProps={{ "aria-label": "controlled" }}
                        size="small"
                      />
                    }
                    label="Continue to sell when out of stock"
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: 13,
                        color: "#c8d8ff",
                      },
                    }}
                  />
                  <img src={info} alt="info" className="" width={13.5} />
                </div>
                <div className="col-12">
                  <hr className="hr-grey-6 my-3 " />
                </div>
                <div className="col-12 d-flex">
                  <div className="d-flex align-items-center me-4">
                    <p className="text-lightBlue">Track Inventory on</p>
                    <img src={info} alt="info" className="ms-2" width={13.5} />
                  </div>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={trackInventory}
                    onChange={handleTrackInventory}
                  >
                    <FormControlLabel
                      value="productLevel"
                      control={<Radio size="small" />}
                      label="Product Level"
                      sx={{
                        "& .MuiTypography-root": {
                          fontSize: 13,
                          color: "#c8d8ff",
                        },
                      }}
                    />
                    <FormControlLabel
                      value="variantLevel"
                      control={<Radio size="small" />}
                      label="Variant Level"
                      sx={{
                        "& .MuiTypography-root": {
                          fontSize: 13,
                          color: "#c8d8ff",
                        },
                      }}
                    />
                  </RadioGroup>
                </div>
                {trackInventory === "variantLevel" && (
                  <p className="text-lightBlue">
                    Add Variant options to create variants and manage inventory{" "}
                    <span className="text-blue-2 c-pointer">
                      (Add Variants)
                    </span>
                  </p>
                )}
                {trackInventory === "productLevel" && (
                  <React.Fragment>
                    <div className="col-12 d-flex justify-content-between mt-3">
                      <h6 className="text-lightBlue">Manage Inventory</h6>
                      <p className="text-blue-2">Edit Store</p>
                    </div>
                    <div className="col-12 d-flex align-items-center mt-3 mb-2">
                      {/* <div className=""> */}
                      <small className="text-lightBlue">
                        Apply Quantity to all stores
                      </small>
                      <img
                        src={info}
                        alt="info"
                        className="ms-2"
                        width={13.5}
                      />
                    </div>
                    <div className="col-12 d-flex">
                      <FormControl
                        sx={{ background: "#15142A" }}
                        className="me-3"
                      >
                        <OutlinedInput
                          placeholder="Enter Quantity"
                          size="small"
                          endAdornment={
                            <InputAdornment position="end">
                              Fixed
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                      <button className="button-gradient py-1">
                        <p>Apply to all</p>
                      </button>
                    </div>
                    <div className="col-12 mt-4 mb-3">
                      <div
                        style={{ background: " rgba(39, 40, 63, 0.5) " }}
                        className="d-flex justify-content-between py-2 px-3 rounded-3"
                      >
                        <div className="d-flex">
                          <p className="text-lightBlue">Filter :</p>
                          <p className="text-blue-2 ms-4">Country</p>
                          <p className="text-blue-2 ms-4">State</p>
                        </div>
                        <p className="text-lightBlue">10 stores</p>
                      </div>
                    </div>
                    <div className="col-12 d-flex justify-content-between my-2 align-items-center px-4">
                      <p className="text-lightBlue">
                        JWL - JWL Bagh, New Delhi-110005, India
                      </p>

                      <FormControl
                        sx={{ background: "#15142A", width: 80 }}
                        className="col-7 px-0"
                      >
                        <OutlinedInput
                          placeholder="Enter Qty"
                          size="small"
                          defaultValue={1}
                        />
                      </FormControl>
                    </div>
                    <div className="col-12 d-flex justify-content-between my-2 align-items-center px-4">
                      <p className="text-lightBlue">
                        JWL - JWL Bagh, New Delhi-110005, India
                      </p>

                      <FormControl
                        sx={{ background: "#15142A", width: 80 }}
                        className="col-7 px-0"
                      >
                        <OutlinedInput
                          placeholder="Enter Qty"
                          size="small"
                          defaultValue={1}
                        />
                      </FormControl>
                    </div>
                    <div className="col-12 d-flex justify-content-between my-2 align-items-center px-4">
                      <p className="text-lightBlue">
                        JWL - JWL Bagh, New Delhi-110005, India
                      </p>

                      <FormControl
                        sx={{ background: "#15142A", width: 80 }}
                        className="col-7 px-0"
                      >
                        <OutlinedInput
                          placeholder="Enter Qty"
                          size="small"
                          defaultValue={1}
                        />
                      </FormControl>
                    </div>
                  </React.Fragment>
                )}
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductInfo;
