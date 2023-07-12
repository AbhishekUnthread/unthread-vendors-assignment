import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Tooltip,
  Chip,
  OutlinedInput,
} from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import {
  SortableContainer,
  SortableHandle,
  SortableElement,
  arrayMove,
} from "react-sortable-hoc";

import TableHeader from "../TableHeader/TableHeader";
import TableEditStatusButton from "../TableEditStatusButton/TableEditStatusButton";
import TableMassActionButton from "../TableMassActionButton/TableMassActionButton";
import EditButton from "../EditButton/EditButton";
import RemoveIconButton from "../RemoveIconButton/RemoveIconButton";
import AddCustomField from "./AddCustomField";

const DragHandle = SortableHandle(() => (
  <TableCell>
    <DragIndicatorIcon
      sx={{
        color: "#5c6d8e",
        fontSize: 26,
        cursor: "pointer",
      }}
    />
  </TableCell>
));

const TableBodySortable = SortableContainer(({ children }) => (
  <TableBody>{children}</TableBody>
));

TableBodySortable.muiName = "TableBody";

const SortableRow = SortableElement(({ children }) => children);

const HEAD_CELLS = [
  {
    align: "left",
    disablePadding: false,
    label: "",
    width: "5%",
  },
  {
    align: "left",
    disablePadding: false,
    label: "Custom Title",
    width: "50%",
  },
  {
    align: "left",
    disablePadding: false,
    label: "Input Field Type",
    width: "25%",
  },
  {
    align: "left",
    disablePadding: false,
    label: "Show / Hide",
    width: "16%",
  },
  {
    align: "right",
    disablePadding: false,
    label: "",
    width: "5%",
  },
];

const AddCustomFieldTable = (props) => {
  const {
    formik,
    data,
    onAdd,
    onSort = () => {},
    onDeleteField,
    saveTried,
  } = props;

  return (
    <TableContainer>
      <Table sx={{ minWidth: 750 }} size="medium">
        {!data || !data.length ? (
          <></>
        ) : (
          <>
            <TableHeader headCells={HEAD_CELLS} />
            <TableBodySortable onSortEnd={onSort} useDragHandle>
              {data.map((data, index) => {
                return (
                  <SortableRow key={index} index={1}>
                    <TableRow hover tabIndex={-1} className="table-rows">
                      <DragHandle />

                      <TableCell colSpan={3}>
                        <AddCustomField
                          saveTried={saveTried}
                          values={formik?.values?.customFields[index]}
                          field={`customFields[${index}]`}
                          formik={formik}
                          touched={
                            formik?.touched?.customFields?.length &&
                            formik?.touched?.customFields[index]
                          }
                          error={
                            formik?.errors?.customFields?.length &&
                            formik?.errors?.customFields[index]
                          }
                          hideDefaultHighlight={true}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="d-flex align-items-center justify-content-end">
                          <RemoveIconButton
                            onClick={onDeleteField.bind(null, {
                              deleteIndex: index,
                              message: data.title,
                            })}
                            title="Delete"
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  </SortableRow>
                );
              })}
            </TableBodySortable>
          </>
        )}
      </Table>
      <button
        onClick={onAdd}
        type="button"
        className="button-gradient py-2 px-4 mt-2 c-pointer"
        style={{ marginLeft: "24px" }}
      >
        <p>+ Add Fields</p>
      </button>
    </TableContainer>
  );
};

export default AddCustomFieldTable;
