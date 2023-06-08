import React from "react";
// ! COMPONENT IMPORTS
import ViewTutorial from "../../../components/ViewTutorial/ViewTutorial";

const AllFunctionalityBox = ({ headingName, imageName, buttonName }) => {
  return (
    <div className="bg-black-15 border-grey-5 hover-back-two rounded-8 d-flex flex-column p-3 justify-content-start align-items-baseline">
      <div className="text-end w-100">
        <img src={imageName} alt="functionalitySize" className="" width={75} />
      </div>
      <h5 className="text-blue-gradient fw-600">{headingName}</h5>
      <small className="text-grey-6 mt-3 text-start">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus,
        labore neque cupiditate aut quia reiciendis
      </small>
      <div className="d-flex mt-4">
        <button className="button-transparent border-grey-5 py-2 px-4 me-2">
          <p className="text-lightBlue">{buttonName}</p>
        </button>
        <ViewTutorial />
      </div>
    </div>
  );
};

export default AllFunctionalityBox;
