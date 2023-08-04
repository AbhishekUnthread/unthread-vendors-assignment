import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";

import info from "../../assets/icons/info.svg";
import AddDiscountRange from "./AddDiscountRange";
import DeleteIconButton from "../DeleteIconButton/DeleteIconButton";
import TableHeader from "../TableHeader/TableHeader";

function DiscountRange({
  value,
  field,
  formik,
  touched,
  error,
  onDeleteField,
  data,
  onAdd,
}) {

  return (
    <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes mt-4">
      <div className="d-flex col-12 px-0 justify-content-between">
        <div className="d-flex align-items-center">
          <h6 className="text-lightBlue me-auto text-lightBlue fw-500">
            Discount
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
      <TableContainer>
        <Table>
          <TableBody>
          <div className="row mt-3 mb-0">
              <div className="col-md-2 col-6 mt-1 ps-0 ">
                <div className="d-flex mb-1">
                  <p className="text-lightBlue">Min Qty.</p>
                  <Tooltip title="Lorem ipsum" placement="top">
                    <img
                      src={info}
                      alt={info}
                      className="ms-2 c-pointer"
                      width={13.5}
                    />
                  </Tooltip>
                </div>
              </div>
              <div className="col-md-2 col-6 mt-1 ps-0">
                <div className="d-flex mb-1">
                  <p className="text-lightBlue">Max Qty.</p>
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
              <div className="col-md-8 mt-1">
                    <div className="d-flex mb-1">
                      <p className="text-lightBlue">Discount</p>
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
            </div>
            {data.map((item, index) => {
              return (
                <TableRow className="table-rows">
                  <TableCell colSpan={3} style={{ paddingLeft: 0, paddingTop:0 }}>
                    <AddDiscountRange
                      formik={formik}
                      value={value}
                      field={field}
                    />
                  </TableCell>
                  {data.length > 1 &&(<TableCell style={{ width: 16,  paddingTop:0, paddingRight:0}}>
                    <div className="d-flex">
                      <DeleteIconButton
                        onClick={onDeleteField.bind(null, {
                          deleteIndex: index,
                        })}
                        title="Delete"
                      />
                    </div>
                  </TableCell>)}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="col-12 px-0 mt-2">
        <small
          className="text-blue-2 fw-500 c-pointer"
          onClick={onAdd}
          type="button"
        >
          + Add More Range
        </small>
      </div>
    </div>
  );
}

export default DiscountRange;
