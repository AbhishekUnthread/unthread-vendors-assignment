import { useState } from "react";
import { useDispatch } from "react-redux";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  Checkbox,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Tooltip,
} from "@mui/material";

import { 
  useEditCustomerMutation,
  useBulkEditCustomerMutation,
  useBulkDeleteCustomerMutation,
  useDeleteCustomerMutation
} from "../../../features/customers/customer/customerApiSlice";
import { showSuccess } from "../../../features/snackbar/snackbarAction";

import {
  EnhancedTableHead,
  stableSort,
  getComparator,
} from "../../../components/TableDependencies/TableDependencies";
import Loader from "../../../components/Loader/TableLoader";
import NoData from "../../../components/NoDataFound/NoDataFound";
import ArchiveModal from "../../../components/ArchiveModal/ArchiveModal";
import { DeleteModalSecondary } from "../../../components/DeleteModal/DeleteModal";
import { UnArchivedModal } from "../../../components/UnArchiveModal/UnArchiveModal";

import verticalDots from "../../../assets/icons/verticalDots.svg";
import arrowDown from "../../../assets/icons/arrowDown.svg";
import deleteRed from "../../../assets/icons/delete.svg";
import defaultUser from "../../../assets/images/users/user_defauldp.svg";
import unArchived from "../../../assets/images/Components/Archived.png";

const AllUsersTable = ({
  isLoading,
  error,
  list,
  totalCount,
  rowsPerPage,
  changeRowsPerPage,
  changePage,
  page,
  onEdit,
  customerType,
  edit
}) => {
  const dispatch = useDispatch();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("userName");
  const [selected, setSelected] = useState([]);
  const [anchorMassActionEl, setAnchorMassActionEl] = useState(null);
  const [anchorActionEl, setAnchorActionEl] = useState(null);
  const [openArchivedModal, setArchivedModal] = useState(false);
  const [customerId, setCustomerId] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [customerInfo, setCustomerInfo] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [forMassAction, setForMassAction] = useState(false);
  const [statusValue, setStatusValue] = useState("in-active");
  const [showUnArchivedModal, setShowUnArhcivedModal] = useState(false);

  const [
    editCustomer,
    {
      data: editData,
      isLoading: editCustomerIsLoading,
      isSuccess: editCustomerIsSuccess,
      error: editCustomerError,
    }
  ] = useEditCustomerMutation();

   const[
    bulkEditCustomer,
    {
      data: bulkEditCustomers,
      isLoading: bulkCustomerEditLoading,
      isSuccess: bulkCustomerEditIsSuccess,
      error: bulkCustomerEditError,
    }
  ] = useBulkEditCustomerMutation();

  const [
    deleteCustomer,
    {
      isLoading: deleteCustomerIsLoading,
      isSuccess: deleteCustomerIsSuccess,
      error: deleteCustomerError,
    },
  ] = useDeleteCustomerMutation();

  const [
    bulkDeleteCustomer,
    {
      isLoading: bulkDeleteCustomerIsLoading,
      isSuccess: bulkDeleteCustomerIsSuccess,
      error: bulkDeleteCustomerError,
    },
  ] = useBulkDeleteCustomerMutation();

  const handleArchive = () => {
    setForMassAction(false);
    handleActionClose();
    setArchivedModal(true);
  }

  const handleUnArchive = () => {
    setForMassAction(false)
    handleActionClose();
    setShowUnArhcivedModal(true)
  }

  const handleDelete = () => {
    setForMassAction(false)
    handleActionClose();
    setShowDeleteModal(true)
  }

  const handleMultipleArchive = () => {
    setForMassAction(true)
    handleMassActionClose();
    setArchivedModal(true)
  }

  const handleMultipleUnarchive = () => {
    setForMassAction(true)
    handleMassActionClose();
    setShowUnArhcivedModal(true);
  }

  const handleMultipleDelete = () => {
    setForMassAction(true);
    setAnchorMassActionEl(false);
    setShowDeleteModal(true);
  }

  const toggleDeleteModalHandler = (row) => {
    setShowDeleteModal((prevState) => !prevState);
  };

  const closeUnArchivedModal = () => {
    setShowUnArhcivedModal(false)
  }

  const handleStatusValue = (value) => {
    setStatusValue(value);
  };

   const handleArchivedModalClose = () => {
    if(forMassAction == true) {
      const newState = selected.map((id) => ({
        id: id,
        status: "archieved"
      }))

      const requestData = {
        updates: newState
      };

      bulkEditCustomer(requestData).unwrap().then(()=> {
        dispatch(showSuccess({ message: "Customers archived successfully!" }));
        setArchivedModal(false);
        setSelected([])
      })
    } else {
      editCustomer({
        id: customerId,
        details : {
          status: "archieved"
        }
      })
      setArchivedModal(false);
      dispatch(showSuccess({ message: "Customer archived successfully!" }));
    }
  } 

  const handleDeleteModal =()=>{
    if(forMassAction === true) {
      bulkDeleteCustomer({deletes: selected}).unwrap().then(()=> {
        dispatch(showSuccess({ message: "Customers delete successfully!" }));
        setShowDeleteModal(false);
        setSelected([])
      })
    } 
    else {
      handleClick(null, customerId);
      deleteCustomer(customerId);
      setShowDeleteModal(false)
      dispatch(showSuccess({ message: "Customer deleted successfully!" }));
    }
  }

  const handleUnArchived = () => {
    if(forMassAction === true) {
      const newState = selected.map((id) => ({
        id: id,
        status: statusValue
      }))

      const requestData = {
        updates: newState
      };

      bulkEditCustomer(requestData).unwrap().then(()=> {
        dispatch(showSuccess({ message: "Customers archived successfully!" }));
        setShowUnArhcivedModal(false);
        setSelected([])
      })
    } else {
      handleClick(null, customerId);
      editCustomer({
        id: customerId,
        details : {
          status: statusValue
        }
      })
      setShowUnArhcivedModal(false);
      dispatch(showSuccess({ message: "Customer archived successfully!" }));
    }
  }

  const handleModalClose = () => {
    setArchivedModal(false);
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
      const newSelected = list.slice(0, rowsPerPage).map((n) => n._id);
      setSelected(newSelected);
    }
    else {
      setSelected([]);
    }
  }; 

  const handleClick = (event, name, data) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    setFirstName(data?.firstName);
    setLastName(data?.lastName);

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

  const handleMassActionClick = (event) => {
    setAnchorMassActionEl(event.currentTarget);
  };

  const handleMassActionClose = () => {
    setAnchorMassActionEl(null);
  };
  
  const openMassAction = Boolean(anchorMassActionEl);
  const idMassAction = openMassAction ? "simple-popover" : undefined;

  const handleActionClick = (event, row) => {
    setCustomerInfo(row)
    setCustomerId(row._id);
    setFirstName(row?.firstName);
    setLastName(row?.lastName)
    setAnchorActionEl(event.currentTarget);
  };

  const handleActionClose = () => {
    setAnchorActionEl(null);
  };

  const openActions = Boolean(anchorActionEl);
  const idActions = openActions ? "simple-popover" : undefined;

  const headCells = [
    {
      id: "userName",
      numeric: false,
      disablePadding: true,
      label: "Customer Name",
    },
    {
      id: "groups",
      numeric: false,
      disablePadding: false,
      label: "Groups",
    },
    {
      id: "location",
      numeric: false,
      disablePadding: false,
      label: "Location",
    },
    {
      id: "orders",
      numeric: false,
      disablePadding: false,
      label: "Orders",
    },
    {
      id: "totalSpent",
      numeric: false,
      disablePadding: false,
      label: "Total Spent",
    }
  ];

  if (customerType === 0 || customerType === 4) {
    headCells.push({
      id: "status",
      numeric: false,
      disablePadding: false,
      label: "Status",
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
        <div className="d-flex justify-content-between align-items-center px-2 mb-3">
          <div className="d-flex">
            <button className="button-grey py-2 px-3">
              <small className="text-lightBlue">
                {selected.length} users are selected&nbsp;
                <span
                  className="text-blue-2 c-pointer"
                  onClick={() => setSelected([])}
                >
                  (Clear Selection)
                </span>
              </small>
            </button>

            <button
              className="button-grey py-2 px-3 ms-2"
              aria-describedby={idMassAction}
              variant="contained"
              onClick={handleMassActionClick}
            >
              <small className="text-lightBlue">Mass Action</small>
              <img src={arrowDown} alt="arrowDown" className="ms-2" />
            </button>
            <Popover
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              id={idMassAction}
              open={openMassAction}
              anchorEl={anchorMassActionEl}
              onClose={handleMassActionClose}
            >
              <div className="py-2 px-2">
                <small className="text-grey-7 px-2">ACTIONS</small>
                <hr className="hr-grey-6 my-2" />
                {customerType !== 4 ?
                  <>
                    <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                      Edit Customer
                    </small>
                    <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                      Edit Customer Group
                    </small>
                    <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                      Add or Remove Tags
                    </small>
                    <div 
                      className="d-flex justify-content-between  hover-back rounded-3 p-2 c-pointer"
                      onClick={handleMultipleArchive}
                    >
                      <small className="text-lightBlue font2 d-block">
                        Archive Customer
                      </small>
                      <img src={deleteRed} alt="delete" className="" />
                    </div> 
                  </>
                : 
                  <>
                    <small 
                      className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back"
                      onClick={handleMultipleUnarchive}
                    >
                      Un-Archive Customer
                    </small>
                    <div 
                      className="d-flex justify-content-between  hover-back rounded-3 p-2 c-pointer"
                      onClick={handleMultipleDelete}
                    >
                      <small className="text-lightBlue font2 d-block">
                        Delete Customer
                      </small>
                      <img src={deleteRed} alt="delete" className="" />
                    </div>
                  </>
                }
              </div>
            </Popover>
          </div>
        </div>
      )}
      {!error ? (list.length ?( <>
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
                  const isItemSelected = isSelected(row?._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row?._id}
                      selected={isItemSelected}
                      className="table-rows"
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                          onClick={(event) => handleClick(event, row?._id, row)}
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
                        <div className="d-flex align-items-center py-3">
                          <img
                            src={row?.imageUrl ? row?.imageUrl : defaultUser}
                            alt="user"
                            className="me-2 rounded-circle"
                            height={45}
                            width={45}
                          />

                          <div>
                            <div
                              className=" text-decoration-none c-pointer"
                              onClick={() => onEdit(row?._id)}
                            >
                              <p className="text-lightBlue rounded-circle fw-600">
                                {row?.firstName} {row?.lastName}
                              </p>
                            </div>
                            <small className="mt-2 text-grey-6">
                              {row?.email}
                              <Tooltip title="Copy" placement="top">
                                <ContentCopyIcon
                                  sx={{ fontSize: 12, color: "#c8d8ff" }}
                                  className="c-pointer ms-2"
                                />
                              </Tooltip>
                            </small>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="d-flex align-items-center">
                          <p className="text-lightBlue">
                          {row.groups.length>0?(
                            row?.groups?.map((group,index) => (
                              <span key={group._id}>{group.name}{index !== row.groups.length - 1 && ","}</span>
                          ))):""}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="d-flex flex-column align-items-start">
                          <div key={index}>
                            {row?.addresses[0] &&
                              <div className="d-flex align-items-center">
                                <img src={row?.addresses[0]?.country?.imageUrl} height={16} />
                                <p className="text-lightBlue ms-2">
                                  {row?.addresses[0]?.state?.name || " "}, {" "}
                                  {row?.addresses[0]?.country?.name}
                                </p>
                              </div>
                            }
                            <br />
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <p className="text-lightBlue">24</p>
                      </TableCell>
                      <TableCell>
                        <div className="d-flex">
                          <p className="text-lightBlue">₹ 52,000</p>
                        </div>
                      </TableCell>
                      { (customerType === 0 || customerType === 4 ) && 
                        <TableCell>
                          <div className="d-flex align-items-center">
                            <div className="rounded-pill d-flex px-2 py-1" 
                              style={{
                                background: row.status == "active" ? "#A6FAAF" : 
                                row.status == "in-active" ? "#F67476" : "#C8D8FF" 
                              }}
                            >
                              <small className="text-black fw-500">
                                {
                                  row.status == "active" ? "Active" : 
                                  row.status == "in-active" ? "In-active" : "Archived"
                                }
                              </small>
                            </div>
                          </div>
                        </TableCell> 
                      }
                      <TableCell>
                        <div className="d-flex align-items-center">
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
                              {customerType !== 4 ?
                              <>
                                <small 
                                  className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back"
                                  onClick={(e) => {
                                    if(customerType != 3) {
                                      edit(customerInfo, index+1, customerType);
                                    }
                                  }}
                                >
                                  Edit Customer
                                </small>
                                <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                                  Edit Customer Group
                                </small>
                                <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                                  Add or Remove Tags
                                </small>
                                <div 
                                  className="d-flex justify-content-between  hover-back rounded-3 p-2 c-pointer"
                                  onClick={() => { handleArchive()}}
                                >
                                  <small className="font2 d-block" style={{color: "#F67E80"}}>
                                    Archive Customer
                                  </small>
                                  <img src={deleteRed} alt="delete" className="" />
                                </div>
                              </> :
                              <>
                                <small 
                                  className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back"
                                  onClick={() => { handleUnArchive()}}
                                >
                                  Un-Archive Customer
                                </small>
                                <div 
                                  className="d-flex justify-content-between  hover-back rounded-3 p-2 c-pointer"
                                  onClick={() => { handleDelete()}}
                                >
                                  <small className="font2 d-block" style={{color: "#F67E80"}}>
                                    Delete Customer
                                  </small>
                                  <img src={deleteRed} alt="delete" className="" />
                                </div>
                              </> }
                            </div>
                          </Popover>
                        </div>
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
          onPageChange={changePage}
          onRowsPerPageChange={changeRowsPerPage}
          className="table-pagination"
        />
        </>):isLoading ? (
            <span className="d-flex justify-content-center m-3">
              <Loader />
            </span>
          ): (
            <span className="d-flex justify-content-center m-3">
              <NoData />
            </span>
        )): (
        <></>
      )}
      <ArchiveModal
        onConfirm ={handleArchivedModalClose}
        onCancel={handleModalClose}
        show={openArchivedModal}
        title={"customer"}
        message={
          forMassAction == true ? selected.length == 1 ? 
          firstName + " " + lastName : selected.length : firstName + " " + lastName 
        }
        archiveType={ 
          forMassAction == true ? selected.length == 1 ?
          " customer" : " customers": " customer" 
        }
        products={"25 products"}
      />   
      <UnArchivedModal 
        onConfirm={handleUnArchived}
        onCancel={closeUnArchivedModal}
        show={showUnArchivedModal}
        title={"Un-Archive Customer ?"}
        primaryMessage={`Before un-archiving <span class='text-blue-1'>${firstName + " " + lastName}</span> Customer,
        `}
        secondaryMessage={"Please set its status"}
        confirmText={"Un-Archive"}
        handleStatusValue={handleStatusValue}
        icon={unArchived}
        name={
          forMassAction == false ? firstName + " " + lastName : 
          selected.length == 1 ? firstName + " " + lastName : selected.length
        } 
        nameType={ forMassAction == true ? selected.length == 1 ? " customer" : " customers": " customer" }
      />
      <DeleteModalSecondary 
        message={
          forMassAction == false ? firstName + " " + lastName :
          selected.length == 1 ? firstName + " " + lastName : selected.length
        } 
        title={ forMassAction == true ? selected.length == 1 ? " customer" : " customers": " customer" }
        onConfirm ={handleDeleteModal}
        onCancel={toggleDeleteModalHandler}
        show={showDeleteModal}
      />
    </>
  );
};

export default AllUsersTable;
