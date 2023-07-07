// ! IMAGES IMPORTS
// import logo from "../../assets/icons/logo.svg";
import dashboard from "../../assets/icons/sidenav/dashboard.svg";
import orders from "../../assets/icons/sidenav/orders.svg";
import products from "../../assets/icons/sidenav/products.svg";
// import analytics from "../../assets/icons/sidenav/analytics.svg";
import customers from "../../assets/icons/sidenav/customers.svg";
import discounts from "../../assets/icons/sidenav/discounts.svg";
// import emailers from "../../assets/icons/sidenav/emailers.svg";
import functionality from "../../assets/icons/sidenav/functionality.svg";
// import globalStore from "../../assets/icons/sidenav/globalStore.svg";
import parameters from "../../assets/icons/sidenav/parameters.svg";
import teams from "../../assets/icons/sidenav/teams.svg";
// import helpCenter from "../../assets/icons/sidenav/helpCenter.svg";
// import newFeatures from "../../assets/icons/sidenav/newFeatures.svg";
// import settings from "../../assets/icons/sidenav/settings.svg";
export const SidebarData = [
  {
    title: "Dashboard",
    path: "/dashboard",
    image: dashboard,
  },
  {
    title: "Orders",
    path: "/orders",
    image: orders,
    subNav: [
      {
        title: "All Orders",
        path: "/orders/allOrders",
        image: orders,
      },
      {
        title: "Omni-Channel Orders",
        path: "/orders/omniChannelOrders",
        image: orders,
      },
      {
        title: "Return & Refunds",
        path: "/orders/returnRefunds",
        image: orders,
      },
      {
        title: "Exchange & Alteration",
        path: "/orders/exchangeAlterationRequests",
        image: orders,
      },
      {
        title: "Draft",
        path: "/orders/draftOrder",
        image: orders,
      },
      {
        title: "Abandoned Cart",
        path: "/orders/abandonedCart",
        image: orders,
      },
    ],
  },
  {
    title: "Products",
    path: "/products/allProducts",
    image: products,
    subNav: [
      {
        title: "All Products",
        path: "/products/allProducts",
        image: products,
      },
      {
        title: "Inventory",
        path: "/products/inventory",
        image: products,
      },
      {
        title: "Bulk Editor",
        path: "/products/bulkEditor",
        image: products,
      },
      {
        title: "Product Reviews",
        path: "/products/reviews",
        image: products,
      },
      {
        title: "Settings",
        path: "/",
        image: products,
      },
    ],
  },
  {
    title: "Parameters",
    path: "/parameters",
    image: parameters,
    subNav: [
      {
        title: "Collections",
        path: "/parameters/collections",
        image: parameters,
      },
      {
        title: "Categories",
        path: "/parameters/categories",
        image: parameters,
      },
      {
        title: "Product Tabs",
        path: "/parameters/productTabs",
        image: parameters,
      },
      {
        title: "Vendors",
        path: "/parameters/vendors",
        image: parameters,
      },
      {
        title: "Tags Manager",
        path: "/parameters/tagsManager",
        image: parameters,
      },
      {
        title: "Option Sets",
        path: "/parameters/variantSets",
        image: parameters,
      },
      {
        title: "Additional Fields",
        path: "/parameters/additionalFields",
        image: parameters,
      },
      {
        title: "Price Master",
        path: "/parameters/priceMaster",
        image: parameters,
      },
    ],
  },
  {
    title: "Users",
    path: "/users",
    image: customers,
    subNav: [
      {
        title: "All Users",
        path: "/users/allUsers",
        image: customers,
      },
      {
        title: "User Groups",
        path: "/users/userGroups",
        image: customers,
      },
      {
        title: "Enquiries",
        path: "/users/userEnquiries",
        image: customers,
      },
      {
        title: "Loyalty Points",
        path: "/",
        image: customers,
      },
      {
        title: "User Settings",
        path: "/",
        image: customers,
      },
    ],
  },
  {
    title: "Teams",
    path: "/teams",
    image: teams,
    subNav: [
      {
        title: "Roles",
        path: "/teams/roles",
        image: teams,
      },
      {
        title: "Members",
        path: "/teams/members",
        image: teams,
      },
    ],
  },
  {
    title: "Offers",
    path: "/offers",
    image: discounts,
    subNav: [
      {
        title: "Discounts",
        path: "/offers/discounts",
        image: discounts,
      },
      {
        title: "Bundle Discount",
        path: "/offers/bundleDiscount",
        image: discounts,
      },
    ],
  },
  {
    title: "Functionality",
    path: "/functionality",
    image: functionality,
    subNav: [
      {
        title: "All Functionality",
        path: "/functionality/allFunctionality",
        image: functionality,
      },
      {
        title: "Size Chart",
        path: "/functionality/sizeChart",
        image: functionality,
      },
      {
        title: "Labels & badges",
        path: "/functionality/labelsBadges",
        image: functionality,
      },
      {
        title: "Pre Order",
        path: "/functionality/preOrder",
        image: functionality,
      },
    ],
  },
];
