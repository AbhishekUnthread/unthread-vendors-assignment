import React from "react";
import { Link } from "react-router-dom";
// ! COMPONENT IMPORTS
import {
  EnhancedTableHead,
  stableSort,
  getComparator,
} from "../../../components/TableDependencies/TableDependencies";
// ! IMAGES IMPORTS
import indiaFlag from "../../../assets/images/products/indiaFlag.svg";
import arrowDown from "../../../assets/icons/arrowDown.svg";
import deleteRed from "../../../assets/icons/delete.svg";
import ordersIcon from "../../../assets/icons/ordersIcon.svg";
// ! MATERIAL IMPORTS
import {
  Checkbox,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Tooltip,
} from "@mui/material";
// ! MATERIAL ICON IMPORTS
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

// ? TABLE STARTS HERE
function createData(
  oId,
  time,
  userName,
  location,
  items,
  total,
  paymentStatus,
  orderStatus
) {
  return {
    oId,
    time,
    userName,
    location,
    items,
    total,
    paymentStatus,
    orderStatus,
  };
}

const rows = [
  createData(
    "#12345",
    "Today at 09:23am",
    "Saniya Shaikh",
    "Delhi, India",
    "2 Items",
    "₹ 1,00,000",
    "Paid",
    "Order Confirm"
  ),
  createData(
    "#12512",
    "Today at 09:23am",
    "Saniya Shaikh",
    "Delhi, India",
    "2 Items",
    "₹ 1,00,000",
    "Paid",
    "Order Confirm"
  ),
  createData(
    "#13444",
    "Today at 09:23am",
    "Saniya Shaikh",
    "Delhi, India",
    "2 Items",
    "₹ 1,00,000",
    "Paid",
    "Order Confirm"
  ),
];

const headCells = [
  {
    id: "merchannt",
    numeric: false,
    disablePadding: true,
    label: "",
  },
  {
    id: "orderInfo",
    numeric: false,
    disablePadding: true,
    label: "Order Info",
  },
  {
    id: "actions",
    numeric: false,
    disablePadding: false,
    label: "",
  },
  {
    id: "userName",
    numeric: false,
    disablePadding: false,
    label: "User",
  },
  {
    id: "items",
    numeric: false,
    disablePadding: false,
    label: "Items",
  },
  {
    id: "total",
    numeric: false,
    disablePadding: false,
    label: "Total",
  },
  {
    id: "paymentStatus",
    numeric: false,
    disablePadding: false,
    label: "Payment Status",
  },
  {
    id: "orderStatus",
    numeric: false,
    disablePadding: false,
    label: "Order Status",
  },
];
// ? TABLE ENDS HERE

const AllOrdersTable = () => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("userName");
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
      const newSelected = rows.map((n) => n.oId);
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

  return (
    <React.Fragment>
      {selected.length > 0 && (
        <div className="d-flex justify-content-between align-items-center px-2 mb-3">
          <div className="d-flex">
            <button className="button-grey py-2 px-3">
              <small className="text-lightBlue">
                {selected.length} users are selected&nbsp;
                <span
                  className="text-blue-2 c-pointer"
                  onClick={() => setSelected([])}
                >
                  (Clear Selection)
                </span>
              </small>
            </button>

            <button className="button-grey py-2 px-3 ms-2">
              <small className="text-lightBlue">Edit Users</small>
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
              id={idMassAction}
              open={openMassAction}
              anchorEl={anchorMassActionEl}
              onClose={handleMassActionClose}
            >
              <div className="py-2 px-2">
                <small className="text-grey-7 px-2">ACTIONS</small>
                <hr className="hr-grey-6 my-2" />
                <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                  Edit User
                </small>
                <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                  Edit User Group
                </small>
                <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                  Add or Remove Tags
                </small>
                <div className="d-flex justify-content-between  hover-back rounded-3 p-2 c-pointer">
                  <small className="text-lightBlue font2 d-block">
                    Archived User
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
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.oId);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.oId}
                    selected={isItemSelected}
                    className="table-rows"
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                        onClick={(event) => handleClick(event, row.oId)}
                        size="small"
                        style={{
                          color: "#5C6D8E",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="d-flex align-items-center justify-content-center me-3">
                        <img
                          src={ordersIcon}
                          alt="ordersIcon"
                          width={20}
                          className="c-pointer"
                        />
                      </div>
                    </TableCell>

                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      <div className="d-flex align-items-center py-3">
                        <div>
                          <Link
                            to="/orders/allOrders/details"
                            className=" text-decoration-none"
                          >
                            <p className="text-blue-2 fw-600">{row.oId}</p>
                          </Link>
                          <small className="mt-2 text-lightBlue">
                            {row.time}
                          </small>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell padding="none" width={50}>
                      <div className="d-flex align-items-center justify-content-center me-3">
                        <Tooltip title="Edit" placement="top">
                          <div className="table-edit-icon rounded-4 p-2">
                            <VisibilityOutlinedIcon
                              sx={{
                                color: "#5c6d8e",
                                fontSize: 18,
                                cursor: "pointer",
                              }}
                            />
                          </div>
                        </Tooltip>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="d-flex align-items-center py-3">
                        {/* <img
                          src={user}
                          alt="user"
                          className="me-2 rounded-circle"
                          height={45}
                          width={45}
                        /> */}

                        <div>
                          <Link
                            to="/users/allUsers/details"
                            className=" text-decoration-none"
                          >
                            <p className="text-lightBlue rounded-circle fw-600">
                              {row.userName}
                            </p>
                          </Link>

                          <div className="d-flex align-items-center mt-2">
                            <p className="text-lightBlue">{row.location}</p>
                            <img
                              src={indiaFlag}
                              alt="indiaFlag"
                              className="ms-2"
                              height={14}
                            />
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell width={120}>
                      <div className="d-flex align-items-center c-pointer">
                        <p className="text-lightBlue">{row.items}</p>
                      </div>
                    </TableCell>
                    <TableCell width={180}>
                      <div className="d-flex flex-column">
                        <p className="text-lightBlue">{row.total}</p>
                        <p className="text-grey-6">via Debit Card</p>
                      </div>
                    </TableCell>
                    <TableCell width="180">
                      <div className="d-flex align-items-center">
                        <div className="rounded-pill d-flex table-status px-2 py-1 c-pointer">
                          <small className="text-black fw-400">
                            {row.paymentStatus}
                          </small>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell width="180">
                      <div className="d-flex align-items-center">
                        <div className="rounded-pill d-flex table-status px-2 py-1 c-pointer">
                          <small className="text-black fw-400">
                            {row.orderStatus}
                          </small>
                        </div>
                      </div>
                    </TableCell>
                    {/* <TableCell style={{ width: 80, padding: 0 }}>
                      <div className="d-flex align-items-center">
                        <Tooltip title="Edit" placement="top">
                          <div className="table-edit-icon rounded-4 p-2">
                            <EditOutlinedIcon
                              sx={{
                                color: "#5c6d8e",
                                fontSize: 18,
                                cursor: "pointer",
                              }}
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
                            <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                              Edit User
                            </small>
                            <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                              Edit User Group
                            </small>
                            <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                              Add or Remove Tags
                            </small>
                            <div className="d-flex justify-content-between  hover-back rounded-3 p-2 c-pointer">
                              <small className="text-lightBlue font2 d-block">
                                Archived User
                              </small>
                              <img src={deleteRed} alt="delete" className="" />
                            </div>
                          </div>
                        </Popover>
                      </div>
                    </TableCell> */}
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
    </React.Fragment>
  );
};

export default AllOrdersTable;
