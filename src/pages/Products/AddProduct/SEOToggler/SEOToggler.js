import React from "react";
import "../SEO/SEO.scss";
// ! COMPONENT IMPORTS
import { AntSwitch } from "../AntSwitch/AntSwitch";
// ! MATERIAL IMPORTS

const SEOToggler = () => {
  // ? CHECKBOX STARTS HERE
  const [checked, setChecked] = React.useState(true);

  // ? CHECKBOX ENDS HERE

  // ? SWITCH STARTS HERE
  const [checkedSwitch, setCheckedSwitch] = React.useState(true);
  const handleSwitchChange = (event) => {
    setCheckedSwitch(event.target.checked);
  };
  // ? SWITCH ENDS HERE

  return (
    <div className="border-grey-5 rounded-8 p-3 row features mt-4">
      <div className="d-flex col-12 px-0 justifu-content-between">
        <div className="d-flex align-items-center me-auto">
          <h6 className="text-lightBlue me-auto fw-500">
            Search Engine Optimisation
          </h6>
        </div>
        <AntSwitch
          inputProps={{ "aria-label": "ant design" }}
          checked={checkedSwitch}
          onChange={handleSwitchChange}
        />
      </div>
    </div>
  );
};

export default SEOToggler;
