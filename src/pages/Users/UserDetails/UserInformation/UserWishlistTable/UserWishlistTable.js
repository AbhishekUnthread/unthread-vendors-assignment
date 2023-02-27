import React from "react";
// ! COMPONENT IMPORTS
import {
  EnhancedTableHead,
  stableSort,
  getComparator,
} from "../../../../../components/TableDependencies/TableDependencies";
// ! IMAGES IMPORTS
import verticalDots from "../../../../../assets/icons/verticalDots.svg";
import ringSmall from "../../../../../assets/images/ringSmall.svg";
import arrowDown from "../../../../../assets/icons/arrowDown.svg";
import arrowDownBlack from "../../../../../assets/icons/arrowDownBlack.svg";
import editButton from "../../../../../assets/icons/editButton.svg";
import duplicateButton from "../../../../../assets/icons/duplicateButton.svg";
import deleteRed from "../../../../../assets/icons/delete.svg";
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
} from "@mui/material";

// ? TABLE STARTS HERE
function createData(pId, productName, category, price, status) {
  return { pId, productName, category, price, status };
}

const rows = [
  createData(
    1,
    "The Fringe Diamond Ring",
    "Gold Products",
    "₹ 20,600 - ₹ 50,000",
    "Active"
  ),
  createData(
    2,
    "Fringe Diamond Ring",
    "Gold Products",
    "₹ 20,600 - ₹ 50,000",
    "Active"
  ),
  createData(
    3,
    "The Fringe Diamond Ring",
    "Gold Products",
    "₹ 20,600 - ₹ 50,000",
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
    id: "price",
    numeric: false,
    disablePadding: false,
    label: "Price",
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

const UserWishlistTable = () => {
  // ? TABLE STARTS HERE
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
  // ? TABLE ENDS HERE

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
                      <div className="d-flex align-items-center">
                        <div
                          className="rounded-pill d-flex table-status px-2 py-1 c-pointer"
                          aria-describedby={idMetalFilter}
                          variant="contained"
                          onClick={handleMetalFilter}
                        >
                          <small className="text-black fw-light">
                            {row.status}
                          </small>
                          <img
                            src={arrowDownBlack}
                            alt="arrowDownBlack"
                            className="ms-2"
                          />
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
                          id={idMetalFilter}
                          open={openMetalFilter}
                          anchorEl={anchorMetalFilterEl}
                          onClose={handleMetalFilterClose}
                        >
                          <div className="py-2 px-1">
                            <small className="text-lightBlue rounded-3 p-2 hover-back d-block">
                              Draft
                            </small>
                            <small className="text-lightBlue rounded-3 p-2 hover-back d-block">
                              Archived
                            </small>
                          </div>
                        </Popover>
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
    </React.Fragment>
  );
};

export default UserWishlistTable;
