import { useDispatch } from "react-redux";
import { Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, OutlinedInput, Tooltip } from "@mui/material";
import { useDeleteFileMutation, useGetFilesQuery } from "../../../../features/settings/filemanager/filemanagerApiSlice";
import { showError, showSuccess } from "../../../../features/snackbar/snackbarAction";
import { formatBytes } from "../../../../utils/helper";
import cancel from "../../../../assets/icons/cancel.svg";
import info from "../../../../assets/icons/info.svg";
import downloadIcon from "../../../../assets/icons/filepopup/download.svg";
import deleteIcon from "../../../../assets/icons/filepopup/delete.svg";

export default function FilePreviewDialog({ fileId = "", headingText = "", subText = "", buttonText = "", onClose = () => {}, onAction = () => {} }) {
  const { data: allFilesData } = useGetFilesQuery({ id: fileId });
  const fileData = allFilesData?.data?.data?.[0];

  const { fileType = "", name = "", file: url = "", filesize = 0 } = fileData ?? {};

  const handleDownloadFile = () => {
    try {
      const link = document.createElement("a");
      link.download = name;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      dispatch(showError({ message: error.message ?? "Something went wrong" }));
    }
  };

  const dispatch = useDispatch();
  const [deleteFile] = useDeleteFileMutation();

  const handleDeleteFile = () => {
    deleteFile(fileId)
      .unwrap()
      .then(() => {
        onClose();
        dispatch(showSuccess({ message: "File Deleted successfully" }));
      })
      .catch((e) => dispatch(showError({ message: e.message ?? "Something went wrong" })));
  };

  if (fileData)
    return (
      <Dialog
        fullWidth
        maxWidth="lg"
        classes={{ paper: "p-4" }}
        open={!!fileId}
        onClose={onClose}>
        <DialogTitle>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex flex-column">
              {!!headingText && <span className="text-lightBlue fw-500">{headingText}</span>}
              {!!subText && (
                <small className="text-grey-6 fw-200">
                  <img
                    src={info}
                    alt="info"
                    className="pe-2"
                    width={20}
                  />
                  {subText}
                </small>
              )}
            </div>
            <img
              src={cancel}
              alt="cancel"
              width={24}
              onClick={onClose}
              className="c-pointer"
            />
          </div>
        </DialogTitle>
        <hr className="hr-grey-6" />
        <DialogContent className="p-3">
          {fileType === "image" && (
            <div className="row justify-content-center align-items-center my-3 folder-icon rounded-8">
              <img
                src={url}
                alt={fileType}
                height={128}
                className="rounded"
                style={{ objectFit: "scale-down" }}
              />
            </div>
          )}
          {fileType === "video" && (
            <div className="row justify-content-center align-items-center my-3 folder-icon rounded-8">
              {/* <img
                src={url}
                alt={fileType}
                height={128}
                className="rounded"
                style={{ objectFit: "scale-down" }}
              /> */}
              <video
                src={url}
                height={128}
                controls>
                Your browser does not support the video tag.
              </video>
            </div>
          )}
          <div className="row align-items-center my-3">
            <div className="col">
              <div className="d-flex flex-column">
                <span className="text-lightBlue fw-500">{name}</span>
                <small className="text-grey-6 fw-200">
                  {url.slice(url.lastIndexOf(".") + 1).toUpperCase()} • {formatBytes(filesize)}
                </small>
              </div>
            </div>
            <div className="col-auto">
              {/* <IconButton onClick={}>
                <img
                  src={swirlIcon}
                  alt="icon"
                  width={25}
                />
              </IconButton> */}
              <IconButton onClick={handleDownloadFile}>
                <img
                  src={downloadIcon}
                  alt="icon"
                  width={25}
                />
              </IconButton>
              <IconButton onClick={handleDeleteFile}>
                <img
                  src={deleteIcon}
                  alt="icon"
                  width={25}
                />
              </IconButton>
            </div>
          </div>
          <div className="row align-items-center my-3">
            <div className="col-12 my-2">
              <p className="text-lightBlue fw-200 mb-1">
                URL handle{" "}
                <Tooltip
                  title="Lorem ipsum"
                  placement="top">
                  <img
                    src={info}
                    alt="info"
                    className="c-pointer"
                    width={13.5}
                  />
                </Tooltip>
              </p>
              <FormControl className="w-100 px-0">
                <OutlinedInput
                  placeholder="URL handle"
                  size="small"
                  defaultValue={url}
                />
              </FormControl>
            </div>
            <div className="col-12 my-2">
              <p className="text-lightBlue fw-200 mb-1">
                Alt Text{" "}
                <Tooltip
                  title="Lorem ipsum"
                  placement="top">
                  <img
                    src={info}
                    alt="info"
                    className="c-pointer"
                    width={13.5}
                  />
                </Tooltip>
              </p>
              <FormControl className="w-100 px-0">
                <OutlinedInput
                  placeholder="Alt Text"
                  size="small"
                  defaultValue={fileType}
                />
              </FormControl>
            </div>
          </div>
        </DialogContent>
        <hr className="hr-grey-6 mt-0" />
        <DialogActions className="d-flex justify-content-between px-4 py-3">
          <button
            onClick={onClose}
            className="button-grey-outline py-2 px-4">
            <p className="text-lightBlue">Cancel</p>
          </button>
          {/* <button
            className="button-lightBlue-outline py-2 px-4"
            onClick={onClose}>
            <p className="text-lightBlue">Cancel</p>
          </button> */}
          <button
            className="button-gradient py-2 px-4"
            onClick={() => onAction(fileId)}>
            <p>{buttonText}</p>
          </button>
        </DialogActions>
      </Dialog>
    );
  else return null;
}
