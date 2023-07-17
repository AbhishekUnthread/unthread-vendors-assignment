import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
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
import EditButton from "../../../components/EditButton/EditButton";
import RemoveIconButton from "../../../components/RemoveIconButton/RemoveIconButton";
import DeleteIconButton from "../../../components/DeleteIconButton/DeleteIconButton";
import NoDataFound from "../../../components/NoDataFound/NoDataFound";
import Attribute from "../../../components/Options/Attribute/Attribute";

const DragHandle = SortableHandle(() => (
  <TableCell sx={{ padding: 0 }}>
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
    disablePadding: true,
    label: "",
    width: "1%",
  },
  {
    align: "left",
    disablePadding: false,
    label: "Values",
    width: "99%",
  },
];

const OptionsAttributeTable = (props) => {
  const { error, isLoading, data, onSort, onDelete } = props;

  //   const sortEndHandler = ({ oldIndex, newIndex }) => {
  //     onSort(arrayMove(structuredClone(data), oldIndex, newIndex));
  //   };

  //   if (error) {
  //     return <></>;
  //   }

  //   if (isLoading) {
  //     return (
  //       <span className="d-flex justify-content-center m-3">Loading...</span>
  //     );
  //   }

  //   if (!data) {
  //     return <></>;
  //   }

  //   if (data && !data.length) {
  //     return <NoDataFound />;
  //   }

  return (
    <TableContainer sx={{ padding: 0 }}>
      <Table sx={{ minWidth: 750 }} size="medium">
        <TableHeader headCells={HEAD_CELLS} />
        <TableBodySortable useDragHandle>
          <SortableRow>
            <TableRow hover tabIndex={-1} className="table-rows">
              <DragHandle />
              <TableCell
                sx={{ textTransform: "capitalize", cursor: "pointer" }}
              >
                <Attribute />
              </TableCell>
            </TableRow>
          </SortableRow>
        </TableBodySortable>
      </Table>
    </TableContainer>
  );
};

export default OptionsAttributeTable;
