import React from "react";
import "./Sidenav.scss";
import { NavLink } from "react-router-dom";
// ! IMAGES IMPORTS
import logo from "../../assets/icons/logo.svg";
import dashboard from "../../assets/icons/sidenav/dashboard.svg";
import orders from "../../assets/icons/sidenav/orders.svg";
import products from "../../assets/icons/sidenav/products.svg";
import analytics from "../../assets/icons/sidenav/analytics.svg";
import customers from "../../assets/icons/sidenav/customers.svg";
import discounts from "../../assets/icons/sidenav/discounts.svg";
import emailers from "../../assets/icons/sidenav/emailers.svg";
import functionality from "../../assets/icons/sidenav/functionality.svg";
import globalStore from "../../assets/icons/sidenav/globalStore.svg";
import parameters from "../../assets/icons/sidenav/parameters.svg";
import teams from "../../assets/icons/sidenav/teams.svg";
import helpCenter from "../../assets/icons/sidenav/helpCenter.svg";
import newFeatures from "../../assets/icons/sidenav/newFeatures.svg";
import settings from "../../assets/icons/sidenav/settings.svg";
// ! MATERIAL IMPORTS
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

const Sidenav = () => {
  return (
    <div className="sidenav px-2">
      <div className="d-flex align-items-center logo ps-3">
        <img src={logo} alt="Company Logo" width={70} className="ms-1" />
      </div>
      <List>
        <NavLink to="/dashboard">
          <ListItem button key="Dashboard" className="list-item">
            <ListItemIcon className="me-2 list-icon">
              <img src={dashboard} alt="dashboard" />
            </ListItemIcon>
            <ListItemText primary="Dashboard" className="list-text" />
          </ListItem>
        </NavLink>
        <NavLink to="/orders">
          <ListItem button key="Orders" className="list-item">
            <ListItemIcon className="me-2 list-icon">
              <img src={orders} alt="orders" />
            </ListItemIcon>
            <ListItemText primary="Orders" className="list-text" />
          </ListItem>
        </NavLink>
        <NavLink to="/allProducts">
          <ListItem button key="Products" className="list-item">
            <ListItemIcon className="me-2 list-icon">
              <img src={products} alt="products" />
            </ListItemIcon>
            <ListItemText primary="Products" className="list-text" />
          </ListItem>
        </NavLink>
        <NavLink to="/parameters">
          <ListItem button key="Parameters" className="list-item">
            <ListItemIcon className="me-2 list-icon">
              <img src={parameters} alt="parameters" />
            </ListItemIcon>
            <ListItemText primary="Parameters" className="list-text" />
          </ListItem>
        </NavLink>
        <NavLink to="/customers">
          <ListItem button key="Customers" className="list-item">
            <ListItemIcon className="me-2 list-icon">
              <img src={customers} alt="customers" />
            </ListItemIcon>
            <ListItemText primary="Customers" className="list-text" />
          </ListItem>
        </NavLink>
        <NavLink to="/analytics">
          <ListItem button key="Analytics" className="list-item">
            <ListItemIcon className="me-2 list-icon">
              <img src={analytics} alt="analytics" />
            </ListItemIcon>
            <ListItemText primary="Analytics" className="list-text" />
          </ListItem>
        </NavLink>
        <NavLink to="/discounts">
          <ListItem button key="Discounts" className="list-item">
            <ListItemIcon className="me-2 list-icon">
              <img src={discounts} alt="discounts" />
            </ListItemIcon>
            <ListItemText primary="Discounts" className="list-text" />
          </ListItem>
        </NavLink>
        <NavLink to="/functionality">
          <ListItem button key="Functionality" className="list-item">
            <ListItemIcon className="me-2 list-icon">
              <img src={functionality} alt="functionality" />
            </ListItemIcon>
            <ListItemText primary="Functionality" className="list-text" />
          </ListItem>
        </NavLink>
        <NavLink to="/emailers">
          <ListItem button key="Emailers" className="list-item">
            <ListItemIcon className="me-2 list-icon">
              <img src={emailers} alt="emailers" />
            </ListItemIcon>
            <ListItemText primary="Emailers" className="list-text" />
          </ListItem>
        </NavLink>
        <NavLink to="/teams">
          <ListItem button key="Teams" className="list-item">
            <ListItemIcon className="me-2 list-icon">
              <img src={teams} alt="teams" />
            </ListItemIcon>
            <ListItemText primary="Teams" className="list-text" />
          </ListItem>
        </NavLink>
        <NavLink to="/globalStore">
          <ListItem button key="Global Store" className="list-item">
            <ListItemIcon className="me-2 list-icon">
              <img src={globalStore} alt="globalStore" />
            </ListItemIcon>
            <ListItemText primary="Global Store" className="list-text" />
          </ListItem>
        </NavLink>
        <NavLink to="/newFeatures">
          <ListItem button key="New Features" className="list-item">
            <ListItemIcon className="me-2 list-icon">
              <img src={newFeatures} alt="newFeatures" />
            </ListItemIcon>
            <ListItemText primary="New Features" className="list-text" />
          </ListItem>
        </NavLink>
        <NavLink to="/helpCenter">
          <ListItem button key="Help Center" className="list-item">
            <ListItemIcon className="me-2 list-icon">
              <img src={helpCenter} alt="helpCenter" />
            </ListItemIcon>
            <ListItemText primary="Help Center" className="list-text" />
          </ListItem>
        </NavLink>
        <NavLink to="/settings">
          <ListItem button key="Settings" className="list-item">
            <ListItemIcon className="me-2 list-icon">
              <img src={settings} alt="settings" />
            </ListItemIcon>
            <ListItemText primary="Settings" className="list-text" />
          </ListItem>
        </NavLink>
      </List>
    </div>
  );
};

export default Sidenav;
