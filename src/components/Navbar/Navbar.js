import * as React from "react";
import { styled } from "@mui/material/styles";
import "./Navbar.scss";
// ! IMAGES IMPORTS
import user from "../../assets/icons/user.svg";
import menuClose from "../../assets/icons/sidenav/menuClose.svg";
import menuOpen from "../../assets/icons/sidenav/menuOpen.svg";
// ! MATERIAL IMPORTS
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
// ! MATERIAL ICONS IMPORTS
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import MoreIcon from "@mui/icons-material/MoreVert";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AppNavbarNotes from "../AppNavbarNotes/AppNavbarNotes";
import AppNavbarNotifications from "../AppNavbarNotifications/AppNavbarNotifications";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

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
    marginLeft: theme.spacing(1),
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
  },
}));
// ? SEARCH INPUT ENDS HERE

const Navbar = ({ handleDrawerToggle, mobileOpen }) => {
  // const [lightTheme, setLightTheme] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // const handleTheme = () => {
  //   setLightTheme(!lightTheme);
  // };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose} className="px-2">
        <PersonOutlineOutlinedIcon
          size="small"
          sx={{ color: "#c8d8ff", fontSize: 18 }}
        />
        <small className="text-lightBlue ms-2">My Account</small>
      </MenuItem>
      <MenuItem onClick={handleMenuClose} className="mt-1  px-2">
        <HelpOutlineOutlinedIcon
          size="small"
          sx={{ color: "#c8d8ff", fontSize: 18 }}
        />
        <small className="text-lightBlue ms-2">Help & Support</small>
      </MenuItem>
      <MenuItem onClick={handleMenuClose} className="mt-1 px-2">
        <SettingsOutlinedIcon
          size="small"
          sx={{ color: "#c8d8ff", fontSize: 18 }}
        />
        <small className="text-lightBlue ms-2">Settings</small>
      </MenuItem>
      <MenuItem onClick={handleMenuClose} className="mt-1  px-2">
        <LogoutIcon size="small" sx={{ color: "#FC756E", fontSize: 18 }} />
        <small className="text-red-5 ms-2">Log out</small>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="purple" size="small">
            <DescriptionOutlinedIcon sx={{ color: "#c8d8ff" }} size="small" />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="purple" size="small">
            <NotificationsNoneIcon size="small" sx={{ color: "#c8d8ff" }} />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="app-navbar">
        <Toolbar>
          <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 0 }}
            onClick={() => handleDrawerToggle()}
            className="app-navbar__toggle"
          >
            {!mobileOpen ? (
              <img src={menuOpen} alt="menuOpen" />
            ) : (
              <img src={menuClose} alt="menuClose" />
            )}
          </IconButton>
          <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: "#c8d8ff" }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Global Search"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{ display: { xs: "none", md: "flex" } }}
            className="align-items-center"
          >
            <AppNavbarNotes />
            <AppNavbarNotifications />
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              className="app-navbar__profile ms-4"
            >
              <div className="d-flex flex-column justify-content-end align-items-end me-2">
                <p className="text-lightBlue">Saniya Shaikh</p>
                <small className="text-blue-gradient">Super Admin</small>
              </div>
              <img src={user} alt="user" width={40} />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon sx={{ color: "#c8d8ff" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};
export default Navbar;
