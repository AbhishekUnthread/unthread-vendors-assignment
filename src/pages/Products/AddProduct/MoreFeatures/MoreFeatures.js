import React from "react";
import PropTypes from "prop-types";
import "./MoreFeatures.scss";
// ! IMAGES IMPORTS
import preOrder from "../../../../assets/images/products/preOrder.svg";
import label from "../../../../assets/images/products/label.svg";
import sizeChart from "../../../../assets/images/products/sizeChart.svg";
import featureUpload from "../../../../assets/images/products/featureUpload.svg";
import cancel from "../../../../assets/icons/cancel.svg";
import ringSmall from "../../../../assets/images/ringSmall.svg";
import arrowDown from "../../../../assets/icons/arrowDown.svg";
import deleteWhite from "../../../../assets/icons/deleteWhite.svg";
import editWhite from "../../../../assets/icons/editWhite.svg";
import deleteButton from "../../../../assets/icons/deleteButton.svg";
// ! MATERIAL IMPORTS
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputAdornment,
  InputBase,
  MenuItem,
  OutlinedInput,
  Popover,
  Radio,
  RadioGroup,
  Select,
  styled,
  SwipeableDrawer,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
// ! MATERIAL ICONS IMPORTS
import SearchIcon from "@mui/icons-material/Search";

// ? SEARCH INPUT STARTS HERE
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: "auto",
  },
  height: "30.6px",
  border: "1px solid #38395c",
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
    1,
    "The Fringe Diamond Ring",
    "Gold Products",
    "₹ 20,600 - ₹ 50,000"
  ),
  createData(
    2,
    "The Fringe Diamond Ring",
    "Gold Products",
    "₹ 20,600 - ₹ 50,000"
  ),
  createData(
    3,
    "The Fringe Diamond Ring",
    "Gold Products",
    "₹ 20,600 - ₹ 50,000"
  ),
  createData(
    4,
    "The Fringe Diamond Ring",
    "Gold Products",
    "₹ 20,600 - ₹ 50,000"
  ),
  createData(
    5,
    "The Fringe Diamond Ring",
    "Gold Products",
    "₹ 20,600 - ₹ 50,000"
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
    id: "price",
    numeric: false,
    disablePadding: false,
    label: "Price",
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
              marginRight: 0,
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

// ? LIKE PRODUCTS TABLE STARTS HERE
function createLikeProductData(pId, productName, category, price) {
  return { pId, productName, category, price };
}

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
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "Action",
  },
];

function LikeProductTableHead(props) {
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
              marginRight: 0,
            }}
          />
        </TableCell>
        {likeHeadCells.map((headCell) => (
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

LikeProductTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};
// ? TABLE ENDS HERE

const MoreFeatures = () => {
  // ? RADIO BUTTON STARTS HERE
  const [likeProductRadio, setLikeProductRadio] = React.useState(
    "companyIntelligence"
  );
  const handleLikeProductRadio = (event) => {
    setLikeProductRadio(event.target.value);
  };

  const [likeMatchRadio, setLikeMatchRadio] = React.useState("allCondition");
  const handleLikeMatchRadio = (event) => {
    setLikeMatchRadio(event.target.value);
  };

  const [recommendedProductRadio, setRecommendedProductRadio] = React.useState(
    "companyIntelligence"
  );
  const handleRecommendedProductRadio = (event) => {
    setRecommendedProductRadio(event.target.value);
  };

  const [recommendedMatchRadio, setRecommendedMatchRadio] =
    React.useState("allCondition");
  const handleRecommendedMatchRadio = (event) => {
    setRecommendedMatchRadio(event.target.value);
  };

  // ? RADIO BUTTON ENDS HERE

  // ? ADD PRODUCT DRAWER STARTS HERE

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

  // ? SIZE SELECT STARTS HERE
  const [field, setField] = React.useState("price");

  const handleFieldChange = (event) => {
    setField(event.target.value);
  };
  // ? SIZE SELECT ENDS HERE

  // ? OPERATOR SELECT STARTS HERE
  const [operator, setOperator] = React.useState("equals");

  const handleOperatorChange = (event) => {
    setOperator(event.target.value);
  };
  // ? OPERATOR SELECT ENDS HERE

  // ? CHECKBOX STARTS HERE
  const [checked, setChecked] = React.useState(false);

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };
  // ? CHECKBOX ENDS HERE

  // ? LIKE ADD CONDITION STARTS HERE
  const [likeAddCondition, setLikeAddCondition] = React.useState(false);
  const handleLikeAddCondition = () => {
    if (!likeAddCondition) {
      setLikeAddCondition(true);
    } else {
      setLikeAddCondition(false);
      setLikeApplyCondition(false);
    }
  };
  // ? LIKE ADD CONDITION ENDS HERE

  // ? LIKE APPLY CONDITION STARTS HERE
  const [likeApplyCondition, setLikeApplyCondition] = React.useState(false);
  const handleLikeApplyCondition = () => {
    if (likeApplyCondition) {
      setLikeApplyCondition(false);
    } else {
      setLikeApplyCondition(true);
      setLikeAddCondition(false);
    }
  };
  // ? LIKE APPLY CONDITION ENDS HERE

  // ? RECOMMENDED ADD CONDITION STARTS HERE
  const [recommendedAddCondition, setRecommendedAddCondition] =
    React.useState(false);
  const handleRecommendedAddCondition = () => {
    if (!recommendedAddCondition) {
      setRecommendedAddCondition(true);
    } else {
      setRecommendedAddCondition(false);
      setRecommendedApplyCondition(false);
    }
  };
  // ? RECOMMENDED ADD CONDITION ENDS HERE

  // ? RECOMMENDED APPLY CONDITION STARTS HERE
  const [recommendedApplyCondition, setRecommendedApplyCondition] =
    React.useState(false);
  const handleRecommendedApplyCondition = () => {
    if (recommendedApplyCondition) {
      setRecommendedApplyCondition(false);
    } else {
      setRecommendedApplyCondition(true);
      setRecommendedAddCondition(false);
    }
  };
  // ? RECOMMENDED APPLY CONDITION ENDS HERE

  return (
    <React.Fragment>
      <div className="bg-black-9 border-grey-5 rounded-8 p-3 row features mb-4">
        <div className="d-flex justify-content-between mb-2 px-0">
          <h6 className="text-lightBlue me-auto text-lightBlue col-auto ps-0 fw-500">
            You may also like
          </h6>
          <p className="text-blue-2 col-auto pe-0">Customise</p>
        </div>
        <div className="d-flex align-items-center col-12 px-0 mb-2">
          <p className="text-grey-6 me-4 px-0">Select Products Through</p>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={likeProductRadio}
            onChange={handleLikeProductRadio}
            className="features-radio px-0"
          >
            <FormControlLabel
              value="companyIntelligence"
              control={<Radio size="small" />}
              label="Company Intelligence"
              sx={{
                "& .MuiTypography-root": {
                  fontSize: 13,
                  color: "#c8d8ff",
                  marginRight: 1,
                },
              }}
            />
            <FormControlLabel
              value="automated"
              control={<Radio size="small" />}
              label="Automated"
              sx={{
                "& .MuiTypography-root": {
                  fontSize: 13,
                  color: "#c8d8ff",
                  marginRight: 1,
                },
              }}
            />
            <FormControlLabel
              value="manual"
              control={<Radio size="small" />}
              label="Manual"
              sx={{
                "& .MuiTypography-root": {
                  fontSize: 13,
                  color: "#c8d8ff",
                  marginRight: 1,
                },
              }}
            />
          </RadioGroup>
        </div>
        {likeProductRadio !== "manual" && (
          <div className="bg-black-11 rounded-8 p-3 shadow-sm">
            {likeProductRadio === "companyIntelligence" && (
              <React.Fragment>
                <p className="text-blue-gradient fw-500" style={{ width: 160 }}>
                  Company Intelligence
                </p>
                <small className="text-grey-6 mt-2 d-block">
                  Company Intelligence is a tool that uses a series of
                  algorithms, data analysis and even artificial intelligence
                  (AI) to make online recommendations for products, content
                  and/or other elements. These recommendations can be customized
                  for each user or not, depending on the purpose of each
                  platform, the amount of data obtained and even the type of
                  technology used
                </small>
              </React.Fragment>
            )}
            {likeProductRadio === "automated" && (
              <React.Fragment>
                <div className="d-flex justify-content-between">
                  <div className="d-flex align-items-center">
                    <p className="text-lightBlue me-4">Should Match:</p>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      value={likeMatchRadio}
                      onChange={handleLikeMatchRadio}
                      className="features-radio"
                    >
                      <FormControlLabel
                        value="allCondition"
                        control={<Radio size="small" />}
                        label="All Condition"
                        sx={{
                          "& .MuiTypography-root": {
                            fontSize: 13,
                            color: "#c8d8ff",
                          },
                        }}
                      />
                      <FormControlLabel
                        value="anyCondition"
                        control={<Radio size="small" />}
                        label="Any Condition"
                        sx={{
                          "& .MuiTypography-root": {
                            fontSize: 13,
                            color: "#c8d8ff",
                          },
                        }}
                      />
                    </RadioGroup>
                  </div>
                  <button
                    className="button-gradient py-1 px-4"
                    onClick={handleLikeAddCondition}
                  >
                    <p>Add Condition</p>
                  </button>
                </div>
                <div className="bg-black-9 align-items-center rounded-8 py-2 px-3 d-flex justify-content-between mt-3 shadow-lg">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={handleCheckboxChange}
                        inputProps={{ "aria-label": "controlled" }}
                        size="small"
                        style={{
                          color: "#5C6D8E",
                          marginRight: 0,
                          width: "auto",
                        }}
                      />
                    }
                    label="Summary"
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: "0.875rem",
                        color: "#c8d8ff",
                      },
                    }}
                    className=" px-0"
                  />
                  <p className="text-lightBlue c-pointer">Action</p>
                </div>
                {likeApplyCondition && (
                  <div className="d-flex px-3 justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={checked}
                            onChange={handleCheckboxChange}
                            inputProps={{ "aria-label": "controlled" }}
                            size="small"
                            style={{
                              color: "#5C6D8E",
                              marginRight: 0,
                              width: "auto",
                            }}
                          />
                        }
                        sx={{
                          "& .MuiTypography-root": {
                            fontSize: "0.875rem",
                            color: "#c8d8ff",
                          },
                        }}
                        className="px-0 me-0"
                      />
                      <small className="ms-0 text-lightBlue">
                        <span className="text-blue-2">Price</span>&nbsp;is equal
                        to&nbsp;
                        <span className="text-blue-2">₹&nbsp;25,000</span>
                      </small>
                    </div>
                    <div className="d-flex align-items-center">
                      <img
                        src={editWhite}
                        alt="editWhite"
                        width={30}
                        className="me-1"
                      />
                      <img src={deleteWhite} alt="deleteWhite" width={30} />
                    </div>
                  </div>
                )}
                {likeAddCondition && (
                  <div className="row">
                    <div className="col-sm-6 col-md-3 mt-3 mb-1">
                      <p className="text-lightBlue mb-1">Field</p>

                      <FormControl className="w-100 px-0" size="small">
                        <Select
                          labelId="demo-select-small"
                          id="demo-select-small"
                          value={field}
                          onChange={handleFieldChange}
                          size="small"
                        >
                          <MenuItem
                            value="price"
                            sx={{ fontSize: 13, color: "#5c6d8e" }}
                          >
                            Price
                          </MenuItem>
                          <MenuItem
                            value={"collection"}
                            sx={{ fontSize: 13, color: "#5c6d8e" }}
                          >
                            Collection
                          </MenuItem>
                          <MenuItem
                            value={"tags"}
                            sx={{ fontSize: 13, color: "#5c6d8e" }}
                          >
                            Tags
                          </MenuItem>
                          <MenuItem
                            value={"category"}
                            sx={{ fontSize: 13, color: "#5c6d8e" }}
                          >
                            Catagory
                          </MenuItem>
                          <MenuItem
                            value={"subCategory"}
                            sx={{ fontSize: 13, color: "#5c6d8e" }}
                          >
                            Sub Category
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div className="col-sm-6 col-md-3 mt-3 mb-1">
                      <p className="text-lightBlue mb-1">Operator</p>

                      <FormControl className="w-100 px-0" size="small">
                        <Select
                          labelId="demo-select-small"
                          id="demo-select-small"
                          value={operator}
                          onChange={handleOperatorChange}
                          size="small"
                        >
                          <MenuItem
                            value="equals"
                            sx={{ fontSize: 13, color: "#5c6d8e" }}
                          >
                            Equals
                          </MenuItem>
                          <MenuItem
                            value={"notEquals"}
                            sx={{ fontSize: 13, color: "#5c6d8e" }}
                          >
                            Not Equals
                          </MenuItem>
                          <MenuItem
                            value={"greaterThan"}
                            sx={{ fontSize: 13, color: "#5c6d8e" }}
                          >
                            Greater Than
                          </MenuItem>
                          <MenuItem
                            value={"less"}
                            sx={{ fontSize: 13, color: "#5c6d8e" }}
                          >
                            Less
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div className="col-sm-6 col-md-3 mt-3 mb-1">
                      <p className="text-lightBlue mb-1">Value</p>

                      <FormControl className="w-100 px-0">
                        <OutlinedInput
                          placeholder="Enter Value"
                          size="small"
                          defaultValue="25000"
                          startAdornment={
                            <InputAdornment position="start">
                              <p className="text-lightBlue">₹</p>
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </div>
                    <div className="col-sm-6 col-md-3 mt-3 mb-1">
                      <button
                        className="button-gradient py-1 px-3 w-100 mb-2"
                        onClick={handleLikeApplyCondition}
                      >
                        <p>Apply</p>
                      </button>
                      <button
                        className="button-lightBlue-outline py-1 px-3 w-100"
                        onClick={handleLikeApplyCondition}
                      >
                        <p>Cancel</p>
                      </button>
                    </div>
                  </div>
                )}
              </React.Fragment>
            )}
          </div>
        )}
        {likeProductRadio === "automated" && likeApplyCondition && (
          <React.Fragment>
            <div className="col-12 mt-3">
              <div className="row align-items-center">
                <div className="col-md-9 px-md-0 py-2">
                  <Search className="mx-0">
                    <SearchIconWrapper>
                      <SearchIcon sx={{ color: "#c8d8ff" }} />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search…"
                      inputProps={{ "aria-label": "search" }}
                    />
                  </Search>
                </div>
                <div className="col-md-3 pe-md-0 py-2">
                  <button
                    className="button-gradient w-100 py-1 px-3"
                    onClick={toggleAddProductDrawer("right", true)}
                  >
                    <p>Add Products</p>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-12 px-0">
              <TableContainer className="mt-3">
                <Table
                  sx={{ minWidth: 750 }}
                  aria-labelledby="tableTitle"
                  size="medium"
                >
                  <LikeProductTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleLikeSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={likeProductRows.length}
                  />
                  <TableBody>
                    {stableSort(likeProductRows, getComparator(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
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
          </React.Fragment>
        )}
        {likeProductRadio === "manual" && (
          <React.Fragment>
            <img
              src={featureUpload}
              className="w-100 c-pointer px-0"
              alt=""
              onClick={toggleAddProductDrawer("right", true)}
            />
          </React.Fragment>
        )}
      </div>

      <SwipeableDrawer
        anchor="right"
        open={addProductDrawer["right"]}
        onClose={toggleAddProductDrawer("right", false)}
        onOpen={toggleAddProductDrawer("right", true)}
      >
        {/* {list()} */}
        <div className="d-flex justify-content-between py-3 ps-3 pe-2 me-1 align-items-center">
          <h6 className="text-lightBlue">Select Products</h6>
          <img
            src={cancel}
            alt="cancel"
            className="c-pointer add-product-padding"
            onClick={toggleAddProductDrawer("right", false)}
          />
        </div>
        <hr className="hr-grey-6 mt-3 mb-3" />
        <Search>
          <SearchIconWrapper>
            <SearchIcon sx={{ color: "#c8d8ff" }} />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>

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
      <div className="bg-black-9 border-grey-5 rounded-8 p-3 row features mb-4">
        <div className="d-flex justify-content-between mb-2 px-0">
          <h6 className="text-lightBlue me-auto text-lightBlue col-auto ps-0 fw-500">
            Recommended Products
          </h6>
          <p className="text-blue-2 col-auto pe-0">Customise</p>
        </div>

        <div className="d-flex align-items-center col-12 px-0 mb-2">
          <p className="text-grey-6 me-4 px-0">Select Products Through</p>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={recommendedProductRadio}
            onChange={handleRecommendedProductRadio}
            className="features-radio"
          >
            <FormControlLabel
              value="companyIntelligence"
              control={<Radio size="small" />}
              label="Company Intelligence"
              sx={{
                "& .MuiTypography-root": {
                  fontSize: 13,
                  color: "#c8d8ff",
                  marginRight: 1,
                },
              }}
            />
            <FormControlLabel
              value="automated"
              control={<Radio size="small" />}
              label="Automated"
              sx={{
                "& .MuiTypography-root": {
                  fontSize: 13,
                  color: "#c8d8ff",
                  marginRight: 1,
                },
              }}
            />
            <FormControlLabel
              value="manual"
              control={<Radio size="small" />}
              label="Manual"
              sx={{
                "& .MuiTypography-root": {
                  fontSize: 13,
                  color: "#c8d8ff",
                  marginRight: 1,
                },
              }}
            />
          </RadioGroup>
        </div>
        {recommendedProductRadio !== "manual" && (
          <div className="bg-black-11 rounded-8 p-3 shadow-sm">
            {recommendedProductRadio === "companyIntelligence" && (
              <React.Fragment>
                <p className="text-blue-gradient fw-500" style={{ width: 160 }}>
                  Company Intelligence
                </p>
                <small className="text-grey-6 mt-2 d-block">
                  Company Intelligence is a tool that uses a series of
                  algorithms, data analysis and even artificial intelligence
                  (AI) to make online recommendations for products, content
                  and/or other elements. These recommendations can be customized
                  for each user or not, depending on the purpose of each
                  platform, the amount of data obtained and even the type of
                  technology used
                </small>
              </React.Fragment>
            )}
            {recommendedProductRadio === "automated" && (
              <React.Fragment>
                <div className="d-flex justify-content-between">
                  <div className="d-flex align-items-center">
                    <p className="text-lightBlue me-4">Should Match:</p>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      value={recommendedMatchRadio}
                      onChange={handleRecommendedMatchRadio}
                      className="features-radio"
                    >
                      <FormControlLabel
                        value="allCondition"
                        control={<Radio size="small" />}
                        label="All Condition"
                        sx={{
                          "& .MuiTypography-root": {
                            fontSize: 13,
                            color: "#c8d8ff",
                          },
                        }}
                      />
                      <FormControlLabel
                        value="anyCondition"
                        control={<Radio size="small" />}
                        label="Any Condition"
                        sx={{
                          "& .MuiTypography-root": {
                            fontSize: 13,
                            color: "#c8d8ff",
                          },
                        }}
                      />
                    </RadioGroup>
                  </div>
                  <button
                    className="button-gradient py-1 px-4"
                    onClick={handleRecommendedAddCondition}
                  >
                    <p>Add Condition</p>
                  </button>
                </div>
                <div className="bg-black-9 rounded-8 py-2 px-3 d-flex justify-content-between mt-3 shadow-lg">
                  <p className="text-lightBlue c-pointer">Summary</p>
                  <p className="text-lightBlue c-pointer">Action</p>
                </div>

                {recommendedApplyCondition && (
                  <div className="d-flex px-3 justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={checked}
                            onChange={handleCheckboxChange}
                            inputProps={{ "aria-label": "controlled" }}
                            size="small"
                            style={{
                              color: "#5C6D8E",
                              marginRight: 0,
                              width: "auto",
                            }}
                          />
                        }
                        sx={{
                          "& .MuiTypography-root": {
                            fontSize: "0.875rem",
                            color: "#c8d8ff",
                          },
                        }}
                        className="px-0 me-0"
                      />
                      <small className="ms-0 text-lightBlue">
                        <span className="text-blue-2">Price</span>&nbsp;is equal
                        to&nbsp;
                        <span className="text-blue-2">₹&nbsp;25,000</span>
                      </small>
                    </div>
                    <div className="d-flex align-items-center">
                      <img
                        src={editWhite}
                        alt="editWhite"
                        width={30}
                        className="me-1"
                      />
                      <img src={deleteWhite} alt="deleteWhite" width={30} />
                    </div>
                  </div>
                )}
                {recommendedAddCondition && (
                  <div className="row">
                    <div className="col-sm-6 col-md-3 mt-3 mb-1">
                      <p className="text-lightBlue mb-1">Field</p>

                      <FormControl className="w-100 px-0" size="small">
                        <Select
                          labelId="demo-select-small"
                          id="demo-select-small"
                          value={field}
                          onChange={handleFieldChange}
                          size="small"
                        >
                          <MenuItem
                            value="price"
                            sx={{ fontSize: 13, color: "#5c6d8e" }}
                          >
                            Price
                          </MenuItem>
                          <MenuItem
                            value={"collection"}
                            sx={{ fontSize: 13, color: "#5c6d8e" }}
                          >
                            Collection
                          </MenuItem>
                          <MenuItem
                            value={"tags"}
                            sx={{ fontSize: 13, color: "#5c6d8e" }}
                          >
                            Tags
                          </MenuItem>
                          <MenuItem
                            value={"category"}
                            sx={{ fontSize: 13, color: "#5c6d8e" }}
                          >
                            Catagory
                          </MenuItem>
                          <MenuItem
                            value={"subCategory"}
                            sx={{ fontSize: 13, color: "#5c6d8e" }}
                          >
                            Sub Category
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div className="col-sm-6 col-md-3 mt-3 mb-1">
                      <p className="text-lightBlue mb-1">Operator</p>

                      <FormControl className="w-100 px-0" size="small">
                        <Select
                          labelId="demo-select-small"
                          id="demo-select-small"
                          value={operator}
                          onChange={handleOperatorChange}
                          size="small"
                        >
                          <MenuItem
                            value="equals"
                            sx={{ fontSize: 13, color: "#5c6d8e" }}
                          >
                            Equals
                          </MenuItem>
                          <MenuItem
                            value={"notEquals"}
                            sx={{ fontSize: 13, color: "#5c6d8e" }}
                          >
                            Not Equals
                          </MenuItem>
                          <MenuItem
                            value={"greaterThan"}
                            sx={{ fontSize: 13, color: "#5c6d8e" }}
                          >
                            Greater Than
                          </MenuItem>
                          <MenuItem
                            value={"less"}
                            sx={{ fontSize: 13, color: "#5c6d8e" }}
                          >
                            Less
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div className="col-sm-6 col-md-3 mt-3 mb-1">
                      <p className="text-lightBlue mb-1">Value</p>

                      <FormControl className="w-100 px-0">
                        <OutlinedInput
                          placeholder="Enter Value"
                          size="small"
                          defaultValue="1000"
                          startAdornment={
                            <InputAdornment position="start">
                              <p className="text-lightBlue">$</p>
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </div>
                    <div className="col-sm-6 col-md-3 mt-3 mb-1">
                      <button
                        className="button-gradient py-1 px-3 w-100 mb-2"
                        onClick={handleRecommendedApplyCondition}
                      >
                        <p>Apply</p>
                      </button>
                      <button
                        className="button-lightBlue-outline py-1 px-3 w-100"
                        onClick={handleRecommendedApplyCondition}
                      >
                        <p>Cancel</p>
                      </button>
                    </div>
                  </div>
                )}
              </React.Fragment>
            )}
          </div>
        )}
        {recommendedProductRadio === "automated" &&
          recommendedApplyCondition && (
            <React.Fragment>
              <div className="col-12 mt-3">
                <div className="row align-items-center">
                  <div className="col-md-9 px-md-0 py-2">
                    <Search className="mx-0">
                      <SearchIconWrapper>
                        <SearchIcon sx={{ color: "#c8d8ff" }} />
                      </SearchIconWrapper>
                      <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ "aria-label": "search" }}
                      />
                    </Search>
                  </div>
                  <div className="col-md-3 pe-md-0 py-2">
                    <button
                      className="button-gradient w-100 py-1 px-3"
                      onClick={toggleAddProductDrawer("right", true)}
                    >
                      <p>Add Products</p>
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-12 px-0">
                <TableContainer className="mt-3">
                  <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    size="medium"
                  >
                    <LikeProductTableHead
                      numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      onSelectAllClick={handleLikeSelectAllClick}
                      onRequestSort={handleRequestSort}
                      rowCount={likeProductRows.length}
                    />
                    <TableBody>
                      {stableSort(
                        likeProductRows,
                        getComparator(order, orderBy)
                      )
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
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
                                  onClick={(event) =>
                                    handleClick(event, row.pId)
                                  }
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
            </React.Fragment>
          )}

        {recommendedProductRadio === "manual" && (
          <img
            src={featureUpload}
            className="w-100 c-pointer px-0"
            alt=""
            onClick={toggleAddProductDrawer("right", true)}
          />
        )}
      </div>

      <div className="row features">
        <div className="col-4 ps-0">
          <div className="bg-black-15 border-grey-5 rounded-8 p-3 ">
            <div className="d-flex justify-content-between align-items-end">
              <h5 className="text-lightBlue fw-bold">Labels</h5>
              <img src={label} alt="label" className="" width={90} />
            </div>
            <small className="text-grey-6 my-3 d-block">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus
              pellentes
            </small>
            <button className="button-gradient py-1 px-3 mt-2">
              <p>Explore</p>
            </button>
          </div>
        </div>
        <div className="col-4">
          <div className="bg-black-15 border-grey-5 rounded-8 p-3 ">
            <div className="d-flex justify-content-between align-items-end">
              <h5 className="text-lightBlue fw-bold">Size Chart</h5>
              <img src={sizeChart} alt="label" className="" width={93} />
            </div>
            <small className="text-grey-6 my-3 d-block">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus
              pellentes
            </small>
            <button className="button-gradient py-1 px-3 mt-2">
              <p>Explore</p>
            </button>
          </div>
        </div>
        <div className="col-4 pe-0">
          <div className="bg-black-15 border-grey-5 rounded-8 p-3 ">
            <div className="d-flex justify-content-between align-items-end">
              <h5 className="text-lightBlue fw-bold">Pre Order</h5>
              <img src={preOrder} alt="label" className="" width={97} />
            </div>
            <small className="text-grey-6 my-3 d-block">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus
              pellentes
            </small>
            <button className="button-gradient py-1 px-3 mt-2">
              <p>Explore</p>
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MoreFeatures;
