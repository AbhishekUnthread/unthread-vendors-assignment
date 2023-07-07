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

import TableHeader from "../../../components/TableHeader/TableHeader";
import TableEditStatusButton from "../../../components/TableEditStatusButton/TableEditStatusButton";
import TableMassActionButton from "../../../components/TableMassActionButton/TableMassActionButton";
import EditButton from "../../../components/EditButton/EditButton";
import ArchiveButton from "../../../components/ArchiveButton/ArchiveButton";

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
    label: "Field Set Name",
    width: "30%",
  },
  {
    align: "left",
    disablePadding: false,
    label: "No. Of Fields",
    width: "50%",
  },
  {
    align: "right",
    disablePadding: false,
    label: "Action",
    width: "15%",
  },
];

const PAGINATION_ROWS = [1, 2, 3];

const ProductTabsTable = (props) => {
  const {
    error,
    isLoading,
    data,
    totalCount,
    onPageChange,
    onPageSize,
    pageSize,
    page,
    onSort,
    onEdit,
  } = props;

  const onRowsPerPageChange = (e) => {
    onPageSize(e.target.value);
  };

  const sortEndHandler = ({ oldIndex, newIndex }) => {
    onSort(arrayMove(structuredClone(data), oldIndex, newIndex));
  };

  if (error) {
    return <></>;
  }

  if (isLoading) {
    return (
      <span className="d-flex justify-content-center m-3">Loading...</span>
    );
  }

  if (!data || (data && !data.length)) {
    return (
      <span className="d-flex justify-content-center m-3">No data found</span>
    );
  }

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 750 }} size="medium">
          <TableHeader headCells={HEAD_CELLS} />
          <TableBodySortable onSortEnd={sortEndHandler} useDragHandle>
            {data.map((item, index) => {
              return (
                <SortableRow index={index} key={item._id}>
                  <TableRow hover tabIndex={-1} className="table-rows">
                    <DragHandle />
                    <TableCell sx={{ textTransform: "capitalize" }}>
                      <p className="text-lightBlue fw-600">{item.title}</p>
                    </TableCell>
                    <TableCell>
                      <div className="d-flex flex-wrap align-items-center gap-2">
                        {item.customFields.length &&
                          item.customFields.map((field) => {
                            return (
                              <Chip
                                key={field._id}
                                label={field.title}
                                size="small"
                              />
                            );
                          })}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="d-flex align-items-center justify-content-end">
                        <EditButton onClick={onEdit} />
                        <ArchiveButton />
                      </div>
                    </TableCell>
                  </TableRow>
                </SortableRow>
              );
            })}
          </TableBodySortable>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={PAGINATION_ROWS}
        component="div"
        count={totalCount || 0}
        rowsPerPage={pageSize}
        page={page - 1}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        className="table-pagination"
      />
    </>
  );
};

export default ProductTabsTable;
