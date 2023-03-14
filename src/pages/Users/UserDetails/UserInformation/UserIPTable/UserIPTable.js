import React from "react";
// ! COMPONENT IMPORTS
import {
  EnhancedTableHeadNoCheckbox,
  stableSortNoCheckbox,
  getComparatorNoCheckbox,
} from "../../../../../components/TableDependenciesNoCheckbox/TableDependenciesNoCheckbox";
// ! MATERIAL IMPORTS
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Tooltip,
} from "@mui/material";
// ! MATERIAL ICON IMPORTS
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

// ? TABLE STARTS HERE
function createData(aId, date, ip, isp, location, action) {
  return { aId, date, ip, isp, location, action };
}

const rows = [
  createData(1, "01/09/22", "49.36.124.999", "Jio", "Mumbai, 11, India"),
  createData(2, "01/09/22", "49.36.124.999", "Jio", "Mumbai, 11, India"),
  createData(3, "01/09/22", "49.36.124.999", "Jio", "Mumbai, 11, India"),
];

const headCells = [
  {
    id: "date",
    numeric: false,
    disablePadding: false,
    label: "Date",
  },
  {
    id: "ip",
    numeric: false,
    disablePadding: false,
    label: "IP",
  },
  {
    id: "isp",
    numeric: false,
    disablePadding: false,
    label: "ISP",
  },
  {
    id: "location",
    numeric: false,
    disablePadding: false,
    label: "Location",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "",
  },
];

const UserIPTable = () => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("productName");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.aId);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <React.Fragment>
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size="medium"
        >
          <EnhancedTableHeadNoCheckbox
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
            headCells={headCells}
          />
          <TableBody>
            {stableSortNoCheckbox(rows, getComparatorNoCheckbox(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.aId);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.aId}
                    selected={isItemSelected}
                    className="table-rows"
                  >
                    <TableCell component="th" id={labelId} scope="row">
                      <div className="d-flex align-items-center">
                        <p className="text-lightBlue">{row.date}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-lightBlue">{row.ip}</p>
                    </TableCell>
                    <TableCell>
                      <div className="d-flex align-items-center">
                        <p className="text-lightBlue">{row.isp}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="d-flex align-items-center">
                        <p className="text-lightBlue">{row.location}</p>
                      </div>
                    </TableCell>
                    <TableCell style={{ width: 40 }}>
                      <Tooltip title="Windows 11, Chrome OS" placement="top">
                        <InfoOutlinedIcon
                          sx={{
                            color: "#c8d8ff",
                            fontSize: 18,
                            cursor: "pointer",
                          }}
                        />
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 53 * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        className="table-pagination"
      />
    </React.Fragment>
  );
};

export default UserIPTable;
