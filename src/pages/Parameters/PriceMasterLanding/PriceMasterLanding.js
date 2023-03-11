import React from "react";
import { Link } from "react-router-dom";
import ViewTutorial from "../../../components/ViewTutorial/ViewTutorial";

const PriceMasterLanding = () => {
  return (
    <div className="container page-center">
      <h1 className="fw-600 text-lightBlue mt-5 pt-5">Price Master</h1>
      <p className="text-grey-6 my-4 w-50 d-none d-md-block">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil
        doloremque sapiente necessitatibus odio modi commodi maiores pariatur ad
        ratione voluptatem harum impedit corporis, alias nobis natus accusantium
        ipsam, quam laudantium!
      </p>
      <p className="text-grey-6 my-4 w-100 d-md-none d-block">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil
        doloremque sapiente necessitatibus odio modi commodi maiores pariatur ad
        ratione voluptatem harum impedit corporis, alias nobis natus accusantium
        ipsam, quam laudantium!
      </p>
      <Link
        className="button-gradient py-2 px-4 mt-5 mb-4"
        to="/parameters/priceMaster/create"
      >
        <p>Create Price Master</p>
      </Link>
      <ViewTutorial />
    </div>
  );
};

export default PriceMasterLanding;
