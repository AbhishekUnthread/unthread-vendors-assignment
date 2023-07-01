import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

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
  TextField,
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
import info from "../../../assets/icons/info.svg";
import clock from "../../../assets/icons/clock.svg";
import cancel from "../../../assets/icons/cancel.svg";

// ! MATERIAL ICONS IMPORTS
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InventoryIcon from "@mui/icons-material/Inventory";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import TableEditStatusButton from "../../../components/TableEditStatusButton/TableEditStatusButton";
import TableMassActionButton from "../../../components/TableMassActionButton/TableMassActionButton";

import { updateCollectionId } from "../../../features/parameters/collections/collectionSlice";
import { DesktopDateTimePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useBulkEditCollectionMutation, useEditCollectionMutation } from "../../../features/parameters/collections/collectionsApiSlice";
import { showSuccess } from "../../../features/snackbar/snackbarAction";
import question from '../../../assets/images/products/question.svg'
import DeleteIcon from '@mui/icons-material/Delete';

// ? DIALOG TRANSITION STARTS HERE
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// ? DIALOG TRANSITION ENDS HERE

// ? TABLE STARTS HERE
function createData(cId, collectionsName, noOfProducts, status, actions) {
  return { cId, collectionsName, noOfProducts, status, actions };
}

const rows = [
  createData(1, "Collection 1", "25", "Active"),
  createData(2, "Collection 2", "225", "Active"),
  createData(3, "Collection 3", "125", "Active"),
  createData(4, "Collection 4", "25", "Active"),
  createData(5, "Collection 5", "221", "Active"),
  createData(6, "Collection 6", "12", "Active"),
  createData(7, "Collection 7", "10", "Active"),
  createData(8, "Collection 8", "503", "Active"),
];

const CollectionsTable = ({ list, error, isLoading, deleteData, pageLength }) => {
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

  const handleArchive = (id) => {
    setArchivedModal(true);
    setCollectionId(id);
  }

  useEffect(() => {
    // Update the state only if the selectedStatus state has a value
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
        } else if (selectedStatus === "Set as Draft") {
          return {
            id,
            status: "archived",
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
            console.log(requestData, 'requestData')
      bulkEditCollection(requestData).unwrap().then(()=>dispatch(showSuccess({ message: " Status updated successfully" })));
      setSelectedStatus(null);
    }
  }, [selected, selectedStatus]);

  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
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
      const newSelected = list.map((n) => n.cId);
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
    setArchivedModal(false);
     editCollection({
        id: collectionId,
        details : {
          status: "archieved"
        }
    })
    dispatch(showSuccess({ message: "Archived this collection successfully" }));
  }

  const handleUnArchive = (unArchivedId) => {
    editCollection({
        id: unArchivedId,
        details : {
          status: "in-active"
        }
    })
    dispatch(showSuccess({ message: "Un-Archived this collection successfully" }));
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
          <TableEditStatusButton onSelect={handleStatusSelect} defaultValue={['Set as Active','Set as In-Active','Set as Draft']} headingName="Edit Status"/>
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
                        to="/parameters/collections/create"
                      >
                        <div className="d-flex align-items-center py-2">
                          <img
                            src={row.mediaUrl}
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
                    <TableCell style={{ width: 140, padding: 0 }}>
                      <div className="d-flex align-items-center">
                        <div className="rounded-pill d-flex px-2 py-1 c-pointer" 
                          style={{background: 
                            row.status == "active" ? "#A6FAAF" : 
                            row.status == "in-active" ? "#F67476" : 
                            row.status == "archieved" ? "#C8D8FF" : "#FEE1A3"
                          }}>
                          <small className="text-black fw-400">
                            {
                              row.status == "active" ? "Active" :  
                              row.status == "in-active" ? "In-Active" : 
                              row.status == "archieved" ? "Archived" : "Scheduled"
                            }
                          </small>
                        </div>
                      </div>
                    </TableCell>
                    {row.status == "archieved" ?
                      <TableCell style={{ width: 140, padding: 0 }}>
                         <div className="d-flex align-items-center">
                          {deleteData && (
                          <Tooltip title="Delete" placement="top">
                            <div className="table-edit-icon rounded-4 p-2" 
                                onClick={(e) => {
                                  deleteData(row);
                                  dispatch(showSuccess({ message: "Deleted this collection successfully" }));
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
                                handleUnArchive(row._id)
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
                          <Tooltip title="Copy" placement="top">
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
                                handleArchive(row._id)
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
            {/* <h6 className="text-lightBlue mt-3 mb-2">
              You have unsaved changes.
            </h6> */}
            <h6 className="text-lightBlue mt-2 mb-2">
              Are you sure you want to Archive this collection ?
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
    </React.Fragment>
  );
};

export default CollectionsTable;
