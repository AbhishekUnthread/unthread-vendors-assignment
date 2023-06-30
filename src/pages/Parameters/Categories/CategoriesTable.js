import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// ! COMPONENT IMPORTS
import { EnhancedTableGapHead } from "../../../components/TableDependenciesWithGap/TableDependenciesWithGap";
import {
  EnhancedTableHeadSubTable,
  stableSort,
  getComparator,
} from "../../../components/TableDependenciesSubTable/TableDependenciesSubTable";

// ! MATERIAL IMPORTS
import {
  Box,
  Checkbox,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
// ! MATERIAL ICONS IMPORTS
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InventoryIcon from "@mui/icons-material/Inventory";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDispatch } from "react-redux";
import { updateCategoryId } from "../../../features/parameters/categories/categorySlice";
import { useGetAllSubCategoriesQuery } from "../../../features/parameters/categories/categoriesApiSlice";
import DeleteModal from "../../../components/DeleteDailogueModal/DeleteModal";
import TableEditStatusButton from "../../../components/TableEditStatusButton/TableEditStatusButton";
import { showSuccess } from "../../../features/snackbar/snackbarAction";
// ? TABLE STARTS HERE

const mainHeadCells = [
  {
    id: "categoriesName",
    numeric: false,
    disablePadding: true,
    label: "Categories Name",
  },
  {
    id: "noOfProducts",
    numeric: false,
    disablePadding: true,
    label: "No. Of Products",
  },
  {
    id: "noOfSubCategories",
    numeric: false,
    disablePadding: true,
    label: "No. of Sub-Categories",
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

const headCells = [
  {
    id: "subCategoriesName",
    numeric: false,
    disablePadding: true,
    label: "Sub Categories",
  },
  {
    id: "noOfProducts",
    numeric: false,
    disablePadding: true,
    label: "No Of Products",
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
// ? TABLE ENDS HERE

const CategoriesTable = ({
  list,
  edit,
  deleteData,
  deleteSubData,
  error,
  isLoading,
  subModalOpenHandler,
  bulkEdit
}) => {
  const dispatch = useDispatch();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("groupName");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [filterParameter, setFilterParameter] = useState({});
  const [showCreateDeleteModal, setShowCreateDeleteModal] = useState(false);
  const [rowData, setRowData] = useState({});
  const [selectedStatus, setSelectedStatus] = React.useState(null);


  const {
    data: subCategoriesData,
    isLoading: subCategoriesIsLoading,
    isSuccess: subCategoriesIsSuccess,
    error: subCategoriesError,
  } = useGetAllSubCategoriesQuery({
    ...filterParameter,
  });

  useEffect(() => {
    if (subCategoriesData?.data?.data) {
      setSubCategoryList(subCategoriesData?.data?.data);
    }
  }, [subCategoriesIsSuccess, subCategoriesData]);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - list.length) : 0;

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
      const newSelected = list.map((n) => n._id);
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

  const toggleCreateSubModalHandler = () => {
    // setShowCreateSubModal((prevState) => !prevState);
    // setShowCreatePopover(null);
  };

  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
  };

  useEffect(() => {
    // Update the state only if the selectedStatus state has a value
    if (selectedStatus !== null) {
      const newState = selected.map((id) => {
        if (selectedStatus === "Set as Active") {
          return {
            id,
            status: "active",
          };
        } else if (selectedStatus === "Set as Draft") {
          return {
            id,
            status: "draft",
          };
        } else {
          return {
            id,
            status: "", // Set a default value here if needed
          };
        }
      });
      bulkEdit({ updates: newState }).unwrap().then(()=>dispatch(showSuccess({ message: " Status updated successfully" })));
      setSelectedStatus(null);
    }
  }, [selected, selectedStatus]);


  function handleTableRowChange(row) {
    let categoryId = {};
    categoryId.categoryId = row._id;
    setFilterParameter(categoryId);
    if (open.length === 0) {
      let item = [...open];
      item.push(row._id);
      setOpen(item);
    }
    if (open.length > 0 && open.includes(row._id)) {
      setOpen((item) => item.filter((i) => i !== row._id));
    }
    if (open.length > 0 && !open.includes(row._id)) {
      let item = [...open];
      item.push(row._id);
      setOpen(item);
    }
  }

  const toggleArchiveModalHandler = (row) => {
    setShowCreateDeleteModal((prevState) => !prevState);
    setRowData(row);
  };

  function deleteRowData() {
    setShowCreateDeleteModal(false);
    deleteData(rowData);
  }

  return (
    <React.Fragment>
      {selected.length > 0 && (
        <div className="d-flex align-items-center px-2 mb-3">
          <button className="button-grey py-2 px-3">
            <small className="text-lightBlue">
              {selected.length} categories are selected&nbsp;
              <span
                className="text-blue-2 c-pointer ml-10"
                onClick={() => setSelected([])}
              >
                (Clear Selection)
              </span>
            </small>
          </button>

          <TableEditStatusButton onSelect={handleStatusSelect} defaultValue={['Set as Active','Set as Draft']} headingName="Edit Status"/>
          {/* <TableMassActionButton />  */}
        </div>
      )}
      {!error ? (
        list.length ? (
          <React.Fragment>
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size="medium"
              >
                <EnhancedTableHeadSubTable
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={list.length}
                  mainHeadCells={mainHeadCells}
                />
                <TableBody>
                  {stableSort(list, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row._id);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <React.Fragment key={row._id}>
                          <TableRow
                            hover
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={index}
                            selected={isItemSelected}
                            className="table-rows"
                            sx={{ "& > *": { borderBottom: "unset" } }}
                          >
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
                            <TableCell>
                              <IconButton
                                aria-label="expand row"
                                size="small"
                                onClick={() => handleTableRowChange(row)}
                              >
                                {open.length > 0 && open.includes(row._id) ? (
                                  <PlayArrowIcon
                                    style={{
                                      transform: "rotate(90deg)",
                                      fontSize: "15px",
                                    }}
                                  />
                                ) : (
                                  <PlayArrowIcon style={{ fontSize: "15px" }} />
                                )}
                              </IconButton>
                            </TableCell>
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                            >
                              <Link
                                className="text-decoration-none"
                                to="/parameters/categories/edit"
                              >
                                <p className="text-lightBlue rounded-circle fw-600">
                                  {row.name}
                                </p>
                              </Link>
                            </TableCell>
                            <TableCell style={{ width: 180 }}>
                              <p className="text-lightBlue">
                                {row.totalProduct}
                              </p>
                            </TableCell>

                            <TableCell style={{ width: 180 }}>
                              <p className="text-lightBlue">
                                {row.totalSubCategory}
                              </p>
                            </TableCell>

                            <TableCell style={{ width: 140, padding: 0 }}>
                              <div className="d-flex align-items-center">
                                <div
                                  className="rounded-pill d-flex px-2 py-1 c-pointer"
                                  style={{
                                    background:
                                      row.status == "active"
                                        ? "#A6FAAF"
                                        : row.status == "in-active"
                                        ? "#F67476"
                                        : row.status == "draft"
                                        ? "#C8D8FF"
                                        : "#FEE1A3",
                                  }}
                                >
                                  <small className="text-black fw-400">
                                    {row.status == "active"
                                      ? "Active"
                                      : row.status == "in-active"
                                      ? "In-Active"
                                      : row.status == "draft"
                                      ? "Archived"
                                      : "Scheduled"}
                                  </small>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell style={{ width: 120, padding: 0 }}>
                              <div className="d-flex align-items-center">
                                {edit && (
                                  <Tooltip
                                    title="Add Sub Category"
                                    placement="top"
                                    onClick={() => subModalOpenHandler(row)}
                                  >
                                    <div className="table-edit-icon rounded-4 p-2">
                                      <AddCircleOutlineIcon
                                        sx={{
                                          color: "#5c6d8e",
                                          fontSize: 18,
                                          cursor: "pointer",
                                        }}
                                      />
                                    </div>
                                  </Tooltip>
                                )}
                                {edit && (
                                  <Tooltip title="Edit" placement="top">
                                    <Link
                                      className="text-decoration-none"
                                      to="/parameters/categories/edit"
                                      onClick={() => {
                                        dispatch(updateCategoryId(row._id));
                                      }}
                                    >
                                      <div className="table-edit-icon rounded-4 p-2">
                                        <EditOutlinedIcon
                                          sx={{
                                            color: "#5c6d8e",
                                            fontSize: 18,
                                            cursor: "pointer",
                                          }}
                                        />
                                      </div>
                                    </Link>
                                  </Tooltip>
                                )}
                                {deleteData && (
                                  <Tooltip title={"Archived"} placement="top">
                                    <div
                                      onClick={(e) => {
                                        toggleArchiveModalHandler(row);
                                      }}
                                      className="table-edit-icon rounded-4 p-2"
                                    >
                                      <InventoryIcon
                                        sx={{
                                          color: "#5c6d8e",
                                          fontSize: 18,
                                          cursor: "pointer",
                                        }}
                                      />
                                    </div>
                                  </Tooltip>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              style={{ paddingBottom: 0, paddingTop: 0 }}
                              colSpan={9}
                            >
                              <Collapse
                                in={open.includes(row._id)}
                                timeout="auto"
                                unmountOnExit
                              >
                                <React.Fragment>
                                  <TableContainer>
                                    <Table
                                      sx={{ minWidth: 750 }}
                                      aria-labelledby="tableTitle"
                                      size="medium"
                                    >
                                      <EnhancedTableGapHead
                                        numSelected={selected.length}
                                        order={order}
                                        orderBy={orderBy}
                                        onSelectAllClick={handleSelectAllClick}
                                        onRequestSort={handleRequestSort}
                                        rowCount={subCategoryList?.length}
                                        headCells={headCells}
                                      />
                                      <TableBody>
                                        {stableSort(
                                          subCategoryList,
                                          getComparator(order, orderBy)
                                        )
                                          .slice(
                                            page * rowsPerPage,
                                            page * rowsPerPage + rowsPerPage
                                          )
                                          .map((row, index) => {
                                            const isItemSelected = isSelected(
                                              row._id
                                            );
                                            const labelId = `enhanced-table-checkbox-${index}`;

                                            return (
                                              <React.Fragment key={row._id}>
                                                <TableRow
                                                  hover
                                                  role="checkbox"
                                                  aria-checked={isItemSelected}
                                                  tabIndex={-1}
                                                  key={index}
                                                  selected={isItemSelected}
                                                  className="table-rows"
                                                  sx={{
                                                    "& > *": {
                                                      borderBottom: "unset",
                                                    },
                                                  }}
                                                >
                                                  <TableCell />
                                                  <TableCell padding="checkbox">
                                                    <Checkbox
                                                      checked={isItemSelected}
                                                      inputProps={{
                                                        "aria-labelledby":
                                                          labelId,
                                                      }}
                                                      onClick={(event) =>
                                                        handleClick(
                                                          event,
                                                          row._id
                                                        )
                                                      }
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
                                                    <Link
                                                      className="text-decoration-none"
                                                      // to="/parameters/categories/edit"
                                                      // onClick={()=>{
                                                      //   dispatch(updateCategoryId(row._id))
                                                      // }}
                                                    >
                                                      <p className="text-lightBlue rounded-circle fw-600">
                                                        {row.name}
                                                      </p>
                                                    </Link>
                                                  </TableCell>

                                                  <TableCell
                                                    style={{ width: 180 }}
                                                  >
                                                    <p className="text-lightBlue">
                                                      {row.totalProduct}
                                                    </p>
                                                  </TableCell>

                                                  <TableCell
                                                    style={{
                                                      width: 120,
                                                      padding: 0,
                                                    }}
                                                  >
                                                    <div className="d-flex align-items-center">
                                                      <div
                                                        className={`rounded-pill d-flex  px-2 py-1 c-pointer table-status`}
                                                      >
                                                        <small className="text-black fw-400">
                                                          {row.status}
                                                        </small>
                                                      </div>
                                                    </div>
                                                  </TableCell>
                                                  <TableCell
                                                    style={{
                                                      width: 120,
                                                      padding: 0,
                                                    }}
                                                  >
                                                    <div className="d-flex align-items-center">
                                                      {edit && (
                                                        <Tooltip
                                                          title="Edit"
                                                          placement="top"
                                                        >
                                                          <div
                                                            onClick={(e) => {
                                                              dispatch(
                                                                updateCategoryId(
                                                                  row._id
                                                                )
                                                              );
                                                            }}
                                                            className="table-edit-icon rounded-4 p-2"
                                                          >
                                                            <Link
                                                              className="text-decoration-none"
                                                              to="/parameters/subCategories/edit"
                                                            >
                                                              <EditOutlinedIcon
                                                                sx={{
                                                                  color:
                                                                    "#5c6d8e",
                                                                  fontSize: 18,
                                                                  cursor:
                                                                    "pointer",
                                                                }}
                                                              />
                                                            </Link>
                                                          </div>
                                                        </Tooltip>
                                                      )}
                                                      {deleteSubData && (
                                                        <Tooltip
                                                          title={"Archived"}
                                                          placement="top"
                                                        >
                                                          <div
                                                            onClick={(e) => {
                                                              deleteSubData(
                                                                row
                                                              );
                                                            }}
                                                            className="table-edit-icon rounded-4 p-2"
                                                          >
                                                            <InventoryIcon
                                                              sx={{
                                                                color:
                                                                  "#5c6d8e",
                                                                fontSize: 18,
                                                                cursor:
                                                                  "pointer",
                                                              }}
                                                            />
                                                          </div>
                                                        </Tooltip>
                                                      )}
                                                    </div>
                                                  </TableCell>
                                                </TableRow>
                                              </React.Fragment>
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
                                </React.Fragment>
                              </Collapse>
                            </TableCell>
                          </TableRow>
                        </React.Fragment>
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
              rowsPerPageOptions={[10, 20, 30]}
              component="div"
              count={list.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              className="table-pagination"
            />
          </React.Fragment>
        ) : isLoading ? (
          <span className="d-flex justify-content-center m-3">Loading...</span>
        ) : (
          <span className="d-flex justify-content-center m-3">
            No data found
          </span>
        )
      ) : (
        <></>
      )}
      <DeleteModal
        showCreateModal={showCreateDeleteModal}
        toggleArchiveModalHandler={toggleArchiveModalHandler}
        handleArchive={deleteRowData}
      />
    </React.Fragment>
  );
};

export default CategoriesTable;
