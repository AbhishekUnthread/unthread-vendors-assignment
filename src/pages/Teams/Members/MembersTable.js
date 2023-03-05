import React from "react";
import { Link } from "react-router-dom";
// ! COMPONENT IMPORTS
import {
  EnhancedTableHead,
  stableSort,
  getComparator,
} from "../../../components/TableDependencies/TableDependencies";
import TabPanel from "../../../components/TabPanel/TabPanel";
// ! IMAGES IMPORTS
import rolesAdmin from "../../../assets/images/teams/rolesAdmin.svg";
import user from "../../../assets/images/users/user.svg";
import verticalDots from "../../../assets/icons/verticalDots.svg";
import deleteRed from "../../../assets/icons/delete.svg";
import teamMember1 from "../../../assets/images/products/teamMember1.svg";
// ! MATERIAL IMPORTS
import {
  Checkbox,
  Popover,
  SwipeableDrawer,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Tooltip,
  Paper,
  Box,
  Tabs,
  Tab,
  FormControlLabel,
  FormGroup,
  styled,
} from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
// ! MATERIAL ICONS IMPORTSe
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InventoryIcon from "@mui/icons-material/Inventory";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import ChatIcon from "@mui/icons-material/Chat";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import TableEditStatusButton from "../../../components/TableEditStatusButton/TableEditStatusButton";
import TableMassActionButton from "../../../components/TableMassActionButton/TableMassActionButton";

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

// ? TABLE STARTS HERE
function createData(tId, userName, role, createdOn, actions) {
  return { tId, userName, role, createdOn, actions };
}

const rows = [
  createData(1, "Saniya Shaikh", "Owner", "23/09/21 at 09:23am"),
  createData(2, "Saniya Shaikh", "Owner", "23/09/21 at 09:23am"),
  createData(3, "Saniya Shaikh", "Owner", "23/09/21 at 09:23am"),
  createData(4, "Saniya Shaikh", "Owner", "23/09/21 at 09:23am"),
  createData(5, "Saniya Shaikh", "Owner", "23/09/21 at 09:23am"),
];

const headCells = [
  {
    id: "userName",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "role",
    numeric: false,
    disablePadding: false,
    label: "Role",
  },
  {
    id: "createdOn",
    numeric: false,
    disablePadding: false,
    label: "Created On",
  },
  {
    id: "actions",
    numeric: false,
    disablePadding: false,
    label: "Actions",
  },
];
// ? TABLE ENDS HERE

const MembersTable = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // ? PERMISSIONS ACCORDIAN STARTS HERE
  const [expanded, setExpanded] = React.useState("panel0");

  const handleAccordianChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  // ? PERMISSIONS ACCORDIAN ENDS HERE

  // ? TABLE STARTS HERE
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("userName");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
      const newSelected = rows.map((n) => n.tId);
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
  // ? TABLE ENDS HERE

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

  return (
    <React.Fragment>
      {selected.length > 0 && (
        <div className="d-flex align-items-center px-2 mb-3">
          <button className="button-grey py-2 px-3">
            <small className="text-lightBlue">
              {selected.length} users are selected&nbsp;
              <span
                className="text-blue-2 c-pointer"
                onClick={() => setSelected([])}
              >
                (Clear Selection)
              </span>
            </small>
          </button>
          <TableEditStatusButton />
          <TableMassActionButton />
        </div>
      )}
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
            headCells={headCells}
          />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.tId);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.tId}
                    selected={isItemSelected}
                    className="table-rows"
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                        onClick={(event) => handleClick(event, row.tId)}
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
                      <div className="d-flex align-items-center pt-3 pb-3">
                        <img
                          src={user}
                          alt="user"
                          className="me-2 rounded-circle"
                          height={45}
                          width={45}
                        />
                        <div>
                          <Link
                            to="/teams/members/details"
                            className=" text-decoration-none"
                          >
                            <p className="text-lightBlue rounded-circle fw-600">
                              {row.userName}
                            </p>
                          </Link>
                          <small className="mt-2 text-grey-6">
                            saniya@mydesignar.com
                            <Tooltip title="Copy" placement="top">
                              <ContentCopyIcon
                                sx={{ fontSize: 12, color: "#c8d8ff" }}
                                className="c-pointer ms-2"
                              />
                            </Tooltip>
                          </small>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell style={{ width: 160 }}>
                      <div className="d-flex align-items-center c-pointer">
                        <p className="text-lightBlue">{row.role}</p>
                      </div>
                    </TableCell>
                    <TableCell style={{ width: 260 }}>
                      <div className="d-flex align-items-center">
                        <p className="text-lightBlue me-2">{row.createdOn}</p>
                        <img src={teamMember1} alt="teamMember1" />
                      </div>
                    </TableCell>
                    <TableCell style={{ width: 110, padding: 0 }}>
                      <div className="d-flex align-items-center">
                        <Tooltip title="Edit" placement="top">
                          <div className="table-edit-icon rounded-4 p-2">
                            <EditOutlinedIcon
                              sx={{
                                color: "#5c6d8e",
                                fontSize: 18,
                                cursor: "pointer",
                              }}
                            />
                          </div>
                        </Tooltip>
                        <Tooltip title="Archive" placement="top">
                          <div className="table-edit-icon rounded-4 p-2">
                            <InventoryIcon
                              sx={{
                                color: "#5c6d8e",
                                fontSize: 18,
                                cursor: "pointer",
                              }}
                            />
                          </div>
                        </Tooltip>
                        <img
                          src={verticalDots}
                          alt="verticalDots"
                          className="c-pointer"
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
                          <div className="py-2 px-2">
                            <small className="text-grey-7 px-2">ACTIONS</small>
                            <hr className="hr-grey-6 my-2" />
                            <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                              Edit Member
                            </small>
                            <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                              Send Reset Password Link
                            </small>
                            <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                              Change Team Role
                            </small>
                            <div className="d-flex justify-content-between  hover-back rounded-3 p-2 c-pointer">
                              <small className="text-lightBlue font2 d-block">
                                Block & Archieve
                              </small>
                              <img src={deleteRed} alt="delete" className="" />
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
        <div className="px-3 activity-top bg-black-13 pb-3">
          <div className="d-flex justify-content-between py-3 px-0">
            <div className="d-flex align-items-center">
              <KeyboardArrowLeftOutlinedIcon
                sx={{ fontSize: 25, color: "#c8d8ff" }}
              />
              <img
                src={rolesAdmin}
                alt="role"
                className="me-2 ms-2"
                height={40}
                width={40}
              />
              <div>
                <h5 className="text-lightBlue fw-500">Super Admin</h5>
                <small className="mt-2 text-grey-6">4 Members</small>
              </div>
            </div>
            <div className="c-pointer d-flex filter-icon me-1 align-items-center">
              <EditOutlinedIcon sx={{ color: "#658DED", fontSize: 14 }} />
              <small className="text-blue-2 ms-1">Edit</small>
            </div>
          </div>

          <div className="d-flex align-items-center">
            <Paper
              sx={{ width: "100%", mb: 0, mt: 2, p: 0 }}
              className="shadow-none"
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
                  <Tab label="Members" className="tabs-head" />
                  <Tab label="Permissions" className="tabs-head" />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <div className="d-flex flex-column">
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
                          <small className=" text-grey-6 me-2">4 Members</small>
                          <ContentCopyIcon
                            sx={{ fontSize: 12, color: "#c8d8ff" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <ChatIcon sx={{ fontSize: 18, color: "#c8d8ff" }} />
                      <small className="text-lightBlue ms-2">Message</small>
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
                          <small className=" text-grey-6 me-2">4 Members</small>
                          <ContentCopyIcon
                            sx={{ fontSize: 12, color: "#c8d8ff" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <ChatIcon sx={{ fontSize: 18, color: "#c8d8ff" }} />
                      <small className="text-lightBlue ms-2">Message</small>
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
                          <small className=" text-grey-6 me-2">4 Members</small>
                          <ContentCopyIcon
                            sx={{ fontSize: 12, color: "#c8d8ff" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <ChatIcon sx={{ fontSize: 18, color: "#c8d8ff" }} />
                      <small className="text-lightBlue ms-2">Message</small>
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
                          <small className=" text-grey-6 me-2">4 Members</small>
                          <ContentCopyIcon
                            sx={{ fontSize: 12, color: "#c8d8ff" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <ChatIcon sx={{ fontSize: 18, color: "#c8d8ff" }} />
                      <small className="text-lightBlue ms-2">Message</small>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <div className="">
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <h6 className="text-lightBlue ps-3">Permissions</h6>
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
                      className="teams-accordion"
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
                            <small className="text-lightBlue">
                              View Access
                            </small>
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
                          {e.accDetails.map((sub, i) => (
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
                              key={i}
                              label={sub.name}
                            />
                          ))}
                        </FormGroup>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </div>
              </TabPanel>
            </Paper>
          </div>
        </div>
      </SwipeableDrawer>
    </React.Fragment>
  );
};

export default MembersTable;
