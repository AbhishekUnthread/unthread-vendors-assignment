import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";

import { checkUserStatus } from "../features/user/userAction";
import { checkLoginStatus } from "../features/auth/authAction";

const ActionLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserStatus());
    dispatch(checkLoginStatus());
    // navigate("/dashboard");
  }, []);

  return <Outlet />;
};

export default ActionLayout;
