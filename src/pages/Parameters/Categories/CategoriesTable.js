import React, { forwardRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Paper,
  Slide,
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
import ArchivedModal from "../../../components/DeleteDailogueModal/DeleteModal";
import TableEditStatusButton from "../../../components/TableEditStatusButton/TableEditStatusButton";
import { showSuccess } from "../../../features/snackbar/snackbarAction";
import DeleteIcon from "@mui/icons-material/Delete";
import UnArchivedModal from "../../../components/UnArchivedModal/UnArchivedModal";
import TableMassActionButton from "../../../components/TableMassActionButton/TableMassActionButton";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";
import unArchived from "../../../assets/images/Components/Archived.png";
import closeModal from "../../../assets/icons/closeModal.svg";
import moment from "moment";
import NoDataFound from "../../../components/NoDataFound/NoDataFound";
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

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CategoriesTable = ({
  list,
  edit,
  deleteData,
  deleteSubData,
  error,
  isLoading,
  subModalOpenHandler,
  bulkEdit,
  bulkSubEdit,
  bulkDeleteCategory,
  editCategory,
  editSubPageHandler,
  editSubCategory,
  archived,
  totalCount,
  editPageHandler,
  rowsPerPage,
  changeRowsPerPage,
  changePage,
  page,
  cateoryOpenState,
  setCategoryOpenState,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("groupName");
  const [selected, setSelected] = React.useState([]);
  const [open, setOpen] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [filterParameter, setFilterParameter] = useState();

  const [showArchivedModal, setShowArchivedModal] = useState(false);
  const [showUnArchivedModal, setShowUnArchivedModal] = useState(false);
  const [rowData, setRowData] = useState({});
  const [selectedStatus, setSelectedStatus] = React.useState(null);
  const [handleStatusValue, setHandleStatusValue] = useState("in-active");
  const [toggleCategoris, setToggleCategoris] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [forMassAction, setForMassAction] = React.useState(false);
  const [massActionStatus, setMassActionStatus] = React.useState("");

  console.log(list)

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

  const handleSelectAllClickForSub = (event) => {
    if (event.target.checked) {
      const newSelected = subCategoryList.map((n) => n._id);
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

  const isSelected = (name) => selected.indexOf(name) !== -1;


  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
  };

  useEffect(() => {
    // Update the state only if the selectedStatus state has a value
    console.log(selectedStatus);
    if (selectedStatus !== null) {
      const newState = selected.map((id) => {
        if (selectedStatus === "Set as Active") {
          return {
            id,
            status: "active",
          };
        } else if (selectedStatus === "Set as Archived") {
          return {
            id,
            status: "archieved",
          };
        } else if (selectedStatus === "Set as in-Active") {
          return {
            id,
            status: "in-active",
          };
        } else if (selectedStatus === "Set as Un-Archived") {
          return {
            id,
            status: handleStatusValue,
          };
        } else {
          return {
            id,
            status: "", // Set a default value here if needed
          };
        }
      });

      if (toggleCategoris) {
        bulkEdit({ updates: newState })
          .unwrap()
          .then(() =>
            dispatch(
              showSuccess({ message: "Categories Status updated successfully" })
            )
          );
        setSelected([]);
        setSelectedStatus(null);
      } else {
        bulkSubEdit({ updates: newState })
          .unwrap()
          .then(() =>
            dispatch(showSuccess({ message: "Sub Categoris Status updated successfully" }))
          );
        setSelected([]);
        setToggleCategoris(true);
        setSelectedStatus(null);
      }
    }
  }, [selected, selectedStatus]);

  function handleTableRowChange(row) {
    let categoryId = {};
    categoryId.categoryId = row._id;
    categoryId.status = ["active", "scheduled", "in-active"];
    setFilterParameter(categoryId);
    if (open.length === 0) {
      let item = [];
      item.push(row._id);
      setOpen(item);
    }
    if (open.length > 0 && open.includes(row._id)) {
      setOpen((item) => item.filter((i) => i !== row._id));
    }
    if (open.length > 0 && !open.includes(row._id)) {
      let item = [];
      item.push(row._id);
      setOpen(item);
    }
  }

  useEffect(()=>{
    if(cateoryOpenState?.open === true){
      setFilterParameter({categoryId:cateoryOpenState.id,status:["active", "scheduled", "in-active"]});
      if (open.length === 0) {
        let item = [];
        item.push(cateoryOpenState.id);
        setOpen(item);
        
      }
      if (open.length > 0 && open.includes(cateoryOpenState.id)) {
        setOpen((item) => item.filter((i) => i !== cateoryOpenState.id));
        
      }
      if (open.length > 0 && !open.includes(cateoryOpenState.id)) {
        let item = [];
        item.push(cateoryOpenState.id);
        setOpen(item);
      }
      let state={
        id:"",
        open:false
      }
      setCategoryOpenState(state)

    }
  },[cateoryOpenState])

  const toggleArchiveModalHandler = (row) => {
    setShowArchivedModal((prevState) => !prevState);
    setRowData(row);
  };

  const toggleDeleteModalHandler = (row) => {
    setShowDeleteModal((prevState) => !prevState);
    setRowData(row);
  };

  const toggleUnArchiveModalHandler = (row) => {
    setShowUnArchivedModal((prevState) => !prevState);
    setRowData(row);
  };

  function handleArchived() {
    setShowArchivedModal(false);
    if (forMassAction === true) {
      setSelectedStatus(massActionStatus);
      return;
    }
    if (toggleCategoris && forMassAction === false) {
      editCategory({
        id: rowData._id,
        details: {
          status: "archieved",
        },
      });
      dispatch(showSuccess({ message: "Category Archived successfully" }));
    } else {
      editSubCategory({
        id: rowData._id,
        details: {
          status: "archieved",
        },
      });
      dispatch(
        showSuccess({ message: "Sub category Archived  successfully" })
      );
      setToggleCategoris(true);
    }
  }

  function handleUnArchived() {
    setShowUnArchivedModal(false);
    if (forMassAction === true) {
      setSelectedStatus(massActionStatus);
      return;
    }
    if (toggleCategoris && forMassAction === false) {
      editCategory({
        id: rowData._id,
        details: {
          status: handleStatusValue,
        },
      });
      dispatch(
        showSuccess({ message: "Category Un-Archived successfully" })
      );
    } else {
      editSubCategory({
        id: rowData._id,
        details: {
          status: handleStatusValue,
        },
      });
      dispatch(
        showSuccess({ message: "Sub Category Un-Archived successfully" })
      );
      setToggleCategoris(true);
    }
  }

  function deleteDatas() {
    if (selected.length > 0 && forMassAction === true) {
      const newState = selected.map((i) => i);
      bulkDeleteCategory({ deletes: newState }).then(() => {
        dispatch(
          showSuccess({ message: "This categories Deleted successfully" })
        );
      });
      setSelectedStatus(null);
      setSelected([]);
      return;
    }
    setShowDeleteModal(false);
    deleteData(rowData);
    // dispatch(showSuccess({ message: "Deleted this category successfully" }));
  }

  const handleMassAction = (status) => {
    setMassActionStatus(status);
    setForMassAction(true);
    if (status === "Set as Archived") {
      setShowArchivedModal(true);
    } else if (status === "Set as Un-Archived") {
      setShowUnArchivedModal(true);
    } else if (status === "Delete") {
      setShowDeleteModal(true);
    }
  };

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

          <TableEditStatusButton
            onSelect={handleStatusSelect}
            defaultValue={["Set as Active", "Set as in-Active"]}
            headingName="Edit Status"
          />
          <TableMassActionButton
            headingName="Mass Action"
            onSelect={handleMassAction}
            defaultValue={
              archived
                ? ["Edit", "Set as Archived"]
                : ["Delete", "Set as Un-Archived"]
            }
          />
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
                  {stableSort(list, getComparator(order, orderBy)).map(
                    (row, index) => {
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
                            // sx={{ "& > *": { borderBottom: "unset" } }}
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
                            {archived ? (
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
                                    <PlayArrowIcon
                                      style={{ fontSize: "15px" }}
                                    />
                                  )}
                                </IconButton>
                              </TableCell>
                            ) : (
                              <p></p>
                            )}
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                            >
                              <Link
                                className="text-decoration-none"
                                onClick={editPageHandler.bind(null, index + 1)}
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

                            <TableCell style={{ width: 180, padding: 0 }}>
                              <div className="d-block">
                                <div
                                  className="rounded-pill d-flex px-2 py-1  statusBoxWidth"
                                  style={{
                                    background:
                                      row.status == "active"
                                        ? "#A6FAAF"
                                        : row.status == "in-active"
                                        ? "#F67476"
                                        : row.status == "archieved"
                                        ? "#C8D8FF"
                                        : "#FEE1A3",
                                  }}
                                >
                                  <small className="text-black fw-500">
                                    {row.status == "active"
                                      ? "Active"
                                      : row.status == "in-active"
                                      ? "In-Active"
                                      : row.status == "archieved"
                                      ? "Archived"
                                      : "Scheduled"}
                                  </small>
                                </div>
                                {row.status == "scheduled" && (
                                  <div>
                                    <small className="text-blue-2">
                                      {row.startDate && (
                                        <>
                                          for{" "}
                                          {moment(row.startDate).format(
                                            "DD/MM/YYYY"
                                          )}
                                        </>
                                      )}
                                      {row.startDate && row.endDate && " "}
                                      {row.endDate && (
                                        <>
                                          till{" "}
                                          {moment(row.endDate).format(
                                            "DD/MM/YYYY"
                                          )}
                                        </>
                                      )}
                                    </small>
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell style={{ width: 120, padding: 0 }}>
                              <div className="d-flex align-items-center">
                                {edit && archived && (
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
                                {edit && archived && (
                                  <Tooltip title="Edit" placement="top">
                                    <Link
                                      className="text-decoration-none"
                                      onClick={editPageHandler.bind(
                                        null,
                                        index + 1
                                      )}
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
                                  <Tooltip
                                    title={
                                      archived ? "Archived" : "Un Archived"
                                    }
                                    placement="top"
                                  >
                                    <div
                                      onClick={(e) => {
                                        if (archived) {
                                          toggleArchiveModalHandler(row);
                                        } else {
                                          toggleUnArchiveModalHandler(row);
                                        }
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
                                {!archived && (
                                  <Tooltip title={"Delete"} placement="top">
                                    <div
                                      onClick={(e) => {
                                        toggleDeleteModalHandler(row);
                                      }}
                                      className="table-edit-icon rounded-4 p-2"
                                    >
                                      <DeleteIcon
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
                                  <TableContainer style={{ padding: '20px' }}>
                                    <Table
                                      sx={{ minWidth: 750 }}
                                      aria-labelledby="tableTitle"
                                      size="medium"
                                    >
                                      <EnhancedTableGapHead
                                        numSelected={selected.length}
                                        order={order}
                                        orderBy={orderBy}
                                        onSelectAllClick={(e) => {
                                          setToggleCategoris(false);
                                          handleSelectAllClickForSub(e);
                                        }}
                                        onRequestSort={handleRequestSort}
                                        rowCount={subCategoryList?.length}
                                        headCells={headCells}
                                      />
                                      <TableBody>
                                        {stableSort(
                                          subCategoryList,
                                          getComparator(order, orderBy)
                                        ).map((row, index) => {
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
                                                    onClick={(event) => {
                                                      setToggleCategoris(false);
                                                      handleClick(
                                                        event,
                                                        row._id
                                                      );
                                                    }}
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
                                                    onClick={editSubPageHandler.bind(
                                                      null,
                                                      index + 1
                                                    )}
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
                                                      className="rounded-pill d-flex px-2 py-1 "
                                                      style={{
                                                        background:
                                                          row.status == "active"
                                                            ? "#A6FAAF"
                                                            : row.status ==
                                                              "in-active"
                                                            ? "#F67476"
                                                            : row.status ==
                                                              "archieved"
                                                            ? "#C8D8FF"
                                                            : "#FEE1A3",
                                                      }}
                                                    >
                                                      <small className="text-black fw-400">
                                                        {row.status == "active"
                                                          ? "Active"
                                                          : row.status ==
                                                            "in-active"
                                                          ? "In-Active"
                                                          : row.status ==
                                                            "archieved"
                                                          ? "Archived"
                                                          : "Scheduled"}
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
                                                    {edit &&
                                                      row?.status !==
                                                        "archieved" && (
                                                        <Tooltip
                                                          title="Edit"
                                                          placement="top"
                                                        >
                                                          <div className="table-edit-icon rounded-4 p-2">
                                                            <Link
                                                              className="text-decoration-none"
                                                              onClick={editSubPageHandler.bind(
                                                                null,
                                                                index + 1
                                                              )}
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
                                                        title={
                                                          row?.status ===
                                                          "archieved"
                                                            ? "Un Archived"
                                                            : "Archived"
                                                        }
                                                        placement="top"
                                                      >
                                                        <div
                                                          onClick={(e) => {
                                                            setToggleCategoris(
                                                              false
                                                            );
                                                            if (
                                                              row?.status !==
                                                              "archieved"
                                                            ) {
                                                              toggleArchiveModalHandler(
                                                                row
                                                              );
                                                            } else {
                                                              toggleUnArchiveModalHandler(
                                                                row
                                                              );
                                                            }
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
                                            </React.Fragment>
                                          );
                                        })}
                                      </TableBody>
                                    </Table>
                                  </TableContainer>
                                </React.Fragment>
                              </Collapse>
                            </TableCell>
                          </TableRow>
                        </React.Fragment>
                      );
                    }
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 15]}
              component="div"
              count={totalCount}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={changePage}
              onRowsPerPageChange={changeRowsPerPage}
              className="table-pagination"
            />
          </React.Fragment>
        ) : isLoading ? (
          <span className="d-flex justify-content-center m-3">Loading...</span>
        ) : (
          <span className="d-flex justify-content-center m-3">
            <NoDataFound />
          </span>
        )
      ) : (
        <></>
      )}

      <Dialog
        open={showArchivedModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={toggleArchiveModalHandler}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="sm"
      >
        <DialogContent className="py-2 px-4 text-center">
          <img
            src={closeModal}
            alt="question"
            width={40}
            className="closeModal"
            onClick={toggleArchiveModalHandler}
          />
          <img
            src={unArchived}
            alt="question"
            width={160}
            className="mb-4 mt-4"
          />
          <div className="row"></div>
          <h5 className="text-lightBlue mt-2 mb-3">
            Archive
            <span className="text-blue-2">
              {" "}
              "{selected.length == 0 ? rowData?.name : selected.length}"{" "}
            </span>
            {selected.length > 1 ? "Category" : " Categoris"}
          </h5>
          <h6 className="mt-3 mb-2" style={{ color: "#5C6D8E" }}>
            <span className="text-blue-2"> 0 products </span>
            in this Category will be unassigned from it.
          </h6>
          <h6 className="mt-3 mb-2" style={{ color: "#5C6D8E" }}>
            <span className="text-blue-2"> {rowData?.totalSubCategory} {rowData?.totalSubCategory > 1 ? "SubCategory":"SubCategories"} </span>
            in this category will be Archive from it.
          </h6>
          <h6 className="mt-2 mb-4" style={{ color: "#5C6D8E" }}>
            Would you like to Archive this Category ?
          </h6>
        </DialogContent>
        <DialogActions className="d-flex justify-content-center px-4 pb-4">
          <button
            className="button-lightBlue-outline py-2 px-3 me-4"
            onClick={toggleArchiveModalHandler}
          >
            <p>Cancel</p>
          </button>
          <button
            className="button-red-outline py-2 px-3"
            onClick={handleArchived}
          >
            <p>Archive</p>
          </button>
        </DialogActions>
      </Dialog>
      <UnArchivedModal
        showUnArchivedModal={showUnArchivedModal}
        closeUnArchivedModal={() => setShowUnArchivedModal(false)}
        handleUnArchived={handleUnArchived}
        handleStatusValue={setHandleStatusValue}
        name={selected.length == 0 ? rowData?.name : selected.length}
        nameType={selected.length == 0 ? "Category" : "Categories"}
      />
      <DeleteModal
        name={
          selected.length == 0
            ? `${rowData?.name} Category `
            : `${selected.length} Categories `
        }
        showCreateModal={showDeleteModal}
        toggleArchiveModalHandler={toggleDeleteModalHandler}
        handleArchive={deleteDatas}
      />
    </React.Fragment>
  );
};

export default CategoriesTable;
