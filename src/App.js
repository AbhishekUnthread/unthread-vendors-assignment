import * as React from "react";
import "./App.scss";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
// import Toolbar from "@mui/material/Toolbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Navbar from "./components/Navbar/Navbar";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  // useNavigate,
} from "react-router-dom";
// ? COMPONETS & PAGES STARTS HERE
import Sidenav from "./components/Sidenav/Sidenav";
import Dashboard from "./pages/Dashboard/Dashboard";
// import Orders from "./pages/Orders/Orders";
// import AddProduct from "./pages/AddProduct/AddProduct";
// import Products from "./pages/Products/Products";
// import Login from "./pages/Login/Login";
import { useEffect } from "react";
import AllProducts from "./pages/Products/AllProducts/AllProducts";
import AddProduct from "./pages/Products/AddProduct/AddProduct";
import AllUsers from "./pages/Users/AllUsers/AllUsers";
import AddUser from "./pages/Users/AddUser/AddUser";
import UserGroups from "./pages/Users/UserGroups/UserGroups";
import UserEnquiries from "./pages/Users/UserEnquiries/UserEnquiries";
import CreateUserGroup from "./pages/Users/CreateUserGroup/CreateUserGroup";
import UserDetails from "./pages/Users/UserDetails/UserDetails";
import AdditionalFields from "./pages/Parameters/AdditionalFields/AdditionalFields";
import CreateFieldSets from "./pages/Parameters/CreateFieldSets/CreateFieldSets";
import Categories from "./pages/Parameters/Categories/Categories";
import Collections from "./pages/Parameters/Collections/Collections";
import CreateCollection from "./pages/Parameters/CreateCollection/CreateCollection";
import VariantSets from "./pages/Parameters/VariantSets/VariantSets";
import Vendors from "./pages/Parameters/Vendors/Vendors";
import EditVendor from "./pages/Parameters/EditVendor/EditVendor";
import CreateVariantSets from "./pages/Parameters/CreateVariantSets/CreateVariantSets";
import TagsManager from "./pages/Parameters/TagsManager/TagsManager";
import EditTags from "./pages/Parameters/EditTags/EditTags";
import Roles from "./pages/Teams/Roles/Roles";
import CreateRoles from "./pages/Teams/CreateRoles/CreateRoles";
import Members from "./pages/Teams/Members/Members";
import MemberDetails from "./pages/Teams/MemberDetails/MemberDetails";
// import Users from "./pages/Users/Users";
// ? COMPONETS & PAGES IMPORT ENDS HERE

const drawerWidth = 240;

function App(props) {
  let projectTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#fff",
      },
      secondary: {
        main: "#FFF",
        // main: "#FFF2DE",
      },
      purple: {
        main: "#8f5fe8",
      },
      // greyLight: {
      //   main: "#f2f2f2",
      // },
    },
    typography: {
      allVariants: {
        fontFamily: "Inter",
      },
    },
  });
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [showNavs, setShowNavs] = React.useState(true);

  //   const admin =
  //     localStorage.getItem("persist:root") &&
  //     JSON.parse(localStorage.getItem("persist:root")).user &&
  //     JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
  //       .currentUser
  //       ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
  //           .currentUser.isAdmin
  //       : false;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const location = useLocation();
  // const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname.includes("login")) {
      setShowNavs(false);
    } else {
      setShowNavs(true);
    }
  }, [location, mobileOpen]);

  //   useEffect(() => {
  //     if (!admin) {
  //       navigate("/login");
  //     }
  //   }, [admin]);

  const drawer = <Sidenav />;

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <ThemeProvider theme={projectTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {showNavs && (
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
            <Navbar
              handleDrawerToggle={handleDrawerToggle}
              mobileOpen={mobileOpen}
            />
          </AppBar>
        )}
        {showNavs && (
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
            <Drawer
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
              {drawer}
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
              {drawer}
            </Drawer>
          </Box>
        )}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: showNavs ? 3 : 0,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
          className="main-box"
        >
          {/* {showNavs && <Toolbar />} */}
          <Routes>
            {/* {admin ? ( */}
            <React.Fragment>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products/allProducts" element={<AllProducts />} />
              <Route
                path="/products/allProducts/addProduct"
                element={<AddProduct />}
              />
              <Route path="/users/allUsers" element={<AllUsers />} />
              <Route path="/users/allUsers/add" element={<AddUser />} />
              <Route path="/users/userGroups" element={<UserGroups />} />
              <Route path="/users/userEnquiries" element={<UserEnquiries />} />
              <Route
                path="/users/userGroups/create"
                element={<CreateUserGroup />}
              />
              <Route path="/users/allUsers/details" element={<UserDetails />} />
              <Route
                path="/parameters/additionalFields"
                element={<AdditionalFields />}
              />
              <Route
                path="/parameters/additionalFields/createFieldSets"
                element={<CreateFieldSets />}
              />
              <Route path="/parameters/categories" element={<Categories />} />
              <Route path="/parameters/collections" element={<Collections />} />
              <Route
                path="/parameters/collections/create"
                element={<CreateCollection />}
              />
              <Route path="/parameters/variantSets" element={<VariantSets />} />
              <Route
                path="/parameters/variantSets/edit"
                element={<CreateVariantSets />}
              />
              <Route path="/parameters/vendors" element={<Vendors />} />
              <Route path="/parameters/vendors/edit" element={<EditVendor />} />
              <Route path="/parameters/tagsManager" element={<TagsManager />} />
              <Route
                path="/parameters/tagsManager/edit"
                element={<EditTags />}
              />
              <Route path="/teams/roles" element={<Roles />} />
              <Route path="/teams/roles/create" element={<CreateRoles />} />
              <Route path="/teams/members" element={<Members />} />
              <Route
                path="/teams/members/details"
                element={<MemberDetails />}
              />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </React.Fragment>
            {/* ) : (
              <React.Fragment>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </React.Fragment>
            )} */}
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
