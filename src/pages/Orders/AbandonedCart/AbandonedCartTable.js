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
import ringSmall from "../../../assets/images/ringSmall.svg";
import user from "../../../assets/images/users/user.svg";
import arrowDown from "../../../assets/icons/arrowDown.svg";
import deleteRed from "../../../assets/icons/delete.svg";
import ordersIcon from "../../../assets/icons/ordersIcon.svg";
import editButton from "../../../assets/icons/editButton.svg";
import duplicateButton from "../../../assets/icons/duplicateButton.svg";
import verticalDots from "../../../assets/icons/verticalDots.svg";
import cancel from "../../../assets/icons/cancel.svg";
import product2 from "../../../assets/images/products/product2.jpg";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  FormControl,
  OutlinedInput,
  TextareaAutosize,
} from "@mui/material";
// ! MATERIAL ICON IMPORTS
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ChatIcon from "@mui/icons-material/Chat";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PrintIcon from "@mui/icons-material/Print";

// ? DIALOG TRANSITION STARTS HERE
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// ? DIALOG TRANSITION ENDS HERE

// ? TABLE STARTS HERE
function createData(oId, time, userName, location, items, total, status) {
  return {
    oId,
    time,
    userName,
    location,
    items,
    total,
    status,
  };
}

const rows = [
  createData(
    "#CHKT12345",
    "Today at 09:23am",
    "Saniya Shaikh",
    "Delhi, India",
    "2 Items",
    "₹ 1,00,000",
    "Complete"
  ),
  createData(
    "#CHKT12512",
    "Today at 09:23am",
    "Saniya Shaikh",
    "Delhi, India",
    "2 Items",
    "₹ 1,00,000",
    "Complete"
  ),
  createData(
    "#CHKT13444",
    "Today at 09:23am",
    "Saniya Shaikh",
    "Delhi, India",
    "2 Items",
    "₹ 1,00,000",
    "Complete"
  ),
];

const headCells = [
  {
    id: "draftOrder",
    numeric: false,
    disablePadding: true,
    label: "Checkout ID",
  },
  {
    id: "userName",
    numeric: false,
    disablePadding: false,
    label: "Placed By",
  },
  {
    id: "items",
    numeric: false,
    disablePadding: false,
    label: "Items in Cart",
  },
  {
    id: "total",
    numeric: false,
    disablePadding: false,
    label: "Total",
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

const AbandonedCartTable = () => {
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

  // * ITEM POPOVERS STARTS
  const [anchorItemEl, setAnchorItemEl] = React.useState(null);
  const handleItemClick = (event) => {
    setAnchorItemEl(event.currentTarget);
  };

  const handleItemClose = () => {
    setAnchorItemEl(null);
  };

  const openItem = Boolean(anchorItemEl);
  const idItem = openItem ? "simple-popover" : undefined;
  // * ITEM POPOVERS ENDS

  // * POPOVER ACTION POPOVERS STARTS
  const [anchorPopoverActionEl, setAnchorPopoverActionEl] =
    React.useState(null);
  const handlePopoverActionClick = (event) => {
    setAnchorPopoverActionEl(event.currentTarget);
  };

  const handlePopoverActionClose = () => {
    setAnchorPopoverActionEl(null);
  };

  const openPopoverAction = Boolean(anchorPopoverActionEl);
  const idPopoverAction = openPopoverAction ? "simple-popover" : undefined;
  // * POPOVER ACTION POPOVERS ENDS

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

  // ? RECOVERY EMAIL DIALOG STARTS HERE
  const [openRecoveryEmail, setOpenRecoveryEmail] = React.useState(false);

  const handleRecoveryEmail = () => {
    setAnchorActionEl(null);
    setOpenRecoveryEmail(true);
  };

  const handleRecoveryEmailClose = () => {
    setOpenRecoveryEmail(false);
  };
  // ? RECOVERY EMAIL DIALOG ENDS HERE

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
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      <div className="d-flex align-items-center py-2">
                        <div>
                          <Link
                            to="/orders/abandonedCart/details"
                            className="text-decoration-none d-flex"
                          >
                            <p className="text-blue-2 fw-600 text-decoration-underline">
                              {row.oId}
                            </p>
                            {row.oId === "#12512" && (
                              <p className="text-blue-gradient">
                                &nbsp;• Pre Order
                              </p>
                            )}
                          </Link>
                          <small className="mt-2 text-lightBlue">
                            {row.time}
                          </small>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="d-flex align-items-center py-2">
                        {/* <img
                          src={user}
                          alt="user"
                          className="me-2 rounded-circle"
                          height={45}
                          width={45}
                        /> */}

                        <div
                          aria-describedby={idUser}
                          variant="contained"
                          onClick={handleUserClick}
                          className="c-pointer"
                        >
                          <div className=" text-decoration-none">
                            <p className="text-lightBlue rounded-circle fw-600">
                              {row.userName}
                            </p>
                          </div>

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
                    <TableCell>
                      <div className="d-flex align-items-center c-pointer">
                        <p
                          className="text-lightBlue"
                          aria-describedby={idItem}
                          variant="contained"
                          onClick={handleItemClick}
                        >
                          {row.items}
                        </p>
                      </div>

                      <Popover
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                        id={idItem}
                        open={openItem}
                        anchorEl={anchorItemEl}
                        onClose={handleItemClose}
                      >
                        <div className="py-2 px-2">
                          <div className="d-flex align-items-center">
                            <small className="text-blue-2 text-decoration-underline">
                              #12345
                            </small>
                            <img
                              src={ringSmall}
                              alt="product"
                              width={40}
                              className="ms-4 me-2"
                            />
                            <div>
                              <small className="text-lightBlue d-block">
                                The Fringe Diamond Ring
                              </small>
                              <small className="text-grey-6 font0 d-block">
                                ₹ 50,000
                              </small>
                            </div>
                            <small className="text-grey-6 ms-4">
                              SKU:&nbsp;
                              <span className="text-blue-2">TFDR012345</span>
                            </small>
                            <button
                              className="button-lightBlue-outline py-1 px-2 ms-3"
                              aria-describedby={idPopoverAction}
                              variant="contained"
                              onClick={handlePopoverActionClick}
                            >
                              <small>Action</small>
                              <KeyboardArrowDownIcon
                                sx={{
                                  fontSize: 14,
                                  marginLeft: 1,
                                }}
                              />
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
                              id={idPopoverAction}
                              open={openPopoverAction}
                              anchorEl={anchorPopoverActionEl}
                              onClose={handlePopoverActionClose}
                            >
                              <div className="py-2 px-1">
                                <small className="text-lightBlue rounded-3 p-2 hover-back d-block">
                                  <CloseIcon
                                    sx={{
                                      fontSize: 14,
                                      marginRight: 1,
                                    }}
                                  />
                                  Cancel Order
                                </small>
                                <small className="text-lightBlue rounded-3 p-2 hover-back d-block">
                                  <ReceiptIcon
                                    sx={{
                                      fontSize: 14,
                                      marginRight: 1,
                                    }}
                                  />
                                  View Invoice
                                </small>
                                <small className="text-lightBlue rounded-3 p-2 hover-back d-block">
                                  <PrintIcon
                                    sx={{
                                      fontSize: 14,
                                      marginRight: 1,
                                    }}
                                  />
                                  Print Packaging Slip
                                </small>
                              </div>
                            </Popover>
                          </div>
                        </div>
                      </Popover>
                    </TableCell>
                    <TableCell>
                      <div className="d-flex flex-column">
                        <p className="text-lightBlue">{row.total}</p>
                        {/* <p className="text-grey-6">via Debit Card</p> */}
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
                    <TableCell style={{ width: 50, padding: 0 }}>
                      <div className="d-flex align-items-center">
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

                          <small
                            className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back"
                            onClick={handleRecoveryEmail}
                          >
                            Send Recovery Email
                          </small>
                          <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                            Open Checkout Page
                          </small>
                          <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                            Place Order
                          </small>
                          <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                            Print
                          </small>
                          <div className="d-flex justify-content-between  hover-back rounded-3 p-2 c-pointer">
                            <small className="text-lightBlue font2 d-block">
                              Delete
                            </small>
                            <img src={deleteRed} alt="delete" className="" />
                          </div>
                        </div>
                      </Popover>
                    </TableCell>

                    <Dialog
                      open={openRecoveryEmail}
                      TransitionComponent={Transition}
                      keepMounted
                      onClose={handleRecoveryEmailClose}
                      aria-describedby="alert-dialog-slide-description"
                      maxWidth="md"
                      fullWidth={true}
                    >
                      <DialogTitle>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex flex-column ">
                            <h5 className="text-lightBlue fw-500">
                              Send Recovery Email
                            </h5>

                            <small className="text-grey-6 mt-1 d-block w-75">
                              This email will be sent to your customer so they
                              can quickly and easily complete their order.
                              Personalize the message to fit your business. Need
                              to make more changes?&nbsp;
                              <span className="text-blue-2">
                                Click here to edit the email template.
                              </span>
                            </small>
                          </div>
                          <img
                            src={cancel}
                            alt="cancel"
                            width={30}
                            onClick={handleRecoveryEmailClose}
                            className="c-pointer"
                          />
                        </div>
                      </DialogTitle>
                      <hr className="hr-grey-6 my-0" />
                      <DialogContent className="pt-3 pb-0 px-4">
                        <div className="row align-items-center">
                          <p className="text-lightBlue col-3">To</p>
                          <FormControl className="col-9 px-0">
                            <OutlinedInput
                              placeholder="Enter Email"
                              size="small"
                            />
                          </FormControl>
                        </div>
                        <div className="row mt-3 align-items-center">
                          <p className="text-lightBlue col-3">Subject</p>
                          <FormControl className="col-9 px-0">
                            <OutlinedInput
                              placeholder="Enter Subject"
                              size="small"
                            />
                          </FormControl>
                        </div>
                        <div className="row mt-3 align-items-center">
                          <p className="text-lightBlue col-3">Message</p>
                          <TextareaAutosize
                            aria-label="meta description"
                            placeholder="Type Message"
                            style={{
                              background: "#15142A",
                              color: "#c8d8ff",
                              borderRadius: 5,
                            }}
                            minRows={3}
                            className="col-9"
                          />
                        </div>
                        <div className="row">
                          <div className="col-3"></div>
                          <div className="col-9">
                            <small className="text-grey-6">
                              <span className="text-blue-2">Add Discount</span>
                              &nbsp;to increase the chance of a successful sale
                            </small>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12">
                            <hr className="hr-grey-6 my-3" />
                          </div>
                        </div>
                        <div className="row">
                          <p className="text-lightBlue col-3">Items in Cart</p>
                          <div className="col-9 px-0">
                            <div className="row w-100">
                              <div className="d-flex align-items-start col-6 mb-3">
                                <img
                                  src={product2}
                                  alt="porduct2"
                                  width={60}
                                  className="rounded-8"
                                />
                                <div className="d-flex flex-column ms-3">
                                  <small className="text-lightBlue">
                                    The Fringe Diamond Ring
                                  </small>
                                  <small className="text-grey-6 mt-1">
                                    SKU: TFDR012345
                                  </small>
                                  <small className="text-grey-6 mt-1">
                                    7 Gold-18KT-Rose-IJSI&nbsp;•&nbsp;3.65g
                                  </small>
                                  <small className="text-grey-6 mt-1">
                                    Price:&nbsp;₹&nbsp;46,350
                                  </small>
                                </div>
                              </div>
                              <div className="d-flex align-items-start col-6 mb-3">
                                <img
                                  src={product2}
                                  alt="porduct2"
                                  width={60}
                                  className="rounded-8"
                                />
                                <div className="d-flex flex-column ms-3">
                                  <small className="text-lightBlue">
                                    The Fringe Diamond Ring
                                  </small>
                                  <small className="text-grey-6 mt-1">
                                    SKU: TFDR012345
                                  </small>
                                  <small className="text-grey-6 mt-1">
                                    7 Gold-18KT-Rose-IJSI&nbsp;•&nbsp;3.65g
                                  </small>
                                  <small className="text-grey-6 mt-1">
                                    Price:&nbsp;₹&nbsp;46,350
                                  </small>
                                </div>
                              </div>
                              <div className="d-flex align-items-start col-6 mb-3">
                                <img
                                  src={product2}
                                  alt="porduct2"
                                  width={60}
                                  className="rounded-8"
                                />
                                <div className="d-flex flex-column ms-3">
                                  <small className="text-lightBlue">
                                    The Fringe Diamond Ring
                                  </small>
                                  <small className="text-grey-6 mt-1">
                                    SKU: TFDR012345
                                  </small>
                                  <small className="text-grey-6 mt-1">
                                    7 Gold-18KT-Rose-IJSI&nbsp;•&nbsp;3.65g
                                  </small>
                                  <small className="text-grey-6 mt-1">
                                    Price:&nbsp;₹&nbsp;46,350
                                  </small>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                      <hr className="hr-grey-6 my-0" />
                      <DialogActions className="d-flex justify-content-between px-4 py-3">
                        <button
                          className="button-lightBlue-outline py-2 px-5"
                          onClick={handleRecoveryEmailClose}
                        >
                          <p className="">Preview</p>
                        </button>
                        <button
                          className="button-gradient py-2 px-5"
                          onClick={handleRecoveryEmailClose}
                        >
                          <p>Send Email</p>
                        </button>
                      </DialogActions>
                    </Dialog>
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

export default AbandonedCartTable;
