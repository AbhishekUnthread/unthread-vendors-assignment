import React from "react";
import { Checkbox, FormControlLabel } from "@mui/material";

const GridCostRenderer = () => {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          size="small"
          checked={checked}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
          style={{
            color: "#5C6D8E",
          }}
        />
      }
    />
  );
};

export default GridCostRenderer;
