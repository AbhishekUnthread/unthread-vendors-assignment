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
    width: "12%",
  },
  {
    align: "right",
    disablePadding: false,
    label: "",
    width: "8%",
  },
];

const AddCustomFieldTable = (props) => {
  const { formik, data, onSort, onDeleteField } = props;

  const sortEndHandler = ({ oldIndex, newIndex }) => {
    // onSort(arrayMove(structuredClone(data), oldIndex, newIndex));
  };

  const addFieldHandler = () => {
    const newCustomFields = formik?.values?.customFields.concat({
      title: "",
      fieldType: "",
      productValue: "",
      visibility: "",
    });
    formik.setFieldValue("customFields", newCustomFields);
  };

  return (
    <TableContainer>
      <Table sx={{ minWidth: 750 }} size="medium">
        {!data || !data.length ? (
          <></>
        ) : (
          <>
            <TableHeader headCells={HEAD_CELLS} />
            <TableBodySortable onSortEnd={sortEndHandler} useDragHandle>
              {data.map((data, index) => {
                return (
                  <SortableRow key={`${index}-${data.title}`} index={1}>
                    <TableRow hover tabIndex={-1} className="table-rows">
                      <DragHandle />

                      <TableCell colSpan={3}>
                        <AddCustomField
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
        onClick={addFieldHandler}
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
