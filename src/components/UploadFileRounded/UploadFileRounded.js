import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";

// ? FILE UPLOAD STARTS HERE
const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "0",
  borderWidth: 2,
  borderRadius: "50%",
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

const UploadFileRounded = ({ imageName }) => {
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
    // <div className="bg-black-15 border-grey-5 rounded-8 p-3">
    //   <div className="d-flex align-items-center justify-content-between">
    //     <h6 className="text-lightBlue fw-500">{headingName}</h6>
    //     <small className="text-lightBlue text-blue-2">Add Media from URL</small>
    //   </div>
    <div {...getRootProps({ style })} className="">
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
    // </div>
  );
};

export default UploadFileRounded;
