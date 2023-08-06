import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Checkbox,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from "@mui/material";

import { showSuccess } from "../../../features/snackbar/snackbarAction";
import { 
  useEditCustomerGroupMutation,
  useDeleteCustomerGroupMutation,
  useBulkEditCustomerGroupMutation,
} from "../../../features/customers/customerGroup/customerGroupApiSlice";

import {
  EnhancedTableHead,
  stableSort,
  getComparator,
} from "../../../components/TableDependencies/TableDependencies";
import TableEditStatusButton from "../../../components/TableEditStatusButton/TableEditStatusButton";
import TableMassActionButton from "../../../components/TableMassActionButton/TableMassActionButton";
import Loader from "../../../components/Loader/TableLoader";
import NoDataFound from "../../../components/NoDataFound/NoDataFound";
import ArchiveModal from "../../../components/ArchiveModal/ArchiveModal";
import { DeleteModalSecondary } from "../../../components/DeleteModal/DeleteModal";
import { UnArchivedModal } from "../../../components/UnArchiveModal/UnArchiveModal";

import verticalDots from "../../../assets/icons/verticalDots.svg";
import deleteRed from "../../../assets/icons/delete.svg";
import unArchived from "../../../assets/images/Components/Archived.png"

const UserGroupsTable = ({ 
  data, 
  totalCount, 
  value, 
  loading, 
  error, 
  bulkDelete, 
  onEdit 
}) => {
  const dispatch = useDispatch();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("groupName");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorActionEl, setAnchorActionEl] = useState(null);
  const [openArchivedModal, setArchivedModal] = useState(false);
  const [groupId, setGroupId] = useState();
  const [groupName, setGroupName] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [forMassAction, setForMassAction] = useState(false);
  const [massActionStatus, setMassActionStatus] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [showUnArchivedModal, setShowUnArhcivedModal] = useState(false);
  const [state, setState] = useState([]);
  const [statusValue, setStatusValue] = useState("in-active");
  const [groupInfo, setGroupInfo] = useState();

  const [
    editCustomerGroup,
    {
      data: editData,
      isLoading: editGroupIsLoading,
      isSuccess: editGroupIsSuccess,
      error: editGroupError,
    }
  ] = useEditCustomerGroupMutation();

  const [
    deleteCustomerGroup,
    {
      isLoading: deleteGroupIsLoading,
      isSuccess: deleteGroupIsSuccess,
      error: deleteGroupError,
    },
  ] = useDeleteCustomerGroupMutation();

  const[
    bulkEditCustomerGroup,
    {
      data: bulkEditGroup,
      isLoading: bulkGroupEditLoading,
      isSuccess: bulkGroupEditIsSuccess,
      error: bulkGroupEditError,
    }
  ] = useBulkEditCustomerGroupMutation();

  const handleArchive = () => {
    setArchivedModal(true);
    setForMassAction(false)
  }

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
            status: "archived",
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
      bulkEditCustomerGroup(requestData).unwrap().then(()=> {
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

  const handleArchivedModalClose = () => {
    if(forMassAction === true) {
      setSelectedStatus(massActionStatus);
      setArchivedModal(false);
    } else {
      handleClick(null, groupId);
      setArchivedModal(false);
      editCustomerGroup({
        id: groupId,
        details : {
          status: "archived"
        }
      })
      dispatch(showSuccess({ message: "Customer Group archived successfully!" }));
    }
  }

  const handleModalClose = () => {
    setArchivedModal(false);
  };

  const handleDeleteModal =()=>{
    if(forMassAction === true) {
      setSelectedStatus(massActionStatus);
      bulkDelete(selected)
      setShowDeleteModal(false);
      dispatch(showSuccess({ message: "Customer group deleted successfully!" }));
      setSelected([])
    } else {
      handleClick(null, groupId);
      deleteCustomerGroup(groupId);
      setShowDeleteModal(false)
      dispatch(showSuccess({ message: "Customer group deleted successfully!" }));
    }
  }

  const toggleDeleteModalHandler = (row) => {
    setShowDeleteModal((prevState) => !prevState);
  };

   const handleUnArchived = () => {
    if(forMassAction === true) {
      setSelectedStatus(massActionStatus);
    } else {
      handleClick(null, groupId);
      editCustomerGroup({
          id: groupId,
          details : {
            status: statusValue
          }
      })
      setShowUnArhcivedModal(false)
      dispatch(showSuccess({ message: "Collection un-archived successfully" }));
    }
  }

  const closeUnArchivedModal = () => {
    setShowUnArhcivedModal(false)
  }

  const handleStatusValue = (value) => {
    setStatusValue(value);
  };
  
  const handleUnArchive = () => {
    setForMassAction(false)
    setShowUnArhcivedModal(true)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

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
      const newSelected = data.slice(0, rowsPerPage).map((n) => n._id);
      setSelected(newSelected);
    }
    else {
      setSelected([]);
    }
  }; 

  const handleClick = (event, id, name) => {
    setGroupName(name)
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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

  const handleActionClick = (event, row) => {
    setGroupInfo(row)
    setGroupId(row._id);
    setGroupName(row?.name);
    setAnchorActionEl(event.currentTarget);
  };

  const handleActionClose = () => {
    setAnchorActionEl(null);
  };

  const openActions = Boolean(anchorActionEl);
  const idActions = openActions ? "simple-popover" : undefined;

   const handleStatusSelect = (status) => {
    setSelectedStatus(status);
  };

  const handleMassAction  = (status) => {
    setForMassAction(true)
    setMassActionStatus(status);
    if(value !== 3 && status === "Set as Archived") {
      setArchivedModal(true);
    } else if(value === 3 && status === "Set as Un-Archived") {
      setShowUnArhcivedModal(true);
    } else if(value === 3 && status === "Delete") {
      setShowDeleteModal(true);
    }
  };

  const headCells = [
    {
      id: "groupName",
      numeric: false,
      disablePadding: true,
      label: "Group Name",
    },
    {
      id: "usersInGroup",
      numeric: false,
      disablePadding: false,
      label: "Users in Group",
    }
  ];

  if (value === 0 || value === 3) {
    headCells.push({
      id: "status",
      numeric: false,
      disablePadding: false,
      label: "Group Status",
    });
  }

  headCells.push({
    id: "actions",
    numeric: false,
    disablePadding: true,
    label: "",
  });

  return (
    <>
      {selected.length > 0 && (
        <div className="d-flex align-items-center px-2 mb-3">
          <button className="button-grey py-2 px-3">
            <small className="text-lightBlue">
              {selected.length} products are selected&nbsp;
              <span
                className="text-blue-2 c-pointer"
                onClick={() => setSelected([])}
              >
                (Clear Selection)
              </span>
            </small>
          </button>
          { value !== 3 && 
            <TableEditStatusButton 
              onSelect={handleStatusSelect} 
              defaultValue={['Set as Active','Set as In-Active']} 
              headingName="Edit Status"
            />
          }
          <TableMassActionButton 
            headingName="Mass Action" 
            onSelect={handleMassAction} 
            defaultValue={ value !== 3 ? 
            ['Edit','Set as Archived'] : 
            ['Delete','Set as Un-Archived']}
          />
        </div>
      )}
      { data.length ?
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
                rowCount={totalCount}
                headCells={headCells}
              />
              <TableBody>
                {stableSort(data, getComparator(order, orderBy))
                  .map((row, index) => {
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
                            onClick={(event) => handleClick(event, row?._id, row?.name)}
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
                          <div
                            className="d-flex align-items-center text-decoration-none c-pointer"
                            onClick={(e) => {
                              if(value != 3) {
                                onEdit(row, index+1, value);
                              }
                            }}
                          >
                            <p className="text-lightBlue rounded-circle fw-600">
                              {row?.name}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell style={{ width: 180 }}>
                          <p className="text-lightBlue">{row.usersInGroup}</p>
                        </TableCell>
                        { (value == 0 || value == 3) &&
                          <TableCell style={{ width: 180 }}>
                            <div className="d-flex align-items-center">
                              <div 
                                className="rounded-pill d-flex px-2 py-1 c-pointer statusBoxWidth"
                                style={{
                                  background: row.status == "active" ? "#A6FAAF" :
                                  row.status == "archived" ? "#C8D8FF" : "#F67476" 
                                }}
                              >
                                <small className="text-black fw-500">
                                  {
                                    row?.status == "active" ? "Active" : 
                                    row?.status == "archived" ? "Archived" : "In-Active"
                                  }
                                </small>
                              </div>
                            </div>
                          </TableCell>
                        }
                        <TableCell style={{ width: 60 }}>
                          <img
                            src={verticalDots}
                            alt="verticalDots"
                            className="c-pointer"
                            aria-describedby={idActions}
                            variant="contained"
                            onClick={(event) => handleActionClick(event, row)}
                          />

                          <Popover
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "center",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "center",
                            }}
                            id={idActions}
                            open={openActions}
                            anchorEl={anchorActionEl}
                            onClose={handleActionClose}
                          >
                            <div className="py-2 px-2">
                              <small className="text-grey-7 px-2">ACTIONS</small>
                              <hr className="hr-grey-6 my-2" />
                              { value != 3 ? 
                                <>
                                  <small 
                                    className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back"
                                    onClick={(e) => {
                                      if(value != 3) {
                                        onEdit(groupInfo, index+1, value);
                                      }
                                    }}
                                  >
                                    Edit User Groups
                                  </small>
                                  <div className="d-flex justify-content-between  hover-back rounded-3 p-2 c-pointer mt-2"
                                    onClick={() => { handleArchive()}}
                                  >
                                    <small className="font2 d-block" style={{color: "#F67E80"}}>
                                      Archived Groups
                                    </small>
                                  </div>
                                </> : 
                                <>
                                <small className="font2 d-block mt-4 c-pointer hover-back p-2 rounded-3" 
                                  style={{color: "#F67E80"}}
                                  onClick={() => {
                                    handleUnArchive()
                                  }
                              }
                                >
                                  Un-Archived Groups
                                </small>
                                <div className="d-flex justify-content-between hover-back rounded-3 p-2 c-pointer mt-3"
                                  onClick={() => {
                                    toggleDeleteModalHandler()
                                  }}
                                >
                                  <small className="font2 d-block" style={{color: "#F67E80"}}>
                                    Delete Groups
                                  </small>
                                  <img
                                    src={deleteRed}
                                    alt="delete"
                                    className="ms-2"
                                  />
                                </div>
                                </>
                              }
                            </div>
                          </Popover>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            className="table-pagination"
          />
        </> :
          loading ? (
            <span className="d-flex justify-content-center m-3">
              <Loader />
            </span>
          ) : (
            <span className="d-flex justify-content-center m-3">
              <NoDataFound />
            </span>
          )
      }
      <ArchiveModal
        onConfirm ={handleArchivedModalClose}
        onCancel={handleModalClose}
        show={openArchivedModal}
        title={"customer group"}
        message={forMassAction == true ? selected.length == 1 ? 
          groupName : selected.length : groupName 
        }
        archiveType={ forMassAction == true ? selected.length == 1 ?
          " customer group" : " customer groups": " customer group" 
        }
        products={"25 products"}
      />   
      <UnArchivedModal 
        onConfirm={handleUnArchived}
        onCancel={closeUnArchivedModal}
        show={showUnArchivedModal}
        title={"Un-Archive Collection ?"}
        primaryMessage={`Before un-archiving <span class='text-blue-1'>${groupName}</span> vendor,
        `}
        secondaryMessage={"Please set its status"}
        confirmText={"Un-Archive"}
        handleStatusValue={handleStatusValue}
        icon={unArchived}
        name={forMassAction == false ? groupName : selected.length == 1 ? groupName : selected.length} 
        nameType={ forMassAction == true ? selected.length == 1 ? " customer group" : " customer groups": " customer group" }
      />
      <DeleteModalSecondary 
        message={forMassAction == false ? groupName : selected.length == 1 ? groupName : selected.length} 
        title={ forMassAction == true ? selected.length == 1 ? " customer group" : " customer groups": " customer group" }
        onConfirm ={handleDeleteModal}
        onCancel={toggleDeleteModalHandler}
        show={showDeleteModal}
      />
    </>
  );
};

export default UserGroupsTable;
