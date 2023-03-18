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
import user from "../../../assets/images/users/user.svg";
import arrowDown from "../../../assets/icons/arrowDown.svg";
import deleteRed from "../../../assets/icons/delete.svg";
import exchangeIcon from "../../../assets/icons/exchangeIcon.svg";
import alterationIcon from "../../../assets/icons/alterationIcon.svg";
import product2 from "../../../assets/images/products/product2.jpg";
import verticalDots from "../../../assets/icons/verticalDots.svg";
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
import ChatIcon from "@mui/icons-material/Chat";
import BlockIcon from "@mui/icons-material/Block";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

// ? TABLE STARTS HERE
function createData(
  oId,
  rmaId,
  time,
  userName,
  location,
  items,
  total,
  rmaStatus,
  resolutions
) {
  return {
    oId,
    rmaId,
    time,
    userName,
    location,
    items,
    total,
    rmaStatus,
    resolutions,
  };
}

const rows = [
  createData(
    "#12345",
    "#EXC12345",
    "Today at 09:23am",
    "Saniya Shaikh",
    "Delhi, India",
    "2 Items",
    "₹ 1,00,000",
    "Approved",
    "Exchange"
  ),
  createData(
    "#12512",
    "#EXC1234345",
    "Today at 09:23am",
    "Saniya Shaikh",
    "Delhi, India",
    "2 Items",
    "₹ 1,00,000",
    "Approved",
    "Alteration"
  ),
  createData(
    "#13444",
    "#EXC2334",
    "Today at 09:23am",
    "Saniya Shaikh",
    "Delhi, India",
    "2 Items",
    "₹ 1,00,000",
    "Approved",
    "Exchange"
  ),
];

const headCells = [
  {
    id: "image",
    numeric: false,
    disablePadding: true,
    label: "IMG",
  },
  {
    id: "rmaId",
    numeric: false,
    disablePadding: true,
    label: "RMA ID",
  },
  {
    id: "orderId",
    numeric: false,
    disablePadding: false,
    label: "Order ID",
  },
  {
    id: "resolutions",
    numeric: false,
    disablePadding: false,
    label: "Resolutions",
  },
  {
    id: "userName",
    numeric: false,
    disablePadding: false,
    label: "User",
  },
  {
    id: "rmaStatus",
    numeric: false,
    disablePadding: false,
    label: "RMA Status",
  },
  {
    id: "actions",
    numeric: false,
    disablePadding: true,
    label: "Action",
  },
];
// ? TABLE ENDS HERE

const ExchangeAlterationRequestsTable = () => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("rmaId");
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

  // * USER POPOVERS STARTS
  const [anchorUserEl, setAnchorUserEl] = React.useState(null);
  const handleUserClick = (event) => {
    setAnchorUserEl(event.currentTarget);
  };

  const handleUserClose = () => {
    setAnchorUserEl(null);
  };

  const openUser = Boolean(anchorUserEl);
  const idUser = openUser ? "simple-popover" : undefined;
  // * USER POPOVERS ENDS

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
                    Archive User
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
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      <div className="d-flex align-items-center py-2">
                        <img
                          src={product2}
                          alt="product2"
                          className="me-2 rounded-8"
                          height={45}
                          width={45}
                        />
                      </div>
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      <div className="d-flex align-items-center py-2">
                        <div>
                          <Link
                            to="/orders/returnRefunds/details"
                            className=" text-decoration-none d-flex"
                          >
                            <p className="text-blue-2 fw-600 text-decoration-underline">
                              {row.rmaId}
                            </p>
                          </Link>
                          <small className="mt-2 text-lightBlue">
                            {row.time}
                          </small>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="d-flex align-items-center py-2">
                        <div>
                          <Link
                            to="/orders/allOrders/details"
                            className="text-decoration-none d-flex"
                          >
                            <p className="text-blue-2 fw-600 text-decoration-underline">
                              {row.oId}
                            </p>
                          </Link>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="d-flex align-items-center py-2">
                        {row.resolutions === "Exchange" && (
                          <img
                            src={exchangeIcon}
                            alt="exchangeIcon"
                            width={20}
                            className="me-2"
                          />
                        )}
                        {row.resolutions === "Alteration" && (
                          <img
                            src={alterationIcon}
                            alt="alterationIcon"
                            width={20}
                            className="me-2"
                          />
                        )}
                        <p className="text-lightBlue fw-500">
                          {row.resolutions}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="d-flex align-items-center py-2">
                        <div>
                          <p
                            className="text-blue-2 rounded-circle fw-600 c-pointer"
                            aria-describedby={idUser}
                            variant="contained"
                            onClick={handleUserClick}
                          >
                            {row.userName}
                          </p>
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

                        <Popover
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "center",
                          }}
                          id={idUser}
                          open={openUser}
                          anchorEl={anchorUserEl}
                          onClose={handleUserClose}
                        >
                          <div className="py-2 px-2">
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex">
                                <img
                                  src={user}
                                  alt="user"
                                  className="me-2 rounded-circle"
                                  height={45}
                                  width={45}
                                />
                                <div className="d-flex flex-column">
                                  <p className="text-lightBlue">
                                    Saniya Shaikh
                                  </p>
                                  <small className="text-blue-2">
                                    View Profile
                                  </small>
                                </div>
                              </div>
                              <img src={indiaFlag} alt="indiaFlag" width={20} />
                            </div>
                            <hr className="hr-grey-6 my-2" />
                            <div className="d-flex align-items-center mt-3">
                              <small className=" text-blue-2 me-2">
                                saniya@mydesignar.com
                              </small>
                              <Tooltip title="Copy" placement="top">
                                <ContentCopyIcon
                                  sx={{ fontSize: 12, color: "#c8d8ff" }}
                                  className="c-pointer"
                                />
                              </Tooltip>
                            </div>
                            <div className="d-flex align-items-center mt-3">
                              <small className="text-blue-2 me-2">
                                +91-9876543210
                              </small>
                              <Tooltip title="Copy" placement="top">
                                <ContentCopyIcon
                                  sx={{ fontSize: 12, color: "#c8d8ff" }}
                                  className="c-pointer"
                                />
                              </Tooltip>
                            </div>
                            <div className="d-flex align-items-center mt-3">
                              <small className="text-lightBlue me-2">
                                66-68, Jambi Mohalla, Bapu Khote <br /> Street,
                                Mumbai - 400003
                              </small>
                              <Tooltip title="Copy" placement="top">
                                <ContentCopyIcon
                                  sx={{ fontSize: 12, color: "#c8d8ff" }}
                                  className="c-pointer ms-3"
                                />
                              </Tooltip>
                            </div>
                            <div className="d-flex mt-4">
                              <buton className="button-lightBlue-outline px-3 py-1 align-items-center">
                                <ChatIcon
                                  sx={{
                                    fontSize: 14,
                                    "& :hover": { color: "" },
                                  }}
                                />
                                <small className="ms-2">Message</small>
                              </buton>
                            </div>
                          </div>
                        </Popover>
                      </div>
                    </TableCell>
                    <TableCell width="180">
                      <div className="d-flex align-items-center">
                        <div className="rounded-pill d-flex table-status px-2 py-1 c-pointer">
                          <small className="text-black fw-400">
                            {row.rmaStatus}
                          </small>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell padding="none" width={60}>
                      <div className="d-flex align-items-center justify-content-end me-3">
                        {/* <Tooltip title="Edit" placement="top">
                          <div className="table-edit-icon rounded-4 p-2">
                            <VisibilityOutlinedIcon
                              sx={{
                                color: "#5c6d8e",
                                fontSize: 18,
                                cursor: "pointer",
                              }}
                            />
                          </div>
                        </Tooltip> */}
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
                            <div className="d-flex p-2 rounded-3 text-green-2 align-items-center hover-back">
                              <TaskAltIcon
                                sx={{
                                  fontSize: 18,
                                  cursor: "pointer",
                                  "& :hover": { color: "green" },
                                }}
                              />
                              <small className="c-pointer font2 d-block ms-2">
                                Approve Request
                              </small>
                            </div>
                            <div className="d-flex p-2 rounded-3 text-red-5 align-items-center hover-back">
                              <BlockIcon
                                sx={{
                                  fontSize: 18,
                                  cursor: "pointer",
                                  "& :hover": { color: "green" },
                                }}
                              />
                              <small className="c-pointer font2 d-block ms-2">
                                Reject Request
                              </small>
                            </div>
                          </div>
                        </Popover>
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
                                Archive User
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

export default ExchangeAlterationRequestsTable;
