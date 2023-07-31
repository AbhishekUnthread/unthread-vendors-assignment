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
import { EnhancedTableHead, stableSort, getComparator } from "../../../components/TableDependencies/TableDependencies";
import TableEditStatusButton from "../../../components/TableEditStatusButton/TableEditStatusButton";
import TableMassActionButton from "../../../components/TableMassActionButton/TableMassActionButton";
// !IMAGES IMPORTS
import storeIcon from "../../../assets/icons/storeIcon.svg";
// ! MATERIAL ICONS IMPORTS
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InventoryIcon from "@mui/icons-material/Inventory";
import TableLoader from "../../../components/Loader/TableLoader";
import NoDataFound from "../../../components/NoDataFound/NoDataFound";

const AllInventory = ({
  list = [],
  error = null,
  totalCount = 0,
  isLoading = true,
  // edit,
  // deleteData,
  // vendorType,
  // bulkDelete,
  // editVendor,
  // bulkEdit,
  rowsPerPage = 10,
  changeRowsPerPage = () => {},
  changePage = () => {},
  page = 0,
}) => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("selectStore");
  const [selected, setSelected] = React.useState([]);
  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const headCells = [
    {
      id: "selectStore",
      numeric: false,
      disablePadding: true,
      label: "Select Store",
    },
    {
      id: "noOfProducts",
      numeric: false,
      disablePadding: false,
      label: "No. of Products",
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - list.length) : 0;

  const handleChangePage = (event, newPage) => {
    changePage(newPage);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = list.map((n) => n.sId);
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
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handleChangeRowsPerPage = (event) => {
    changeRowsPerPage(parseInt(event.target.value, 10));
    changePage(0);
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
                onClick={() => setSelected([])}>
                (Clear Selection)
              </span>
            </small>
          </button>
          <TableEditStatusButton />
          <TableMassActionButton />
        </div>
      )}
      {!error ? (
        list.length ? (
          <>
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size="medium">
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={list.length}
                  headCells={headCells}
                />
                <TableBody>
                  {stableSort(list, getComparator(order, orderBy)).map((row, index) => {
                    const isItemSelected = isSelected(row._id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row._id}
                        selected={isItemSelected}
                        className="table-rows">
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                            onClick={(event) => handleClick(event, row._id)}
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
                          padding="none">
                          <Link
                            className="text-decoration-none"
                            to="/products/inventory/details">
                            <div className="d-flex align-items-center py-3">
                              <img
                                src={storeIcon}
                                alt="storeIcon"
                                className="me-2"
                                height={45}
                                width={45}
                              />
                              <div>
                                <p className="text-lightBlue rounded-circle fw-600">{row.name}</p>
                                <small className="text-grey-6 mt-1">
                                  {row.address.line1} {row.address.line2} {row.address.state.name} {row.address.pincode}{" "}
                                  {row.address.country.name}
                                </small>
                              </div>
                            </div>
                          </Link>
                        </TableCell>
                        <TableCell style={{ width: 180 }}>
                          <p className="text-lightBlue">{row.noOfProducts}</p>
                        </TableCell>
                        <TableCell style={{ width: 140, padding: 0 }}>
                          <div className="d-flex align-items-center">
                            <div className="rounded-pill d-flex table-status px-2 py-1 c-pointer">
                              <small className="text-black fw-400">{row.status}</small>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell style={{ width: 140, padding: 0 }}>
                          <div className="d-flex align-items-center">
                            <Tooltip
                              title="Edit"
                              placement="top">
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
                            <Tooltip
                              title="Archive"
                              placement="top">
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
                      }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 20, 30]}
              component="div"
              count={totalCount}
              rowsPerPage={rowsPerPage}
              page={page - 1}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              className="table-pagination"
            />
          </>
        ) : isLoading ? (
          <span className="d-flex justify-content-center m-3">
            <TableLoader />
          </span>
        ) : (
          <span className="d-flex justify-content-center m-3">
            <NoDataFound />
          </span>
        )
      ) : (
        <></>
      )}
    </React.Fragment>
  );
};

export default AllInventory;
