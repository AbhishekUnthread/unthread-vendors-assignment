import React from "react";
import { Link } from "react-router-dom";
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
} from "@mui/material";
// ! COMPONENT IMPORTS
import {
  EnhancedTableHead,
  stableSort,
  getComparator,
} from "../../../components/TableDependencies/TableDependencies";
// !IMAGES IMPORTS
import ringSmall from "../../../assets/images/ringSmall.svg";
// ! MATERIAL ICONS IMPORTS
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InventoryIcon from "@mui/icons-material/Inventory";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import TableEditStatusButton from "../../../components/TableEditStatusButton/TableEditStatusButton";
import TableMassActionButton from "../../../components/TableMassActionButton/TableMassActionButton";

// ? TABLE STARTS HERE
function createData(
  dId,
  discountName,
  discountCode,
  discountType,
  timePeriod,
  date,
  totalUsage,
  status
) {
  return {
    dId,
    discountName,
    discountCode,
    discountType,
    timePeriod,
    date,
    totalUsage,
    status,
  };
}

const rows = [
  createData(
    1,
    "Discount 1",
    "JWL20OFF",
    "Product Discount",
    "From Today",
    "Till 05 May, 2023",
    "10 / 3000",
    "Active"
  ),
  createData(
    2,
    "Discount 2",
    "JWL20OFF",
    "Product Discount",
    "From Today",
    "Till 05 May, 2023",
    "10 / 3000",
    "Active"
  ),
  createData(
    3,
    "Discount 3",
    "JWL20OFF",
    "Product Discount",
    "From Today",
    "Till 05 May, 2023",
    "10 / 3000",
    "Active"
  ),
  createData(
    4,
    "Discount 4",
    "JWL20OFF",
    "Product Discount",
    "From Today",
    "Till 05 May, 2023",
    "10 / 3000",
    "Active"
  ),
];

const DiscountsTable = () => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("groupName");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const headCells = [
    {
      id: "discountName",
      numeric: false,
      disablePadding: true,
      label: "Name",
    },
    {
      id: "discountType",
      numeric: false,
      disablePadding: false,
      label: "Discount Type",
    },
    {
      id: "timePeriod",
      numeric: false,
      disablePadding: false,
      label: "Time Period",
    },
    {
      id: "totalUsage",
      numeric: false,
      disablePadding: false,
      label: "Total Usage",
    },
    {
      id: "status",
      numeric: false,
      disablePadding: true,
      label: "Status",
    },
    {
      id: "actions",
      numeric: false,
      disablePadding: true,
      label: "Actions",
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
      const newSelected = rows.map((n) => n.dId);
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

  return (
    <React.Fragment>
      {selected.length > 0 && (
        <div className="d-flex align-items-center px-2 mb-3">
          <button className="button-grey py-2 px-3">
            <small className="text-lightBlue">
              {selected.length} collections are selected&nbsp;
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
                const isItemSelected = isSelected(row.dId);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.dId}
                    selected={isItemSelected}
                    className="table-rows"
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                        onClick={(event) => handleClick(event, row.dId)}
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
                        {/* <img
                          src={ringSmall}
                          alt="ringSmall"
                          className="me-2"
                          height={45}
                          width={45}
                        /> */}
                        <p className="text-lightBlue rounded-circle fw-600">
                          {row.discountName}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell style={{ width: 180 }}>
                      <div className="d-flex flex-column">
                        <div className="d-flex align-items-center">
                          <p className="text-lightBlue me-2">
                            {row.discountCode}
                          </p>

                          <Tooltip title="Copy" placement="top">
                            <ContentCopyIcon
                              sx={{
                                color: "#5c6d8e",
                                fontSize: 12,
                                cursor: "pointer",
                              }}
                            />
                          </Tooltip>
                        </div>
                        <small className="text-grey-6 mt-1 d-block">
                          {row.discountType}
                        </small>
                      </div>
                    </TableCell>
                    <TableCell style={{ width: 180 }}>
                      <div className="d-flex flex-column">
                        <div className="d-flex">
                          <p className="text-lightBlue">{row.timePeriod}</p>
                        </div>
                        <small className="text-grey-6 mt-1 d-block">
                          {row.date}
                        </small>
                      </div>
                    </TableCell>
                    <TableCell style={{ width: 180 }}>
                      <div className="d-flex flex-column">
                        <div className="d-flex">
                          <p className="text-lightBlue me-2">
                            {row.totalUsage}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell style={{ width: 140, padding: 0 }}>
                      <div className="d-flex align-items-center">
                        <div className="rounded-pill d-flex table-status px-2 py-1 c-pointer">
                          <small className="text-black fw-400">
                            {row.status}
                          </small>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell style={{ width: 140, padding: 0 }}>
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
                        <Tooltip title="Duplicate" placement="top">
                          <div className="table-edit-icon rounded-4 p-2">
                            <ContentCopyIcon
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

export default DiscountsTable;
