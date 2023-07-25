import { NavLink, Outlet } from "react-router-dom";
import folderSmallGrey from "../../assets/icons/folderSmallGrey.svg";

const Settings = () => {
  return (
    <div className="page container-fluid position-relative">
      <div className="row">
        <div className="col-lg-2 mt-3">
          <div className="row mx-0 mt-4">
            <div className="col-12 px-0">
              <div className="d-flex flex-column mb-3">
                <h3 className="text-lightBlue fw-600 mb-2">Settings</h3>

                <span className="c-pointer text-grey-6">
                  Dashboard / Settings
                </span>
              </div>

              <div className="d-flex flex-column">
                <NavLink to="filemanager" className="d-flex align-items-center">
                  <img
                    className="ms-2"
                    src={folderSmallGrey}
                    alt="sub-nav"
                    width={40}
                  />
                  <span className="ms-2">File Manager</span>
                </NavLink>
                <NavLink to="taxmanager" className="d-flex align-items-center">
                  <img
                    className="ms-2"
                    src={folderSmallGrey}
                    alt="sub-nav"
                    width={40}
                  />
                  <span className="ms-2">Tax Manager</span>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Settings;
