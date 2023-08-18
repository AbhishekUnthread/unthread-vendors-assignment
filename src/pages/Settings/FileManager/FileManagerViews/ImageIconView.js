import { useState } from "react";
import IconMenuItem from "../IconMenuItem";
import archive from "../../../../assets/icons/folderdropdown/archive.svg";
import download from "../../../../assets/icons/folderdropdown/download.svg";
import edit from "../../../../assets/icons/folderdropdown/edit.svg";
import folderUp from "../../../../assets/icons/folderdropdown/folderUp.svg";
import linkAngled from "../../../../assets/icons/folderdropdown/linkAngled.svg";
import { Checkbox, Fab, Menu } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { formatBytes } from "../../../../utils/helper";

export default function ImageIconView({
  file = {},
  isSelected = false,
  onSelect = () => {},
  onDoubleClick = () => {},
  onCopyLink = () => {},
  onMoveToFolder = () => {},
  onRename = () => {},
  onDownload = () => {},
  onDelete = () => {},
}) {
  const { _id = "", name = "", module = "", description = "", file: url = "", filesize = 0 } = file;

  const [showMore, setShowMore] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePointerEnter = () => setShowMore(true);
  const handlePointerLeave = () => setShowMore(Boolean(anchorEl));

  const handleOptionsClick = (e) => setAnchorEl(e.currentTarget);
  const handleOptionsClose = () => {
    setAnchorEl(null);
    setShowMore(false);
  };

  const handleDoubleClick = () => {
    onDoubleClick(_id);
  };

  const handleCopyLinkClick = () => {
    onCopyLink(file);
    handleOptionsClose();
  };

  const handleMoveToFolderClick = () => {
    onMoveToFolder(file);
    handleOptionsClose();
  };

  const handleRenameClick = () => {
    onRename(file);
    handleOptionsClose();
  };

  const handleDownloadClick = () => {
    onDownload(file);
    handleOptionsClose();
  };

  const handleDeleteClick = () => {
    onDelete(file);
    handleOptionsClose();
  };

  const handleSelectionClick = (check) => onSelect(check, file);

  return (
    <div
      onDoubleClick={handleDoubleClick}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className="position-relative d-flex flex-column c-pointer">
      {/* className={`position-relative d-flex flex-column c-pointer${showMore || isSelected ? " folder-icon-view-hovering" : ""}`}> */}
      {(showMore || isSelected) && (
        <div className="position-absolute top-0 start-0">
          <Checkbox
            size="small"
            color="primary"
            className="rounded-4"
            checked={isSelected}
            onChange={(e) => handleSelectionClick(e.target.checked)}
          />
        </div>
      )}
      {showMore && (
        <div className="position-absolute top-0 end-0">
          <Fab
            size="small"
            onClick={handleOptionsClick}>
            <MoreHorizIcon
              fontSize="small"
              color="primary"
            />
          </Fab>
          <Menu
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleOptionsClose}>
            <IconMenuItem
              icon={linkAngled}
              text="Copy Link"
              action={handleCopyLinkClick}
              close={handleOptionsClose}
            />
            <IconMenuItem
              icon={folderUp}
              text="Move to Folder"
              action={handleMoveToFolderClick}
              close={handleOptionsClose}
            />
            <IconMenuItem
              icon={edit}
              text="Rename"
              action={handleRenameClick}
              close={handleOptionsClose}
            />
            <IconMenuItem
              icon={download}
              text="Download"
              action={handleDownloadClick}
              close={handleOptionsClose}
            />
            <IconMenuItem
              isRed
              icon={archive}
              text="Delete"
              action={handleDeleteClick}
              close={handleOptionsClose}
            />
          </Menu>
        </div>
      )}
      <div
        style={{ height: "128px" }}
        className="d-flex align-items-center justify-content-center rounded-8 img-container p-2">
        <img
          src={url}
          alt={description}
          style={{ objectFit: "contain", height: "90%", width: "90%" }}
        />
      </div>
      <small className="text-lightBlue mt-3">{name}</small>
      <small className="text-grey-6 my-2">
        {Boolean(module) && <small className="text-green-2">●</small>} {String(url?.slice(url?.lastIndexOf(".") + 1) ?? "").toUpperCase()} •{" "}
        {formatBytes(filesize)}
      </small>
    </div>
  );
}
