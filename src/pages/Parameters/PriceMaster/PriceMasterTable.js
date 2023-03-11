import React from "react";
import { Link } from "react-router-dom";
// ! COMPONENT IMPORTS
import {
  EnhancedTableHead,
  stableSort,
  getComparator,
} from "../../../components/TableDependencies/TableDependencies";
import TableEditStatusButton from "../../../components/TableEditStatusButton/TableEditStatusButton";
import TableMassActionButton from "../../../components/TableMassActionButton/TableMassActionButton";
// ! IMAGES IMPORTS
import teamMember1 from "../../../assets/images/products/teamMember1.svg";
import masterGold from "../../../assets/icons/masterGold.svg";
import masterMaking from "../../../assets/icons/masterMaking.svg";
import masterDiamond from "../../../assets/icons/masterDiamond.svg";
// ! MATERIAL IMPORTS
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Tooltip,
} from "@mui/material";
// ! MATERIAL ICONS IMPORTS
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InventoryIcon from "@mui/icons-material/Inventory";

// ? TABLE STARTS HERE
function createData(pmId, metalGroupName, modifiedBy) {
  return { pmId, metalGroupName, modifiedBy };
}

const rows = [
  createData(1, "Metal Price Manager", "23/09/21 at 09:23am"),
  createData(2, "Stone Price Manager", "23/09/21 at 09:23am"),
  createData(3, "Making Charges Manager", "23/09/21 at 09:23am"),
];

const headCells = [
  {
    id: "metalGroupName",
    numeric: false,
    disablePadding: true,
    label: "Metal Group Name",
  },
  {
    id: "modifiedBy",
    numeric: false,
    disablePadding: false,
    label: "Modified By",
  },
  {
    id: "actions",
    numeric: false,
    disablePadding: true,
    label: "Actions",
  },
];

// ? TABLE ENDS HERE

const PriceMasterTable = () => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("groupName");
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
      const newSelected = rows.map((n) => n.pmId);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <React.Fragment>
      {selected.length > 0 && (
        <div className="d-flex align-items-center px-2 mb-3">
          <button className="button-grey py-2 px-3">
            <small className="text-lightBlue">
              {selected.length} vendors are selected&nbsp;
              <span
                className="text-blue-2 c-pointer"
                onClick={() => setSelected([])}
              >
                (Clear Selection)
              </span>
            </small>
          </button>
          <TableEditStatusButton />
          <TableMassActionButton />
        </div>
      )}
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size="medium"
        >
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
            headCells={headCells}
          />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.pmId);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.pmId}
                    selected={isItemSelected}
                    className="table-rows"
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                        onClick={(event) => handleClick(event, row.pmId)}
                        size="small"
                        style={{
                          color: "#5C6D8E",
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.metalGroupName === "Metal Price Manager" && (
                        <div className=" py-3 d-flex align-items-center">
                          <img
                            src={masterGold}
                            alt="masterGold"
                            className="rounde-8 me-2"
                          />
                          <Link
                            to="/parameters/priceMaster/metalMaster"
                            className="text-decoration-none"
                          >
                            <p className="text-lightBlue rounded-circle fw-600">
                              {row.metalGroupName}
                            </p>
                          </Link>
                        </div>
                      )}
                      {row.metalGroupName === "Stone Price Manager" && (
                        <div className="py-3 d-flex align-items-center">
                          <img
                            src={masterDiamond}
                            alt="masterDiamond"
                            className="rounde-8 me-2"
                          />
                          <Link
                            to="/parameters/priceMaster/diamondMaster"
                            className="text-decoration-none"
                          >
                            <p className="text-lightBlue rounded-circle fw-600">
                              {row.metalGroupName}
                            </p>
                          </Link>
                        </div>
                      )}
                      {row.metalGroupName === "Making Charges Manager" && (
                        <div className="py-3 d-flex align-items-center">
                          <img
                            src={masterMaking}
                            alt="masterMaking"
                            className="rounde-8 me-2"
                          />
                          <Link
                            to="/parameters/priceMaster/makingMaster"
                            className="text-decoration-none"
                          >
                            <p className="text-lightBlue rounded-circle fw-600">
                              {row.metalGroupName}
                            </p>
                          </Link>
                        </div>
                      )}
                    </TableCell>
                    <TableCell style={{ width: 280 }}>
                      <div className="d-flex align-items-center">
                        <p className="text-lightBlue me-2">{row.modifiedBy}</p>
                        <img src={teamMember1} alt="teamMember1" />
                      </div>
                    </TableCell>
                    <TableCell style={{ width: 120, padding: 0 }}>
                      <div className="d-flex align-items-center">
                        <Tooltip title="Edit" placement="top">
                          <Link
                            to="/parameters/vendors/edit"
                            className="table-edit-icon rounded-4 p-2"
                          >
                            <EditOutlinedIcon
                              sx={{
                                color: "#5c6d8e",
                                fontSize: 18,
                                cursor: "pointer",
                              }}
                            />
                          </Link>
                        </Tooltip>
                        <Tooltip title="Archive" placement="top">
                          <div className="table-edit-icon rounded-4 p-2">
                            <InventoryIcon
                              sx={{
                                color: "#5c6d8e",
                                fontSize: 18,
                                cursor: "pointer",
                              }}
                            />
                          </div>
                        </Tooltip>
                      </div>
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

export default PriceMasterTable;
