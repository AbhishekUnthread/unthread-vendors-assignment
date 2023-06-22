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

const VisibilityBox = () => {
    
  // ? SCHEDULE PRODUCT DIALOG STARTS HERE
  const [openScheduleProduct, setOpenScheduleProduct] = React.useState(false);

  const handelScheduleProduct = () => {
    setOpenScheduleProduct(true);
  };

  const handelScheduleProductClose = () => {
    setOpenScheduleProduct(false);
  };
  // ? SCHEDULE PRODUCT DIALOG ENDS HERE

  return (
    <div className="bg-black-15 border-grey-5 rounded-8 p-3 mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="text-lightBlue fw-500">Visibility</h6>
      </div>
        <FormControl>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
            >
                <FormControlLabel value="Visible" control={<Radio />} label="Visible in frontend" />
                <FormControlLabel value="hidden" control={<Radio />} label="Hidden from website" />
            </RadioGroup>
        </FormControl>
        <FormGroup>
            <FormControlLabel  control={<Checkbox defaultChecked size="small" />} label="Schedule Visibility" />
        </FormGroup>
    </div>
  );
};

export default VisibilityBox;
