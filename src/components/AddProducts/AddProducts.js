import React from "react";
import "./AddProducts.scss";
// ! COMPONENT IMPORTS
import {
  EnhancedTableHead,
  stableSort,
  getComparator,
} from "../TableDependencies/TableDependencies";
import TableSearch from "../TableSearch/TableSearch";
// ! IMAGES IMPORTS
import ringSmall from "../../assets/images/ringSmall.svg";
import deleteButton from "../../assets/icons/deleteButton.svg";
import cancel from "../../assets/icons/cancel.svg";
import arrowDown from "../../assets/icons/arrowDown.svg";
// ! MATERIAL IMPORTS
import {
  Checkbox,
  styled,
  InputBase,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Popover,
  SwipeableDrawer,
} from "@mui/material";
// ! MATERIAL ICONS IMPORTS
import SearchIcon from "@mui/icons-material/Search";

// ? SEARCH INPUT STARTS HERE
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  "&:hover": {},
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
  height: "30.6px",
  border: "1px solid #38395c",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1.5),
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
    padding: theme.spacing(0.8, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    borderRadius: "5px",
  },
}));
// ? SEARCH INPUT ENDS HERE

// ? TABLE STARTS HERE
function createData(pId, productName, category, price) {
  return { pId, productName, category, price };
}

const rows = [
  createData(
    34,
    "The Fringe Diamond Ring",
    "Gold Products",
    "₹ 20,600 - ₹ 50,000"
  ),
  createData(
    35,
    "The Fringe Diamond Ring",
    "Gold Products",
    "₹ 20,600 - ₹ 50,000"
  ),
  createData(
    36,
    "The Fringe Diamond Ring",
    "Gold Products",
    "₹ 20,600 - ₹ 50,000"
  ),
  createData(
    37,
    "The Fringe Diamond Ring",
    "Gold Products",
    "₹ 20,600 - ₹ 50,000"
  ),
  createData(
    38,
    "The Fringe Diamond Ring",
    "Gold Products",
    "₹ 20,600 - ₹ 50,000"
  ),
];

const drawerHeadCells = [
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
    id: "price",
    numeric: false,
    disablePadding: false,
    label: "Price",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "Action",
  },
];

// ? TABLE ENDS HERE

// ? LIKE PRODUCTS TABLE STARTS HERE
function createLikeProductData(pId, productName, category, price) {
  return { pId, productName, category, price };
}

const likeHeadCells = [
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
    id: "price",
    numeric: false,
    disablePadding: false,
    label: "Price",
  },
];

const likeProductRows = [
  createLikeProductData(
    1,
    "The Fringe Diamond Ring",
    "Gold Products",
    "₹ 25,000"
  ),
  createLikeProductData(2, "Fringe Diamond Ring", "Gold Products", "₹ 25,000"),
  createLikeProductData(
    3,
    "The Fringe Diamond Ring",
    "Gold Products",
    "₹ 25,000"
  ),
];
// ? LIKE PRODUCTS TABLE ENDS HERE

const AddProducts = ({isLoading,list}) => {
  // ? ADD PRODUCT DRAWER STARTS HERE

  console.log("product", list);
  const [addProductDrawer, setAddProductDrawer] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleAddProductDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setAddProductDrawer({ ...addProductDrawer, [anchor]: open });
  };
  // ? ADD PRODUCT DRAWER ENDS HERE

  // * PRICE POPOVERS STARTS
  const [anchorPriceEl, setAnchorPriceEl] = React.useState(null);
  const handlePriceClick = (event) => {
    setAnchorPriceEl(event.currentTarget);
  };

  const handlePriceClose = () => {
    setAnchorPriceEl(null);
  };

  const openPrice = Boolean(anchorPriceEl);
  const idPrice = openPrice ? "simple-popover" : undefined;
  // * PRICE POPOVERS ENDS

  // * TABLE STARTS HERE
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("productName");
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

  const handleLikeSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = likeProductRows.map((n) => n.pId);
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

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  // * TABLE ENDS HERE

  return (
    <React.Fragment>
      <div className="col-12 px-0">
        <div className="row align-items-center">
          <div className="col-md-9 ps-1 pe-0 py-2">
            <TableSearch />
          </div>
          <div className="col-md-3 pe-md-1 py-2">
            <button
              className="button-gradient w-100 py-2 px-3"
              onClick={toggleAddProductDrawer("right", true)}
            >
              <p>Add Products</p>
            </button>
          </div>
        </div>
      </div>
      <div className="col-12 px-0 ">
        <div className="add-products">
          {selected.length > 0 && (
            <div className="d-flex justify-content-between align-items-center px-2  mt-2 mb-3">
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
            </div>
          )}
          <TableContainer className="mt-3">
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size="medium"
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleLikeSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={likeProductRows.length}
                headCells={drawerHeadCells}
              />
              <TableBody>
                {stableSort(likeProductRows, getComparator(order, orderBy))
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
                            size="small"
                            onClick={(event) => handleClick(event, row.pId)}
                            style={{
                              color: "#5C6D8E",
                              marginRight: 0,
                            }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          <div className="d-flex align-items-center my-2">
                            <img
                              src={ringSmall}
                              alt="ringSmall"
                              className="me-2"
                              height={45}
                              width={45}
                            />
                            <div>
                              <p className="text-lightBlue fw-600">
                                {row.productName}
                              </p>
                              <small className="mt-2 text-grey-6">
                                SKU: TFDR012345
                              </small>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-lightBlue">{row.category}</p>
                        </TableCell>
                        <TableCell>
                          <div className="d-flex align-items-center c-pointer ">
                            <p className="text-lightBlue">{row.price}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="d-flex align-items-center c-pointer ">
                            <img
                              src={deleteButton}
                              alt="deleteButton"
                              width={75}
                              className="c-pointer"
                            />
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
      </div>

      <SwipeableDrawer
        anchor="right"
        open={addProductDrawer["right"]}
        onClose={toggleAddProductDrawer("right", false)}
        onOpen={toggleAddProductDrawer("right", true)}
      >
        <div className="d-flex justify-content-between pt-3 ps-3 pe-2 me-1 align-items-center">
          <h6 className="text-lightBlue">Select Products</h6>
          <img
            src={cancel}
            alt="cancel"
            className="c-pointer add-product-padding"
            onClick={toggleAddProductDrawer("right", false)}
          />
        </div>
        <hr className="hr-grey-6 mt-3 mb-3" />
        <div className="px-3">
          <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: "#c8d8ff" }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </div>
        {selected.length > 0 && (
          <div className="d-flex justify-content-between align-items-center px-2 mt-3">
            <button className="button-grey py-2 px-3 border-lightBlue">
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
          </div>
        )}
        <TableContainer className="mt-3">
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
              headCells={likeHeadCells}
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
                          size="small"
                          onClick={(event) => handleClick(event, row.pId)}
                          style={{
                            color: "#5C6D8E",
                            marginRight: 0,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        <div className="d-flex align-items-center my-2">
                          <img
                            src={ringSmall}
                            alt="ringSmall"
                            className="me-2"
                            height={45}
                            width={45}
                          />
                          <div>
                            <p className="text-lightBlue fw-600">
                              {row.productName}
                            </p>
                            <small className="mt-2 text-grey-6">
                              SKU: TFDR012345
                            </small>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-lightBlue">{row.category}</p>
                      </TableCell>
                      <TableCell>
                        <div
                          className="d-flex align-items-center c-pointer "
                          aria-describedby={idPrice}
                          variant="contained"
                          onClick={handlePriceClick}
                        >
                          <p className="text-lightBlue">{row.price}</p>
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
                          id={idPrice}
                          open={openPrice}
                          anchorEl={anchorPriceEl}
                          onClose={handlePriceClose}
                        >
                          <div className="px-3">
                            <small className="text-lightBlue">
                              Default : 12KT • Yellow • Gold • IJ-SI
                            </small>
                            <div className="d-flex align-items-center justify-content-between mb-2 mt-3 text-grey-6">
                              <small>Metal Price</small>
                              <small className="ms-2">₹&nbsp;15,000</small>
                            </div>
                            <div className="d-flex align-items-center justify-content-between mb-2 mt-2 text-grey-6">
                              <small>Diamond Price</small>
                              <small className="ms-2">₹&nbsp;4,000</small>
                            </div>
                            <div className="d-flex align-items-center justify-content-between mb-2 mt-2 text-grey-6">
                              <small>Making Charges</small>
                              <small className="ms-2">₹&nbsp;1,000</small>
                            </div>
                            <div className="d-flex align-items-center justify-content-between mb-3 mt-2 text-grey-6">
                              <small>GST</small>
                              <small className="ms-2">₹&nbsp;&nbsp;600</small>
                            </div>
                            <div className="d-flex align-items-center justify-content-between mb-2 mt-2">
                              <p className="text-lightBlue">Total</p>
                              <p className="ms-2 text-lightBlue fw-600">
                                ₹&nbsp;20,600
                              </p>
                            </div>
                          </div>
                        </Popover>
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
        <div className="d-flex flex-column py-3 px-4 feature-buttons">
          <hr className="hr-grey-6 my-3 w-100" />
          <div className="d-flex justify-content-between">
            <button className="button-gradient py-2 px-5 w-auto ">
              <p>Add 4 Products</p>
            </button>
            <button className="button-lightBlue-outline py-2 px-4">
              <p>Cancel</p>
            </button>
          </div>
        </div>
      </SwipeableDrawer>
    </React.Fragment>
  );
};

export default AddProducts;
