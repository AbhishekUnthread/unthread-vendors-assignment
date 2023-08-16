import { useState } from "react";
import IconMenuItem from "../IconMenuItem";
import video from "../../../../assets/images/dashboard/video.png";
import akarLinkChain from "../../../../assets/icons/akarLinkChain.svg";
import videosOn from "../../../../assets/icons/videosOn.svg";
import videoPlay from "../../../../assets/icons/videoPlay.svg";
import archive from "../../../../assets/icons/folderdropdown/archive.svg";
import download from "../../../../assets/icons/folderdropdown/download.svg";
import edit from "../../../../assets/icons/folderdropdown/edit.svg";
import folderUp from "../../../../assets/icons/folderdropdown/folderUp.svg";
import linkAngled from "../../../../assets/icons/folderdropdown/linkAngled.svg";
import share from "../../../../assets/icons/folderdropdown/share.svg";
import { Checkbox, Fab, Menu, TableCell, TableRow } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { formatBytes } from "../../../../utils/helper";

export default function VideoListView({
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
  const { _id = "", name = "", description = "", file: url = "", filesize = 0, folder = {} } = file;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOptionsClick = (e) => setAnchorEl(e.currentTarget);
  const handleOptionsClose = () => setAnchorEl(null);

  const handleDoubleClick = () => onDoubleClick(_id);

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
    <TableRow
      hover
      role="checkbox"
      className="table-rows"
      selected={isSelected}
      aria-checked={isSelected}>
      {/* CheckBox Cell */}
      <TableCell padding="checkbox">
        <Checkbox
          size="small"
          checked={isSelected}
          style={{ color: "#5C6D8E" }}
          onChange={(e) => handleSelectionClick(e.target.checked)}
        />
      </TableCell>
      {/* Image n Name */}
      <TableCell
        scope="row"
        component="th"
        onDoubleClick={handleDoubleClick}>
        <div className="d-flex align-items-center">
          <img
            src={video}
            alt={description}
            style={{ objectFit: "contain", overflow: "hidden" }}
            className="me-2 rounded-4"
            height={30}
            width={30}
          />
          <div className="d-flex flex-column ms-3">
            <span className="text-lightBlue fw-500">{name}</span>
            <small className="text-grey-6 mt-1">{folder.name ?? ""}</small>
          </div>
        </div>
      </TableCell>
      {/* Type */}
      <TableCell style={{ width: 180 }}>
        <div className="d-flex align-items-center py-3">
          <img
            src={videosOn}
            alt="v"
            height={15}
            width={15}
          />
          <p className="text-lightBlue ps-2 fw-200">Video</p>
        </div>
      </TableCell>
      {/* Size */}
      <TableCell style={{ width: 180 }}>
        <p className="text-lightBlue">{formatBytes(filesize)}</p>
      </TableCell>
      {/* Actions Cell */}
      <TableCell style={{ width: 140, padding: 0 }}>
        <div className="d-flex justify-content-center align-items-center">
          <Fab
            size="small"
            onClick={handleOptionsClick}>
            <MoreVertIcon
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
      </TableCell>
    </TableRow>
  );
}
