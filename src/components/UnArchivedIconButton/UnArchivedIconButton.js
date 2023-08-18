import { Tooltip } from "@mui/material";

import InventoryIcon from "@mui/icons-material/Inventory";

import "./UnArchivedIconButton.scss";

const UnArchivedIconButton = (props) => {
  const { onClick, title } = props;
  return (
    <Tooltip title={title} placement="top">
      <button
        onClick={onClick}
        type="button"
        className="reset table-edit-icon rounded-4 p-2"
      >
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

export default UnArchivedIconButton;
