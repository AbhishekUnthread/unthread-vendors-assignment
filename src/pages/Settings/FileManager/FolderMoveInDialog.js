import { Dialog, DialogActions, DialogContent, DialogTitle, FormControl, MenuItem, Select, TextField } from "@mui/material";
import folderLargePurple from "../../../assets/icons/folderLargePurple.svg";
import cancel from "../../../assets/icons/cancel.svg";
import { useEffect, useState } from "react";
import { useGetFoldersQuery } from "../../../features/settings/filemanager/filemanagerApiSlice";

export default function FolderMoveInDialog({
  isOpen = false,
  headingText = "",
  subText = "",
  buttonText = "",
  fileImage = "",
  onClose = () => {},
  onAction = () => {},
}) {
  const { data: allFoldersData } = useGetFoldersQuery();
  const allFolders = allFoldersData?.data?.data ?? [];

  const [fid, setFid] = useState("");

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
                src={folderLargePurple}
                alt="file"
                width={66}
              />
            </div>
          </div>
          {allFolders.length > 0 ? (
            <div className="col">
              <label className="text-lightBlue mb-2">Select A Folder</label>
              <Select
                size="small"
                value={fid}
                onChange={(e) => setFid(e.target.value)}
                className="d-block w-75"
                placeholder="Select A Folder">
                {allFolders.map((f) => (
                  <MenuItem
                    key={f._id}
                    value={f._id}>
                    {f.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
          ) : (
            <div className="col">
              <label className="text-lightBlue mb-2">No Folders Yet</label>
            </div>
          )}
        </div>
      </DialogContent>
      <hr className="hr-grey-6 my-0" />
      <DialogActions className="d-flex justify-content-between px-4 py-3">
        <button
          className="button-lightBlue-outline py-2 px-4"
          onClick={onClose}>
          <p className="text-lightBlue">Cancel</p>
        </button>
        <button
          className="button-gradient py-2 px-4"
          onClick={() => onAction(fid)}
          disabled={!fid}>
          <p>{buttonText}</p>
        </button>
      </DialogActions>
    </Dialog>
  );
}
