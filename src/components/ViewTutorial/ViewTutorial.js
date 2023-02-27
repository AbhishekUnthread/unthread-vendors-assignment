import React from "react";
// ! IMAGES IMPORTS
import tutorial from "../../assets/icons/tutorial.svg";

const ViewTutorial = () => {
  return (
    <button className="button-transparent me-1 py-2 px-3">
      <img src={tutorial} alt="tutorial" className="me-2" width={20} />
      <p className="text-blue-gradient">Tutorial</p>
    </button>
  );
};

export default ViewTutorial;
