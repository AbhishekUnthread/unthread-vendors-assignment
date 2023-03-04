import React from "react";
import "./CreateDataSets.scss";
import { Link } from "react-router-dom";
// ! COMPONENT IMPORTS
import AppTextEditor from "../../../components/AppTextEditor/AppTextEditor";
import SEO from "../../Products/AddProduct/SEO/SEO";
import TagsBox from "../../../components/TagsBox/TagsBox";
import NotesBox from "../../../components/NotesBox/NotesBox";
import UploadMediaBox from "../../../components/UploadMediaBox/UploadMediaBox";
import StatusBox from "../../../components/StatusBox/StatusBox";
import {
  EnhancedTableHead,
  stableSort,
  getComparator,
} from "../../../components/TableDependencies/TableDependencies";
// ! IMAGES IMPORTS
import arrowLeft from "../../../assets/icons/arrowLeft.svg";
import info from "../../../assets/icons/info.svg";
import cancel from "../../../assets/icons/cancel.svg";
import arrowDown from "../../../assets/icons/arrowDown.svg";
import featureUpload from "../../../assets/images/products/featureUpload.svg";
import ringSmall from "../../../assets/images/ringSmall.svg";
import deleteWhite from "../../../assets/icons/deleteWhite.svg";
import editWhite from "../../../assets/icons/editWhite.svg";
import deleteButton from "../../../assets/icons/deleteButton.svg";
import paginationRight from "../../../assets/icons/paginationRight.svg";
import paginationLeft from "../../../assets/icons/paginationLeft.svg";
import addMedia from "../../../assets/icons/addMedia.svg";
import optionUpload from "../../../assets/icons/optionUpload.svg";
import gold from "../../../assets/images/products/gold.svg";
// ! MATERIAL IMPORTS
import {
  FormControl,
  MenuItem,
  Select,
  InputAdornment,
  OutlinedInput,
  Checkbox,
  FormControlLabel,
  styled,
  InputBase,
  Popover,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  SwipeableDrawer,
  RadioGroup,
  Radio,
  Tooltip,
} from "@mui/material";
// ! MATERIAL ICONS IMPORTS
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadFile from "../../../components/UploadFile/UploadFile";

// ? SEARCH INPUT STARTS HERE
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  "&:hover": {},
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
  height: "30.6px",
  border: "1px solid #38395c",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1.5),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(0.8, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    borderRadius: "5px",
  },
}));
// ? SEARCH INPUT ENDS HERE

// ? TABLE STARTS HERE
function createData(pId, productName, category, price) {
  return { pId, productName, category, price };
}

const rows = [
  createData(
    1,
    "The Fringe Diamond Ring",
    "Gold Products",
    "₹ 20,600 - ₹ 50,000"
  ),
  createData(
    2,
    "The Fringe Diamond Ring",
    "Gold Products",
    "₹ 20,600 - ₹ 50,000"
  ),
  createData(
    3,
    "The Fringe Diamond Ring",
    "Gold Products",
    "₹ 20,600 - ₹ 50,000"
  ),
  createData(
    4,
    "The Fringe Diamond Ring",
    "Gold Products",
    "₹ 20,600 - ₹ 50,000"
  ),
  createData(
    5,
    "The Fringe Diamond Ring",
    "Gold Products",
    "₹ 20,600 - ₹ 50,000"
  ),
];

const drawerHeadCells = [
  {
    id: "productName",
    numeric: false,
    disablePadding: true,
    label: "Product Name",
  },
  {
    id: "category",
    numeric: false,
    disablePadding: false,
    label: "Category",
  },
  {
    id: "price",
    numeric: false,
    disablePadding: false,
    label: "Price",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "Action",
  },
];

// ? TABLE ENDS HERE

// ? LIKE PRODUCTS TABLE STARTS HERE
function createLikeProductData(pId, productName, category, price) {
  return { pId, productName, category, price };
}

const likeHeadCells = [
  {
    id: "productName",
    numeric: false,
    disablePadding: true,
    label: "Product Name",
  },
  {
    id: "category",
    numeric: false,
    disablePadding: false,
    label: "Category",
  },
  {
    id: "price",
    numeric: false,
    disablePadding: false,
    label: "Price",
  },
];

const likeProductRows = [
  createLikeProductData(
    1,
    "The Fringe Diamond Ring",
    "Gold Products",
    "₹ 25,000"
  ),
  createLikeProductData(2, "Fringe Diamond Ring", "Gold Products", "₹ 25,000"),
  createLikeProductData(
    3,
    "The Fringe Diamond Ring",
    "Gold Products",
    "₹ 25,000"
  ),
];
// ? LIKE PRODUCTS TABLE ENDS HERE

const CreateDataSets = () => {
  // ? RADIO BUTTON STARTS HERE
  const [likeProductRadio, setLikeProductRadio] = React.useState("automated");
  const handleLikeProductRadio = (event) => {
    setLikeProductRadio(event.target.value);
  };

  const [likeMatchRadio, setLikeMatchRadio] = React.useState("allCondition");
  const handleLikeMatchRadio = (event) => {
    setLikeMatchRadio(event.target.value);
  };

  // ? RADIO BUTTON ENDS HERE

  // ? ADD PRODUCT DRAWER STARTS HERE

  const [addProductDrawer, setAddProductDrawer] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleAddProductDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setAddProductDrawer({ ...addProductDrawer, [anchor]: open });
  };
  // ? ADD PRODUCT DRAWER ENDS HERE

  // * PRICE POPOVERS STARTS
  const [anchorPriceEl, setAnchorPriceEl] = React.useState(null);
  const handlePriceClick = (event) => {
    setAnchorPriceEl(event.currentTarget);
  };

  const handlePriceClose = () => {
    setAnchorPriceEl(null);
  };

  const openPrice = Boolean(anchorPriceEl);
  const idPrice = openPrice ? "simple-popover" : undefined;
  // * PRICE POPOVERS ENDS

  // * TABLE STARTS HERE
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("productName");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.pId);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleLikeSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = likeProductRows.map((n) => n.pId);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  // * TABLE ENDS HERE

  // ? SIZE SELECT STARTS HERE
  const [field, setField] = React.useState("price");

  const handleFieldChange = (event) => {
    setField(event.target.value);
  };
  // ? SIZE SELECT ENDS HERE

  // ? OPERATOR SELECT STARTS HERE
  const [operator, setOperator] = React.useState("equals");

  const handleOperatorChange = (event) => {
    setOperator(event.target.value);
  };
  // ? OPERATOR SELECT ENDS HERE

  // ? CHECKBOX STARTS HERE
  const [checked, setChecked] = React.useState(false);

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };
  // ? CHECKBOX ENDS HERE

  // ? LIKE ADD CONDITION STARTS HERE
  const [likeAddCondition, setLikeAddCondition] = React.useState(false);
  const handleLikeAddCondition = () => {
    if (!likeAddCondition) {
      setLikeAddCondition(true);
    } else {
      setLikeAddCondition(false);
      setLikeApplyCondition(false);
    }
  };
  // ? LIKE ADD CONDITION ENDS HERE

  // ? LIKE APPLY CONDITION STARTS HERE
  const [likeApplyCondition, setLikeApplyCondition] = React.useState(false);
  const handleLikeApplyCondition = () => {
    if (likeApplyCondition) {
      setLikeApplyCondition(false);
    } else {
      setLikeApplyCondition(true);
      setLikeAddCondition(false);
    }
  };
  // ? LIKE APPLY CONDITION ENDS HERE

  // ? INPUT FIELD TYPE SELECT STARTS HERE
  const [inputFieldType, setInputFieldType] = React.useState("");

  const handleInputFieldType = (event) => {
    setInputFieldType(event.target.value);
  };
  // ? INPUT FIELD TYPE SELECT ENDS HERE

  // ? OPTION SELECT STARTS HERE
  const [optionSelect, setOptionSelect] = React.useState(10);

  const handleOptionSelect = (event) => {
    setOptionSelect(event.target.value);
  };
  // ? OPTION SELECT ENDS HERE

  // ? SIZE SELECT STARTS HERE
  const [size, setSize] = React.useState("");
  // const [metal, setMetal] = React.useState("");
  // const [diamond, setDiamond] = React.useState("");

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };
  // ? SIZE SELECT ENDS HERE

  return (
    <div className="page container-fluid position-relative user-group">
      <div className="row justify-content-between">
        <div className="d-flex align-items-center w-auto ps-0">
          <Link to="/parameters/variantSets" className="d-flex">
            <img
              src={arrowLeft}
              alt="arrowLeft"
              width={9}
              className="c-pointer"
            />
          </Link>

          <h5 className="page-heading ms-2 ps-1">Add Data</h5>
        </div>

        <div className="d-flex align-items-center w-auto pe-0">
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
      <div className="row mt-3">
        <div className="col-lg-9 mt-3">
          <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes">
            {/* <div className="d-flex col-12 px-0 justify-content-between">
              <div className="d-flex align-items-center">
                <h6 className="text-lightBlue me-auto text-lightBlue fw-500">
                  Collection Information
                </h6>
              </div>
            </div>
            <hr className="hr-grey-6 mt-3 mb-0" /> */}

            <div className="col-md-12 px-0">
              <div className="d-flex mb-1">
                <p className="text-lightBlue me-2">Data Title</p>
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
                <OutlinedInput placeholder="Enter Data Title" size="small" />
              </FormControl>
            </div>
            <div className="col-12 mt-3 px-0">
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
                  value={inputFieldType}
                  onChange={handleInputFieldType}
                  size="small"
                >
                  <MenuItem value="" sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    None
                  </MenuItem>
                  <MenuItem value={10} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    Drop-Down List
                  </MenuItem>
                  <MenuItem value={20} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    Drop-Down List with Thumbnails
                  </MenuItem>
                  <MenuItem value={30} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    Images & Color Swatches
                  </MenuItem>
                  <MenuItem value={40} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    Radio Buttons
                  </MenuItem>
                  <MenuItem value={50} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    Rectangle Buttons
                  </MenuItem>
                  <MenuItem value={60} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    Circle Buttons
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            {inputFieldType && (
              <div className="col-12 bg-black-13 d-flex justify-content-between mt-3 py-3 mb-2">
                <p className="text-lightBlue">
                  {inputFieldType === 20 || inputFieldType === 30
                    ? "Option Name"
                    : "Data Values"}
                </p>
                <p className="text-lightBlue">Action</p>
              </div>
            )}
            {inputFieldType && (
              <React.Fragment>
                <div className="col-12 d-flex justify-content-between my-2">
                  <div className="d-flex align-items-center">
                    <FormControl className="me-2">
                      <OutlinedInput
                        placeholder="Enter Data Name"
                        size="small"
                      />
                    </FormControl>
                    {inputFieldType === 30 && (
                      <React.Fragment>
                        <FormControl
                          sx={{
                            m: 0,
                            minWidth: 10,
                            width: 100,
                          }}
                          size="small"
                          className="me-2"
                        >
                          <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={optionSelect}
                            onChange={handleOptionSelect}
                            size="small"
                          >
                            <MenuItem
                              value={10}
                              sx={{ fontSize: 13, color: "#5c6d8e" }}
                            >
                              Color
                            </MenuItem>
                            <MenuItem
                              value={20}
                              sx={{ fontSize: 13, color: "#5c6d8e" }}
                            >
                              Image
                            </MenuItem>
                          </Select>
                        </FormControl>
                        {optionSelect === 10 && (
                          <div className="d-flex border-grey-5 py-2 px-2 rounded-3 me-2">
                            <img src={gold} alt="gold" width={15} />
                            <small className="text-grey-6 ms-2">#HC1258</small>
                          </div>
                        )}
                      </React.Fragment>
                    )}
                    {(inputFieldType === 20 || optionSelect === 20) && (
                      <UploadFile imageName={optionUpload} height={36} />
                    )}
                  </div>
                  <Tooltip title="Delete" placement="top">
                    <div className="d-flex table-edit-icon rounded-4 p-2 border-grey-5">
                      <DeleteIcon
                        sx={{
                          color: "#5c6d8e",
                          fontSize: 20,
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  </Tooltip>
                </div>
                <div className="col-12 d-flex justify-content-between my-2">
                  <div className="d-flex align-items-center">
                    <FormControl className="me-2">
                      <OutlinedInput
                        placeholder="Enter Data Name"
                        size="small"
                      />
                    </FormControl>
                    {inputFieldType === 30 && (
                      <React.Fragment>
                        <FormControl
                          sx={{
                            m: 0,
                            minWidth: 10,
                            width: 100,
                          }}
                          size="small"
                          className="me-2"
                        >
                          <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={optionSelect}
                            onChange={handleOptionSelect}
                            size="small"
                          >
                            <MenuItem
                              value={10}
                              sx={{ fontSize: 13, color: "#5c6d8e" }}
                            >
                              Color
                            </MenuItem>
                            <MenuItem
                              value={20}
                              sx={{ fontSize: 13, color: "#5c6d8e" }}
                            >
                              Image
                            </MenuItem>
                          </Select>
                        </FormControl>
                        {optionSelect === 10 && (
                          <div className="d-flex border-grey-5 py-2 px-2 rounded-3 me-2">
                            <img src={gold} alt="gold" width={15} />
                            <small className="text-grey-6 ms-2">#HC1258</small>
                          </div>
                        )}
                      </React.Fragment>
                    )}
                    {(inputFieldType === 20 || optionSelect === 20) && (
                      <UploadFile imageName={optionUpload} height={36} />
                    )}
                  </div>
                  <Tooltip title="Delete" placement="top">
                    <div className="d-flex table-edit-icon rounded-4 p-2 border-grey-5">
                      <DeleteIcon
                        sx={{
                          color: "#5c6d8e",
                          fontSize: 20,
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  </Tooltip>
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
        <div className="col-lg-3 mt-3 pe-0 ps-0 ps-lg-3">
          <div className="bg-black-15 border-grey-5 rounded-8 p-3">
            <div className="d-flex align-items-center justify-content-between">
              <h6 className="text-lightBlue fw-500">Preview</h6>
            </div>
            {inputFieldType &&
              (inputFieldType === 10 || inputFieldType === 20) && (
                <React.Fragment>
                  <p className="text-lightBlue mb-2 mt-3">Size</p>
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
                      <MenuItem
                        value=""
                        sx={{ fontSize: 13, color: "#5c6d8e" }}
                      >
                        None
                      </MenuItem>
                      <MenuItem
                        value={10}
                        sx={{ fontSize: 13, color: "#5c6d8e" }}
                      >
                        S
                      </MenuItem>
                      <MenuItem
                        value={20}
                        sx={{ fontSize: 13, color: "#5c6d8e" }}
                      >
                        M
                      </MenuItem>
                      <MenuItem
                        value={30}
                        sx={{ fontSize: 13, color: "#5c6d8e" }}
                      >
                        L
                      </MenuItem>
                      <MenuItem
                        value={40}
                        sx={{ fontSize: 13, color: "#5c6d8e" }}
                      >
                        XL
                      </MenuItem>
                    </Select>
                  </FormControl>
                </React.Fragment>
              )}
            {inputFieldType && inputFieldType === 30 && (
              <React.Fragment>
                <p className="text-lightBlue mt-3">Size</p>
                <div className="d-flex flex-wrap">
                  <div className="d-flex border-grey-5 py-2 px-2 rounded-3 me-2 mt-2">
                    <img src={gold} alt="gold" width={15} />
                    <small className="text-grey-6 ms-2">Value 1</small>
                  </div>
                  <div className="d-flex border-grey-5 py-2 px-2 rounded-3 me-2 mt-2">
                    <img src={gold} alt="gold" width={15} />
                    <small className="text-grey-6 ms-2">Value 2</small>
                  </div>
                  <div className="d-flex border-grey-5 py-2 px-2 rounded-3 me-2 mt-2">
                    <img src={gold} alt="gold" width={15} />
                    <small className="text-grey-6 ms-2">Value 3</small>
                  </div>
                </div>
              </React.Fragment>
            )}
            {inputFieldType && inputFieldType === 40 && (
              <React.Fragment>
                <p className="text-lightBlue mt-3">Size</p>

                <RadioGroup
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  className="mt-1"
                  // value={recommendedProductRadio}
                  // onChange={handleRecommendedProductRadio}
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio size="small" />}
                    label="Value 1"
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: 13,
                        color: "#c8d8ff",
                      },
                    }}
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio size="small" />}
                    label="Value 2"
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: 13,
                        color: "#c8d8ff",
                      },
                    }}
                  />
                  <FormControlLabel
                    value="3"
                    control={<Radio size="small" />}
                    label="Value 3"
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: 13,
                        color: "#c8d8ff",
                      },
                    }}
                  />
                </RadioGroup>
              </React.Fragment>
            )}
            {inputFieldType && inputFieldType === 50 && (
              <React.Fragment>
                <p className="text-lightBlue mt-3">Size</p>
                <div className="d-flex flex-wrap">
                  <div className="d-flex border-grey-5 py-2 px-2 rounded-3 me-2 mt-2">
                    <small className="text-grey-6 ms-2">Value 1</small>
                  </div>
                  <div className="d-flex border-grey-5 py-2 px-2 rounded-3 me-2 mt-2">
                    <small className="text-grey-6 ms-2">Value 2</small>
                  </div>
                  <div className="d-flex border-grey-5 py-2 px-2 rounded-3 me-2 mt-2">
                    <small className="text-grey-6 ms-2">Value 3</small>
                  </div>
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
      <div className="row create-buttons pt-5 pb-3 justify-content-between">
        <div className="d-flex w-auto px-0">
          <Link
            to="/parameters/collections"
            className="button-red-outline py-2 px-4"
          >
            <p>Discard</p>
          </Link>

          <Link
            to="/parameters/collections"
            className="button-lightBlue-outline py-2 px-4 ms-3"
          >
            <p>Save as Draft</p>
          </Link>
        </div>
        <div className="d-flex w-auto px-0">
          <Link
            to="/parameters/collections"
            className="button-lightBlue-outline py-2 px-4"
          >
            <p>Save & Add Another</p>
          </Link>
          <Link
            to="/parameters/collections"
            className="button-gradient ms-3 py-2 px-4 w-auto"
          >
            <p>Save</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateDataSets;
