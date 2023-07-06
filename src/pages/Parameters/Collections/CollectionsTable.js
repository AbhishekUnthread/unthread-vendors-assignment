import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import './Collections.scss';

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
// ! COMPONENT IMPORTS
import {
  EnhancedTableHead,
  stableSort,
  getComparator,
} from "../../../components/TableDependencies/TableDependencies";
import DeleteModal from "../../../components/DeleteModal/DeleteModal"
import UnArchivedModal from "../../../components/UnArchivedModal/UnArchivedModal";
import TableMassActionButton from "../../../components/TableMassActionButton/TableMassActionButton";
// !IMAGES IMPORTS
import unthreadLogo from "../../../assets/images/unthreadLogo.png"

// ! MATERIAL ICONS IMPORTS
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InventoryIcon from "@mui/icons-material/Inventory";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import TableEditStatusButton from "../../../components/TableEditStatusButton/TableEditStatusButton";

import { updateCollectionId } from "../../../features/parameters/collections/collectionSlice";
import { useBulkEditCollectionMutation, useEditCollectionMutation } from "../../../features/parameters/collections/collectionsApiSlice";
import { showSuccess } from "../../../features/snackbar/snackbarAction";
import question from '../../../assets/images/products/question.svg'
import DeleteIcon from '@mui/icons-material/Delete';
import moment from "moment";

// ? DIALOG TRANSITION STARTS HERE
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// ? DIALOG TRANSITION ENDS HERE

// ? TABLE STARTS HERE

const CollectionsTable = ({ list, error, isLoading, deleteData, pageLength, collectionType }) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("groupName");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selectedStatus, setSelectedStatus] = React.useState(null);
  const [state, setState] = React.useState([]);
  const [collectionId, setCollectionId] = React.useState('')
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [archiveID, setArchiveID] = React.useState(false);
  const [name, setName] = React.useState(false);
  const [showUnArchivedModal, setShowUnArhcivedModal] = React.useState(false);
  const [unArchiveID, setUnArchiveID] = React.useState(false);
  const [statusValue, setStatusValue] = React.useState("in-active");
  const [massActionStatus, setMassActionStatus] = React.useState("");
  const [forMassAction, setForMassAction] = React.useState(false);
  const [collectionTitle, setCollectionTitle] = useState("");

  const handleStatusValue = (value) => {
    setStatusValue(value);
  };

  const closeUnArchivedModal = () => {
    setShowUnArhcivedModal(false)
  }

  const [
    editCollection,
    {
      data: editData,
      isLoading: editCollectionIsLoading,
      isSuccess: editCollectionIsSuccess,
      error: editCollectionError,
    }
  ] = useEditCollectionMutation();

  const[
    bulkEditCollection,
    {
      data: bulkEditCollections,
      isLoading: bulkCollectionEditLoading,
      isSuccess: bulkCollectionEditIsSuccess,
      error: bulkCollectionEditError,
    }
  ] = useBulkEditCollectionMutation();

  const handleArchive = (id, title) => {
    setCollectionTitle(title);
    setArchivedModal(true);
    setCollectionId(id);
  }

  const toggleArchiveModalHandler = (row) => {
    setForMassAction(false)
    setShowDeleteModal((prevState) => !prevState);
    setArchiveID(row);
    setName(row?.title);
  };

  useEffect(() => {
    if (selectedStatus !== null) {
      const newState = selected.map((id) => {
        if (selectedStatus === "Set as Active") {
          return {
            id,
            status: "active",
          };
        } else if (selectedStatus === "Set as In-Active") {
          return {
            id,
            status: "in-active",
          };
        } else if (selectedStatus === "Set as Archived") {
          return {
            id,
            status: "archieved",
          };
        } else if (selectedStatus === "Delete") {
          return {
            id,
            status: "in-active",
            active: false
          };
        } else if (selectedStatus === "Set as Un-Archived") {
          return {
            id,
            status: statusValue,
          };
        } else {
          return {
            id,
            status: "", 
          };
        }
      });
      setState(newState);
      const requestData = {
        updates: newState
      };
      bulkEditCollection(requestData).unwrap().then(()=>
      dispatch(showSuccess({ message: "Status updated successfully" })));
      setSelectedStatus(null);
      setShowUnArhcivedModal(false)
      setShowDeleteModal(false);
    }
  }, [selected, selectedStatus]);
  
  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
  };

  const handleMassAction  = (status) => {
    setForMassAction(true)
    setMassActionStatus(status);
    if(collectionType !== 3 && status === "Set as Archived") {
      setArchivedModal(true);
    } else if(collectionType === 3 && status === "Set as Un-Archived") {
      setShowUnArhcivedModal(true);
    } else if(collectionType === 3 && status === "Delete") {
      setShowDeleteModal(true);
    }
  };

  const headCells = [
    {
      id: "collectionsName",
      numeric: false,
      disablePadding: true,
      label: "Collection Name",
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

  const [openArchivedModal, setArchivedModal] = React.useState(false);

  const handleArchivedModalClose = () => {
    if(forMassAction === true) {
      setSelectedStatus(massActionStatus);
      setArchivedModal(false);
    } else {
      setArchivedModal(false);
      editCollection({
          id: collectionId,
          details : {
            status: "archieved"
          }
      })
      dispatch(showSuccess({ message: "Archived this collection successfully" }));
    }
  }

  const handleUnArchive = (id, title) => {
    setForMassAction(false)
    setShowUnArhcivedModal(true)
    setUnArchiveID(id)
    setName(title)
  }

  const handleUnArchived = () => {
    if(forMassAction === true) {
      setSelectedStatus(massActionStatus);
    } else {
      editCollection({
          id: unArchiveID,
          details : {
            status: statusValue
          }
      })
      setShowUnArhcivedModal(false)
      dispatch(showSuccess({ message: "Un-Archived this collection successfully" }));
    }
  }

  const handleArchiveModal =()=>{
    if(forMassAction === true) {
      setSelectedStatus(massActionStatus);
    } else {
      deleteData(archiveID);
      toggleArchiveModalHandler();
      dispatch(showSuccess({ message: "Deleted this collection successfully" }));
    }
  }

  const handleModalClose = () => {
    setArchivedModal(false);
  };

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
          { collectionType !== 3 && 
            <TableEditStatusButton 
              onSelect={handleStatusSelect} 
              defaultValue={['Set as Active','Set as In-Active']} 
              headingName="Edit Status"
            />
          }
          <TableMassActionButton 
            headingName="Mass Action" 
            onSelect={handleMassAction} 
            defaultValue={ collectionType !== 3 ? 
            ['Edit','Set as Archived'] : 
            ['Delete','Set as Un-Archived']}
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
                      >
                        <div className="d-flex align-items-center py-2"
                          onClick={()=>{
                            dispatch(updateCollectionId(row._id));
                            navigate("/parameters/collections/edit")
                          }}
                        >
                          <img
                            src={row.mediaUrl ? row.mediaUrl : unthreadLogo}
                            alt="ringSmall"
                            className="me-2"
                            height={45}
                            width={45}
                          />
                          <p className="text-lightBlue rounded-circle fw-600">
                            {row.title}
                          </p>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell style={{ width: 180 }}>
                      <p className="text-lightBlue">{row.totalProduct}</p>
                    </TableCell>
                    <TableCell style={{ width: 180, padding: 0 }}>
                      <div className="d-block">
                        <div className="rounded-pill d-flex px-2 py-1 c-pointer statusBoxWidth" 
                          style={{background: 
                            row.status == "active" ? "#A6FAAF" : 
                            row.status == "in-active" ? "#F67476" : 
                            row.status == "archieved" ? "#C8D8FF" : "#FEE1A3"
                          }}>
                          <small className="text-black fw-500">
                            {
                              row.status == "active" ? "Active" :  
                              row.status == "in-active" ? "In-Active" : 
                              row.status == "archieved" ? "Archived" : "Scheduled"
                            }
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
                    {row.status == "archieved" ?
                      <TableCell style={{ width: 140, padding: 0 }}>
                         <div className="d-flex align-items-center">
                          {deleteData && (
                          <Tooltip title="Delete" placement="top">
                            <div className="table-edit-icon rounded-4 p-2" 
                                onClick={(e) => {
                                  toggleArchiveModalHandler(row)
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
                          )}
                          <Tooltip title="Un-Archive" placement="top">
                            <div className="table-edit-icon rounded-4 p-2"
                              onClick={() => {
                                handleUnArchive(row._id, row.title)
                                }
                              }
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
                        </div>
                      </TableCell>
                      :
                      <TableCell style={{ width: 140, padding: 0 }}>
                        <div className="d-flex align-items-center">
                          <Tooltip title="Edit" placement="top">
                            <div className="table-edit-icon rounded-4 p-2" 
                                onClick={()=>{
                                  dispatch(updateCollectionId(row._id));
                                  navigate("/parameters/collections/edit")
                                }}
                            >
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
                            <div className="table-edit-icon rounded-4 p-2"
                              onClick={() => {
                                handleArchive(row._id, row?.title)
                                }
                              }
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
                        </div>
                      </TableCell>                   
                    }
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
        count={pageLength}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        className="table-pagination"
      />
      </>
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

        <Dialog
          open={openArchivedModal}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleModalClose}
          aria-describedby="alert-dialog-slide-description"
          maxWidth="sm"
        >
          <DialogContent className="py-2 px-4 text-center">
            <img src={question} alt="question" width={200} />
            <div className="row"></div>
            <h6 className="text-lightBlue mt-2 mb-2">
              Are you sure you want to Archive this collection  
              {forMassAction == false &&<span className="text-blue-2">{collectionTitle} </span>} ?
            </h6>
            <div className="d-flex justify-content-center mt-4">
              <hr className="hr-grey-6 w-100" />
            </div>
          </DialogContent>
          <DialogActions className="d-flex justify-content-between px-4 pb-4">
            <button
              className="button-red-outline py-2 px-3 me-5"
              onClick={handleModalClose}
            >
              <p>Cancel</p>
            </button>
            <button
              className="button-gradient py-2 px-3 ms-5"
              onClick={handleArchivedModalClose}
            >
              <p>Archived</p>
            </button>
          </DialogActions>
        </Dialog>
        <DeleteModal 
          showCreateModal={showDeleteModal}
          toggleArchiveModalHandler={toggleArchiveModalHandler}
          handleArchive={handleArchiveModal} 
          name={forMassAction == false ? name : ""} 
        />
        <UnArchivedModal 
          handleStatusValue={handleStatusValue}
          showUnArchivedModal={showUnArchivedModal}
          closeUnArchivedModal={closeUnArchivedModal}
          handleUnArchived={handleUnArchived}
          name={forMassAction == false ? name : "this"}
        />
    </React.Fragment>
  );
};

export default CollectionsTable;
