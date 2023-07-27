import React, { forwardRef, useEffect, useState } from "react";
// ! COMPONENT IMPORTS
import AppCountrySelect from "../../../components/AppCountrySelect/AppCountrySelect";
import ProductDrawerTable from "../ProductDrawerTable";
import {
  EnhancedTableHead,
  stableSort,
  getComparator,
} from "../../../components/TableDependencies/TableDependencies";
// ! IMAGES IMPORTS
import teamMember1 from "../../../assets/images/products/teamMember1.svg";
import teamMember2 from "../../../assets/images/products/teamMember2.svg";
import teamMember3 from "../../../assets/images/products/teamMember3.svg";
import cancel from "../../../assets/icons/cancel.svg";
import verticalDots from "../../../assets/icons/verticalDots.svg";
import ringSmall from "../../../assets/images/ringSmall.svg";
import arrowDown from "../../../assets/icons/arrowDown.svg";
import activity from "../../../assets/icons/activity.svg";
import editButton from "../../../assets/icons/editButton.svg";
import duplicateButton from "../../../assets/icons/duplicateButton.svg";
import deleteRed from "../../../assets/icons/delete.svg";
import products from "../../../assets/icons/sidenav/products.svg";
import product2 from "../../../assets/images/products/product2.jpg";
// ! MATERIAL IMPORTS
import {
  Checkbox,
  Popover,
  SwipeableDrawer,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Select,
  FormControl,
  Slide,
  DialogContent,
  DialogActions,
  Dialog,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DesktopDateTimePicker } from "@mui/x-date-pickers";
// ! MATERIAL ICONS IMPORTS
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import TableSearch from "../../../components/TableSearch/TableSearch";
import UnArchivedModal from "../../../components/UnArchivedModal/UnArchivedModal";
import { useDispatch } from "react-redux";
import {
  showError,
  showSuccess,
} from "../../../features/snackbar/snackbarAction";
import unArchived from "../../../assets/images/Components/Archived.png";
import closeModal from "../../../assets/icons/closeModal.svg";
import TableEditStatusButton from "../../../components/TableEditStatusButton/TableEditStatusButton";
import TableMassActionButton from "../../../components/TableMassActionButton/TableMassActionButton";
import ArchiveModal, {
  MultipleArchiveModal,
} from "../../../components/ArchiveModal/ArchiveModal";
import UnArchiveModal, {
  MultipleUnArchiveModal,
} from "../../../components/UnArchiveModal/UnArchiveModal";
import moment from "moment";

const activityData = [
  {
    id: 1,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Changed Images",
  },
  {
    id: 2,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Changed Images",
  },
  {
    id: 3,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Changed Images",
  },
  {
    id: 4,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Changed Images",
  },
  {
    id: 5,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Changed Images",
  },
  {
    id: 6,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Changed Images",
  },
  {
    id: 7,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Changed Images",
  },
  {
    id: 8,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Changed Images",
  },
  {
    id: 9,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Changed Images",
  },
  {
    id: 10,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Changed Images",
  },
  {
    id: 11,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Changed Images",
  },
  {
    id: 12,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Changed Images",
  },
  {
    id: 13,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Changed Images",
  },
  {
    id: 14,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Changed Images",
  },
  {
    id: 15,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Changed Images",
  },
  {
    id: 16,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Changed Images",
  },
  {
    id: 17,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Changed Images",
  },
  {
    id: 18,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Changed Images",
  },
  {
    id: 19,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Changed Images",
  },
  {
    id: 20,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Changed Images",
  },
  {
    id: 21,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Changed Images",
  },
];

// ? TABLE STARTS HERE
function createData(pId, productName, category, qty, price, activity, status) {
  return { pId, productName, category, qty, price, activity, status };
}

const rows = [
  createData(
    1,
    "The Fringe Diamond Ring",
    "Gold Products",
    "in 14 Variants",
    "₹ 20,600 - ₹ 50,000",
    "SS, SB",
    "Active"
  ),
  createData(
    2,
    "Fringe Diamond Ring",
    "Gold Products",
    "in 14 Variants",
    "₹ 20,600 - ₹ 50,000",
    "SS, SB",
    "Active"
  ),
  createData(
    3,
    "The Fringe Diamond Ring",
    "Gold Products",
    "in 14 Variants",
    "₹ 20,600 - ₹ 50,000",
    "SS, SB",
    "Active"
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
    id: "qty",
    numeric: false,
    disablePadding: false,
    label: "Qty",
  },
  {
    id: "price",
    numeric: false,
    disablePadding: false,
    label: "Price",
  },
  {
    id: "activity",
    numeric: false,
    disablePadding: false,
    label: "Activity",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "actions",
    numeric: false,
    disablePadding: true,
    label: "",
  },
];

// ? TABLE ENDS HERE
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AllProductsTable = ({
  list,
  totalCount,
  rowsPerPage,
  changeRowsPerPage,
  changePage,
  page,
  editProduct,
  bulkEdit,
  archived = true,
}) => {
  const dispatch = useDispatch();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("productName");
  const [selected, setSelected] = React.useState([]);
  const [showArchivedModal, setShowArchivedModal] = useState(false);
  const [rowData, setRowData] = useState({});
  const [handleStatusValue, setHandleStatusValue] = useState("in-active");
  const [showUnArchivedModal, setShowUnArchivedModal] = useState(false);
  const [showMultipleDeleteModal, setShowMultipleDeleteModal] = useState(false);
  const [showMultipleArchivedModal, setShowMultipleArchivedModal] =
    useState(false);
  const [showMultipleUnArhcivedModal, setShowMultipleUnArhcivedModal] =
    useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [forMassAction, setForMassAction] = React.useState(false);
  const [massActionStatus, setMassActionStatus] = React.useState("");

  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
  };

  useEffect(() => {
    // Update the state only if the selectedStatus state has a value
    if (selectedStatus !== null) {
      const newState = selected.map((id) => {
        if (selectedStatus === "Set as Active") {
          return {
            id,
            status: "active",
          };
        } else if (selectedStatus === "Set as Archived") {
          return {
            id,
            status: "archived",
          };
        } else if (selectedStatus === "Set as in-Active") {
          return {
            id,
            status: "in-active",
          };
        } else if (selectedStatus === "Set as Un-Archived") {
          return {
            id,
            status: handleStatusValue,
          };
        } else {
          return {
            id,
            status: "", // Set a default value here if needed
          };
        }
      });
      bulkEdit({ updates: newState })
        .unwrap()
        .then(() => {
          const successMessage =
            selectedStatus === "Set as Un-Archived"
              ? "Products un-archived  successfully"
              : selectedStatus === "Set as Archived"
              ? "Products archived  successfully"
              : "Status updated successfully";
          dispatch(
            showSuccess({
              message: successMessage,
            })
          );
        });
      setSelectedStatus(null);
      setSelected([]);
    }
  }, [selected, selectedStatus]);

  const toggleArchiveModalHandler = (row) => {
    setRowData(row);
    if (selected.length === 0) {
      setShowArchivedModal((prevState) => !prevState);
    } else {
      setShowMultipleArchivedModal((prevState) => !prevState);
    }
  };

  const toggleDeleteModalHandler = (row) => {
    setRowData(row);
    if (selected.length === 0) {
      setShowDeleteModal((prevState) => !prevState);
    } else {
      setShowMultipleDeleteModal((prevState) => !prevState);
    }
  };

  const toggleUnArchiveModalHandler = (row) => {
    setRowData(row);
    if (selected.length === 0) {
      setShowUnArchivedModal((prevState) => !prevState);
    } else {
      setShowMultipleUnArhcivedModal((prevState) => !prevState);
    }
  };

  function handleArchive() {
    setShowArchivedModal(false);
    setShowMultipleArchivedModal(false);
    if (forMassAction === true) {
      setSelectedStatus(massActionStatus);
      return;
    }

    editProduct({
      id: rowData._id,
      details: {
        status: "archived",
      },
    })
      .unwrap()
      .then(() => {
        dispatch(showSuccess({ message: "Product Archived successfully" }));
      })
      .catch((err) => {
        dispatch(showError({ message: err?.data?.message }));
      });
  }

  function handleUnArchived() {
    setShowUnArchivedModal(false);
    setShowMultipleUnArhcivedModal(false);
    if (forMassAction === true) {
      setSelectedStatus(massActionStatus);
      return;
    }
    editProduct({
      id: rowData._id,
      details: {
        status: handleStatusValue,
      },
    });
    dispatch(showSuccess({ message: "Product un-archived Successfully" }));
  }

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

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // * EDIT STATUS POPOVERS STARTS
  const [anchorEditStatusEl, setAnchorEditStatusEl] = React.useState(null);
  const handleEditStatusClick = (event) => {
    setAnchorEditStatusEl(event.currentTarget);
  };
  const handleEditStatusClose = () => {
    setAnchorEditStatusEl(null);
  };
  const openEditStatus = Boolean(anchorEditStatusEl);
  const idEditStatus = openEditStatus ? "simple-popover" : undefined;
  // * EDIT STATUS POPOVERS ENDS

  // * MASS ACTION POPOVERS STARTS
  const [anchorMassActionEl, setAnchorMassActionEl] = React.useState(null);
  const handleMassActionClick = (event) => {
    setAnchorMassActionEl(event.currentTarget);
  };
  const handleMassActionClose = () => {
    setAnchorMassActionEl(null);
  };
  const openMassAction = Boolean(anchorMassActionEl);
  const idMassAction = openMassAction ? "simple-popover" : undefined;
  // * MASS ACTION POPOVERS ENDS

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

  // * ACTION POPOVERS STARTS
  const [anchorActionEl, setAnchorActionEl] = React.useState(null);

  const handleActionClick = (event) => {
    setAnchorActionEl(event.currentTarget);
  };

  const handleActionClose = () => {
    setAnchorActionEl(null);
  };

  const openActions = Boolean(anchorActionEl);
  const idActions = openActions ? "simple-popover" : undefined;
  // * ACTION POPOVERS ENDS

  // ? DATE PICKER STARTS

  const [activityDateValue, setActivityDateValue] = React.useState(
    // moment()
    new Date()
  );

  const handleActivityDateChange = (newValue) => {
    setActivityDateValue(newValue);
  };

  // ? DATE PICKER ENDS

  // ? ACTIVITY DRAWER STARTS HERE
  const [activityDrawer, setActivityDrawer] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleActivityDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setActivityDrawer({ ...activityDrawer, [anchor]: open });
  };
  // ? ACTIVITY DRAWER ENDS HERE

  // ? POPOVERS STARTS HERE

  // * ACTIVITY POPOVERS STARTS
  const [anchorActivityEl, setAnchorActivityEl] = React.useState(null);
  const handleActivityClick = (event) => {
    setAnchorActivityEl(event.currentTarget);
  };
  const handleActivityClose = () => {
    setAnchorActivityEl(null);
  };
  const openActivity = Boolean(anchorActivityEl);
  const idActivity = openActivity ? "simple-popover" : undefined;
  // * ACTIVITY POPOVERS ENDS

  // ? PRODUCT DRAWER STARTS HERE

  const [addProductDrawer, setAddProductDrawer] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleProductDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setAddProductDrawer({ ...addProductDrawer, [anchor]: open });
  };
  // ? PRODUCT DRAWER ENDS HERE

  // * METAL FILTER POPOVERS STARTS
  const [anchorMetalFilterEl, setAnchorMetalFilterEl] = React.useState(null);
  const handleMetalFilter = (event) => {
    setAnchorMetalFilterEl(event.currentTarget);
  };
  const handleMetalFilterClose = () => {
    setAnchorMetalFilterEl(null);
  };
  const openMetalFilter = Boolean(anchorMetalFilterEl);
  const idMetalFilter = openMetalFilter ? "simple-popover" : undefined;
  // * METAL FILTER POPOVERS ENDS

  const handleMassAction = (status) => {
    setMassActionStatus(status);
    setForMassAction(true);
    if (status === "Set as Archived") {
      setShowMultipleArchivedModal(true);
    } else if (status === "Set as Un-Archived") {
      setShowMultipleUnArhcivedModal(true);
    } else if (status === "Delete") {
      setShowMultipleDeleteModal(true);
    }
  };

  return (
    <React.Fragment>
      {selected.length > 0 && (
        <div className="d-flex justify-content-between align-items-center px-2 mb-3">
          <div className="d-flex">
            <button className="button-grey py-2 px-3">
              <small className="text-lightBlue">
                {selected.length} products are selected&nbsp;
                <span
                  className="text-blue-2 c-pointer"
                  onClick={() => setSelected([])}
                >
                  (Clear Selection)
                </span>
              </small>
            </button>

            <button className="button-grey py-2 px-3 ms-2">
              <small className="text-lightBlue">Edit Products</small>
            </button>
            <TableEditStatusButton
              onSelect={handleStatusSelect}
              defaultValue={["Set as Active", "Set as in-Active"]}
              headingName="Edit Status"
            />
            <TableMassActionButton
              headingName="Mass Action"
              onSelect={handleMassAction}
              defaultValue={
                archived
                  ? ["Edit", "Set as Archived"]
                  : ["Delete", "Set as Un-Archived"]
              }
            />
          </div>
        </div>
      )}
      <TableContainer>
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
            rowCount={list.length}
            headCells={headCells}
          />
          <TableBody>
            {stableSort(list, getComparator(order, orderBy))?.map(
              (row, index) => {
                // console.log(row)
                const isItemSelected = isSelected(row._id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={index}
                    selected={isItemSelected}
                    className="table-rows"
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                        onClick={(event) => handleClick(event, row._id)}
                        size="small"
                        style={{
                          color: "#5C6D8E",
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      <div className="d-flex align-items-center py-3">
                        <img
                          src={row?.image || ringSmall}
                          alt="ringSmall"
                          className="me-2"
                          height={45}
                          width={45}
                        />
                        <div>
                          <p className="text-lightBlue fw-600">{row?.title}</p>
                          <small className="mt-2 text-grey-6">
                            SKU: TFDR012345
                          </small>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-lightBlue">
                        {row?.productType?.category?.name}
                      </p>
                    </TableCell>
                    <TableCell>
                      <div className="d-flex align-items-center">
                        <p className="text-decoration-underline text-blue-2">
                          1452
                        </p>
                        &nbsp;
                        <p className="text-lightBlue"> {row?.qty}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div
                        className="d-flex align-items-center c-pointer "
                        aria-describedby={idPrice}
                        variant="contained"
                        onClick={handlePriceClick}
                      >
                        <p className="text-lightBlue">{row?.price?.price}</p>
                        <img className="ms-3" src={arrowDown} alt="arrowDown" />
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
                        <div className="py-2 px-2">
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
                            <small className="ms-2">₹&nbsp;&nbsp;600</small>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mt-2">
                            <p className="text-lightBlue">Total</p>
                            <p className="ms-2 text-lightBlue fw-600">
                              ₹&nbsp;20,600
                            </p>
                          </div>
                        </div>
                      </Popover>
                    </TableCell>
                    <TableCell>
                      <div
                        className="d-flex c-pointer"
                        onClick={toggleActivityDrawer("right", true)}
                        // onMouseEnter={handleActivityPopoverOpen}
                        // onMouseLeave={handleActivityPopoverClose}
                      >
                        <img src={teamMember1} alt="teamMember1" />
                        <img src={teamMember3} alt="teamMember2" />
                        <img src={teamMember2} alt="teamMember3" />
                      </div>
                    </TableCell>
                    <TableCell style={{ width: 180, padding: 0 }}>
                      <div className="d-block">
                        <div
                          className="rounded-pill d-flex px-2 py-1  statusBoxWidth"
                          style={{
                            background:
                              row.status == "active"
                                ? "#A6FAAF"
                                : row.status == "in-active"
                                ? "#F67476"
                                : row.status == "archived"
                                ? "#C8D8FF"
                                : "#FEE1A3",
                          }}
                        >
                          <small className="text-black fw-500">
                            {row.status == "active"
                              ? "Active"
                              : row.status == "in-active"
                              ? "In-Active"
                              : row.status == "archived"
                              ? "Archived"
                              : "Scheduled"}
                          </small>
                        </div>
                        {row.status == "scheduled" && (
                          <div>
                            <small className="text-blue-2">
                              {row.startDate && (
                                <>
                                  for{" "}
                                  {moment(row.startDate).format("DD/MM/YYYY")}
                                </>
                              )}
                              {row.startDate && row.endDate && " "}
                              {row.endDate && (
                                <>
                                  till{" "}
                                  {moment(row.endDate).format("DD/MM/YYYY")}
                                </>
                              )}
                            </small>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell style={{ width: 80, padding: 0 }}>
                      <div className="d-flex align-items-center">
                        <Tooltip title="View" placement="top">
                          <div className="table-edit-icon rounded-4 p-2">
                            <VisibilityOutlinedIcon
                              sx={{
                                color: "#5c6d8e",
                                fontSize: 18,
                                cursor: "pointer",
                              }}
                              onClick={toggleProductDrawer("right", true)}
                            />
                          </div>
                        </Tooltip>
                        <img
                          src={verticalDots}
                          alt="verticalDots"
                          className="c-pointer"
                          aria-describedby={idActions}
                          variant="contained"
                          onClick={handleActionClick}
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
                        id={idActions}
                        open={openActions}
                        anchorEl={anchorActionEl}
                        onClose={handleActionClose}
                      >
                        <div className="py-2 px-2">
                          <small className="text-grey-7 px-2">ACTIONS</small>
                          <hr className="hr-grey-6 my-2" />
                          <div className="d-flex align-items-center justify-content-between mb-2 mt-2 text-blue-1">
                            <img
                              src={editButton}
                              alt="editButton"
                              height={36}
                              className="c-pointer me-2"
                            />
                            <img
                              src={duplicateButton}
                              alt="duplicateButton"
                              height={36}
                              className="c-pointer"
                            />
                          </div>
                          <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                            Make it Active
                          </small>
                          <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                            Make it Draft
                          </small>
                          <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                            Edit SKU
                          </small>
                          <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                            Edit Quantity
                          </small>
                          <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                            Add or Remove Tags
                          </small>
                          <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                            Add or Remove Collections
                          </small>
                          <div className="d-flex justify-content-between  hover-back rounded-3 p-2 c-pointer">
                            <small
                              onClick={() => {
                                if (archived) {
                                  toggleArchiveModalHandler(row);
                                } else {
                                  toggleUnArchiveModalHandler(row);
                                }
                              }}
                              className="text-lightBlue font2 d-block"
                            >
                              {archived
                                ? " Archive Product"
                                : "Un-Archive Product"}
                            </small>
                            <img src={deleteRed} alt="delete" className="" />
                          </div>
                        </div>
                      </Popover>
                    </TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page - 1}
        onPageChange={changePage}
        onRowsPerPageChange={changeRowsPerPage}
        className="table-pagination"
      />

      <SwipeableDrawer
        anchor="right"
        open={activityDrawer["right"]}
        onClose={toggleActivityDrawer("right", false)}
        onOpen={toggleActivityDrawer("right", true)}
      >
        <div className="px-3 activity-top bg-black-13 pb-3">
          <div className="d-flex justify-content-between py-3 px-0">
            <h6 className="text-lightBlue">View Logs</h6>
            <img
              src={cancel}
              alt="cancel"
              className="c-pointer filter-icon me-1"
              onClick={toggleActivityDrawer("right", false)}
            />
          </div>

          <div className="d-flex align-items-center">
            <div className="d-flex align-items-center">
              <img
                src={products}
                alt="user"
                className="me-2"
                height={30}
                width={30}
              />
              <div>
                <p className="text-lightBlue fw-600">Product Module</p>
                <small className="mt-2 text-grey-6">
                  Last modified on 10 Dec, 2022 by Saniya Shaikh
                </small>
              </div>
            </div>
            <div className="d-flex ms-5">
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDateTimePicker
                  value={activityDateValue}
                  onChange={(newValue) => {
                    handleActivityDateChange(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      placeholder="Enter Date & Time"
                      sx={{ width: 210 }}
                    />
                  )}
                />
              </LocalizationProvider>
            </div>
          </div>

          <div className="d-flex mt-3 ">
            <TableSearch />

            <button
              className="button-grey py-2 px-3"
              aria-describedby={idActivity}
              variant="contained"
              onClick={handleActivityClick}
            >
              <small className="text-lightBlue">Activity</small>
              <img src={activity} alt="activity" className="ms-2" />
            </button>

            <Popover
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              id={idActivity}
              open={openActivity}
              anchorEl={anchorActivityEl}
              onClose={handleActivityClose}
            >
              <div className="py-2 px-1">
                <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                  Viewed User
                </small>
                <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                  Edited User
                </small>
                <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                  Updated User Status
                </small>
                <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                  Archive User
                </small>
                <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                  Added Comments
                </small>
              </div>
            </Popover>
          </div>
        </div>

        <div className="">
          <table className="table table-borderless activity-table">
            <thead className="">
              <tr className="bg-black-15">
                <th scope="col">
                  <small className="text-lightBlue fw-400"></small>
                </th>
                <th scope="col">
                  <small className="text-lightBlue fw-400">User</small>
                </th>
                <th scope="col">
                  <small className="text-lightBlue fw-400">Activity</small>
                </th>
                <th scope="col">
                  <small className="text-lightBlue fw-400">Date and Time</small>
                </th>
                <th scope="col">
                  <small className="text-lightBlue fw-400"></small>
                </th>
              </tr>
            </thead>
            <tbody>
              {activityData.map((data) => (
                <tr key={data.id}>
                  {/* DONOT REMOVE THIS BLANK COLUMN DONE FOR STYLING */}
                  <td>
                    <small className="text-grey-6 fw-400"></small>
                  </td>
                  {/* DONOT REMOVE THIS BLANK COLUMN DONE FOR STYLING */}
                  <th scope="row">
                    <div className="d-flex align-items-center">
                      <img
                        src={teamMember1}
                        alt="teamMember1"
                        className="me-2"
                      />
                      <small className="text-lightBlue fw-400">
                        {data.user}
                      </small>
                    </div>
                  </th>
                  <td>
                    <small className="text-lightBlue">{data.activity}</small>
                  </td>
                  <td>
                    <small className="text-grey-6 fw-400">
                      {data.dateAndTime}
                    </small>
                  </td>
                  {/* DONOT REMOVE THIS BLANK COLUMN DONE FOR STYLING */}
                  <td>
                    <small className="text-grey-6 fw-400"></small>
                  </td>
                  {/* DONOT REMOVE THIS BLANK COLUMN DONE FOR STYLING */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SwipeableDrawer>

      <SwipeableDrawer
        anchor="right"
        open={addProductDrawer["right"]}
        onClose={toggleProductDrawer("right", false)}
        onOpen={toggleProductDrawer("right", true)}
        className="product-drawer"
      >
        <div className="d-flex align-items-center pt-3 px-3">
          <KeyboardArrowLeftOutlinedIcon
            sx={{ fontSize: 25, color: "#c8d8ff" }}
            onClick={toggleProductDrawer("right", false)}
            className="c-pointer"
          />
          {/* <div>
            <h5 className="text-lightBlue fw-500 ms-2">Add Team Member</h5>
          </div> */}
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex">
              <img
                src={product2}
                alt="product2"
                className="me-2 rounded-8 ms-2"
                height={45}
                width={45}
              />
              <div>
                <p className="text-lightBlue rounded-circle fw-600">
                  The Fringe Diamond Ring
                </p>
                <small className="text-grey-6 mt-1">
                  Style Code: TFDR012345
                </small>
              </div>
            </div>
            {/* <button
              className="button-transparent py-2 px-3 border-grey-5"
            > */}
            <Tooltip title="Edit" placement="top">
              <div className="table-edit-icon rounded-4 p-2 ms-3">
                <EditOutlinedIcon
                  sx={{
                    color: "#6e8dd7",
                    fontSize: 18,
                    cursor: "pointer",
                  }}
                />
              </div>
            </Tooltip>
            {/* <p className="text-lightBlue">Open Bulk Editor</p> */}
            {/* </button> */}
          </div>
        </div>
        <div className="px-3">
          <hr className="hr-grey-6 mt-3 mb-3" />
        </div>
        <div className="px-3">
          <div className="row">
            <div className="col-4">
              <AppCountrySelect />
            </div>
            <div className="col-8">
              <FormControl sx={{ width: "100%" }} size="small">
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  // value={metal}
                  placeholder="Fixed"
                  // onChange={handleMetalChange}
                >
                  <MenuItem value={10}>Store 1</MenuItem>
                  <MenuItem value={20}>Store 2</MenuItem>
                  <MenuItem value={30}>Store 3</MenuItem>
                  <MenuItem value={40}>Store 4</MenuItem>
                  <MenuItem value={50}>Store 5</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="d-flex col-12 justify-content-between align-items-center mt-3">
              <div className="d-flex">
                <p className="text-lightBlue py-1 me-2">Filter:</p>
                <p
                  className="text-blue-2 px-2 py-1 c-pointer hover-back-transparent rounded-3"
                  aria-describedby={idMetalFilter}
                  variant="contained"
                  onClick={handleMetalFilter}
                >
                  Size
                </p>
                <p
                  className="text-blue-2 px-2 py-1 c-pointer hover-back-transparent rounded-3"
                  aria-describedby={idMetalFilter}
                  variant="contained"
                  onClick={handleMetalFilter}
                >
                  Metal
                </p>
                <p
                  className="text-blue-2 px-2 py-1 c-pointer hover-back-transparent rounded-3"
                  aria-describedby={idMetalFilter}
                  variant="contained"
                  onClick={handleMetalFilter}
                >
                  Metal Purity
                </p>
                <p
                  className="text-blue-2 px-2 py-1 c-pointer hover-back-transparent rounded-3"
                  aria-describedby={idMetalFilter}
                  variant="contained"
                  onClick={handleMetalFilter}
                >
                  Diamond
                </p>

                <Popover
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  id={idMetalFilter}
                  open={openMetalFilter}
                  anchorEl={anchorMetalFilterEl}
                  onClose={handleMetalFilterClose}
                >
                  <FormGroup className="tags-checkbox py-2">
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          style={{
                            color: "#5C6D8E",
                          }}
                        />
                      }
                      label="Content 1"
                      className="hover-back rounded-3 mx-0 pe-2"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          style={{
                            color: "#5C6D8E",
                          }}
                        />
                      }
                      label="Content 2"
                      className="hover-back rounded-3 mx-0 pe-2"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          style={{
                            color: "#5C6D8E",
                          }}
                        />
                      }
                      label="Content 3"
                      className="hover-back rounded-3 mx-0 pe-2"
                    />
                  </FormGroup>
                </Popover>
              </div>
            </div>
            <div className="col-12 mt-3 px-0">
              <ProductDrawerTable />
            </div>
          </div>
        </div>
        <div className="d-flex flex-column py-3 px-4 product-buttons">
          <hr className="hr-grey-6 my-3 w-100" />
          <div className="d-flex justify-content-between">
            {/* <button
              className="button-gradient py-2 px-5 w-auto"
              onClick={toggleProductDrawer("right", false)}
            >
              <p>Add</p>
            </button> */}
            <button
              className="button-lightBlue-outline py-2 px-4"
              onClick={toggleProductDrawer("right", false)}
            >
              <p>Cancel</p>
            </button>
          </div>
        </div>
      </SwipeableDrawer>
      <ArchiveModal
        onConfirm={handleArchive}
        onCancel={toggleArchiveModalHandler}
        show={showArchivedModal}
        title={"Product"}
        message={rowData?.title}
        products={""}
      />

      <MultipleArchiveModal
        onConfirm={handleArchive}
        onCancel={toggleArchiveModalHandler}
        show={showMultipleArchivedModal}
        title={"Product"}
        message={`${
          selected.length === 1
            ? `${selected.length} Product`
            : `${selected.length} Products`
        }`}
        pronoun={`${selected.length === 1 ? "this" : `these`}`}
      />
      <UnArchiveModal
        onConfirm={handleUnArchived}
        onCancel={() => setShowUnArchivedModal(false)}
        show={showUnArchivedModal}
        title={"Un-Archive Product ?"}
        primaryMessage={`Before un-archiving <span class='text-blue-1'>${rowData?.title}</span> Product,
        `}
        secondaryMessage={"Please set its status"}
        confirmText={"Un-Archive"}
        handleStatusValue={(val) => setHandleStatusValue(val)}
        icon={unArchived}
      />
      <MultipleUnArchiveModal
        onConfirm={handleUnArchived}
        onCancel={() => setShowMultipleUnArhcivedModal(false)}
        show={showMultipleUnArhcivedModal}
        title={"Un-Archive Products ?"}
        primaryMessage={`Before un-archiving <span class='text-blue-1'>${
          selected.length
        }</span> ${selected.length === 1 ? " Product" : "Products"},
        `}
        secondaryMessage={"Please set its status"}
        confirmText={"Un-Archive"}
        handleStatusValue={(val) => setHandleStatusValue(val)}
        icon={unArchived}
      />
    </React.Fragment>
  );
};

export default AllProductsTable;
