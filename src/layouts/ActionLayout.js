import { useEffect, useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, CircularProgress } from "@mui/material";
import ScrollToTop from "../ScrollToTop";

import { checkUserStatus } from "../features/user/userAction";
import { checkLoginStatus } from "../features/auth/authAction";

let firstRender = true;

const ActionLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const loginStatus = useSelector((state) => state.auth.isLoggedIn);
  const [isAuthScreen, setIsAuthScreen] = useState(null);

  useEffect(() => {
    firstRender && dispatch(checkLoginStatus());
  }, [dispatch]);

  useEffect(() => {
    if (loginStatus && isAuthScreen) {
      dispatch(checkUserStatus());
      navigate("/parameters/vendors", { replace: true });
    }
    if (loginStatus === false && isAuthScreen === false) {
      navigate("/parameters/vendors", { replace: true });
    }
  }, [loginStatus, dispatch, navigate, isAuthScreen]);

  useEffect(() => {
    setIsAuthScreen(
      location.pathname === "/auth/signup" ||
        location.pathname === "/auth/login" ||
        location.pathname === "/"
    );
  }, [location]);

  return (
    <>
      <ScrollToTop />
      <Box className="main-box-secondary">
        {(loginStatus === false && isAuthScreen) ||
        (loginStatus && isAuthScreen === false) ? (
          <Outlet />
        ) : (
          <div className="container-fluid loader">
            <CircularProgress color="secondary" size={60} />
          </div>
        )}
      </Box>
    </>
  );
};

export default ActionLayout;
