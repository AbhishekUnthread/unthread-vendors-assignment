import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Chip,
} from "@mui/material";

import TableHeader from "../../../components/TableHeader/TableHeader";
import EditButton from "../../../components/EditButton/EditButton";
import DeleteIconButton from "../../../components/DeleteIconButton/DeleteIconButton";
import NoDataFound from "../../../components/NoDataFound/NoDataFound";
import TableLoader from "../../../components/Loader/TableLoader";
import ArchivedIconButton from "../../../components/ArchivedIconButton/ArchivedIconButton";
import UnArchivedIconButton from "../../../components/UnArchivedIconButton/UnArchivedIconButton";

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
    label: "Master Name",
    width: "60%",
  },
  {
    align: "left",
    disablePadding: false,
    label: "Modified By",
    width: "20%",
  },
  {
    align: "right",
    disablePadding: false,
    label: "Action",
    width: "15%",
  },
];

const PAGINATION_ROWS = [10, 20, 30];

const PriceMasterActiveTable = (props) => {
  const {
    error,
    isLoading,
    data,
    totalCount,
    onPageChange,
    onPageSize,
    pageSize,
    page,
    onEdit,
    onDelete,
    onArchived,
    onUnArchived,
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
                    onClick={onEdit.bind(null, item.srNo)}
                    sx={{ textTransform: "capitalize", cursor: "pointer" }}
                  >
                    <p className="text-lightBlue fw-600">{item.name}</p>
                  </TableCell>
                  <TableCell
                    sx={{ textTransform: "capitalize", cursor: "pointer" }}
                  >
                    <p className="text-lightBlue fw-600"></p>
                  </TableCell>
                  <TableCell>
                    <div className="d-flex align-items-center justify-content-end">
                      <EditButton onClick={onEdit.bind(null, item.srNo)} />
                      <ArchivedIconButton
                        onClick={onArchived.bind(null, {
                          id: item._id,
                          message: `${item.name} master`,
                        })}
                        title="Archived"
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
const PriceMasterArchivedTable = (props) => {
  const {
    error,
    isLoading,
    data,
    totalCount,
    onPageChange,
    onPageSize,
    pageSize,
    page,
    onEdit,
    onDelete,
    onArchived,
    onUnArchived,
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
                    onClick={onEdit.bind(null, item.srNo)}
                    sx={{ textTransform: "capitalize", cursor: "pointer" }}
                  >
                    <p className="text-lightBlue fw-600">{item.name}</p>
                  </TableCell>
                  <TableCell
                    sx={{ textTransform: "capitalize", cursor: "pointer" }}
                  >
                    <p className="text-lightBlue fw-600"></p>
                  </TableCell>
                  <TableCell>
                    <div className="d-flex align-items-center justify-content-end">
                      <EditButton onClick={onEdit.bind(null, item.srNo)} />
                      <UnArchivedIconButton
                        onClick={onUnArchived.bind(null, {
                          id: item._id,
                          message: `${item.name} master`,
                        })}
                        title="Un-Archived"
                      />
                      <DeleteIconButton
                        onClick={onDelete.bind(null, {
                          id: item._id,
                          message: `${item.name} master`,
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

export { PriceMasterActiveTable, PriceMasterArchivedTable };
