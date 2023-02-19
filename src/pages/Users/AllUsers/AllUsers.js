import React, { useMemo } from "react";
import PropTypes from "prop-types";
import "../../Products/AllProducts/AllProducts.scss";
import { useDropzone } from "react-dropzone";
import { Link } from "react-router-dom";
// ! COMPONENT IMPORTS
import AllUsersTable from "../AllUsersTable/AllUsersTable";
// ! IMAGES IMPORTS
import indiaFlag from "../../../assets/images/products/indiaFlag.svg";
import user from "../../../assets/images/users/user.svg";
import activity from "../../../assets/icons/activity.svg";
import teamMember1 from "../../../assets/images/products/teamMember1.svg";
import cancel from "../../../assets/icons/cancel.svg";
import tutorial from "../../../assets/icons/tutorial.svg";
import allFlag from "../../../assets/images/products/allFlag.svg";
import usaFlag from "../../../assets/images/products/usaFlag.svg";
import ukFlag from "../../../assets/images/products/ukFlag.svg";
import arrowDown from "../../../assets/icons/arrowDown.svg";
import sort from "../../../assets/icons/sort.svg";
import uploadLineSheet from "../../../assets/images/products/uploadLineSheet.svg";
import uploadCompanySheet1 from "../../../assets/images/products/uploadCompanySheet1.svg";
import uploadCompanySheet2 from "../../../assets/images/products/uploadCompanySheet2.svg";
import filter from "../../../assets/icons/filter.svg";
import analyticsUp from "../../../assets/icons/analyticsUp.svg";
import analyticsDown from "../../../assets/icons/analyticsDown.svg";
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
  OutlinedInput,
  Paper,
  Popover,
  Radio,
  RadioGroup,
  Slide,
  SwipeableDrawer,
  Tab,
  Tabs,
  TextField,
  styled,
  InputBase,
} from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// ! MATERIAL ICONS IMPORTS
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";

// ? SEARCH INPUT STARTS HERE
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  "&:hover": {
    backgroundColor: "#1c1b33",
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: 0,
    width: "100%",
  },
  backgroundColor: "#1c1b33",
  height: "37.6px",
  marginRight: "8px",
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
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1.2, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    borderRadius: "5px",
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
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    padding: "0px",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: "0 16px ",
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
  borderColor: "#38395c",
  borderStyle: "dashed",
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

const activityData = [
  {
    id: 1,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniys's status to inactive",
  },
  {
    id: 2,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniys's status to inactive",
  },
  {
    id: 3,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniys's status to inactive",
  },
  {
    id: 4,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniys's status to inactive",
  },
  {
    id: 5,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniys's status to inactive",
  },
  {
    id: 6,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniys's status to inactive",
  },
  {
    id: 7,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniys's status to inactive",
  },
  {
    id: 8,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniys's status to inactive",
  },
  {
    id: 9,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniys's status to inactive",
  },
  {
    id: 10,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniys's status to inactive",
  },
  {
    id: 11,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniys's status to inactive",
  },
  {
    id: 12,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniys's status to inactive",
  },
  {
    id: 13,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniys's status to inactive",
  },
  {
    id: 14,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniys's status to inactive",
  },
  {
    id: 15,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniys's status to inactive",
  },
  {
    id: 16,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniys's status to inactive",
  },
  {
    id: 17,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniys's status to inactive",
  },
  {
    id: 18,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniys's status to inactive",
  },
  {
    id: 19,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniys's status to inactive",
  },
  {
    id: 20,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniys's status to inactive",
  },
  {
    id: 21,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniys's status to inactive",
  },
];

const AllUsers = () => {
  const [value, setValue] = React.useState(0);
  const [valueExport, setExportValue] = React.useState(0);
  const [importValue, setImportValue] = React.useState("importUsers");
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
  const handleExportChange = (event, newValue) => {
    setExportValue(newValue);
  };

  // ? DATE PICKER STARTS

  const [activityDateValue, setActivityDateValue] = React.useState(
    // moment()
    new Date()
  );

  const handleActivityDateChange = (newValue) => {
    setActivityDateValue(newValue);
  };

  // ? DATE PICKER ENDS

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

    setActivityDrawer({ ...activityDrawer, [anchor]: open });
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

  // * LOCATION POPOVERS STARTS
  const [anchorLocationEl, setAnchorLocationEl] = React.useState(null);

  const handleLocationClick = (event) => {
    setAnchorLocationEl(event.currentTarget);
  };

  const handleLocationClose = () => {
    setAnchorLocationEl(null);
  };

  const openLocation = Boolean(anchorLocationEl);
  const idLocation = openLocation ? "simple-popover" : undefined;
  // * LOCATION POPOVERS ENDS

  // * NO OF ORDERS POPOVERS STARTS
  const [anchorOrdersEl, setAnchorOrdersEl] = React.useState(null);

  const handleOrdersClick = (event) => {
    setAnchorOrdersEl(event.currentTarget);
  };

  const handleOrdersClose = () => {
    setAnchorOrdersEl(null);
  };

  const openOrders = Boolean(anchorOrdersEl);
  const idOrders = openOrders ? "simple-popover" : undefined;
  // * NO OF ORDERS POPOVERS ENDS

  // * STATUS POPOVERS STARTS
  const [anchorStatusEl, setAnchorStatusEl] = React.useState(null);

  const handleStatusClick = (event) => {
    setAnchorStatusEl(event.currentTarget);
  };

  const handleStatusClose = () => {
    setAnchorStatusEl(null);
  };

  const openStatus = Boolean(anchorStatusEl);
  const idStatus = openStatus ? "simple-popover" : undefined;
  // * STATUS POPOVERS ENDS

  // * ACTIVITY POPOVERS STARTS
  const [anchorActivityEl, setAnchorActivityEl] = React.useState(null);
  const handleActivityClick = (event) => {
    setAnchorActivityEl(event.currentTarget);
  };
  const handleActivityClose = () => {
    setAnchorActivityEl(null);
  };
  const openActivity = Boolean(anchorActivityEl);
  const idActivity = openActivity ? "simple-popover" : undefined;
  // * ACTIVITY POPOVERS ENDS

  // ? POPOVERS ENDS HERE

  const locationData = [
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

  // * DAYS POPOVERS STARTS
  const [anchorDaysEl, setDaysEl] = React.useState(null);

  const handleDaysClick = (event) => {
    setDaysEl(event.currentTarget);
  };

  const handleDaysClose = () => {
    setDaysEl(null);
  };

  const openDays = Boolean(anchorDaysEl);
  const idDays = openDays ? "simple-popover" : undefined;
  // * DAYS POPOVERS ENDS

  return (
    <div className="container-fluid page">
      <div className="row justify-content-between align-items-center">
        <h4 className="page-heading w-auto ps-0">All Users</h4>
        <div className="d-flex align-items-center w-auto pe-0">
          <button
            className="button-transparent me-1 py-2 px-3"
            onClick={handleDaysClick}
          >
            <p className="text-lightBlue">30 Days</p>
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
            id={idDays}
            open={openDays}
            anchorEl={anchorDaysEl}
            onClose={handleDaysClose}
          >
            <div className="py-2 px-1">
              <small className="text-lightBlue rounded-3 p-2 hover-back d-block">
                Last 7 Days
              </small>
              <small className="text-lightBlue rounded-3 p-2 hover-back d-block">
                Last 15 Days
              </small>
              <small className="text-lightBlue rounded-3 p-2 hover-back d-block">
                Last 30 Days
              </small>
            </div>
          </Popover>
          <button className="button-transparent me-1 py-2 px-3">
            <img src={tutorial} alt="tutorial" className="me-2" width={20} />
            <p className="text-blue-gradient">Tutorial</p>
          </button>
          <button
            className="button-transparent me-1 py-2 px-3"
            onClick={toggleActivityDrawer("right", true)}
            // onClick={handleExportOpen}
          >
            <p className="text-lightBlue">View Logs</p>
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
          <Link to="/addUser" className="button-gradient py-2 px-4">
            <p>+ Add New</p>
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
              <h5 className="text-lightBlue fw-500">Export Users</h5>
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
                value={valueExport}
                onChange={handleExportChange}
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
                  value="currentSelection"
                  control={<Radio size="small" />}
                  label="Current Selection"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: 13,
                      color: "#c8d8ff",
                    },
                  }}
                />
                <FormControlLabel
                  value="allUsers"
                  control={<Radio size="small" />}
                  label="All Users"
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
                value={valueExport}
                onChange={handleExportChange}
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
              <p className="">Export</p>
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
              <h5 className="text-lightBlue fw-500">Import Users</h5>
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
                  value="importUsers"
                  control={<Radio size="small" />}
                  label="Import Users from Existing Site"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: 13,
                      color: "#c8d8ff",
                    },
                  }}
                />
                <FormControlLabel
                  value="bulkImportUsers"
                  control={<Radio size="small" />}
                  label="Bulk Import Users"
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
              <p className="text-lightBlue">Cancel</p>
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
              <h5 className="text-lightBlue fw-500">Import Users</h5>
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
                      3. Do not upload more than 50 users at a time.
                    </small>
                    <small className="text-grey-6">
                      4. Select the folder containing User Images with User
                      folder name equal to SKU
                    </small>
                    <small className="text-grey-6">
                      5. Users should be uploaded successfully.
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
                  3. Do not upload more than 50 users at a time.
                </small>
                <small className="text-grey-6">
                  4. Select the folder containing User Images with User folder
                  name equal to SKU
                </small>
                <small className="text-grey-6">
                  5. Users should be uploaded successfully.
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
                  <img src={uploadLineSheet} className="w-100" alt="" />
                </div>
                <small className="mt-2 text-lightBlue">
                  Please make sure to leave a single row at the top of the Sheet
                </small>
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

        <SwipeableDrawer
          anchor="right"
          open={activityDrawer["right"]}
          onClose={toggleActivityDrawer("right", false)}
          onOpen={toggleActivityDrawer("right", true)}
        >
          <div className="d-flex justify-content-between py-3 px-3">
            <h6 className="text-lightBlue">View Logs</h6>
            <img
              src={cancel}
              alt="cancel"
              className="c-pointer filter-icon me-1"
              onClick={toggleActivityDrawer("right", false)}
            />
          </div>

          <div className="px-3">
            <div className="d-flex align-items-center">
              <div className="d-flex align-items-center">
                <img
                  src={user}
                  alt="user"
                  className="me-2"
                  height={45}
                  width={45}
                />
                <div>
                  <p className="text-lightBlue fw-600">User Module</p>
                  <small className="mt-2 text-grey-6">
                    Last modified on 10 Dec, 2022 by Saniya Shaikh
                  </small>
                </div>
              </div>
              <div className="d-flex ms-5">
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DateTimePicker
                    // label="Sort By Date"
                    value={activityDateValue}
                    onChange={handleActivityDateChange}
                    renderInput={(params) => (
                      <OutlinedInput
                        {...params}
                        placeholder="Enter Date & Time"
                        size="small"
                      />
                    )}
                  />
                </LocalizationProvider>

                <button
                  className="button-grey py-2 px-3"
                  aria-describedby={idActivity}
                  variant="contained"
                  onClick={handleActivityClick}
                >
                  <small className="text-lightBlue">Activity</small>
                  <img src={activity} alt="activity" className="ms-2" />
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
                  id={idActivity}
                  open={openActivity}
                  anchorEl={anchorActivityEl}
                  onClose={handleActivityClose}
                >
                  <div className="py-2 px-1">
                    <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                      Viewed User
                    </small>
                    <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                      Edited User
                    </small>
                    <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                      Updated User Status
                    </small>
                    <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                      Archived User
                    </small>
                    <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                      Added Comments
                    </small>
                  </div>
                </Popover>
              </div>
            </div>
            <table className="table table-borderless mt-4">
              <thead>
                <tr className="table-grey-bottom table-grey-top">
                  <th scope="col">
                    <small className="text-lightBlue fw-400">User</small>
                  </th>
                  <th scope="col">
                    <small className="text-lightBlue fw-400">Activity</small>
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
                  <tr key={data.id}>
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
                      <small className="text-lightBlue">{data.activity}</small>
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
        </SwipeableDrawer>
      </div>

      <div className="row">
        <div className="col-md-3 col-6 ps-0 my-3">
          <div className="border-grey-5 bg-black-15 rounded-8 py-3 px-3">
            <div className="d-flex justify-content-between align-items-end">
              <div className="d-flex flex-column">
                <h2 className="text-lightBlue fw-400">50</h2>
                <small className="text-grey-6 mt-2">Active</small>
              </div>
              <div className="d-flex flex-column align-items-end">
                <img
                  src={analyticsUp}
                  alt="analyticsUp"
                  className=""
                  width={25}
                />
                <small className="text-green-2 mt-2">+10.78 %</small>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-6 ps-0 my-3">
          <div className="border-grey-5 bg-black-15 rounded-8 py-3 px-3">
            <div className="d-flex justify-content-between align-items-end">
              <div className="d-flex flex-column">
                <h2 className="text-lightBlue fw-400">50</h2>
                <small className="text-grey-6 mt-2">In-Active</small>
              </div>
              <div className="d-flex flex-column align-items-end">
                <img
                  src={analyticsDown}
                  alt="analyticsDown"
                  className=""
                  width={25}
                />
                <small className="text-red-4 mt-2">-10.78 %</small>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-6 ps-0 my-3">
          <div className="border-grey-5 bg-black-15 rounded-8 py-3 px-3">
            <div className="d-flex justify-content-between align-items-end">
              <div className="d-flex flex-column">
                <h2 className="text-lightBlue fw-400">50</h2>
                <small className="text-grey-6 mt-2">Returning Users</small>
              </div>
              <div className="d-flex flex-column align-items-end">
                <img
                  src={analyticsUp}
                  alt="analyticsUp"
                  className=""
                  width={25}
                />
                <small className="text-green-2 mt-2">+10.78 %</small>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-6 ps-0 pe-0 my-3">
          <div className="border-grey-5 bg-black-15 rounded-8 py-3 px-3">
            <div className="d-flex justify-content-between align-items-end">
              <div className="d-flex flex-column">
                <h2 className="text-lightBlue fw-400">50</h2>
                <small className="text-grey-6 mt-2">Abandoned Checkout</small>
              </div>
              <div className="d-flex flex-column align-items-end">
                <img
                  src={analyticsDown}
                  alt="analyticsDown"
                  className=""
                  width={25}
                />
                <small className="text-red-4 mt-2">-10.78 %</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <Paper
          sx={{ width: "100%", mb: 2, mt: 0, p: 0 }}
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
              <Tab label="Active" className="tabs-head" />
              <Tab label="New" className="tabs-head" />
              <Tab label="In-Active" className="tabs-head" />
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
              <div className="px-1 py-2">
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
              <div className="d-flex product-button__box">
                <button
                  className="button-grey py-1 px-3 d-none d-md-block"
                  aria-describedby={idLocation}
                  variant="contained"
                  onClick={handleLocationClick}
                >
                  <small className="text-lightBlue">Location</small>
                  <img src={arrowDown} alt="arrowDown" className="ms-2" />
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
                  id={idLocation}
                  open={openLocation}
                  anchorEl={anchorLocationEl}
                  onClose={handleLocationClose}
                >
                  <div className="py-2">
                    <Autocomplete
                      id="free-solo-demo"
                      freeSolo
                      size="small"
                      options={locationData}
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
                        />
                      )}
                    />
                  </div>
                </Popover>
                <button
                  className="button-grey py-1 px-3 d-none d-md-block"
                  aria-describedby={idOrders}
                  variant="contained"
                  onClick={handleOrdersClick}
                >
                  <small className="text-lightBlue">No of Orders</small>
                  <img src={arrowDown} alt="arrowDown" className="ms-2" />
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
                  id={idOrders}
                  open={openOrders}
                  anchorEl={anchorOrdersEl}
                  onClose={handleOrdersClose}
                >
                  <div className="py-2 px-1">
                    <small className="d-block text-lightBlue">
                      Min No. of Order
                    </small>
                    <FormControl className="px-0 mt-1">
                      <OutlinedInput placeholder="Enter Min" size="small" />
                    </FormControl>
                    <small className="d-block text-lightBlue mt-2">
                      Max No. of Order
                    </small>
                    <FormControl className="px-0 mt-1">
                      <OutlinedInput placeholder="Enter Max" size="small" />
                    </FormControl>
                  </div>
                </Popover>

                <button
                  className="button-grey py-1 px-3 d-none d-md-block"
                  aria-describedby={idStatus}
                  variant="contained"
                  onClick={handleStatusClick}
                >
                  <small className="text-lightBlue">Status</small>
                  <img src={arrowDown} alt="arrowDown" className="ms-2" />
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
                  id={idStatus}
                  open={openStatus}
                  anchorEl={anchorStatusEl}
                  onClose={handleStatusClose}
                >
                  <div className=" px-1">
                    <FormGroup className="tags-checkbox">
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            style={{
                              color: "#5C6D8E",
                              marginRight: 0,
                            }}
                          />
                        }
                        label="Active"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            style={{
                              color: "#5C6D8E",
                              marginRight: 0,
                            }}
                          />
                        }
                        label="In-Active"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            style={{
                              color: "#5C6D8E",
                              marginRight: 0,
                            }}
                          />
                        }
                        label="Blocked"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            style={{
                              color: "#5C6D8E",
                              marginRight: 0,
                            }}
                          />
                        }
                        label="Archived"
                      />
                    </FormGroup>
                  </div>
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
                    <div className="d-flex justify-content-between py-3 px-3 ms-2 me-1">
                      <h6 className="text-lightBlue">Filters</h6>
                      <img
                        src={cancel}
                        alt="cancel"
                        className="c-pointer filter-icon"
                        onClick={toggleDrawer("right", false)}
                      />
                    </div>

                    <div className="px-2">
                      <Accordion
                        expanded={expanded === "panel1"}
                        onChange={handleAccordianChange("panel1")}
                      >
                        <AccordionSummary
                          aria-controls="panel1d-content"
                          id="panel1d-header"
                        >
                          <p className="text-lightBlue">Location</p>
                        </AccordionSummary>
                        <AccordionDetails>
                          <RadioGroup
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            // value={recommendedProductRadio}
                            // onChange={handleRecommendedProductRadio}
                          >
                            <FormControlLabel
                              value="1"
                              control={<Radio size="small" />}
                              label="Content 1"
                              sx={{
                                "& .MuiTypography-root": {
                                  fontSize: 13,
                                  color: "#c8d8ff",
                                },
                              }}
                            />
                            <FormControlLabel
                              value="2"
                              control={<Radio size="small" />}
                              label="Content 2"
                              sx={{
                                "& .MuiTypography-root": {
                                  fontSize: 13,
                                  color: "#c8d8ff",
                                },
                              }}
                            />
                            <FormControlLabel
                              value="3"
                              control={<Radio size="small" />}
                              label="Content 3"
                              sx={{
                                "& .MuiTypography-root": {
                                  fontSize: 13,
                                  color: "#c8d8ff",
                                },
                              }}
                            />
                          </RadioGroup>
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
                          <p className="text-lightBlue">Email Subscription</p>
                        </AccordionSummary>
                        <AccordionDetails>
                          <RadioGroup
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            // value={recommendedProductRadio}
                            // onChange={handleRecommendedProductRadio}
                          >
                            <FormControlLabel
                              value="1"
                              control={<Radio size="small" />}
                              label="Content 1"
                              sx={{
                                "& .MuiTypography-root": {
                                  fontSize: 13,
                                  color: "#c8d8ff",
                                },
                              }}
                            />
                            <FormControlLabel
                              value="2"
                              control={<Radio size="small" />}
                              label="Content 2"
                              sx={{
                                "& .MuiTypography-root": {
                                  fontSize: 13,
                                  color: "#c8d8ff",
                                },
                              }}
                            />
                            <FormControlLabel
                              value="3"
                              control={<Radio size="small" />}
                              label="Content 3"
                              sx={{
                                "& .MuiTypography-root": {
                                  fontSize: 13,
                                  color: "#c8d8ff",
                                },
                              }}
                            />
                          </RadioGroup>
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
                          <Autocomplete
                            multiple
                            id="checkboxes-tags-demo"
                            sx={{ width: "100%" }}
                            options={taggedWithData}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option.title}
                            size="small"
                            renderOption={(props, option, { selected }) => (
                              <li {...props}>
                                <Checkbox
                                  icon={
                                    <CheckBoxOutlineBlankIcon fontSize="small" />
                                  }
                                  checkedIcon={
                                    <CheckBoxIcon fontSize="small" />
                                  }
                                  checked={selected}
                                  size="small"
                                  style={{
                                    color: "#5C6D8E",
                                    marginRight: 0,
                                  }}
                                />
                                <small className="text-lightBlue">
                                  {option.title}
                                </small>
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
                          <p className="text-lightBlue">User Account Status</p>
                        </AccordionSummary>
                        <AccordionDetails>
                          <RadioGroup
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            // value={recommendedProductRadio}
                            // onChange={handleRecommendedProductRadio}
                          >
                            <FormControlLabel
                              value="1"
                              control={<Radio size="small" />}
                              label="Content 1"
                              sx={{
                                "& .MuiTypography-root": {
                                  fontSize: 13,
                                  color: "#c8d8ff",
                                },
                              }}
                            />
                            <FormControlLabel
                              value="2"
                              control={<Radio size="small" />}
                              label="Content 2"
                              sx={{
                                "& .MuiTypography-root": {
                                  fontSize: 13,
                                  color: "#c8d8ff",
                                },
                              }}
                            />
                            <FormControlLabel
                              value="3"
                              control={<Radio size="small" />}
                              label="Content 3"
                              sx={{
                                "& .MuiTypography-root": {
                                  fontSize: 13,
                                  color: "#c8d8ff",
                                },
                              }}
                            />
                          </RadioGroup>
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
                          <p className="text-lightBlue">Amount Spent</p>
                        </AccordionSummary>
                        <AccordionDetails>
                          <RadioGroup
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            // value={recommendedProductRadio}
                            // onChange={handleRecommendedProductRadio}
                          >
                            <FormControlLabel
                              value="1"
                              control={<Radio size="small" />}
                              label="Content 1"
                              sx={{
                                "& .MuiTypography-root": {
                                  fontSize: 13,
                                  color: "#c8d8ff",
                                },
                              }}
                            />
                            <FormControlLabel
                              value="2"
                              control={<Radio size="small" />}
                              label="Content 2"
                              sx={{
                                "& .MuiTypography-root": {
                                  fontSize: 13,
                                  color: "#c8d8ff",
                                },
                              }}
                            />
                            <FormControlLabel
                              value="3"
                              control={<Radio size="small" />}
                              label="Content 3"
                              sx={{
                                "& .MuiTypography-root": {
                                  fontSize: 13,
                                  color: "#c8d8ff",
                                },
                              }}
                            />
                          </RadioGroup>
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
                          <p className="text-lightBlue">Number of Orders</p>
                        </AccordionSummary>
                        <AccordionDetails>
                          <RadioGroup
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            // value={recommendedProductRadio}
                            // onChange={handleRecommendedProductRadio}
                          >
                            <FormControlLabel
                              value="1"
                              control={<Radio size="small" />}
                              label="Content 1"
                              sx={{
                                "& .MuiTypography-root": {
                                  fontSize: 13,
                                  color: "#c8d8ff",
                                },
                              }}
                            />
                            <FormControlLabel
                              value="2"
                              control={<Radio size="small" />}
                              label="Content 2"
                              sx={{
                                "& .MuiTypography-root": {
                                  fontSize: 13,
                                  color: "#c8d8ff",
                                },
                              }}
                            />
                            <FormControlLabel
                              value="3"
                              control={<Radio size="small" />}
                              label="Content 3"
                              sx={{
                                "& .MuiTypography-root": {
                                  fontSize: 13,
                                  color: "#c8d8ff",
                                },
                              }}
                            />
                          </RadioGroup>
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
                          <p className="text-lightBlue">Date of Orders</p>
                        </AccordionSummary>
                        <AccordionDetails>
                          <RadioGroup
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            // value={recommendedProductRadio}
                            // onChange={handleRecommendedProductRadio}
                          >
                            <FormControlLabel
                              value="1"
                              control={<Radio size="small" />}
                              label="Content 1"
                              sx={{
                                "& .MuiTypography-root": {
                                  fontSize: 13,
                                  color: "#c8d8ff",
                                },
                              }}
                            />
                            <FormControlLabel
                              value="2"
                              control={<Radio size="small" />}
                              label="Content 2"
                              sx={{
                                "& .MuiTypography-root": {
                                  fontSize: 13,
                                  color: "#c8d8ff",
                                },
                              }}
                            />
                            <FormControlLabel
                              value="3"
                              control={<Radio size="small" />}
                              label="Content 3"
                              sx={{
                                "& .MuiTypography-root": {
                                  fontSize: 13,
                                  color: "#c8d8ff",
                                },
                              }}
                            />
                          </RadioGroup>
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
                          <p className="text-lightBlue">Abandoned Checkouts</p>
                        </AccordionSummary>
                        <AccordionDetails>
                          <FormGroup className="tags-checkbox">
                            <FormControlLabel
                              control={
                                <Checkbox
                                  size="small"
                                  style={{
                                    color: "#5C6D8E",
                                    marginRight: 0,
                                  }}
                                />
                              }
                              label="Content 1"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  size="small"
                                  style={{
                                    color: "#5C6D8E",
                                    marginRight: 0,
                                  }}
                                />
                              }
                              label="Content 2"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  size="small"
                                  style={{
                                    color: "#5C6D8E",
                                    marginRight: 0,
                                  }}
                                />
                              }
                              label="Content 3"
                            />
                          </FormGroup>
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
                <FormControl className="px-2 py-1">
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    // value={value}
                    // onChange={handleRadioChange}
                  >
                    <FormControlLabel
                      value="userName"
                      control={<Radio size="small" />}
                      label="User Name"
                    />
                    <FormControlLabel
                      value="location"
                      control={<Radio size="small" />}
                      label="Location"
                    />
                    <FormControlLabel
                      value="totalSpent"
                      control={<Radio size="small" />}
                      label="Total Spent"
                    />
                    <FormControlLabel
                      value="noOfOrders"
                      control={<Radio size="small" />}
                      label="No of Orders"
                    />
                    <FormControlLabel
                      value="uploadTime"
                      control={<Radio size="small" />}
                      label="Upload Time"
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
            </div>
          </div>
          <TabPanel value={value} index={0}>
            <AllUsersTable />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <AllUsersTable />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <AllUsersTable />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <AllUsersTable />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <AllUsersTable />
          </TabPanel>
        </Paper>
      </div>
    </div>
  );
};

export default AllUsers;
