import { useEffect } from "react";
import { Tooltip, FormControl, FormHelperText } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";

import { isHttpValid } from "../../utils/helper";

import UseFileUpload from "../../features/fileUpload/fileUploadHook";
import { showError } from "../../features/snackbar/snackbarAction";

import CancelButton from "../CancelButton/CancelButton";

import "./uploadMedia.scss";

import info from "../../assets/icons/info.svg";

const UploadMediaSmall = (props) => {
  const { fileSrc, error, onUpload, onBlur, name } = props;
  const [uploadFile, { data, isSuccess, isError }] = UseFileUpload();
  const dispatch = useDispatch();

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".svg"],
    },
    onDrop: (acceptedFiles) => {
      uploadFile({ file: acceptedFiles[0] });
    },
  });

  useEffect(() => {
    if (isError) {
      dispatch(showError({ message: "Failed to upload" }));
    }

    if (isSuccess && data) {
      onUpload(data?.url);
    }
  }, [isError, isSuccess, data, dispatch, onUpload]);

  return (
    <>
      <div className="d-flex mb-1">
        <label htmlFor="file" className="small text-lightBlue me-2">
          Icon
        </label>
        <Tooltip title="Lorem ipsum" placement="top">
          <img src={info} alt="info" className=" c-pointer" width={13.5} />
        </Tooltip>
      </div>
      <div {...getRootProps({})} className="small-upload-container">
        <span className="icon-placeholder">
          {!fileSrc ? (
            <ImageOutlinedIcon
              sx={{
                color: "#5c6d8e",
                fontSize: 20,
              }}
            />
          ) : (
            <img src={fileSrc} className="icon" alt="icon" />
          )}
        </span>
        <FileUploadIcon
          sx={{
            color: "#5c6d8e",
            fontSize: 25,
          }}
        />
        <span className="small text-lightBlue">Upload Image</span>
      </div>
      <FormControl className="w-100 px-0">
        <input
          name={name}
          onBlur={onBlur}
          id="file"
          {...getInputProps()}
          size="small"
        />
        {error && <FormHelperText error>{error}</FormHelperText>}
      </FormControl>
    </>
  );
};

const UploadMediaLarge = (props) => {
  const { fileSrc, error, onUpload, onBlur, name } = props;
  const [uploadFile, { data, isSuccess, isError }] = UseFileUpload();
  const dispatch = useDispatch();

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".svg"],
      "video/*": [".mp4", ".avi", ".mkv"],
    },
    onDrop: (acceptedFiles) => {
      uploadFile({ file: acceptedFiles[0] });
    },
  });

  useEffect(() => {
    if (isError) {
      dispatch(showError({ message: "Failed to upload" }));
    }

    if (isSuccess && data) {
      onUpload(data?.url);
    }
  }, [isError, isSuccess, data, dispatch, onUpload]);

  const cancelHandler = (e) => {
    e.stopPropagation();
    onUpload("");
  };

  return (
    <>
      <div {...getRootProps({})} className="large-upload-container">
        {isHttpValid(fileSrc) && (
          <div className="cancel-button-container">
            <CancelButton onClick={cancelHandler} />
          </div>
        )}
        {!isHttpValid(fileSrc) ? (
          <>
            <div className="upload-icon">
              <FileUploadIcon
                sx={{
                  color: "#5c6d8e",
                  fontSize: 25,
                }}
              />

              <span className="small text-lightBlue">Add Image / Video</span>
            </div>
            <span className="small text-grey-6">or drop files to upload</span>
          </>
        ) : (
          <img src={fileSrc} className="media" alt="icon" />
        )}
      </div>
      <FormControl className="w-100 px-0">
        <input
          name={name}
          onBlur={onBlur}
          id="file"
          {...getInputProps()}
          size="small"
        />
        {error && <FormHelperText error>{error}</FormHelperText>}
      </FormControl>
    </>
  );
};

export { UploadMediaSmall, UploadMediaLarge };
