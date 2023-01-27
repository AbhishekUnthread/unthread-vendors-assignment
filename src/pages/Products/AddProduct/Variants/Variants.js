import React, { useMemo } from "react";
import PropTypes from "prop-types";
import "./Variants.scss";
// ! MATERIAL IMPORTS
import {
  OutlinedInput,
  ToggleButton,
  ToggleButtonGroup,
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
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
// ! IMAGES IMPORTS
import convert from "../../../../assets/icons/convert.svg";
import variantUpload from "../../../../assets/images/products/variantUpload.svg";
import usaFlagRectangle from "../../../../assets/images/products/usaFlagRectangle.svg";
import ukFlagRectangle from "../../../../assets/images/products/ukFlagRectangle.svg";
import indiaFlagRectangle from "../../../../assets/images/products/indiaFlagRectangle.svg";
import { useDropzone } from "react-dropzone";

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
              "aria-label": "select all desserts",
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

// ? FILE UPLOAD STARTS HERE
const baseStyle = {
  flex: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "0",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#38395c",
  borderStyle: "dashed",
  //   backgroundColor: "",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  cursor: "pointer",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};
// ? FILE UPLOAD ENDS HERE

const Variants = () => {
  // ? TOGGLE BUTTONS STARTS HERE
  const [country, setCountry] = React.useState("india");

  const handleCountry = (event, newCountry) => {
    if (newCountry !== "add" && newCountry !== "markets") {
      setCountry(newCountry);
    }
  };
  // ? TOGGLE BUTTONS ENDS HERE

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
      const newSelected = rows.map((n) => n.pId);
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

  // ? FILE UPLOAD STARTS HERE
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        "image/*": [".jpeg", ".jpg", ".png"],
      },
    });
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );
  // ? FILE UPLOAD ENDS HERE

  // ? SIZE SELECT STARTS HERE
  const [storeAddress, setStoreAddress] = React.useState("");
  // const [metal, setMetal] = React.useState("");
  // const [diamond, setDiamond] = React.useState("");

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

  return (
    <div className="bg-black-15 border-grey-5 rounded-8 p-3 row">
      <div className="d-flex col-12 px-0 justify-content-between">
        <div className="d-flex align-items-center">
          <h6 className="text-lightBlue me-auto text-lightBlue fw-500">
            Variants
          </h6>
        </div>
        <p className="text-blue-2">Add Variant</p>
      </div>
      <div className="d-flex col-12 px-0 mt-2">
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

      <div className="col-12">
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
        {/* </div> */}
      </div>
      <div className="col-12 px-0 my-4">
        <div className="row align-items-center justify-content-between">
          <div className="d-flex align-items-center col-8 pe-0">
            <p className="text-lightBlue" style={{ width: "135px" }}>
              Store Address:
            </p>
            {/* <FormControl sx={{ width: 400 }} className="px-0 ms-3">
            <OutlinedInput
              placeholder="Enter store address"
              size="small"
              defaultValue="JWL Bhaugh, Delhi 110001"
            />
          </FormControl> */}
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
          <div className="col-4">
            <button className="button-grey py-2 px-3 w-100">
              <img src={convert} alt="convert" className="me-2" width={15} />
              <p>Auto Convert Price</p>
            </button>
          </div>
        </div>
      </div>
      <div className="col-12 px-0">
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
                          <div
                            {...getRootProps({ style })}
                            className="my-3 me-2"
                          >
                            <input
                              id="primary"
                              {...getInputProps()}
                              // onChange={(event) => {
                              //   uploadFileToCloud(event, "primary");
                              //   event.target.value = null;
                              // }}
                            />
                            <img
                              src={variantUpload}
                              className=""
                              alt="variantUpload"
                              width={50}
                              height={50}
                            />
                          </div>
                          <small className="d-flex align-items-center text-lightBlue">
                            {row.variantName}
                          </small>
                        </div>
                      </TableCell>
                      <TableCell>
                        {/* <p className="d-flex align-items-center text-lightBlue">
                          {row.price}
                        </p> */}
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
                        {/* <p className="d-flex text-lightBlue">{row.quantity}</p> */}
                        <FormControl sx={{ width: 80 }} className="px-0">
                          <OutlinedInput
                            placeholder="Enter Qty"
                            size="small"
                            defaultValue={row.quantity}
                          />
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        {/* <p className="d-flex text-lightBlue">{row.sku}</p> */}
                        <FormControl sx={{ width: 150 }} className="px-0">
                          <OutlinedInput
                            placeholder="Enter SKU"
                            size="small"
                            defaultValue={row.sku}
                          />
                        </FormControl>
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
    </div>
  );
};

export default Variants;
