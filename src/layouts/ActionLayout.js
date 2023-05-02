import { useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { checkUserStatus } from "../features/user/userAction";
import { checkLoginStatus } from "../features/auth/authAction";

const ActionLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const loginStatus = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    dispatch(checkLoginStatus());
  }, [dispatch]);

  useEffect(() => {
    if (loginStatus) {
      dispatch(checkUserStatus());
      navigate("/dashboard", { replace: true });
    } else {
      const isAuthScreen =
        location.pathname === "/auth/signup" ||
        location.pathname === "/auth/login";
      if (!isAuthScreen) {
        navigate("/auth/login", { replace: true });
      }
    }
  }, [loginStatus, dispatch, navigate, location]);

  return <Outlet />;
};

export default ActionLayout;
