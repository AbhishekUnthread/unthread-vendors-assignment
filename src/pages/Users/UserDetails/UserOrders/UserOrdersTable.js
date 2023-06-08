import React from "react";
// ! COMPONENT IMPORTS
import {
  EnhancedTableHead,
  stableSort,
  getComparator,
} from "../../../../components/TableDependencies/TableDependencies";
// ! IMAGES IMPORTS
import indiaFlag from "../../../../assets/images/products/indiaFlag.svg";
import arrowDown from "../../../../assets/icons/arrowDown.svg";
import arrowDownBlack from "../../../../assets/icons/arrowDownBlack.svg";
// ! MATERIAL IMPORTS
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Popover,
} from "@mui/material";
import TableEditStatusButton from "../../../../components/TableEditStatusButton/TableEditStatusButton";
import TableMassActionButton from "../../../../components/TableMassActionButton/TableMassActionButton";

// ? TABLE STARTS HERE
function createData(
  oId,
  date,
  location,
  items,
  total,
  paymentStatus,
  orderStatus
) {
  return { oId, date, location, items, total, paymentStatus, orderStatus };
}

const rows = [
  createData(
    "#12345",
    "Today at 09:23am",
    "Delhi, India",
    "3 Items",
    "₹ 50,000",
    "Paid",
    "Delivered"
  ),
  createData(
    "#67789",
    "Today at 09:23am",
    "Delhi, India",
    "3 Items",
    "₹ 50,000",
    "Paid",
    "Delivered"
  ),
  createData(
    "#23443",
    "Today at 09:23am",
    "Delhi, India",
    "3 Items",
    "₹ 50,000",
    "Paid",
    "Delivered"
  ),
];

const headCells = [
  {
    id: "oId",
    numeric: false,
    disablePadding: true,
    label: "Order ID",
  },
  {
    id: "date",
    numeric: false,
    disablePadding: false,
    label: "Date",
  },
  {
    id: "location",
    numeric: false,
    disablePadding: false,
    label: "Location",
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

const UserOrdersTable = () => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("oId");
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
                      <div className="d-flex align-items-center">
                        <p className="text-lightBlue rounded-circle fw-600">
                          {row.oId}
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
                        <img
                          src={indiaFlag}
                          alt="indiaFlag"
                          className="me-2"
                          width={18}
                        />
                        <p className="text-lightBlue">{row.location}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="d-flex align-items-center">
                        <p className="text-lightBlue">{row.items}</p>
                        <img src={arrowDown} alt="arrowDown" className="ms-3" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="d-flex c-pointer">
                        <p className="text-lightBlue">{row.total}</p>
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
                            {row.paymentStatus}
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
                              Archive
                            </small>
                          </div>
                        </Popover>
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
                            {row.orderStatus}
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
                              Archive
                            </small>
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

export default UserOrdersTable;
