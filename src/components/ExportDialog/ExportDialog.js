import React from "react";
// ! IMAGES IMPORTS
import cancel from "../../assets/icons/cancel.svg";
// ! MATERIAL IMPORTS
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slide,
} from "@mui/material";

// ? DIALOG TRANSITION STARTS HERE
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// ? DIALOG TRANSITION ENDS HERE

const ExportDialog = ({ dialogName }) => {
  const [valueExport, setExportValue] = React.useState(0);
  const handleExportChange = (event, newValue) => {
    setExportValue(newValue);
  };

  // ? EXPORT DIALOG STARTS HERE
  const [openExport, setOpenExport] = React.useState(false);

  const handleExportOpen = () => {
    setOpenExport(true);
  };

  const handleExportClose = () => {
    setOpenExport(false);
  };
  // ? EXPORT DIALOG ENDS HERE
  return (
    <React.Fragment>
      <button
        className="button-transparent py-2 px-3"
        onClick={handleExportOpen}
      >
        <p className="text-lightBlue">Export</p>
      </button>

      <Dialog
        open={openExport}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleExportClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogTitle>
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="text-lightBlue fw-500">Export&nbsp;{dialogName}</h5>
            <img
              src={cancel}
              alt="cancel"
              width={30}
              onClick={handleExportClose}
              className="c-pointer"
            />
          </div>
        </DialogTitle>
        <hr className="hr-grey-6 my-0" />
        <DialogContent className="py-3 px-4">
          <p className="text-lightBlue mb-2">Export</p>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={valueExport}
              onChange={handleExportChange}
            >
              <FormControlLabel
                value="currentPage"
                control={<Radio size="small" />}
                label="Current Page"
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: 13,
                    color: "#c8d8ff",
                  },
                }}
              />
              <FormControlLabel
                value="currentSelection"
                control={<Radio size="small" />}
                label="Current Selection"
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: 13,
                    color: "#c8d8ff",
                  },
                }}
              />
              <FormControlLabel
                value="allUsers"
                control={<Radio size="small" />}
                label={`All ${dialogName}`}
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: 13,
                    color: "#c8d8ff",
                  },
                }}
              />
            </RadioGroup>
          </FormControl>
          <p className="text-lightBlue mb-2 mt-3">Export as</p>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={valueExport}
              onChange={handleExportChange}
            >
              <FormControlLabel
                value="csvForExcel"
                control={<Radio size="small" />}
                label="CSV for Excel, Number or other Spreadsheet program"
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: 13,
                    color: "#c8d8ff",
                  },
                }}
              />
              <FormControlLabel
                value="plainCsvFile"
                control={<Radio size="small" />}
                label="Plain CSV File"
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: 13,
                    color: "#c8d8ff",
                  },
                }}
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <hr className="hr-grey-6 my-0" />
        <DialogActions className="d-flex justify-content-between px-4 py-3">
          <button className="button-grey py-2 px-5" onClick={handleExportClose}>
            <p className="text-lightBlue">Cancel</p>
          </button>
          <button
            className="button-gradient py-2 px-5"
            onClick={handleExportClose}
          >
            <p className="">Export</p>
          </button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ExportDialog;
