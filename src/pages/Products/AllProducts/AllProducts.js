import React, { useMemo } from "react";
import PropTypes from "prop-types";
import "./AllProducts.scss";
import { useDropzone } from "react-dropzone";
import { Link } from "react-router-dom";
// ! IMAGES IMPORTS
import indiaFlag from "../../../assets/images/products/indiaFlag.svg";
import teamMember1 from "../../../assets/images/products/teamMember1.svg";
import teamMember2 from "../../../assets/images/products/teamMember2.svg";
import teamMember3 from "../../../assets/images/products/teamMember3.svg";
import columns from "../../../assets/icons/columns.svg";
import cancel from "../../../assets/icons/cancel.svg";
import tutorial from "../../../assets/icons/tutorial.svg";
import verticalDots from "../../../assets/icons/verticalDots.svg";
import allFlag from "../../../assets/images/products/allFlag.svg";
import usaFlag from "../../../assets/images/products/usaFlag.svg";
import ukFlag from "../../../assets/images/products/ukFlag.svg";
import ringSmall from "../../../assets/images/ringSmall.svg";
import arrowDown from "../../../assets/icons/arrowDown.svg";
import arrowDownBlack from "../../../assets/icons/arrowDownBlack.svg";
import sortBy from "../../../assets/icons/sortBy.svg";
import activity from "../../../assets/icons/activity.svg";
import sort from "../../../assets/icons/sort.svg";
import uploadLineSheet from "../../../assets/images/products/uploadLineSheet.svg";
import uploadCompanySheet1 from "../../../assets/images/products/uploadCompanySheet1.svg";
import uploadCompanySheet2 from "../../../assets/images/products/uploadCompanySheet2.svg";
import filter from "../../../assets/icons/filter.svg";
import editButton from "../../../assets/icons/editButton.svg";
import editProductsButton from "../../../assets/icons/editProductsButton.svg";
import duplicateButton from "../../../assets/icons/duplicateButton.svg";
import deleteRed from "../../../assets/icons/delete.svg";
// ! MATERIAL IMPORTS
import {
  Autocomplete,
  Box,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  Paper,
  Popover,
  Radio,
  RadioGroup,
  Slide,
  SwipeableDrawer,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Tabs,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { visuallyHidden } from "@mui/utils";
import InputBase from "@mui/material/InputBase";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
// ! MATERIAL ICONS IMPORTS
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";

// ? SEARCH INPUT STARTS HERE
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
    // marginLeft: theme.spacing(1),
    marginLeft: 0,
    width: "auto",
  },
  backgroundColor: "#1c1b33",
  height: "37.6px",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingLeft: theme.spacing(1.5),
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1.2, 1, 1, 0),
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
// ? SEARCH INPUT ENDS HERE

// ? TABS STARTS HERE
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
// ? TABS ENDS HERE

// ? TABLE STARTS HERE
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
    "Fringe Diamond Ring",
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

// ? FILTER ACCORDIAN STARTS HERE
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  // border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem", color: "#c8d8ff" }} />
    }
    {...props}
  />
))(({ theme }) => ({
  // backgroundColor:
  //   theme.palette.mode === "dark"
  //     ? "rgba(255, 255, 255, .05)"
  //     : "rgba(0, 0, 0, .03)",
  // flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
    // marginRight: theme.spacing(1),
  },
  "& .MuiAccordionSummary-content": {
    // marginLeft: theme.spacing(1),
    padding: "0px",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  // padding: theme.spacing(2),

  padding: "0 16px ",
  // borderTop: "1px solid rgba(0, 0, 0, .125)",
}));
// ? FILTER ACCORDIAN ENDS HERE

// ? DIALOG TRANSITION STARTS HERE
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// ? DIALOG TRANSITION ENDS HERE

// ? FILE UPLOAD STARTS HERE
const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "0",
  borderWidth: 2,
  borderRadius: 8,
  borderColor: "#5C6D8E",
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

const AllProducts = () => {
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

  const [value, setValue] = React.useState(0);
  const [importValue, setImportValue] = React.useState("importProducts");
  const [importSecondValue, setImportSecondValue] =
    React.useState("uploadLineSheet");

  const handleImportChange = (event, newValue) => {
    setImportValue(newValue);
  };
  const handleImportSecondChange = (event, newValue) => {
    setImportSecondValue(newValue);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // ? FILTER DRAWER STARTS HERE
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  // ? FILTER DRAWER ENDS HERE

  // ? ACTIVITY DRAWER STARTS HERE
  const [activityDrawer, setActivityDrawer] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleActivityDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setActivityDrawer({ ...state, [anchor]: open });
  };
  // ? ACTIVITY DRAWER ENDS HERE

  // ? POPOVERS STARTS HERE

  // * FLAG POPOVERS STARTS
  const [anchorFlagEl, setAnchorFlagEl] = React.useState(null);
  const handleFlagClick = (event) => {
    setAnchorFlagEl(event.currentTarget);
  };
  const handleFlagClose = () => {
    setAnchorFlagEl(null);
  };
  const openFlag = Boolean(anchorFlagEl);
  const idFlag = openFlag ? "simple-popover" : undefined;
  // * FLAG POPOVERS ENDS

  // * EDIT STATUS POPOVERS STARTS
  const [anchorEditStatusEl, setAnchorEditStatusEl] = React.useState(null);
  const handleEditStatusClick = (event) => {
    setAnchorEditStatusEl(event.currentTarget);
  };
  const handleEditStatusClose = () => {
    setAnchorEditStatusEl(null);
  };
  const openEditStatus = Boolean(anchorEditStatusEl);
  const idEditStatus = openEditStatus ? "simple-popover" : undefined;
  // * EDIT STATUS POPOVERS ENDS

  // * MASS ACTION POPOVERS STARTS
  const [anchorMassActionEl, setAnchorMassActionEl] = React.useState(null);
  const handleMassActionClick = (event) => {
    setAnchorMassActionEl(event.currentTarget);
  };
  const handleMassActionClose = () => {
    setAnchorMassActionEl(null);
  };
  const openMassAction = Boolean(anchorMassActionEl);
  const idMassAction = openMassAction ? "simple-popover" : undefined;
  // * MASS ACTION POPOVERS ENDS

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

  // * COLUMNS POPOVERS STARTS
  const [anchorColumnsEl, setAnchorColumnsEl] = React.useState(null);

  const handleColumnsClick = (event) => {
    setAnchorColumnsEl(event.currentTarget);
  };

  const handleColumnsClose = () => {
    setAnchorColumnsEl(null);
  };

  const openColumns = Boolean(anchorColumnsEl);
  const idColumns = openColumns ? "simple-popover" : undefined;
  // * COLUMNS POPOVERS ENDS

  // * SORT POPOVERS STARTS
  const [anchorSortEl, setAnchorSortEl] = React.useState(null);

  const handleSortClick = (event) => {
    setAnchorSortEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setAnchorSortEl(null);
  };

  const openSort = Boolean(anchorSortEl);
  const idSort = openSort ? "simple-popover" : undefined;
  // * SORT POPOVERS ENDS

  // * VENDOR POPOVERS STARTS
  const [anchorVendorEl, setAnchorVendorEl] = React.useState(null);

  const handleVendorClick = (event) => {
    setAnchorVendorEl(event.currentTarget);
  };

  const handleVendorClose = () => {
    setAnchorVendorEl(null);
  };

  const openVendor = Boolean(anchorVendorEl);
  const idVendor = openVendor ? "simple-popover" : undefined;
  // * VENDOR POPOVERS ENDS

  // * CATEGORY POPOVERS STARTS
  const [anchorCategoryEl, setAnchorCategoryEl] = React.useState(null);

  const handleCategoryClick = (event) => {
    setAnchorCategoryEl(event.currentTarget);
  };

  const handleCategoryClose = () => {
    setAnchorCategoryEl(null);
  };

  const openCategory = Boolean(anchorCategoryEl);
  const idCategory = openCategory ? "simple-popover" : undefined;
  // * CATEGORY POPOVERS ENDS

  // * TAGGED WITH POPOVERS STARTS
  const [anchorTaggedWithEl, setAnchorTaggedWithEl] = React.useState(null);

  const handleTaggedWithClick = (event) => {
    setAnchorTaggedWithEl(event.currentTarget);
  };

  const handleTaggedWithClose = () => {
    setAnchorTaggedWithEl(null);
  };

  const openTaggedWith = Boolean(anchorTaggedWithEl);
  const idTaggedWith = openTaggedWith ? "simple-popover" : undefined;
  // * TAGGED WITH POPOVERS ENDS

  // * ACTIVITY POPOVERS STARTS
  // const [anchorActivityEl, setAnchorActivityEl] = React.useState(null);

  // const handleActivityPopoverOpen = (event) => {
  //   setAnchorActivityEl(event.currentTarget);
  // };

  // const handleActivityPopoverClose = () => {
  //   setAnchorActivityEl(null);
  // };

  // const openActivity = Boolean(anchorActivityEl);
  // const idActivity = openActivity ? "simple-popover" : undefined;
  // * ACTIVITY POPOVERS ENDS

  // ? POPOVERS ENDS HERE

  const vendorData = [
    { title: "Content 1", value: "content1" },
    { title: "Content 2", value: "content2" },
    { title: "Content 3", value: "content3" },
    { title: "Content 4", value: "content4" },
    { title: "Content 5", value: "content5" },
    { title: "Content 6", value: "content6" },
    { title: "Content 7", value: "content7" },
    { title: "Content 8", value: "content8" },
    { title: "Content 9", value: "content9" },
    { title: "Content 10", value: "content10" },
    { title: "Content 11", value: "content11" },
    { title: "Content 12", value: "content12" },
  ];
  const taggedWithData = [
    { title: "Tag 1", value: "tag1" },
    { title: "Tag 2", value: "tag2" },
    { title: "Tag 3", value: "tag3" },
    { title: "Tag 4", value: "tag4" },
    { title: "Tag 5", value: "tag5" },
    { title: "Tag 6", value: "tag6" },
    { title: "Tag 7", value: "tag7" },
    { title: "Tag 8", value: "tag8" },
    { title: "Tag 9", value: "tag9" },
    { title: "Tag 10", value: "tag10" },
    { title: "Tag 11", value: "tag11" },
    { title: "Tag 12", value: "tag12" },
  ];
  const activityData = [
    {
      id: 1,
      dateAndTime: "25 July, 2022 at 12:00 pm",
      user: "Saniya Shaikh",
      activity: "Changed Images",
    },
    {
      id: 2,
      dateAndTime: "25 July, 2022 at 12:00 pm",
      user: "Saniya Shaikh",
      activity: "Changed Images",
    },
    {
      id: 3,
      dateAndTime: "25 July, 2022 at 12:00 pm",
      user: "Saniya Shaikh",
      activity: "Changed Images",
    },
    {
      id: 4,
      dateAndTime: "25 July, 2022 at 12:00 pm",
      user: "Saniya Shaikh",
      activity: "Changed Images",
    },
    {
      id: 5,
      dateAndTime: "25 July, 2022 at 12:00 pm",
      user: "Saniya Shaikh",
      activity: "Changed Images",
    },
    {
      id: 6,
      dateAndTime: "25 July, 2022 at 12:00 pm",
      user: "Saniya Shaikh",
      activity: "Changed Images",
    },
    {
      id: 7,
      dateAndTime: "25 July, 2022 at 12:00 pm",
      user: "Saniya Shaikh",
      activity: "Changed Images",
    },
    {
      id: 8,
      dateAndTime: "25 July, 2022 at 12:00 pm",
      user: "Saniya Shaikh",
      activity: "Changed Images",
    },
    {
      id: 9,
      dateAndTime: "25 July, 2022 at 12:00 pm",
      user: "Saniya Shaikh",
      activity: "Changed Images",
    },
    {
      id: 10,
      dateAndTime: "25 July, 2022 at 12:00 pm",
      user: "Saniya Shaikh",
      activity: "Changed Images",
    },
    {
      id: 11,
      dateAndTime: "25 July, 2022 at 12:00 pm",
      user: "Saniya Shaikh",
      activity: "Changed Images",
    },
    {
      id: 12,
      dateAndTime: "25 July, 2022 at 12:00 pm",
      user: "Saniya Shaikh",
      activity: "Changed Images",
    },
    {
      id: 13,
      dateAndTime: "25 July, 2022 at 12:00 pm",
      user: "Saniya Shaikh",
      activity: "Changed Images",
    },
    {
      id: 14,
      dateAndTime: "25 July, 2022 at 12:00 pm",
      user: "Saniya Shaikh",
      activity: "Changed Images",
    },
    {
      id: 15,
      dateAndTime: "25 July, 2022 at 12:00 pm",
      user: "Saniya Shaikh",
      activity: "Changed Images",
    },
    {
      id: 16,
      dateAndTime: "25 July, 2022 at 12:00 pm",
      user: "Saniya Shaikh",
      activity: "Changed Images",
    },
    {
      id: 17,
      dateAndTime: "25 July, 2022 at 12:00 pm",
      user: "Saniya Shaikh",
      activity: "Changed Images",
    },
    {
      id: 18,
      dateAndTime: "25 July, 2022 at 12:00 pm",
      user: "Saniya Shaikh",
      activity: "Changed Images",
    },
    {
      id: 19,
      dateAndTime: "25 July, 2022 at 12:00 pm",
      user: "Saniya Shaikh",
      activity: "Changed Images",
    },
    {
      id: 20,
      dateAndTime: "25 July, 2022 at 12:00 pm",
      user: "Saniya Shaikh",
      activity: "Changed Images",
    },
    {
      id: 21,
      dateAndTime: "25 July, 2022 at 12:00 pm",
      user: "Saniya Shaikh",
      activity: "Changed Images",
    },
  ];

  // ? FILTER ACCORDIAN STARTS HERE
  const [expanded, setExpanded] = React.useState("panel1");

  const handleAccordianChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  // ? FILTER ACCORDIAN ENDS HERE

  // ? EXPORT DIALOG STARTS HERE
  const [openExport, setOpenExport] = React.useState(false);

  const handleExportOpen = () => {
    setOpenExport(true);
  };

  const handleExportClose = () => {
    setOpenExport(false);
  };
  // ? EXPORT DIALOG ENDS HERE

  // ? IMPORT DIALOG STARTS HERE
  const [openImport, setOpenImport] = React.useState(false);

  const handleImportOpen = () => {
    setOpenImport(true);
  };

  const handleImportClose = () => {
    setOpenImport(false);
  };
  // ? IMPORT DIALOG ENDS HERE

  // ? IMPORT SECOND DIALOG STARTS HERE
  const [openImportSecond, setOpenImportSecond] = React.useState(false);

  const handleImportSecondOpen = () => {
    setOpenImport(false);
    setOpenImportSecond(true);
  };

  const handleImportSecondClose = () => {
    setOpenImportSecond(false);
  };
  // ? IMPORT SECOND DIALOG ENDS HERE

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

  return (
    <div className="container-fluid page">
      <div className="row justify-content-between align-items-center">
        <h4 className="page-heading w-auto ps-0">All Products</h4>
        <div className="d-flex align-items-center w-auto pe-0">
          <button className="button-transparent me-1 py-2 px-3">
            <img src={tutorial} alt="tutorial" className="me-2" width={20} />
            <p className="text-blue-gradient">Tutorial</p>
          </button>
          <button
            className="button-transparent me-1 py-2 px-3"
            onClick={handleExportOpen}
          >
            <p className="text-lightBlue">Export</p>
          </button>

          <button
            className="button-transparent me-3 py-2 px-3 me-3"
            onClick={handleImportOpen}
          >
            <p className="text-lightBlue">Import</p>
          </button>
          <Link to="/addProduct" className="button-gradient py-2 px-4">
            <p>+ Add Product</p>
          </Link>
        </div>
        <Dialog
          open={openExport}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleExportClose}
          aria-describedby="alert-dialog-slide-description"
          maxWidth="sm"
          fullWidth={true}
        >
          <DialogTitle>
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="text-lightBlue">Export Products</h5>
              <img
                src={cancel}
                alt="cancel"
                width={30}
                onClick={handleExportClose}
                className="c-pointer"
              />
            </div>
          </DialogTitle>
          <hr className="hr-grey-6 my-0" />
          <DialogContent className="py-2 px-4">
            <p className="text-lightBlue mb-2">Export</p>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="currentPage"
                  control={<Radio size="small" />}
                  label="Current Page"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: 13,
                      color: "#c8d8ff",
                    },
                  }}
                />
                <FormControlLabel
                  value="allProducts"
                  control={<Radio size="small" />}
                  label="All Products"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: 13,
                      color: "#c8d8ff",
                    },
                  }}
                />
              </RadioGroup>
            </FormControl>
            <p className="text-lightBlue mb-2 mt-3">Export as</p>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="csvForExcel"
                  control={<Radio size="small" />}
                  label="CSV for Excel, Number or other Spreadsheet program"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: 13,
                      color: "#c8d8ff",
                    },
                  }}
                />
                <FormControlLabel
                  value="plainCsvFile"
                  control={<Radio size="small" />}
                  label="Plain CSV File"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: 13,
                      color: "#c8d8ff",
                    },
                  }}
                />
              </RadioGroup>
            </FormControl>
            <p className="text-lightBlue mb-2 mt-3">HTML format</p>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="normalText"
                  control={<Radio size="small" />}
                  label="Normal Text"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: 13,
                      color: "#c8d8ff",
                    },
                  }}
                />
                <FormControlLabel
                  value="htmlCodedText"
                  control={<Radio size="small" />}
                  label="HTML Coded Text"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: 13,
                      color: "#c8d8ff",
                    },
                  }}
                />
              </RadioGroup>
            </FormControl>
          </DialogContent>
          <hr className="hr-grey-6 my-0" />
          <DialogActions className="d-flex justify-content-between px-4 py-3">
            <button
              className="button-grey py-2 px-5"
              onClick={handleExportClose}
            >
              <p className="text-lightBlue">Cancel</p>
            </button>
            <button
              className="button-gradient py-2 px-5"
              onClick={handleExportClose}
            >
              <p className="">Continue</p>
            </button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openImport}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleImportClose}
          aria-describedby="alert-dialog-slide-description"
          maxWidth="sm"
          fullWidth={true}
        >
          <DialogTitle>
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="text-lightBlue">Import Products</h5>
              <img
                src={cancel}
                alt="cancel"
                width={30}
                onClick={handleImportClose}
                className="c-pointer"
              />
            </div>
          </DialogTitle>
          <hr className="hr-grey-6 my-0" />
          <DialogContent className="py-2 px-4">
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={importValue}
                onChange={handleImportChange}
              >
                <FormControlLabel
                  value="importProducts"
                  control={<Radio size="small" />}
                  label="Import Products from Existing Site"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: 13,
                      color: "#c8d8ff",
                    },
                  }}
                />
                <FormControlLabel
                  value="bulkImportProducts"
                  control={<Radio size="small" />}
                  label="Bulk Import Products"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: 13,
                      color: "#c8d8ff",
                    },
                  }}
                />
              </RadioGroup>
            </FormControl>
          </DialogContent>
          <hr className="hr-grey-6 my-0" />
          <DialogActions className="d-flex justify-content-between px-4 py-3">
            <button
              className="button-grey py-2 px-5"
              onClick={handleImportClose}
            >
              <p>Cancel</p>
            </button>
            <button
              className="button-gradient py-2 px-5"
              onClick={handleImportSecondOpen}
            >
              <p>Continue</p>
            </button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openImportSecond}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleImportSecondClose}
          aria-describedby="alert-dialog-slide-description"
          maxWidth="sm"
          fullWidth={true}
        >
          <DialogTitle>
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="text-lightBlue">Import Products</h5>
              <img
                src={cancel}
                alt="cancel"
                width={30}
                onClick={handleImportSecondClose}
                className="c-pointer"
              />
            </div>
          </DialogTitle>
          <hr className="hr-grey-6 my-0" />
          <DialogContent className="py-2 px-4">
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={importSecondValue}
                onChange={handleImportSecondChange}
              >
                <FormControlLabel
                  value="uploadCompanySheet"
                  control={<Radio size="small" />}
                  label="Upload Company line sheet"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: 13,
                      color: "#c8d8ff",
                    },
                  }}
                />

                {importSecondValue === "uploadCompanySheet" && (
                  <div className="d-flex flex-column">
                    <small className="text-grey-6"> Note :</small>
                    <small className="text-grey-6">
                      1. Upload the skeleton file and Map it with the Company
                      Data.
                    </small>
                    <small className="text-grey-6">
                      2. You can watch the Tutorial on how to do it.&nbsp;
                      <span className="text-blue-gradient c-pointer">
                        Watch here
                      </span>
                    </small>
                    <small className="text-grey-6">
                      3. Do not upload more than 50 products at a time.
                    </small>
                    <small className="text-grey-6">
                      4. Select the folder containing Product Images with
                      Product folder name equal to SKU
                    </small>
                    <small className="text-grey-6">
                      5. Products should be uploaded successfully.
                    </small>
                    <div {...getRootProps({ style })} className="mt-3">
                      <input
                        id="primary"
                        {...getInputProps()}
                        // onChange={(event) => {
                        //   uploadFileToCloud(event, "primary");
                        //   event.target.value = null;
                        // }}
                      />
                      <img src={uploadCompanySheet1} className="w-100" alt="" />
                    </div>
                    <small className="mt-2 text-lightBlue">
                      Don't have our line sheet?&nbsp;
                      <span className="text blue-gradient c-pointer">
                        Download here
                      </span>
                    </small>
                    <div {...getRootProps({ style })} className="mt-3 mb-3">
                      <input
                        id="primary"
                        {...getInputProps()}
                        // onChange={(event) => {
                        //   uploadFileToCloud(event, "primary");
                        //   event.target.value = null;
                        // }}
                      />
                      <img src={uploadCompanySheet2} className="w-100" alt="" />
                    </div>
                  </div>
                )}
                <FormControlLabel
                  value="uploadLineSheet"
                  control={<Radio size="small" />}
                  label="Upload your own line sheet"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: 13,
                      color: "#c8d8ff",
                    },
                  }}
                />
              </RadioGroup>
            </FormControl>
            {importSecondValue === "uploadLineSheet" && (
              <div className="d-flex flex-column">
                <small className="text-grey-6"> Note :</small>
                <small className="text-grey-6">
                  1. Upload the skeleton file and Map it with the Company Data.
                </small>
                <small className="text-grey-6">
                  2. You can watch the Tutorial on how to do it.&nbsp;
                  <span className="text-blue-gradient c-pointer">
                    Watch here
                  </span>
                </small>
                <small className="text-grey-6">
                  3. Do not upload more than 50 products at a time.
                </small>
                <small className="text-grey-6">
                  4. Select the folder containing Product Images with Product
                  folder name equal to SKU
                </small>
                <small className="text-grey-6">
                  5. Products should be uploaded successfully.
                </small>
                {/* <div className="col-3 col-md-2 d-flex justify-content-center align-items-center"> */}
                <div {...getRootProps({ style })} className="mt-3">
                  <input
                    id="primary"
                    {...getInputProps()}
                    // onChange={(event) => {
                    //   uploadFileToCloud(event, "primary");
                    //   event.target.value = null;
                    // }}
                  />
                  <img src={uploadLineSheet} className="w-100" alt="" />
                </div>
                <small className="mt-2 text-lightBlue">
                  Please make sure to leave a single row at the top of the Sheet
                </small>
                {/* </div> */}
              </div>
            )}
          </DialogContent>
          <hr className="hr-grey-6 my-0" />
          <DialogActions className="d-flex justify-content-between px-4 py-3">
            <button
              className="button-grey py-2 px-5"
              onClick={handleImportSecondClose}
            >
              <p>Cancel</p>
            </button>
            <button
              className="button-gradient py-2 px-5"
              onClick={handleImportSecondClose}
            >
              <p>Continue</p>
            </button>
          </DialogActions>
        </Dialog>
      </div>
      <div className="row">
        <Paper
          sx={{ width: "100%", mb: 2, mt: 3, p: 0 }}
          className="border-grey-5 bg-black-15"
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
              <p className="mx-2 text-lightBlue">India</p>
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
              <div className="d-flex align-items-center c-pointer hover-back px-3 py-1 my-1 rounded-3">
                <img src={allFlag} alt="allFlag" height={20} />
                <p className="ms-2 text-lightBlue">All</p>
              </div>
              <div className="d-flex align-items-center c-pointer hover-back px-3 py-1 my-1 rounded-3">
                <img src={ukFlag} alt="usaFlag" height={15} />
                <p className="ms-2 text-lightBlue">UK</p>
              </div>
              <div className="d-flex align-items-center c-pointer hover-back px-3 py-1 my-1 rounded-3">
                <img src={usaFlag} alt="usaFlag" height={15} />
                <p className="ms-2 text-lightBlue">USA</p>
              </div>
            </Popover>
          </Box>
          <div className="d-flex align-items-center mt-3 mb-3 px-2 justify-content-between">
            <Search>
              <SearchIconWrapper>
                <SearchIcon sx={{ color: "#c8d8ff" }} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <div className="d-flex">
              <div className="d-flex product-button__box ms-2">
                <button
                  className="button-grey py-2 px-3 d-none d-md-block"
                  aria-describedby={idVendor}
                  variant="contained"
                  onClick={handleVendorClick}
                >
                  <small className="text-lightBlue">Vendor</small>
                  <img src={arrowDown} alt="arrowDown" className="ms-2" />
                </button>
                <Popover
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "left",
                    horizontal: "left",
                  }}
                  id={idVendor}
                  open={openVendor}
                  anchorEl={anchorVendorEl}
                  onClose={handleVendorClose}
                >
                  <div className="autocomplete-padding">
                    <Autocomplete
                      id="free-solo-demo"
                      freeSolo
                      size="small"
                      // sx={{ width: 200 }}
                      options={vendorData}
                      getOptionLabel={(option) => option.title}
                      renderOption={(props, option) => (
                        <li {...props}>
                          <small className="text-lightBlue my-1">
                            {option.title}
                          </small>
                        </li>
                      )}
                      sx={{
                        width: 200,
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Search"
                          inputRef={(input) => input?.focus()}
                          // InputProps={{
                          //   startAdornment: (
                          //     <InputAdornment position="start">
                          //       <AccountCircle />
                          //     </InputAdornment>
                          //   ),
                          // }}
                        />
                      )}
                    />
                  </div>
                </Popover>
                <button
                  className="button-grey py-2 px-3 d-none d-md-block"
                  aria-describedby={idCategory}
                  variant="contained"
                  onClick={handleCategoryClick}
                >
                  <small className="text-lightBlue">Category</small>
                  <img src={arrowDown} alt="arrowDown" className="ms-2" />
                </button>
                <Popover
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "left",
                    horizontal: "left",
                  }}
                  id={idCategory}
                  open={openCategory}
                  anchorEl={anchorCategoryEl}
                  onClose={handleCategoryClose}
                >
                  <Autocomplete
                    id="free-solo-demo"
                    freeSolo
                    size="small"
                    sx={{ width: 200 }}
                    options={vendorData}
                    getOptionLabel={(option) => option.title}
                    renderOption={(props, option) => (
                      <li {...props}>
                        <small className="text-lightBlue my-1">
                          {option.title}
                        </small>
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Search"
                        inputRef={(input) => input?.focus()}
                        // InputProps={{
                        //   startAdornment: (
                        //     <InputAdornment position="start">
                        //       <AccountCircle />
                        //     </InputAdornment>
                        //   ),
                        // }}
                      />
                    )}
                  />
                </Popover>

                <button
                  className="button-grey py-2 px-3 d-none d-md-block"
                  aria-describedby={idTaggedWith}
                  variant="contained"
                  onClick={handleTaggedWithClick}
                >
                  <small className="text-lightBlue">Tagged With</small>
                  <img src={arrowDown} alt="arrowDown" className="ms-2" />
                </button>

                <Popover
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "left",
                    horizontal: "left",
                  }}
                  id={idTaggedWith}
                  open={openTaggedWith}
                  anchorEl={anchorTaggedWithEl}
                  onClose={handleTaggedWithClose}
                >
                  <Autocomplete
                    multiple
                    id="checkboxes-tags-demo"
                    sx={{ width: 300 }}
                    options={taggedWithData}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.title}
                    size="small"
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                          checkedIcon={<CheckBoxIcon fontSize="small" />}
                          checked={selected}
                          size="small"
                          style={{
                            color: "#5C6D8E",
                            marginRight: 0,
                          }}
                        />
                        <small className="text-lightBlue">{option.title}</small>
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField
                        size="small"
                        {...params}
                        placeholder="Search"
                        inputRef={(input) => input?.focus()}
                      />
                    )}
                  />
                </Popover>

                <React.Fragment key="right">
                  <button
                    className="button-grey py-2 px-3"
                    onClick={toggleDrawer("right", true)}
                  >
                    <small className="text-lightBlue">More Filters</small>
                    <img src={filter} alt="filter" className="ms-2" />
                  </button>
                  <SwipeableDrawer
                    anchor="right"
                    open={state["right"]}
                    onClose={toggleDrawer("right", false)}
                    onOpen={toggleDrawer("right", true)}
                  >
                    {/* {list()} */}
                    <div className="d-flex justify-content-between py-3 px-3 ms-3 me-2">
                      <h6 className="text-lightBlue">Filters</h6>
                      <img
                        src={cancel}
                        alt="cancel"
                        className="c-pointer filter-padding me-1"
                        onClick={toggleDrawer("right", false)}
                      />
                    </div>

                    <div className="px-3">
                      <Accordion
                        expanded={expanded === "panel1"}
                        onChange={handleAccordianChange("panel1")}
                      >
                        <AccordionSummary
                          aria-controls="panel1d-content"
                          id="panel1d-header"
                        >
                          <p className="text-lightBlue">Product Category</p>
                        </AccordionSummary>
                        <AccordionDetails>
                          <p className="mb-2 text-grey-6">Content 1</p>
                          <p className="mb-2 text-grey-6">Content 2</p>
                          <p className="mb-2 text-grey-6">Content 3</p>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion
                        expanded={expanded === "panel2"}
                        onChange={handleAccordianChange("panel2")}
                      >
                        <AccordionSummary
                          aria-controls="panel2d-content"
                          id="panel2d-header"
                        >
                          <p className="text-lightBlue">Sub Category</p>
                        </AccordionSummary>
                        <AccordionDetails>
                          <p className="mb-2 text-grey-6">Content 1</p>
                          <p className="mb-2 text-grey-6">Content 2</p>
                          <p className="mb-2 text-grey-6">Content 3</p>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion
                        expanded={expanded === "panel3"}
                        onChange={handleAccordianChange("panel3")}
                      >
                        <AccordionSummary
                          aria-controls="panel3d-content"
                          id="panel3d-header"
                        >
                          <p className="text-lightBlue">Vendor</p>
                        </AccordionSummary>
                        <AccordionDetails>
                          <p className="mb-2 text-grey-6">Content 1</p>
                          <p className="mb-2 text-grey-6">Content 2</p>
                          <p className="mb-2 text-grey-6">Content 3</p>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion
                        expanded={expanded === "panel4"}
                        onChange={handleAccordianChange("panel4")}
                      >
                        <AccordionSummary
                          aria-controls="panel4d-content"
                          id="panel4d-header"
                        >
                          <p className="text-lightBlue">Collection</p>
                        </AccordionSummary>
                        <AccordionDetails>
                          <p className="mb-2 text-grey-6">Content 1</p>
                          <p className="mb-2 text-grey-6">Content 2</p>
                          <p className="mb-2 text-grey-6">Content 3</p>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion
                        expanded={expanded === "panel5"}
                        onChange={handleAccordianChange("panel5")}
                      >
                        <AccordionSummary
                          aria-controls="panel5d-content"
                          id="panel5d-header"
                        >
                          <p className="text-lightBlue">Tagged With</p>
                        </AccordionSummary>
                        <AccordionDetails>
                          <p className="mb-2 text-grey-6">Content 1</p>
                          <p className="mb-2 text-grey-6">Content 2</p>
                          <p className="mb-2 text-grey-6">Content 3</p>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion
                        expanded={expanded === "panel6"}
                        onChange={handleAccordianChange("panel6")}
                      >
                        <AccordionSummary
                          aria-controls="panel6d-content"
                          id="panel6d-header"
                        >
                          <p className="text-lightBlue">Product Status</p>
                        </AccordionSummary>
                        <AccordionDetails>
                          <p className="mb-2 text-grey-6">Content 1</p>
                          <p className="mb-2 text-grey-6">Content 2</p>
                          <p className="mb-2 text-grey-6">Content 3</p>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion
                        expanded={expanded === "panel7"}
                        onChange={handleAccordianChange("panel7")}
                      >
                        <AccordionSummary
                          aria-controls="panel7d-content"
                          id="panel7d-header"
                        >
                          <p className="text-lightBlue">Inventory</p>
                        </AccordionSummary>
                        <AccordionDetails>
                          <p className="mb-2 text-grey-6">Content 1</p>
                          <p className="mb-2 text-grey-6">Content 2</p>
                          <p className="mb-2 text-grey-6">Content 3</p>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion
                        expanded={expanded === "panel8"}
                        onChange={handleAccordianChange("panel8")}
                      >
                        <AccordionSummary
                          aria-controls="panel8d-content"
                          id="panel8d-header"
                        >
                          <p className="text-lightBlue">Labels</p>
                        </AccordionSummary>
                        <AccordionDetails>
                          <p className="mb-2 text-grey-6">Content 1</p>
                          <p className="mb-2 text-grey-6">Content 2</p>
                          <p className="mb-2 text-grey-6">Content 3</p>
                        </AccordionDetails>
                      </Accordion>
                    </div>

                    <div className="d-flex flex-column py-3 px-4 filter-buttons">
                      <hr className="hr-grey-6 my-3 w-100" />
                      <div className="d-flex justify-content-between">
                        <button className="button-lightBlue-outline py-2 px-3">
                          <p>Clear all Filters</p>
                        </button>
                        <button className="button-gradient py-2 px-5 w-auto ">
                          <p>Done</p>
                        </button>
                      </div>
                    </div>
                  </SwipeableDrawer>
                </React.Fragment>
              </div>
              <button
                className="button-grey py-2 px-3 ms-2"
                aria-describedby={idSort}
                variant="contained"
                onClick={handleSortClick}
              >
                <small className="text-lightBlue me-2">Sort</small>
                <img src={sort} alt="sort" className="" />
              </button>
              <button
                className="button-grey py-2 px-3 ms-2"
                aria-describedby={idColumns}
                variant="contained"
                onClick={handleColumnsClick}
              >
                <small className="text-lightBlue">Columns</small>
                <img src={columns} alt="columns" className="ms-2" />
              </button>

              <Popover
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                id={idSort}
                open={openSort}
                anchorEl={anchorSortEl}
                onClose={handleSortClose}
                className="columns"
              >
                <FormControl className="px-3">
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    // value={value}
                    // onChange={handleRadioChange}
                  >
                    <FormControlLabel
                      value="productName"
                      control={<Radio size="small" />}
                      label="Product Name"
                    />
                    <FormControlLabel
                      value="category"
                      control={<Radio size="small" />}
                      label="Category"
                    />
                    <FormControlLabel
                      value="subCategory"
                      control={<Radio size="small" />}
                      label="Sub Category"
                    />
                    <FormControlLabel
                      value="vendor"
                      control={<Radio size="small" />}
                      label="Vendor"
                    />
                    <FormControlLabel
                      value="uploadDate"
                      control={<Radio size="small" />}
                      label="Upload Date"
                    />
                    <FormControlLabel
                      value="alphabeticalAtoZ"
                      control={<Radio size="small" />}
                      label="Alphabetical (A-Z)"
                    />
                    <FormControlLabel
                      value="alphabeticalZtoA"
                      control={<Radio size="small" />}
                      label="Alphabetical (Z-A)"
                    />
                    <FormControlLabel
                      value="oldestToNewest"
                      control={<Radio size="small" />}
                      label="Oldest to Newest"
                    />
                    <FormControlLabel
                      value="newestToOldest"
                      control={<Radio size="small" />}
                      label="Newest to Oldest"
                    />
                  </RadioGroup>
                </FormControl>
              </Popover>

              <Popover
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                id={idColumns}
                open={openColumns}
                anchorEl={anchorColumnsEl}
                onClose={handleColumnsClose}
                className="columns"
              >
                <FormGroup className="px-3">
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked
                        size="small"
                        style={{
                          color: "#5C6D8E",
                        }}
                      />
                    }
                    label="Catgory"
                    className="me-0"
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
                    label="Sub Catgory"
                    className="me-0"
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
                    label="Collection"
                    className="me-0"
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
                    label="Vendor"
                    className="me-0"
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
                    label="Price"
                    className="me-0"
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
                    label="Activity"
                    className="me-0"
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
                    label="Status"
                    className="me-0"
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
                    label="Action"
                    className="me-0"
                  />
                </FormGroup>
              </Popover>
            </div>
          </div>
          {selected.length > 0 && (
            <div className="d-flex justify-content-between align-items-center px-2 mb-3">
              <div className="d-flex">
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

                <button className="button-grey py-2 px-3 ms-2">
                  <small className="text-lightBlue">Edit Product</small>
                </button>
                <button
                  className="button-grey py-2 px-3 ms-2"
                  aria-describedby={idEditStatus}
                  variant="contained"
                  onClick={handleEditStatusClick}
                >
                  <small className="text-lightBlue">Edit Status</small>
                  <img src={arrowDown} alt="arrowDown" className="ms-2" />
                </button>
                <button
                  className="button-grey py-2 px-3 ms-2"
                  aria-describedby={idMassAction}
                  variant="contained"
                  onClick={handleMassActionClick}
                >
                  <small className="text-lightBlue">Mass Action</small>
                  <img src={arrowDown} alt="arrowDown" className="ms-2" />
                </button>

                <Popover
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  id={idEditStatus}
                  open={openEditStatus}
                  anchorEl={anchorEditStatusEl}
                  onClose={handleEditStatusClose}
                >
                  <p className="mb-3 text-blue-1 c-pointer">Set as Active</p>
                  <p className="text-blue-1 c-pointer">Set as Draft</p>
                </Popover>

                <Popover
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  id={idMassAction}
                  open={openMassAction}
                  anchorEl={anchorMassActionEl}
                  onClose={handleMassActionClose}
                >
                  <small className="text-grey-7">ACTION</small>
                  <hr className="hr-grey-6 my-2" />
                  <div className="d-flex align-items-center justify-content-between mb-2 mt-2 text-blue-1">
                    <img
                      src={editProductsButton}
                      alt="editProductsButton"
                      height={36}
                      className="c-pointer"
                    />
                    {/* <img
                      src={duplicateButton}
                      alt="duplicateButton"
                      height={36}
                      className="c-pointer"
                    /> */}
                  </div>
                  <p className="my-3 text-lightBlue c-pointer">
                    Make it Active
                  </p>
                  <p className="my-3 text-lightBlue c-pointer">Make it Draft</p>
                  <p className="my-2 text-lightBlue c-pointer">Edit Quantity</p>
                  <p className="my-2 text-lightBlue c-pointer">Set up Price</p>
                  <small className="text-grey-7">Tags & Collection</small>
                  <hr className="hr-grey-6 my-2" />
                  <p className="my-2 text-lightBlue c-pointer">
                    Add or Remove Tags
                  </p>
                  <p className="my-2 text-lightBlue c-pointer">
                    Add or Remove Collections
                  </p>
                  <div className="d-flex justify-content-between mt-4">
                    <p className="text-lightBlue c-pointer">Archived Product</p>
                    <img src={deleteRed} alt="delete" className="c-pointer" />
                  </div>
                </Popover>
              </div>
              <small
                className=" d-flex text-blue-2 c-pointer"
                onClick={() => setSelected([])}
              >
                Clear Selection
              </small>
            </div>
          )}
          <TabPanel value={value} index={0}>
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
                          className="table-rows"
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                              onClick={(event) => handleClick(event, row.pId)}
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
                            <div className="d-flex align-items-center">
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
                            <div className="d-flex align-items-center">
                              <p className="text-decoration-underline text-blue-2">
                                1452
                              </p>
                              &nbsp;
                              <p className="text-lightBlue"> {row.qty}</p>
                            </div>
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
                                  <small className="ms-2">Rs 15,000</small>
                                </div>
                                <div className="d-flex align-items-center justify-content-between mb-2 mt-2 text-grey-6">
                                  <small>Diamond Price</small>
                                  <small className="ms-2">Rs&nbsp;4,000</small>
                                </div>
                                <div className="d-flex align-items-center justify-content-between mb-2 mt-2 text-grey-6">
                                  <small>Making Charges</small>
                                  <small className="ms-2">Rs&nbsp;1,000</small>
                                </div>
                                <div className="d-flex align-items-center justify-content-between mb-3 mt-2 text-grey-6">
                                  <small>GST</small>
                                  <small className="ms-2">
                                    Rs&nbsp;&nbsp;600
                                  </small>
                                </div>
                                <div className="d-flex align-items-center justify-content-between mb-2 mt-2">
                                  <p className="text-lightBlue">Total</p>
                                  <p className="ms-2 text-lightBlue fw-600">
                                    Rs&nbsp;20,600
                                  </p>
                                </div>
                              </div>
                            </Popover>
                          </TableCell>
                          <TableCell>
                            <div
                              className="d-flex c-pointer"
                              onClick={toggleActivityDrawer("right", true)}
                              // onMouseEnter={handleActivityPopoverOpen}
                              // onMouseLeave={handleActivityPopoverClose}
                            >
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
                                <div className="px-3">
                                  <small className="text-grey-7">ACTION</small>
                                  <hr className="hr-grey-6 my-2" />
                                  <div className="d-flex align-items-center justify-content-between mb-2 mt-2 text-blue-1">
                                    <img
                                      src={editButton}
                                      alt="editButton"
                                      height={36}
                                      className="c-pointer me-2"
                                    />
                                    <img
                                      src={duplicateButton}
                                      alt="duplicateButton"
                                      height={36}
                                      className="c-pointer"
                                    />
                                  </div>
                                  <small className="my-3 text-lightBlue c-pointer font2 d-block">
                                    Make it Active
                                  </small>
                                  <small className="my-3 text-lightBlue c-pointer font2 d-block">
                                    Make it Draft
                                  </small>
                                  <small className="my-3 text-lightBlue c-pointer font2 d-block">
                                    Edit SKU
                                  </small>
                                  <small className="my-3 text-lightBlue c-pointer font2 d-block">
                                    Edit Quantity
                                  </small>
                                  <small className="text-grey-7 mt-4">
                                    Tags & Collection
                                  </small>
                                  <hr className="hr-grey-6 my-2" />
                                  <small className="my-3 text-lightBlue c-pointer font2 d-block">
                                    Add or Remove Tags
                                  </small>
                                  <small className="my-3 text-lightBlue c-pointer font2 d-block">
                                    Add or Remove Collections
                                  </small>
                                  <div className="d-flex justify-content-between mt-3">
                                    <small className="text-lightBlue c-pointer font2 d-block">
                                      Archived Product
                                    </small>
                                    <img
                                      src={deleteRed}
                                      alt="delete"
                                      className="c-pointer"
                                    />
                                  </div>
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
              className="table-pagination"
            />

            <SwipeableDrawer
              anchor="right"
              open={activityDrawer["right"]}
              onClose={toggleActivityDrawer("right", false)}
              onOpen={toggleActivityDrawer("right", true)}
            >
              {/* {list()} */}
              <div className="d-flex justify-content-between py-3 px-3">
                <h6 className="text-lightBlue">Activity Of</h6>
                <img
                  src={cancel}
                  alt="cancel"
                  className="c-pointer filter-padding me-1"
                  onClick={toggleActivityDrawer("right", false)}
                />
              </div>

              <div className="px-3">
                <div className="d-flex align-items-center">
                  <div className="d-flex align-items-center">
                    <img
                      src={ringSmall}
                      alt="ringSmall"
                      className="me-2"
                      height={45}
                      width={45}
                    />
                    <div>
                      <p className="text-lightBlue fw-600">
                        The Fringe Diamond Ring
                      </p>
                      <small className="mt-2 text-grey-6">
                        SKU: TFDR012345
                      </small>
                    </div>
                  </div>
                  <div className="d-flex ms-5">
                    <button className="button-grey py-2 px-3 ms-5">
                      <small className="text-lightBlue">Sort By Date</small>
                      <img src={sortBy} alt="sortBy" className="ms-2" />
                    </button>
                    <button className="button-grey py-2 px-3">
                      <small className="text-lightBlue">Activity</small>
                      <img src={activity} alt="activity" className="ms-2" />
                    </button>
                  </div>
                </div>
                <table class="table table-borderless mt-4">
                  <thead>
                    <tr className="table-grey-bottom table-grey-top">
                      <th scope="col">
                        <small className="text-lightBlue fw-400">User</small>
                      </th>
                      <th scope="col">
                        <small className="text-lightBlue fw-400">
                          Activity
                        </small>
                      </th>
                      <th scope="col">
                        <small className="text-lightBlue fw-400">
                          Date and Time
                        </small>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {activityData.map((data) => (
                      <tr>
                        <th scope="row">
                          <div className="d-flex align-items-center">
                            <img
                              src={teamMember1}
                              alt="teamMember1"
                              className="me-2"
                            />
                            <small className="text-lightBlue fw-400">
                              {data.user}
                            </small>
                          </div>
                        </th>
                        <td>
                          <small className="text-lightBlue">
                            {data.activity}
                          </small>
                        </td>
                        <td>
                          <small className="text-grey-6 fw-400">
                            {data.dateAndTime}
                          </small>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* <div className="d-flex flex-column py-3 px-4 filter-buttons">
                <hr className="hr-grey-6 my-3 w-100" />
                <div className="d-flex justify-content-between">
                  <button className="button-lightBlue-outline py-2 px-3">
                    <p>Clear all Filters</p>
                  </button>
                  <button className="button-gradient py-2 px-5 w-auto ">
                    <p>Done</p>
                  </button>
                </div>
              </div> */}
            </SwipeableDrawer>
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
        </Paper>
      </div>
    </div>
  );
};

export default AllProducts;
