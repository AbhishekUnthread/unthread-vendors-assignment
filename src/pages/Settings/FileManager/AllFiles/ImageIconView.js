import { useState } from "react";
// ! COMPONENT IMPORTS
import IconMenuItem from "../IconMenuItem";
// ! IMAGES IMPORTS
import shoe from "../../../../assets/images/dashboard/shoe.png";
import akarLinkChain from "../../../../assets/icons/akarLinkChain.svg";
import archive from "../../../../assets/icons/folderdropdown/archive.svg";
import download from "../../../../assets/icons/folderdropdown/download.svg";
import edit from "../../../../assets/icons/folderdropdown/edit.svg";
import folderUp from "../../../../assets/icons/folderdropdown/folderUp.svg";
import linkAngled from "../../../../assets/icons/folderdropdown/linkAngled.svg";
import share from "../../../../assets/icons/folderdropdown/share.svg";
// ! MATERIAL IMPORTS
import { Checkbox, Fab, Menu } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

// export default function ImageIconView({ name, size, type, isGreen }) {
export default function ImageIconView({ file = {}, isSelected = false, onSelect = () => {}, onRename = () => {}, onDelete = () => {} }) {
  const { name, module, description, file: url, size } = file;

  const [showMore, setShowMore] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePointerEnter = () => setShowMore(true);
  const handlePointerLeave = () => setShowMore(Boolean(anchorEl));

  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => {
    setAnchorEl(null);
    setShowMore(false);
  };

  const handleRenameClick = () => {
    onRename(file);
    handleClose();
  };

  const handleDeleteClick = () => {
    onDelete(file);
    handleClose();
  };

  const handleSelectionClick = (check) => onSelect(check, file);

  return (
    <div
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={`folder-icon-view position-relative d-flex flex-column align-items-center rounded-8${
        showMore || isSelected ? " folder-icon-view-hovering" : ""
      }`}>
      <div className="image-icon position-relative rounded-8">
        <img
          src={url ?? shoe}
          alt={description}
          width={120}
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
        {Boolean(module) && <small className="text-green-2">●</small>} {String(url?.slice(url?.lastIndexOf(".") + 1) ?? "").toUpperCase()} • {formatBytes(size)}
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
            onClick={handleClick}>
            <MoreHorizIcon
              fontSize="small"
              color="primary"
            />
          </Fab>
          <Menu
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}>
            <IconMenuItem
              icon={linkAngled}
              text="Copy Link"
              close={handleClose}
            />
            <IconMenuItem
              icon={folderUp}
              text="Move to Folder"
              close={handleClose}
            />
            <IconMenuItem
              icon={edit}
              text="Rename"
              action={handleRenameClick}
              close={handleClose}
            />
            <IconMenuItem
              icon={download}
              text="Download"
              close={handleClose}
            />
            <IconMenuItem
              isRed
              icon={archive}
              text="Delete"
              action={handleDeleteClick}
              close={handleClose}
            />
          </Menu>
        </div>
      )}
    </div>
  );
}

function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return "0B";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))}${sizes[i]}`;
}
