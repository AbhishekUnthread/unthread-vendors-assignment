import React, { useState } from "react";
import {
  FormControl,
  MenuItem,
  Select,
  InputAdornment,
  OutlinedInput,
  Checkbox,
  FormControlLabel,
  Chip,
  TextField,
  Autocomplete,
  Tooltip,
  RadioGroup,
  Radio,
  Popover,
  TextareaAutosize,
  Typography,
  TableContainer,
  TableRow,
  TableCell,
  Table,
  TableBody,
} from "@mui/material";
import info from "../../assets/icons/info.svg";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useGetAllProductTabsQuery } from "../../features/parameters/productTabs/productTabsApiSlice";
import { useGetAllVendorsQuery } from "../../features/parameters/vendors/vendorsApiSlice";
import AddFilters from "./AddFilters";
import DeleteIconButton from "../DeleteIconButton/DeleteIconButton";
import TableHeader from "../TableHeader/TableHeader";

const HEAD_CELLS = [
  {
    align: "left",
    disablePadding: false,
    label: "Field",
    width: "29%",
  },
  {
    align: "left",
    disablePadding: false,
    label: "Operator",
    width: "29%",
  },
  {
    align: "left",
    disablePadding: false,
    label: "Value",
    width: "39%",
  },
  {
    align: "right",
    disablePadding: false,
    label: "",
    width: "3%",
  },
];

function Filters({
  value,
  field,
  formik,
  touched,
  error,
  onAdd,
  data,
  onDeleteField,
}) {
  const filterValues = data.map((filter, index) => filter);

  return (
    <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes mt-4">
      <div className="d-flex col-12 px-0 justify-content-between">
        <div className="d-flex align-items-center">
          <h6 className="text-lightBlue me-auto text-lightBlue fw-500">
            Filters
          </h6>
          <Tooltip title="Lorem ipsum" placement="top">
            <img
              src={info}
              alt="info"
              className="ms-2 c-pointer"
              width={13.5}
            />
          </Tooltip>
        </div>
      </div>
      <hr className="hr-grey-6 mt-3 mb-0" />
      <div className="col-12 px-0">
        <TableContainer>
          <Table sx={{ minWidth: 750 }} size="medium">
            {/* <TableHeader headCells={HEAD_CELLS} /> */}
            <TableBody>
              {data?.map((data, index) => {
                return (
                  <TableRow className="table-rows">
                    <TableCell colSpan={3}>
                      <AddFilters
                        index ={index}
                        formik={formik}
                        value={formik?.values?.filters[index]}
                        field={`filters[${index}]`}
                        touched={
                          formik?.touched?.filters?.length &&
                          formik?.touched?.filters[index]
                        }
                        error={
                          formik?.errors?.filters?.length &&
                          formik?.errors?.filters[index]
                        }
                      />
                    </TableCell>
                    <TableCell style={{ width: 16, padding: 0 }}>
                      <div className="d-flex mt-4 ">
                        <DeleteIconButton
                          onClick={onDeleteField.bind(null, {
                            deleteIndex: index,
                          })}
                          title="Delete"
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <div className="row">
          <div className="col-12">
            <small
              className="text-blue-2 c-pointer fw-500"
              onClick={onAdd}
              type="button"
            >
              + Add More Filter
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filters;
