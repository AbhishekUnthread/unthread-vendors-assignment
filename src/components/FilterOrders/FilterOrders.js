import React from "react";
// ! IMAGES IMPORTS
import cancel from "../../assets/icons/cancel.svg";
import filter from "../../assets/icons/filter.svg";
// ! MATERIAL IMPORTS
import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  SwipeableDrawer,
  TextField,
  styled,
  Select,
  MenuItem,
  FormControl,
  OutlinedInput,
} from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
// ! MATERIAL ICONS IMPORTS
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";

const taggedWithData = [
  { title: "Tag 1", value: "tag1" },
  { title: "Tag 2", value: "tag2" },
  { title: "Tag 3", value: "tag3" },
  { title: "Tag 4", value: "tag4" },
  { title: "Tag 5", value: "tag5" },
  { title: "Tag 6", value: "tag6" },
  { title: "Tag 7", value: "tag7" },
  { title: "Tag 8", value: "tag8" },
  { title: "Tag 9", value: "tag9" },
  { title: "Tag 10", value: "tag10" },
  { title: "Tag 11", value: "tag11" },
  { title: "Tag 12", value: "tag12" },
];

// ? FILTER ACCORDIAN STARTS HERE
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  // border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem", color: "#c8d8ff" }} />
    }
    {...props}
  />
))(({ theme }) => ({
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    padding: "0px",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: "0 16px ",
}));
// ? FILTER ACCORDIAN ENDS HERE

const FilterOrders = ({ buttonName }) => {
  // ? FILTER DRAWER STARTS HERE
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  // ? FILTER DRAWER ENDS HERE

  // ? FILTER ACCORDIAN STARTS HERE
  const [expanded, setExpanded] = React.useState("panel1");

  const handleAccordianChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  // ? FILTER ACCORDIAN ENDS HERE

  return (
    <React.Fragment key="right">
      <button
        className="button-grey py-2 px-3"
        onClick={toggleDrawer("right", true)}
      >
        <small className="text-lightBlue">{buttonName}</small>
        <img src={filter} alt="filter" className="ms-2" />
      </button>
      <SwipeableDrawer
        anchor="right"
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
        onOpen={toggleDrawer("right", true)}
      >
        <div className="d-flex justify-content-between py-3 px-3 ms-2 me-1">
          <h6 className="text-lightBlue">Filters</h6>
          <img
            src={cancel}
            alt="cancel"
            className="c-pointer filter-icon"
            onClick={toggleDrawer("right", false)}
          />
        </div>

        <div className="px-2">
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleAccordianChange("panel1")}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <p className="text-lightBlue">Email Subscription</p>
            </AccordionSummary>
            <AccordionDetails>
              <RadioGroup
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                // value={recommendedProductRadio}
                // onChange={handleRecommendedProductRadio}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio size="small" />}
                  label="Yes"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: 13,
                      color: "#c8d8ff",
                    },
                  }}
                />
                <FormControlLabel
                  value="2"
                  control={<Radio size="small" />}
                  label="No"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: 13,
                      color: "#c8d8ff",
                    },
                  }}
                />
              </RadioGroup>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleAccordianChange("panel2")}
          >
            <AccordionSummary
              aria-controls="panel2d-content"
              id="panel2d-header"
            >
              <p className="text-lightBlue">Tagged With</p>
            </AccordionSummary>
            <AccordionDetails>
              <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                sx={{ width: "100%" }}
                options={taggedWithData}
                disableCloseOnSelect
                getOptionLabel={(option) => option.title}
                size="small"
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                      checkedIcon={<CheckBoxIcon fontSize="small" />}
                      checked={selected}
                      size="small"
                      style={{
                        color: "#5C6D8E",
                        marginRight: 0,
                      }}
                    />
                    <small className="text-lightBlue">{option.title}</small>
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    size="small"
                    {...params}
                    placeholder="Search"
                    inputRef={(input) => input?.focus()}
                  />
                )}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleAccordianChange("panel3")}
          >
            <AccordionSummary
              aria-controls="panel3d-content"
              id="panel3d-header"
            >
              <p className="text-lightBlue">Amount Spent</p>
            </AccordionSummary>
            <AccordionDetails>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                // value={gender}
                // onChange={handleGenderChange}
                size="small"
                className="w-100"
              >
                <MenuItem value="" sx={{ fontSize: 13, color: "#5c6d8e" }}>
                  None
                </MenuItem>
                <MenuItem value={10} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                  Equal To
                </MenuItem>
                <MenuItem value={20} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                  Multiple
                </MenuItem>
              </Select>
              <FormControl className="w-100 px-0 mt-3">
                <OutlinedInput placeholder="Enter Value" size="small" />
              </FormControl>
              <small className="text-grey-6 mt-2 c-pointer">Clear All</small>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel4"}
            onChange={handleAccordianChange("panel4")}
          >
            <AccordionSummary
              aria-controls="panel4d-content"
              id="panel4d-header"
            >
              <p className="text-lightBlue">User Account Status</p>
            </AccordionSummary>
            <AccordionDetails>
              <FormGroup className="tags-checkbox">
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      style={{
                        color: "#5C6D8E",
                        marginRight: 0,
                      }}
                    />
                  }
                  label="Active"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      style={{
                        color: "#5C6D8E",
                        marginRight: 0,
                      }}
                    />
                  }
                  label="Draft"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      style={{
                        color: "#5C6D8E",
                        marginRight: 0,
                      }}
                    />
                  }
                  label="Archived"
                />
              </FormGroup>
              <small className="text-grey-6 mt-2 c-pointer">Clear All</small>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel5"}
            onChange={handleAccordianChange("panel5")}
          >
            <AccordionSummary
              aria-controls="panel5d-content"
              id="panel5d-header"
            >
              <p className="text-lightBlue">Date of Order</p>
            </AccordionSummary>
            <AccordionDetails>
              <FormGroup className="tags-checkbox">
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      style={{
                        color: "#5C6D8E",
                        marginRight: 0,
                      }}
                    />
                  }
                  label="Today"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      style={{
                        color: "#5C6D8E",
                        marginRight: 0,
                      }}
                    />
                  }
                  label="Yesterday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      style={{
                        color: "#5C6D8E",
                        marginRight: 0,
                      }}
                    />
                  }
                  label="3 days ago"
                />
              </FormGroup>
              <small className="text-blue-gradient ps-3 ms-2 pt-2 fw-500 c-pointer">
                Custom Date
              </small>
              {/* <small className="text-grey-6 mt-2 c-pointer">Clear All</small> */}
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel6"}
            onChange={handleAccordianChange("panel6")}
          >
            <AccordionSummary
              aria-controls="panel6d-content"
              id="panel6d-header"
            >
              <p className="text-lightBlue">Abandoned Checkouts</p>
            </AccordionSummary>
            <AccordionDetails>
              <FormGroup className="tags-checkbox">
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      style={{
                        color: "#5C6D8E",
                        marginRight: 0,
                      }}
                    />
                  }
                  label="Today"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      style={{
                        color: "#5C6D8E",
                        marginRight: 0,
                      }}
                    />
                  }
                  label="Yesterday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      style={{
                        color: "#5C6D8E",
                        marginRight: 0,
                      }}
                    />
                  }
                  label="3 days ago"
                />
              </FormGroup>
              <small className="text-blue-gradient ps-3 ms-2 pt-2 fw-500 c-pointer">
                Custom Date
              </small>
              {/* <small className="text-grey-6 mt-2 c-pointer">Clear All</small> */}
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel7"}
            onChange={handleAccordianChange("panel7")}
          >
            <AccordionSummary
              aria-controls="panel7d-content"
              id="panel7d-header"
            >
              <p className="text-lightBlue">Location</p>
            </AccordionSummary>
            <AccordionDetails>
              <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                sx={{ width: "100%" }}
                options={taggedWithData}
                disableCloseOnSelect
                getOptionLabel={(option) => option.title}
                size="small"
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                      checkedIcon={<CheckBoxIcon fontSize="small" />}
                      checked={selected}
                      size="small"
                      style={{
                        color: "#5C6D8E",
                        marginRight: 0,
                      }}
                    />
                    <small className="text-lightBlue">{option.title}</small>
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    size="small"
                    {...params}
                    placeholder="Search"
                    inputRef={(input) => input?.focus()}
                  />
                )}
              />
            </AccordionDetails>
          </Accordion>
        </div>

        <div className="d-flex flex-column py-3 px-4 filter-buttons">
          <hr className="hr-grey-6 my-3 w-100" />
          <div className="d-flex justify-content-between">
            <button className="button-lightBlue-outline py-2 px-3">
              <p>Clear all Filters</p>
            </button>
            <button className="button-gradient py-2 px-5 w-auto ">
              <p>Done</p>
            </button>
          </div>
        </div>
      </SwipeableDrawer>
    </React.Fragment>
  );
};

export default FilterOrders;
