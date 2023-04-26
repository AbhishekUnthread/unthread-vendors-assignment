import { useState, useEffect } from "react";
import { AppBar, Box, CssBaseline, Drawer } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";

import "./App.scss";

import Navbar from "./components/Navbar/Navbar";
import Sidenav from "./components/Sidenav/Sidenav";
import Dashboard from "./pages/Dashboard/Dashboard";
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
import ProductInventory from "./pages/Products/ProductInventory/ProductInventory";
import CreateStore from "./pages/Products/CreateStore/CreateStore";
import ProductInventoryDetails from "./pages/Products/ProductInventoryDetails/ProductInventoryDetails";
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
import AllFunctionality from "./pages/Functionality/AllFunctionality/AllFunctionality";
import LabelsBadges from "./pages/Functionality/LabelsBadges/LabelsBadges";
import PreOrder from "./pages/Functionality/PreOrder/PreOrder";
import SizeChart from "./pages/Functionality/SizeChart/SizeChart";
import CreateSizeChart from "./pages/Functionality/CreateSizeChart/CreateSizeChart";
import CreatePreOrder from "./pages/Functionality/CreatePreOrder/CreatePreOrder";
import CreateLabels from "./pages/Functionality/CreateLabels/CreateLabels";
import ReturnRefunds from "./pages/Orders/ReturnRefunds/ReturnRefunds";
import CreateRefund from "./pages/Orders/CreateRefund/CreateRefund";
import ReturnRequestDetails from "./pages/Orders/ReturnRequestDetails/ReturnRequestDetails";
import ExchangeAlterationRequests from "./pages/Orders/ExchangeAlterationRequests/ExchangeAlterationRequests";
import Login from "./pages/Auth/Login/Login";
import Signup from "./pages/Auth/Signup/Signup";
import CreateReturn from "./pages/Orders/CreateReturn/CreateReturn.js";

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

const router = createBrowserRouter([
  {
    path: "auth",
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "products",
    children: [
      {
        path: "allProducts",
        element: <AllProducts />,
        children: [
          {
            path: "addProduct",
            element: <AddProduct />,
          },
        ],
      },
      {
        path: "bulkEditor",
        element: <ProductsBulkEditor />,
      },
      {
        path: "reviews",
        element: <ProductReviews />,
        children: [
          {
            path: "create",
            element: <CreateReview />,
          },
        ],
      },
      {
        path: "inventory",
        element: <ProductInventory />,
        children: [
          {
            path: "create",
            element: <CreateStore />,
          },
          {
            path: "details",
            element: <ProductInventoryDetails />,
          },
        ],
      },
    ],
  },
  {
    path: "users",
    children: [
      {
        path: "allUsers",
        element: <AllUsers />,
        children: [
          {
            path: "add",
            element: <AddUser />,
          },
          {
            path: "details",
            element: <UserDetails />,
          },
        ],
      },
      {
        path: "userGroups",
        element: <UserGroups />,
        children: [
          {
            path: "create",
            element: <CreateUserGroup />,
          },
        ],
      },
      {
        path: "userEnquiries",
        element: <UserEnquiries />,
      },
    ],
  },
  {
    path: "parameters",
    children: [
      {
        path: "collections",
        element: <Collections />,
        children: [
          {
            path: "create",
            element: <CreateCollection />,
          },
        ],
      },
      {
        path: "additionalFields",
        element: <AdditionalFields />,
        children: [
          {
            path: "createFieldSets",
            element: <CreateFieldSets />,
          },
        ],
      },
      {
        path: "categories",
        element: <Categories />,
        children: [
          {
            path: "edit",
            element: <EditVendor />,
          },
        ],
      },
      {
        path: "variantSets",
        element: <VariantSets />,
        children: [
          {
            path: "edit",
            element: <CreateVariantSets />,
          },
          {
            path: "dataSets/create",
            element: <CreateDataSets />,
          },
        ],
      },
      {
        path: "vendors",
        element: <Vendors />,
        children: [
          {
            path: "edit",
            element: <EditVendor />,
          },
        ],
      },
      {
        path: "tagsManager",
        element: <TagsManager />,
        children: [
          {
            path: "edit",
            element: <EditTags />,
          },
        ],
      },
      {
        path: "priceMaster",
        element: <PriceMasterLanding />,
        children: [
          {
            path: "inventory",
            element: <PriceMaster />,
          },
          {
            path: "create",
            element: <CreatePriceMaster />,
          },
          {
            path: "metalMaster",
            element: <MetalPriceManager />,
          },
          {
            path: "diamondMaster",
            element: <DiamondPriceManager />,
          },
          {
            path: "makingMaster",
            element: <MakingChargesManager />,
          },
        ],
      },
    ],
  },
  {
    path: "teams",
    children: [
      {
        path: "roles",
        element: <Roles />,
        children: [
          {
            path: "create",
            element: <CreateRoles />,
          },
        ],
      },
      {
        path: "members",
        element: <Members />,
        children: [
          {
            path: "details",
            element: <MemberDetails />,
          },
        ],
      },
    ],
  },
  {
    path: "offers",
    children: [
      {
        path: "discounts",
        element: <Discounts />,
        children: [
          {
            path: "create",
            element: <CreateDiscount />,
          },
        ],
      },
      {
        path: "bundleDiscount",
        element: <BundleDiscount />,
        children: [
          {
            path: "create",
            element: <CreateBundleDiscount />,
          },
        ],
      },
    ],
  },
  {
    path: "orders",
    children: [
      {
        path: "allOrders",
        element: <AllOrders />,
        children: [
          {
            path: "create",
            element: <CreateOrder />,
          },
          {
            path: "details",
            element: <OrderDetails />,
          },
        ],
      },
      {
        path: "omniChannelOrders",
        element: <OmniChannelOrders />,
      },
      {
        path: "draftOrder",
        element: <DraftOrder />,
      },
      {
        path: "abandonedCart",
        element: <AbandonedCart />,
        children: [
          {
            path: "details",
            element: <AbandonedCartDetails />,
          },
        ],
      },
      {
        path: "orderDetails",
        element: <OrderDetails />,
      },
      {
        path: "returnRefunds",
        element: <ReturnRefunds />,
        children: [
          {
            path: "refunds/create",
            element: <CreateRefund />,
          },
          {
            path: "returns/create",
            element: <CreateReturn />,
          },
          {
            path: "details",
            element: <ReturnRequestDetails />,
          },
        ],
      },
      {
        path: "exchangeAlterationRequests",
        element: <ExchangeAlterationRequests />,
      },
    ],
  },
  {
    path: "functionality",
    children: [
      {
        path: "allFunctionality",
        element: <AllFunctionality />,
      },
      {
        path: "sizeChart",
        element: <SizeChart />,
        children: [
          {
            path: "create",
            element: <CreateSizeChart />,
          },
        ],
      },
      {
        path: "labelsBadges",
        element: <LabelsBadges />,
        children: [
          {
            path: "create",
            element: <CreateLabels />,
          },
        ],
      },
      {
        path: "preOrder",
        element: <PreOrder />,
        children: [
          {
            path: "create",
            element: <CreatePreOrder />,
          },
        ],
      },
    ],
  },
]);

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
