import React, { forwardRef, useEffect } from "react";
import { Link ,useNavigate} from "react-router-dom";
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
import unArchived from "../../../assets/images/Components/Archived.png"
import closeModal from "../../../assets/icons/closeModal.svg"
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
import { useBulkEditTagMutation, useEditTagMutation } from "../../../features/parameters/tagsManager/tagsManagerApiSlice";
import { useDispatch } from "react-redux";
import { showSuccess } from "../../../features/snackbar/snackbarAction";
import { LoadingButton } from "@mui/lab";
import question from "../../../assets/icons/question.svg"
// import DeleteModal from "../../../components/DeleteDailogueModal/DeleteModal";
import DeleteModal from "../../../components/DeleteModal/DeleteModal"
import { updateTagId } from "../../../features/parameters/tagsManager/tagsManagerSlice";
import UnArchivedModal from "../../../components/UnArchivedModal/UnArchivedModal";
import DeleteIcon from '@mui/icons-material/Delete';
import NoDataFound from "../../../components/NoDataFound/NoDataFound";



// ? TABLE STARTS HERE
function createData(tId, tagName, noOfProducts) {
  return { tId, tagName, noOfProducts };
}

// ? DIALOG TRANSITION STARTS HERE
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// ? DIALOG TRANSITION ENDS HERE

const 
TagsManagerTable = ({list,edit,deleteData,isLoading,error,bulkEdit,totalCount,tagsType,bulkDelete,rowsPerPage,changeRowsPerPage,changePage,page}) => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("groupName");
  const [selected, setSelected] = React.useState([]);
  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selectedStatus, setSelectedStatus] = React.useState(null);
  const [state, setState] = React.useState([]);
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [archive, setArchive] = React.useState(false);
  const [name, setName] = React.useState(false);
  const [tag, setTag] = React.useState(false);
  const [tagName, setTagName] = React.useState("")
  const [tagStatus, setTagStatus] = React.useState("in-active")
  const navigate = useNavigate();



  const dispatch = useDispatch();

  const[editTag,{
    data: editData,
    isLoading: editTagIsLoading,
    isSuccess: editTagIsSuccess,
    error: editTagError, 
  }]=useEditTagMutation();



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

  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - list.length) : 0;

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelected = list.map((n) => n._id);
  //     setSelected(newSelected);
  //     return;
  //   }
  //   setSelected([]);
  // };
  const handleSelectAllClick = (event) => {
    if(selected.length>0)
    {
    setSelected([]);
    }
    else if (event.target.checked) {
      const newSelected = list.slice(0, rowsPerPage).map((n) => n._id);
      setSelected(newSelected);
    }
    else
    {
      setSelected([]);
    }
  };

  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
  };
  const handleMassAction  = (status) => {
    if(status ==="Set as Un-Archived")
    {
      setShowUnArhcivedModal(true);
    }
    if(status ==="Archive")
    {
      setArchivedModal(true);
    }
    if(status ==="Delete")
    {
      setShowDeleteModal(true);
    }
    setSelectedStatus(status);
  };
  // useEffect(() => {
  //   // Update the state only if the selectedStatus state has a value
  //   if (selectedStatus !== null) {
  //     const newState = selected.map((id) => {
  //       if (selectedStatus === "Set as Active") {
  //         return {
  //           id,
  //           status: "active",
  //         };
  //       } else if (selectedStatus === "Set as Draft") {
  //         return {
  //           id,
  //           status: "draft",
  //         };
  //       }
  //       else if(selectedStatus==="Archive"){
  //         return{
  //           id,
  //           status:"archieved"
  //         }
  //       }
  //        else {
  //         return {
  //           id,
  //           status: "", // Set a default value here if needed
  //         };
  //       }
  //     });
  //     setState(newState);
  //     bulkEdit({ updates: newState }).unwrap().then(()=>dispatch(showSuccess({ message: " Status updated successfully" })));
  //     setSelectedStatus(null);
  //   }
  // }, [selected, selectedStatus]);
  

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

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const toggleArchiveModalHandler = (row) => {
    setShowCreateModal((prevState) => !prevState);
    setArchive(row);
    setName(row?.name);
  };

  // const handleArchive =()=>{
  //   deleteData(archive);
  //   toggleArchiveModalHandler();
  // }

  // Archive Starts Here
  const [archivedModal,setArchivedModal] = React.useState(false)

  const handleArchive = (row) => {
    setArchivedModal(true);
    setTagName(row?.name)
    setTag(row);
  }
  const handleModalClose = () => {
    setArchivedModal(false);
  };
  const handleArchivedModalOnSave = () => {
    setArchivedModal(false);
    if(selected.length>0)
    {
      const newState = selected.map((id) => {
        return {
          id,
          status: "archieved",
        };
    });
    bulkEdit({ updates: newState }).unwrap().then(()=>dispatch(showSuccess({ message: " Tag Archived successfully" })));
    setSelected([]);
    }
    else
    {
      editTag({
        id: tag?._id,
        details : {
          status: "archieved",
          showFilter:false
        }
    }).unwrap().then(()=>dispatch(showSuccess({ message: " Tag Archived successfully" })));
    }
  }
// Archive ends here

//unArchive Starts here
const [showUnArchivedModal, setShowUnArhcivedModal] = React.useState(false);

const handleUnArchive = (row) => {
  setShowUnArhcivedModal(true)
  setTagName(row?.name)
  setTag(row)
}
const closeUnArchivedModal = () => {
  setShowUnArhcivedModal(false)
}
const handleValue = (value) => {
  setTagStatus(value)
}
const handleUnArchived = () => {
  if(selected.length>0)
    {
      const newState = selected.map((id) => {
        return {
          id,
          status: "active",
        };
    });
    bulkEdit({ updates: newState }).unwrap().then(()=>dispatch(showSuccess({ message: " Status updated successfully" })));
    setSelected([]);
    }
  else{
    editTag({
      id: tag?._id,
      details : {
        status: "active",
        showFilter:true
      }
  })
  }
 setShowUnArhcivedModal(false)
 dispatch(showSuccess({ message: "Tag Un-Archived Successfully" }));
}
//unarchive ends here
const [showDeleteModal, setShowDeleteModal] = React.useState(false);

const handleDeleteOnClick = (row) => {
  setShowDeleteModal((prevState) => !prevState);
  setTag(row)
  setTagName(row?.name);
};
const handleDelete =()=>{
  if(selected.length >1)
  {
    bulkDelete({deletes :selected})
    handleDeleteOnClick();
    setSelected([]);
  }
  else{
    deleteData(tag?._id);
    handleDeleteOnClick();
    // dispatch(showSuccess({ message: "Deleted this collection successfully" }));
  }

}

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
          {/* <button className="button-grey py-2 px-3 ms-2">
            <small className="text-lightBlue">
              Select all {totalCount} tags &nbsp;
              <span
                className="text-blue-2 c-pointer"
                onClick={() => setSelected([])}
              >
                (Clear Selection)
              </span>
            </small>
          </button> */}
          {/* <TableEditStatusButton onSelect={handleStatusSelect} defaultValue={['Set as Active','Set as Draft']} headingName="Edit Status"/> */}
          <TableMassActionButton headingName="Mass Action" onSelect={handleMassAction} defaultValue={tagsType!==1?['Edit','Archive']:['Delete','Set as Un-Archived']}/>
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
                                dispatch(updateTagId(row._id));
                                navigate("/parameters/tagsManager/edit")
                                }}
                      >
                        <p className="text-lightBlue rounded-circle fw-600">
                        {row.name}
                        </p>
                      </div>
                      </Link>
                    </TableCell>

                    <TableCell style={{ width: 180 }}>
                    <p className="text-lightBlue">{row.totalProduct}</p>
                    </TableCell>

                    {/* <TableCell style={{ width: 140, padding: 0 }}>
                      <div className="d-flex align-items-center">
                        <div className={`rounded-pill d-flex  px-2 py-1 c-pointer table-${row.status}`}>

                          <small className="text-lightBlue fw-400">
                          {row.status}
                          </small>
                        </div>
                      </div>
                    </TableCell> */}
                    {/* <TableCell style={{ width: 140, padding: 0 }}>
                            <div className="d-flex align-items-center">
                              <div className="rounded-pill d-flex px-2 py-1 c-pointer" style={{background: row.status == "active" ? "#A6FAAF" : row.status == "in-active" ? "#F67476" : row.status == "draft" ? "#C8D8FF" : "#FEE1A3"}}>
                                <small className="text-black fw-400">
                                  {row.status == "active" ? "Active" :  row.status == "in-active" ? "In-Active" : row.status == "draft" ? "Archived" : "Scheduled"}
                                </small>
                              </div>
                            </div>
                    </TableCell> */}
                   
                    {row.status ==="archieved"?
                        <TableCell style={{ width: 140, padding: 0 }}>
                         <div className="d-flex align-items-center">
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
                        </div>
                      </TableCell>

                          :
                          <TableCell style={{ width: 120, padding: 0 }}>
                            <div className="d-flex align-items-center">

                                <Tooltip title="Edit" placement="top">
                                  <Link
                                    onClick={(e) => {
                                      edit(row);
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
            {/* {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 53 * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )} */}
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
      </>): isLoading ? (
          <span className="d-flex justify-content-center m-3">Loading...</span>
        ) : (
          <span className="d-flex justify-content-center m-3">
          <NoDataFound />
          </span>
        )
      ) : (
        <></>
      )}
      {/* <Dialog
          open={archivedModal}
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
              Are you sure you want to Archive <span className="text-blue-2">{tagName}</span> ?
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
              <p>No</p>
            </button>
            <button
              className="button-gradient py-2 px-3 ms-5"
              onClick={handleArchivedModalOnSave}
            >
              <p>Yes</p>
            </button>
          </DialogActions>
      </Dialog> */}
      <DeleteModal 
      showCreateModal={showDeleteModal} 
      toggleArchiveModalHandler={handleDeleteOnClick} 
      handleArchive={handleDelete} 
      name={selected.length >= 1 ? selected.length : tagName}
      deleteType={"Tag"}
       />

      {/* <UnArchivedModal 
          handleStatusValue={handleValue}
          showUnArchivedModal={showUnArchivedModal}
          closeUnArchivedModal={closeUnArchivedModal}
          handleUnArchived={handleUnArchived}
          name={selected.length >= 1 ? selected.length : tagName}
          nameType={"Tag"}
        /> */}
      {/* <Dialog
          open={showUnArchivedModal}
          TransitionComponent={Transition}
          keepMounted
          onClose={closeUnArchivedModal}
          aria-describedby="alert-dialog-slide-description"
          maxWidth="sm"
        >
          <DialogContent className="py-2 px-4 text-center">
            <img src={question} alt="question" width={200} />
            <div className="row"></div>
            <h6 className="text-lightBlue mt-2 mb-2">
              Are you sure you want to Un-Archive {tagName} ?
            </h6>
            <div className="d-flex justify-content-center mt-4">
              <hr className="hr-grey-6 w-100" />
            </div>
          </DialogContent>
          <DialogActions className="d-flex justify-content-between px-4 pb-4">
            <button
              className="button-red-outline py-2 px-3 me-5"
              onClick={closeUnArchivedModal}
            >
              <p>Cancel</p>
            </button>
            <button
              className="button-gradient py-2 px-3 ms-5"
              onClick={handleUnArchived}
            >
              <p>Activate</p>
            </button>
          </DialogActions>
      </Dialog> */}
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
      </Dialog>






      <Dialog
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
      </Dialog>

    </React.Fragment>

  );
};

export default TagsManagerTable;
