import React from "react";
// ! COMPONENTS IMPORTS
import {
  EnhancedTableHead,
  stableSort,
  getComparator,
} from "../../../components/TableDependencies/TableDependencies";
import TableEditStatusButton from "../../../components/TableEditStatusButton/TableEditStatusButton";
import TableMassActionButton from "../../../components/TableMassActionButton/TableMassActionButton";
// ! IMAGES IMPORTS
import verticalDots from "../../../assets/icons/verticalDots.svg";
import cancel from "../../../assets/icons/cancel.svg";
import teamMember1 from "../../../assets/images/products/teamMember1.svg";
// ! MATERIAL IMPORTS
import {
  Checkbox,
  Popover,
  Rating,
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
} from "@mui/material";
// ! MATERIAL ICONS IMPORTS
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InventoryIcon from "@mui/icons-material/Inventory";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import BlockIcon from "@mui/icons-material/Block";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

// ? DIALOG TRANSITION STARTS HERE
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// ? DIALOG TRANSITION ENDS HERE

// ? TABLE STARTS HERE
function createData(rId, reviews, customer, status) {
  return { rId, reviews, customer, status };
}

const rows = [
  createData(
    1,
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro odit tempora ut pariatur nostrum error sint numquam. Cumque modi vero",
    "Saniya Shaikh",
    "Active"
  ),
  createData(
    2,
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro odit tempora ut pariatur nostrum error sint numquam. Cumque modi vero",
    "Saniya Shaikh",
    "Active"
  ),
  createData(
    3,
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro odit tempora ut pariatur nostrum error sint numquam. Cumque modi vero",
    "Saniya Shaikh",
    "Active"
  ),
];

const headCells = [
  {
    id: "reviews",
    numeric: false,
    disablePadding: true,
    label: "Reviews",
  },
  {
    id: "customer",
    numeric: false,
    disablePadding: false,
    label: "Customer",
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
    label: "Action",
  },
];

// ? TABLE ENDS HERE

const ProductReviewsTable = () => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("reviews");
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
      const newSelected = rows.map((n) => n.rId);
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

  // ? REVIEW DIALOG STARTS HERE
  const [openReview, setOpenReview] = React.useState(false);

  const handleOpenReview = () => {
    setOpenReview(true);
  };

  const handleOpenReviewClose = () => {
    setOpenReview(false);
  };
  // ? REVIEW DIALOG ENDS HERE

  return (
    <React.Fragment>
      {selected.length > 0 && (
        <div className="d-flex align-items-center px-2 mb-3">
          <button className="button-grey py-2 px-3">
            <small className="text-lightBlue">
              {selected.length} reviews are selected&nbsp;
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
                const isItemSelected = isSelected(row.rId);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.rId}
                    selected={isItemSelected}
                    className="table-rows"
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                        onClick={(event) => handleClick(event, row.rId)}
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
                      <div className="d-flex flex-column text-decoration-none c-pointer py-3">
                        <Rating
                          size="small"
                          name="half-rating-read"
                          defaultValue={4}
                          readOnly
                        />
                        <p className="text-lightBlue rounded-circle fw-500 my-2">
                          {row.reviews}
                        </p>
                        <small className="text-blue-2">
                          The Fringe Diamond Ring&nbsp;
                          <span className="text-grey-6">•</span>
                          &nbsp;#12345&nbsp;
                          <span className="text-grey-6">
                            • 13/07/2022 • 09:23am
                          </span>
                        </small>
                      </div>
                    </TableCell>
                    <TableCell style={{ width: 180 }}>
                      <div className="d-flex flex-column">
                        <p className="text-blue-2 text-decoration-underline">
                          {row.customer}
                        </p>
                        <div className="d-flex align-items-center mt-2">
                          <small className="text-grey-6 me-2">
                            Create by Staff
                          </small>
                          <img src={teamMember1} alt="teamMember1" />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell style={{ width: 140 }}>
                      <div className="d-flex align-items-center">
                        <div className="rounded-pill d-flex table-status px-2 py-1 c-pointer">
                          <small className="text-black fw-400">
                            {row.status}
                          </small>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell style={{ width: 160, padding: 0 }}>
                      <div className="d-flex align-items-center">
                        <Tooltip title="View" placement="top">
                          <div className="table-edit-icon rounded-4 p-2">
                            <VisibilityOutlinedIcon
                              sx={{
                                color: "#5c6d8e",
                                fontSize: 18,
                                cursor: "pointer",
                              }}
                              onClick={handleOpenReview}
                            />
                          </div>
                        </Tooltip>
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
                        <Tooltip title="Archive" placement="top">
                          <div className="table-edit-icon rounded-4 p-2">
                            <InventoryIcon
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
                            <div className="d-flex p-2 rounded-3 text-green-2 align-items-center hover-back">
                              <TaskAltIcon
                                sx={{
                                  fontSize: 18,
                                  cursor: "pointer",
                                  "& :hover": { color: "green" },
                                }}
                              />
                              <small className="c-pointer font2 d-block ms-2">
                                Approve Reviews
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
                                Disapprove Reviews
                              </small>
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

      <Dialog
        open={openReview}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleOpenReviewClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogTitle>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex flex-column ">
              <h5 className="text-lightBlue fw-500">Rating Review</h5>
              <small className="text-grey-6 mt-1">13/07/2022 at 09:23am</small>
            </div>
            <img
              src={cancel}
              alt="cancel"
              width={30}
              onClick={handleOpenReviewClose}
              className="c-pointer"
            />
          </div>
        </DialogTitle>
        <hr className="hr-grey-6 my-0" />
        <DialogContent className="py-3 px-4">
          <p className="text-grey-6 mb-2">Rating</p>
          <Rating
            // size="small"
            name="half-rating-read"
            defaultValue={4}
            readOnly
          />
          <p className="text-grey-6 mt-3">Reviews</p>
          <p className="text-lightBlue mt-1">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis
            quod delectus ex quam dolorum, obcaecati molestiae praesentium
            soluta beatae laborum. Perspiciatis iusto facere repellendus
            molestiae animi sapiente aliquam quidem quae.
          </p>
          <div className="d-flex">
            <div>
              <p className="text-grey-6 mt-3">Product</p>
              <p className="text-blue-2 mt-1 text-decoration-underline">
                The Fringe Diamond Ring
              </p>
            </div>
            <div className="ms-5">
              <p className="text-grey-6 mt-3">Order ID</p>
              <p className="text-blue-2 mt-1 text-decoration-underline">
                #12345
              </p>
            </div>
          </div>
          <p className="text-grey-6 mt-3">Customer</p>
          <p className="text-blue-2 mt-1 text-decoration-underline">
            Saniya Shaikh
          </p>
          <p className="text-grey-6 mt-3">Status</p>
          <div className="d-flex mt-1">
            <div className="rounded-pill d-flex table-status px-4 py-1 c-pointer">
              <small className="text-black fw-400">Active</small>
            </div>
          </div>
        </DialogContent>
        <hr className="hr-grey-6 my-0" />
        <DialogActions className="d-flex justify-content-between px-4 py-3">
          <button
            className="button-green-outline py-2 px-4"
            onClick={handleOpenReviewClose}
          >
            <TaskAltIcon
              sx={{
                fontSize: 18,
                cursor: "pointer",
                "& :hover": { color: "green" },
              }}
            />
            <p className="ms-2">Approve Reviews</p>
          </button>
          <button
            className="button-red-outline py-2 px-4"
            onClick={handleOpenReviewClose}
          >
            <BlockIcon
              sx={{
                fontSize: 18,
                cursor: "pointer",
                "& :hover": { color: "green" },
              }}
            />
            <p className="ms-2">Reject Reviews</p>
          </button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ProductReviewsTable;
