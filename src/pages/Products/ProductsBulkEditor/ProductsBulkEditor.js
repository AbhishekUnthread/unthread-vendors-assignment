import React from "react";
import { Link } from "react-router-dom";
// ! COMPONENT IMPORTS
import ViewLogsDrawer from "../../../components/ViewLogsDrawer/ViewLogsDrawer";
import TableSearch from "../../../components/TableSearch/TableSearch";
import ExportDialog from "../../../components/ExportDialog/ExportDialog";
import ImportSecondDialog from "../../../components/ImportSecondDialog/ImportSecondDialog";
import ViewTutorial from "../../../components/ViewTutorial/ViewTutorial";
import TabPanel from "../../../components/TabPanel/TabPanel";
// ! MATERIAL IMPORTS
import { Box, Paper, Tab, Tabs } from "@mui/material";
import ProductBulk from "../../../components/ProductBulk/ProductBulk";

const ProductsBulkEditor = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="container-fluid page">
      <div className="row justify-content-between align-items-center">
        <h4 className="page-heading w-auto ps-0">Bulk Editor</h4>
        <div className="d-flex align-items-center w-auto pe-0">
          <ViewTutorial />
          <ViewLogsDrawer headingName={"Bulk Editor"} />
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
