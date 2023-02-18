import React from "react";
import PropTypes from "prop-types";
// ! IMAGES IMPORTS
import replyActionButton from "../../../assets/icons/replyActionButton.svg";
import cancel from "../../../assets/icons/cancel.svg";
import copy from "../../../assets/icons/copy.svg";
// ! MATERIAL IMPORTS
import {
  Box,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
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
import AppTextEditor from "../../../components/AppTextEditor/AppTextEditor";

// ? TABLE STARTS HERE
function createData(eId, date, userName, subject) {
  return { eId, date, userName, subject };
}

const rows = [
  createData(
    "#12345",
    "Today at 09:23am",
    "Saniya Shaikh",
    "Book an Appointment"
  ),
  createData(
    "#67789",
    "Today at 09:23am",
    "Saniya Shaikh",
    "Book an Appointment"
  ),
  createData(
    "#23443",
    "Today at 09:23am",
    "Saniya Shaikh",
    "Book an Appointment"
  ),
];

const headCells = [
  {
    id: "eId",
    numeric: false,
    disablePadding: true,
    label: "Enquiry ID",
  },
  {
    id: "date",
    numeric: false,
    disablePadding: false,
    label: "Date",
  },
  {
    id: "userName",
    numeric: false,
    disablePadding: false,
    label: "User",
  },
  {
    id: "subject",
    numeric: false,
    disablePadding: false,
    label: "Subject",
  },
  {
    id: "comments",
    numeric: false,
    disablePadding: false,
    label: "Comments",
  },
  {
    id: "replyAction",
    numeric: false,
    disablePadding: false,
    label: "Reply Action",
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
              "aria-label": "select all desserts",
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

// ? DIALOG TRANSITION STARTS HERE
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// ? DIALOG TRANSITION ENDS HERE

const UserEnquiriesTable = () => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("eId");
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
      const newSelected = rows.map((n) => n.eId);
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

  // ? COMMENT DIALOG STARTS HERE
  const [openComment, setOpenComment] = React.useState(false);

  const handleOpenComment = () => {
    setOpenComment(true);
  };

  const handleOpenCommentClose = () => {
    setOpenComment(false);
  };
  // ? COMMENT DIALOG ENDS HERE

  return (
    <React.Fragment>
      {/* {selected.length > 0 && (
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
                  Edit User
                </small>
                <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                  Add or Remove Tags
                </small>
                <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                  Add to User Groups
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
      )} */}
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
                const isItemSelected = isSelected(row.eId);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.eId}
                    selected={isItemSelected}
                    className="table-rows"
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                        onClick={(event) => handleClick(event, row.eId)}
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
                        <p className="text-lightBlue rounded-circle fw-600">
                          {row.eId}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="d-flex align-items-center c-pointer">
                        <p className="text-lightBlue">{row.date}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="d-flex align-items-center">
                        <p className="text-blue-2 text-decoration-underline">
                          {" "}
                          {row.userName}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-lightBlue">{row.subject}</p>
                    </TableCell>
                    <TableCell>
                      <div
                        className="d-flex c-pointer"
                        onClick={handleOpenComment}
                      >
                        <p className="text-blue-2">View</p>
                      </div>

                      <Dialog
                        open={openComment}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleOpenCommentClose}
                        aria-describedby="alert-dialog-slide-description"
                        maxWidth="lg"
                        fullWidth={true}
                      >
                        <DialogTitle>
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex flex-column ">
                              <h5 className="text-lightBlue fw-500">
                                Enquiry:&nbsp;Saniya Shaikh
                              </h5>

                              <small className="text-grey-6 mt-1 d-block">
                                #ENB12
                              </small>
                            </div>
                            <img
                              src={cancel}
                              alt="cancel"
                              width={30}
                              onClick={handleOpenCommentClose}
                              className="c-pointer"
                            />
                          </div>
                        </DialogTitle>
                        <hr className="hr-grey-6 my-0" />
                        <DialogContent className="py-3 px-4">
                          <div className="row">
                            <div className="col-5 col-md-4">
                              <small className="text-grey-6">
                                User Information
                              </small>
                            </div>
                            <div className="col-7 col-md-8">
                              <p className="text-lightBlue">Saniya Shaikh</p>
                              <p className="text-blue-2">
                                saniya@mydesignar.com
                              </p>
                              <div className="d-flex mt-1">
                                <p className="text-grey-6">+91 9876543210</p>
                                <img src={copy} alt="copy" className="ms-2" />
                              </div>
                            </div>
                            <div className="col-5 col-md-4 mt-3">
                              <small className="text-grey-6">Subject</small>
                            </div>
                            <div className="col-7 col-md-8 mt-3">
                              <p className="text-lightBlue">
                                Book an Appointment
                              </p>
                            </div>
                            <div className="col-5 col-md-4 mt-3">
                              <small className="text-grey-6">Message</small>
                            </div>
                            <div className="col-7 col-md-8 mt-3">
                              <p className="text-lightBlue">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Maiores, ducimus id ea et illo
                                eveniet obcaecati architecto. Deserunt
                                cupiditate doloremque voluptatum autem nisi,
                                aliquid eveniet, illum adipisci vitae
                                dignissimos iusto!
                              </p>
                            </div>
                            <div className="col-12">
                              <p className="text-lightBlue">Reply</p>
                            </div>
                            <div className="col-12 mt-2">
                              <AppTextEditor />
                            </div>
                          </div>
                        </DialogContent>
                        <hr className="hr-grey-6 my-0" />
                        <DialogActions className="d-flex justify-content-between px-4 py-3">
                          <button
                            className="button-grey py-2 px-5"
                            onClick={handleOpenCommentClose}
                          >
                            <p className="text-lightBlue">Cancel</p>
                          </button>
                          <button
                            className="button-gradient py-2 px-5"
                            onClick={handleOpenCommentClose}
                          >
                            <p>Send</p>
                          </button>
                        </DialogActions>
                      </Dialog>
                    </TableCell>
                    <TableCell style={{ width: 160 }}>
                      <div className="d-flex align-items-center">
                        <img
                          src={replyActionButton}
                          alt="replyActionButton"
                          height={30}
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
    </React.Fragment>
  );
};

export default UserEnquiriesTable;
