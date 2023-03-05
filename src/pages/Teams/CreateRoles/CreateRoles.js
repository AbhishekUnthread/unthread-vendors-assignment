import React from "react";
import "./CreateRoles.scss";
import { Link } from "react-router-dom";
// ! COMPONENT IMPORTS
import AppTextEditor from "../../../components/AppTextEditor/AppTextEditor";
import TagsBox from "../../../components/TagsBox/TagsBox";
import NotesBox from "../../../components/NotesBox/NotesBox";
import UploadMediaBox from "../../../components/UploadMediaBox/UploadMediaBox";
import TableSearch from "../../../components/TableSearch/TableSearch";
import UploadFileRounded from "../../../components/UploadFileRounded/UploadFileRounded";
import AppMobileCodeSelect from "../../../components/AppMobileCodeSelect/AppMobileCodeSelect";
// ! IMAGES IMPORTS
import rolesSuperAdmin from "../../../assets/images/teams/rolesSuperAdmin.svg";
import arrowLeft from "../../../assets/icons/arrowLeft.svg";
import info from "../../../assets/icons/info.svg";
import deleteRed from "../../../assets/icons/delete.svg";
import paginationRight from "../../../assets/icons/paginationRight.svg";
import paginationLeft from "../../../assets/icons/paginationLeft.svg";
import userRoles from "../../../assets/icons/userRoles.svg";
import uploadProfile from "../../../assets/icons/uploadProfile.svg";
import user from "../../../assets/images/users/user.svg";
import block from "../../../assets/images/users/block.svg";
// ! MATERIAL IMPORTS
import {
  FormControl,
  InputAdornment,
  OutlinedInput,
  Checkbox,
  FormControlLabel,
  styled,
  Popover,
  SwipeableDrawer,
  FormGroup,
  Tooltip,
  Select,
  MenuItem,
  Dialog,
  DialogContent,
  DialogActions,
  Slide,
} from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
// ! MATERIAL ICONS IMPORTS
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import ChatIcon from "@mui/icons-material/Chat";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import StatusBox from "../../../components/StatusBox/StatusBox";

// ? DIALOG TRANSITION STARTS HERE
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// ? DIALOG TRANSITION ENDS HERE

// ? PERMISSIONS ACCORDIAN STARTS HERE
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
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
      <ArrowForwardIosSharpIcon
        sx={{
          fontSize: "0.9rem",
          color: "#c8d8ff",
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

const CreateRoles = () => {
  // ? ADD MEMBER DRAWER STARTS HERE

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
  // ? ADD MEMBER DRAWER ENDS HERE

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

  // ? BLOCK DIALOG STARTS HERE
  const [openBlock, setOpenBlock] = React.useState(false);

  const handleBlock = () => {
    setOpenBlock(true);
  };

  const handleBlockClose = () => {
    setOpenBlock(false);
  };
  // ? BLOCK DIALOG ENDS HERE

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

          <div className="d-flex align-items-center">
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
                Create on 23/09/21 at 09:23am
              </small>
            </div>
          </div>
        </div>

        <div className="d-flex align-items-center w-auto pe-0">
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
            <div className="col-12 px-0">
              <div className="d-flex mb-1">
                <p className="text-lightBlue">Role Name</p>
                <Tooltip title="Lorem ipsum" placement="top">
                  <img
                    src={info}
                    alt="info"
                    className="c-pointer ms-2"
                    width={13.5}
                  />
                </Tooltip>
              </div>
              <FormControl className="w-100 px-0">
                <OutlinedInput placeholder="Enter Role Name" size="small" />
              </FormControl>
            </div>
            <div className="col-12 mt-3 px-0">
              <div className="d-flex  mb-1">
                <p className="text-lightBlue">Description</p>
                <Tooltip title="Lorem ipsum" placement="top">
                  <img
                    src={info}
                    alt="info"
                    className="c-pointer ms-2"
                    width={13.5}
                  />
                </Tooltip>
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
            <div className="col-12 px-0">
              <TableSearch />
            </div>

            <div className="d-flex flex-column col-12 px-0 pt-2">
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
                      <small className=" text-blue-1 me-2">
                        saniya@mydesignar.com
                      </small>
                      <Tooltip title="Copy" placement="top">
                        <ContentCopyIcon
                          sx={{ fontSize: 12, color: "#c8d8ff" }}
                          className="c-pointer"
                        />
                      </Tooltip>
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
                  <button
                    className="button-transparent py-2 ms-2 px-2"
                    onClick={handleBlock}
                  >
                    <img src={deleteRed} alt="delete" />
                    <small className="text-lightBlue ms-2">Revoke</small>
                  </button>

                  <Dialog
                    open={openBlock}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleBlockClose}
                    aria-describedby="alert-dialog-slide-description"
                    maxWidth="sm"
                  >
                    <DialogContent className="py-2 px-5 text-center">
                      <img
                        src={block}
                        alt="block"
                        width={100}
                        className="mt-3"
                      />
                      <div className="row"></div>
                      <h6 className="text-lightBlue mt-3 mb-2">
                        Are you sure you want to revoke
                      </h6>
                      <h6 className="text-lightBlue mt-2 mb-2">
                        <span className="text-blue-2">Saniya Shaikh</span>
                        &nbsp;from&nbsp;
                        <span className="text-blue-2">Super Admin Role</span>?
                      </h6>
                      <div className="d-flex justify-content-center mt-2">
                        <hr className="hr-grey-6 w-100" />
                      </div>
                    </DialogContent>
                    <DialogActions className="d-flex justify-content-center pt-0 pb-4">
                      <button
                        className="button-lightBlue-outline py-2 px-3 me-2 "
                        onClick={handleBlockClose}
                      >
                        <p>Cancel</p>
                      </button>
                      <button
                        className="button-red-outline py-2 px-3 ms-2"
                        onClick={handleBlockClose}
                      >
                        <p>Revoke Access</p>
                      </button>
                    </DialogActions>
                  </Dialog>
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
                      <small className=" text-blue-1 me-2">
                        saniya@mydesignar.com
                      </small>
                      <Tooltip title="Copy" placement="top">
                        <ContentCopyIcon
                          sx={{ fontSize: 12, color: "#c8d8ff" }}
                          className="c-pointer"
                        />
                      </Tooltip>
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
                  <button
                    className="button-transparent py-2 ms-2 px-2"
                    onClick={handleBlock}
                  >
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
                      <small className=" text-blue-1 me-2">
                        saniya@mydesignar.com
                      </small>
                      <Tooltip title="Copy" placement="top">
                        <ContentCopyIcon
                          sx={{ fontSize: 12, color: "#c8d8ff" }}
                          className="c-pointer"
                        />
                      </Tooltip>
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
                  <button
                    className="button-transparent py-2 ms-2 px-2"
                    onClick={handleBlock}
                  >
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
                      <small className=" text-blue-1 me-2">
                        saniya@mydesignar.com
                      </small>
                      <Tooltip title="Copy" placement="top">
                        <ContentCopyIcon
                          sx={{ fontSize: 12, color: "#c8d8ff" }}
                          className="c-pointer"
                        />
                      </Tooltip>
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
                  <button
                    className="button-transparent py-2 ms-2 px-2"
                    onClick={handleBlock}
                  >
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
              <div className="ps-3 rounded-4 ">
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
                  label="Select All"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: 14,
                      color: "#c8d8ff",
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
                className="create-teams-accordion px-0"
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
                          }}
                        />
                      }
                      label={e.name}
                      sx={{
                        "& .MuiTypography-root": {
                          fontSize: 14,
                          color: "#c8d8ff",
                        },
                      }}
                    />

                    <button
                      className="button-grey py-2 px-3"
                      aria-describedby={idAccess}
                      variant="contained"
                      onClick={handleAccessClick}
                    >
                      <small className="text-lightBlue">View Access</small>
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
            <div className="d-flex align-items-center pt-3 px-3">
              <KeyboardArrowLeftOutlinedIcon
                sx={{ fontSize: 25, color: "#c8d8ff" }}
                onClick={toggleAddMemberDrawer("right", false)}
                className="c-pointer"
              />
              <div>
                <h5 className="text-lightBlue fw-500 ms-2">Add Team Member</h5>
              </div>
            </div>
            <div className="px-3">
              <hr className="hr-grey-6 mt-3 mb-3" />
            </div>
            <div className="px-3">
              <div className="row">
                <div className="col-md-4 pt-1">
                  <UploadFileRounded imageName={uploadProfile} />
                </div>
                <div className="col-md-8">
                  <div className="d-flex mb-1">
                    <p className="text-lightBlue">Name</p>
                    <Tooltip title="Lorem ipsum" placement="top">
                      <img
                        src={info}
                        alt="info"
                        className="c-pointer ms-2"
                        width={13.5}
                      />
                    </Tooltip>
                  </div>
                  <FormControl className="w-100 px-0">
                    <OutlinedInput placeholder="Enter Name" size="small" />
                  </FormControl>
                  <div className="d-flex mb-1 mt-3">
                    <p className="text-lightBlue">Designation</p>
                    <Tooltip title="Lorem ipsum" placement="top">
                      <img
                        src={info}
                        alt="info"
                        className="c-pointer ms-2"
                        width={13.5}
                      />
                    </Tooltip>
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
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </div>

                <div className="col-12 mt-3">
                  <div className="d-flex mb-1">
                    <p className="text-lightBlue">Member Id</p>
                    <Tooltip title="Lorem ipsum" placement="top">
                      <img
                        src={info}
                        alt="info"
                        className="c-pointer ms-2"
                        width={13.5}
                      />
                    </Tooltip>
                  </div>
                  <FormControl className="w-100 px-0">
                    <OutlinedInput placeholder="Enter Member ID" size="small" />
                  </FormControl>
                </div>
                <div className="col-12 mt-3">
                  <div className="d-flex mb-1">
                    <p className="text-lightBlue">Select Roles</p>
                    <Tooltip title="Lorem ipsum" placement="top">
                      <img
                        src={info}
                        alt="info"
                        className="c-pointer ms-2"
                        width={13.5}
                      />
                    </Tooltip>
                  </div>

                  <FormControl sx={{ width: "100%" }} size="small">
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      // value={metal}
                      placeholder="Fixed"
                      // onChange={handleMetalChange}
                    >
                      <MenuItem value={10}>Super Admin</MenuItem>
                      <MenuItem value={20}>Admin</MenuItem>
                      <MenuItem value={30}>Project Manager</MenuItem>
                      <MenuItem value={40}>Ecommerce Manager</MenuItem>
                      <MenuItem value={50}>Digital Marketing</MenuItem>
                      <MenuItem value={60}>Client Relationships</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="col-12 mt-3">
                  <div className="d-flex mb-1">
                    <p className="text-lightBlue">Description</p>
                    <Tooltip title="Lorem ipsum" placement="top">
                      <img
                        src={info}
                        alt="info"
                        className="c-pointer ms-2"
                        width={13.5}
                      />
                    </Tooltip>
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
                <button
                  className="button-gradient py-2 px-5 w-auto"
                  onClick={toggleAddMemberDrawer("right", false)}
                >
                  <p>Add to Team</p>
                </button>
                <button
                  className="button-lightBlue-outline py-2 px-4"
                  onClick={toggleAddMemberDrawer("right", false)}
                >
                  <p>Cancel</p>
                </button>
              </div>
            </div>
          </SwipeableDrawer>
        </div>
        <div className="col-lg-3 mt-3 pe-0 ps-0 ps-lg-3">
          <StatusBox headingName={"Role Status"} showSchedule={"false"} />
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
          <Link to="/teams/roles" className="button-red-outline py-2 px-4">
            <p>Discard</p>
          </Link>

          <Link
            to="/teams/roles"
            className="button-lightBlue-outline py-2 px-4 ms-3"
          >
            <p>Save as Draft</p>
          </Link>
        </div>
        <div className="d-flex w-auto px-0">
          <Link
            to="/teams/roles"
            className="button-lightBlue-outline py-2 px-4"
          >
            <p>Save & Add Another</p>
          </Link>
          <Link
            to="/teams/roles"
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
