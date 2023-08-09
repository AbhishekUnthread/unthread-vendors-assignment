import "./StoreHoursWeekDay.scss";
import { FormControl, FormHelperText, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";

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
          </FormControl>
        </div>
        {dayValues.status === "open" && (
          <>
            <div className="col-3">
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <TimePicker
                  value={moment(dayValues.from, "HH:mm")}
                  onChange={onFromChange}
                  onOpen={onFromTouched}
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
            </div>
            <div className="col-auto">-</div>
            <div className="col-3">
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <TimePicker
                  value={moment(dayValues.to, "HH:mm")}
                  onChange={onToChange}
                  onOpen={onToTouched}
                  onClose={onToTouched}
                  renderInput={(params) => (
                    <TextField
                      size="small"
                      {...params}
                      inputProps={{
                        ...params.inputProps,
                        placeholder: "End Time",
                      }}
                      onBlur={onToTouched}
                    />
                  )}
                />
              </LocalizationProvider>
            </div>
          </>
        )}
      </div>
      {((dayTouched?.status && dayErrors?.status) || (dayTouched?.from && dayErrors?.from) || (dayTouched?.to && dayErrors?.to)) && (
        <div className="row align-items-center pb-1">
          <div className="col-2"></div>
          <div className="col-3">{dayTouched?.status && <FormHelperText error>{dayErrors?.status}</FormHelperText>}</div>
          <div className="col-3">{dayTouched?.from && <FormHelperText error>{dayErrors?.from}</FormHelperText>}</div>
          <div className="col-auto opacity-0">-</div>
          <div className="col-3">{dayTouched?.to && <FormHelperText error>{dayErrors?.to}</FormHelperText>}</div>
        </div>
      )}
    </div>
  );
}
