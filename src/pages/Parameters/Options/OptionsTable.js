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
import TableLoader from "../../../components/Loader/TableLoader";

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
    label: "Option Name",
    width: "20%",
  },
  {
    align: "left",
    disablePadding: false,
    label: "Appearance",
    width: "20%",
  },
  {
    align: "left",
    disablePadding: false,
    label: "Option Values",
    width: "40%",
  },
  {
    align: "right",
    disablePadding: false,
    label: "Action",
    width: "15%",
  },
];

const PAGINATION_ROWS = [10, 20, 30];

const FRONTEND_APPEARANCE = {
  dropDownList: "Drop-Down List",
  dropDownThumbnail: "Drop-Down List with Thumbnail",
  colorAndImageSwatches: "Color & Image Swatches",
  radioButtons: "Radio Buttons",
  rectangleButtons: "Rectangle Buttons",
  circleButtons: "Circle Buttons",
};

const OptionsTable = (props) => {
  const {
    error,
    isLoading,
    data,
    dataSecondary,
    totalCount,
    onPageChange,
    onPageSize,
    pageSize,
    page,
    onEdit,
    onDelete,
  } = props;

  const onRowsPerPageChange = (e) => {
    onPageSize(e.target.value);
  };

  if (error) {
    return <></>;
  }

  if (isLoading) {
    return <TableLoader />;
  }

  if (!data) {
    return <></>;
  }

  if (data && !data.length) {
    return <NoDataFound />;
  }

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 750 }} size="medium">
          <TableHeader headCells={HEAD_CELLS} />
          <TableBody>
            {data.map((item, index) => {
              return (
                <TableRow
                  hover
                  key={item._id}
                  tabIndex={-1}
                  className="table-rows"
                >
                  <TableCell />
                  <TableCell
                    onClick={onEdit.bind(null, item._id)}
                    sx={{ textTransform: "capitalize", cursor: "pointer" }}
                  >
                    <p className="text-lightBlue fw-600">{item.title}</p>
                  </TableCell>
                  <TableCell
                    sx={{ textTransform: "capitalize", cursor: "pointer" }}
                  >
                    <p className="text-lightBlue fw-600">
                      {FRONTEND_APPEARANCE[item.apperance]}
                    </p>
                  </TableCell>
                  <TableCell>
                    <div className="d-flex flex-wrap align-items-center gap-2">
                      {dataSecondary.map((secondaryItem) => {
                        if (secondaryItem.attribute === item._id) {
                          return (
                            <Chip
                              key={secondaryItem._id}
                              label={`${secondaryItem.title} (${secondaryItem.metaSubAttributes.length})`}
                              size="small"
                            />
                          );
                        }
                        return null;
                      })}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="d-flex align-items-center justify-content-end">
                      <EditButton onClick={onEdit.bind(null, item._id)} />
                      <DeleteIconButton
                        onClick={onDelete.bind(null, {
                          id: item._id,
                          message: `${item.title} option`,
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

export default OptionsTable;
