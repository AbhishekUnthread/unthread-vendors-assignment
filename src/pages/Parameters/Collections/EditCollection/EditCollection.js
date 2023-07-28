import { useState, useEffect, useReducer, forwardRef } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams, useSearchParams, createSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import _ from "lodash";
import SearchIcon from "@mui/icons-material/Search";
import {
  FormControl,
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

import {
  EnhancedTableHead,
  stableSort,
  getComparator,
} from "../../../../components/TableDependencies/TableDependencies";
import {
  showSuccess,
  showError,
} from "../../../../features/snackbar/snackbarAction";
import {
  useGetAllCollectionsQuery,
  useCreateCollectionMutation,
  useEditCollectionMutation,
} from "../../../../features/parameters/collections/collectionsApiSlice";
import { updateCollectionId } from "../../../../features/parameters/collections/collectionSlice";

import AppTextEditor from "../../../../components/AppTextEditor/AppTextEditor";
import SEO from "../../../Products/AddProduct/SEO/SEO";
import NotesBox from "../../../../components/NotesBox/NotesBox";
import UploadMediaBox from "../../../../components/UploadMediaBox/UploadMediaBox";
import UploadBanner from "../../../../components/UploadBanner/UploadBanner";
import StatusBox from "../../../../components/StatusBox/StatusBox";
import VisibilityBox from '../../../../components/VisibilityBox/VisibilityBox';
import DuplicateCollection from "../DuplicateCollection/DuplicateCollectionModal";
import { DiscardModalSecondary } from "../../../../components/Discard/DiscardModal";
import { SaveFooterTertiary } from "../../../../components/SaveFooter/SaveFooter";

import "../../CreateCollection/CreateCollection.scss";

import info from "../../../../assets/icons/info.svg";
import cancel from "../../../../assets/icons/cancel.svg";
import arrowDown from "../../../../assets/icons/arrowDown.svg";
import featureUpload from "../../../../assets/images/products/featureUpload.svg";
import ringSmall from "../../../../assets/images/ringSmall.svg";
import deleteWhite from "../../../../assets/icons/deleteWhite.svg";
import editWhite from "../../../../assets/icons/editWhite.svg";
import deleteButton from "../../../../assets/icons/deleteButton.svg";
import addMedia from "../../../../assets/icons/addMedia.svg";
import paginationRight from "../../../../assets/icons/paginationRight.svg";
import paginationLeft from "../../../../assets/icons/paginationLeft.svg";
import arrowLeft from "../../../../assets/icons/arrowLeft.svg";

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

const initialQueryFilterState = {
  pageSize: 1,
  pageNo: null,
  totalCount: 0,
};

const initialCollectionInfoState = {
  confirmationMessage: "",
  isEditing: false,
  discard: false,
  initialInfo: null,
};

const queryFilterReducer = (state, action) => {
  if (action.type === "SET_PAGE_NO") {
    return {
      ...state,
      pageNo: +action.pageNo,
    };
  }
  if (action.type === "SET_TOTAL_COUNT") {
    return {
      ...state,
      totalCount: action.totalCount,
    };
  }
  return initialQueryFilterState;
};

const collectionTabReducer = (state, action) => {  
  if (action.type === "ENABLE_EDIT") {
    return {
      ...initialCollectionInfoState,
      isEditing: true,
    };
  }
  if (action.type === "DISABLE_EDIT") {
    return {
      ...initialCollectionInfoState,
      isEditing: false,
    };
  }
  if (action.type === "ENABLE_DISCARD") {
    return {
      ...state,
      discard: true,
    };
  }
  if (action.type === "DISABLE_DISCARD") {
    return {
      ...state,
      discard: false,
    };
  }
  return initialCollectionInfoState;
};

const EditCollection = () => {
  let { id, filter } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("productName");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [field, setField] = useState("price");
  const [operator, setOperator] = useState("equals");
  const [anchorPriceEl, setAnchorPriceEl] = useState(null);
  const [checked, setChecked] = useState(false);
  const [likeMatchRadio, setLikeMatchRadio] = useState("allCondition");
  const [likeProductRadio, setLikeProductRadio] = useState("automated");
  const [likeAddCondition, setLikeAddCondition] = useState(false);
  const [likeApplyCondition, setLikeApplyCondition] = useState(false);
  const [collectionDescription, setCollectionDescription] = useState("");
  const [hideFooter, setHideFooter] = useState(false);
  const [duplicateModal, setDuplicateModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [duplicateData, setDuplicateData] = useState("");
  const [queryFilterState, dispatchQueryFilter] = useReducer(
    queryFilterReducer,
    initialQueryFilterState
  );
  const [collectionInfoState, dispatchCollectionInfo] = useReducer(
    collectionTabReducer,
    initialCollectionInfoState
  );
  const [addProductDrawer, setAddProductDrawer] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const clearDate = () => {
    formik.setFieldValue("startDate", null);
    formik.setFieldValue("endDate", null);
  }; 

  const backHandler = () => {
    navigate({
      pathname: "/parameters/collections",
      search: `?${createSearchParams({ filter: searchParams.get("filter") })}`,
    });
  };

  const handleDuplicateCollectionClose = () => {
    setDuplicateModal(false)
  }

  const handleDuplicateCollection = (row) => {
    setDuplicateModal(true)
    setDuplicateData(row)
  }

  const {
    data: collectionData,
    isLoading: collectionIsLoading,
    isSuccess: collectionIsSuccess,
    error: collectionError,
  } = useGetAllCollectionsQuery({ id: id });

  const nextPageHandler = () => {
    const { pageNo, totalCount } = queryFilterState;
    if (pageNo+1 > totalCount) {
      return;
    }
    navigate(`/parameters/collections/edit/${pageNo + 1}/${filter}`);
  };

  const prevPageHandler = () => {
    const { pageNo } = queryFilterState;
    if (pageNo - 1 === 0) {
      return;
    }
    navigate(`/parameters/collections/edit/${pageNo - 1}/${filter}`);
  };  

  useEffect(() => {
      if (id) {
        dispatchQueryFilter({ type: "SET_PAGE_NO", pageNo: id });
      }
    }, [id]);

  const newCollectionData = collectionData?.data?.data[0];

  const [
    createCollection,
    {
      isLoading: createCollectionIsLoading,
      isSuccess: createCollectionIsSuccess,
      error: createCollectionError,
    },
  ] = useCreateCollectionMutation();

  const [
    editCollection,
    {
      data: editData,
      isLoading: editCollectionIsLoading,
      isSuccess: editCollectionIsSuccess,
      error: editCollectionError,
    }
  ] = useEditCollectionMutation();

  useEffect(() => {
    if (createCollectionError) {
      if (createCollectionError?.data?.message) {
        dispatch(showError({ message: createCollectionError.data.message }));
      } else {
        dispatch(
          showError({ message: "Failed to update Collection. Please try again." })
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
    const handleKeyDown = (event) => {
      setHideFooter(true);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []); 

  useEffect(() => {
    if (collectionDescription === "<p></p>") {
      formik.setFieldValue(
        "description",
        formik.values.description
      );
    }
    formik.setFieldValue("description", collectionDescription);
  }, [collectionDescription]);

  const formik = useFormik({
    initialValues: {
      title: collectionData?.data?.data[0]?.title || "",
      notes: collectionData?.data?.data[0]?.notes || "",
      status: collectionData?.data?.data[0]?.status,
      filter: collectionData?.data?.data[0]?.showFilter || false,
      description: collectionData?.data?.data?.[0]?.description || "<p></p>",
      seo: collectionData?.data?.data?.[0]?.seos || {},
      mediaUrl: collectionData?.data?.data[0]?.mediaUrl || "",
      startDate: collectionData?.data?.data?.[0]?.startDate || null,
      endDate: collectionData?.data?.data?.[0]?.endDate || null,
      mediaUrl: collectionData?.data?.data?.[0]?.mediaUrl || "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      let editItems = {
        showFilter: values.showFilter,
        title: values.title,
        description: values.description,
        status: values.startDate === null ? values.status : "scheduled",
        notes: values.notes,
      };
      if (!isEmpty(values.seo)) {
        for (const key in values.seo) {
          if(values.seo[key] === "" || values.seo[key] === null || values.seo[key] === []){
            delete values.seo[key] 
          }
        }
        editItems.seo = values.seo;
      }
      if (values.mediaUrl) {
        editItems.mediaUrl = values.mediaUrl;
      }
      if (values.startDate) {
        editItems.startDate = new Date(values.startDate);
      }
      if (values.endDate) {
        editItems.endDate = new Date(values.endDate);
      }

      if (id) {
        for (const key in editItems) {
          if(editItems[key] === "" || editItems[key] === null){
            delete editItems[key] 
          }
        }
        let obj={
          ...editItems,
        };

        editCollection({
          id: collectionData?.data?.data[0]?._id,
          details: obj,
        })
          .unwrap()
          .then(() => {
            dispatchCollectionInfo({ type: "DISABLE_EDIT" });
            dispatch(showSuccess({ message: "Collection edited successfully" }));
          });
      }
    },
  });

  useEffect(() => {
    if (id && !_.isEqual(formik.values, formik.initialValues)) {
      dispatchCollectionInfo({ type: "ENABLE_EDIT" });
      dispatchCollectionInfo({ type: "ENABLE_DISCARD" });
    } else if (id && _.isEqual(formik.values, formik.initialValues)) {
      dispatchCollectionInfo({ type: "DISABLE_EDIT" });
      dispatchCollectionInfo({ type: "DISABLE_DISCARD" });
    }
  }, [formik.initialValues, formik.values, id]);

  function isEmpty(obj) {
    for (var prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        return false;
      }
    }
    return true;
  }

  return (
    <div className="page container-fluid position-relative user-group">
      <div className="row justify-content-between">
        <div className="d-flex align-items-center w-auto ps-0">
            <img
              src={arrowLeft}
              alt="arrowLeft"
              width={9}
              className="c-pointer"
              onClick={backHandler}
            />
          <h5 className="page-heading ms-2 ps-1">{formik.values.title}</h5>
        </div>

        <div className="d-flex align-items-center w-auto pe-0">
          <button
            className="button-transparent me-1 py-2 px-3"
            onClick={() => {
              dispatch(updateCollectionId(collectionData?.data?.data[0]?._id));
              handleDuplicateCollection(newCollectionData)
            }}
          >
            <p className="text-lightBlue">Duplicate</p>
          </button>
          <img
            src={paginationLeft}
            alt="paginationLeft"
            className="c-pointer"
            width={30}
            onClick={prevPageHandler}
          />
          <img
            src={paginationRight}
            alt="paginationRight"
            className="c-pointer"
            width={30}
            onClick={nextPageHandler}
          />
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-lg-9 mt-4">
            <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes">
              <div className="col-md-12 px-0 mt-1">
                <div className="d-flex mb-1">
                  <p className="text-lightBlue me-2">Collection Title</p>
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
                    placeholder="Mirosa Collection"
                    size="small"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                  />
                </FormControl>
                <FormGroup>
                  <div className="d-flex align-items-center col-12 px-0">
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="filter"
                          checked={formik.values.filter}
                          onChange={formik.handleChange}
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
                    <span className="text-blue-2 c-pointer">(manage)</span>
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
                  value={formik.values.description}
                  setFieldValue={(val) => {
                    if (val == "") {
                      formik.setFieldValue("description", "<p></p>");
                      return;
                    }
                    formik.setFieldValue("description", val);
                  }}
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
                seoName={formik.values.title || ""} 
                seoValue={formik.values.seo} 
                handleSeoChange={(val) => {
                  formik.setFieldValue("seo", val)
                }} 
                refrenceId={id ? collectionData?.data?.data[0]?._id : ""}
              />
            </div>

            <SwipeableDrawer
              anchor="right"
              open={addProductDrawer["right"]}
              onClose={toggleAddProductDrawer("right", false)}
              onOpen={toggleAddProductDrawer("right", true)}
            >
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
              headingName={"Collection Status"}
              value={formik.values.status}
              handleProductStatus={(_, val) =>
                formik.setFieldValue("status", val)
              }
              toggleData={["active", "in-active"]}
              showSchedule={true}
              startDate={formik.values.startDate}
              endDate={formik.values.endDate}
              handleStartDate={(val) =>
                formik.setFieldValue("startDate", val)
              }
              handleEndDate={(val) =>
                formik.setFieldValue("endDate", val)
              }
              clearDate={clearDate}
            />
            {/* <VisibilityBox 
              value={collectionVisibility} 
              onChange={(_,val)=>setCollectionVisibility(val)}
            /> */}
            <div className="mt-4">
              <UploadMediaBox
                imageName={addMedia}
                headingName={"Media"}
                UploadChange={(url) =>
                  formik.setFieldValue("mediaUrl", url)
                }
                previousImage={formik.values.mediaUrl}
                isUploaded={() => {}}
              />
            </div>
            {/* <div className="mt-4">
              <UploadBanner 
                imageName={addMedia} 
                headingName={"Up Selling Banners"} 
              />
            </div> */}
            <NotesBox
              name={"notes"}
              value={formik.values.notes}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        <SaveFooterTertiary
          show={id ? collectionInfoState.isEditing : true}
          onDiscard={backHandler} 
          isLoading={editCollectionIsLoading}
        />  
        <DiscardModalSecondary when={collectionInfoState.discard} message="collection tab" />
      </form>
      <DuplicateCollection 
        duplicateData={duplicateData}
        openDuplicateCollection={duplicateModal}
        handleDuplicateCollectionClose={handleDuplicateCollectionClose}
      />
    </div>
  );
};

export default EditCollection;