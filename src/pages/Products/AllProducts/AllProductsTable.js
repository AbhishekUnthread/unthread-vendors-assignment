import React from "react";
import PropTypes from "prop-types";
// ! IMAGES IMPORTS
import teamMember1 from "../../../assets/images/products/teamMember1.svg";
import teamMember2 from "../../../assets/images/products/teamMember2.svg";
import teamMember3 from "../../../assets/images/products/teamMember3.svg";
import cancel from "../../../assets/icons/cancel.svg";
import verticalDots from "../../../assets/icons/verticalDots.svg";
import ringSmall from "../../../assets/images/ringSmall.svg";
import arrowDown from "../../../assets/icons/arrowDown.svg";
import arrowDownBlack from "../../../assets/icons/arrowDownBlack.svg";
import sortBy from "../../../assets/icons/sortBy.svg";
import activity from "../../../assets/icons/activity.svg";
import editButton from "../../../assets/icons/editButton.svg";
import duplicateButton from "../../../assets/icons/duplicateButton.svg";
import deleteRed from "../../../assets/icons/delete.svg";
// ! MATERIAL IMPORTS
import {
  Box,
  Checkbox,
  Popover,
  SwipeableDrawer,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";

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
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all rows",
            }}
            size="small"
            style={{
              color: "#5C6D8E",
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
            {headCell.id !== "actions" && (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                <p className="text-lightBlue">{headCell.label}</p>
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            )}
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
// ? TABLE ENDS HERE

const AllProductsTable = () => {
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
                    Archived Product
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
                    className="table-rows"
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                        onClick={(event) => handleClick(event, row.pId)}
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
                      <div className="d-flex align-items-center">
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
                      <div className="d-flex align-items-center">
                        <p className="text-decoration-underline text-blue-2">
                          1452
                        </p>
                        &nbsp;
                        <p className="text-lightBlue"> {row.qty}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div
                        className="d-flex align-items-center c-pointer "
                        aria-describedby={idPrice}
                        variant="contained"
                        onClick={handlePriceClick}
                      >
                        <p className="text-lightBlue">{row.price}</p>
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
                        <div
                          className="rounded-pill d-flex table-status px-2 py-1 c-pointer"
                          aria-describedby={idMetalFilter}
                          variant="contained"
                          onClick={handleMetalFilter}
                        >
                          <small className="text-black fw-400">
                            {row.status}
                          </small>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <img
                        src={verticalDots}
                        alt="verticalDots"
                        className="c-pointer"
                        aria-describedby={idActions}
                        variant="contained"
                        onClick={handleActionClick}
                      />

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
                              Archived Product
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
        <div className="d-flex justify-content-between py-3 px-3">
          <h6 className="text-lightBlue">Activity Of</h6>
          <img
            src={cancel}
            alt="cancel"
            className="c-pointer filter-icon me-1"
            onClick={toggleActivityDrawer("right", false)}
          />
        </div>

        <div className="px-3">
          <div className="d-flex align-items-center">
            <div className="d-flex align-items-center">
              <img
                src={ringSmall}
                alt="ringSmall"
                className="me-2"
                height={45}
                width={45}
              />
              <div>
                <p className="text-lightBlue fw-600">The Fringe Diamond Ring</p>
                <small className="mt-2 text-grey-6">SKU: TFDR012345</small>
              </div>
            </div>
            <div className="d-flex ms-5">
              <button className="button-grey py-2 px-3 ms-5">
                <small className="text-lightBlue">Sort By Date</small>
                <img src={sortBy} alt="sortBy" className="ms-2" />
              </button>
              <button className="button-grey py-2 px-3">
                <small className="text-lightBlue">Activity</small>
                <img src={activity} alt="activity" className="ms-2" />
              </button>
            </div>
          </div>
          <table className="table table-borderless mt-4">
            <thead>
              <tr className="table-grey-bottom table-grey-top">
                <th scope="col">
                  <small className="text-lightBlue fw-400">User</small>
                </th>
                <th scope="col">
                  <small className="text-lightBlue fw-400">Activity</small>
                </th>
                <th scope="col">
                  <small className="text-lightBlue fw-400">Date and Time</small>
                </th>
              </tr>
            </thead>
            <tbody>
              {activityData.map((data) => (
                <tr key={data.id}>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SwipeableDrawer>
    </React.Fragment>
  );
};

export default AllProductsTable;
