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
const StatusBox = ({ headingName, titleName, showSchedule,value,handleProductStatus, toggleData=['active','in-active'], startDate, endDate, handleStartDate, handleEndDate, clearDate}) => {

  const showScheduleData = showSchedule === undefined ? false : true;
  const [openScheduleProduct, setOpenScheduleProduct] = React.useState(false);
  const [startDateLocal, setStartDate] = React.useState(startDate ? moment(startDate).toDate() : null);
  const [endDateLocal, setEndDate] = React.useState("");
  const startDateNew = moment(startDate).utcOffset("+05:30").format("DD/MM/YYYY")
  const startTime = moment(startDate).utcOffset("+05:30").format("HH:mm A");
  const endDateNew = moment(endDate).utcOffset("+05:30").format("DD/MM/YYYY")
  const endTime = moment(endDate).format("HH:mm A");

  const handelScheduleProduct = () => {
    setOpenScheduleProduct(true);
  };

  const handelScheduleProductClose = () => {
    setOpenScheduleProduct(false);
  };

  const minDateTime = startDate ? moment(startDate).add(10, 'minutes') : null;

  return (
    <div className="bg-black-15 border-grey-5 rounded-8 p-3">
      <div className="d-flex align-items-center justify-content-between">
        <h6 className="text-lightBlue mb-3 fw-500">{headingName}</h6>
      </div>
      <ToggleButtonGroup
        value={value === "scheduled" ? 'in-active': value}
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
          disabled={startDate != null}
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
          disabled={startDate != null}
        >
          <div className="d-flex">
            <p className="text-grey-6">{toggleData[1]}</p>
          </div>
        </ToggleButton>
      </ToggleButtonGroup>
      {showScheduleData && (
          <div className="d-flex align-items-center mt-4 c-pointer">
            <img src={clock} alt="clock" className="me-1" width={12} />
            <small className="text-blue-2" onClick={handelScheduleProduct}>
              Schedule {startDate == null ? '' : `for ${startDateNew} at ${startTime}`} {endDate == null ? '' : `till ${endDateNew} at ${endTime}` }
            </small>
          </div>
      )}
      {startDate != null && (
          <div className="d-flex justify-content-end px-4 py-3">
            <small className="text-blue-2 px-3" style={{cursor: 'pointer'}} onClick={handelScheduleProduct}>Edit</small>
            <small style={{color: '#F67476', cursor: 'pointer'}} onClick={clearDate}>Clear</small>
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
              value={startDate ? startDate : null}
              onChange={(newValue) => {
                setStartDate(newValue);
                handleStartDate(newValue)
              }}
              renderInput={(params) => <TextField {...params} size="small" />}
              minDate={new Date()}
            />
          </LocalizationProvider>
          <div className="d-flex mb-1 mt-3">
            <p className="text-lightBlue">End Date</p>
            <p className="text-lightBlue">(Optional)</p>

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
              value={endDate ? endDate : null }
              onChange={(newValue) => {
                setEndDate(newValue);
                handleEndDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} size="small" />}
              minDate={startDate}
              minTime={minDateTime}
              disabled={startDate == null ? true : false}
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