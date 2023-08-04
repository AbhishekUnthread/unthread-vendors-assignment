import React from "react";
import { Link, useParams } from "react-router-dom";
// ! COMPONENT IMPORTS
import ProductInventoryDetailsTable from "./ProductInventoryDetailsTable";
import ViewLogsDrawer from "../../../components/ViewLogsDrawer/ViewLogsDrawer";
import TableSearch from "../../../components/TableSearch/TableSearch";
import ExportDialog from "../../../components/ExportDialog/ExportDialog";
import ImportSecondDialog from "../../../components/ImportSecondDialog/ImportSecondDialog";
import ViewTutorial from "../../../components/ViewTutorial/ViewTutorial";
// ! IMAGES IMPORTS
import products from "../../../assets/icons/sidenav/products.svg";
import storeIcon from "../../../assets/images/users/collection_defaultdp.svg";
import editWhite from "../../../assets/icons/editWhite.svg";
import arrowLeft from "../../../assets/icons/arrowLeft.svg";
// ! MATERIAL IMPORTS
import { Paper } from "@mui/material";
import { useGetAllStoresQuery } from "../../../features/products/inventory/inventoryApiSlice";
import { ImageAspectRatio } from "@mui/icons-material";

const ProductInventoryDetails = () => {
  const { storeId } = useParams();

  console.log(storeId);

  const {
    data: storeData,
    isLoading: storeIsLoading,
    // isSuccess: storeIsSuccess,
    error: storeError,
  } = useGetAllStoresQuery({ id: storeId });

  const Store = storeData?.data?.data?.[0];

  return (
    <div className="container-fluid page">
      <div className="row justify-content-between align-items-center">
        <h4 className="page-heading w-auto ps-0">Inventory</h4>
        <div className="d-flex align-items-center w-auto pe-0">
          <ViewTutorial />
          <ViewLogsDrawer
            headingName={"Product Inventory"}
            icon={products}
          />
          <button className="button-transparent py-2 px-3 me-1">
            <p className="text-lightBlue">Transfer Inventory</p>
          </button>
          <ExportDialog dialogName={"Product Inventory"} />
          <ImportSecondDialog dialogName={"Product Inventory"} />
          <Link
            to="/products/inventory/create"
            className="button-gradient py-2 px-4 ms-3">
            <p>Add Store</p>
          </Link>
        </div>
      </div>
      {!storeIsLoading && !storeError && !!Store && (
        <div className="row mt-2">
          <div className="col-12 d-flex justify-content-between align-items-center px-3">
            <div className="d-flex align-items-center py-3">
              <Link
                to="/products/inventory"
                className="d-flex">
                <img
                  src={arrowLeft}
                  alt="arrowLeft"
                  width={9}
                  className="c-pointer"
                />
              </Link>
              <img
                src={Store?.mediaUrl?.[0]?.image ?? storeIcon}
                alt="storeIcon"
                className="ms-3 me-2"
                height={45}
                width={45}
              />
              <div>
                <p className="text-lightBlue rounded-circle fw-600">{Store?.name}</p>
                <small className="text-grey-6 mt-1 d-block">
                  {Store?.address.line1} {Store?.address.line2} {Store?.address.state.name} {Store?.address.pincode} {Store?.address.country.name}
                </small>
                <Link
                  to={`/products/inventory/edit/${Store?._id}`}
                  className="d-flex">
                  <small className="text-blue-2 d-block text-decoration-underline">Edit Store</small>
                </Link>
              </div>
            </div>
            <div className="d-flex">
              <button
                className="button-transparent py-2 px-3 border-grey-5"
                // onClick={handleBulkEditor}
              >
                <img
                  src={editWhite}
                  alt="editContainedWhite"
                  className="me-1"
                  width={20}
                />
                <p className="text-lightBlue">Open Bulk Editor</p>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="row mt-4">
        <Paper
          sx={{ width: "100%", mb: 2, mt: 0, p: 0 }}
          className="border-grey-5 bg-black-15">
          <div className="d-flex align-items-center mt-3 mb-3 px-2 justify-content-between">
            <TableSearch />
          </div>
          {/* <TabPanel value={value} index={0}> */}
          <ProductInventoryDetailsTable />
          {/* </TabPanel> */}
        </Paper>
      </div>
    </div>
  );
};

export default ProductInventoryDetails;
