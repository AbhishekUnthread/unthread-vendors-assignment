import { Tooltip } from "@mui/material";

import ClearIcon from "@mui/icons-material/Clear";

const CancelButton = (props) => {
  const { onClick } = props;
  return (
    <Tooltip title="Cancel" placement="top">
      <button onClick={onClick} className="reset table-edit-icon rounded-4 p-2">
        <ClearIcon
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

export default CancelButton;
