import React from "react";
import { 
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Radio,
    RadioGroup,
    Slide,
    TextField,
    Tooltip,
} from "@mui/material";
import info from "../../assets/icons/info.svg";
import cancel from "../../assets/icons/cancel.svg";
import clock from "../../assets/icons/clock.svg";
import { DesktopDateTimePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// ? DIALOG TRANSITION STARTS HERE
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// ? DIALOG TRANSITION ENDS HERE

const VisibilityBox = ({value,visibilityChange,startDate,endDate,StartDateChange,EndDateChange}) => {

    // ? SCHEDULE  DIALOG STARTS HERE
    const [openSchedule, setOpenSchedule] = React.useState(false);

    function handelScheduleClose(){
      setOpenSchedule(false)
    }
  
    // ? SCHEDULE  DIALOG ENDS HERE

    // ? DATE PICKER STARTS HERE
  const [dateStartValue, setDateStartValue] = React.useState(new Date());
  // ? DATE PICKER ENDS HERE

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
                onChange={visibilityChange}
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
            <FormControlLabel control={<Checkbox
             checked={openSchedule}
             onChange={(e)=>setOpenSchedule(e.target.checked)}
              size="small" />} label="Schedule Visibility"
            sx={{
              "& .MuiTypography-root": {
                color: "#c8d8ff",
              },
            }}
            />
        </FormGroup>
        <Dialog
        open={openSchedule}
        TransitionComponent={Transition}
        keepMounted
        onClose={handelScheduleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogTitle>
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="text-lightBlue fw-500">Schedule</h5>
            <img
              src={cancel}
              alt="cancel"
              width={30}
              onClick={handelScheduleClose}
              className="c-pointer"
            />
          </div>
        </DialogTitle>
        <hr className="hr-grey-6 my-0" />
        <DialogContent className="py-3 px-4 schedule-product">
          <div className="d-flex mb-1">
            <p className="text-lightBlue">Start Date</p>
            <Tooltip title="Lorem ipsum" placement="top">
              <img
                src={info}
                alt="info"
                className="ms-2 c-pointer"
                width={13.5}
              />
            </Tooltip>
          </div>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DesktopDateTimePicker
              value={startDate || dateStartValue}
              onChange={(val)=>{
                StartDateChange(val)
              }}
              renderInput={(params) => <TextField {...params} size="small" />}
            />
          </LocalizationProvider>
          <div className="d-flex mb-1 mt-3">
            <p className="text-lightBlue">End Date</p>

            <Tooltip title="Lorem ipsum" placement="top">
              <img
                src={info}
                alt="info"
                className="ms-2 c-pointer"
                width={13.5}
              />
            </Tooltip>
          </div>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DesktopDateTimePicker
              value={endDate || dateStartValue}
              onChange={(val)=>{
                EndDateChange(val)
              }}
              renderInput={(params) => <TextField {...params} size="small" />}
            />
          </LocalizationProvider>
        </DialogContent>
        <hr className="hr-grey-6 my-0" />
        <DialogActions className="d-flex flex-column justify-content-start px-4 py-3">
          <div className="d-flex justify-content-between w-100">
            <button
              className="button-grey py-2 px-5"
              onClick={handelScheduleClose}
            >
              <p className="text-lightBlue">Cancel</p>
            </button>
            <button
              className="button-gradient py-2 px-5"
              onClick={handelScheduleClose}
            >
              <p>Schedule</p>
            </button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default VisibilityBox;
