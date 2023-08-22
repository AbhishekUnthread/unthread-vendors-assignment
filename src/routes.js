import { createBrowserRouter, Navigate } from "react-router-dom";
import store from "./app/store";

import Vendors from "./pages/Parameters/Vendors/Vendors";
import EditVendor from "./pages/Parameters/EditVendor/EditVendor";

import PrimaryLayout from "./layouts/PrimaryLayout";
import ActionLayout from "./layouts/ActionLayout";

const router = () => {
  const loginStatus = store.getState().auth.isLoggedIn;

  return createBrowserRouter([
    {
      element: <ActionLayout />,
      children: [
        {
          element: <PrimaryLayout />,
          children: [
            {
              path: "parameters",
              children: [
                {
                  index: true,
                  element: <Navigate to="vendors" replace={true} />,
                },

                {
                  path: "vendors",
                  element: <Vendors />,
                },
                {
                  path: "vendors/edit/:id",
                  element: <EditVendor />,
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
