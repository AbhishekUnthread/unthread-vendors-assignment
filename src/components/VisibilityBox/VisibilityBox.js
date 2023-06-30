import React from "react";
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Radio,
    RadioGroup,
} from "@mui/material";
import clock from "../../assets/icons/clock.svg";
const VisibilityBox = ({ value, onChange }) => {
  const [selectedValue, setSelectedValue] = React.useState(value);
  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
    onChange(event.target.value);
  };
  return (
    <div className="bg-black-15 border-grey-5 rounded-8 p-3 mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="text-lightBlue fw-500">Visibility</h6>
      </div>
        <FormControl>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                value={selectedValue}
                onChange={handleRadioChange}
            >
                <FormControlLabel value={true} control={<Radio />}
                  label="Visible in frontend"
                  sx={{
                      "& .MuiTypography-root": {
                        color: "#C8D8FF",
                      },
                    }}
                />
                <FormControlLabel value={false} control={<Radio />} label="Hidden from website"
                  sx={{
                    "& .MuiTypography-root": {
                      color: "#C8D8FF",
                    },
                  }}
                />
            </RadioGroup>
        </FormControl>
    </div>
  );
};
export default VisibilityBox;
