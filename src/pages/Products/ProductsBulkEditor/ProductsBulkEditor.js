import React from "react";
// ! COMPONENT IMPORTS
import ViewLogsDrawer from "../../../components/ViewLogsDrawer/ViewLogsDrawer";
import ViewTutorial from "../../../components/ViewTutorial/ViewTutorial";
import ProductBulk from "../../../components/ProductBulk/ProductBulk";
// ! IMAGES IMPORTS
import products from "../../../assets/icons/sidenav/products.svg";

const ProductsBulkEditor = () => {
  return (
    <div className="container-fluid page">
      <div className="row justify-content-between align-items-center">
        <h4 className="page-heading w-auto ps-0">Bulk Editor</h4>
        <div className="d-flex align-items-center w-auto pe-0">
          <ViewTutorial />
          <ViewLogsDrawer headingName={"Bulk Editor"} icon={products} />
          <button className="button-gradient py-2 px-4 ms-3">
            <p>Columns</p>
          </button>
        </div>
      </div>
      <div className="row justify-content-between align-items-center">
        <small className="text-grey-6 col-md-10 mt-3 px-0">
          Save time and effort with this spreadsheet-like interface. Edit
          properties of multiple products and their variations at once. Add or
          delete the properties as you wish by enabling or disabling them in the
          Columns filter. For convenience, you can use your keyboard (Tab,
          Enter, arrow keys) to navigate and edit the table.
        </small>
      </div>

      <div className="row mt-4">
        <div className="col-12 px-0">
          <ProductBulk />
        </div>
      </div>
    </div>
  );
};

export default ProductsBulkEditor;
