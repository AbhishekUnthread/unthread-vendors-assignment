import React, { forwardRef, useEffect } from "react";
import { Link } from "react-router-dom";
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
import { useBulkEditTagMutation } from "../../../features/parameters/tagsManager/tagsManagerApiSlice";
import { useDispatch } from "react-redux";
import { showSuccess } from "../../../features/snackbar/snackbarAction";
import { LoadingButton } from "@mui/lab";
import question from "../../../assets/icons/question.svg"


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
TagsManagerTable = ({list,edit,deleteData,isLoading,error,bulkEdit}) => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("groupName");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selectedStatus, setSelectedStatus] = React.useState(null);
  const [state, setState] = React.useState([]);
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [archive, setArchive] = React.useState(false);

  const dispatch = useDispatch();




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

  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
  };

  useEffect(() => {
    // Update the state only if the selectedStatus state has a value
    if (selectedStatus !== null) {
      const newState = selected.map((id) => {
        if (selectedStatus === "Set as Active") {
          return {
            id,
            status: "active",
          };
        } else if (selectedStatus === "Set as Draft") {
          return {
            id,
            status: "draft",
          };
        } else {
          return {
            id,
            status: "", // Set a default value here if needed
          };
        }
      });
      setState(newState);
      bulkEdit({ updates: newState }).unwrap().then(()=>dispatch(showSuccess({ message: " Status updated successfully" })));
      setSelectedStatus(null);
    }
  }, [selected, selectedStatus]);
  

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

  const toggleArchiveModalHandler = (row) => {
    setShowCreateModal((prevState) => !prevState);
    setArchive(row);
  };

  const handleArchive =()=>{
    deleteData(archive);
    toggleArchiveModalHandler();
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
          <TableEditStatusButton onSelect={handleStatusSelect} defaultValue={['Set as Active','Set as Draft']} headingName="Edit Status"/>
          <TableMassActionButton />
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
                        to="/parameters/tagsManager/edit"
                      >
                        <p className="text-lightBlue rounded-circle fw-600">
                        {row.name}
                        </p>
                      </Link>
                    </TableCell>

                    <TableCell style={{ width: 180 }}>
                    <p className="text-lightBlue">{row.totalProduct}</p>
                         </TableCell>

                    <TableCell style={{ width: 140, padding: 0 }}>
                      <div className="d-flex align-items-center">
                        <div className={`rounded-pill d-flex  px-2 py-1 c-pointer table-${row.status}`}>

                          <small className="text-lightBlue fw-400">
                          {row.status}
                          </small>
                        </div>
                      </div>
                    </TableCell>
                   
                    <TableCell style={{ width: 120, padding: 0 }}>
                      <div className="d-flex align-items-center">

                      {edit && <Tooltip  title="Edit" placement="top">
                          <Link
                           onClick={(e)=>{
                            edit(row)
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
                        </Tooltip>} 
                       

                       {deleteData && <Tooltip 
                         onClick={(e)=>{
                          row.status === "active"
                                      ? toggleArchiveModalHandler(row)
                                      : deleteData(row);
                        }} title={row.status==="active"?'Archive':'Un-Archive'} placement="top">
                          <div className="table-edit-icon rounded-4 p-2">
                            <InventoryIcon
                              sx={{
                                color: "#5c6d8e",
                                fontSize: 18,
                                cursor: "pointer",
                              }}
                            />
                          </div>
                        </Tooltip> }  
                      </div>
                    </TableCell>
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
        count={list.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        className="table-pagination"
      />
      </>): isLoading ? (
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
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        maxWidth="sm"
        fullWidth={true}
        open={showCreateModal}
        onClose={toggleArchiveModalHandler}
      >
        <hr className="hr-grey-6 my-0" />
        <DialogContent className="py-3 px-4">
          <Box
            sx={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              width: "50%",
            }}
          >
            <img src={question} alt="questionMark" />
          </Box>
          <Typography
            variant="h5"
            align="center"
            sx={{ color: "lightBlue", marginBottom: 2 }}
          >
            Are you sure you want to Archive?
          </Typography>

          <br />
        </DialogContent>

        <hr className="hr-grey-6 my-0" />

        <DialogActions className="d-flex justify-content-between px-4 py-3">
          <button
            className="button-grey py-2 px-5"
            onClick={toggleArchiveModalHandler}
            type="button"
          >
            <p className="text-lightBlue">No</p>
          </button>
          <LoadingButton
            className="button-gradient py-2 px-5"
            type="button"
            onClick={handleArchive}
          >
            <p>Yes</p>
          </LoadingButton>
        </DialogActions>
      </Dialog>

    </React.Fragment>

  );
};

export default TagsManagerTable;
