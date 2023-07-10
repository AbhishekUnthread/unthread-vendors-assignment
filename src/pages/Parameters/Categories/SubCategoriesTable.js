import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// ! COMPONENT IMPORTS
import {
  EnhancedTableHead,
  stableSort,
  getComparator,
} from "../../../components/TableDependencies/TableDependencies";
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
// ! MATERIAL ICONS IMPORTS
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InventoryIcon from "@mui/icons-material/Inventory";
import TableEditStatusButton from "../../../components/TableEditStatusButton/TableEditStatusButton";
import TableMassActionButton from "../../../components/TableMassActionButton/TableMassActionButton";
import { updateCategoryId } from "../../../features/parameters/categories/categorySlice";
import { useDispatch } from "react-redux";
import ArchivedModal from "../../../components/DeleteDailogueModal/DeleteModal";
import { showSuccess } from "../../../features/snackbar/snackbarAction";
import DeleteIcon from '@mui/icons-material/Delete';
import UnArchivedModal from "../../../components/UnArchivedModal/UnArchivedModal";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";
import moment from "moment";

// ? TABLE STARTS HERE

const headCells = [
  {
    id: "subCategoriesName",
    numeric: false,
    disablePadding: true,
    label: "Sub Categories Name",
  },
  {
    id: "parentCategory",
    numeric: false,
    disablePadding: true,
    label: "Parent Category",
  },
  {
    id: "noOfProducts",
    numeric: false,
    disablePadding: true,
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
// ? TABLE ENDS HERE

const SubCategoriesTable = ({
  list,
  edit,
  deleteData,
  error,
  isLoading,
  bulkEdit,
  editSubCategory,
  archived,
  totalCount
}) => {
  const dispatch = useDispatch();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("groupName");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [showArchivedModal, setShowArchivedModal] = useState(false);
  const [rowData, setRowData] = useState({});
  const [showUnArchivedModal, setShowUnArchivedModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState(null);
  const [handleStatusValue,setHandleStatusValue] = useState('in-active')
  const [showDeleteModal,setShowDeleteModal] = useState(false)
  const [forMassAction, setForMassAction] = React.useState(false);
  const [massActionStatus, setMassActionStatus] = React.useState("");

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
        } else if (selectedStatus === "Set as Archieved") {
          return {
            id,
            status: "archieved",
          };
        }else if (selectedStatus === "Set as Un-Archived") {
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
      bulkEdit({ updates: newState })
        .unwrap()
        .then(() =>
          dispatch(showSuccess({ message: "Sub Categories Status updated successfully" }))
        );
      setSelectedStatus(null);
    }
  }, [selected, selectedStatus]);

  const toggleArchiveModalHandler = (row) => {
    showArchivedModal((prevState) => !prevState);
    setRowData(row);
  };

  const toggleDeleteModalHandler =(row)=>{
    setShowDeleteModal((prevState) => !prevState)
    setRowData(row);
  }

  const toggleUnArchiveModalHandler = (row) => {
    setShowUnArchivedModal((prevState) => !prevState);
    setRowData(row);
  };

  function deleteData(){
    setShowDeleteModal(false)
    if(forMassAction === true){
      setSelectedStatus(massActionStatus)
      return
    }
    deleteData(rowData)
  }

  function deleteRowData() {
    showArchivedModal(false);
    if(forMassAction === true){
      setSelectedStatus(massActionStatus)
      return
    }
    editSubCategory({
      id:rowData._id,
      details:{
        status:'archieved'
      }
    })
    dispatch(showSuccess({ message: "Archived this Sub category successfully" }));
  }

  function handleUnArchived(){
    setShowUnArchivedModal(false)
    if(forMassAction === true){
      setSelectedStatus(massActionStatus)
      return
    }
    editSubCategory({
      id:rowData._id,
      details:{
        status:handleStatusValue
      }
    })
    dispatch(showSuccess({ message: "Un-Archived this Sub category successfully" }));
  }

  const handleMassAction  = (status) => {
    setMassActionStatus(status);
    setForMassAction(true)
    if(status === "Set as Archived") {
      setShowArchivedModal(true);
    } else if(status === "Set as Un-Archived") {
      setShowUnArchivedModal(true);
    } else if(status === "Delete") {
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
                className="text-blue-2 c-pointer"
                onClick={() => setSelected([])}
              >
                (Clear Selection)
              </span>
            </small>
          </button>

          <TableEditStatusButton onSelect={handleStatusSelect} defaultValue={['Set as Active','Set as Archieved']} headingName="Edit Status"/>
          <TableMassActionButton headingName="Mass Action" onSelect={handleMassAction} defaultValue={archived?['Edit','Set as Archived']:["Set as Un-Archived"]}/>
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
                  {stableSort(list, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row._id);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={index}
                          selected={isItemSelected}
                          className="table-rows"
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
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            <Link
                              className="text-decoration-none"
                              to="/parameters/subCategories/edit"
                              onClick={() => {
                                dispatch(updateCategoryId(row._id));
                              }}
                            >
                              <p className="text-lightBlue rounded-circle fw-600">
                                {row.name}
                              </p>
                            </Link>
                          </TableCell>
                          <TableCell style={{ width: 180 }}>
                            <p className="text-lightBlue">
                              {row.category?.[0]?.name}
                            </p>
                          </TableCell>

                          <TableCell style={{ width: 180 }}>
                            <p className="text-lightBlue">{row.totalProduct}</p>
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
                                      : row.status == "archieved"
                                      ? "#C8D8FF"
                                      : "#FEE1A3",
                                }}
                              >
                                <small className="text-black fw-400">
                                  {row.status == "active"
                                    ? "Active"
                                    : row.status == "in-active"
                                    ? "In-Active"
                                    : row.status == "archieved"
                                    ? "Archived"
                                    : "Scheduled"}
                                </small>
                              </div>
                              { row.status == "scheduled" && 
                          <div>
                            <small className="text-blue-2">
                              {row.startDate && (
                                <>
                                  for {moment(row.startDate).format("DD/MM/YYYY")}
                                </>
                              )}
                              {row.startDate && row.endDate && ' '}
                              {row.endDate && (
                                <>
                                  till {moment(row.endDate).format("DD/MM/YYYY")}
                                </>
                              )}
                            </small>
                          </div>
                        }
                            </div>
                          </TableCell>
                          <TableCell style={{ width: 120, padding: 0 }}>
                            <div className="d-flex align-items-center">
                              {edit && archived && (
                                <Tooltip title="Edit" placement="top">
                                  <Link
                                    className="text-decoration-none"
                                    to="/parameters/subCategories/edit"
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
                              {!archived &&(
                                   <Tooltip title={"Archived"} placement="top">
                                   <div
                                     onClick={(e) => {
                                      toggleDeleteModalHandler(row)
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
                              {deleteData && (
                                <Tooltip title={archived ?"Archived":"Un Archived"} placement="top">
                                  <div
                                    onClick={(e) => {
                                      if(archived){

                                        toggleArchiveModalHandler(row);
                                      }else{
                                        toggleUnArchiveModalHandler(row)
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
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={totalCount}
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
      <ArchivedModal
      name={'Archived'}
        showCreateModal={showArchivedModal}
        toggleArchiveModalHandler={toggleArchiveModalHandler}
        handleArchive={deleteRowData}
      />
      <UnArchivedModal
      showUnArchivedModal={showUnArchivedModal}
      closeUnArchivedModal={()=>setShowUnArchivedModal(false)}
      handleUnArchived={handleUnArchived}
      handleStatusValue={setHandleStatusValue}
       />
       <DeleteModal
       name={"This Sub Category"}
       showCreateModal={showDeleteModal}
       toggleArchiveModalHandler={toggleDeleteModalHandler}
       handleArchive={deleteData}
        />
    </React.Fragment>
  );
};

export default SubCategoriesTable;
