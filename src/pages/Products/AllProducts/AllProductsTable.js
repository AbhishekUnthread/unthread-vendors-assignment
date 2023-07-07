import React from "react";
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
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DesktopDateTimePicker } from "@mui/x-date-pickers";
// ! MATERIAL ICONS IMPORTS
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import TableSearch from "../../../components/TableSearch/TableSearch";

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

const AllProductsTable = ({list,totalCount}) => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("productName");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

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

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
            <button
              className="button-grey py-2 px-3 ms-2"
              aria-describedby={idEditStatus}
              variant="contained"
              onClick={handleEditStatusClick}
            >
              <small className="text-lightBlue">Edit Status</small>
              <img src={arrowDown} alt="arrowDown" className="ms-2" />
            </button>
            <button
              className="button-grey py-2 px-3 ms-2"
              aria-describedby={idMassAction}
              variant="contained"
              onClick={handleMassActionClick}
            >
              <small className="text-lightBlue">Mass Action</small>
              <img src={arrowDown} alt="arrowDown" className="ms-2" />
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
              id={idEditStatus}
              open={openEditStatus}
              anchorEl={anchorEditStatusEl}
              onClose={handleEditStatusClose}
            >
              <div className="py-2 px-1">
                <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                  Set as Active
                </small>
                <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                  Set as Draft
                </small>
              </div>
            </Popover>

            <Popover
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              id={idMassAction}
              open={openMassAction}
              anchorEl={anchorMassActionEl}
              onClose={handleMassActionClose}
            >
              <div className="py-2 px-2">
                <small className="text-grey-7 px-2">ACTIONS</small>
                <hr className="hr-grey-6 my-2" />
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
                  Schedule Product
                </small>
                <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                  Add or Remove Tags
                </small>
                <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                  Add or Remove Collections
                </small>
                <div className="d-flex justify-content-between  hover-back rounded-3 p-2 c-pointer">
                  <small className="text-lightBlue font2 d-block">
                    Archive Product
                  </small>
                  <img src={deleteRed} alt="delete" className="" />
                </div>
              </div>
            </Popover>
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
            rowCount={rows.length}
            headCells={headCells}
          />
          <TableBody>
            {stableSort(list, getComparator(order, orderBy))
              ?.map((row, index) => {
                const isItemSelected = isSelected(row._id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.pId}
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
                          <p className="text-lightBlue fw-600">
                            {row?.title}
                          </p>
                          <small className="mt-2 text-grey-6">
                            SKU: TFDR012345
                          </small>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-lightBlue">{row?.productType?.category?.name}</p>
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
                    <TableCell>
                      <div className="d-flex align-items-center">
                      <div className="rounded-pill d-flex px-2 py-1 c-pointer statusBoxWidth" 
                          style={{background: 
                            row.status == "active" ? "#A6FAAF" : 
                            row.status == "in-active" ? "#F67476" : 
                            row.status == "archieved" ? "#C8D8FF" : "#FEE1A3"
                          }}>
                          <small className="text-black fw-500">
                            {
                              row.status == "active" ? "Active" :  
                              row.status == "in-active" ? "In-Active" : 
                              row.status == "archieved" ? "Archived" : "Scheduled"
                            }
                          </small>
                        </div>
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
                            <small className="text-lightBlue font2 d-block">
                              Archive Product
                            </small>
                            <img src={deleteRed} alt="delete" className="" />
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
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
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
    </React.Fragment>
  );
};

export default AllProductsTable;
