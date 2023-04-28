import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const ActionLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // navigate("/dashboard");
  }, []);

  return <Outlet />;
};

export default ActionLayout;
