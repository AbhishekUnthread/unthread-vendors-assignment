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
import verticalDots from "../../../assets/icons/verticalDots.svg";
import user from "../../../assets/images/users/user.svg";
import arrowDown from "../../../assets/icons/arrowDown.svg";
import deleteRed from "../../../assets/icons/delete.svg";
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
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

// ? TABLE STARTS HERE
function createData(
  cId,
  userName,
  groups,
  location,
  orders,
  totalSpent,
  status
) {
  return { cId, userName, groups, location, orders, totalSpent, status };
}

const rows = [
  createData(
    1,
    "Saniya Shaikh",
    "VIP",
    "Delhi, India",
    "24",
    "₹ 50,000",
    "Active"
  ),
  createData(
    2,
    "Saniya Shaikh",
    "VIP",
    "Delhi, India",
    "24",
    "₹ 50,000",
    "Active"
  ),
  createData(
    3,
    "Saniya Shaikh",
    "VIP",
    "Delhi, India",
    "24",
    "₹ 50,000",
    "Active"
  ),
];

const headCells = [
  {
    id: "userName",
    numeric: false,
    disablePadding: true,
    label: "User Name",
  },
  {
    id: "groups",
    numeric: false,
    disablePadding: false,
    label: "Groups",
  },
  {
    id: "location",
    numeric: false,
    disablePadding: false,
    label: "Location",
  },
  {
    id: "orders",
    numeric: false,
    disablePadding: false,
    label: "Orders",
  },
  {
    id: "totalSpent",
    numeric: false,
    disablePadding: false,
    label: "Total Spent",
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

const AllUsersTable = () => {
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
      const newSelected = rows.map((n) => n.cId);
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
                const isItemSelected = isSelected(row.cId);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.cId}
                    selected={isItemSelected}
                    className="table-rows"
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                        onClick={(event) => handleClick(event, row.cId)}
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
                          src={user}
                          alt="user"
                          className="me-2 rounded-circle"
                          height={45}
                          width={45}
                        />

                        <div>
                          <Link
                            to="/users/allUsers/details"
                            className=" text-decoration-none"
                          >
                            <p className="text-lightBlue rounded-circle fw-600">
                              {row.userName}
                            </p>
                          </Link>
                          <small className="mt-2 text-grey-6">
                            saniya@mydesignar.com
                            <Tooltip title="Copy" placement="top">
                              <ContentCopyIcon
                                sx={{ fontSize: 12, color: "#c8d8ff" }}
                                className="c-pointer ms-2"
                              />
                            </Tooltip>
                          </small>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="d-flex align-items-center c-pointer">
                        <p className="text-lightBlue">{row.groups}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="d-flex align-items-center">
                        <img src={indiaFlag} alt="indiaFlag" height={16} />
                        <p className="text-lightBlue ms-2"> {row.location}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-lightBlue">{row.orders}</p>
                    </TableCell>
                    <TableCell>
                      <div className="d-flex c-pointer">
                        <p className="text-lightBlue">{row.totalSpent}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="d-flex align-items-center">
                        <div className="rounded-pill d-flex table-status px-2 py-1 c-pointer">
                          <small className="text-black fw-400">
                            {row.status}
                          </small>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell style={{ width: 80, padding: 0 }}>
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
    </React.Fragment>
  );
};

export default AllUsersTable;
