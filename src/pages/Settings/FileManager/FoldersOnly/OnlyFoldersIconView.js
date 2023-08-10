import { useState } from "react";
import { Checkbox, Fab, Menu } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IconMenuItem from "../IconMenuItem";
import folderLargePurple from "../../../../assets/icons/folderLargePurple.svg";
import archive from "../../../../assets/icons/folderdropdown/archive.svg";
import edit from "../../../../assets/icons/folderdropdown/edit.svg";

export default function OnlyFoldersIconView({ folder = {}, onRename = () => {}, onDelete = () => {} }) {
  const { name, count } = folder;

  const [isChecked, setIsChecked] = useState(false);
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
    onRename(folder);
    handleClose();
  };

  return (
    <div
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={`folder-icon-view position-relative d-flex flex-column align-items-center rounded-8${
        showMore || isChecked ? " folder-icon-view-hovering" : ""
      }`}>
      <div className="folder-icon rounded-8 p-4 m-2">
        <img
          src={folderLargePurple}
          alt="folder"
          width={60}
        />
      </div>
      <span className="text-lightBlue text-3">{name}</span>
      <small className="text-lightBlue text-1">{count} items</small>
      {(showMore || isChecked) && (
        <div className="position-absolute top-0 start-0">
          <Checkbox
            size="small"
            color="primary"
            className="rounded-4"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
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
              icon={edit}
              text="Rename"
              // click={}
              action={handleRenameClick}
              close={handleClose}
            />
            <IconMenuItem
              icon={archive}
              text="Delete"
              isRed
              // action={() => onDelete(folder)}
              close={handleClose}
            />
          </Menu>
        </div>
      )}
    </div>
  );
}
