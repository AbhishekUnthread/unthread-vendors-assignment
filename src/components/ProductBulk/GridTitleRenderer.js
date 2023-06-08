import React from "react";
import imageUpload from "../../assets/icons/imageUpload.svg";

const GridTitleRenderer = () => {
  return (
    <div className="d-flex">
      <img src={imageUpload} alt="imageUpload" width={40} className="me-2" />
      <small className="text-lightBlue">12 - Gold - 18KT - Rose - IJSJ</small>
    </div>
  );
};

export default GridTitleRenderer;
