import { useState } from "react";
// ! COMPONENT IMPORTS
import { AntSwitch } from "../../../../components/AntSwitch/AntSwitch";
// ! IMAGES IMPORTS
import info from "../../../../assets/icons/info.svg";
// ! MATERIAL IMPORTS
import {
  MenuItem,
  OutlinedInput,
  Select,
  Tooltip,
  Button,
  InputAdornment,
} from "@mui/material";
// ! MATERIAL ICONS IMPORTS
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

const RingStones = ({ stone, icon }) => {
  const [showStoneInfo, setShowStoneInfo] = useState(false);
  const [stoneData, setStoneData] = useState([
    {
      shape: "Round",
      settingType: "Micro",
      size: "0.05",
      noOfPieces: "20",
      caratWeight: "0.05",
    },
  ]);

  return (
    <div className="row py-3 border-grey-5 rounded-8 align-items-center bg-black-13 mt-3">
      <div className="row pt-2 pb-2">
        <div className="col-9 d-flex align-items-center">
          <img src={icon} alt="icon" width={50} />

          <h6 className="text-lightBlue fw-500 me-2">{stone} Information</h6>

          <Tooltip title="Lorem ipsum" placement="top">
            <img src={info} alt="info" className="c-pointer" width={13.5} />
          </Tooltip>
        </div>

        <div className="col-3 d-flex justify-content-end">
          <AntSwitch
            checked={showStoneInfo}
            onChange={(e) => setShowStoneInfo(e.target.checked)}
          />
        </div>
      </div>
      {/* Hidden Content row with pt-4 */}
      {showStoneInfo && (
        <div className="row pt-4 pb-2">
          <div className="col-12">
            <div className="row mt-2 mb-3">
              <div className="col-1">
                <span className="text-lightBlue">No.</span>
              </div>

              <div className="col-2">
                <span className="text-lightBlue">Shape</span>
              </div>

              <div className="col-2">
                <span className="text-lightBlue">Setting Type</span>
              </div>

              <div className="col-2">
                <span className="text-lightBlue">Size</span>
              </div>

              <div className="col-2">
                <span className="text-lightBlue">No of Pieces</span>
              </div>

              <div className="col-2">
                <span className="text-lightBlue">Carat Weight</span>
              </div>

              <div className="col-1"></div>
            </div>
            {stoneData.map((item, index) => (
              <div key={index} className="row my-2">
                <div className="col-1">
                  <span className="text-lightBlue">{index + 1}</span>
                </div>

                <div className="col-2">
                  <Select
                    defaultValue={item.shape}
                    size="small"
                    className="w-100"
                  >
                    <MenuItem value="Round">Round</MenuItem>
                  </Select>
                </div>

                <div className="col-2">
                  <Select
                    defaultValue={item.settingType}
                    size="small"
                    className="w-100"
                  >
                    <MenuItem value="Micro">Micro</MenuItem>
                  </Select>
                </div>

                <div className="col-2">
                  <OutlinedInput
                    className="w-100"
                    placeholder="Enter Size"
                    size="small"
                    endAdornment={
                      <InputAdornment position="end">gm</InputAdornment>
                    }
                  />
                </div>

                <div className="col-2">
                  <OutlinedInput
                    type="number"
                    className="w-100"
                    placeholder="Enter Size"
                    size="small"
                  />
                </div>

                <div className="col-2">
                  <OutlinedInput
                    className="w-100"
                    placeholder="Enter Size"
                    size="small"
                    endAdornment={
                      <InputAdornment position="end">gm</InputAdornment>
                    }
                  />
                </div>

                <div className="col-1">
                  <DeleteForeverOutlinedIcon
                    onClick={() =>
                      setStoneData(stoneData.filter((_, i) => i !== index))
                    }
                    sx={{
                      color: "#5c6d8e",
                      cursor: "pointer",
                    }}
                  />
                </div>
              </div>
            ))}

            <div className="row mt-4">
              <div className="col-12">
                <Button
                  onClick={() =>
                    setStoneData(
                      stoneData.concat({
                        shape: "Round",
                        settingType: "Micro",
                        size: "0.05",
                        noOfPieces: "20",
                        caratWeight: "0.05",
                      })
                    )
                  }
                  variant="text"
                >
                  <AddCircleOutlineOutlinedIcon
                    sx={{
                      color: "#5c6d8e",
                      cursor: "pointer",
                    }}
                  />
                  <span className="text-blue-2 ps-1">Add More {stone}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RingStones;
