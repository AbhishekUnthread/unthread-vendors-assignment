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

const VisibilityBox = ({value,onChange}) => {

  return (
    <div className="bg-black-15 border-grey-5 rounded-8 p-3 mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="text-lightBlue fw-500">Visibility</h6>
      </div>
        <FormControl>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                value={value}
                onChange={onChange}
            >
                <FormControlLabel value={true} control={<Radio />} 
                  label="Visible in frontend" 
                  sx={{
                      "& .MuiTypography-root": {
                        color: "#c8d8ff",
                      },
                    }} 
                />
                <FormControlLabel value={false} control={<Radio />} label="Hidden from website" 
                  sx={{
                    "& .MuiTypography-root": {
                      color: "#c8d8ff",
                    },
                  }}
                />
            </RadioGroup>
        </FormControl>
        <FormGroup>
            <FormControlLabel control={<Checkbox defaultChecked size="small" />} label="Schedule Visibility"
            sx={{
              "& .MuiTypography-root": {
                color: "#c8d8ff",
              },
            }}
            />
        </FormGroup>
    </div>
  );
};

export default VisibilityBox;
