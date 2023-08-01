import { useEffect, useRef, useState } from "react";
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
import { ReactComponent as UploadIcon } from "../../assets/icons/upload.svg";
import { ReactComponent as ImagePlaceHolder } from "../../assets/icons/imagePlaceHolder.svg";

const UploadMediaSmall = (props) => {
  const {
    fileSrc,
    error,
    onUpload,
    onBlur,
    name,
    disableLabel,
    style,
    isSubmitting,
    touched,
  } = props;
  const [blurred, setBlurred] = useState(false);
  const [uploadFile, { data, isSuccess, isError }] = UseFileUpload();
  const errorRef = useRef(null);
  const dispatch = useDispatch();

  const { getRootProps, getInputProps, isFocused, isFileDialogActive } =
    useDropzone({
      accept: {
        "image/*": [".jpeg", ".jpg", ".png", ".svg"],
      },
      onDrop: (acceptedFiles) => {
        uploadFile({ file: acceptedFiles[0] });
      },
    });

  const cancelHandler = (e) => {
    e.stopPropagation();
    onUpload("");
  };

  useEffect(() => {
    if (isError) {
      dispatch(showError({ message: "Failed to upload" }));
    }

    if (isSuccess && data) {
      onUpload(data?.url);
    }
  }, [isError, isSuccess, data, dispatch, onUpload]);

  useEffect(() => {
    if (isFocused) {
      setBlurred(true);
    }
    if (
      !isFocused &&
      !isFileDialogActive &&
      blurred &&
      errorRef.current &&
      error
    ) {
      errorRef.current.textContent = error;
    }
  }, [errorRef, error, blurred, isFocused, isFileDialogActive]);

  useEffect(() => {
    if (isSubmitting || touched) {
      setBlurred(true);
    }
  }, [isSubmitting, touched]);

  return (
    <>
      {!disableLabel && (
        <div className="d-flex mb-1">
          <label htmlFor="file" className="small text-lightBlue me-2">
            Icon
          </label>
          <Tooltip title="Lorem ipsum" placement="top">
            <img src={info} alt="info" className=" c-pointer" width={13.5} />
          </Tooltip>
        </div>
      )}
      <div
        {...getRootProps({})}
        className={
          isFocused ? "small-upload-container focus" : "small-upload-container"
        }
        style={style}
      >
        {isHttpValid(fileSrc) && (
          <div className="cancel-button-container">
            <CancelButton onClick={cancelHandler} />
          </div>
        )}
        <span className="icon-placeholder">
          {!fileSrc ? (
            <ImagePlaceHolder className="svg" width={20} height={20} />
          ) : (
            <img src={fileSrc} className="icon" alt="icon" />
          )}
        </span>
        <UploadIcon className="svg" width={20} height={20} />
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
        {!fileSrc && <FormHelperText ref={errorRef} error></FormHelperText>}
      </FormControl>
    </>
  );
};

const UploadMediaLarge = (props) => {
  const { fileSrc, error, onUpload, onBlur, name } = props;
  const [uploadFile, { data, isSuccess, isError }] = UseFileUpload();
  const [blurred, setBlurred] = useState(false);
  const errorRef = useRef(null);
  const dispatch = useDispatch();

  const { getRootProps, getInputProps, isFocused, isFileDialogActive } =
    useDropzone({
      accept: {
        "image/*": [".jpeg", ".jpg", ".png", ".svg"],
        "video/*": [".mp4", ".avi", ".mkv"],
      },
      onDrop: (acceptedFiles) => {
        uploadFile({ file: acceptedFiles[0] });
      },
    });

  const cancelHandler = (e) => {
    e.stopPropagation();
    onUpload("");
  };

  useEffect(() => {
    if (isError) {
      dispatch(showError({ message: "Failed to upload" }));
    }

    if (isSuccess && data) {
      onUpload(data?.url);
    }
  }, [isError, isSuccess, data, dispatch, onUpload]);

  useEffect(() => {
    if (isFocused) {
      setBlurred(true);
    }
    if (
      !isFocused &&
      !isFileDialogActive &&
      blurred &&
      errorRef.current &&
      error
    ) {
      errorRef.current.textContent = error;
    }
  }, [errorRef, error, blurred, isFocused, isFileDialogActive]);

  return (
    <>
      <div {...getRootProps({})} className="large-upload-container">
        {isHttpValid(fileSrc) && (
          <div className="cancel-button-container">
            <CancelButton onClick={cancelHandler} />
          </div>
        )}
        {!isHttpValid(fileSrc) ? (
          <div className="upload-text">
            <div className="upload-icon">
              <UploadIcon className="svg" width={20} height={20} />
              <span className="small text-lightBlue">Add Image / Video</span>
            </div>
            <span className="small text-grey-6">or drop files to upload</span>
          </div>
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
        <FormHelperText ref={errorRef} error></FormHelperText>
      </FormControl>
    </>
  );
};

export { UploadMediaSmall, UploadMediaLarge };
