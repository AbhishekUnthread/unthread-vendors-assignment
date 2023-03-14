import React from "react";
import { Link } from "react-router-dom";
// ! COMPONENT IMPORTS
import {
  EnhancedTableHead,
  stableSort,
  getComparator,
} from "../../components/TableDependencies/TableDependencies";
import TableEditStatusButton from "../../components/TableEditStatusButton/TableEditStatusButton";
import TableMassActionButton from "../../components/TableMassActionButton/TableMassActionButton";
// ! IMAGES IMPORTS
import cancel from "../../assets/icons/cancel.svg";
// ! MATERIAL IMPORTS
import {
  Checkbox,
  FormControl,
  InputAdornment,
  OutlinedInput,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Tooltip,
  MenuItem,
  Select,
  Dialog,
  Slide,
  DialogActions,
  DialogContent,
  Popover,
  DialogTitle,
} from "@mui/material";
// ! MATERIAL ICONS IMPORTS
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InventoryIcon from "@mui/icons-material/Inventory";

// ? DIALOG TRANSITION STARTS HERE
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// ? DIALOG TRANSITION ENDS HERE

// ? TABLE STARTS HERE
function createData(vId, variant, variantCode) {
  return { vId, variant, variantCode };
}

const rows = [
  createData(1, "12 • 14KT • Rose • Gold • IJ-SI", "Jewel Code: 123456789"),
  createData(2, "12 • 14KT • Rose • Gold • IJ-SI", "Jewel Code: 123456789"),
  createData(3, "12 • 14KT • Rose • Gold • IJ-SI", "Jewel Code: 123456789"),
  createData(4, "12 • 14KT • Rose • Gold • IJ-SI", "Jewel Code: 123456789"),
  createData(5, "12 • 14KT • Rose • Gold • IJ-SI", "Jewel Code: 123456789"),
];

const headCells = [
  {
    id: "variant",
    numeric: false,
    disablePadding: true,
    label: "Variant",
  },
  {
    id: "addQuantity",
    numeric: false,
    disablePadding: true,
    label: "Add Quantity",
  },
];

// ? TABLE ENDS HERE

const ProductDrawerTable = () => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("groupName");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

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
      const newSelected = rows.map((n) => n.vId);
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

  // * EDIT VARIANTS POPOVERS STARTS
  const [anchorEditVariantsEl, setAnchorEditVariantsEl] = React.useState(null);
  const handleEditVariants = (event) => {
    setAnchorEditVariantsEl(event.currentTarget);
  };
  const handleEditVariantsClose = () => {
    setAnchorEditVariantsEl(null);
  };
  const openEditVariants = Boolean(anchorEditVariantsEl);
  const idEditVariants = openEditVariants ? "simple-popover" : undefined;
  // * EDIT VARIANTS POPOVERS ENDS

  // ? EDIT STATUS DIALOG STARTS HERE
  const [openEditStatusDialog, setOpenEditStatusDialog] = React.useState(false);

  const handleEditStatusDialog = () => {
    setAnchorEditVariantsEl(null);
    setOpenEditStatusDialog(true);
  };

  const handleEditStatusDialogClose = () => {
    setOpenEditStatusDialog(false);
  };
  // ? EDIT STATUS DIALOG ENDS HERE

  // ? EDIT STATUS SELECT STARTS HERE
  const [editStatusSelect, setEditStatusSelect] = React.useState("fixed");

  const handleEditStatusSelect = (event) => {
    setEditStatusSelect(event.target.value);
  };

  // ? EDIT STATUS SELECT ENDS HERE

  return (
    <React.Fragment>
      {selected.length > 0 && (
        <div className="d-flex align-items-center px-2 mb-3">
          <button className="button-grey py-2 px-3">
            <small className="text-lightBlue">
              {selected.length} variants are selected&nbsp;
              <span
                className="text-blue-2 c-pointer"
                onClick={() => setSelected([])}
              >
                (Clear Selection)
              </span>
            </small>
          </button>
          <button
            className="button-lightBlue-outline py-1 px-3 ms-2 me-2"
            onClick={handleEditVariants}
          >
            <EditOutlinedIcon
              sx={{
                // color: "#c8d8ff",
                fontSize: 15,
                cursor: "pointer",
              }}
            />
            <small className="ms-2">Edit Variants</small>
          </button>
          <button
            className="button-lightBlue-outline py-1 px-3"
            // onClick={handleBulkEditor}
          >
            <EditOutlinedIcon
              sx={{
                // color: "#c8d8ff",
                fontSize: 15,
                cursor: "pointer",
              }}
            />
            <small className="ms-2">Open Bulk Editor</small>
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
            id={idEditVariants}
            open={openEditVariants}
            anchorEl={anchorEditVariantsEl}
            onClose={handleEditVariantsClose}
          >
            <div className="py-2 px-1">
              <small
                className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back"
                onClick={handleEditStatusDialog}
              >
                Edit Metal Weight
              </small>
              <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                Edit Diamond Weight
              </small>
              <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                Edit Making Charges
              </small>
              <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                Edit Quantity
              </small>
              <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                Edit Discount
              </small>
              <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                Edit SKU
              </small>
            </div>
          </Popover>

          <Dialog
            open={openEditStatusDialog}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleEditStatusDialogClose}
            aria-describedby="alert-dialog-slide-description"
            maxWidth="sm"
            fullWidth={true}
          >
            <DialogTitle>
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column ">
                  <h5 className="text-lightBlue fw-500">Edit Metal Weight</h5>

                  <small className="text-grey-6 mt-1 d-block">
                    ⓘ Some Dummy Content to explain
                  </small>
                </div>
                <img
                  src={cancel}
                  alt="cancel"
                  width={30}
                  onClick={handleEditStatusDialogClose}
                  className="c-pointer"
                />
              </div>
            </DialogTitle>
            <hr className="hr-grey-6 my-0" />
            <DialogContent className="py-3 px-4">
              <p className="text-lightBlue mb-2">
                Enter Weight to apply in all filters
              </p>
              <div className="row variants-inputs ">
                <div className="col-6 pe-0">
                  <FormControl>
                    <OutlinedInput
                      placeholder="Enter Weight"
                      size="small"
                      endAdornment={
                        <InputAdornment position="end">gm</InputAdornment>
                      }
                    />
                  </FormControl>
                </div>
                <div className="col-3 pe-0">
                  <FormControl className="w-100" size="small">
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      value={editStatusSelect}
                      placeholder="Fixed"
                      onChange={handleEditStatusSelect}
                    >
                      <MenuItem value="fixed">Fixed</MenuItem>
                      <MenuItem value="increase">Increase</MenuItem>
                      <MenuItem value="decrease">Decrease</MenuItem>
                      <MenuItem value="incrementGradually">
                        Increment Gradually
                      </MenuItem>
                      <MenuItem value="decrementGradually">
                        Decrement Gradually
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="col-3">
                  <button className="button-gradient w-100 py-2">
                    <p>Apply to all</p>
                  </button>
                </div>
              </div>
              <div className="row px-2 my-3">
                <hr className="hr-grey-6 my-0" />
              </div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center">
                  <small className="text-lightBlue">
                    12 - Gold -18KT - Rose - IJSJ
                  </small>
                </div>
                <div className="d-flex">
                  <FormControl className="variants-inputs" sx={{ width: 180 }}>
                    <OutlinedInput
                      placeholder="Enter Weight"
                      size="small"
                      endAdornment={
                        <InputAdornment position="end">gm</InputAdornment>
                      }
                    />
                  </FormControl>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center">
                  <small className="text-lightBlue">
                    12 - Gold -18KT - Rose - IJSJ
                  </small>
                </div>
                <div className="d-flex">
                  <FormControl className="variants-inputs" sx={{ width: 180 }}>
                    <OutlinedInput
                      placeholder="Enter Weight"
                      size="small"
                      endAdornment={
                        <InputAdornment position="end">gm</InputAdornment>
                      }
                    />
                  </FormControl>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center">
                  <small className="text-lightBlue">
                    12 - Gold -18KT - Rose - IJSJ
                  </small>
                </div>
                <div className="d-flex">
                  <FormControl className="variants-inputs" sx={{ width: 180 }}>
                    <OutlinedInput
                      placeholder="Enter Weight"
                      size="small"
                      endAdornment={
                        <InputAdornment position="end">gm</InputAdornment>
                      }
                    />
                  </FormControl>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center">
                  <small className="text-lightBlue">
                    12 - Gold -18KT - Rose - IJSJ
                  </small>
                </div>
                <div className="d-flex">
                  <FormControl className="variants-inputs" sx={{ width: 180 }}>
                    <OutlinedInput
                      placeholder="Enter Weight"
                      size="small"
                      endAdornment={
                        <InputAdornment position="end">gm</InputAdornment>
                      }
                    />
                  </FormControl>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center">
                  <small className="text-lightBlue">
                    12 - Gold -18KT - Rose - IJSJ
                  </small>
                </div>
                <div className="d-flex">
                  <FormControl className="variants-inputs" sx={{ width: 180 }}>
                    <OutlinedInput
                      placeholder="Enter Weight"
                      size="small"
                      endAdornment={
                        <InputAdornment position="end">gm</InputAdornment>
                      }
                    />
                  </FormControl>
                </div>
              </div>
            </DialogContent>
            <hr className="hr-grey-6 my-0" />

            <DialogActions className="d-flex justify-content-between px-4 py-3">
              <button
                className="button-grey py-2 px-5"
                onClick={handleEditStatusDialogClose}
              >
                <p className="text-lightBlue">Cancel</p>
              </button>
              <button
                className="button-gradient py-2 px-5"
                onClick={handleEditStatusDialogClose}
              >
                <p>Save</p>
              </button>
            </DialogActions>
          </Dialog>
          {/* <TableEditStatusButton />
          <TableMassActionButton /> */}
        </div>
      )}
      <TableContainer>
        <Table
          //   sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size="medium"
        >
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
            headCells={headCells}
          />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.vId);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.vId}
                    selected={isItemSelected}
                    className="table-rows"
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                        onClick={(event) => handleClick(event, row.vId)}
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
                      //   style={{ width: 120, padding: 0 }}
                    >
                      <div className="text-decoration-none d-flex flex-column py-3">
                        <p className="text-lightBlue">{row.variant}</p>
                        <p className="text-grey-6 mt-1">{row.variantCode}</p>
                      </div>
                    </TableCell>
                    <TableCell style={{ width: 140, padding: 0 }}>
                      <div className="d-flex align-items-center py-2">
                        <FormControl
                          sx={{ width: 100 }}
                          className="col-7 px-0 productInfo-inputs"
                        >
                          <OutlinedInput
                            placeholder="Enter Qty"
                            size="small"
                            defaultValue={100}
                            endAdornment={
                              <InputAdornment
                                position="end"
                                className="c-pointer"
                              >
                                +
                              </InputAdornment>
                            }
                            startAdornment={
                              <InputAdornment
                                position="start"
                                className="c-pointer"
                              >
                                -
                              </InputAdornment>
                            }
                          />
                        </FormControl>
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
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        className="table-pagination"
      />
    </React.Fragment>
  );
};

export default ProductDrawerTable;
