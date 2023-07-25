import React, { forwardRef, useEffect, useState } from "react";
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
  Dialog,
  DialogActions,
  DialogContent,
  Slide,
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
import { showSuccess } from "../../../features/snackbar/snackbarAction";
import DeleteIcon from "@mui/icons-material/Delete";
import unArchived from "../../../assets/images/Components/Archived.png";
import closeModal from "../../../assets/icons/closeModal.svg";
import moment from "moment";
import NoDataFound from "../../../components/NoDataFound/NoDataFound";
import ArchiveModal, { MultipleArchiveModal } from "../../../components/ArchiveModal/ArchiveModal";
import UnArchiveModal, { MultipleUnArchiveModal } from "../../../components/UnArchiveModal/UnArchiveModal";
import { DeleteModalSecondary } from "../../../components/DeleteModal/DeleteModal";

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
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SubCategoriesTable = ({
  list,
  edit,
  deleteData,
  error,
  isLoading,
  bulkEdit,
  editSubCategory,
  bulkDeleteSubCategory,
  archived,
  totalCount,
  editPageHandler,
  rowsPerPage,
  changeRowsPerPage,
  changePage,
  page,
}) => {
  const dispatch = useDispatch();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("groupName");
  const [selected, setSelected] = React.useState([]);
  const [showArchivedModal, setShowArchivedModal] = useState(false);
  const [rowData, setRowData] = useState({});
  const [showUnArchivedModal, setShowUnArchivedModal] = useState(false);
  const [showMultipleDeleteModal,setShowMultipleDeleteModal] = useState(false)
  const [showMultipleArchivedModal,setShowMultipleArchivedModal] = useState(false)
  const [showMultipleUnArhcivedModal,setShowMultipleUnArhcivedModal] = useState(false)
  const [selectedStatus, setSelectedStatus] = React.useState(null);
  const [handleStatusValue, setHandleStatusValue] = useState("in-active");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [forMassAction, setForMassAction] = React.useState(false);
  const [massActionStatus, setMassActionStatus] = React.useState("");

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
        }else if (selectedStatus === "Set as in-Active") {
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
      bulkEdit({ updates: newState })
        .unwrap()
        .then(() =>
        {
          const successMessage =
          selectedStatus === "Set as Un-Archived"
            ? "Sub Categories un-archived  successfully"
            : selectedStatus === "Set as Archived"
              ? "Sub Categories archived  successfully" : "Status updated successfully";
           dispatch(
            showSuccess({
              message: successMessage,
            })
          )}
        );
      setSelectedStatus(null);
      setSelected([]);
    }
  }, [selected, selectedStatus]);

  const toggleArchiveModalHandler = (row) => {
    setRowData(row);
    if(selected.length === 0){
    setShowArchivedModal((prevState) => !prevState);
    }else{
      setShowMultipleArchivedModal((prevState) => !prevState)
    }
  };

  const toggleDeleteModalHandler = (row) => {
    setRowData(row)
    if(selected.length === 0){

      setShowDeleteModal((prevState) => !prevState);
    }else{
      setShowMultipleDeleteModal((prevState) => !prevState)
     
    }
  };

  const toggleUnArchiveModalHandler = (row) => {
    setRowData(row);
    if(selected.length === 0){

      setShowUnArchivedModal((prevState) => !prevState);
    }else{
      setShowMultipleUnArhcivedModal((prevState) => !prevState)
    }
    
  };

  function deleteSubData() {
    setShowDeleteModal(false);
    setShowMultipleDeleteModal(false)
    if (selected.length > 0 && forMassAction === true) {
      const newState = selected.map((i) => i);
      bulkDeleteSubCategory({ deletes: newState }).then(() => {
        dispatch(
          showSuccess({ message: " Sub categories Deleted successfully" })
        );
      });
      setSelectedStatus(null);
      setSelected([]);
      return;
    }
    deleteData(rowData);
  }

  function handleArchived() {
    setShowArchivedModal(false);
    setShowMultipleArchivedModal(false)
    if (forMassAction === true) {
      setSelectedStatus(massActionStatus);
      return;
    }
    editSubCategory({
      id: rowData._id,
      details: {
        status: "archieved",
      },
    });
    dispatch(
      showSuccess({ message: "Sub category Archived successfully" })
    );
  }

  function handleUnArchived() {
    setShowUnArchivedModal(false);
    setShowMultipleUnArhcivedModal(false)
    if (forMassAction === true) {
      setSelectedStatus(massActionStatus);
      return;
    }
    editSubCategory({
      id: rowData._id,
      details: {
        status: handleStatusValue,
      },
    });
    dispatch(
      showSuccess({ message: "Sub Category un-archived Successfully" })
    );
  }

  const handleMassAction = (status) => {
    setMassActionStatus(status);
    setForMassAction(true);
    if (status === "Set as Archived") {
      setShowMultipleArchivedModal(true);
    } else if (status === "Set as Un-Archived") {
      setShowMultipleUnArhcivedModal(true);
    } else if (status === "Delete") {
      setShowMultipleDeleteModal(true);
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
                  {stableSort(list, getComparator(order, orderBy)).map(
                    (row, index) => {
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
                              onClick={() => {
                                if (archived === true) {
                                  editPageHandler(index + 1);
                                  return;
                                }
                                return;
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
                                  title={archived ? "Archived" : "Un Archived"}
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
      <ArchiveModal
          onConfirm ={handleArchived}
          onCancel={toggleArchiveModalHandler}
          show={showArchivedModal}
          title={"Sub Category"}
          message={rowData?.name}
          products={"25 products"}
        />
        
     
         
         <MultipleArchiveModal
          onConfirm ={handleArchived}
          onCancel={toggleArchiveModalHandler}
          show={showMultipleArchivedModal}
          title={"Sub Categories"}
          message={`${selected.length === 1 ? `${selected.length} Sub Category` : `${selected.length} Sub Categories`}`}
          pronoun ={`${selected.length === 1 ? "this" : `these`}`}
        />
        <UnArchiveModal
        onConfirm={handleUnArchived}
        onCancel={() => setShowUnArchivedModal(false)}
        show={showUnArchivedModal}
        title={"Un-Archive Sub Category ?"}
        primaryMessage={`Before un-archiving <span class='text-blue-1'>${rowData?.name}</span> Sub Category,
        `}
        secondaryMessage={"Please set its status"}
        confirmText={"Un-Archive"}
        handleStatusValue={(val)=> setHandleStatusValue(val)}
        icon={unArchived}
        />
         <MultipleUnArchiveModal
        onConfirm={handleUnArchived}
        onCancel={() => setShowMultipleUnArhcivedModal(false)}
        show={showMultipleUnArhcivedModal}
        title={"Un-Archive Sub Categories ?"}
        primaryMessage={`Before un-archiving <span class='text-blue-1'>${selected.length}</span> ${selected.length===1?" Sub Category":"Sub Categories"},
        `}
        secondaryMessage={"Please set its status"}
        confirmText={"Un-Archive"}
        handleStatusValue={(val)=> setHandleStatusValue(val)}
        icon={unArchived}
        />
         <DeleteModalSecondary
          onConfirm ={deleteSubData}
          onCancel={toggleDeleteModalHandler}
          show={showDeleteModal}
          title={"Sub Category"}
          message={rowData?.name}
        />
          <DeleteModalSecondary
          onConfirm ={deleteSubData}
          onCancel={toggleDeleteModalHandler}
          show={showMultipleDeleteModal}
          title={"multiple Sub Categories"}
          message={`${selected.length === 1 ? `${selected.length} Sub Category` : `${selected.length} Sub Categories`}`}
        /> 
    </React.Fragment>
  );
};

export default SubCategoriesTable;
