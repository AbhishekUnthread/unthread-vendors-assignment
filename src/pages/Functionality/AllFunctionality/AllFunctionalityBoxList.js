import React from "react";
// ! COMPONENT IMPORTS
import ViewTutorial from "../../../components/ViewTutorial/ViewTutorial";

const AllFunctionalityBoxList = ({ headingName, imageName, buttonName }) => {
  return (
    // <div className="bg-black-15 hover-back-two rounded-8 d-flex p-3 justify-content-between align-items-center w-100">
    <div className="hover-back-two border-transparent rounded-8 d-flex p-3 justify-content-between align-items-center w-100">
      <div className="d-flex align-items-center">
        <img
          src={imageName}
          alt="functionalitySize"
          className="me-3"
          width={75}
        />
        <div className="d-flex flex-column">
          <h5 className="text-blue-gradient fw-500 text-start">
            {headingName}
          </h5>
          <small className="text-grey-6 mt-2 text-start">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus,
            labore neque cupiditate aut quia reiciendis
          </small>
        </div>
      </div>
      <div className="d-flex">
        <ViewTutorial />
        <button className="button-lightBlue-outline py-2 px-4 ms-2">
          <p>{buttonName}</p>
        </button>
      </div>
    </div>
  );
};

export default AllFunctionalityBoxList;
