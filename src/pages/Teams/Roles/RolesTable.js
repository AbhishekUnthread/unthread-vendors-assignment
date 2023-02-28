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
import rolesOwner from "../../../assets/images/teams/rolesOwner.svg";
import rolesSuperAdmin from "../../../assets/images/teams/rolesSuperAdmin.svg";
import rolesAdmin from "../../../assets/images/teams/rolesAdmin.svg";
import rolesStaff from "../../../assets/images/teams/rolesStaff.svg";
import rolesFreelance from "../../../assets/images/teams/rolesFreelance.svg";
import user from "../../../assets/images/users/user.svg";
// ! MATERIAL IMPORTS
import {
  Checkbox,
  Chip,
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
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import ChatIcon from "@mui/icons-material/Chat";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";

// ? PERMISSIONS ACCORDIAN STARTS HERE
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

// ? TABLE STARTS HERE
function createData(rId, roles, members, permissions, createdOn, action) {
  return { rId, roles, members, permissions, createdOn, action };
}

const rows = [
  createData(1, "Owner", "SS", "All Permission", "23/09/21 at 09:23am"),
  createData(2, "Super Admin", "SS, SB, +2", "Limited", "23/09/21 at 09:23am"),
  createData(3, "Admin", "", "Limited", "23/09/21 at 09:23am"),
  createData(4, "Staff", "SS, SB, +2", "Limited", "23/09/21 at 09:23am"),
  createData(5, "Freelance", "SS, SB, +2", "Limited", "23/09/21 at 09:23am"),
];

const headCells = [
  {
    id: "roles",
    numeric: false,
    disablePadding: true,
    label: "Roles",
  },
  {
    id: "members",
    numeric: false,
    disablePadding: false,
    label: "Members",
  },
  {
    id: "permissions",
    numeric: false,
    disablePadding: false,
    label: "Permissions",
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

const RolesTable = () => {
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
  const [orderBy, setOrderBy] = React.useState("rId");
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
      const newSelected = rows.map((n) => n.rId);
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

  return (
    <React.Fragment>
      {selected.length > 0 && (
        <div className="d-flex justify-content-between align-items-center px-2 mb-3">
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
                const isItemSelected = isSelected(row.rId);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.rId}
                    selected={isItemSelected}
                    className="table-rows"
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                        onClick={(event) => handleClick(event, row.rId)}
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
                      <div className="d-flex align-items-center py-2 my-1">
                        {row.roles.toLowerCase() === "owner" && (
                          <img
                            src={rolesOwner}
                            alt="user"
                            className="me-2 rounded-circle"
                            height={45}
                            width={45}
                          />
                        )}
                        {row.roles.toLowerCase() === "super admin" && (
                          <img
                            src={rolesSuperAdmin}
                            alt="user"
                            className="me-2 rounded-circle"
                            height={45}
                            width={45}
                          />
                        )}
                        {row.roles.toLowerCase() === "admin" && (
                          <img
                            src={rolesAdmin}
                            alt="user"
                            className="me-2 rounded-circle"
                            height={45}
                            width={45}
                          />
                        )}
                        {row.roles.toLowerCase() === "staff" && (
                          <img
                            src={rolesStaff}
                            alt="user"
                            className="me-2 rounded-circle"
                            height={45}
                            width={45}
                          />
                        )}
                        {row.roles.toLowerCase() === "freelance" && (
                          <img
                            src={rolesFreelance}
                            alt="user"
                            className="me-2 rounded-circle"
                            height={45}
                            width={45}
                          />
                        )}
                        <div>
                          <p className="text-lightBlue rounded-circle fw-500">
                            {row.roles}
                          </p>
                          <small className="mt-2 text-grey-6">4 Members</small>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="d-flex align-items-center c-pointer">
                        {row.members ? (
                          <p
                            className="text-lightBlue"
                            onClick={toggleActivityDrawer("right", true)}
                          >
                            {row.members}
                          </p>
                        ) : (
                          <Link
                            to="/teams/roles/create"
                            className="text-decoration-none"
                          >
                            <p className="text-blue-2 text-decoration-underline">
                              + Add Members
                            </p>
                          </Link>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="d-flex align-items-center">
                        {row.permissions === "All Permission" ? (
                          <Chip
                            label={row.permissions}
                            size="small"
                            className="px-1"
                          />
                        ) : (
                          <Chip
                            label={row.permissions}
                            size="small"
                            className="px-1"
                            variant="outlined"
                          />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-lightBlue">{row.createdOn}</p>
                    </TableCell>

                    <TableCell style={{ width: 140, padding: 0 }}>
                      <div className="d-flex align-items-center">
                        <Tooltip title="View" placement="top">
                          <div className="table-edit-icon rounded-4 p-2">
                            <VisibilityOutlinedIcon
                              sx={{
                                color: "#5c6d8e",
                                fontSize: 18,
                                cursor: "pointer",
                              }}
                              onClick={toggleActivityDrawer("right", true)}
                            />
                          </div>
                        </Tooltip>
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
              </TabPanel>
            </Paper>
          </div>
        </div>
      </SwipeableDrawer>
    </React.Fragment>
  );
};

export default RolesTable;
