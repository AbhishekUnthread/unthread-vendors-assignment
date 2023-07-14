import React from "react";
import tableLoader from "../../assets/gif/loader.gif";

const TableLoader = () => {

  return (
    <div>
        <div className="d-flex justify-content-center mt-5 mb-2">
            <img src={tableLoader} width={90} className="mt-5"/>
        </div>
        <h4 className="page-heading w-auto ps-0 text-center">Loading</h4>
        <h6 className="mt-3 mb-5 text-center" style={{color: "#414C65"}}>
            Gathering amazing data as the spaceships loads.
        </h6>
    </div>
  );
};

export default TableLoader;
