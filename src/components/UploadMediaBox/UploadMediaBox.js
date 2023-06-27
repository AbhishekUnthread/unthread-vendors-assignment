import { FormControl, OutlinedInput, Popover, Tooltip } from "@mui/material";
import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import info from "../../assets/icons/info.svg";

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
  justifyContent: "center",
  backgroundColor: "#1a1932",
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

const UploadMediaBox = ({ imageName, headingName }) => {
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
          onClick={handleSaveFilterClick}
        >
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
          onClose={handleSaveFilterClose}
        >
          <div className="px-1 py-3">
            <div className="d-flex mb-1">
              <small className="text-lightBlue me-2">Add URL</small>
              <Tooltip title="Lorem ipsum" placement="top">
                <img
                  src={info}
                  alt="info"
                  className="c-pointer ms-2"
                  width={13.5}
                />
              </Tooltip>
            </div>
            <FormControl className="px-0">
              <OutlinedInput placeholder="Enter URL Link" size="small" />
            </FormControl>
            {/* <div className="d-flex"> */}
            <button className="ms-auto button-gradient py-1 px-4 mt-3">
              <p>Add Media</p>
            </button>
            {/* </div> */}
          </div>
        </Popover>
      </div>
      <div {...getRootProps({ style })} className="mt-3">
        <input
          id="primary"
          {...getInputProps()}
          // onChange={(event) => {
          //   uploadFileToCloud(event, "primary");
          //   event.target.value = null;
          // }}
        />
        <img src={imageName} className="w-100" alt="" />
      </div>
    </div>
  );
};

export default UploadMediaBox;