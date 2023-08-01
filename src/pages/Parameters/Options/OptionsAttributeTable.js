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
import SubOption from "../../../components/Options/SubOption";
import SubOptionCollapse from "../../../components/Options/SubOptionCollapse";

const DragHandle = SortableHandle(() => (
  <TableCell sx={{ padding: "16px 0", verticalAlign: "top" }}>
    <DragIndicatorIcon
      sx={{
        color: "#5c6d8e",
        fontSize: 26,
        cursor: "pointer",
        marginTop: "5px",
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
  const {
    formik,
    onAttributeAdd,
    onAttributeDelete,
    onSubOptionAdd,
    onSubOptionDelete,
    onSubAttributeAdd,
    onSubAttributeDelete,
  } = props;

  return (
    <TableContainer sx={{ padding: 0 }}>
      <Table sx={{ minWidth: 750 }} size="medium">
        <TableHeader sx={{ background: "#22213f" }} headCells={HEAD_CELLS} />
        <TableBodySortable useDragHandle>
          {formik.values?.attributes.map((attribute, index) => {
            return (
              <SortableRow key={index} index={index}>
                <TableRow tabIndex={-1} className="table-rows">
                  <DragHandle />
                  <TableCell
                    sx={{ textTransform: "capitalize", cursor: "pointer" }}
                  >
                    <Attribute
                      formik={formik}
                      index={index}
                      onAttributeDelete={onAttributeDelete}
                      onSubOptionAdd={onSubOptionAdd}
                    />
                    {formik.values.subOptions.map((subOption, index) => {
                      if (subOption.metaAttribute === attribute._id) {
                        return (
                          <SubOption
                            key={subOption._id}
                            id={subOption._id}
                            attributeId={attribute._id}
                            formik={formik}
                            index={index}
                            onSubOptionDelete={onSubOptionDelete}
                            onSubAttributeAdd={onSubAttributeAdd}
                            onSubAttributeDelete={onSubAttributeDelete}
                          />
                        );
                      }
                      return null;
                    })}
                  </TableCell>
                </TableRow>
              </SortableRow>
            );
          })}

          <TableRow tabIndex={-1} className="table-rows">
            <TableCell sx={{ padding: "0 16px" }}></TableCell>
            <TableCell sx={{ padding: "0 16px" }}>
              <button
                onClick={onAttributeAdd}
                type="button"
                className="reset link"
              >
                <p>+ Add Input Field</p>
              </button>
            </TableCell>
          </TableRow>
        </TableBodySortable>
      </Table>
    </TableContainer>
  );
};

export default OptionsAttributeTable;
