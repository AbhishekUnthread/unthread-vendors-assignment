import { useState } from "react";
import { Checkbox, Fab, Menu } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IconMenuItem from "../IconMenuItem";
import folderLargePurple from "../../../../assets/icons/folderLargePurple.svg";
import archive from "../../../../assets/icons/folderdropdown/archive.svg";
import edit from "../../../../assets/icons/folderdropdown/edit.svg";

export default function FolderIconView({
  folder = {},
  isSelected = false,
  onDoubleClick = () => {},
  onSelect = () => {},
  onRename = () => {},
  onDelete = () => {},
}) {
  const { name, result } = folder;

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
    onDoubleClick(folder);
  };

  const handleRenameClick = () => {
    onRename(folder);
    handleOptionsClose();
  };

  const handleDeleteClick = () => {
    onDelete(folder);
    handleOptionsClose();
  };

  const handleSelectionClick = (check) => onSelect(check, folder);

  return (
    <div
      onDoubleClick={handleDoubleClick}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={`folder-icon-view position-relative d-flex align-items-center rounded-8${showMore || isSelected ? " folder-icon-view-hovering" : ""}`}>
      <div className="folder-icon rounded-8 p-3 m-2">
        <img
          src={folderLargePurple}
          alt="icon"
          width={30}
        />
      </div>
      <div className="d-flex flex-column justify-content-center">
        <span>{name}</span>
        <small>{result.length} items</small>
      </div>
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
        <div className="position-absolute top-50 end-0 translate-middle-y">
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
              icon={edit}
              text="Rename"
              action={handleRenameClick}
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
