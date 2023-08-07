import { useState, useReducer, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { visuallyHidden } from "@mui/utils";
import { useFormik } from "formik";
import * as Yup from "yup";
import _ from "lodash";
import {
  Box,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  InputAdornment,
  OutlinedInput,
  Checkbox,
  FormControlLabel,
  Popover,
  TextareaAutosize,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  SwipeableDrawer,
  RadioGroup,
  Radio,
  TableHead,
  TableSortLabel,
  Tooltip,
} from "@mui/material";

import {
  showSuccess,
} from "../../../features/snackbar/snackbarAction";
import { 
  useCreateCustomerGroupMutation,
  useEditCustomerGroupMutation,
  useGetAllCustomerGroupQuery
} from "../../../features/customers/customerGroup/customerGroupApiSlice";

import StatusBox from "../../../components/StatusBox/StatusBox";
import TagsBox from "../../../components/TagsBox/TagsBox";
import AllUsersTable from "../AllUsers/AllUsersTable";
import SearchBorder from "../../../components/SearchBorder/SearchBorder";
import NotesBox from "../../../components/NotesBox/NotesBox";
import { SaveFooterTertiary } from "../../../components/SaveFooter/SaveFooter";
import { DiscardModalSecondary } from "../../../components/Discard/DiscardModal";

import "./CreateUserGroup.scss";

import arrowLeft from "../../../assets/icons/arrowLeft.svg";
import cancel from "../../../assets/icons/cancel.svg";
import arrowDown from "../../../assets/icons/arrowDown.svg";
import featureUpload from "../../../assets/images/products/featureUpload.svg";
import ringSmall from "../../../assets/images/ringSmall.svg";
import deleteWhite from "../../../assets/icons/deleteWhite.svg";
import editWhite from "../../../assets/icons/editWhite.svg";

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

const headCells = [
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

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all rows",
            }}
            size="small"
            style={{
              color: "#5C6D8E",
              marginRight: 0,
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              <p className="text-lightBlue">{headCell.label}</p>
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

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
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "Action",
  },
];

function LikeProductTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all rows",
            }}
            size="small"
            style={{
              color: "#5C6D8E",
              marginRight: 0,
            }}
          />
        </TableCell>
        {likeHeadCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              <p className="text-lightBlue">{headCell.label}</p>
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

LikeProductTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const customerGroupValidationSchema = Yup.object({
  name: Yup.string().trim().min(3).max(50).required("Required"),
});

const initialCustomerGroupState = {
  deleteIndex: null,
  confirmationMessage: "",
  showDeleteModal: false,
  isEditing: false,
};

const initialQueryFilterState = {
  pageSize: 1,
  pageNo: null,
  totalCount: 0,
};

const groupTabReducer = (state, action) => {
  if (action.type === "SET_DELETE") {
    return {
      ...state,
      deleteIndex: action.deleteIndex,
      confirmationMessage: action.message || "",
      showDeleteModal: true,
    };
  }
  if (action.type === "REMOVE_DELETE") {
    return {
      ...initialCustomerGroupState,
    };
  }
  if (action.type === "ENABLE_EDIT") {
    return {
      ...initialCustomerGroupState,
      isEditing: true,
    };
  }
  if (action.type === "DISABLE_EDIT") {
    return {
      ...initialCustomerGroupState,
      isEditing: false,
    };
  }

  return initialCustomerGroupState;
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

const CreateUserGroup = () => {
  let { id } = useParams();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [likeProductRadio, setLikeProductRadio] = useState("automated");
  const [likeMatchRadio, setLikeMatchRadio] = useState("allCondition");
  const [anchorPriceEl, setAnchorPriceEl] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("productName");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [field, setField] = useState("price");
  const [operator, setOperator] = useState("equals");
  const [checked, setChecked] = useState(false);
  const [likeAddCondition, setLikeAddCondition] = useState(false);
  const [likeApplyCondition, setLikeApplyCondition] = useState(false);
  const [addProductDrawer, setAddProductDrawer] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [queryFilterState, dispatchQueryFilter] = useReducer(
    queryFilterReducer,
    initialQueryFilterState
  );
  const [customerGroupState, dispatchCustomerGroup] = useReducer(
    groupTabReducer,
    initialCustomerGroupState
  );

  const {
    data: customerGroupData,
    isLoading: customerGroupIsLoading,
    isSuccess: customerGroupIsSuccess,
    error: customerGroupError,
  } = useGetAllCustomerGroupQuery({id: id},{ skip: id ? false : true});

  const [
    createCustomerGroup,
    {
      isLoading: createCustomerGroupIsLoading,
      isSuccess: createCustomerGroupIsSuccess,
      error: createCustomerGroupError,
    },
  ] = useCreateCustomerGroupMutation();

  const [
    editCustomerGroup,
    {
      data: editData,
      isLoading: editGroupIsLoading,
      isSuccess: editGroupIsSuccess,
      error: editGroupError,
    }
  ] = useEditCustomerGroupMutation();

  const customerGroupFormik = useFormik({
    initialValues: {
      name: customerGroupData?.data?.data[0]?.name || "",
      description: customerGroupData?.data?.data[0]?.description || "",
      addType: customerGroupData?.data?.data[0]?.addType || "manual",
      status: customerGroupData?.data?.data[0]?.status || "active",
      notes: customerGroupData?.data?.data[0]?.notes || "",
    },
    enableReinitialize: true,
    validationSchema: customerGroupValidationSchema,
    onSubmit: (values) => {
      for (const key in values) {
        if(values[key] === "" || values[key] === null){
          delete values[key] 
        }
      }
      if(!id) {
        createCustomerGroup(values)
        .unwrap()
        .then((res) => {
          navigate("/users/userGroups");
          dispatch(showSuccess({ message: "Custormer group created successfully" }));
        })
      } else {
        editCustomerGroup({
        id: id,
        details : values
      })
        .unwrap()
          .then(() => {
            dispatch(showSuccess({ message: "Custormer group edited successfully" }));
          });
      }
    },
  })

  useEffect(() => {
    if (id) {
      dispatchQueryFilter({ type: "SET_PAGE_NO", pageNo: id });
    }
  }, [id]);
  
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

  const backHandler = () => {
    navigate("/users/userGroups");
  };

  useEffect(() => {
    if (id && !_.isEqual(customerGroupFormik.values, customerGroupFormik.initialValues)) {
      dispatchCustomerGroup({ type: "ENABLE_EDIT" });
    } else if (id && _.isEqual(customerGroupFormik.values, customerGroupFormik.initialValues)) {
      dispatchCustomerGroup({ type: "DISABLE_EDIT" });
    }
  }, [customerGroupFormik.initialValues, customerGroupFormik.values, id]);

  return (
    <>
      <form noValidate onSubmit={customerGroupFormik.handleSubmit}>
        <div className="page container-fluid position-relative user-group">
          <div className="row justify-content-between">
            <div className="d-flex align-items-center w-auto ps-0">
              <Link to="/users/userGroups" className="d-flex">
                <img
                  src={arrowLeft}
                  alt="arrowLeft"
                  width={9}
                  className="c-pointer"
                />
              </Link>

              <h5 className="page-heading ms-2 ps-1">Create User Group</h5>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-lg-9 mt-3">
              <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes">
                <div className="col-md-12 px-0">
                  <p className="text-lightBlue mb-1">Group Name</p>
                  <FormControl className="w-100 px-0">
                    <OutlinedInput 
                      placeholder="Enter Group Name" 
                      size="small"
                      name="name" 
                      value={customerGroupFormik.values.name}
                      onChange={customerGroupFormik.handleChange}
                    />
                  </FormControl>
                  {!!customerGroupFormik.touched.name && customerGroupFormik.errors.name && (
                    <FormHelperText error>{customerGroupFormik.errors.name}</FormHelperText>
                  )}
                </div>
                <div className="col-md-12 mt-3 px-0">
                  <p className="text-lightBlue mb-1">Description</p>
                  <TextareaAutosize
                    name="description" 
                    value={customerGroupFormik.values.description}
                    onChange={customerGroupFormik.handleChange}
                    aria-label="meta description"
                    placeholder="Enter Short Description"
                    style={{
                      background: "#15142A",
                      color: "#c8d8ff",
                      borderRadius: 5,
                      padding: 10
                    }}
                    minRows={5}
                    className="w-100"
                  />
                </div>
              </div>

              <div className="bg-black-9 border-grey-5 rounded-8 p-3 row features mt-4">
                <div className="d-flex justify-content-between mb-2 px-0">
                  <h6 className="text-lightBlue me-auto text-lightBlue col-auto ps-0 fw-500">
                    Add User
                  </h6>
                </div>
                <div className="d-flex align-items-center col-12 px-0 mb-2">
                  <p className="text-grey-6 me-4 px-0">Select Users Through</p>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="addType" 
                    value={customerGroupFormik.values.addType}
                    onChange={customerGroupFormik.handleChange}
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
                              <Tooltip title="Edit" placement="top">
                                <img
                                  src={editWhite}
                                  alt="editWhite"
                                  width={30}
                                  className="hover-back c-pointer rounded-4 me-1"
                                />
                              </Tooltip>
                              <Tooltip title="Delete" placement="top">
                                <img
                                  src={deleteWhite}
                                  alt="deleteWhite"
                                  width={30}
                                  className="hover-back c-pointer rounded-4"
                                />
                              </Tooltip>
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
                                // onClick={handleLikeApplyCondition}
                              >
                                <p>Apply</p>
                              </button>
                              <button
                                className="button-lightBlue-outline py-1 px-3 w-100"
                                // onClick={handleLikeApplyCondition}
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
                        <div className="col-md-12 px-md-0 py-2">
                          <SearchBorder />
                        </div>
                      </div>
                    </div>
                    <div className="col-12 px-0 mt-2">
                      <AllUsersTable />
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

                <SearchBorder />

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
                    />
                    <TableBody>
                      {stableSort(rows, getComparator(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                                      <small className="ms-2">₹&nbsp;15,000</small>
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
            <div className="col-lg-3 mt-3 pe-0 ps-0 ps-lg-3">
              <StatusBox 
                headingName={"Group Status"} 
                value={customerGroupFormik?.values?.status}
                toggleData={["active", "in-active"]}
                handleProductStatus={(_, val) =>
                  customerGroupFormik.setFieldValue("status", val)
                }
              />
              <NotesBox
                name="notes"
                value={customerGroupFormik.values?.notes}
                onChange={customerGroupFormik.handleChange}
              />
            </div>
          </div>
          <div className="row create-buttons pt-5 pb-3 justify-content-between">
            <SaveFooterTertiary
              show={id ? customerGroupState.isEditing : true}
              onDiscard={backHandler}
              isLoading={createCustomerGroupIsLoading || editGroupIsLoading}
            />
          </div>
        </div>
      </form>
      <DiscardModalSecondary
        when={!_.isEqual(customerGroupFormik.values, customerGroupFormik.initialValues)}
        message="product tab"
      />
    </>
  );
};

export default CreateUserGroup;