import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { checkUserStatus } from "../features/user/userAction";
import { checkLoginStatus } from "../features/auth/authAction";

const ActionLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    dispatch(checkLoginStatus());
  }, [dispatch]);

  useEffect(() => {
    if (loginStatus) {
      dispatch(checkUserStatus());
      navigate("/dashboard", { replace: true });
    } else {
    }
  }, [loginStatus, dispatch, navigate]);

  return <Outlet />;
};

export default ActionLayout;
