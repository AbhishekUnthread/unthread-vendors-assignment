import React from "react";
import noData from "../../assets/images/Components/NoData.png";

const NoDataFound = () => {
  return (
    <div>
      <div className="d-flex justify-content-center mt-5 mb-4">
        <img src={noData} width={120} />
      </div>
      <h4 className="page-heading w-auto ps-0 text-center">
        No data available
      </h4>
      <h6 className="mt-2 mb-5 text-center" style={{ color: "#414C65" }}>
        There is no available data to display
      </h6>
    </div>
  );
};

export default NoDataFound;
