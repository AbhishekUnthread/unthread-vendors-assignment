import { Tooltip } from "@mui/material";

import { ReactComponent as DeleteIcon } from "../../assets/icons/permanentDelete.svg";

import "./DeleteIconButton.scss";

const DeleteIconButton = (props) => {
  const { onClick, title } = props;
  return (
    <Tooltip title={title} placement="top">
      <button
        onClick={onClick}
        type="button"
        className="reset table-edit-icon rounded-4 p-2"
      >
        <DeleteIcon className="svg" width={20} height={20} />
      </button>
    </Tooltip>
  );
};

export default DeleteIconButton;
