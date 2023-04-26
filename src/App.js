import { useState, useEffect } from "react";
import { AppBar, Box, CssBaseline, Drawer } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { RouterProvider } from "react-router-dom";

import "./App.scss";

import Navbar from "./components/Navbar/Navbar";
import Sidenav from "./components/Sidenav/Sidenav";

import router from "./routes";

const drawerWidth = 240;

const projectTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#fff",
    },
    secondary: {
      main: "#FFF",
    },
    purple: {
      main: "#8f5fe8",
    },
  },
  typography: {
    allVariants: {
      fontFamily: "Inter",
    },
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#433e73",
          color: "",
          border: "1px solid #433e73",
        },
      },
    },
  },
});

const App = (props) => {
  const { window } = props;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  let [loader, isLoading] = useState(false);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <ThemeProvider theme={projectTheme}>
      {!loader ? (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          {showNav && (
            <AppBar
              position="fixed"
              sx={{
                width: !mobileOpen
                  ? { sm: `calc(100% - ${drawerWidth}px)` }
                  : { sm: "100%" },
                ml: { sm: `${drawerWidth}px` },
              }}
            >
              {/* <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Responsive drawer
            </Typography>
          </Toolbar> */}
              {/* <Navbar
                handleDrawerToggle={handleDrawerToggle}
                mobileOpen={mobileOpen}
              /> */}
            </AppBar>
          )}
          {showNav && (
            <Box
              component="nav"
              // sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
              sx={{
                width: !mobileOpen ? { sm: drawerWidth } : { sm: 0 },
                flexShrink: { sm: 0 },
              }}
              aria-label="mailbox folders"
              className="app-sidenav"
            >
              {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
              {/* <Drawer
                container={container}
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
                    width: drawerWidth,
                  },
                }}
              >
                <Sidenav />
              </Drawer>
              <Drawer
                sx={{
                  display: { xs: "none", sm: "block" },
                  width: drawerWidth,
                  flexShrink: 0,
                  "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                  },
                }}
                variant="persistent"
                open={!mobileOpen}
                anchor="left"
              >
                <Sidenav />
              </Drawer> */}
            </Box>
          )}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: showNav ? 3 : 0,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
            }}
            className={showNav ? "main-box" : "main-box__login"}
          >
            <RouterProvider router={router} />
          </Box>
        </Box>
      ) : (
        ""
      )}
    </ThemeProvider>
  );
};

export default App;
