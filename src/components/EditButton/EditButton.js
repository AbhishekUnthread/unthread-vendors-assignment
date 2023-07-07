import { Tooltip } from "@mui/material";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const EditButton = (props) => {
  const { onClick } = props;
  return (
    <Tooltip title="Edit" placement="top">
      <button onClick={onClick} className="reset table-edit-icon rounded-4 p-2">
        <EditOutlinedIcon
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

export default EditButton;
