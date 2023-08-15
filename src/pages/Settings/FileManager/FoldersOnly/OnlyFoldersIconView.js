import { useState } from "react";
import { Checkbox, Fab, Menu } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IconMenuItem from "../IconMenuItem";
import folderLargePurple from "../../../../assets/icons/folderLargePurple.svg";
import archive from "../../../../assets/icons/folderdropdown/archive.svg";
import edit from "../../../../assets/icons/folderdropdown/edit.svg";

export default function OnlyFoldersIconView({
  folder = {},
  isSelected = false,
  onDoubleClick = () => {},
  onSelect = () => {},
  onRename = () => {},
  onDelete = () => {},
}) {
  const { _id = "", name = "", result = [] } = folder;

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
      className={`folder-icon-view position-relative d-flex flex-column align-items-center p-2 rounded-8${
        showMore || isSelected ? " folder-icon-view-hovering" : ""
      }`}>
      <div className="folder-icon rounded-8 p-4 m-2">
        <img
          src={folderLargePurple}
          alt="folder"
          width={60}
        />
      </div>
      <span className="text-lightBlue text-3">{name}</span>
      <small className="text-lightBlue text-1">{result.length} items</small>
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
