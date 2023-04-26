import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Drawer } from "@mui/material";
import { useSelector } from "react-redux";

import Navbar from "../components/Navbar/Navbar";
import Sidenav from "../components/Sidenav/Sidenav";

const DRAWER_WIDTH = 240;

const PrimaryLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showNavs, setShowNavs] = useState(false);

  const loginStatus = useSelector((state) => state.auth.isLoggedIn);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <>
      <Outlet />
    </>
  );
};

export default PrimaryLayout;
