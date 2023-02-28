import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";
// ! IMAGES IMPORTS
import cancel from "../../assets/icons/cancel.svg";
import uploadLineSheet from "../../assets/images/products/uploadLineSheet.svg";
import uploadCompanySheet1 from "../../assets/images/products/uploadCompanySheet1.svg";
import uploadCompanySheet2 from "../../assets/images/products/uploadCompanySheet2.svg";
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

// ? FILE UPLOAD STARTS HERE
const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "0",
  borderWidth: 2,
  borderRadius: 8,
  borderColor: "#38395c",
  borderStyle: "dashed",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  cursor: "pointer",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};
// ? FILE UPLOAD ENDS HERE

// ? DIALOG TRANSITION STARTS HERE
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// ? DIALOG TRANSITION ENDS HERE

const ImportSecondDialog = ({ dialogName }) => {
  const [importSecondValue, setImportSecondValue] =
    React.useState("uploadLineSheet");

  const handleImportSecondChange = (event, newValue) => {
    setImportSecondValue(newValue);
  };
  // ? IMPORT SECOND DIALOG STARTS HERE
  const [openImportSecond, setOpenImportSecond] = React.useState(false);

  const handleImportSecondOpen = () => {
    setOpenImportSecond(true);
  };

  const handleImportSecondClose = () => {
    setOpenImportSecond(false);
  };
  // ? IMPORT SECOND DIALOG ENDS HERE

  // ? FILE UPLOAD STARTS HERE
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        "image/*": [".jpeg", ".jpg", ".png"],
      },
    });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );
  // ? FILE UPLOAD ENDS HERE

  return (
    <React.Fragment>
      <button
        className="button-transparent py-2 px-3"
        onClick={handleImportSecondOpen}
      >
        <p className="text-lightBlue">Import</p>
      </button>

      <Dialog
        open={openImportSecond}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleImportSecondClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogTitle>
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="text-lightBlue fw-500">Import&nbsp;{dialogName}</h5>
            <img
              src={cancel}
              alt="cancel"
              width={30}
              onClick={handleImportSecondClose}
              className="c-pointer"
            />
          </div>
        </DialogTitle>
        <hr className="hr-grey-6 my-0" />
        <DialogContent className="py-2 px-4">
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={importSecondValue}
              onChange={handleImportSecondChange}
            >
              <FormControlLabel
                value="uploadCompanySheet"
                control={<Radio size="small" />}
                label="Upload Company line sheet"
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: 13,
                    color: "#c8d8ff",
                  },
                }}
              />

              <FormControlLabel
                value="uploadLineSheet"
                control={<Radio size="small" />}
                label="Upload your own line sheet"
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: 13,
                    color: "#c8d8ff",
                  },
                }}
              />

              {importSecondValue === "uploadCompanySheet" && (
                <div className="d-flex flex-column">
                  <small className="text-grey-6"> Note :</small>
                  <small className="text-grey-6">
                    1. Upload the skeleton file and Map it with the Company
                    Data.
                  </small>
                  <small className="text-grey-6">
                    2. You can watch the Tutorial on how to do it.&nbsp;
                    <span className="text-blue-gradient c-pointer">
                      Watch here
                    </span>
                  </small>
                  <small className="text-grey-6">
                    3. Do not upload more than 50&nbsp;
                    {dialogName.toLowerCase()}&nbsp;at a time.
                  </small>
                  <small className="text-grey-6">
                    4. Select the folder containing&nbsp;{dialogName}
                    &nbsp;Images with&nbsp;{dialogName.toLowerCase()}
                    &nbsp;folder name equal to SKU
                  </small>
                  <small className="text-grey-6">
                    5.&nbsp;{dialogName}&nbsp;should be uploaded successfully.
                  </small>
                  <div {...getRootProps({ style })} className="mt-3">
                    <input
                      id="primary"
                      {...getInputProps()}
                      // onChange={(event) => {
                      //   uploadFileToCloud(event, "primary");
                      //   event.target.value = null;
                      // }}
                    />
                    <img src={uploadCompanySheet1} className="w-100" alt="" />
                  </div>
                  <small className="mt-2 text-lightBlue">
                    Don't have our line sheet?&nbsp;
                    <span className="text blue-gradient c-pointer">
                      Download here
                    </span>
                  </small>
                  <div {...getRootProps({ style })} className="mt-3 mb-3">
                    <input
                      id="primary"
                      {...getInputProps()}
                      // onChange={(event) => {
                      //   uploadFileToCloud(event, "primary");
                      //   event.target.value = null;
                      // }}
                    />
                    <img src={uploadCompanySheet2} className="w-100" alt="" />
                  </div>
                </div>
              )}
            </RadioGroup>
          </FormControl>
          {importSecondValue === "uploadLineSheet" && (
            <div className="d-flex flex-column">
              <small className="text-grey-6"> Note :</small>
              <small className="text-grey-6">
                1. Upload the skeleton file and Map it with the Company Data.
              </small>
              <small className="text-grey-6">
                2. You can watch the Tutorial on how to do it.&nbsp;
                <span className="text-blue-gradient c-pointer">Watch here</span>
              </small>
              <small className="text-grey-6">
                3. Do not upload more than 50&nbsp;{dialogName.toLowerCase()}
                &nbsp;at a time.
              </small>
              <small className="text-grey-6">
                4. Select the folder containing&nbsp;{dialogName.toLowerCase()}
                &nbsp;Images with&nbsp;{dialogName.toLowerCase()}&nbsp;folder
                name equal to SKU
              </small>
              <small className="text-grey-6">
                5.&nbsp;{dialogName}&nbsp;should be uploaded successfully.
              </small>
              <div {...getRootProps({ style })} className="mt-3">
                <input
                  id="primary"
                  {...getInputProps()}
                  // onChange={(event) => {
                  //   uploadFileToCloud(event, "primary");
                  //   event.target.value = null;
                  // }}
                />
                <img src={uploadLineSheet} className="w-100" alt="" />
              </div>
              <small className="mt-2 text-lightBlue mb-2">
                Please make sure to leave a single row at the top of the Sheet
              </small>
            </div>
          )}
        </DialogContent>
        <hr className="hr-grey-6 my-0" />
        <DialogActions className="d-flex justify-content-between px-4 py-3">
          <button
            className="button-grey py-2 px-5"
            onClick={handleImportSecondClose}
          >
            <p className="text-lightBlue">Cancel</p>
          </button>
          <button
            className="button-gradient py-2 px-5"
            onClick={handleImportSecondClose}
          >
            <p>Continue</p>
          </button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ImportSecondDialog;
