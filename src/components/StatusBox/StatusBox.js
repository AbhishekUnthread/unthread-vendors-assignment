import React from "react"; 
// ! MATERIAL IMPORTS
// ! IMAGES IMPORTS
import info from "../../assets/icons/info.svg";
import clock from "../../assets/icons/clock.svg";
import cancel from "../../assets/icons/cancel.svg";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from "@mui/material";
import { DesktopDateTimePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from "moment";

// ? DIALOG TRANSITION STARTS HERE
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// ? DIALOG TRANSITION ENDS HERE


const StatusBox = ({ headingName, titleName, showSchedule,value,handleProductStatus, handleSchedule, toggleData=['active','in-active'], startDate1, endDate1}) => {


  const showScheduleData = showSchedule === undefined ? false : true;
  // ? TOGGLE BUTTONS STARTS HERE
  // const [productStatus, setPoductStatus] = React.useState("active");

  // const handleProductStatus = (event, newProductStatus) => {
  //   setPoductStatus(newProductStatus);
  // };

  // ? TOGGLE BUTTONS ENDS HERE

  // ? SCHEDULE PRODUCT DIALOG STARTS HERE
  const [openScheduleProduct, setOpenScheduleProduct] = React.useState(false);
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());

  const startDateNew = moment(startDate1).format("DD/MM/YYYY")
  const startTime = moment(startDate1).format("HH:MM a")
  const endDateNew = moment(endDate1).format("DD/MM/YYYY")
  const endTime = moment(endDate1).format("HH:MM a")

  console.log(startDate1, 'startDate1')
  console.log(endDate1, 'endDate1')

  const handelScheduleProduct = () => {
    setOpenScheduleProduct(true);
  };

 const handelScheduleProductClose = () => {
  setOpenScheduleProduct(false);
  if (startDate && endDate) {
    handleSchedule(startDate, endDate); // Call the handleSchedule prop with the selected dates
  }
};
  // ? SCHEDULE PRODUCT DIALOG ENDS HERE

  return (
    <div className="bg-black-15 border-grey-5 rounded-8 p-3">
      <div className="d-flex align-items-center justify-content-between">
        <h6 className="text-lightBlue mb-3 fw-500">{headingName}</h6>
      </div>

      <ToggleButtonGroup
        value={value}
        onChange={handleProductStatus}
        aria-label="text formatting"
        className="row d-flex px-2 productInfo-toggle"
        size="small"
        exclusive
      >
        <ToggleButton
          value={toggleData[0]}
          aria-label="active"
          style={{ width: "50%" }}
          className="productInfo-toggle__active"
        >
          <div className="d-flex">
            <p className="text-grey-6">{toggleData[0]}</p>
          </div>
        </ToggleButton>
        <ToggleButton
          value={toggleData[1]}
          aria-label="inactive"

          style={{ width: "50%" }}
          className="productInfo-toggle__draft"
        >
          <div className="d-flex">
            <p className="text-grey-6">{toggleData[1]}</p>
          </div>
        </ToggleButton>
      </ToggleButtonGroup>
      {showScheduleData && (
        <div className="d-flex align-items-center mt-2 c-pointer">
          <img src={clock} alt="clock" className="me-1" width={12} />
          <small className="text-blue-2" onClick={handelScheduleProduct}>
            Schedule {startDate1 == null ? '' : `for ${startDateNew} at ${startTime}`} {endDate1 == null ? '' : `till ${endDateNew} at ${endTime}` }
          </small>
        </div>
      )}

      <Dialog
        open={openScheduleProduct}
        TransitionComponent={Transition}
        keepMounted
        onClose={handelScheduleProductClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogTitle>
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="text-lightBlue fw-500">Schedule {titleName}</h5>
            <img
              src={cancel}
              alt="cancel"
              width={30}
              onClick={handelScheduleProductClose}
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
              value={startDate}
              onChange={(newValue) => {
                setStartDate(newValue);
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
              value={endDate}
              onChange={(newValue) => {
                setEndDate(newValue);
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
              onClick={handelScheduleProductClose}
            >
              <p className="text-lightBlue">Cancel</p>
            </button>
            <button
              className="button-gradient py-2 px-5"
              onClick={handelScheduleProductClose}
            >
              <p>Schedule</p>
            </button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StatusBox;