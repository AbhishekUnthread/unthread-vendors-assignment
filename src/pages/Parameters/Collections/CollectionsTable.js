import { useEffect, useState, forwardRef } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
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
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InventoryIcon from "@mui/icons-material/Inventory";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from '@mui/icons-material/Delete';

import {
  EnhancedTableHead,
  stableSort,
  getComparator,
} from "../../../components/TableDependencies/TableDependencies";
import { updateCollectionId } from "../../../features/parameters/collections/collectionSlice";
import { 
  useBulkEditCollectionMutation,
  useEditCollectionMutation
} from "../../../features/parameters/collections/collectionsApiSlice";
import { showSuccess } from "../../../features/snackbar/snackbarAction";

import TableMassActionButton from "../../../components/TableMassActionButton/TableMassActionButton";
import DuplicateCollection from "./DuplicateCollection/DuplicateCollection";
import NoDataFound from "../../../components/NoDataFound/NoDataFound";
import TableLoader from "../../../components/Loader/TableLoader";
import TableEditStatusButton from "../../../components/TableEditStatusButton/TableEditStatusButton";
import ArchiveModal from "../../../components/ArchiveModal/ArchiveModal";
import { UnArchivedModal } from "../../../components/UnArchiveModal/UnArchiveModal";
import { DeleteModalSecondary } from "../../../components/DeleteModal/DeleteModal";

import './Collections.scss';

import unthreadLogo from "../../../assets/images/unthreadLogo.png"
import unArchived from "../../../assets/images/Components/Archived.png"
import { Link } from "react-router-dom";

const CollectionsTable = ({ 
  list,
  error, 
  isLoading, 
  deleteData, 
  pageLength, 
  collectionType, 
  hardDeleteCollection, 
  bulkDelete, 
  edit, 
  rowsPerPage, 
  page, 
  changeRowsPerPage, 
  changePage 
}) => {
  const dispatch = useDispatch();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("groupName");
  const [selected, setSelected] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [state, setState] = useState([]);
  const [collectionId, setCollectionId] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [archiveID, setArchiveID] = useState(false);
  const [name, setName] = useState(false);
  const [showUnArchivedModal, setShowUnArhcivedModal] = useState(false);
  const [unArchiveID, setUnArchiveID] = useState(false);
  const [statusValue, setStatusValue] = useState("in-active");
  const [massActionStatus, setMassActionStatus] = useState("");
  const [forMassAction, setForMassAction] = useState(false);
  const [collectionTitle, setCollectionTitle] = useState("");
  const [duplicateModal, setDuplicateModal] = useState(false);
  const [ singleTitle, setSingleTitle] = useState("");

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
    setForMassAction(false)
  }

  const toggleArchiveModalHandler = (row) => {
    setForMassAction(false)
    setShowDeleteModal((prevState) => !prevState);
    setArchiveID(row);
    setName(row?.title);
  };

  useEffect(() => {
    if (selectedStatus !== null && selectedStatus !== "Delete") {
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
      bulkEditCollection(requestData).unwrap().then(()=> {
        const successMessage =
            selectedStatus === "Set as Un-Archived"
              ? "Collection un-archived  successfully"
              : selectedStatus === "Set as Archived"
                ? "Collection archived  successfully" : "Status updated successfully";

        dispatch(showSuccess({ message: successMessage }));
        setSelectedStatus(null);
        setShowUnArhcivedModal(false)
        setShowDeleteModal(false);
        setSelected([])
      })}    
  }, [selectedStatus]);  
  
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
      id: "actions",
      numeric: false,
      disablePadding: true,
      label: "Actions",
    },
  ];

  if (collectionType === 0 || collectionType === 3) {
    headCells.push({
      id: "status",
      numeric: false,
      disablePadding: true,
      label: "Status",
    });
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if(selected.length>0) {
      setSelected([]);
    }
    else if(event.target.checked) {
      const newSelected = list.slice(0, rowsPerPage).map((n) => n._id);
      setSelected(newSelected);
    }
    else {
      setSelected([]);
    }
  };  

  const handleClick = (event, name, title) => {
    setSingleTitle(title)
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

  const [openArchivedModal, setArchivedModal] = useState(false);

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
      dispatch(showSuccess({ message: "Collection archived successfully!" }));
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
      dispatch(showSuccess({ message: "Collection un-archived successfully" }));
    }
  }

  const handleArchiveModal =()=>{
    if(forMassAction === true) {
      setSelectedStatus(massActionStatus);
      bulkDelete(selected)
      setShowDeleteModal(false);
      dispatch(showSuccess({ message: "Collection deleted successfully!" }));
      setSelected([])
    } else {
      hardDeleteCollection(archiveID?._id);
      toggleArchiveModalHandler();
      dispatch(showSuccess({ message: "Collection deleted successfully!" }));
    }
  }

  const handleModalClose = () => {
    setArchivedModal(false);
  };

  const handleDuplicateCollectionClose = () => {
    setDuplicateModal(false)
  }

  const handleDuplicateCollection = (row) => {
    setDuplicateModal(true)
  }

  return (
    <>
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
                        onClick={(event) => handleClick(event, row._id, row.title)}
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
                      <div className={collectionType != 3 ? "c-pointer" : ""}>
                        <div className="d-flex align-items-center py-2"
                          onClick={(e) => {
                            if(collectionType != 3) {
                              edit(row,index+1,collectionType);
                            }
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
                      </div>
                    </TableCell>
                    <TableCell style={{ width: 180 }}>
                      <p className="text-lightBlue">{row.totalProduct}</p>
                    </TableCell>
                    { (collectionType == 0 || collectionType == 3) &&
                    <TableCell style={{ width: 180, padding: 10 }}>
                      <div className="d-block">
                        <div className="rounded-pill d-flex px-2 py-1 statusBoxWidth" 
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
                    </TableCell> }
                    {row.status == "archieved" ?
                      <TableCell style={{ width: 140, padding: 0 }}>
                         <div className="d-flex align-items-center">
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
                        </div>
                      </TableCell>
                      :
                      <TableCell style={{ width: 140, padding: 0 }}>
                        <div className="d-flex align-items-center">
                          <Tooltip title="Edit" placement="top">
                            <Link className="table-edit-icon rounded-4 p-2" 
                              onClick={(e) => {
                                edit(row,index+1,collectionType);
                              }}
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
                          <Tooltip title="Duplicate" placement="top">
                            <div className="table-edit-icon rounded-4 p-2"
                              onClick={() => {
                                dispatch(updateCollectionId(row._id));
                                handleDuplicateCollection(row)
                              }}
                            >
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
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={pageLength}
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
          onConfirm ={handleArchivedModalClose}
          onCancel={handleModalClose}
          show={openArchivedModal}
          title={"Collection"}
          message={forMassAction == true ? selected.length == 1 ? 
            singleTitle : selected.length : collectionTitle 
          }
          archiveType={ forMassAction == true ? selected.length == 1 ?
            " collection" : " collections": " collection" 
          }
          products={"25 products"}
        />       
        <DeleteModalSecondary 
          message={forMassAction == false ? name : selected.length == 1 ? singleTitle : selected.length} 
          title={ forMassAction == true ? selected.length == 1 ? " collection" : " collections": " collection" }
          onConfirm ={handleArchiveModal}
          onCancel={toggleArchiveModalHandler}
          show={showDeleteModal}
        />
        <UnArchivedModal 
          onConfirm={handleUnArchived}
          onCancel={closeUnArchivedModal}
          show={showUnArchivedModal}
          title={"Un-Archive Collection ?"}
          primaryMessage={`Before un-archiving <span class='text-blue-1'>${collectionTitle}</span> vendor,
          `}
          secondaryMessage={"Please set its status"}
          confirmText={"Un-Archive"}
          handleStatusValue={handleStatusValue}
          icon={unArchived}
          name={forMassAction == false ? name : selected.length == 1 ? singleTitle : selected.length} 
          nameType={ forMassAction == true ? selected.length == 1 ? " collection" : " collections": " collection" }
        />
        <DuplicateCollection 
          openDuplicateCollection={duplicateModal}
          handleDuplicateCollectionClose={handleDuplicateCollectionClose}
        />
    </>
  );
};

export default CollectionsTable;
