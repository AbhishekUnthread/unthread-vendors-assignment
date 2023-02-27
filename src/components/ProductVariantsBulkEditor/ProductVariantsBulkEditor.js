"use strict";

import React, { useCallback, useMemo, useRef, useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import GridTitleRenderer from "./GridTitleRenderer";
import "./ProductVariantsBulkEditor.scss";
import GridCostRenderer from "./GridCostRenderer";
import GridTaxRenderer from "./GridTaxRenderer";

function getData() {
  var rowData = [];
  rowData.push(
    {
      title: "12 - Gold - 18KT - Rose - IJSJ",
      price: "₹ 50,000",
      quantity: "5",
      jewelCode: "ABCD1234",
      stockist: "KAROL BAGH",
      stockistCode: "01002",
      metalWeight: "2.5",
      caratWeight: "0.08",
      makingCharges: "₹ 900",
      costPerItem: "Yes",
      chargeTaxes: "Yes",
    },
    {
      title: "IJSJ",
      price: "₹ 50,000",
      quantity: "5",
      jewelCode: "ABCD1234",
      stockist: "KAROL BAGH",
      stockistCode: "01002",
      metalWeight: "2.5",
      caratWeight: "0.08",
      makingCharges: "₹ 900",
      costPerItem: "Yes",
      chargeTaxes: "Yes",
    },
    {
      title: "Rose",
      price: "₹ 50,000",
      quantity: "5",
      jewelCode: "ABCD1234",
      stockist: "KAROL BAGH",
      stockistCode: "01002",
      metalWeight: "2.5",
      caratWeight: "0.08",
      makingCharges: "₹ 900",
      costPerItem: "Yes",
      chargeTaxes: "Yes",
    },
    {
      title: "12 - Gold - 18KT - Rose - IJSJ",
      price: "₹ 50,000",
      quantity: "5",
      jewelCode: "ABCD1234",
      stockist: "KAROL BAGH",
      stockistCode: "01002",
      metalWeight: "2.5",
      caratWeight: "0.08",
      makingCharges: "₹ 900",
      costPerItem: "Yes",
      chargeTaxes: "Yes",
    },
    {
      title: "12 - Gold - 18KT - Rose - IJSJ",
      price: "₹ 50,000",
      quantity: "5",
      jewelCode: "ABCD1234",
      stockist: "KAROL BAGH",
      stockistCode: "01002",
      metalWeight: "2.5",
      caratWeight: "0.08",
      makingCharges: "₹ 900",
      costPerItem: "Yes",
      chargeTaxes: "Yes",
    },
    {
      title: "12 - Gold - 18KT - Rose - IJSJ",
      price: "₹ 50,000",
      quantity: "5",
      jewelCode: "ABCD1234",
      stockist: "KAROL BAGH",
      stockistCode: "01002",
      metalWeight: "2.5",
      caratWeight: "0.08",
      makingCharges: "₹ 900",
      costPerItem: "Yes",
      chargeTaxes: "Yes",
    },
    {
      title: "12 - Gold - 18KT - Rose - IJSJ",
      price: "₹ 50,000",
      quantity: "5",
      jewelCode: "ABCD1234",
      stockist: "KAROL BAGH",
      stockistCode: "01002",
      metalWeight: "2.5",
      caratWeight: "0.08",
      makingCharges: "₹ 900",
      costPerItem: "Yes",
      chargeTaxes: "Yes",
    },
    {
      title: "12 - Gold - 18KT - Rose - IJSJ",
      price: "₹ 50,000",
      quantity: "5",
      jewelCode: "ABCD1234",
      stockist: "KAROL BAGH",
      stockistCode: "01002",
      metalWeight: "2.5",
      caratWeight: "0.08",
      makingCharges: "₹ 900",
      costPerItem: "Yes",
      chargeTaxes: "Yes",
    },
    {
      title: "12 - Gold - 18KT - Rose - IJSJ",
      price: "₹ 50,000",
      quantity: "5",
      jewelCode: "ABCD1234",
      stockist: "KAROL BAGH",
      stockistCode: "01002",
      metalWeight: "2.5",
      caratWeight: "0.08",
      makingCharges: "₹ 900",
      costPerItem: "Yes",
      chargeTaxes: "Yes",
    },
    {
      title: "12 - Gold - 18KT - Rose - IJSJ",
      price: "₹ 50,000",
      quantity: "5",
      jewelCode: "ABCD1234",
      stockist: "KAROL BAGH",
      stockistCode: "01002",
      metalWeight: "2.5",
      caratWeight: "0.08",
      makingCharges: "₹ 900",
      costPerItem: "Yes",
      chargeTaxes: "Yes",
    }
  );

  return rowData;
}

const ProductVariantsBulkEditor = () => {
  const containerStyle = useMemo(
    () => ({ width: "100%", height: "calc(100vh - 200px)" }),
    []
  );
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState(getData());
  const [columnDefs, setColumnDefs] = useState([
    {
      field: "title",
      headerName: "Title",
      pinned: "left",
      width: 280,
      lockPinned: true,
      cellRendererSelector: (params) => {
        const titleDetails = {
          component: GridTitleRenderer,
        };
        return titleDetails;
      },
      // rowDrag: true,
    },
    { field: "price", headerName: "Price (INR)", width: 120 },
    { field: "quantity", headerName: "Quantity", width: 120 },
    { field: "jewelCode", headerName: "Jewel Code", width: 150 },
    { field: "stockist", headerName: "Stockist", width: 140 },
    { field: "stockistCode", headerName: "Stockist Code", width: 170 },
    { field: "metalWeight", headerName: "Metal Weight (gm)", width: 200 },
    { field: "caratWeight", headerName: "Carat Weight", width: 160 },
    { field: "makingCharges", headerName: "Making Charges (Rs)", width: 200 },
    {
      field: "costPerItem",
      headerName: "Cost Per Item",
      width: 130,
      sortable: false,
      filter: false,
      cellRendererSelector: (params) => {
        const costDetails = {
          component: GridCostRenderer,
        };
        return costDetails;
      },
    },
    {
      field: "chargeTaxes",
      headerName: "Charge Taxes",
      width: 130,
      sortable: false,
      filter: false,
      cellRendererSelector: (params) => {
        const costDetails = {
          component: GridTaxRenderer,
        };
        return costDetails;
      },
    },
  ]);
  // const defaultColDef = useMemo(() => {
  //   return {
  //     editable: true,
  //   };
  // }, []);
  const defaultColDef = useMemo(() => {
    return {
      // flex: 1,
      width: 200,
      resizable: true,
      editable: true,
      sortable: true,
      filter: true,
    };
  }, []);

  const onCellValueChanged = useCallback((event) => {
    console.log("Data after change is", event.data);
  }, []);

  const onGridReady = useCallback((params) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine-dark">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onCellValueChanged={onCellValueChanged}
          animateRows={true}
          // onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};

export default ProductVariantsBulkEditor;
