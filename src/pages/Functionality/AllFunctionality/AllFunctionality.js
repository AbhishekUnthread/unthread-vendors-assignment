import React from "react";
// ! COMPONENT IMPORTS
import TableSearch from "../../../components/TableSearch/TableSearch";
import TabPanel from "../../../components/TabPanel/TabPanel";
import AllFunctionalityBox from "./AllFunctionalityBox";
import AllFunctionalityBoxList from "./AllFunctionalityBoxList";
// ! IMAGES IMPORTS
import functionalitySizeChart from "../../../assets/images/functionality/functionalitySizeChart.svg";
import functionalityBadges from "../../../assets/images/functionality/functionalityBadges.svg";
import functionalityPreOrder from "../../../assets/images/functionality/functionalityPreOrder.svg";
import functionalityHyperlocalDelivery from "../../../assets/images/functionality/functionalityHyperlocalDelivery.svg";
import functionalityRestrictRegion from "../../../assets/images/functionality/functionalityRestrictRegion.svg";
import functionalityReturnRefund from "../../../assets/images/functionality/functionalityReturnRefund.svg";
import gridView from "../../../assets/images/functionality/gridView.svg";
import productOneInRowFilled from "../../../assets/icons/productOneInRowFilled.svg";
import productOneInRowOutlined from "../../../assets/icons/productOneInRowOutlined.svg";
import productTwoInRowFilled from "../../../assets/icons/productTwoInRowFilled.svg";
import productTwoInRowOutlined from "../../../assets/icons/productTwoInRowOutlined.svg";
// ! MATERIAL IMPORTS
import {
  Box,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Tab,
  Tabs,
} from "@mui/material";
// ! MATERIAL ICON IMPORTS
import GridViewIcon from "@mui/icons-material/GridView";
import ListIcon from "@mui/icons-material/List";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";

const AllFunctionality = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const viewData = [
    {
      id: 1,
      name: "gridView",
      image: gridView,
      // (
      //   <GridViewIcon
      //     sx={{ color: "#c8d8ff", fontSize: 20 }}
      //     className="c-pointer"
      //   />
      // ),
    },
    {
      id: 2,
      name: "listView",
      image: gridView,
      // (
      //   <ListIcon
      //     sx={{ color: "#c8d8ff", fontSize: 20 }}
      //     className="c-pointer"
      //   />
      // ),
    },
  ];

  const [view, setView] = React.useState("gridview");
  const handleViewChange = (e) => {
    console.log(e.target.value);
    if (e.target.value) {
      setView(e.target.value.toLowerCase());
      var elems = document
        .querySelector(".view-radio")
        .querySelectorAll(".MuiFormControlLabel-root.active");
      [].forEach.call(elems, function (el) {
        el.classList.remove("active");
      });
      e.target.closest("label").classList.toggle("active");
    }
  };

  return (
    <div className="container page-center">
      <h1 className="fw-600 text-lightBlue mt-4">All Functionality</h1>
      <h6 className="fw-500 text-blue-1 mt-3 opacity-75">
        Streamline your website efforetless Functionality
      </h6>

      <Paper
        sx={{ width: "100%", p: 0 }}
        // className="border-grey-5 bg-black-15"
        className="bg-black-2 shadow-none mt-5 mb-0"
      >
        <Box
          sx={{ width: "100%" }}
          className="d-flex justify-content-between tabs-header-box"
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
            <Tab label="Activated" className="tabs-head" />
            <Tab label="Explore" className="tabs-head" />
          </Tabs>
          <div className="d-flex align-items-center">
            {/* <img src={indiaFlag} alt="indiaFlag" height={15} /> */}
            <TableSearch />
            <p className="text-grey-6 ms-3">|</p>
            {/* <GridViewIcon
              sx={{ color: "#c8d8ff", fontSize: 20 }}
              className="c-pointer ms-2"
            />
            <ListIcon
              sx={{ color: "#c8d8ff", fontSize: 20 }}
              className="c-pointer ms-2"
            /> */}

            {/* <FormControl
              className="view-radio-buttons view-radio d-flex"
              style={{ width: "101px" }}
            >
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={viewData[0].name}
                name="radio-buttons-group"
                row
              >
                {viewData.map((e, index) => (
                  <FormControlLabel
                    value={e.name}
                    control={<Radio size="small" />}
                    className={`ms-0 view-radio${index} view-buttons`}
                    onChange={(e) => {
                      handleViewChange(e);
                    }}
                    key={index}
                    label={
                      <div className="d-flex align-items-center px-1">
                        <img src={e.image} alt="gridView" width={20} />
                      </div>
                    }
                  />
                ))}
              </RadioGroup>
            </FormControl> */}

            <div className="d-flex">
              {view === "gridview" && (
                <img
                  src={productTwoInRowFilled}
                  alt=""
                  onClick={() => {
                    setView("gridview");
                  }}
                  className="c-pointer ms-3"
                  width={20}
                />
              )}
              {view === "listview" && (
                <img
                  src={productTwoInRowOutlined}
                  alt=""
                  onClick={() => {
                    setView("gridview");
                  }}
                  className="c-pointer ms-3"
                  width={20}
                />
              )}
              {view === "listview" && (
                <img
                  src={productOneInRowFilled}
                  alt=""
                  onClick={() => {
                    setView("listview");
                  }}
                  className="c-pointer ms-3"
                  width={20}
                />
              )}
              {view === "gridview" && (
                <img
                  src={productOneInRowOutlined}
                  alt=""
                  onClick={() => {
                    setView("listview");
                  }}
                  className="c-pointer ms-3"
                  width={20}
                />
              )}
            </div>
          </div>
        </Box>
        <TabPanel value={value} index={0}>
          {view === "gridview" && (
            <div className="row">
              <div className="col-md-4 col-6 mt-4">
                <AllFunctionalityBox
                  imageName={functionalitySizeChart}
                  headingName={"Size Chart"}
                  buttonName={"Manage"}
                />
              </div>
              <div className="col-md-4 col-6 mt-4">
                <AllFunctionalityBox
                  imageName={functionalityBadges}
                  headingName={"Badges"}
                  buttonName={"Manage"}
                />
              </div>
              <div className="col-md-4 col-6 mt-4">
                <AllFunctionalityBox
                  imageName={functionalityPreOrder}
                  headingName={"Pre Order"}
                  buttonName={"Manage"}
                />
              </div>
            </div>
          )}
          {view === "listview" && (
            <div className="row">
              <div className="col-12 mt-4">
                <AllFunctionalityBoxList
                  imageName={functionalitySizeChart}
                  headingName={"Size Chart"}
                  buttonName={"Manage"}
                />
              </div>
              <div className="col-12 mt-4">
                <AllFunctionalityBoxList
                  imageName={functionalityBadges}
                  headingName={"Badges"}
                  buttonName={"Manage"}
                />
              </div>
              <div className="col-12 mt-4">
                <AllFunctionalityBoxList
                  imageName={functionalityPreOrder}
                  headingName={"Pre Order"}
                  buttonName={"Manage"}
                />
              </div>
            </div>
          )}
          <div className="row mt-4 mx-0">
            <div className="c-pointer  border-grey-5 col-12 bg-black-15 hover-back-two rounded-8 d-flex px-3 py-3 justify-content-between align-items-center">
              <div className="d-flex">
                <SettingsOutlinedIcon
                  sx={{ color: "#c8d8ff", fontSize: 40, fontWeight: 400 }}
                  className="c-pointer me-3"
                />
                <div className="d-flex flex-column">
                  <p className="text-lightBlue text-start">Settings</p>
                  <small className="text-grey-6">
                    Change your functionality settings according to your needs
                  </small>
                </div>
              </div>
              <ArrowForwardIosSharpIcon
                sx={{ color: "#c8d8ff", fontSize: 20 }}
                className="c-pointer me-2"
              />
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          {view === "gridview" && (
            <div className="row">
              <div className="col-md-4 col-6 mt-4">
                <AllFunctionalityBox
                  imageName={functionalityReturnRefund}
                  headingName={"Returns & Refund"}
                  buttonName={"Activate"}
                />
              </div>
              <div className="col-md-4 col-6 mt-4">
                <AllFunctionalityBox
                  imageName={functionalityRestrictRegion}
                  headingName={"Restrict Region"}
                  buttonName={"Activate"}
                />
              </div>
              <div className="col-md-4 col-6 mt-4">
                <AllFunctionalityBox
                  imageName={functionalityHyperlocalDelivery}
                  headingName={"Hyperlocal Delivery"}
                  buttonName={"Activate"}
                />
              </div>
              <div className="col-md-4 col-6 mt-4">
                <AllFunctionalityBox
                  imageName={functionalitySizeChart}
                  headingName={"Size Chart"}
                  buttonName={"Activate"}
                />
              </div>
              <div className="col-md-4 col-6 mt-4">
                <AllFunctionalityBox
                  imageName={functionalityBadges}
                  headingName={"Badges"}
                  buttonName={"Activate"}
                />
              </div>
              <div className="col-md-4 col-6 mt-4">
                <AllFunctionalityBox
                  imageName={functionalityPreOrder}
                  headingName={"Pre Order"}
                  buttonName={"Activate"}
                />
              </div>
              <div className="col-md-4 col-6 mt-4">
                <AllFunctionalityBox
                  imageName={functionalityReturnRefund}
                  headingName={"Returns & Refund"}
                  buttonName={"Activate"}
                />
              </div>
              <div className="col-md-4 col-6 mt-4">
                <AllFunctionalityBox
                  imageName={functionalityRestrictRegion}
                  headingName={"Restrict Region"}
                  buttonName={"Activate"}
                />
              </div>
              <div className="col-md-4 col-6 mt-4">
                <AllFunctionalityBox
                  imageName={functionalityHyperlocalDelivery}
                  headingName={"Hyperlocal Delivery"}
                  buttonName={"Activate"}
                />
              </div>
            </div>
          )}
          {view === "listview" && (
            <div className="row">
              <div className="col-12 mt-4">
                <AllFunctionalityBoxList
                  imageName={functionalityReturnRefund}
                  headingName={"Returns & Refund"}
                  buttonName={"Activate"}
                />
              </div>
              <div className="col-12 mt-4">
                <AllFunctionalityBoxList
                  imageName={functionalityRestrictRegion}
                  headingName={"Restrict Region"}
                  buttonName={"Activate"}
                />
              </div>
              <div className="col-12 mt-4">
                <AllFunctionalityBoxList
                  imageName={functionalityHyperlocalDelivery}
                  headingName={"Hyperlocal Delivery"}
                  buttonName={"Activate"}
                />
              </div>
              <div className="col-12 mt-4">
                <AllFunctionalityBoxList
                  imageName={functionalitySizeChart}
                  headingName={"Size Chart"}
                  buttonName={"Activate"}
                />
              </div>
              <div className="col-12 mt-4">
                <AllFunctionalityBoxList
                  imageName={functionalityBadges}
                  headingName={"Badges"}
                  buttonName={"Activate"}
                />
              </div>
              <div className="col-12 mt-4">
                <AllFunctionalityBoxList
                  imageName={functionalityPreOrder}
                  headingName={"Pre Order"}
                  buttonName={"Activate"}
                />
              </div>
              <div className="col-12 mt-4">
                <AllFunctionalityBoxList
                  imageName={functionalityReturnRefund}
                  headingName={"Returns & Refund"}
                  buttonName={"Activate"}
                />
              </div>
              <div className="col-12 mt-4">
                <AllFunctionalityBoxList
                  imageName={functionalityRestrictRegion}
                  headingName={"Restrict Region"}
                  buttonName={"Activate"}
                />
              </div>
              <div className="col-12 mt-4">
                <AllFunctionalityBoxList
                  imageName={functionalityHyperlocalDelivery}
                  headingName={"Hyperlocal Delivery"}
                  buttonName={"Activate"}
                />
              </div>
            </div>
          )}
        </TabPanel>
      </Paper>
    </div>
  );
};

export default AllFunctionality;
