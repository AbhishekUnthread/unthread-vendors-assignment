import React from "react";
import noData from "../../assets/icons/noData.svg";

const NoDataFound = () => {

  return (
    <div>
        <div className="d-flex justify-content-center mt-5 mb-4">
            <img src={noData} width={120} />
        </div>
        <h2 className="text-lightBlue mt-2 mb-4 text-center">
            No data available
        </h2>
        <h5 className="mt-2 mb-5 text-center" style={{color: "#414C65"}}>
            There is no available data to display
        </h5>
    </div>
  );
};

export default NoDataFound;
