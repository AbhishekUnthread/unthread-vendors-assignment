import { Tooltip } from "@mui/material";

import InventoryIcon from "@mui/icons-material/Inventory";

const ArchiveButton = () => {
  return (
    <Tooltip title="Archived" placement="top">
      <button className="reset table-edit-icon rounded-4 p-2">
        <InventoryIcon
          sx={{
            color: "#5c6d8e",
            fontSize: 18,
            cursor: "pointer",
          }}
        />
      </button>
    </Tooltip>
  );
};

export default ArchiveButton;
