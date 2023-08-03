import { useState } from "react";
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
  useDeleteCustomerGroupMutation
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

import verticalDots from "../../../assets/icons/verticalDots.svg";
import deleteRed from "../../../assets/icons/delete.svg";

const UserGroupsTable = ({ data, totalCount, value, loading, error }) => {
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

  const handleArchive = (id, group, list) => {
    setArchivedModal(true);
    setGroupId(id);
    setGroupName(group)
  }

  const handleArchivedModalClose = () => {
    editCustomerGroup({
      id: groupId,
      details : {
        status: "archived"
      }
    })
    setArchivedModal(false);
    dispatch(showSuccess({ message: "Customer Group archived successfully!" }));
  }

  const handleModalClose = () => {
    setArchivedModal(false);
  };

  const handleArchiveModal =()=>{
    handleClick(null, groupId);
    deleteCustomerGroup(groupId);
    setShowDeleteModal(false)
    dispatch(showSuccess({ message: "Collection deleted successfully!" }));
  }

  const toggleArchiveModalHandler = (row) => {
    setShowDeleteModal((prevState) => !prevState);
    setGroupId(row._id);
    setGroupName(row?.name);
  };

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

  const handleActionClick = (event) => {
    setAnchorActionEl(event.currentTarget);
  };

  const handleActionClose = () => {
    setAnchorActionEl(null);
  };

  const openActions = Boolean(anchorActionEl);
  const idActions = openActions ? "simple-popover" : undefined;

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

  if (value === 0 || value === 2) {
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
          <TableEditStatusButton />
          <TableMassActionButton />
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
                          <Link
                            to="/users/userGroups/create"
                            className="d-flex align-items-center text-decoration-none c-pointer"
                          >
                            <p className="text-lightBlue rounded-circle fw-600">
                              {row?.name}
                            </p>
                          </Link>
                        </TableCell>
                        <TableCell style={{ width: 180 }}>
                          <p className="text-lightBlue">{row.usersInGroup}</p>
                        </TableCell>
                        { (value == 0 || value == 2) &&
                          <TableCell style={{ width: 180 }}>
                            <div className="d-flex align-items-center">
                              <div 
                                className="rounded-pill d-flex px-2 py-1 c-pointer"
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
                            onClick={handleActionClick}
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
                              { value != 2 ? 
                                <>
                                  <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                                    Edit User Groups
                                  </small>
                                  <div className="d-flex justify-content-between  hover-back rounded-3 p-2 c-pointer"
                                    onClick={() => { handleArchive(row?._id, row?.name)}}
                                  >
                                    <small className="text-lightBlue font2 d-block">
                                      Archive Groups
                                    </small>
                                    <img
                                      src={deleteRed}
                                      alt="delete"
                                      className="ms-2"
                                    />
                                  </div>
                                </> : 
                                <div className="d-flex justify-content-between  hover-back rounded-3 p-2 c-pointer"
                                  onClick={(e) => {
                                    toggleArchiveModalHandler(row)
                                  }}
                                >
                                  <small className="text-lightBlue font2 d-block">
                                    Delete Groups
                                  </small>
                                  <img
                                    src={deleteRed}
                                    alt="delete"
                                    className="ms-2"
                                  />
                                </div>
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
        title={"Customer Group"}
        message={groupName}
        archiveType={"Customer Group"}
        products={"25 products"}
      />
      <DeleteModalSecondary 
        message={groupName}
        title={" Customer Group"}
        onConfirm ={handleArchiveModal}
        onCancel={toggleArchiveModalHandler}
        show={showDeleteModal}
      />
    </>
  );
};

export default UserGroupsTable;
