import React from "react";
import "./CreateFieldSets.scss";
import { Link } from "react-router-dom";
// ! COMPONENT IMPORTS
import TabPanel from "../../../components/TabPanel/TabPanel";
// ! IMAGES IMPORTS
import arrowLeft from "../../../assets/icons/arrowLeft.svg";
import info from "../../../assets/icons/info.svg";
// ! MATERIAL IMPORTS
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  OutlinedInput,
  Checkbox,
  FormControlLabel,
  Tabs,
  Tab,
  Tooltip,
} from "@mui/material";
// ! MATERIAL ICONS IMPORTS
import DeleteIcon from "@mui/icons-material/Delete";
import NotesBox from "../../../components/NotesBox/NotesBox";

const CreateFieldSets = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // ? CHECKBOX STARTS HERE
  const [checked, setChecked] = React.useState(false);

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };
  // ? CHECKBOX ENDS HERE

  const [singleInfoRows, setSingleInfoRows] = React.useState(false);

  const handleSingleInfoRows = () => {
    setSingleInfoRows(!singleInfoRows);
  };

  const [groupFieldsData, setGroupFieldsData] = React.useState(false);

  const handleGroupFields = () => {
    setSingleInfoRows(false);
    setGroupFieldsData(!singleInfoRows);
  };

  return (
    <div className="page container-fluid position-relative user-group">
      <div className="row justify-content-between">
        <div className="d-flex align-items-center w-auto ps-0">
          <Link to="/parameters/additionalFields" className="d-flex">
            <img
              src={arrowLeft}
              alt="arrowLeft"
              width={9}
              className="c-pointer"
            />
          </Link>
          <h5 className="page-heading ms-2 ps-1">Create Field Sets</h5>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-9 mt-4">
          <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes">
            <div className="col-md-12 px-0">
              <p className="text-lightBlue mb-2">Create Field Sets Name</p>
              <FormControl className="w-100 px-0">
                <OutlinedInput placeholder="Enter Name" size="small" />
              </FormControl>
            </div>
          </div>
          <div className="bg-black-15 border-grey-5 rounded-8 p-3 row features mt-4">
            <div className="d-flex justify-content-between mb-2 px-0">
              <div>
                <div className="d-flex">
                  <h6 className="text-lightBlue text-lightBlue me-2 fw-500">
                    Add Custom Fields
                  </h6>
                  <Tooltip title="Lorem ipsum" placement="top">
                    <img
                      src={info}
                      alt="info"
                      className="c-pointer"
                      width={13.5}
                    />
                  </Tooltip>
                </div>

                <small className="text-grey-6 mt-1">
                  ⓘ Create Custom Fields such as Manufacturing Days.
                </small>
              </div>
              {value === 0 && (
                <button
                  className="button-gradient py-1 px-4"
                  onClick={handleSingleInfoRows}
                >
                  <p>+ Add Fields</p>
                </button>
              )}
              {value === 1 && (
                <button
                  className="button-gradient py-1 px-4"
                  onClick={handleGroupFields}
                >
                  <p>+ Create Group Fields</p>
                </button>
              )}
            </div>

            <Box
              sx={{ width: "100%" }}
              className="col-12 d-flex justify-content-between tabs-header-box px-0"
            >
              {/* variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile */}
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="scrollable force tabs example"
                className="tabs"
              >
                <Tab label="Single Info" className="tabs-head" />
                <Tab label="Group Info" className="tabs-head" />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0} className="px-0">
              <table className="table table-borderless w-100 mt-3 mb-0 create-table">
                <thead className="">
                  <tr className="bg-black-18">
                    <th scope="col" className="">
                      <small className="text-lightBlue fw-400">
                        Custom Title
                      </small>
                    </th>
                    <th scope="col" className="">
                      <small className="text-lightBlue fw-400">
                        Input Field Type
                      </small>
                    </th>
                    <th scope="col" className="">
                      <small className="text-lightBlue fw-400">Show/Hide</small>
                    </th>
                    <th scope="col" className=""></th>
                  </tr>
                </thead>
                <tbody>
                  {singleInfoRows &&
                    [...Array(2)].map((elementInArray, index) => (
                      <tr>
                        <td>
                          <FormControl className="w-100 px-0">
                            <OutlinedInput
                              placeholder="Enter Custom Title"
                              size="small"
                            />
                          </FormControl>
                        </td>
                        <td width={200}>
                          <FormControl size="small" className="w-100">
                            <Select
                              labelId="demo-select-small"
                              id="demo-select-small"
                              // value={category}
                              // onChange={handleCategoryChange}
                              size="small"
                            >
                              <MenuItem
                                value=""
                                sx={{ fontSize: 13, color: "#5c6d8e" }}
                              >
                                None
                              </MenuItem>
                              <MenuItem
                                value={10}
                                sx={{ fontSize: 13, color: "#5c6d8e" }}
                              >
                                Text Field
                              </MenuItem>
                              <MenuItem
                                value={20}
                                sx={{ fontSize: 13, color: "#5c6d8e" }}
                              >
                                Text
                              </MenuItem>
                              <MenuItem
                                value={30}
                                sx={{ fontSize: 13, color: "#5c6d8e" }}
                              >
                                Swatches
                              </MenuItem>
                              <MenuItem
                                value={40}
                                sx={{ fontSize: 13, color: "#5c6d8e" }}
                              >
                                Weight
                              </MenuItem>
                              <MenuItem
                                value={50}
                                sx={{ fontSize: 13, color: "#5c6d8e" }}
                              >
                                Dimensions
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </td>
                        <td width={100}>
                          <FormControl size="small" className="w-100">
                            <Select
                              labelId="demo-select-small"
                              id="demo-select-small"
                              // value={category}
                              // onChange={handleCategoryChange}
                              size="small"
                            >
                              <MenuItem
                                value=""
                                sx={{ fontSize: 13, color: "#5c6d8e" }}
                              >
                                None
                              </MenuItem>
                              <MenuItem
                                value={10}
                                sx={{ fontSize: 13, color: "#5c6d8e" }}
                              >
                                Show
                              </MenuItem>
                              <MenuItem
                                value={20}
                                sx={{ fontSize: 13, color: "#5c6d8e" }}
                              >
                                Hide
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </td>
                        <td width={50}>
                          <div className="d-flex align-items-center">
                            <Tooltip title="Delete" placement="top">
                              <div className="d-flex table-edit-icon rounded-4 p-2 border-grey-5">
                                <DeleteIcon
                                  sx={{
                                    color: "#5c6d8e",
                                    fontSize: 20,
                                    cursor: "pointer",
                                  }}
                                />
                              </div>
                            </Tooltip>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </TabPanel>
            <TabPanel value={value} index={1} className="px-0">
              {groupFieldsData && (
                <div className="bg-black-13 border-grey-5 rounded-8 p-3 mt-3">
                  <div className="row">
                    <div className="col-4">
                      <FormControl className="w-100 px-0">
                        <OutlinedInput
                          placeholder="Diamond Info"
                          size="small"
                        />
                      </FormControl>
                    </div>
                    <div className="col-3">
                      <FormControl size="small" className="w-100">
                        <Select
                          labelId="demo-select-small"
                          id="demo-select-small"
                          // value={category}
                          // onChange={handleCategoryChange}
                          size="small"
                        >
                          <MenuItem
                            value=""
                            sx={{ fontSize: 13, color: "#5c6d8e" }}
                          >
                            None
                          </MenuItem>
                          <MenuItem
                            value={10}
                            sx={{ fontSize: 13, color: "#5c6d8e" }}
                          >
                            Show
                          </MenuItem>
                          <MenuItem
                            value={20}
                            sx={{ fontSize: 13, color: "#5c6d8e" }}
                          >
                            Hide
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div className="col-3">
                      <button
                        className="button-gradient py-2 px-4 w-100"
                        onClick={handleSingleInfoRows}
                      >
                        <p>+ Add Fields</p>
                      </button>
                    </div>
                    <div className="col-auto ms-auto">
                      <Tooltip title="Delete" placement="top">
                        <div className="d-flex table-edit-icon rounded-4 p-2 border-grey-5 w-auto">
                          <DeleteIcon
                            sx={{
                              color: "#5c6d8e",
                              fontSize: 20,
                              cursor: "pointer",
                            }}
                          />
                        </div>
                      </Tooltip>
                    </div>
                  </div>
                  <div className="d-flex">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checked}
                          onChange={handleCheckboxChange}
                          inputProps={{ "aria-label": "controlled" }}
                          size="small"
                          style={{
                            color: "#5C6D8E",
                            marginRight: 0,
                            width: "auto",
                          }}
                        />
                      }
                      label="Allow user to create more same fields"
                      sx={{
                        "& .MuiTypography-root": {
                          fontSize: "0.875rem",
                          color: "#5C6D8E",
                        },
                      }}
                      className="me-2 px-0"
                    />
                    <Tooltip title="Lorem ipsum" placement="top">
                      <img
                        src={info}
                        alt="info"
                        className=" c-pointer"
                        width={13.5}
                      />
                    </Tooltip>
                  </div>
                  <table className="table table-borderless w-100 mt-3">
                    <thead className="">
                      <tr className="bg-black-18">
                        <th scope="col" className="">
                          <small className="text-lightBlue fw-400">
                            Custom Title
                          </small>
                        </th>
                        <th scope="col" className="">
                          <small className="text-lightBlue fw-400">
                            Input Field Type
                          </small>
                        </th>
                        <th scope="col" className="">
                          <small className="text-lightBlue fw-400">
                            Show/Hide
                          </small>
                        </th>
                        <th scope="col" className=""></th>
                      </tr>
                    </thead>
                    <tbody>
                      {singleInfoRows &&
                        [...Array(2)].map((elementInArray, index) => (
                          <tr>
                            <td>
                              <FormControl className="w-100 px-0">
                                <OutlinedInput
                                  placeholder="Enter Custom Title"
                                  size="small"
                                />
                              </FormControl>
                            </td>
                            <td width={200}>
                              <FormControl size="small" className="w-100">
                                <Select
                                  labelId="demo-select-small"
                                  id="demo-select-small"
                                  // value={category}
                                  // onChange={handleCategoryChange}
                                  size="small"
                                >
                                  <MenuItem
                                    value=""
                                    sx={{ fontSize: 13, color: "#5c6d8e" }}
                                  >
                                    None
                                  </MenuItem>
                                  <MenuItem
                                    value={10}
                                    sx={{ fontSize: 13, color: "#5c6d8e" }}
                                  >
                                    Text Field
                                  </MenuItem>
                                  <MenuItem
                                    value={20}
                                    sx={{ fontSize: 13, color: "#5c6d8e" }}
                                  >
                                    Text
                                  </MenuItem>
                                  <MenuItem
                                    value={30}
                                    sx={{ fontSize: 13, color: "#5c6d8e" }}
                                  >
                                    Swatches
                                  </MenuItem>
                                  <MenuItem
                                    value={40}
                                    sx={{ fontSize: 13, color: "#5c6d8e" }}
                                  >
                                    Weight
                                  </MenuItem>
                                  <MenuItem
                                    value={50}
                                    sx={{ fontSize: 13, color: "#5c6d8e" }}
                                  >
                                    Dimensions
                                  </MenuItem>
                                </Select>
                              </FormControl>
                            </td>
                            <td width={100}>
                              <FormControl size="small" className="w-100">
                                <Select
                                  labelId="demo-select-small"
                                  id="demo-select-small"
                                  // value={category}
                                  // onChange={handleCategoryChange}
                                  size="small"
                                >
                                  <MenuItem
                                    value=""
                                    sx={{ fontSize: 13, color: "#5c6d8e" }}
                                  >
                                    None
                                  </MenuItem>
                                  <MenuItem
                                    value={10}
                                    sx={{ fontSize: 13, color: "#5c6d8e" }}
                                  >
                                    Show
                                  </MenuItem>
                                  <MenuItem
                                    value={20}
                                    sx={{ fontSize: 13, color: "#5c6d8e" }}
                                  >
                                    Hide
                                  </MenuItem>
                                </Select>
                              </FormControl>
                            </td>
                            <td width={50}>
                              <div className="d-flex align-items-center">
                                <Tooltip title="Delete" placement="top">
                                  <div className="d-flex table-edit-icon rounded-4 p-2 border-grey-5">
                                    <DeleteIcon
                                      sx={{
                                        color: "#5c6d8e",
                                        fontSize: 20,
                                        cursor: "pointer",
                                      }}
                                    />
                                  </div>
                                </Tooltip>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </TabPanel>
          </div>
        </div>
        <div className="col-lg-3  pe-0 ps-0 ps-lg-3">
          <NotesBox />
        </div>
      </div>
      <div className="row create-buttons pt-5 pb-3 justify-content-between">
        <div className="d-flex w-auto px-0">
          <Link
            to="/parameters/additionalFields"
            className="button-red-outline py-2 px-4"
          >
            <p>Discard</p>
          </Link>

          <Link
            to="/parameters/additionalFields"
            className="button-lightBlue-outline py-2 px-4 ms-3"
          >
            <p>Save as Draft</p>
          </Link>
        </div>
        <div className="d-flex w-auto px-0">
          <Link
            to="/parameters/additionalFields"
            className="button-lightBlue-outline py-2 px-4"
          >
            <p>Save & Add Another</p>
          </Link>
          <Link
            to="/parameters/additionalFields"
            className="button-gradient ms-3 py-2 px-4 w-auto"
          >
            <p>Save</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateFieldSets;
