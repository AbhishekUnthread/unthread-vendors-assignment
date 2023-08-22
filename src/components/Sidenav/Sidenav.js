import React, { useState } from "react";
import "./Sidenav.scss";
import { NavLink } from "react-router-dom";
// ! IMAGES IMPORTS
import logo from "../../assets/icons/logo.svg";
import analytics from "../../assets/icons/sidenav/analytics.svg";
// import discounts from "../../assets/icons/sidenav/discounts.svg";
// import functionality from "../../assets/icons/sidenav/functionality.svg";
import globalStore from "../../assets/icons/sidenav/globalStore.svg";
import helpCenter from "../../assets/icons/sidenav/helpCenter.svg";
import newFeatures from "../../assets/icons/sidenav/newFeatures.svg";
import settings from "../../assets/icons/sidenav/settings.svg";
// ! MATERIAL IMPORTS
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { SidebarData } from "./SidenavData";

const Sidenav = () => {
  const sidenavData = SidebarData;

  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <div className="sidenav px-2">
      <div className="d-flex align-items-center logo ps-3">
        <img src={logo} alt="Company Logo" width={70} className="ms-1" />
      </div>
      <List>
        <div className="accordion" id="accordionExample">
          {sidenavData.map((item, index) =>
            !item.subNav ? (
              <NavLink
                to={item.path}
                key={index}
                onClick={item.subNav && showSubnav}
              >
                <ListItem button key={item.title} className="list-item">
                  <ListItemIcon className="me-2 list-icon">
                    <img src={item.image} alt="dashboard" />
                  </ListItemIcon>
                  <ListItemText primary={item.title} className="list-text" />
                </ListItem>
              </NavLink>
            ) : (
              <div className="accordion-item bg-transparent" key={index}>
                <NavLink to={item.path}>
                  <ListItem
                    button
                    key={item.title}
                    className="list-item"
                    data-bs-toggle="collapse"
                    data-bs-target={"#Accordian" + index}
                    aria-expanded="true"
                    aria-controls={"Accordian" + index}
                  >
                    <ListItemIcon className="me-2 list-icon">
                      <img src={item.image} alt="dashboard" />
                    </ListItemIcon>
                    <ListItemText primary={item.title} className="list-text" />
                  </ListItem>
                </NavLink>
                <div
                  id={"Accordian" + index}
                  className="accordion-collapse collapse "
                  aria-labelledby={"heading" + index}
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body pb-1">
                    {item.subNav &&
                      item.subNav.map((sub, index) => (
                        <NavLink to={sub.path} key={index}>
                          <ListItem
                            button
                            key={sub.title}
                            className="list-item"
                          >
                            {/* <ListItemIcon className="me-2 list-icon">
                              <img src={sub.image} alt="dashboard" />
                            </ListItemIcon> */}
                            <ListItemText
                              primary={sub.title}
                              className="list-text ms-4"
                            />
                          </ListItem>
                        </NavLink>
                      ))}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </List>
    </div>
  );
};

export default Sidenav;
