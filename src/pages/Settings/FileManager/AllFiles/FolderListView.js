import { useState } from "react";
import { Checkbox, Fab, Menu, TableCell, TableRow } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconMenuItem from "../IconMenuItem";
import folderOpen from "../../../../assets/icons/folderOpen.svg";
import folderLargePurple from "../../../../assets/icons/folderLargePurple.svg";
import archive from "../../../../assets/icons/folderdropdown/archive.svg";
import edit from "../../../../assets/icons/folderdropdown/edit.svg";

export default function FolderListView({
  folder = {},
  isSelected = false,
  onDoubleClick = () => {},
  onSelect = () => {},
  onRename = () => {},
  onDelete = () => {},
}) {
  const { name = "", result = [] } = folder;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOptionsClick = (e) => setAnchorEl(e.currentTarget);
  const handleOptionsClose = () => setAnchorEl(null);

  const handleDoubleClick = () => onDoubleClick(folder);

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
            src={folderLargePurple}
            alt="folder"
            height={30}
            width={30}
          />
          <div className="d-flex flex-column ms-3">
            <span className="text-lightBlue fw-500">{name}</span>
            <small className="text-grey-6 mt-1">{result.length} items</small>
          </div>
        </div>
      </TableCell>
      {/* Type */}
      <TableCell style={{ width: 180 }}>
        <div className="d-flex align-items-center py-3">
          <img
            src={folderOpen}
            alt="f"
            height={15}
            width={15}
          />
          <p className="text-lightBlue ps-2 fw-200">Folder</p>
        </div>
      </TableCell>
      {/* Size */}
      <TableCell style={{ width: 180 }}>
        <p className="text-lightBlue">{result.length} items</p>
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
      </TableCell>
    </TableRow>
  );
}
