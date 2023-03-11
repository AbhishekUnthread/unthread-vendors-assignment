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
import ProductsBulkEditor from "./pages/Products/ProductsBulkEditor/ProductsBulkEditor";
import ProductReviews from "./pages/Products/ProductReviews/ProductReviews";
import CreateReview from "./pages/Products/CreateReview/CreateReview";
import ProductInventory from "./pages/Products/ProductIntventory/ProductIntventory";
import CreateStore from "./pages/Products/CreateStore/CreateStore";
import ProductInventroyDetails from "./pages/Products/ProductInventroyDetails/ProductInventroyDetails";
import CreateDataSets from "./pages/Parameters/CreateDataSets/CreateDataSets";
import AllOrders from "./pages/Orders/AllOrders/AllOrders";
import CreateOrder from "./pages/Orders/CreateOrder/CreateOrder";
import OrderDetails from "./pages/Orders/OrderDetails/OrderDetails";
import OmniChannelOrders from "./pages/Orders/OmniChannelOrders/OmniChannelOrders";
import DraftOrder from "./pages/Orders/DraftOrder/DraftOrder";
import AbandonedCart from "./pages/Orders/AbandonedCart/AbandonedCart";
import AbandonedCartDetails from "./pages/Orders/AbandonedCartDetails/AbandonedCartDetails";
import CreateDiscount from "./pages/Offers/CreateDiscount/CreateDiscount";
import Discounts from "./pages/Offers/Discounts/Discounts";
import BundleDiscount from "./pages/Offers/BundleDiscount/BundleDiscount";
import CreateBundleDiscount from "./pages/Offers/CreateBundleDiscount/CreateBundleDiscount";
import PriceMasterLanding from "./pages/Parameters/PriceMasterLanding/PriceMasterLanding";
import PriceMaster from "./pages/Parameters/PriceMaster/PriceMaster";
import CreatePriceMaster from "./pages/Parameters/CreatePriceMaster/CreatePriceMaster";
import MetalPriceManager from "./pages/Parameters/MetalPriceManager/MetalPriceManager";
import DiamondPriceManager from "./pages/Parameters/DiamondPriceManager/DiamondPriceManager";
import MakingChargesManager from "./pages/Parameters/MakingChargesManager/MakingChargesManager";
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
              {/* PRODUCT ROUTES */}
              <Route path="/products">
                <Route path="" element={<Navigate to="allProducts" />} />
                <Route path="allProducts" element={<AllProducts />} />
                <Route path="allProducts/addProduct" element={<AddProduct />} />
                <Route path="bulkEditor" element={<ProductsBulkEditor />} />
                <Route path="reviews" element={<ProductReviews />} />
                <Route path="reviews/create" element={<CreateReview />} />
                <Route path="inventory" element={<ProductInventory />} />
                <Route path="inventory/create" element={<CreateStore />} />
                <Route
                  path="inventory/details"
                  element={<ProductInventroyDetails />}
                />
              </Route>
              {/* USERS ROUTES */}
              <Route path="/users">
                <Route path="" element={<Navigate to="allUsers" />} />
                <Route path="allUsers" element={<AllUsers />} />
                <Route path="allUsers/add" element={<AddUser />} />
                <Route path="allUsers/details" element={<UserDetails />} />
                <Route path="userGroups" element={<UserGroups />} />
                <Route path="userGroups/create" element={<CreateUserGroup />} />
                <Route path="userEnquiries" element={<UserEnquiries />} />
              </Route>
              {/* PARAMETER ROUTES */}
              <Route path="/parameters">
                <Route path="" element={<Navigate to="collections" />} />
                <Route path="additionalFields" element={<AdditionalFields />} />
                <Route
                  path="additionalFields/createFieldSets"
                  element={<CreateFieldSets />}
                />
                <Route path="categories" element={<Categories />} />
                <Route path="collections" element={<Collections />} />
                <Route
                  path="collections/create"
                  element={<CreateCollection />}
                />
                <Route path="variantSets" element={<VariantSets />} />
                <Route
                  path="variantSets/edit"
                  element={<CreateVariantSets />}
                />
                <Route
                  path="variantSets/dataSets/create"
                  element={<CreateDataSets />}
                />
                <Route path="vendors" element={<Vendors />} />
                <Route path="categories/edit" element={<EditVendor />} />
                <Route path="vendors/edit" element={<EditVendor />} />
                <Route path="tagsManager/edit" element={<EditVendor />} />
                <Route path="tagsManager" element={<TagsManager />} />
                <Route path="tagsManager/edit" element={<EditTags />} />
                <Route path="priceMaster" element={<PriceMasterLanding />} />
                <Route path="priceMaster/inventory" element={<PriceMaster />} />
                <Route
                  path="priceMaster/create"
                  element={<CreatePriceMaster />}
                />
                <Route
                  path="priceMaster/metalMaster"
                  element={<MetalPriceManager />}
                />
                <Route
                  path="priceMaster/diamondMaster"
                  element={<DiamondPriceManager />}
                />
                <Route
                  path="priceMaster/makingMaster"
                  element={<MakingChargesManager />}
                />
              </Route>
              {/* TEAM ROUTES */}
              <Route path="/teams">
                <Route path="" element={<Navigate to="roles" />} />
                <Route path="roles" element={<Roles />} />
                <Route path="roles/create" element={<CreateRoles />} />
                <Route path="members" element={<Members />} />
                <Route path="members/details" element={<MemberDetails />} />
              </Route>
              {/* OFFERS ROUTES */}
              <Route path="/offers">
                <Route path="" element={<Navigate to="discounts" />} />
                <Route path="discounts" element={<Discounts />} />
                <Route path="discounts/create" element={<CreateDiscount />} />
                <Route path="bundleDiscount" element={<BundleDiscount />} />
                <Route
                  path="bundleDiscount/create"
                  element={<CreateBundleDiscount />}
                />
              </Route>
              {/* ORDER ROUTES */}
              <Route path="/orders">
                <Route path="" element={<Navigate to="allOrders" />} />
                <Route path="allOrders" element={<AllOrders />} />
                <Route path="allOrders/create" element={<CreateOrder />} />
                <Route path="allOrders/details" element={<OrderDetails />} />
                <Route
                  path="omniChannelOrders"
                  element={<OmniChannelOrders />}
                />
                <Route path="draftOrder" element={<DraftOrder />} />
                <Route path="abandonedCart" element={<AbandonedCart />} />
                <Route
                  path="abandonedCart/details"
                  element={<AbandonedCartDetails />}
                />
                <Route path="orderDetails" element={<OrderDetails />} />
              </Route>
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
