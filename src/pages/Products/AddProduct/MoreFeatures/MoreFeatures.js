import React, { useMemo } from "react";
import "./MoreFeatures.scss";
import { useDropzone } from "react-dropzone";
// ! IMAGES IMPORTS
import preOrder from "../../../../assets/images/products/preOrder.svg";
import label from "../../../../assets/images/products/label.svg";
import sizeChart from "../../../../assets/images/products/sizeChart.svg";
import featureUpload from "../../../../assets/images/products/featureUpload.svg";
// ! MATERIAL IMPORTS
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

// ? FILE UPLOAD STARTS HERE
const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "0",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#5C6D8E",
  borderStyle: "dashed",
  //   backgroundColor: "",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  cursor: "pointer",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};
// ? FILE UPLOAD ENDS HERE

const MoreFeatures = () => {
  // ? RADIO BUTTON STARTS HERE
  const [likeProductRadio, setLikeProductRadio] = React.useState(
    "companyIntelligence"
  );
  const handleLikeProductRadio = (event) => {
    setLikeProductRadio(event.target.value);
  };

  const [likeMatchRadio, setLikeMatchRadio] = React.useState("allCondition");
  const handleLikeMatchRadio = (event) => {
    setLikeMatchRadio(event.target.value);
  };

  const [recommendedProductRadio, setRecommendedProductRadio] = React.useState(
    "companyIntelligence"
  );
  const handleRecommendedProductRadio = (event) => {
    setRecommendedProductRadio(event.target.value);
  };

  const [recommendedMatchRadio, setRecommendedMatchRadio] =
    React.useState("allCondition");
  const handleRecommendedMatchRadio = (event) => {
    setRecommendedMatchRadio(event.target.value);
  };

  // ? RADIO BUTTON ENDS HERE

  // ? FILE UPLOAD STARTS HERE
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ accept: "image/*" });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );
  // ? FILE UPLOAD ENDS HERE

  return (
    <React.Fragment>
      <div className="row justify-content-between mb-3">
        <h6 className="text-lightBlue me-auto text-lightBlue col-auto ps-0">
          You may also like
        </h6>
        <p className="text-blue-2 col-auto pe-0">Customise</p>
      </div>
      <div className="bg-black-9 border-grey-5 rounded-3 p-3 row features mb-4">
        <h6 className="text-lightBlue col-12 text-lightBlue mb-2">
          Add Product
        </h6>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={likeProductRadio}
          onChange={handleLikeProductRadio}
          className="features-radio"
        >
          <FormControlLabel
            value="companyIntelligence"
            control={<Radio size="small" />}
            label="Company Intelligence"
            sx={{
              "& .MuiTypography-root": {
                fontSize: 13,
                color: "#c8d8ff",
              },
            }}
          />
          <FormControlLabel
            value="automated"
            control={<Radio size="small" />}
            label="Automated"
            sx={{
              "& .MuiTypography-root": {
                fontSize: 13,
                color: "#c8d8ff",
              },
            }}
          />
          <FormControlLabel
            value="manual"
            control={<Radio size="small" />}
            label="Manual"
            sx={{
              "& .MuiTypography-root": {
                fontSize: 13,
                color: "#c8d8ff",
              },
            }}
          />
        </RadioGroup>
        <div className="bg-black-11 rounded-3 p-3 shadow-sm">
          {likeProductRadio === "companyIntelligence" && (
            <React.Fragment>
              <p className="text-blue-gradient fw-bold" style={{ width: 160 }}>
                Company Intelligence
              </p>
              <p className="text-grey-6 mt-2">
                Company Intelligence is a tool that uses a series of algorithms,
                data analysis and even artificial intelligence (AI) to make
                online recommendations for products, content and/or other
                elements. These recommendations can be customized for each user
                or not, depending on the purpose of each platform, the amount of
                data obtained and even the type of technology used
              </p>
            </React.Fragment>
          )}
          {likeProductRadio === "automated" && (
            <React.Fragment>
              <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <p className="text-lightBlue me-4">Should Match:</p>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={likeMatchRadio}
                    onChange={handleLikeMatchRadio}
                    className="features-radio"
                  >
                    <FormControlLabel
                      value="allCondition"
                      control={<Radio size="small" />}
                      label="All Condition"
                      sx={{
                        "& .MuiTypography-root": {
                          fontSize: 13,
                          color: "#c8d8ff",
                        },
                      }}
                    />
                    <FormControlLabel
                      value="anyCondition"
                      control={<Radio size="small" />}
                      label="Any Condition"
                      sx={{
                        "& .MuiTypography-root": {
                          fontSize: 13,
                          color: "#c8d8ff",
                        },
                      }}
                    />
                  </RadioGroup>
                </div>
                <button className="button-gradient py-1 px-4">
                  <p>Add Condition</p>
                </button>
              </div>
              <div className="bg-black-9 rounded-3 py-2 px-3 d-flex justify-content-between mt-3 shadow-lg">
                <p className="text-lightBlue c-pointer">Summary</p>
                <p className="text-lightBlue c-pointer">Action</p>
              </div>
            </React.Fragment>
          )}
          {likeProductRadio === "manual" && (
            <div {...getRootProps({ style })} className="">
              <input
                id="primary"
                {...getInputProps()}
                // onChange={(event) => {
                //   uploadFileToCloud(event, "primary");
                //   event.target.value = null;
                // }}
              />
              <img src={featureUpload} className="w-100" alt="" />
            </div>
          )}
        </div>
      </div>
      <div className="row justify-content-between mb-3">
        <h6 className="text-lightBlue me-auto text-lightBlue col-auto ps-0">
          Recommended Products
        </h6>
        <p className="text-blue-2 col-auto pe-0">Customise</p>
      </div>
      <div className="bg-black-9 border-grey-5 rounded-3 p-3 row features mb-3">
        <h6 className="text-lightBlue col-12 text-lightBlue mb-2">
          Add Product
        </h6>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={recommendedProductRadio}
          onChange={handleRecommendedProductRadio}
          className="features-radio"
        >
          <FormControlLabel
            value="companyIntelligence"
            control={<Radio size="small" />}
            label="Company Intelligence"
            sx={{
              "& .MuiTypography-root": {
                fontSize: 13,
                color: "#c8d8ff",
              },
            }}
          />
          <FormControlLabel
            value="automated"
            control={<Radio size="small" />}
            label="Automated"
            sx={{
              "& .MuiTypography-root": {
                fontSize: 13,
                color: "#c8d8ff",
              },
            }}
          />
          <FormControlLabel
            value="manual"
            control={<Radio size="small" />}
            label="Manual"
            sx={{
              "& .MuiTypography-root": {
                fontSize: 13,
                color: "#c8d8ff",
              },
            }}
          />
        </RadioGroup>
        <div className="bg-black-11 rounded-3 p-3 shadow-sm">
          {recommendedProductRadio === "companyIntelligence" && (
            <React.Fragment>
              <p className="text-blue-gradient fw-bold" style={{ width: 160 }}>
                Company Intelligence
              </p>
              <p className="text-grey-6 mt-2">
                Company Intelligence is a tool that uses a series of algorithms,
                data analysis and even artificial intelligence (AI) to make
                online recommendations for products, content and/or other
                elements. These recommendations can be customized for each user
                or not, depending on the purpose of each platform, the amount of
                data obtained and even the type of technology used
              </p>
            </React.Fragment>
          )}
          {recommendedProductRadio === "automated" && (
            <React.Fragment>
              <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <p className="text-lightBlue me-4">Should Match:</p>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={recommendedMatchRadio}
                    onChange={handleRecommendedMatchRadio}
                    className="features-radio"
                  >
                    <FormControlLabel
                      value="allCondition"
                      control={<Radio size="small" />}
                      label="All Condition"
                      sx={{
                        "& .MuiTypography-root": {
                          fontSize: 13,
                          color: "#c8d8ff",
                        },
                      }}
                    />
                    <FormControlLabel
                      value="anyCondition"
                      control={<Radio size="small" />}
                      label="Any Condition"
                      sx={{
                        "& .MuiTypography-root": {
                          fontSize: 13,
                          color: "#c8d8ff",
                        },
                      }}
                    />
                  </RadioGroup>
                </div>
                <button className="button-gradient py-1 px-4">
                  <p>Add Condition</p>
                </button>
              </div>
              <div className="bg-black-9 rounded-3 py-2 px-3 d-flex justify-content-between mt-3 shadow-lg">
                <p className="text-lightBlue c-pointer">Summary</p>
                <p className="text-lightBlue c-pointer">Action</p>
              </div>
            </React.Fragment>
          )}
          {recommendedProductRadio === "manual" && (
            <div {...getRootProps({ style })} className="">
              <input
                id="primary"
                {...getInputProps()}
                // onChange={(event) => {
                //   uploadFileToCloud(event, "primary");
                //   event.target.value = null;
                // }}
              />
              <img src={featureUpload} className="w-100" alt="" />
            </div>
          )}
        </div>
      </div>

      <div className="row features">
        <div className="col-4 ps-0">
          <div className="bg-black-2 border-grey-5 rounded-3 p-3 ">
            <div className="d-flex justify-content-between align-items-end">
              <h5 className="text-lightBlue fw-bold">Labels</h5>
              <img src={label} alt="label" className="" width={75} />
            </div>
            <p className="text-grey-6 my-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus
              pellentes
            </p>
            <button className="button-gradient py-1 px-3 mt-2">
              <p>Explore</p>
            </button>
          </div>
        </div>
        <div className="col-4">
          <div className="bg-black-2 border-grey-5 rounded-3 p-3 ">
            <div className="d-flex justify-content-between align-items-end">
              <h5 className="text-lightBlue fw-bold">Size Chart</h5>
              <img src={sizeChart} alt="label" className="" width={90} />
            </div>
            <p className="text-grey-6 my-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus
              pellentes
            </p>
            <button className="button-gradient py-1 px-3 mt-2">
              <p>Explore</p>
            </button>
          </div>
        </div>
        <div className="col-4 pe-0">
          <div className="bg-black-2 border-grey-5 rounded-3 p-3 ">
            <div className="d-flex justify-content-between align-items-end">
              <h5 className="text-lightBlue fw-bold">Pre Order</h5>
              <img src={preOrder} alt="label" className="" width={85} />
            </div>
            <p className="text-grey-6 my-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus
              pellentes
            </p>
            <button className="button-gradient py-1 px-3 mt-2">
              <p>Explore</p>
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MoreFeatures;
