import { createBrowserRouter, Navigate } from "react-router-dom";
import store from "./app/store";

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
import PrimaryLayout from "./layouts/PrimaryLayout";
import ActionLayout from "./layouts/ActionLayout";
import EditCategories from "./pages/Parameters/Categories/EditCategories/EditCategories";
import EditSubCategories from "./pages/Parameters/Categories/EditSubCategories/EditSubCategories";
import EditCollection from "./pages/Parameters/Collections/EditCollection/EditCollection";
import ProductTabs from "./pages/Parameters/ProductTabs/ProductTabs";
import ProductTabInfo from "./pages/Parameters/ProductTabs/ProductTabInfo";
import OptionsInfo from "./pages/Parameters/Options/OptionsInfo";

const router = () => {
  const loginStatus = store.getState().auth.isLoggedIn;

  return createBrowserRouter([
    {
      element: <ActionLayout />,
      children: [
        {
          path: "",
          children: [
            {
              index: true,
              element: <Navigate to="auth" replace={true} />,
            },
            {
              path: "auth",
              children: [
                {
                  index: true,
                  element: <Navigate to="login" replace={true} />,
                },
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
          ],
        },
        {
          element: <PrimaryLayout />,
          children: [
            {
              path: "dashboard",
              element: <Dashboard />,
            },
            {
              path: "products",
              children: [
                {
                  index: true,
                  element: <Navigate to=" " replace={true} />,
                },
                {
                  path: "allProducts",
                  element: <AllProducts />,
                },
                {
                  path: "allProducts/addProduct",
                  element: <AddProduct />,
                },
                {
                  path: "bulkEditor",
                  element: <ProductsBulkEditor />,
                },
                {
                  path: "reviews",
                  element: <ProductReviews />,
                },

                {
                  path: "reviews/create",
                  element: <CreateReview />,
                },
                {
                  path: "inventory",
                  element: <ProductInventory />,
                },
                {
                  path: "inventory/create",
                  element: <CreateStore />,
                },
                {
                  path: "inventory/details",
                  element: <ProductInventoryDetails />,
                },
              ],
            },
            {
              path: "users",
              children: [
                {
                  index: true,
                  element: <Navigate to="allUsers" replace={true} />,
                },
                {
                  path: "allUsers",
                  element: <AllUsers />,
                },
                {
                  path: "allUsers/add",
                  element: <AddUser />,
                },
                {
                  path: "allUsers/details/:id",
                  element: <UserDetails />,
                },
                {
                  path: "userGroups",
                  element: <UserGroups />,
                },
                {
                  path: "userGroups/create",
                  element: <CreateUserGroup />,
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
                  index: true,
                  element: <Navigate to="collections" replace={true} />,
                },
                {
                  path: "collections",
                  element: <Collections />,
                },
                {
                  path: "collections/create",
                  element: <CreateCollection />,
                },
                {
                  path: "collections/edit/:id/:filter",
                  element: <EditCollection />,
                },
                {
                  path: "productTabs",
                  element: <ProductTabs />,
                },
                {
                  path: "productTabs/create",
                  element: <ProductTabInfo />,
                },
                {
                  path: "productTabs/edit/:id",
                  element: <ProductTabInfo />,
                },
                {
                  path: "additionalFields",
                  element: <AdditionalFields />,
                },
                {
                  path: "additionalFields/createFieldSets",
                  element: <CreateFieldSets />,
                },
                {
                  path: "categories",
                  element: <Categories />,
                },
                {
                  path: "categories/edit/:id/:filter",
                  element: <EditCategories />,
                },
                {
                  path: "subCategories/edit/:id/:filter",
                  element: <EditSubCategories />,
                },
                {
                  path: "options/create",
                  element: <OptionsInfo />,
                },
                {
                  path: "variantSets/edit",
                  element: <CreateVariantSets />,
                },
                {
                  path: "variantSets/dataSets/create",
                  element: <CreateDataSets />,
                },
                {
                  path: "vendors",
                  element: <Vendors />,
                },
                {
                  path: "vendors/edit/:id/:filter",
                  element: <EditVendor />,
                },
                {
                  path: "tagsManager",
                  element: <TagsManager />,
                },
                {
                  path: "tagsManager/edit",
                  element: <EditTags />,
                },
                {
                  path: "priceMaster",
                  element: <PriceMasterLanding />,
                },
                {
                  path: "priceMaster/inventory",
                  element: <PriceMaster />,
                },
                {
                  path: "priceMaster/create",
                  element: <CreatePriceMaster />,
                },
                {
                  path: "priceMaster/metalMaster",
                  element: <MetalPriceManager />,
                },
                {
                  path: "priceMaster/diamondMaster",
                  element: <DiamondPriceManager />,
                },
                {
                  path: "priceMaster/makingMaster",
                  element: <MakingChargesManager />,
                },
              ],
            },
            {
              path: "teams",
              children: [
                {
                  index: true,
                  element: <Navigate to="roles" replace={true} />,
                },
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
                  index: true,
                  element: <Navigate to="discounts" replace={true} />,
                },
                {
                  path: "discounts",
                  element: <Discounts />,
                },
                {
                  path: "discounts/create",
                  element: <CreateDiscount />,

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
                  index: true,
                  element: <Navigate to="allOrders" replace={true} />,
                },
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
                  index: true,
                  element: <Navigate to="allFunctionality" replace={true} />,
                },
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
          ],
        },
        {
          path: "*",
          element: (
            <Navigate to={loginStatus ? "/dashboard" : "/"} replace={true} />
          ),
        },
      ],
    },
  ]);
};

export default router;
