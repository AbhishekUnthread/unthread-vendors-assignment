import React from "react";
import PropTypes from "prop-types";
import "./Variants.scss";
// ! MATERIAL IMPORTS
import {
  OutlinedInput,
  Box,
  Checkbox,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  InputAdornment,
  MenuItem,
  Select,
  Popover,
  FormGroup,
  FormControlLabel,
  Tooltip,
  Radio,
  Dialog,
  DialogTitle,
  DialogContent,
  Slide,
  DialogActions,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
// ! IMAGES IMPORTS
import indiaFlagRectangle from "../../../../assets/images/products/indiaFlagRectangle.svg";
import info from "../../../../assets/icons/info.svg";
import editWhite from "../../../../assets/icons/editWhite.svg";
import AppCountrySelect from "../../../../components/AppCountrySelect/AppCountrySelect";
import DeleteIcon from "@mui/icons-material/Delete";
import cancel from "../../../../assets/icons/cancel.svg";
import ProductVariantsBulkEditor from "../../../../components/ProductVariantsBulkEditor/ProductVariantsBulkEditor";

// ? DIALOG TRANSITION STARTS HERE
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// ? DIALOG TRANSITION ENDS HERE

// ? TABLE STARTS HERE
function createData(vId, variantName, price, quantity, sku) {
  return { vId, variantName, price, quantity, sku };
}

const rows = [
  createData(1, "12-Gold-18KT-Rose-IJSI", "1,15,000", "2", "ABCD1234"),
  createData(2, "12-Gold-18KT-Rose-IJSI", "1,15,000", "2", "ABCD1234"),
  createData(3, "12-Gold-18KT-Rose-IJSI", "1,15,000", "2", "ABCD1234"),
];

const headCells = [
  {
    id: "variantName",
    numeric: false,
    disablePadding: true,
    label: "3 Variants",
  },
  {
    id: "price",
    numeric: false,
    disablePadding: false,
    label: "Price",
  },
  {
    id: "quantity",
    numeric: false,
    disablePadding: false,
    label: "Quantity",
  },
  {
    id: "sku",
    numeric: false,
    disablePadding: false,
    label: "SKU",
  },
  {
    id: "default",
    numeric: false,
    disablePadding: false,
    label: "Default",
  },
  {
    id: "actions",
    numeric: false,
    disablePadding: false,
    label: "",
  },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all rows",
            }}
            size="small"
            style={{
              color: "#5C6D8E",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {(headCell.label === "Price" ||
                headCell.label === "Quantity" ||
                headCell.label === "SKU") && (
                <img
                  src={indiaFlagRectangle}
                  alt="indiaFlagRectangle"
                  width={25}
                  className="me-2"
                />
              )}
              <p className="text-lightBlue">{headCell.label}</p>
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};
// ? TABLE ENDS HERE

const Variants = () => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("variantName");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

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

  // ? SIZE SELECT STARTS HERE
  const [storeAddress, setStoreAddress] = React.useState("");
  const handleStoreAddress = (event) => {
    setStoreAddress(event.target.value);
  };
  // ? SIZE SELECT ENDS HERE

  // * METAL FILTER POPOVERS STARTS
  const [anchorMetalFilterEl, setAnchorMetalFilterEl] = React.useState(null);
  const handleMetalFilter = (event) => {
    setAnchorMetalFilterEl(event.currentTarget);
  };
  const handleMetalFilterClose = () => {
    setAnchorMetalFilterEl(null);
  };
  const openMetalFilter = Boolean(anchorMetalFilterEl);
  const idMetalFilter = openMetalFilter ? "simple-popover" : undefined;
  // * METAL FILTER POPOVERS ENDS

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
  // * METAL FILTER POPOVERS ENDS

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

  // ? EDIT STATUS SELECT STARTS HERE
  const [openBulkEditor, setOpenBulkEditor] = React.useState(false);

  const handleBulkEditor = (event) => {
    setOpenBulkEditor(!openBulkEditor);
  };

  // ? EDIT STATUS SELECT ENDS HERE

  return (
    <div className="bg-black-15 border-grey-5 rounded-8 p-3 row variants">
      <div className="d-flex col-12 px-0 justify-content-between">
        <div className="d-flex align-items-center">
          <h6 className="text-lightBlue me-auto text-lightBlue fw-500">
            Variants
          </h6>
        </div>
        {/* <p className="text-blue-2">Add Variant</p> */}
      </div>

      <div className="col-12 px-0 mb-4">
        <div className="row align-items-center justify-content-between">
          <div className="col-md-4 pe-md-0 mt-4">
            <div className="d-flex mb-1">
              <p className="text-lightBlue">Market</p>
              <img src={info} alt="info" className="ms-2" width={15} />
            </div>
            <AppCountrySelect className="w-100" />
            {/* <FormControl
              sx={{ m: 0, minWidth: 120, width: "100%" }}
              size="small"
            >
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={storeAddress}
                onChange={handleStoreAddress}
                size="small"
              >
                <MenuItem value="" sx={{ fontSize: 13, color: "#5c6d8e" }}>
                  None
                </MenuItem>
                <MenuItem value={10} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                  <div className="d-flex">
                    <img
                      src={indiaFlagRectangle}
                      alt="usaFlagRectangle"
                      className="me-2"
                      width={18}
                    />
                    <p className="text-grey-6">India • Default</p>
                  </div>
                </MenuItem>
                <MenuItem value={20} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                  <div className="d-flex">
                    <img
                      src={usaFlagRectangle}
                      alt="usaFlagRectangle"
                      className="me-2"
                      width={18}
                    />
                    <p className="text-grey-6">USA</p>
                  </div>
                </MenuItem>
                <MenuItem value={30} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                  <div className="d-flex">
                    <img
                      src={ukFlagRectangle}
                      alt="usaFlagRectangle"
                      className="me-2"
                      width={18}
                    />
                    <p className="text-grey-6">USA</p>
                  </div>
                </MenuItem>
              </Select>
            </FormControl> */}
          </div>
          <div className="col-md-8 mt-4">
            <div className="d-flex mb-1">
              <p className="text-lightBlue">Store Address</p>
              <img src={info} alt="info" className="ms-2" width={15} />
            </div>
            <FormControl
              sx={{ m: 0, minWidth: 120, width: "100%" }}
              size="small"
            >
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={storeAddress}
                onChange={handleStoreAddress}
                size="small"
              >
                <MenuItem value="" sx={{ fontSize: 13, color: "#5c6d8e" }}>
                  None
                </MenuItem>
                <MenuItem value={10} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                  JWL Bhaugh, Delhi 110001
                </MenuItem>
                <MenuItem value={20} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                  JWL Bhaugh, Delhi 110001
                </MenuItem>
                <MenuItem value={30} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                  JWL Bhaugh, Delhi 110001
                </MenuItem>
                <MenuItem value={40} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                  JWL Bhaugh, Delhi 110001
                </MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
      <div className="d-flex col-12 px-0 justify-content-between align-items-center">
        <div className="d-flex">
          <p className="text-lightBlue py-1 me-2">Filter:</p>
          <p
            className="text-blue-2 px-2 py-1 c-pointer hover-back-transparent rounded-3"
            aria-describedby={idMetalFilter}
            variant="contained"
            onClick={handleMetalFilter}
          >
            Size
          </p>
          <p
            className="text-blue-2 px-2 py-1 c-pointer hover-back-transparent rounded-3"
            aria-describedby={idMetalFilter}
            variant="contained"
            onClick={handleMetalFilter}
          >
            Metal
          </p>
          <p
            className="text-blue-2 px-2 py-1 c-pointer hover-back-transparent rounded-3"
            aria-describedby={idMetalFilter}
            variant="contained"
            onClick={handleMetalFilter}
          >
            Metal Purity
          </p>
          <p
            className="text-blue-2 px-2 py-1 c-pointer hover-back-transparent rounded-3"
            aria-describedby={idMetalFilter}
            variant="contained"
            onClick={handleMetalFilter}
          >
            Diamond
          </p>

          <Popover
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            id={idMetalFilter}
            open={openMetalFilter}
            anchorEl={anchorMetalFilterEl}
            onClose={handleMetalFilterClose}
          >
            <FormGroup className="tags-checkbox py-2">
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    style={{
                      color: "#5C6D8E",
                    }}
                  />
                }
                label="Content 1"
                className="hover-back rounded-3 mx-0 pe-2"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    style={{
                      color: "#5C6D8E",
                    }}
                  />
                }
                label="Content 2"
                className="hover-back rounded-3 mx-0 pe-2"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    style={{
                      color: "#5C6D8E",
                    }}
                  />
                }
                label="Content 3"
                className="hover-back rounded-3 mx-0 pe-2"
              />
            </FormGroup>
          </Popover>
        </div>
        {!openBulkEditor ? (
          <div className="d-flex">
            <button
              className="button-transparent py-1 px-3 me-2 border-grey-5"
              onClick={handleEditVariants}
            >
              <img
                src={editWhite}
                alt="editWhite"
                className="me-1"
                width={20}
              />
              <p className="text-grey-6">Edit Variants</p>
            </button>
            <button
              className="button-transparent py-1 px-3 border-grey-5"
              onClick={handleBulkEditor}
            >
              <img
                src={editWhite}
                alt="editContainedWhite"
                className="me-1"
                width={20}
              />
              <p className="text-grey-6">Open Bulk Editor</p>
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
                    <FormControl
                      className="variants-inputs"
                      sx={{ width: 180 }}
                    >
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
                    <FormControl
                      className="variants-inputs"
                      sx={{ width: 180 }}
                    >
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
                    <FormControl
                      className="variants-inputs"
                      sx={{ width: 180 }}
                    >
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
                    <FormControl
                      className="variants-inputs"
                      sx={{ width: 180 }}
                    >
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
                    <FormControl
                      className="variants-inputs"
                      sx={{ width: 180 }}
                    >
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
          </div>
        ) : (
          <div className="d-flex">
            <button
              className="button-red-outline py-1 px-3 me-2"
              onClick={handleBulkEditor}
            >
              <p className="">Discard</p>
            </button>
            {/* <button
              className="button-transparent py-1 px-3 border-grey-5"
              onClick={handleBulkEditor}
            >
              <p className="text-grey-6">Save</p>
            </button> */}
            <button
              className="button-lightBlue-outline py-1 px-3 "
              onClick={handleBulkEditor}
            >
              {/* <img
                src={editWhite}
                alt="editContainedWhite"
                className="me-1"
                width={20}
              /> */}
              <p className="">Save</p>
            </button>
          </div>
        )}
      </div>
      {openBulkEditor && (
        <div className="col-12 px-0 mt-3">
          <ProductVariantsBulkEditor />
        </div>
      )}
      {/* <div className="col-12">
        <ToggleButtonGroup
          value={country}
          onChange={handleCountry}
          aria-label="text formatting"
          className="row d-flex mt-4 toggle"
          size="small"
          exclusive
        >
          <ToggleButton value="markets" aria-label="markets" className="col-2">
            <p className="text-grey-6">Markets</p>
          </ToggleButton>
          <ToggleButton value="india" aria-label="india" className="col-3">
            <div className="d-flex">
              <img
                src={indiaFlagRectangle}
                alt="usaFlagRectangle"
                className="me-2"
              />
              <p className="text-grey-6">India • Default</p>
            </div>
          </ToggleButton>
          <ToggleButton value="uk" aria-label="uk" className="col-2">
            <div className="d-flex">
              <img
                src={usaFlagRectangle}
                alt="usaFlagRectangle"
                className="me-2"
              />
              <p className="text-grey-6">USA</p>
            </div>
          </ToggleButton>
          <ToggleButton value="usa" aria-label="usa" className="col-2">
            <div className="d-flex">
              <img
                src={ukFlagRectangle}
                alt="ukFlagRectangle"
                className="me-2"
              />
              <p className="text-grey-6">UK</p>
            </div>
          </ToggleButton>
          <ToggleButton
            value="add"
            aria-label="add"
            className="col-3 button-gradient py-2 px-0 border-0"
          >
            <p>+ Add Market</p>
          </ToggleButton>
        </ToggleButtonGroup>
      </div> */}
      {!openBulkEditor && (
        <div className="col-12 px-0 mt-3">
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
                rowCount={rows.length}
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
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
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
                        >
                          <div className="d-flex">
                            <small className="d-flex align-items-center text-lightBlue">
                              {row.variantName}
                            </small>
                          </div>
                        </TableCell>
                        <TableCell>
                          <FormControl sx={{ width: 150 }} className="px-0">
                            <OutlinedInput
                              placeholder="Enter Price"
                              size="small"
                              defaultValue={row.price}
                              startAdornment={
                                <InputAdornment position="start">
                                  <p className="text-lightBlue">₹</p>
                                </InputAdornment>
                              }
                            />
                          </FormControl>
                        </TableCell>
                        <TableCell>
                          <FormControl sx={{ width: 80 }} className="px-0">
                            <OutlinedInput
                              placeholder="Enter Qty"
                              size="small"
                              defaultValue={row.quantity}
                            />
                          </FormControl>
                        </TableCell>
                        <TableCell>
                          <FormControl sx={{ width: 150 }} className="px-0">
                            <OutlinedInput
                              placeholder="Enter SKU"
                              size="small"
                              defaultValue={row.sku}
                            />
                          </FormControl>
                        </TableCell>
                        <TableCell>
                          <div className="d-flex align-items-center">
                            <Radio
                              // checked={selectedValue === 'a'}
                              // onChange={handleChange}
                              // value="a"
                              size="small"
                              name="radio-buttons"
                              inputProps={{ "aria-label": "A" }}
                            />
                          </div>
                        </TableCell>
                        <TableCell style={{ width: 60 }}>
                          <div className="d-flex align-items-center">
                            <Tooltip title="Delete" placement="top">
                              <div className="table-edit-icon rounded-4 p-2 border-grey-5">
                                <DeleteIcon
                                  sx={{
                                    color: "#5c6d8e",
                                    fontSize: 20,
                                    cursor: "pointer",
                                  }}
                                />
                              </div>
                            </Tooltip>
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
        </div>
      )}
    </div>
  );
};

export default Variants;
