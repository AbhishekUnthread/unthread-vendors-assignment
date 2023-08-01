import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Chip,
  Collapse,
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

import arrowDown from "../../../assets/icons/arrowDown.svg";

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
    width: "0.25%",
  },
  {
    align: "left",
    disablePadding: true,
    label: "",
    width: "0.25%",
  },
  {
    align: "left",
    disablePadding: false,
    label: "Values",
    width: "99.5%",
  },
];

const OptionsAttributeTable = (props) => {
  const {
    isEditing,
    formik,
    onAttributeAdd,
    onAttributeDelete,
    onSubOptionAdd,
    onSubOptionDelete,
    onSubAttributeAdd,
    onSubAttributeDelete,
  } = props;
  const [collapseStatus, setCollapseStatus] = useState({});

  const toggleSubOption = (id) => {
    setCollapseStatus((prevState) => {
      return {
        ...prevState,
        [id]: !prevState[id],
      };
    });
  };

  useEffect(() => {
    const attrObj = {};
    if (formik.values?.attributes?.length) {
      for (const attr of formik.values?.attributes) {
        attrObj[attr._id] = !isEditing;
      }
    }
    setCollapseStatus(attrObj);
  }, [formik.values?.attributes, isEditing]);

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
                  <TableCell sx={{ padding: "16px 0", verticalAlign: "top" }}>
                    <button
                      onClick={toggleSubOption.bind(null, attribute._id)}
                      type="button"
                      style={{
                        cursor: "pointer",
                        marginTop: "5px",
                        display: "grid",
                        placeContent: "center",
                        padding: "7px",
                      }}
                      className="reset"
                    >
                      <img
                        src={arrowDown}
                        alt="sort"
                        style={{
                          transform: collapseStatus[attribute._id]
                            ? "rotate(-180deg)"
                            : "rotate(0deg)",
                          transition: "all .2s",
                        }}
                      />
                    </button>
                  </TableCell>
                  <TableCell
                    sx={{ textTransform: "capitalize", cursor: "pointer" }}
                  >
                    <Attribute
                      formik={formik}
                      index={index}
                      onAttributeDelete={onAttributeDelete}
                      onSubOptionAdd={onSubOptionAdd}
                    />
                    <Collapse
                      in={collapseStatus[attribute._id]}
                      timeout="auto"
                      unmountOnExit
                    >
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
                    </Collapse>
                  </TableCell>
                </TableRow>
              </SortableRow>
            );
          })}

          <TableRow tabIndex={-1} className="table-rows">
            <TableCell sx={{ padding: "0 16px" }}></TableCell>
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
