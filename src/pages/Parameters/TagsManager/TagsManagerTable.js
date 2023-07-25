import React, { forwardRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// ! MATERIAL IMPORTS
import {
  Box,
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
  Typography,
} from "@mui/material";
// ! COMPONENT IMPORTS
import unArchived from "../../../assets/images/Components/Archived.png";
import closeModal from "../../../assets/icons/closeModal.svg";
import {
  EnhancedTableHead,
  stableSort,
  getComparator,
} from "../../../components/TableDependencies/TableDependencies";
// ! MATERIAL ICONS IMPORTS
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InventoryIcon from "@mui/icons-material/Inventory";
import TableEditStatusButton from "../../../components/TableEditStatusButton/TableEditStatusButton";
import TableMassActionButton from "../../../components/TableMassActionButton/TableMassActionButton";
import {
  useBulkEditTagMutation,
  useEditTagMutation,
} from "../../../features/parameters/tagsManager/tagsManagerApiSlice";
import { useDispatch } from "react-redux";
import { showSuccess } from "../../../features/snackbar/snackbarAction";
import { LoadingButton } from "@mui/lab";
import question from "../../../assets/icons/question.svg";
// import DeleteModal from "../../../components/DeleteDailogueModal/DeleteModal";
import DeleteModal, {
  DeleteModalSecondary,
} from "../../../components/DeleteModal/DeleteModal";
import { updateTagId } from "../../../features/parameters/tagsManager/tagsManagerSlice";
import UnArchivedModal from "../../../components/UnArchivedModal/UnArchivedModal";
import DeleteIcon from "@mui/icons-material/Delete";
import NoDataFound from "../../../components/NoDataFound/NoDataFound";
import TableLoader from "../../../components/Loader/TableLoader";
import UnArchiveModal, {
  MultipleUnArchiveModal,
  UnArchiveModalSecondary,
  UnMultipleArchiveModalSecondary,
} from "../../../components/UnArchiveModal/UnArchiveModal";
import ArchiveModal, {
  MultipleArchiveModal,
} from "../../../components/ArchiveModal/ArchiveModal";

// ? TABLE STARTS HERE
function createData(tId, tagName, noOfProducts) {
  return { tId, tagName, noOfProducts };
}

// ? DIALOG TRANSITION STARTS HERE
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// ? DIALOG TRANSITION ENDS HERE

const TagsManagerTable = ({
  list,
  edit,
  deleteData,
  isLoading,
  error,
  bulkEdit,
  totalCount,
  tagsType,
  bulkDelete,
  rowsPerPage,
  changeRowsPerPage,
  changePage,
  page,
  editTag,
}) => {
  const dispatch = useDispatch();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("groupName");
  const [selected, setSelected] = React.useState([]);
  const [tag, setTag] = React.useState(false);
  const [tagName, setTagName] = React.useState("");
  const [showArchivedModal, setShowArchivedModal] = React.useState(false);
  const [showMultipleArchivedModal, setShowMultipleArchivedModal] =
    useState(false);
  const [showUnArchivedModal, setShowUnArhcivedModal] = React.useState(false);
  const [showMultipleUnArhcivedModal, setShowMultipleUnArhcivedModal] =
    useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [showMultipleDeleteModal, setShowMultipleDeleteModal] =
    React.useState(false);

  const headCells = [
    {
      id: "tagName",
      numeric: false,
      disablePadding: true,
      label: "Tag Name",
    },
    {
      id: "noOfProducts",
      numeric: false,
      disablePadding: true,
      label: "No Of Products",
    },
    // {
    //   id: "status",
    //   numeric: false,
    //   disablePadding: true,
    //   label: "Status",
    // },

    {
      id: "actions",
      numeric: false,
      disablePadding: true,
      label: "Actions",
    },
  ];

  const handleMassAction = (status) => {
    if (status === "Set as Un-Archived") {
      setShowMultipleUnArhcivedModal(true);
    }
    if (status === "Archive") {
      setShowMultipleArchivedModal(true);
    }
    if (status === "Delete") {
      setShowMultipleDeleteModal(true);
    }
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (selected.length > 0) {
      setSelected([]);
    } else if (event.target.checked) {
      const newSelected = list.slice(0, rowsPerPage).map((n) => n._id);
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
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

  // Archive Starts Here

  const handleArchive = (row) => {
    setShowArchivedModal(true);
    setTagName(row?.name);
    setTag(row);
  };
  const handleArchiveModalClose = () => {
    setShowArchivedModal(false);
    setShowMultipleArchivedModal(false);
  };
  const handleArchivedModalOnSave = () => {
    editTag({
      id: tag?._id,
      details: {
        status: "archieved",
        showFilter: false,
      },
    })
      .unwrap()
      .then(() =>
        dispatch(showSuccess({ message: " Tag Archived Successfully" }))
      );
    setShowArchivedModal(false);
    setTagName("");
  };
  const handleMultipleArchivedModalOnSave = () => {
    const newState = selected.map((id) => {
      return {
        id,
        status: "archieved",
      };
    });
    bulkEdit({ updates: newState })
      .unwrap()
      .then(() =>
        dispatch(
          showSuccess({
            message: `${
              selected.length === 1 ? "Tag" : "Tags"
            } Archived Successfully`,
          })
        )
      );
    setSelected([]);
    setShowMultipleArchivedModal(false);
  };

  // Archive ends here

  //unArchive Starts here

  const handleUnArchive = (row) => {
    setShowUnArhcivedModal(true);
    setTagName(row?.name);
    setTag(row);
  };
  const closeUnArchivedModal = () => {
    setShowUnArhcivedModal(false);
    setShowMultipleUnArhcivedModal(false);
  };
  const handleUnArchived = () => {
    editTag({
      id: tag?._id,
      details: {
        status: "active",
        showFilter: true,
      },
    })
      .unwrap()
      .then(() =>
        dispatch(showSuccess({ message: "Tag Un-Archived successfully" }))
      );
    setShowUnArhcivedModal(false);
  };
  const handleMultipleUnArchived = () => {
    const newState = selected.map((id) => {
      return {
        id,
        status: "active",
      };
    });
    bulkEdit({ updates: newState })
      .unwrap()
      .then(() =>
        dispatch(
          showSuccess({
            message: `${
              selected.length === 1 ? "Tag" : "Tags"
            } Un-Archived Successfully`,
          })
        )
      );
    setShowMultipleUnArhcivedModal(false);
    setSelected([]);
  };
  //unarchive ends here
  //Delete Starts Here
  const handleDeleteOnClick = (row) => {
    setShowDeleteModal(true);
    setTag(row);
    setTagName(row?.name);
  };
  const handleDeleteModalClose = () => {
    setShowDeleteModal(false);
    setShowMultipleDeleteModal(false);
  };
  const handleDelete = () => {
    deleteData(tag?._id)
      .unwrap()
      .then(() =>
        dispatch(showSuccess({ message: "Tag Deleted successfully" }))
      );
    setShowDeleteModal(false);
  };
  const handleMultipleDelete = () => {
    bulkDelete({ deletes: selected })
      .unwrap()
      .then(() =>
        dispatch(
          showSuccess({
            message: `${
              selected.length === 1 ? "Tag" : "Tags"
            } Deleted Successfully`,
          })
        )
      );
    setShowMultipleDeleteModal(false);
    setSelected([]);
  };
  //delete ends here
  return (
    <React.Fragment>
      {selected.length > 0 && (
        <div className="d-flex align-items-center px-2 mb-3">
          <button className="button-grey py-2 px-3">
            <small className="text-lightBlue">
              {selected.length} tags are selected&nbsp;
              <span
                className="text-blue-2 c-pointer"
                onClick={() => setSelected([])}
              >
                (Clear Selection)
              </span>
            </small>
          </button>
          <TableMassActionButton
            headingName="Mass Action"
            onSelect={handleMassAction}
            defaultValue={
              tagsType !== 1
                ? ["Edit", "Archive"]
                : ["Delete", "Set as Un-Archived"]
            }
          />
        </div>
      )}
      {!error ? (
        list.length ? (
          <>
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
                      const isItemSelected = isSelected(row?._id);
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
                              onClick={(event) => handleClick(event, row?._id)}
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
                            <Link className="text-decoration-none">
                              <div
                                className="d-flex align-items-center py-2"
                                onClick={() => {
                                  dispatch(updateTagId(row?._id));
                                  edit(row, index + 1, tagsType);
                                }}
                              >
                                <p className="text-lightBlue rounded-circle fw-600">
                                  {row.name}
                                </p>
                              </div>
                            </Link>
                          </TableCell>

                          <TableCell style={{ width: 180 }}>
                            <p className="text-lightBlue">
                              {row?.totalProduct}
                            </p>
                          </TableCell>
                          {row.status === "archieved" ? (
                            <TableCell style={{ width: 140, padding: 0 }}>
                              <div className="d-flex align-items-center">
                                <Tooltip title="Delete" placement="top">
                                  <div
                                    className="table-edit-icon rounded-4 p-2"
                                    onClick={(e) => {
                                      handleDeleteOnClick(row);
                                    }}
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

                                <Tooltip
                                  onClick={() => {
                                    handleUnArchive(row);
                                  }}
                                  title="Un-Archive"
                                  placement="top"
                                >
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
                          ) : (
                            <TableCell style={{ width: 120, padding: 0 }}>
                              <div className="d-flex align-items-center">
                                <Tooltip title="Edit" placement="top">
                                  <Link
                                    onClick={(e) => {
                                      edit(row, index + 1, tagsType);
                                    }}
                                    className="table-edit-icon rounded-4 p-2"
                                  >
                                    <EditOutlinedIcon
                                      sx={{
                                        color: "#5c6d8e",
                                        fontSize: 18,
                                        cursor: "pointer",
                                      }}
                                    />
                                  </Link>
                                </Tooltip>

                                <Tooltip
                                  onClick={() => {
                                    handleArchive(row);
                                  }}
                                  title="Archive"
                                  placement="top"
                                >
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
                          )}
                        </TableRow>
                      );
                    }
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={totalCount}
              rowsPerPage={rowsPerPage}
              page={page - 1}
              onPageChange={changePage}
              onRowsPerPageChange={changeRowsPerPage}
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

      <ArchiveModal
        onConfirm={handleArchivedModalOnSave}
        onCancel={handleArchiveModalClose}
        show={showArchivedModal}
        title={"tag"}
        message={tagName}
        products={"25 products"}
      />
      <MultipleArchiveModal
        onConfirm={handleMultipleArchivedModalOnSave}
        onCancel={handleArchiveModalClose}
        show={showMultipleArchivedModal}
        title={"tags"}
        message={`${
          selected.length === 1
            ? `${selected.length} tag`
            : `${selected.length} tags`
        }`}
        pronoun={`${selected.length === 1 ? "this" : `these`}`}
      />
      <UnArchiveModalSecondary
        onConfirm={handleUnArchived}
        onCancel={closeUnArchivedModal}
        show={showUnArchivedModal}
        title={"tag"}
        message={tagName}
      />
      <UnMultipleArchiveModalSecondary
        onConfirm={handleMultipleUnArchived}
        onCancel={closeUnArchivedModal}
        show={showMultipleUnArhcivedModal}
        title={"tags"}
        message={`${
          selected.length === 1
            ? `${selected.length} tag`
            : `${selected.length} tags`
        }`}
        pronoun={`${selected.length === 1 ? "this" : `these`}`}
      />
      <DeleteModalSecondary
        onConfirm={handleDelete}
        onCancel={handleDeleteModalClose}
        show={showDeleteModal}
        title={"tag"}
        message={tagName}
      />
      <DeleteModalSecondary
        onConfirm={handleMultipleDelete}
        onCancel={handleDeleteModalClose}
        show={showMultipleDeleteModal}
        title={"multiple tag"}
        message={`${
          selected.length === 1
            ? `${selected.length} tag`
            : `${selected.length} tags`
        }`}
      />

      {/* <DeleteModal 
      showCreateModal={showDeleteModal} 
      toggleArchiveModalHandler={handleDeleteOnClick} 
      handleArchive={handleDelete} 
      name={selected.length >= 1 ? selected.length : tagName}
      deleteType={"Tag"}
       />

      <Dialog
          open={showUnArchivedModal}
          TransitionComponent={Transition}
          keepMounted
          onClose={closeUnArchivedModal}
          aria-describedby="alert-dialog-slide-description"
          maxWidth="sm"
        >
          <DialogContent className="py-2 px-4 text-center">
            <img src={closeModal} alt="question" width={40} 
              className="closeModal c-pointer" 
              onClick={closeUnArchivedModal}
            />
            <img src={unArchived} alt="question" width={160} className="mb-4 mt-4"/>
            <div className="row"></div>
            <h5 className="text-lightBlue mt-2 mb-3">
              Are you sure you want to Un-Archive <span className="text-blue-2">  {tagName} </span> ?         
            </h5>
            <h6 className="mt-3 mb-2" style={{color: "#5C6D8E"}}>
              <span className="text-blue-2"> 0 products </span> 
              in this collection will be unassigned from it.
            </h6>
            <h6 className="mt-2 mb-4" style={{color: "#5C6D8E"}}>
              Would you like to Archive this Tag ?
            </h6>
          </DialogContent>
          <DialogActions className="d-flex justify-content-center px-4 pb-4">
            <button
              className="button-lightBlue-outline py-2 px-3 me-4"
              onClick={closeUnArchivedModal}
            >
              <p>Cancel</p>
            </button>
            <button
              className="button-red-outline py-2 px-3"
              onClick={handleUnArchived}
            >
              <p>Un-Archive</p>
            </button>
          </DialogActions>
      </Dialog> */}

      {/* <Dialog
          open={archivedModal}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleModalClose}
          aria-describedby="alert-dialog-slide-description"
          maxWidth="sm"
        >
          <DialogContent className="py-2 px-4 text-center">
            <img src={closeModal} alt="question" width={40} 
              className="closeModal c-pointer" 
              onClick={handleModalClose}
            />
            <img src={unArchived} alt="question" width={160} className="mb-4 mt-4"/>
            <div className="row"></div>
            <h5 className="text-lightBlue mt-2 mb-3">
              Archive   
              <span className="text-blue-2"> {selected.length >= 1 ? `${selected.length} tags` : tagName}? </span>
            </h5>
            <h6 className="mt-3 mb-2" style={{color: "#5C6D8E"}}>
              <span className="text-blue-2"> 0 products </span> 
              in this collection will be unassigned from it.
            </h6>
            <h6 className="mt-2 mb-4" style={{color: "#5C6D8E"}}>
              Would you like to Archive this Tag ?
            </h6>
          </DialogContent>
          <DialogActions className="d-flex justify-content-center px-4 pb-4">
            <button
              className="button-lightBlue-outline py-2 px-3 me-4"
              onClick={handleModalClose}
            >
              <p>Cancel</p>
            </button>
            <button
              className="button-red-outline py-2 px-3"
              onClick={handleArchivedModalOnSave}
            >
              <p>Archive</p>
            </button>
          </DialogActions>
      </Dialog> */}
    </React.Fragment>
  );
};

export default TagsManagerTable;
