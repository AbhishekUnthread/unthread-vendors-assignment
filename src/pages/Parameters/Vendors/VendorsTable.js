import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
// ! COMPONENT IMPORTS
import {
  EnhancedTableHead,
  stableSort,
  getComparator,
} from "../../../components/TableDependencies/TableDependencies";
import TableEditStatusButton from "../../../components/TableEditStatusButton/TableEditStatusButton";
import TableMassActionButton from "../../../components/TableMassActionButton/TableMassActionButton";
import { DeleteModalSecondary } from "../../../components/DeleteModal/DeleteModal"
import { updateVendorId } from "../../../features/parameters/vendors/vendorSlice";
import NoDataFound from "../../../components/NoDataFound/NoDataFound";
import unArchived from "../../../assets/images/Components/Archived.png"
import ArchiveModal, { MultipleArchiveModal } from "../../../components/ArchiveModal/ArchiveModal";
import UnArchiveModal, { MultipleUnArchiveModal } from "../../../components/UnArchiveModal/UnArchiveModal";
import { showSuccess } from "../../../features/snackbar/snackbarAction";
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
import DeleteIcon from '@mui/icons-material/Delete';


// ? TABLE STARTS HERE
function createData(vId, vendorsName, noOfProducts, status) {
  return { vId, vendorsName, noOfProducts, status };
}
const headCells = [
  {
    id: "vendorsName",
    numeric: false,
    disablePadding: true,
    label: "Vendors Name",
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

const VendorsTable = ({ list, edit, deleteData, error, isLoading,totalCount, vendorType, bulkDelete,editVendor,bulkEdit,rowsPerPage,changeRowsPerPage,changePage,page }) => {

  const dispatch = useDispatch();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("groupName");
  const [selected, setSelected] = React.useState([]);
  const [selectedStatus, setSelectedStatus] = React.useState(null);
  const [vendor, setVendor] = React.useState(false);
  const [vendorName, setVendorName] = React.useState("")
  const [vendorStatus, setVendorStatus] = React.useState("in-active")
  const [showArchivedModal,setShowArchivedModal] = useState(false)
  const [showMultipleArchivedModal,setShowMultipleArchivedModal] = useState(false)
  const [showUnArchivedModal, setShowUnArhcivedModal] = React.useState(false);
  const [showMultipleUnArhcivedModal,setShowMultipleUnArhcivedModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [showMultipleDeleteModal, setShowMultipleDeleteModal] = React.useState(false);



  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
  };
  useEffect(() => {
    if (selectedStatus !== null) {
      const newState = selected.map((id) => {
        if (selectedStatus === "Set as Active") {
          return {
            id,
            status: "active",
          };
        }
        else if (selectedStatus === "Set as In-Active") {
          return {
            id,
            status: "in-active",
          };
        } 
        else {
          return {
            id,
            status: "", // Set a default value here if needed
          };
        }
      });
      bulkEdit({ updates: newState })
      .unwrap().then(()=>dispatch(showSuccess({ message: " Status updated successfully" })));
      setSelectedStatus(null);
      setSelected([]);
    }
  }, [selectedStatus,dispatch])
  

  const handleMassAction  = (status) => {
    if(status ==="Set as Un-Archived")
    {
      setShowMultipleUnArhcivedModal(true);
    }
    if(status ==="Archive")
    {
      setShowMultipleArchivedModal(true);
    }
    if(status ==="Delete")
    {
      setShowMultipleDeleteModal(true);
    }
  };


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if(selected.length>0)
    {
    setSelected([]);
    }
    else if(event.target.checked) {
      const newSelected = list.slice(0, rowsPerPage).map((n) => n._id);
      setSelected(newSelected);
    }
    else
    {
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
    setVendorName(row?.name)
    setVendor(row);
  }
  const handleArchiveModalClose = () => {
    setShowArchivedModal(false);
    setShowMultipleArchivedModal(false);
  };
  const handleArchivedModalOnSave = () => {
      editVendor({
        id: vendor?._id,
        details : {
          status: "archieved",
          showFilter:false
        }
    })
    .unwrap().then(()=>dispatch(showSuccess({ message: " Vendor Archived Successfully" })));
    setShowArchivedModal(false);
    setVendorName("");
    }

const handleMultipleArchivedModalOnSave = () => {
  const newState = selected.map((id) => {
    return {
      id,
      status: "archieved",
    };
  });
  bulkEdit({ updates: newState })
    .unwrap()
    .then(() => dispatch(showSuccess({ message: `${selected.length === 1 ? "Vendor" : "Vendors"} Archived Successfully` }
    )));
  setSelected([]);
  setShowMultipleArchivedModal(false);
};
// Archive ends here

//unArchive Starts here
const handleUnArchive = (row) => {
  setShowUnArhcivedModal(true)
  setVendorName(row?.name)
  setVendor(row)
}
const closeUnArchivedModal = () => {
  setShowUnArhcivedModal(false);
  setShowMultipleUnArhcivedModal(false);
}
const handleValue = (value) => {
  setVendorStatus(value)
}
const handleUnArchived = () => {
  editVendor({
     id: vendor?._id,
     details : {
       status: vendorStatus,
       showFilter:true
     }
 }).unwrap().then(()=>dispatch(showSuccess({ message: "Vendor Un-Archived successfully" })))
    setShowUnArhcivedModal(false)
}
const handleMultipleUnArchived = () => {
  const newState = selected.map((id) => {
      return {
        id,
        status: vendorStatus,
      };
  });
  bulkEdit({ updates: newState }).unwrap().then(()=>dispatch(showSuccess({ message: `${selected.length === 1 ? "Vendor" : "Vendors"} Un-Archived Successfully` })));
  setShowMultipleUnArhcivedModal(false);
  setSelected([]);
};
//unarchive ends here

//Delete Starts Here
const handleDeleteOnClick = (row) => {
  setShowDeleteModal(true);
  setVendor(row)
  setVendorName(row?.name);
};
const handleDeleteModalClose =()=>{
  setShowDeleteModal(false);
  setShowMultipleDeleteModal(false);
}
const handleDelete =()=>{
    deleteData(vendor?._id)
    .unwrap().then(()=>dispatch(showSuccess({ message: "Vendor Deleted successfully" })));
    setShowDeleteModal(false);
  }
const handleMultipleDelete=()=>{
  bulkDelete({deletes :selected})
  .unwrap().then(()=>dispatch(showSuccess({ message: `${selected.length === 1 ? "Vendor" : "Vendors"} Deleted Successfully` })));
  setShowMultipleDeleteModal(false);
  setSelected([]);
}
//delete ends here

  return (
    <React.Fragment>
      {selected.length > 0 && (
        <div className="d-flex align-items-center px-2 mb-3">
          <button className="button-grey py-2 px-3">
            <small className="text-lightBlue">
              {selected.length} vendors are selected&nbsp;
              <span
                className="text-blue-2 c-pointer"
                onClick={() => setSelected([])}
              >
                (Clear Selection)
              </span>
            </small>
          </button>
          {vendorType!==3 &&<TableEditStatusButton
            onSelect={handleStatusSelect}
            defaultValue={["Set as Active", "Set as In-Active"]}
            headingName="Edit Status"
          />}
          <TableMassActionButton headingName="Mass Action" onSelect={handleMassAction} defaultValue={vendorType !==3?['Edit','Archive']:['Delete','Set as Un-Archived']}/>
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
                                dispatch(updateVendorId(row._id));
                                edit(row,index+1,vendorType);
                                }}
                            >
                              <p className="text-lightBlue rounded-circle fw-600">
                                {row.name}{" "}
                              </p>
                            </div>
                            </Link>
                          </TableCell>

                          <TableCell style={{ width: 180 }}>
                            <p className="text-lightBlue">{row.totalProduct}</p>
                          </TableCell>

                          <TableCell style={{ width: 140, padding: 0 }}>
                            <div className="d-flex align-items-center">
                              <div className="rounded-pill d-flex px-2 py-1 statusBoxWidth"
                               style={{background: 
                               row.status == "active" ? "#A6FAAF" :
                               row.status == "in-active" ? "#F67476" : 
                               row.status == "archieved" ? "#C8D8FF" : "#FEE1A3",cursor: "context-menu"
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
                          {row.status ==="archieved"?
                        <TableCell style={{ width: 140, padding: 0 }}>
                         <div className="d-flex align-items-center">
                         <Tooltip
                              onClick={() => {
                                handleUnArchive(row)
                                }
                              }
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
                          <Tooltip title="Delete" placement="top">
                            <div className="table-edit-icon rounded-4 p-2" 
                                onClick={(e) => {
                                  handleDeleteOnClick(row)
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
                        </div>
                      </TableCell>

                          :
                          <TableCell style={{ width: 120, padding: 0 }}>
                            <div className="d-flex align-items-center">

                                <Tooltip title="Edit" placement="top">
                                  <Link
                                    onClick={(e) => {
                                      edit(row,index+1,vendorType);
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
                                handleArchive(row)
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
                          </TableCell>}
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
              page={page-1}
              onPageChange={changePage}
              onRowsPerPageChange={changeRowsPerPage}
              className="table-pagination"
            />
          </>
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
          onConfirm ={handleArchivedModalOnSave}
          onCancel={handleArchiveModalClose}
          show={showArchivedModal}
          title={"vendor"}
          message={vendorName}
          products={"25 products"}
        />
        <MultipleArchiveModal
          onConfirm ={handleMultipleArchivedModalOnSave}
          onCancel={handleArchiveModalClose}
          show={showMultipleArchivedModal}
          title={"vendors"}
          message={`${selected.length === 1 ? `${selected.length} vendor` : `${selected.length} vendors`}`}
          pronoun ={`${selected.length === 1 ? "this" : `these`}`}
        />
        <UnArchiveModal 
        onConfirm={handleUnArchived}
        onCancel={closeUnArchivedModal}
        show={showUnArchivedModal}
        title={"Un-Archive Vendor ?"}
        primaryMessage={`Before un-archiving <span class='text-blue-1'>${vendorName}</span> vendor,
        `}
        secondaryMessage={"Please set its status"}
        confirmText={"Un-Archive"}
        handleStatusValue={handleValue}
        icon={unArchived}
        />
        <MultipleUnArchiveModal
        onConfirm={handleMultipleUnArchived}
        onCancel={closeUnArchivedModal}
        show={showMultipleUnArhcivedModal}
        title={"Un-Archive Vendors ?"}
        primaryMessage={`Before un-archiving <span class='text-blue-1'>${selected.length}</span> ${selected.length===1?"Vendor":"Vendors"},
        `}
        secondaryMessage={"Please set its status"}
        confirmText={"Un-Archive"}
        handleStatusValue={handleValue}
        icon={unArchived}
        />
        <DeleteModalSecondary
          onConfirm ={handleDelete}
          onCancel={handleDeleteModalClose}
          show={showDeleteModal}
          title={"vendor"}
          message={vendorName}
        />
          <DeleteModalSecondary
          onConfirm ={handleMultipleDelete}
          onCancel={handleDeleteModalClose}
          show={showMultipleDeleteModal}
          title={"multiple vendor"}
          message={`${selected.length === 1 ? `${selected.length} vendor` : `${selected.length} vendors`}`}
        />      

    </React.Fragment>
  );
};

export default VendorsTable;
