import React from "react";
import PropTypes from "prop-types";
import "./AllProducts.scss";
import { alpha, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import indiaFlag from "../../../assets/images/products/indiaFlag.svg";
import teamMember1 from "../../../assets/images/products/teamMember1.svg";
import teamMember2 from "../../../assets/images/products/teamMember2.svg";
import teamMember3 from "../../../assets/images/products/teamMember3.svg";
import columns from "../../../assets/icons/columns.svg";
import verticalDots from "../../../assets/icons/verticalDots.svg";
import allFlag from "../../../assets/images/products/allFlag.svg";
import usaFlag from "../../../assets/images/products/usaFlag.svg";
import ukFlag from "../../../assets/images/products/ukFlag.svg";
import ringSmall from "../../../assets/images/ringSmall.svg";
import arrowDown from "../../../assets/icons/arrowDown.svg";
import arrowDownBlack from "../../../assets/icons/arrowDownBlack.svg";
import sort from "../../../assets/icons/sort.svg";
import filter from "../../../assets/icons/filter.svg";
import editButton from "../../../assets/icons/editButton.svg";
import duplicateButton from "../../../assets/icons/duplicateButton.svg";
import deleteRed from "../../../assets/icons/delete.svg";
import Popover from "@mui/material/Popover";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  // backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    // backgroundColor: alpha(theme.palette.common.white, 0.25),
    backgroundColor: "#1c1b33",
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
  backgroundColor: "#1c1b33",
  height: "30.6px",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    borderRadius: "5px",
    // [theme.breakpoints.up("sm")]: {
    //   width: "12ch",
    //   "&:focus": {
    //     width: "20ch",
    //   },
    // },
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function createData(pId, productName, category, qty, price, activity, status) {
  return { pId, productName, category, qty, price, activity, status };
}

const rows = [
  createData(
    1,
    "The Fringe Diamond Ring",
    "Gold Products",
    "in 14 Variants",
    "₹ 20,600 - ₹ 50,000",
    "SS, SB",
    "Active"
  ),
  createData(
    2,
    "The Fringe Diamond Ring",
    "Gold Products",
    "in 14 Variants",
    "₹ 20,600 - ₹ 50,000",
    "SS, SB",
    "Active"
  ),
  createData(
    3,
    "The Fringe Diamond Ring",
    "Gold Products",
    "in 14 Variants",
    "₹ 20,600 - ₹ 50,000",
    "SS, SB",
    "Active"
  ),
];

const headCells = [
  {
    id: "productName",
    numeric: false,
    disablePadding: true,
    label: "Product Name",
  },
  {
    id: "category",
    numeric: false,
    disablePadding: false,
    label: "Category",
  },
  {
    id: "qty",
    numeric: false,
    disablePadding: false,
    label: "Qty",
  },
  {
    id: "price",
    numeric: false,
    disablePadding: false,
    label: "Price",
  },
  {
    id: "activity",
    numeric: false,
    disablePadding: false,
    label: "Activity",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
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

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
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
              {headCell.label}
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

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Nutrition
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const AllProducts = () => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // ? POPOVERS STARTS HERE
  const [anchorFlagEl, setAnchorFlagEl] = React.useState(null);

  const handleFlagClick = (event) => {
    setAnchorFlagEl(event.currentTarget);
  };

  const handleFlagClose = () => {
    setAnchorFlagEl(null);
  };

  const openFlag = Boolean(anchorFlagEl);
  const idFlag = openFlag ? "simple-popover" : undefined;

  // * ACTION POPOVERS STARTS

  const [anchorActionEl, setAnchorActionEl] = React.useState(null);

  const handleActionClick = (event) => {
    setAnchorActionEl(event.currentTarget);
  };

  const handleActionClose = () => {
    setAnchorActionEl(null);
  };

  const openActions = Boolean(anchorActionEl);
  const idActions = openActions ? "simple-popover" : undefined;
  // * ACTION POPOVERS ENDS

  // ? POPOVERS ENDS HERE

  return (
    <div className="container-fluid">
      <div className="page">
        <h4 className="">All Products</h4>
        <div className="d-flex align-items-center">
          <p className="me-4 c-pointer">Export</p>
          <p className="me-4 c-pointer">Import</p>
          <button className="button-gradient py-2 px-4">
            <p>+ Add Product</p>
          </button>
        </div>
      </div>
      <div className="row">
        <Paper
          sx={{ width: "100%", mb: 2, mt: 3, p: 0 }}
          className="border-grey-5"
        >
          <Box
            sx={{ width: "100%" }}
            className="d-flex justify-content-between tabs-header-box"
          >
            {/* variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile */}
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="scrollable force tabs example"
              className="tabs"
            >
              <Tab label="All" className="tabs-head" />
              <Tab label="Live" className="tabs-head" />
              <Tab label="Draft" className="tabs-head" />
              <Tab label="Archived" className="tabs-head" />
            </Tabs>
            <div
              className="tabs-country c-pointer"
              aria-describedby={idFlag}
              variant="contained"
              onClick={handleFlagClick}
            >
              <img src={indiaFlag} alt="indiaFlag" height={15} />
              <p className="mx-2">India</p>
              <img src={arrowDown} alt="arrowDown" />
            </div>
            <Popover
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              id={idFlag}
              open={openFlag}
              anchorEl={anchorFlagEl}
              onClose={handleFlagClose}
            >
              <div className="d-flex align-items-center mb-2 c-pointer">
                <img src={allFlag} alt="allFlag" height={20} />
                <p className="ms-2">All</p>
              </div>
              <div className="d-flex align-items-center mb-2 c-pointer">
                <img src={ukFlag} alt="usaFlag" height={15} />
                <p className="ms-2">UK</p>
              </div>
              <div className="d-flex align-items-center mb-2 c-pointer">
                <img src={usaFlag} alt="usaFlag" height={15} />
                <p className="ms-2">USA</p>
              </div>
            </Popover>
          </Box>
          <div className="d-flex align-items-center mt-3 mb-3 pe-2 justify-content-between">
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <div className="d-flex">
              <div className="d-flex product-button__box ms-2">
                <button className="button-grey py-1 px-3">
                  <p>Category</p>
                  <img src={arrowDown} alt="arrowDown" className="ms-2" />
                </button>
                <button className="button-grey py-1 px-3">
                  <p>Vendor</p>
                  <img src={arrowDown} alt="arrowDown" className="ms-2" />
                </button>
                <button className="button-grey py-1 px-3">
                  <p>Tagged with</p>
                  <img src={arrowDown} alt="arrowDown" className="ms-2" />
                </button>
                <button className="button-grey py-1 px-3">
                  <p>More Filters</p>
                  <img src={filter} alt="filter" className="ms-2" />
                </button>
              </div>
              <button className="button-grey py-1 px-3 ms-2">
                <img src={sort} alt="sort" className="me-2" />
                <p>Sort</p>
              </button>
              <button className="button-grey py-1 px-3 ms-2">
                <p>Columns</p>
                <img src={columns} alt="columns" className="ms-2" />
              </button>
            </div>
          </div>
          {/* <Box> */}
          {selected.length > 0 && (
            <div className="d-flex justify-content-between align-items-center px-2 mb-3">
              <div className="d-flex">
                <button className="button-grey py-1 px-3">
                  <p>
                    {selected.length} products are selected&nbsp;
                    <span
                      className="text-primary c-pointer"
                      onClick={() => setSelected([])}
                    >
                      (Clear Selection)
                    </span>
                  </p>
                </button>

                <button className="button-grey py-1 px-3 ms-2">
                  <p>Edit Product</p>
                </button>
                <button className="button-grey py-1 px-3 ms-2">
                  <p>Edit Status</p>
                  <img src={arrowDown} alt="arrowDown" className="ms-2" />
                </button>
                <button className="button-grey py-1 px-3 ms-2">
                  <p>Mass Action</p>
                  <img src={arrowDown} alt="arrowDown" className="ms-2" />
                </button>
              </div>
              <p
                className=" d-flex text-primary c-pointer"
                onClick={() => setSelected([])}
              >
                Clear Selection
              </p>
            </div>
          )}
          <TabPanel value={value} index={0}>
            {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
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
                      const isItemSelected = isSelected(row.pId);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.pId}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                              onClick={(event) => handleClick(event, row.pId)}
                            />
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            <div className="d-flex align-items-center">
                              <img
                                src={ringSmall}
                                alt="ringSmall"
                                className="me-2"
                                height={45}
                                width={45}
                              />
                              <div>
                                <p>{row.productName}</p>
                                <small className="mt-2 text-grey-6">
                                  SKU: TFDR012345
                                </small>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{row.category}</TableCell>
                          <TableCell>
                            <div className="d-flex align-items-center">
                              <p className="text-decoration-underline text-primary">
                                1452
                              </p>
                              &nbsp;
                              <p> {row.qty}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div
                              className="d-flex align-items-center c-pointer "
                              aria-describedby={idFlag}
                              variant="contained"
                              onClick={handleFlagClick}
                            >
                              <p>{row.price}</p>
                              <img
                                className="ms-3"
                                src={arrowDown}
                                alt="arrowDown"
                              />
                            </div>
                            <Popover
                              anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "center",
                              }}
                              transformOrigin={{
                                vertical: "top",
                                horizontal: "center",
                              }}
                              id={idFlag}
                              open={openFlag}
                              anchorEl={anchorFlagEl}
                              onClose={handleFlagClose}
                            >
                              <small className="text-lightBlue">
                                Default : 12KT • Yellow • Gold • IJ-SI
                              </small>
                              <div className="d-flex align-items-center justify-content-between mb-2 mt-2 text-blue-1">
                                <small>Metal Price</small>
                                <small className="ms-2">Rs 15,000</small>
                              </div>
                              <div className="d-flex align-items-center justify-content-between mb-2 mt-2 text-blue-1">
                                <small>Diamond Price</small>
                                <small className="ms-2">Rs&nbsp;4,000</small>
                              </div>
                              <div className="d-flex align-items-center justify-content-between mb-2 mt-2 text-blue-1">
                                <small>Making Charges</small>
                                <small className="ms-2">Rs&nbsp;1,000</small>
                              </div>
                              <div className="d-flex align-items-center justify-content-between mb-2 mt-2 text-blue-1">
                                <small>GST</small>
                                <small className="ms-2">
                                  Rs&nbsp;&nbsp;600
                                </small>
                              </div>
                              <div className="d-flex align-items-center justify-content-between mb-2 mt-2">
                                <h6>Total</h6>
                                <h6 className="ms-2">Rs&nbsp;20,600</h6>
                              </div>
                            </Popover>
                          </TableCell>
                          <TableCell>
                            <div className="d-flex">
                              <img src={teamMember1} alt="teamMember1" />
                              <img src={teamMember3} alt="teamMember2" />
                              <img src={teamMember2} alt="teamMember3" />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="d-flex align-items-center">
                              <div className="rounded-pill table-status px-2 py-1">
                                <small className="text-black fw-light">
                                  {row.status}
                                </small>
                                <img
                                  src={arrowDownBlack}
                                  alt="arrowDownBlack"
                                  className="ms-2"
                                />
                              </div>
                              {/* <MoreVertIcon className="ms-4" /> */}
                              <img
                                src={verticalDots}
                                alt="verticalDots"
                                className="ms-4 c-pointer"
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
                                <small className="text-lightBlue">ACTION</small>
                                <hr className="hr-grey-6 my-2" />
                                <div className="d-flex align-items-center justify-content-between mb-2 mt-2 text-blue-1">
                                  <img
                                    src={editButton}
                                    alt="editButton"
                                    height={36}
                                    className="c-pointer"
                                  />
                                  <img
                                    src={duplicateButton}
                                    alt="duplicateButton"
                                    height={36}
                                    className="c-pointer"
                                  />
                                </div>
                                <p className="my-3 text-lightBlue">
                                  Make it Active
                                </p>
                                <p className="my-3 text-lightBlue">
                                  Make it Draft
                                </p>
                                <p className="my-3 text-lightBlue">Edit SKU</p>
                                <p className="my-2 text-lightBlue">
                                  Edit Quantity
                                </p>
                                <small className="text-lightBlue">ACTION</small>
                                <hr className="hr-grey-6 my-2" />
                                <p className="my-2 text-lightBlue">
                                  Add or Remove Tags
                                </p>
                                <p className="my-2 text-lightBlue">
                                  Add or Remove Collections
                                </p>
                                <div className="d-flex justify-content-between mt-4">
                                  <p>Archived Product</p>
                                  <img src={deleteRed} alt="delete" />
                                </div>
                              </Popover>
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
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
          <TabPanel value={value} index={3}>
            Item Four
          </TabPanel>
          {/* </Box> */}
        </Paper>
      </div>
    </div>
  );
};

export default AllProducts;
