import { FormControl, OutlinedInput, Popover, Tooltip } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import info from "../../assets/icons/info.svg";
import UseFileUpload from "../../features/fileUpload/fileUploadHook";
// ? FILE UPLOAD STARTS HERE
const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "0",
  borderWidth: 2,
  borderRadius: 8,
  borderColor: "#38395C",
  borderStyle: "dashed",
  color: "#BDBDBD",
  outline: "none",
  transition: "border .24s ease-in-out",
  cursor: "pointer",
  justifyContent: "center",
  backgroundColor: "#1A1932",
};
const focusedStyle = {
  borderColor: "#2196F3",
};
const acceptStyle = {
  borderColor: "#00E676",
};
const rejectStyle = {
  borderColor: "#FF1744",
};
// ? FILE UPLOAD ENDS HERE
const UploadMediaBox = ({ noteText, imageName, headingName, UploadChange = () => {}, imageValue, previousImage, isUploaded = () => {} }) => {
  const [inputUrl, setInputUrl] = useState("");
  const [uploadFile, uploadState] = UseFileUpload();

  // ? FILE UPLOAD STARTS HERE
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    onDrop: (acceptedFiles) => {
      uploadFile({ file: acceptedFiles[0] });
    },
  });

  useEffect(() => {
    if (uploadState.data?.url) {
      UploadChange(uploadState.data?.url);
      isUploaded(true);
    } else {
      UploadChange(inputUrl);
      isUploaded(false);
    }
  }, [uploadState, inputUrl]);

  useEffect(() => {
    if (imageValue) {
      setInputUrl(imageValue);
    }
  }, [imageValue]);

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
  // * SAVE FILTER POPOVERS STARTS
  const [anchorSaveFilterEl, setAnchorSaveFilterEl] = React.useState(null);
  const handleSaveFilterClick = (event) => {
    setAnchorSaveFilterEl(event.currentTarget);
  };
  const handleSaveFilterClose = () => {
    setAnchorSaveFilterEl(null);
  };
  const openSaveFilter = Boolean(anchorSaveFilterEl);
  const idSaveFilter = openSaveFilter ? "simple-popover" : undefined;
  // * SAVE FILTER POPOVERS ENDS
  return (
    <div className="bg-black-15 border-grey-5 rounded-8 p-3">
      <div className="d-flex align-items-center justify-content-between">
        <h6 className="text-lightBlue fw-500">{headingName}</h6>
        <small
          className="text-lightBlue text-blue-2 c-pointer"
          aria-describedby={idSaveFilter}
          variant="contained"
          onClick={handleSaveFilterClick}>
          Add Media from URL
        </small>
        <Popover
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          id={idSaveFilter}
          open={openSaveFilter}
          anchorEl={anchorSaveFilterEl}
          onClose={handleSaveFilterClose}>
          <div className="px-1 py-3">
            <div className="d-flex mb-1">
              <small className="text-lightBlue me-2">Add URL</small>
              <Tooltip
                title="Lorem ipsum"
                placement="top">
                <img
                  src={info}
                  alt="info"
                  className="c-pointer ms-2"
                  width={13.5}
                />
              </Tooltip>
            </div>
            <FormControl className="px-0">
              <OutlinedInput
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="Enter URL Link"
                size="small"
              />
            </FormControl>
            {/* <div className="d-flex"> */}
            <button
              onClick={handleSaveFilterClose}
              className="ms-auto button-gradient py-1 px-4 mt-3">
              <p>Add Media</p>
            </button>
            {/* </div> */}
          </div>
        </Popover>
      </div>
      <div
        {...getRootProps({ style })}
        className="mt-3">
        <input
          id="primary"
          {...getInputProps()}
          // onChange={(event) => {
          //   uploadFileToCloud(event, "primary");
          //   event.target.value = null;
          // }}
        />
        <img
          src={uploadState?.data?.url ? uploadState?.data?.url : inputUrl !== "" ? inputUrl : previousImage ? previousImage : imageName}
          // className="w-100"
          style={{ height: "100%", width: "100%", objectFit: "cover", overflow: "hidden" }}
          alt=""
        />
      </div>
      {noteText && <div className="text-grey-6 font1 mt-3">{noteText}</div>}
    </div>
  );
};
export default UploadMediaBox;
