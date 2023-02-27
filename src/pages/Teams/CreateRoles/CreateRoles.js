import React from "react";
import "./CreateRoles.scss";
import { Link } from "react-router-dom";
// ! COMPONENT IMPORTS
import AppTextEditor from "../../../components/AppTextEditor/AppTextEditor";
import SEO from "../../Products/AddProduct/SEO/SEO";
import TagsBox from "../../../components/TagsBox/TagsBox";
import NotesBox from "../../../components/NotesBox/NotesBox";
import UploadMediaBox from "../../../components/UploadMediaBox/UploadMediaBox";
import StatusBox from "../../../components/StatusBox/StatusBox";
import {
  EnhancedTableHead,
  stableSort,
  getComparator,
} from "../../../components/TableDependencies/TableDependencies";
import TableSearch from "../../../components/TableSearch/TableSearch";
// ! IMAGES IMPORTS
import rolesSuperAdmin from "../../../assets/images/teams/rolesSuperAdmin.svg";
import arrowLeft from "../../../assets/icons/arrowLeft.svg";
import info from "../../../assets/icons/info.svg";
import cancel from "../../../assets/icons/cancel.svg";
import arrowDown from "../../../assets/icons/arrowDown.svg";
import featureUpload from "../../../assets/images/products/featureUpload.svg";
import ringSmall from "../../../assets/images/ringSmall.svg";
import deleteRed from "../../../assets/icons/delete.svg";
import paginationRight from "../../../assets/icons/paginationRight.svg";
import paginationLeft from "../../../assets/icons/paginationLeft.svg";
import userRoles from "../../../assets/icons/userRoles.svg";
import uploadProfile from "../../../assets/icons/uploadProfile.svg";
import user from "../../../assets/images/users/user.svg";

// ! MATERIAL IMPORTS
import {
  FormControl,
  MenuItem,
  Select,
  InputAdornment,
  OutlinedInput,
  Checkbox,
  FormControlLabel,
  styled,
  InputBase,
  Popover,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  SwipeableDrawer,
  RadioGroup,
  Radio,
  FormGroup,
} from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
// ! MATERIAL ICONS IMPORTS
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InventoryIcon from "@mui/icons-material/Inventory";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import ChatIcon from "@mui/icons-material/Chat";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import UploadFileRounded from "../../../components/UploadFileRounded/UploadFileRounded";
import AppMobileCodeSelect from "../../../components/AppMobileCodeSelect/AppMobileCodeSelect";

// ? PERMISSIONS ACCORDIAN STARTS HERE
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  // border: `1px solid ${theme.palette.divider}`,
  // background: "transparent",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    // sx={{
    //   pointerEvents: "none",
    // }}
    expandIcon={
      <ArrowForwardIosSharpIcon
        sx={{
          fontSize: "0.9rem",
          color: "#c8d8ff",
          // pointerEvents: "auto"
        }}
      />
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
  padding: "0 16px 16px 28px",
}));

const permissionAccordionData = [
  {
    id: 1,
    name: "Dashboard",
    accDetails: [
      { id: 101, name: "Content 1" },
      { id: 102, name: "Content 2" },
      { id: 103, name: "Content 3" },
    ],
  },
  {
    id: 2,
    name: "Orders",
    accDetails: [
      { id: 101, name: "Content 1" },
      { id: 102, name: "Content 2" },
      { id: 103, name: "Content 3" },
    ],
  },
  {
    id: 3,
    name: "Products",
    accDetails: [
      { id: 101, name: "Content 1" },
      { id: 102, name: "Content 2" },
      { id: 103, name: "Content 3" },
    ],
  },
  {
    id: 4,
    name: "Parameters",
    accDetails: [
      { id: 101, name: "Content 1" },
      { id: 102, name: "Content 2" },
      { id: 103, name: "Content 3" },
    ],
  },
  {
    id: 5,
    name: "Users",
    accDetails: [
      { id: 101, name: "Content 1" },
      { id: 102, name: "Content 2" },
      { id: 103, name: "Content 3" },
    ],
  },
  {
    id: 6,
    name: "Analytics",
    accDetails: [
      { id: 101, name: "Content 1" },
      { id: 102, name: "Content 2" },
      { id: 103, name: "Content 3" },
    ],
  },
  {
    id: 7,
    name: "Functionality",
    accDetails: [
      { id: 101, name: "Content 1" },
      { id: 102, name: "Content 2" },
      { id: 103, name: "Content 3" },
    ],
  },
  {
    id: 8,
    name: "Offers",
    accDetails: [
      { id: 101, name: "Content 1" },
      { id: 102, name: "Content 2" },
      { id: 103, name: "Content 3" },
    ],
  },
  {
    id: 9,
    name: "Emailers",
    accDetails: [
      { id: 101, name: "Content 1" },
      { id: 102, name: "Content 2" },
      { id: 103, name: "Content 3" },
    ],
  },
  {
    id: 10,
    name: "Teams",
    accDetails: [
      { id: 101, name: "Content 1" },
      { id: 102, name: "Content 2" },
      { id: 103, name: "Content 3" },
    ],
  },
  {
    id: 11,
    name: "Website",
    accDetails: [
      { id: 101, name: "Content 1" },
      { id: 102, name: "Content 2" },
      { id: 103, name: "Content 3" },
    ],
  },
];
// ? PERMISSIONS ACCORDIAN ENDS HERE

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

const CreateRoles = () => {
  // ? RADIO BUTTON STARTS HERE
  const [likeProductRadio, setLikeProductRadio] = React.useState("automated");
  const handleLikeProductRadio = (event) => {
    setLikeProductRadio(event.target.value);
  };

  const [likeMatchRadio, setLikeMatchRadio] = React.useState("allCondition");
  const handleLikeMatchRadio = (event) => {
    setLikeMatchRadio(event.target.value);
  };

  // ? RADIO BUTTON ENDS HERE

  // ? ADD PRODUCT DRAWER STARTS HERE

  const [addProductDrawer, setAddProductDrawer] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleAddMemberDrawer = (anchor, open) => (event) => {
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

  // ? PERMISSIONS ACCORDIAN STARTS HERE
  const [expanded, setExpanded] = React.useState("panel0");

  const handleAccordianChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  // ? PERMISSIONS ACCORDIAN ENDS HERE

  // * ACCESS POPOVERS STARTS
  const [anchorAccessEl, setAnchorAccessEl] = React.useState(null);
  const handleAccessClick = (event) => {
    setAnchorAccessEl(event.currentTarget);
  };
  const handleAccessClose = () => {
    setAnchorAccessEl(null);
  };
  const openAccess = Boolean(anchorAccessEl);
  const idAccess = openAccess ? "simple-popover" : undefined;
  // * ACTIVITY POPOVERS ENDS

  return (
    <div className="page container-fluid position-relative user-group">
      <div className="row justify-content-between">
        <div className="d-flex align-items-center w-auto ps-0">
          <Link to="/teams/roles" className="d-flex">
            <img
              src={arrowLeft}
              alt="arrowLeft"
              width={9}
              className="c-pointer"
            />
          </Link>

          {/* <h5 className="page-heading ms-2 ps-1">Create Collection</h5> */}
          <div className="d-flex align-items-center">
            {/* <KeyboardArrowLeftOutlinedIcon
                sx={{ fontSize: 25, color: "#c8d8ff" }}
              /> */}
            <img
              src={rolesSuperAdmin}
              alt="role"
              className="me-2 ms-2"
              height={40}
              width={40}
            />
            <div>
              <h5 className="text-lightBlue fw-500">Super Admin</h5>
              <small className="mt-2 text-grey-6">
                Create pn 23/09/21 at 09:23am
              </small>
            </div>
          </div>
        </div>

        <div className="d-flex align-items-center w-auto pe-0">
          <button className="button-transparent me-1 py-2 px-3">
            <p className="text-lightBlue">Duplicate</p>
          </button>
          <img
            src={paginationLeft}
            alt="paginationLeft"
            className="c-pointer"
            width={30}
          />
          <img
            src={paginationRight}
            alt="paginationRight"
            className="c-pointer"
            width={30}
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-lg-9 mt-3">
          <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes">
            {/* <div className="d-flex col-12 px-0 justify-content-between">
              <div className="d-flex align-items-center">
                <h6 className="text-lightBlue me-auto text-lightBlue fw-500">
                  Collection Information
                </h6>
              </div>
            </div>
            <hr className="hr-grey-6 mt-3 mb-0" /> */}

            <div className="col-12 px-0">
              <div className="d-flex mb-1">
                <p className="text-lightBlue me-2">Role Name</p>
                <img src={info} alt="info" width={15} />
              </div>
              <FormControl className="w-100 px-0">
                <OutlinedInput placeholder="Enter Role Name" size="small" />
              </FormControl>
            </div>
            <div className="col-12 mt-3 px-0">
              <div className="d-flex  mb-1">
                <p className="text-lightBlue me-2">Description</p>
                <img src={info} alt="info" width={15} />
              </div>
              <AppTextEditor />
            </div>
          </div>

          <div className="bg-black-9 border-grey-5 rounded-8 p-3 row features mt-4">
            <div className="d-flex justify-content-between mb-3 px-0 col-12 align-items-center">
              <h6 className="text-lightBlue me-auto text-lightBlue col-auto ps-0 fw-500">
                4 Members
              </h6>
              <button
                className="button-lightBlue-outline py-2 px-4"
                onClick={toggleAddMemberDrawer("right", true)}
              >
                <p>+ Add New Member</p>
              </button>
            </div>
            <TableSearch />

            <div className="d-flex flex-column col-12 px-0">
              <div className="d-flex justify-content-between my-3">
                <div className="d-flex align-items-center">
                  <img
                    src={user}
                    alt="user"
                    className="me-2 rounded-circle"
                    height={45}
                    width={45}
                  />

                  <div>
                    <p className="text-lightBlue rounded-circle fw-500">
                      Saniya Shaikh
                    </p>
                    <div className="d-flex align-items-center">
                      <small className=" text-lightBlue me-2">
                        saniya@mydesignar.com
                      </small>
                      <ContentCopyIcon
                        sx={{ fontSize: 12, color: "#c8d8ff" }}
                      />
                    </div>
                    <small className=" text-grey-6 me-2 font1">
                      Access given on 23/09/21 at 09:23am
                    </small>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <button className="button-transparent py-2 px-2">
                    <ChatIcon sx={{ fontSize: 18, color: "#c8d8ff" }} />
                    <small className="text-lightBlue ms-2">Message</small>
                  </button>
                  <button className="button-transparent py-2 ms-2 px-2">
                    <img src={deleteRed} alt="delete" />
                    <small className="text-lightBlue ms-2">Revoke</small>
                  </button>
                </div>
              </div>
              <div className="d-flex justify-content-between my-3">
                <div className="d-flex align-items-center">
                  <img
                    src={user}
                    alt="user"
                    className="me-2 rounded-circle"
                    height={45}
                    width={45}
                  />

                  <div>
                    <p className="text-lightBlue rounded-circle fw-500">
                      Saniya Shaikh
                    </p>
                    <div className="d-flex align-items-center">
                      <small className=" text-lightBlue me-2">
                        saniya@mydesignar.com
                      </small>
                      <ContentCopyIcon
                        sx={{ fontSize: 12, color: "#c8d8ff" }}
                      />
                    </div>
                    <small className=" text-grey-6 me-2 font1">
                      Access given on 23/09/21 at 09:23am
                    </small>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <button className="button-transparent py-2 px-2">
                    <ChatIcon sx={{ fontSize: 18, color: "#c8d8ff" }} />
                    <small className="text-lightBlue ms-2">Message</small>
                  </button>
                  <button className="button-transparent py-2 ms-2 px-2">
                    <img src={deleteRed} alt="delete" />
                    <small className="text-lightBlue ms-2">Revoke</small>
                  </button>
                </div>
              </div>
              <div className="d-flex justify-content-between my-3">
                <div className="d-flex align-items-center">
                  <img
                    src={user}
                    alt="user"
                    className="me-2 rounded-circle"
                    height={45}
                    width={45}
                  />

                  <div>
                    <p className="text-lightBlue rounded-circle fw-500">
                      Saniya Shaikh
                    </p>
                    <div className="d-flex align-items-center">
                      <small className=" text-lightBlue me-2">
                        saniya@mydesignar.com
                      </small>
                      <ContentCopyIcon
                        sx={{ fontSize: 12, color: "#c8d8ff" }}
                      />
                    </div>
                    <small className=" text-grey-6 me-2 font1">
                      Access given on 23/09/21 at 09:23am
                    </small>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <button className="button-transparent py-2 px-2">
                    <ChatIcon sx={{ fontSize: 18, color: "#c8d8ff" }} />
                    <small className="text-lightBlue ms-2">Message</small>
                  </button>
                  <button className="button-transparent py-2 ms-2 px-2">
                    <img src={deleteRed} alt="delete" />
                    <small className="text-lightBlue ms-2">Revoke</small>
                  </button>
                </div>
              </div>
              <div className="d-flex justify-content-between my-3">
                <div className="d-flex align-items-center">
                  <img
                    src={user}
                    alt="user"
                    className="me-2 rounded-circle"
                    height={45}
                    width={45}
                  />

                  <div>
                    <p className="text-lightBlue rounded-circle fw-500">
                      Saniya Shaikh
                    </p>
                    <div className="d-flex align-items-center">
                      <small className=" text-lightBlue me-2">
                        saniya@mydesignar.com
                      </small>
                      <ContentCopyIcon
                        sx={{ fontSize: 12, color: "#c8d8ff" }}
                      />
                    </div>
                    <small className=" text-grey-6 me-2 font1">
                      Access given on 23/09/21 at 09:23am
                    </small>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <button className="button-transparent py-2 px-2">
                    <ChatIcon sx={{ fontSize: 18, color: "#c8d8ff" }} />
                    <small className="text-lightBlue ms-2">Message</small>
                  </button>
                  <button className="button-transparent py-2 ms-2 px-2">
                    <img src={deleteRed} alt="delete" />
                    <small className="text-lightBlue ms-2">Revoke</small>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-black-9 border-grey-5 rounded-8 p-3 row features mt-4">
            <div className="d-flex justify-content-between mb-2 px-0 col-12 align-items-center">
              <h6 className="text-lightBlue me-auto text-lightBlue col-auto ps-0 fw-500">
                Permissions
              </h6>
              <div className="ps-3 rounded-4 border-lightBlue">
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      style={{
                        color: "#5C6D8E",
                        marginRight: 0,
                        // pointerEvents: "auto",
                      }}
                    />
                  }
                  label="Select All"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: 14,
                      color: "#c8d8ff",
                      // pointerEvents: "auto",
                    },
                  }}
                />
              </div>
            </div>

            {permissionAccordionData.map((e, i) => (
              <Accordion
                expanded={expanded === `panel${i}`}
                onChange={handleAccordianChange(`panel${i}`)}
                key={i}
                className="create-teams-accordion"
              >
                <AccordionSummary
                  aria-controls={`panel${i}d-content`}
                  id={`panel${i}d-header`}
                >
                  <div className="d-flex justify-content-between w-100 pe-4">
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          style={{
                            color: "#5C6D8E",
                            marginRight: 0,
                            // pointerEvents: "auto",
                          }}
                        />
                      }
                      label={e.name}
                      sx={{
                        "& .MuiTypography-root": {
                          fontSize: 14,
                          color: "#c8d8ff",
                          // pointerEvents: "auto",
                        },
                      }}
                    />

                    <button
                      className="button-grey py-2 px-3"
                      aria-describedby={idAccess}
                      variant="contained"
                      onClick={handleAccessClick}
                      // sx={{
                      //   pointerEvents: "auto",
                      // }}
                    >
                      <small
                        className="text-lightBlue"
                        // sx={{
                        //   pointerEvents: "auto",
                        // }}
                      >
                        View Access
                      </small>
                      {/* <img src={activity} alt="activity" className="ms-2" /> */}
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
                      id={idAccess}
                      open={openAccess}
                      anchorEl={anchorAccessEl}
                      onClose={handleAccessClose}
                    >
                      <div className="py-2 px-1">
                        <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                          View Access Only
                        </small>
                        <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                          View and Edit Access
                        </small>
                      </div>
                    </Popover>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <FormGroup className="tags-checkbox">
                    {e.accDetails.map((sub) => (
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
                        label={sub.name}
                      />
                    ))}
                    {/* <FormControlLabel
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
                          /> */}
                  </FormGroup>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>

          <SwipeableDrawer
            anchor="right"
            open={addProductDrawer["right"]}
            onClose={toggleAddMemberDrawer("right", false)}
            onOpen={toggleAddMemberDrawer("right", true)}
            className="role-drawer"
          >
            {/* {list()} */}
            {/* <div className="d-flex justify-content-between py-3 ps-3 pe-2 me-1 align-items-center">
              <h6 className="text-lightBlue">Select Products</h6>
              <img
                src={cancel}
                alt="cancel"
                className="c-pointer add-product-padding"
                onClick={toggleAddMemberDrawer("right", false)}
              />
            </div> */}
            <div className="d-flex align-items-center pt-3">
              <KeyboardArrowLeftOutlinedIcon
                sx={{ fontSize: 25, color: "#c8d8ff" }}
                onClick={toggleAddMemberDrawer("right", false)}
              />
              {/* <img
                src={rolesAdmin}
                alt="role"
                className="me-2 ms-2"
                height={40}
                width={40}
              /> */}
              <div>
                <h5 className="text-lightBlue fw-500">Add Team Member</h5>
              </div>
            </div>
            <hr className="hr-grey-6 mt-3 mb-3" />
            <div className="px-3">
              <div className="row">
                <div className="col-md-4 pt-1">
                  <UploadFileRounded imageName={uploadProfile} />
                </div>
                <div className="col-md-8">
                  <div className="d-flex mb-1">
                    <p className="text-lightBlue me-2">Name</p>
                    <img src={info} alt="info" width={15} />
                  </div>
                  <FormControl className="w-100 px-0">
                    <OutlinedInput placeholder="Enter Name" size="small" />
                  </FormControl>
                  <div className="d-flex mb-1 mt-3">
                    <p className="text-lightBlue me-2">Designation</p>
                    <img src={info} alt="info" width={15} />
                  </div>
                  <FormControl className="w-100 px-0">
                    <OutlinedInput
                      placeholder="Enter Designation"
                      size="small"
                    />
                  </FormControl>
                </div>
                <div className="col-12 mt-3">
                  <div className="d-flex mb-1 justify-content-between">
                    <p className="text-lightBlue me-2">Email ID</p>
                    <small className="text-blue-2">Verify</small>
                  </div>
                  <FormControl className="w-100 px-0">
                    <OutlinedInput placeholder="Enter Email ID" size="small" />
                  </FormControl>
                </div>
                <div className="col-12 mt-3">
                  <div className="d-flex mb-1 justify-content-between">
                    <p className="text-lightBlue me-2">Mobile Number</p>
                    <small className="text-blue-2">Verify</small>
                  </div>
                  <FormControl className="w-100 px-0">
                    <OutlinedInput
                      placeholder="Enter Mobile Number"
                      size="small"
                      sx={{ paddingLeft: 0 }}
                      startAdornment={
                        <InputAdornment position="start">
                          <AppMobileCodeSelect />
                          {/* &nbsp;&nbsp;&nbsp;&nbsp;| */}
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </div>

                <div className="col-12 mt-3">
                  <div className="d-flex mb-1">
                    <p className="text-lightBlue me-2">Member Id</p>
                    <img src={info} alt="info" width={15} />
                  </div>
                  <FormControl className="w-100 px-0">
                    <OutlinedInput placeholder="Enter Member ID" size="small" />
                  </FormControl>
                </div>
                <div className="col-12 mt-3">
                  <div className="d-flex mb-1">
                    <p className="text-lightBlue me-2">Select Roles</p>
                    <img src={info} alt="info" width={15} />
                  </div>
                  <FormControl className="w-100 px-0">
                    <OutlinedInput placeholder="Enter Member ID" size="small" />
                  </FormControl>
                </div>
                <div className="col-12 mt-3">
                  <div className="d-flex mb-1">
                    <p className="text-lightBlue me-2">Description</p>
                    <img src={info} alt="info" width={15} />
                  </div>
                  <FormControl className="w-100 px-0">
                    <OutlinedInput
                      placeholder="Enter some Description"
                      size="small"
                    />
                  </FormControl>
                </div>
              </div>
            </div>
            <div className="d-flex flex-column py-3 px-4 role-buttons">
              <hr className="hr-grey-6 my-3 w-100" />
              <div className="d-flex justify-content-between">
                <button className="button-gradient py-2 px-5 w-auto ">
                  <p>Add to Team</p>
                </button>
                <button className="button-lightBlue-outline py-2 px-4">
                  <p>Cancel</p>
                </button>
              </div>
            </div>
          </SwipeableDrawer>
        </div>
        <div className="col-lg-3 mt-3 pe-0 ps-0 ps-lg-3">
          <StatusBox headingName={"Collection Status"} />
          <div className="mt-4">
            <UploadMediaBox
              imageName={userRoles}
              headingName={"Profile Image"}
            />
          </div>
          <NotesBox />
          <TagsBox />
        </div>
      </div>
      <div className="row create-buttons pt-5 pb-3 justify-content-between">
        <div className="d-flex w-auto px-0">
          <Link to="/users/allUsers" className="button-red-outline py-2 px-4">
            <p>Discard</p>
          </Link>

          <Link
            to="/users/allUsers"
            className="button-lightBlue-outline py-2 px-4 ms-3"
          >
            <p>Save as Draft</p>
          </Link>
        </div>
        <div className="d-flex w-auto px-0">
          <Link
            to="/users/allUsers"
            className="button-lightBlue-outline py-2 px-4"
          >
            <p>Save & Add Another</p>
          </Link>
          <Link
            to="/users/allUsers"
            className="button-gradient ms-3 py-2 px-4 w-auto"
          >
            <p>Save</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateRoles;
