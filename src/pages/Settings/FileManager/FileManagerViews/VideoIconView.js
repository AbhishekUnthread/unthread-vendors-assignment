import { useState } from "react";
import IconMenuItem from "../IconMenuItem";
import video from "../../../../assets/images/dashboard/video.png";
import akarLinkChain from "../../../../assets/icons/akarLinkChain.svg";
import videoPlay from "../../../../assets/icons/videoPlay.svg";
import archive from "../../../../assets/icons/folderdropdown/archive.svg";
import download from "../../../../assets/icons/folderdropdown/download.svg";
import edit from "../../../../assets/icons/folderdropdown/edit.svg";
import folderUp from "../../../../assets/icons/folderdropdown/folderUp.svg";
import linkAngled from "../../../../assets/icons/folderdropdown/linkAngled.svg";
import share from "../../../../assets/icons/folderdropdown/share.svg";
import { Checkbox, Fab, Menu } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { formatBytes } from "../../../../utils/helper";

export default function VideoIconView({
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
      className={`folder-icon-view position-relative d-flex flex-column align-items-center c-pointer rounded-8${
        showMore || isSelected ? " folder-icon-view-hovering" : ""
      }`}>
      <div className="image-icon position-relative rounded-8">
        <img
          src={video}
          alt={description}
          width={120}
        />
        <img
          className="position-absolute top-50 start-50 translate-middle"
          src={videoPlay}
          alt="play"
          width={35}
        />
        <img
          className="position-absolute bottom-0 end-0 pb-1 pe-1"
          src={akarLinkChain}
          alt="link"
          width={28}
        />
      </div>
      <small className="text-lightBlue">{name}</small>
      <small className="text-grey-6">
        {Boolean(module) && <small className="text-green-2">●</small>} {String(url?.slice(url?.lastIndexOf(".") + 1) ?? "").toUpperCase()} •{" "}
        {formatBytes(filesize)}
      </small>

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
            {/* <IconMenuItem
              icon={share}
              text="Share With"
              close={handleOptionsClose}
            /> */}
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
              icon={archive}
              text="Delete"
              isRed
              action={handleDeleteClick}
              close={handleOptionsClose}
            />
          </Menu>
        </div>
      )}
    </div>
  );
}
