import { FormControl, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import "./StoreHoursWeekDay.scss";

export default function StoreHoursWeekDay({
  dayName = "",
  dayValues = {},
  dayTouched = {},
  dayErrors = {},
  formikHandleBlur = () => {},
  formikHandleChange = () => {},
  formikSetValue = () => {},
  formikSetTouched = () => {},
}) {
  const onFromChange = (mt, kt) => formikSetValue(`storeHours.${dayName}.from`, mt?.format("HH:mm") ?? "");
  const onFromTouched = () => formikSetTouched(`storeHours.${dayName}.from`, true);
  const onToChange = (mt, kt) => formikSetValue(`storeHours.${dayName}.to`, mt?.format("HH:mm") ?? "");
  const onToTouched = () => formikSetTouched(`storeHours.${dayName}.to`, true);

  return (
    <div className="col-12">
      <div className="row align-items-center py-2">
        <div className="col-2">
          <span className="text-lightBlue text-capitalize">{dayName}</span>
        </div>
        <div className="col-3">
          <FormControl
            size="small"
            className="w-100">
            <Select
              size="small"
              variant="outlined"
              name={`storeHours.${dayName}.status`}
              value={dayValues.status}
              onChange={formikHandleChange}
              onBlur={formikHandleBlur}>
              <MenuItem value="closed">Closed</MenuItem>
              <MenuItem value="open">Open</MenuItem>
            </Select>
            {/* <FormHelperText error>{dayTouched?.status && dayErrors?.status}</FormHelperText> */}
          </FormControl>
        </div>
        {dayValues.status === "open" && (
          <>
            <div className="col-3">
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <TimePicker
                  value={moment(dayValues.from, "HH:mm")}
                  onChange={onFromChange}
                  onClose={onFromTouched}
                  renderInput={(params) => (
                    <TextField
                      size="small"
                      {...params}
                      inputProps={{
                        ...params.inputProps,
                        placeholder: "Start Time",
                      }}
                      onBlur={onFromTouched}
                    />
                  )}
                />
              </LocalizationProvider>
              {/* <FormHelperText error>{dayTouched?.from && dayErrors?.from}</FormHelperText> */}
            </div>
            <div className="col-auto">-</div>
            <div className="col-3">
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <TimePicker
                  value={moment(dayValues.to, "HH:mm")}
                  onChange={onToChange}
                  onClose={onToTouched}
                  renderInput={(params) => (
                    <TextField
                      size="small"
                      {...params}
                      inputProps={{
                        ...params.inputProps,
                        placeholder: "End Time",
                      }}
                      onBlur={onFromTouched}
                    />
                    // <OutlinedInput
                    //   size="small"
                    //   {...params}
                    //   inputProps={{
                    //     ...params.inputProps,
                    //     placeholder: "End Time",
                    //   }}
                    //   className="error"
                    //   onBlur={onToTouched}
                    // />
                  )}
                />
              </LocalizationProvider>
              {/* <FormHelperText error>{dayTouched?.to && dayErrors?.to}</FormHelperText> */}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
