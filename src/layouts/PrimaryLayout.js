import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Drawer, Box, AppBar } from "@mui/material";

import Navbar from "../components/Navbar/Navbar";
import Sidenav from "../components/Sidenav/Sidenav";

const DRAWER_WIDTH = 240;

const PrimaryLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: !mobileOpen
            ? { sm: `calc(100% - ${DRAWER_WIDTH}px)` }
            : { sm: "100%" },
          ml: { sm: `${DRAWER_WIDTH}px` },
        }}
      >
        <Navbar
          handleDrawerToggle={handleDrawerToggle}
          mobileOpen={mobileOpen}
        />
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: !mobileOpen ? { sm: DRAWER_WIDTH } : { sm: 0 },
          flexShrink: { sm: 0 },
        }}
        aria-label="mailbox folders"
        className="app-sidenav"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          onClick={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DRAWER_WIDTH,
            },
          }}
        >
          <Sidenav />
        </Drawer>
        <Drawer
          sx={{
            display: { xs: "none", sm: "block" },
            width: DRAWER_WIDTH,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: DRAWER_WIDTH,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          open={!mobileOpen}
          anchor="left"
        >
          <Sidenav />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
        }}
        className={"main-box"}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default PrimaryLayout;
