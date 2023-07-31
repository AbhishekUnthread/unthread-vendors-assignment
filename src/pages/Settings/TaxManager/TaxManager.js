import info from "../../../assets/icons/info.svg";
import { Tooltip } from "@mui/material";

const TaxManager = () => {
  return (
    <div className="col-lg-10 border-grey-5 rounded-8 mt-5 p-4">
      <div className="my-3">
        <div className="row mb-2">
          <div className="col d-flex align-items-center">
            <h4 className="text-lightBlue fw-600 me-2">Tax Manager</h4>
            <Tooltip title="Lorem ipsum" placement="top">
              <img src={info} alt="info" className="c-pointer" width={13.5} />
            </Tooltip>
          </div>
          <div className="col-auto">col-auto</div>
        </div>
      </div>
    </div>
  );
};

export default TaxManager;
