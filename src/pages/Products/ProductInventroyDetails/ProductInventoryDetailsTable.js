import React from "react";
import { Link } from "react-router-dom";
// ! COMPONENT IMPORTS
import {
  EnhancedTableHead,
  stableSort,
  getComparator,
} from "../../../components/TableDependencies/TableDependencies";
import TableEditStatusButton from "../../../components/TableEditStatusButton/TableEditStatusButton";
import TableMassActionButton from "../../../components/TableMassActionButton/TableMassActionButton";
import AppCountrySelect from "../../../components/AppCountrySelect/AppCountrySelect";
import ProductDrawerTable from "../ProductDrawerTable";
import TableSearch from "../../../components/TableSearch/TableSearch";
// !IMAGES IMPORTS
import storeIcon from "../../../assets/icons/storeIcon.svg";
import product2 from "../../../assets/images/products/product2.jpg";
import verticalDots from "../../../assets/icons/verticalDots.svg";
import editButton from "../../../assets/icons/editButton.svg";
import duplicateButton from "../../../assets/icons/duplicateButton.svg";
import deleteRed from "../../../assets/icons/delete.svg";
import teamMember1 from "../../../assets/images/products/teamMember1.svg";
import teamMember2 from "../../../assets/images/products/teamMember2.svg";
import teamMember3 from "../../../assets/images/products/teamMember3.svg";
import activity from "../../../assets/icons/activity.svg";
import cancel from "../../../assets/icons/cancel.svg";
import products from "../../../assets/icons/sidenav/products.svg";
import arrowDown from "../../../assets/icons/arrowDown.svg";
// ! MATERIAL IMPORTS
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Tooltip,
  Popover,
  SwipeableDrawer,
  TextField,
  MenuItem,
  Select,
  FormControl,
  OutlinedInput,
  InputAdornment,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DesktopDateTimePicker } from "@mui/x-date-pickers";
// ! MATERIAL ICONS IMPORTS
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InventoryIcon from "@mui/icons-material/Inventory";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";

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
function createData(sId, products, variants, qty) {
  return { sId, products, variants, qty };
}

const rows = [
  createData(1, "The Fringe Diamond Ring", "245", "452"),
  createData(2, "The Fringe Diamond Ring", "245", "452"),
  createData(3, "The Fringe Diamond Ring", "245", "452"),
  createData(4, "The Fringe Diamond Ring", "245", "452"),
  createData(5, "The Fringe Diamond Ring", "245", "452"),
  createData(6, "The Fringe Diamond Ring", "245", "452"),
];

const ProductInventoryDetailsTable = () => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("selectStore");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const headCells = [
    {
      id: "products",
      numeric: false,
      disablePadding: true,
      label: "Products",
    },
    {
      id: "variants",
      numeric: false,
      disablePadding: false,
      label: "Variants",
    },
    {
      id: "qty",
      numeric: false,
      disablePadding: true,
      label: "Total Qty",
    },
    {
      id: "activity",
      numeric: false,
      disablePadding: false,
      label: "Activity",
    },
    {
      id: "actions",
      numeric: false,
      disablePadding: true,
      label: "Add Quantity",
    },
  ];

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
      const newSelected = rows.map((n) => n.sId);
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
        <div className="d-flex align-items-center px-2 mb-3">
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
          <TableEditStatusButton />
          <TableMassActionButton />
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
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.sId);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.sId}
                    selected={isItemSelected}
                    className="table-rows"
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                        onClick={(event) => handleClick(event, row.sId)}
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
                      <Link
                        className="text-decoration-none"
                        to="/products/inventory/details"
                      >
                        <div className="d-flex align-items-center py-3">
                          <img
                            src={product2}
                            alt="product2"
                            className="me-2"
                            height={45}
                            width={45}
                          />
                          <div>
                            <p className="text-lightBlue rounded-circle fw-600">
                              {row.products}
                            </p>
                            <small className="text-grey-6 mt-1">
                              Style Code: TFDR012345
                            </small>
                          </div>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell style={{ width: 180 }}>
                      <p className="text-lightBlue">{row.variants}</p>
                    </TableCell>
                    <TableCell style={{ width: 140, padding: 0 }}>
                      <p className="text-lightBlue">{row.qty}</p>
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

                    <TableCell style={{ width: 140, padding: 0 }}>
                      <div className="d-flex align-items-center">
                        {/* <Tooltip title="Archive" placement="top">
                          <div className="table-edit-icon rounded-4 p-2">
                            <InventoryIcon
                              sx={{
                                color: "#5c6d8e",
                                fontSize: 18,
                                cursor: "pointer",
                              }}
                            />
                          </div>
                        </Tooltip> */}
                        <button
                          className="button-transparent border-grey-5 py-2 px-3"
                          onClick={toggleProductDrawer("right", true)}
                        >
                          <AddCircleIcon
                            sx={{
                              color: "#c8d8ff",
                              fontSize: 18,
                              cursor: "pointer",
                              // "&:hover": { color: "#c8d8ff" },
                              // "&:hover": { color: "#5c6d8e" },
                            }}
                          />
                          <p className="text-lightBlue ms-2">Add</p>
                        </button>
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
                <p className="text-lightBlue fw-600">Product Invnetory</p>
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
        className="role-drawer"
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
          <div className="d-flex align-items-center">
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
              <small className="text-grey-6 mt-1">Style Code: TFDR012345</small>
            </div>
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
                  <MenuItem value={10}>Super Admin</MenuItem>
                  <MenuItem value={20}>Admin</MenuItem>
                  <MenuItem value={30}>Project Manager</MenuItem>
                  <MenuItem value={40}>Ecommerce Manager</MenuItem>
                  <MenuItem value={50}>Digital Marketing</MenuItem>
                  <MenuItem value={60}>Client Relationships</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="col-12 d-flex justify-content-between align-items-center mt-3">
              <p className="text-lightBlue fw-50" style={{ width: 200 }}>
                Bulk Update Quantity
              </p>
              <div className="d-flex discount-inputs-two">
                <FormControl className="px-0">
                  <OutlinedInput
                    placeholder="Enter Quantity"
                    size="small"
                    endAdornment={
                      <InputAdornment
                        position="end"
                        aria-describedby={idDiscountPercent}
                        onClick={handleDiscountPercent}
                        className="c-pointer"
                      >
                        <span className="d-flex align-items-center">
                          <p className="text-lightBlue">Fixed</p>
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
                      Fixed
                    </small>
                    <small className="text-lightBlue rounded-3 p-2 hover-back d-block">
                      Increase
                    </small>
                    <small className="text-lightBlue rounded-3 p-2 hover-back d-block">
                      Decrease
                    </small>
                  </div>
                </Popover>
                <button className="button-gradient py-1 px-3 w-auto ms-2">
                  <p>Apply</p>
                </button>
              </div>
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
            <div className="col-12 mt-3">
              <ProductDrawerTable />
            </div>
          </div>
        </div>
        <div className="d-flex flex-column py-3 px-4 role-buttons">
          <hr className="hr-grey-6 my-3 w-100" />
          <div className="d-flex justify-content-between">
            <button
              className="button-gradient py-2 px-5 w-auto"
              onClick={toggleProductDrawer("right", false)}
            >
              <p>Add</p>
            </button>
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

export default ProductInventoryDetailsTable;
