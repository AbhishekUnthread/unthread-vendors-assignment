import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import SearchIcon from "@mui/icons-material/Search";
import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  InputAdornment,
  OutlinedInput,
  Checkbox,
  FormControlLabel,
  FormGroup,
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

import UseFileUpload from "../../../features/fileUpload/fileUploadHook";
import {
  EnhancedTableHead,
  stableSort,
  getComparator,
} from "../../../components/TableDependencies/TableDependencies";
import {
  showSuccess,
  showError,
} from "../../../features/snackbar/snackbarAction";
import {
  useGetAllCollectionsQuery,
  useCreateCollectionMutation
} from "../../../features/parameters/collections/collectionsApiSlice";

import AppTextEditor from "../../../components/AppTextEditor/AppTextEditor";
import SEO from "../../Products/AddProduct/SEO/SEO";
import TagsBox from "../../../components/TagsBox/TagsBox";
import NotesBox from "../../../components/NotesBox/NotesBox";
import UploadMediaBox from "../../../components/UploadMediaBox/UploadMediaBox";
import UploadBanner from "../../../components/UploadBanner/UploadBanner";
import StatusBox from "../../../components/StatusBox/StatusBox";
import VisibilityBox from '../../../components/VisibilityBox/VisibilityBox'
import AddHeader from "../../../components/AddHeader/AddHeader"
import DiscardModal from "../../../components/Discard/DiscardModal";

import "./CreateCollection.scss";

import info from "../../../assets/icons/info.svg";
import cancel from "../../../assets/icons/cancel.svg";
import arrowDown from "../../../assets/icons/arrowDown.svg";
import featureUpload from "../../../assets/images/products/featureUpload.svg";
import ringSmall from "../../../assets/images/ringSmall.svg";
import deleteWhite from "../../../assets/icons/deleteWhite.svg";
import editWhite from "../../../assets/icons/editWhite.svg";
import deleteButton from "../../../assets/icons/deleteButton.svg";
import addMedia from "../../../assets/icons/addMedia.svg";

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

const collectionValidationSchema = Yup.object({
  title: Yup.string().trim().min(3).max(50).required("Required")
});

const CreateCollection = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [startDate1, setStartDate] = useState(null);
  const [endDate1, setEndDate] = useState(null);
  const [collectionList, setCollectionList] = useState()
  const collectionId = useSelector((state) => state.collection.collectionId);
  const [categorySeo,setCategorySeo] = useState({});
  const [appTextEditor, setAppTextEditor] = useState()
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [likeProductRadio, setLikeProductRadio] = useState("automated");
  const [likeMatchRadio, setLikeMatchRadio] = useState("allCondition");
  const [anchorPriceEl, setAnchorPriceEl] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("productName");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [field, setField] = useState("price");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [operator, setOperator] = useState("equals");
  const [checked, setChecked] = useState(false);
  const [likeApplyCondition, setLikeApplyCondition] = useState(false);
  const [likeAddCondition, setLikeAddCondition] = useState(false);
  const [addProductDrawer, setAddProductDrawer] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const clearDate = () => {
    setStartDate(null);
    setEndDate(null);
  }  
  
  const handleVisiblility = (value) => {
    collectionFormik?.setFieldValue("isVisibleFrontend", Boolean(value));
  }

  const handleMediaUrl = (value) => {
    if(value !== null) {
      collectionFormik?.setFieldValue("mediaUrl", value);
    }
  }

  const handleProductStatus = (value, status) => {
    collectionFormik?.setFieldValue("status", status);
  }

  const toggleDiscardModal = () => {
    setShowDiscardModal((prevState) => !prevState);
  };

  const handleDiscard = () => {
    setShowDiscardModal(true);
  }

  const {
    data: collectionData,
    isLoading: collectionIsLoading,
    isSuccess: collectionIsSuccess,
    error: collectionError,
  } = useGetAllCollectionsQuery({ createdAt: "-1", id: collectionId });

  const [
    createCollection,
    {
      isLoading: createCollectionIsLoading,
      isSuccess: createCollectionIsSuccess,
      error: createCollectionError,
    },
  ] = useCreateCollectionMutation();

  const collectionFormik = useFormik({
    initialValues: {
      title: "",
      status: "in-active",
      isVisibleFrontend: false,
      filter: false,
    },
    enableReinitialize: true,
    validationSchema: collectionValidationSchema,
    onSubmit: (values) => {
      for (const key in values) {
        if(values[key] === "" || values[key] === null){
          delete values[key] 
        }
      }
      let obj={
        ...values,
      };

      if (categorySeo?.title || categorySeo?.slug || categorySeo?.description) {
        obj.seo = {};

        if (categorySeo?.title) {
          obj.seo.title = categorySeo.title;
        }

        if (categorySeo?.description) {
          obj.seo.description = categorySeo.description;
        }

        if (categorySeo?.slug) {
          obj.seo.slug = categorySeo.slug;
        }

        if(categorySeo?.metaKeywords) {
          obj.seo.metaKeywords = categorySeo?.metaKeywords
        }
      }
      createCollection(obj)
        .unwrap()
        .then(() => { 
          navigate("/parameters/collections");
          dispatch(showSuccess({ message: "Collection created successfully" }));
        });
       
    },
  });

  useEffect(() => {
    if(appTextEditor !== null) {
      collectionFormik.setFieldValue("description", appTextEditor)
    }
    if(startDate1 !== null){
      collectionFormik.setFieldValue("startDate", startDate1);
    }
    if(endDate1 !== null){
      collectionFormik.setFieldValue("endDate", endDate1);
    }
    if(startDate1 !== null){
      collectionFormik.setFieldValue("status", "scheduled");
    }
  },[appTextEditor, startDate1, endDate1])

  useEffect(() => {
    if (createCollectionError) {
      if (createCollectionError?.data?.message) {
        dispatch(showError({ message: createCollectionError.data.message }));
      } else {
        dispatch(
          showError({ message: "Oops! Failed to create Collection. Please try again." })
        );
      }
    }
  }, [createCollectionError, dispatch]);

  const handleLikeProductRadio = (event) => {
    setLikeProductRadio(event.target.value);
  };

  const handleLikeMatchRadio = (event) => {
    setLikeMatchRadio(event.target.value);
  };

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

  const handlePriceClick = (event) => {
    setAnchorPriceEl(event.currentTarget);
  };

  const handlePriceClose = () => {
    setAnchorPriceEl(null);
  };

  const openPrice = Boolean(anchorPriceEl);
  const idPrice = openPrice ? "simple-popover" : undefined;

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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleFieldChange = (event) => {
    setField(event.target.value);
  };

  const handleOperatorChange = (event) => {
    setOperator(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleLikeAddCondition = () => {
    if (!likeAddCondition) {
      setLikeAddCondition(true);
    } else {
      setLikeAddCondition(false);
      setLikeApplyCondition(false);
    }
  };

  const handleLikeApplyCondition = () => {
    if (likeApplyCondition) {
      setLikeApplyCondition(false);
    } else {
      setLikeApplyCondition(true);
      setLikeAddCondition(false);
    }
  };

  useEffect(() => {
    if (collectionError) {
      if (collectionError?.data?.message) {
        dispatch(showError({ message: collectionError.data.message }));
      } else {
        dispatch(
          showError({ message: "Something went wrong!, please try again" })
        );
      }
    }
    if (collectionIsSuccess) {
        setCollectionList(collectionData.data.data);
    }
  }, [
    collectionData,
    collectionIsSuccess,
    collectionError,
    dispatch,
  ]);

  return (
    <form noValidate onSubmit={collectionFormik.handleSubmit}>
      <div className="page container-fluid position-relative user-group">
        <AddHeader headerName={"Create Collection"} navigateLink={"/parameters/collections"}/>
        <div className="row">
          <div className="col-lg-9 mt-4">
            <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes">
              <div className="col-md-12 px-0 mt-1">
                <div className="d-flex mb-1">
                  <p className="text-lightBlue me-2">Collection Title *</p>
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
                    placeholder="Enter collection title"
                    size="small"
                    value={collectionFormik.values.title}
                    onBlur={collectionFormik.handleBlur}
                    onChange={collectionFormik.handleChange}
                    name="title"
                    autoFocus
                  />
                </FormControl>
                {!!collectionFormik.touched.title && collectionFormik.errors.title && (
                  <FormHelperText error>
                    {collectionFormik.errors.title}
                  </FormHelperText>
                )}
                <FormGroup>
                  <div className="d-flex align-items-center col-12 px-0">
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="filter"
                          checked={collectionFormik.values.filter}
                          onChange={collectionFormik.handleChange}
                          inputProps={{ "aria-label": "controlled" }}
                          size="small"
                          style={{
                            color: "#5C6D8E",
                            marginRight: 0,
                          }}
                        />
                      }
                      label="Include in Filters"
                      sx={{
                        "& .MuiTypography-root": {
                          fontSize: 13,
                          color: "#c8d8ff",
                        },
                      }}
                    />
                    <span className="text-blue-2 c-pointer checkboxText">(manage)</span>
                  </div>
                </FormGroup>
              </div>
              <div className="col-12 mt-3 px-0">
                <div className="d-flex  mb-1">
                  <p className="text-lightBlue me-2">Description</p>
                  <Tooltip title="Lorem ipsum" placement="top">
                    <img
                      src={info}
                      alt="info"
                      className=" c-pointer"
                      width={13.5}
                    />
                  </Tooltip>
                </div>
                <AppTextEditor
                  setFieldValue={setAppTextEditor}
                  value={appTextEditor}
                 />
              </div>
            </div>

            <div className="bg-black-9 border-grey-5 rounded-8 p-3 row features mt-4">
              <div className="d-flex justify-content-between mb-2 px-0">
                <h6 className="text-lightBlue me-auto text-lightBlue col-auto ps-0 fw-500">
                  Add Product
                </h6>
              </div>
              <div className="d-flex align-items-center col-12 px-0 mb-2">
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={likeProductRadio}
                  onChange={handleLikeProductRadio}
                  className="features-radio px-0"
                >
                  <FormControlLabel
                    value="automated"
                    control={<Radio size="small" />}
                    label="Automated"
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: 13,
                        color: "#c8d8ff",
                        marginRight: 1,
                      },
                    }}
                  />
                  <FormControlLabel
                    value="manual"
                    control={<Radio size="small" />}
                    label="Manual"
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: 13,
                        color: "#c8d8ff",
                        marginRight: 1,
                      },
                    }}
                  />
                </RadioGroup>
              </div>
              {likeProductRadio !== "manual" && (
                <div className="bg-black-11 rounded-8 p-3 shadow-sm">
                  {likeProductRadio === "automated" && (
                    <>
                      <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center">
                          <p className="text-lightBlue me-4">Should Match:</p>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={likeMatchRadio}
                            onChange={handleLikeMatchRadio}
                            className="features-radio"
                          >
                            <FormControlLabel
                              value="allCondition"
                              control={<Radio size="small" />}
                              label="All Condition"
                              sx={{
                                "& .MuiTypography-root": {
                                  fontSize: 13,
                                  color: "#c8d8ff",
                                },
                              }}
                            />
                            <FormControlLabel
                              value="anyCondition"
                              control={<Radio size="small" />}
                              label="Any Condition"
                              sx={{
                                "& .MuiTypography-root": {
                                  fontSize: 13,
                                  color: "#c8d8ff",
                                },
                              }}
                            />
                          </RadioGroup>
                        </div>
                        <button
                          className="button-gradient py-1 px-4"
                          onClick={handleLikeAddCondition}
                        >
                          <p>Add Condition</p>
                        </button>
                      </div>
                      <div className="bg-black-9 align-items-center rounded-8 py-2 px-3 d-flex justify-content-between mt-3 shadow-lg">
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
                          label="Summary"
                          sx={{
                            "& .MuiTypography-root": {
                              fontSize: "0.875rem",
                              color: "#c8d8ff",
                            },
                          }}
                          className=" px-0"
                        />
                        <p className="text-lightBlue c-pointer">Action</p>
                      </div>
                      {likeApplyCondition && (
                        <div className="d-flex px-3 justify-content-between align-items-center">
                          <div className="d-flex align-items-center">
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
                              sx={{
                                "& .MuiTypography-root": {
                                  fontSize: "0.875rem",
                                  color: "#c8d8ff",
                                },
                              }}
                              className="px-0 me-0"
                            />
                            <small className="ms-0 text-lightBlue">
                              <span className="text-blue-2">Price</span>&nbsp;is
                              equal to&nbsp;
                              <span className="text-blue-2">₹&nbsp;25,000</span>
                            </small>
                          </div>
                          <div className="d-flex align-items-center">
                            <img
                              src={editWhite}
                              alt="editWhite"
                              width={30}
                              className="me-1"
                            />
                            <img
                              src={deleteWhite}
                              alt="deleteWhite"
                              width={30}
                            />
                          </div>
                        </div>
                      )}
                      {likeAddCondition && (
                        <div className="row">
                          <div className="col-sm-6 col-md-3 mt-3 mb-1 ps-4">
                            <p className="text-lightBlue mb-1">Field</p>

                            <FormControl className="w-100 px-0" size="small">
                              <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={field}
                                onChange={handleFieldChange}
                                size="small"
                              >
                                <MenuItem
                                  value="price"
                                  sx={{ fontSize: 13, color: "#5c6d8e" }}
                                >
                                  Price
                                </MenuItem>
                                <MenuItem
                                  value={"collection"}
                                  sx={{ fontSize: 13, color: "#5c6d8e" }}
                                >
                                  Collection
                                </MenuItem>
                                <MenuItem
                                  value={"tags"}
                                  sx={{ fontSize: 13, color: "#5c6d8e" }}
                                >
                                  Tags
                                </MenuItem>
                                <MenuItem
                                  value={"category"}
                                  sx={{ fontSize: 13, color: "#5c6d8e" }}
                                >
                                  Catagory
                                </MenuItem>
                                <MenuItem
                                  value={"subCategory"}
                                  sx={{ fontSize: 13, color: "#5c6d8e" }}
                                >
                                  Sub Category
                                </MenuItem>
                              </Select>
                            </FormControl>
                          </div>
                          <div className="col-sm-6 col-md-3 mt-3 mb-1">
                            <p className="text-lightBlue mb-1">Operator</p>

                            <FormControl className="w-100 px-0" size="small">
                              <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={operator}
                                onChange={handleOperatorChange}
                                size="small"
                              >
                                <MenuItem
                                  value="equals"
                                  sx={{ fontSize: 13, color: "#5c6d8e" }}
                                >
                                  Equals
                                </MenuItem>
                                <MenuItem
                                  value={"notEquals"}
                                  sx={{ fontSize: 13, color: "#5c6d8e" }}
                                >
                                  Not Equals
                                </MenuItem>
                                <MenuItem
                                  value={"greaterThan"}
                                  sx={{ fontSize: 13, color: "#5c6d8e" }}
                                >
                                  Greater Than
                                </MenuItem>
                                <MenuItem
                                  value={"less"}
                                  sx={{ fontSize: 13, color: "#5c6d8e" }}
                                >
                                  Less
                                </MenuItem>
                              </Select>
                            </FormControl>
                          </div>
                          <div className="col-sm-6 col-md-3 mt-3 mb-1">
                            <p className="text-lightBlue mb-1">Value</p>

                            <FormControl className="w-100 px-0">
                              <OutlinedInput
                                placeholder="Enter Value"
                                size="small"
                                defaultValue="25000"
                                startAdornment={
                                  <InputAdornment position="start">
                                    <p className="text-lightBlue">₹</p>
                                  </InputAdornment>
                                }
                              />
                            </FormControl>
                          </div>
                          <div className="col-sm-6 col-md-3 mt-3 mb-1">
                            <button
                              className="button-gradient py-1 px-3 w-100 mb-2"
                              onClick={handleLikeApplyCondition}
                            >
                              <p>Apply</p>
                            </button>
                            <button
                              className="button-lightBlue-outline py-1 px-3 w-100"
                              onClick={handleLikeApplyCondition}
                            >
                              <p>Cancel</p>
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
              {likeProductRadio === "automated" && likeApplyCondition && (
                <>
                  <div className="col-12 mt-3">
                    <div className="row align-items-center">
                      <div className="col-md-9 px-md-0 py-2">
                        <Search className="mx-0">
                          <SearchIconWrapper>
                            <SearchIcon sx={{ color: "#c8d8ff" }} />
                          </SearchIconWrapper>
                          <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ "aria-label": "search" }}
                          />
                        </Search>
                      </div>
                      <div className="col-md-3 pe-md-0 py-2">
                        <button
                          className="button-gradient w-100 py-1 px-3"
                          onClick={toggleAddProductDrawer("right", true)}
                        >
                          <p>Add Products</p>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 px-0">
                    <TableContainer className="mt-3">
                      <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size="medium"
                      >
                        <EnhancedTableHead
                          numSelected={selected.length}
                          order={order}
                          orderBy={orderBy}
                          onSelectAllClick={handleLikeSelectAllClick}
                          onRequestSort={handleRequestSort}
                          rowCount={likeProductRows.length}
                          headCells={drawerHeadCells}
                        />
                        <TableBody>
                          {stableSort(
                            likeProductRows,
                            getComparator(order, orderBy)
                          )
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            .map((row, index) => {
                              const isItemSelected = isSelected(row.pId);
                              const labelId = `enhanced-table-checkbox-${index}`;

                              return (
                                <TableRow
                                  hover
                                  role="checkbox"
                                  aria-checked={isItemSelected}
                                  tabIndex={-1}
                                  key={row.pId}
                                  selected={isItemSelected}
                                >
                                  <TableCell padding="checkbox">
                                    <Checkbox
                                      color="primary"
                                      checked={isItemSelected}
                                      inputProps={{
                                        "aria-labelledby": labelId,
                                      }}
                                      size="small"
                                      onClick={(event) =>
                                        handleClick(event, row.pId)
                                      }
                                      style={{
                                        color: "#5C6D8E",
                                        marginRight: 0,
                                      }}
                                    />
                                  </TableCell>
                                  <TableCell
                                    component="th"
                                    id={labelId}
                                    scope="row"
                                    padding="none"
                                  >
                                    <div className="d-flex align-items-center my-2">
                                      <img
                                        src={ringSmall}
                                        alt="ringSmall"
                                        className="me-2"
                                        height={45}
                                        width={45}
                                      />
                                      <div>
                                        <p className="text-lightBlue fw-600">
                                          {row.productName}
                                        </p>
                                        <small className="mt-2 text-grey-6">
                                          SKU: TFDR012345
                                        </small>
                                      </div>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <p className="text-lightBlue">
                                      {row.category}
                                    </p>
                                  </TableCell>
                                  <TableCell>
                                    <div className="d-flex align-items-center c-pointer ">
                                      <p className="text-lightBlue">
                                        {row.price}
                                      </p>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div className="d-flex align-items-center c-pointer ">
                                      <img
                                        src={deleteButton}
                                        alt="deleteButton"
                                        width={75}
                                        className="c-pointer"
                                      />
                                    </div>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          {emptyRows > 0 && (
                            <TableRow
                              style={{
                                height: 53 * emptyRows,
                              }}
                            >
                              <TableCell colSpan={6} />
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      component="div"
                      count={rows.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      className="table-pagination"
                    />
                  </div>
                </>
              )}
              {likeProductRadio === "manual" && (
                <>
                  <img
                    src={featureUpload}
                    className="w-100 c-pointer px-0"
                    alt=""
                    onClick={toggleAddProductDrawer("right", true)}
                  />
                </>
              )}
            </div>
            <div className="mt-4">
              <SEO  
                seoName={collectionFormik.values.title} 
                seoValue={categorySeo} 
                handleSeoChange={setCategorySeo} 
                refrenceId={""}
              />
            </div>

            <SwipeableDrawer
              anchor="right"
              open={addProductDrawer["right"]}
              onClose={toggleAddProductDrawer("right", false)}
              onOpen={toggleAddProductDrawer("right", true)}
            >
              {/* {list()} */}
              <div className="d-flex justify-content-between py-3 ps-3 pe-2 me-1 align-items-center">
                <h6 className="text-lightBlue">Select Products</h6>
                <img
                  src={cancel}
                  alt="cancel"
                  className="c-pointer add-product-padding"
                  onClick={toggleAddProductDrawer("right", false)}
                />
              </div>
              <hr className="hr-grey-6 mt-3 mb-3" />
              <div className="px-3">
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon sx={{ color: "#c8d8ff" }} />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                  />
                </Search>
              </div>

              <TableContainer className="mt-3">
                <Table
                  sx={{ minWidth: 750 }}
                  aria-labelledby="tableTitle"
                  size="medium"
                >
                  <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                    headCells={likeHeadCells}
                  />
                  <TableBody>
                    {stableSort(rows, getComparator(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        const isItemSelected = isSelected(row.pId);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.pId}
                            selected={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                color="primary"
                                checked={isItemSelected}
                                inputProps={{
                                  "aria-labelledby": labelId,
                                }}
                                size="small"
                                onClick={(event) => handleClick(event, row.pId)}
                                style={{
                                  color: "#5C6D8E",
                                  marginRight: 0,
                                }}
                              />
                            </TableCell>
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                            >
                              <div className="d-flex align-items-center my-2">
                                <img
                                  src={ringSmall}
                                  alt="ringSmall"
                                  className="me-2"
                                  height={45}
                                  width={45}
                                />
                                <div>
                                  <p className="text-lightBlue fw-600">
                                    {row.productName}
                                  </p>
                                  <small className="mt-2 text-grey-6">
                                    SKU: TFDR012345
                                  </small>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <p className="text-lightBlue">{row.category}</p>
                            </TableCell>
                            <TableCell>
                              <div
                                className="d-flex align-items-center c-pointer "
                                aria-describedby={idPrice}
                                variant="contained"
                                onClick={handlePriceClick}
                              >
                                <p className="text-lightBlue">{row.price}</p>
                                <img
                                  className="ms-3"
                                  src={arrowDown}
                                  alt="arrowDown"
                                />
                              </div>
                              <Popover
                                anchorOrigin={{
                                  vertical: "bottom",
                                  horizontal: "center",
                                }}
                                transformOrigin={{
                                  vertical: "top",
                                  horizontal: "center",
                                }}
                                id={idPrice}
                                open={openPrice}
                                anchorEl={anchorPriceEl}
                                onClose={handlePriceClose}
                              >
                                <div className="px-3">
                                  <small className="text-lightBlue">
                                    Default : 12KT • Yellow • Gold • IJ-SI
                                  </small>
                                  <div className="d-flex align-items-center justify-content-between mb-2 mt-3 text-grey-6">
                                    <small>Metal Price</small>
                                    <small className="ms-2">
                                      ₹&nbsp;15,000
                                    </small>
                                  </div>
                                  <div className="d-flex align-items-center justify-content-between mb-2 mt-2 text-grey-6">
                                    <small>Diamond Price</small>
                                    <small className="ms-2">₹&nbsp;4,000</small>
                                  </div>
                                  <div className="d-flex align-items-center justify-content-between mb-2 mt-2 text-grey-6">
                                    <small>Making Charges</small>
                                    <small className="ms-2">₹&nbsp;1,000</small>
                                  </div>
                                  <div className="d-flex align-items-center justify-content-between mb-3 mt-2 text-grey-6">
                                    <small>GST</small>
                                    <small className="ms-2">
                                      ₹&nbsp;&nbsp;600
                                    </small>
                                  </div>
                                  <div className="d-flex align-items-center justify-content-between mb-2 mt-2">
                                    <p className="text-lightBlue">Total</p>
                                    <p className="ms-2 text-lightBlue fw-600">
                                      ₹&nbsp;20,600
                                    </p>
                                  </div>
                                </div>
                              </Popover>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow
                        style={{
                          height: 53 * emptyRows,
                        }}
                      >
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                className="table-pagination"
              />
              <div className="d-flex flex-column py-3 px-4 feature-buttons">
                <hr className="hr-grey-6 my-3 w-100" />
                <div className="d-flex justify-content-between">
                  <button className="button-gradient py-2 px-5 w-auto ">
                    <p>Add 4 Products</p>
                  </button>
                  <button className="button-lightBlue-outline py-2 px-4">
                    <p>Cancel</p>
                  </button>
                </div>
              </div>
            </SwipeableDrawer>
          </div>
          <div className="col-lg-3 mt-4 pe-0 ps-0 ps-lg-3">
            <StatusBox 
              showSchedule={true}
              name={"status"}
              value={collectionFormik?.values?.status} headingName={"Collection Status"} 
              titleName={"Collection"}
              handleProductStatus={handleProductStatus}
              startDate={startDate1}
              endDate={endDate1}
              handleStartDate={setStartDate}
              handleEndDate={setEndDate}
              clearDate={clearDate}
            />
            {/* <VisibilityBox name={"isVisibleFrontend"} onChange={handleVisiblility} value={collectionFormik?.values?.isVisibleFrontend} /> */}
            <div className="mt-4">
              <UploadMediaBox 
                name={"mediaUrl"}  
                value={collectionFormik?.values?.mediaUrl}  
                imageName={addMedia} 
                headingName={"Media"} 
                UploadChange={handleMediaUrl} 
                isUploaded={()=>{}}
              />
            </div>
             {/* {!!collectionFormik.touched.mediaUrl && collectionFormik.errors.mediaUrl && (
                <FormHelperText error>
                  {collectionFormik.errors.mediaUrl}
                </FormHelperText>
              )} */}
            <div className="mt-4">
              <UploadBanner imageName={addMedia} headingName={"Up Selling Banners"} />
            </div>
            <NotesBox 
              name={"notes"}
              onChange={collectionFormik.handleChange} 
              value={collectionFormik.values.notes}
            />
          </div>
        </div>
        <div className="row create-buttons pt-5 pb-3 justify-content-between">
          <div className="d-flex w-auto px-0">
            <button
              className="button-red-outline py-2 px-4"
              onClick={handleDiscard}
            >
              <p>Discard</p>
            </button>
          </div>
          <div className="d-flex w-auto px-0">
              <LoadingButton
                loading={createCollectionIsLoading}
                disabled={createCollectionIsLoading}
                className="button-gradient py-2 px-5"
                type="submit"
              >
                <p>Save</p>
              </LoadingButton>
          </div>
        </div>
      </div>
      <DiscardModal           
        showDiscardModal={showDiscardModal}
        toggleDiscardModal={toggleDiscardModal}
      />
    </form>
  );
};

export default CreateCollection;
