import React from "react";
import { Link } from "react-router-dom";
// ! MATERIAL IMPORTS
import {
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  OutlinedInput,
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

import { DesktopDateTimePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

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

const CollectionsTable = ({ list, error, isLoading, deleteData }) => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("groupName");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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

   // ? DUPLICATE COLLECTION DIALOG STARTS HERE
  const [openDuplicateCollection, setOpenDuplicateCollection] = React.useState(false);

  const handelDuplicateCollection = () => {
    setOpenDuplicateCollection(true);
  };

  const handelDuplicateCollectionClose = () => {
    setOpenDuplicateCollection(false);
  };
  // ? DUPLICATE COLLECTION DIALOG ENDS HERE

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
          <TableEditStatusButton />
          <TableMassActionButton />
        </div>
      )}
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
                const isItemSelected = isSelected(row.cId);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.cId}
                    selected={isItemSelected}
                    className="table-rows"
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                        onClick={(event) => handleClick(event, row.cId)}
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
                        <div className="rounded-pill d-flex table-status px-2 py-1 c-pointer">
                          <small className="text-black fw-400">
                            {row.status}
                          </small>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell style={{ width: 140, padding: 0 }}>
                      <div className="d-flex align-items-center">
                        <Tooltip title="Edit" placement="top">
                          <div className="table-edit-icon rounded-4 p-2">
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
                          <div className="table-edit-icon rounded-4 p-2"
                            onClick={handelDuplicateCollection}
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
                        {deleteData && (
                        <Tooltip title="Archive" placement="top">
                          <div className="table-edit-icon rounded-4 p-2"
                            onClick={(e) => {
                              deleteData(row);
                            }}
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
                        )}
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

      <Dialog
        open={openDuplicateCollection}
        TransitionComponent={Transition}
        keepMounted
        onClose={handelDuplicateCollectionClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogTitle>
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="text-lightBlue fw-500">Duplicate Collection</h5>
            <img
              src={cancel}
              alt="cancel"
              width={30}
              onClick={handelDuplicateCollectionClose}
              className="c-pointer"
            />
          </div>
          <Tooltip title="Lorem ipsum" placement="top">
            <img
                src={info}
                alt="info"
                className=" c-pointer"
                width={13.5}
            />
          </Tooltip>
          <small className="mt-1 text-grey-6 font1">
            These banner will be see no PLP page as promotional banner
          </small>
        </DialogTitle>
        <hr className="hr-grey-6 my-0" />
        <DialogContent className="py-3 px-4 schedule-product">
          <div className="d-flex mb-1">
            <p className="text-lightBlue me-2">Collection Title</p>
          </div>
          <FormControl className="w-100 px-0">
            <OutlinedInput
              placeholder="Mirosa Collection_copy"
              size="small"
              name="title"
            />
          </FormControl>
          <hr className="hr-grey-6 my-0" />
          <div className="d-flex mb-1 mt-3">
            <p className="text-lightBlue me-2">What to Include in this Duplicate</p>
          </div>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  name="filter"
                  inputProps={{ "aria-label": "controlled" }}
                  size="small"
                  style={{
                    color: "#5C6D8E",
                    marginRight: 0,
                  }}
                />
              }
              label="Include in Filters"
              sx={{
                "& .MuiTypography-root": {
                  fontSize: 13,
                  color: "#99a6c0",
                },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="filter"
                  inputProps={{ "aria-label": "controlled" }}
                  size="small"
                  style={{
                    color: "#5C6D8E",
                    marginRight: 0,
                  }}
                />
              }
              label="Include in Filters"
              sx={{
                "& .MuiTypography-root": {
                  fontSize: 13,
                  color: "#99a6c0",
                },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="filter"
                  inputProps={{ "aria-label": "controlled" }}
                  size="small"
                  style={{
                    color: "#5C6D8E",
                    marginRight: 0,
                  }}
                />
              }
              label="Include in Filters"
              sx={{
                "& .MuiTypography-root": {
                  fontSize: 13,
                  color: "#99a6c0",
                },
              }}
            />
          </FormGroup>
        </DialogContent>
        <hr className="hr-grey-6 my-0" />
        <DialogActions className="d-flex flex-column justify-content-start px-4 py-3">
          <div className="d-flex justify-content-between w-100">
            <button
              className="button-grey py-2 px-5"
              onClick={handelDuplicateCollectionClose}
            >
              <p className="text-lightBlue">Cancel</p>
            </button>
            <button
              className="button-gradient py-2 px-5"
              onClick={handelDuplicateCollectionClose}
            >
              <p>Schedule</p>
            </button>
          </div>
        </DialogActions>
      </Dialog>

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
    </React.Fragment>
  );
};

export default CollectionsTable;
