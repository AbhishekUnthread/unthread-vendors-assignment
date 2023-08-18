import { useEffect, useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import cancel from "../../../../assets/icons/cancel.svg";

export default function NameRenameDialog({
  isOpen = false,
  headingText = "",
  subText = "",
  labelText = "",
  folderName = "",
  buttonText = "",
  imageSrc = "",
  onClose = () => {},
  onAction = () => {},
}) {
  const [fname, setFname] = useState(folderName);
  useEffect(() => setFname(folderName), [folderName]);

  return (
    <Dialog
      fullWidth
      keepMounted
      maxWidth="sm"
      open={isOpen}
      onClose={onClose}>
      <DialogTitle>
        <div className="d-flex justify-content-between align-items-center">
          <div className="m-0 p-0">
            {!!headingText && <h4 className="text-lightBlue fw-500">{headingText}</h4>}
            {!!subText && <small className="text-grey-6 fw-200">{subText}</small>}
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
      <hr className="hr-grey-6 my-0" />
      <DialogContent className="p-3">
        <div className="row align-items-center">
          <div className="col-auto">
            <div className="folder-icon rounded-8 p-4 m-3">
              <img
                // src={folderLargePurple}
                src={imageSrc}
                alt="icon"
                style={{ objectFit: "contain", overflow: "hidden" }}
                className="me-2 rounded-4"
                height={66}
                width={66}
              />
            </div>
          </div>
          <div className="col">
            {/* <label className="text-lightBlue mb-2">Folder Name</label> */}
            <label className="text-lightBlue mb-2">{labelText}</label>
            <TextField
              fullWidth
              size="small"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
            />
          </div>
        </div>
      </DialogContent>
      <hr className="hr-grey-6 my-0" />
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
          onClick={() => onAction(fname)}>
          <p>{buttonText}</p>
        </button>
      </DialogActions>
    </Dialog>
  );
}
