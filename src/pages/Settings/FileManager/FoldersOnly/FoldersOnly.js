// ! COMPONENT IMPORTS
// ! IMAGES IMPORTS
import info from "../../../../assets/icons/info.svg";
// ! MATERIAL IMPORTS
import { Button, Tooltip } from "@mui/material";

const FoldersOnly = () => {
  return (
    <div className="my-3">
      <div className="row mb-3">
        <div className="col d-flex align-items-center">
          <h4 className="text-lightBlue fs-6 fw-500 me-2">All / Folders</h4>
          <Tooltip title="Lorem ipsum" placement="top">
            <img src={info} alt="info" className="c-pointer" width={13.5} />
          </Tooltip>
        </div>
        <div className="col-auto">
          <Button variant="text" className="me-2">
            <span className="text-blue-2">+ Create a new folder</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FoldersOnly;
