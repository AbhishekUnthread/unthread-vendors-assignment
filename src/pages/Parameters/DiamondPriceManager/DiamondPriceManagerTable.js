import * as React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import {
  Checkbox,
  TablePagination,
  TableHead,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  FormControl,
  OutlinedInput,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import TableEditStatusButton from "../../../components/TableEditStatusButton/TableEditStatusButton";
import TableMassActionButton from "../../../components/TableMassActionButton/TableMassActionButton";
// !IMAGES IMPORTS
import ringSmall from "../../../assets/images/ringSmall.svg";
// ! COMPONENT IMPORTS
import {
  EnhancedTableHead,
  stableSort,
  getComparator,
} from "../../../components/TableDependencies/TableDependencies";
// ! MATERIAL ICONS IMPORTS
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InventoryIcon from "@mui/icons-material/Inventory";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

// ? TABLE STARTS HERE
function createData(
  dpmId,
  clarity,
  size,
  diamondShape,
  minWeight,
  maxWeight,
  price,
  priceType
) {
  return {
    dpmId,
    clarity,
    size,
    diamondShape,
    minWeight,
    maxWeight,
    price,
    priceType,
    detailData: [
      {
        min: "0",
        max: "5",
        price: "₹ 50,000",
        tags: "Tag 1",
      },
      {
        min: "0",
        max: "5",
        price: "₹ 70,000",
        tags: "Tag 2",
      },
    ],
  };
}

const rows = [
  createData(
    1,
    "IJ-SI",
    "5",
    "Round",
    "Min: 0.00g",
    "Max: 5.00g",
    "View",
    "Mixed"
  ),
  createData(
    2,
    "IJ-SI",
    "5",
    "Round",
    "Min: 0.00g",
    "Max: 5.00g",
    "View",
    "Mixed"
  ),
  createData(
    3,
    "IJ-SI",
    "5",
    "Round",
    "Min: 0.00g",
    "Max: 5.00g",
    "View",
    "Mixed"
  ),
  createData(
    4,
    "IJ-SI",
    "5",
    "Round",
    "Min: 0.00g",
    "Max: 5.00g",
    "View",
    "Mixed"
  ),
  createData(
    5,
    "IJ-SI",
    "5",
    "Round",
    "Min: 0.00g",
    "Max: 5.00g",
    "View",
    "Mixed"
  ),
  createData(
    6,
    "IJ-SI",
    "5",
    "Round",
    "Min: 0.00g",
    "Max: 5.00g",
    "View",
    "Mixed"
  ),
];

function Row(props) {
  const { row, isItemSelected, labelId, handleClick } = props;
  // console.log(props);
  // console.log("ROW", row);
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
        hover
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={row.dpmId}
        selected={isItemSelected}
        className="table-rows"
      >
        <TableCell padding="checkbox">
          <Checkbox
            checked={isItemSelected}
            inputProps={{
              "aria-labelledby": labelId,
            }}
            onClick={(event) => handleClick(event, row.dpmId)}
            size="small"
            style={{
              color: "#5C6D8E",
            }}
          />
        </TableCell>
        <TableCell width={50} padding="none">
          <div className="d-flex align-items-center justify-content-center">
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? (
                <ArrowDropDownIcon
                  sx={{
                    color: "#5c6d8e",
                    fontSize: 24,
                    cursor: "pointer",
                  }}
                />
              ) : (
                <ArrowRightIcon
                  sx={{
                    color: "#c8d8ff",
                    fontSize: 24,
                    cursor: "pointer",
                  }}
                />
              )}
            </IconButton>
          </div>
        </TableCell>

        <TableCell component="th" id={labelId} scope="row">
          {/* <div className="d-flex align-items-center py-2"> */}
          <p className="text-lightBlue rounded-circle fw-600">{row.clarity}</p>
          {/* </div> */}
        </TableCell>
        <TableCell>
          <p className="text-lightBlue">{row.size}</p>
        </TableCell>
        <TableCell>
          <p className="text-lightBlue">{row.diamondShape}</p>
        </TableCell>
        <TableCell>
          <p className="text-lightBlue">{row.minWeight}</p>
        </TableCell>
        <TableCell>
          <p className="text-lightBlue">{row.maxWeight}</p>
        </TableCell>
        <TableCell>
          <p className="text-blue-2">View</p>
        </TableCell>
        <TableCell>
          <p className="text-lightBlue">{row.priceType}</p>
        </TableCell>
        <TableCell style={{ width: 140, padding: 0 }}>
          <div className="d-flex align-items-center">
            <Tooltip title="Edit" placement="top">
              <div className="table-edit-icon rounded-4 p-2">
                <EditOutlinedIcon
                  sx={{
                    color: "#5c6d8e",
                    fontSize: 18,
                    cursor: "pointer",
                  }}
                />
              </div>
            </Tooltip>
            <Tooltip title="Copy" placement="top">
              <div className="table-edit-icon rounded-4 p-2">
                <ContentCopyIcon
                  sx={{
                    color: "#5c6d8e",
                    fontSize: 18,
                    cursor: "pointer",
                  }}
                />
              </div>
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
      <TableRow className="table-rows">
        <TableCell style={{ padding: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <div className="px-5 py-3">
              <h5 className="text-lightBlue my-3 fw-500">IJSI 5 Round</h5>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <p className="text-lightBlue">Min</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-lightBlue">Max</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-lightBlue">Price</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-lightBlue">Tags</p>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.detailData.map((detailDataRow, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        <p className="text-lightBlue">{detailDataRow.min}</p>
                      </TableCell>
                      <TableCell>
                        <p className="text-lightBlue">{detailDataRow.max}</p>
                      </TableCell>
                      <TableCell>
                        <p className="text-lightBlue">{detailDataRow.price}</p>
                      </TableCell>
                      <TableCell>
                        <p className="text-ligthBlue">
                          <p className="text-lightBlue">{detailDataRow.tags}</p>
                        </p>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       })
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };

export default function DiamondPriceManagerTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("groupName");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const headCells = [
    {
      id: "details",
      numeric: false,
      disablePadding: true,
      label: "",
    },
    {
      id: "clarity",
      numeric: false,
      disablePadding: false,
      label: "Clarity",
    },
    {
      id: "size",
      numeric: false,
      disablePadding: false,
      label: "Size",
    },
    {
      id: "diamondShape",
      numeric: false,
      disablePadding: false,
      label: "Diamond Shape",
    },
    {
      id: "minWeight",
      numeric: false,
      disablePadding: false,
      label: "Min. Wt.",
    },
    {
      id: "maxWeight",
      numeric: false,
      disablePadding: false,
      label: "Max. Wt.",
    },
    {
      id: "price",
      numeric: false,
      disablePadding: false,
      label: "Price",
    },
    {
      id: "priceType",
      numeric: false,
      disablePadding: false,
      label: "Price Type",
    },
    {
      id: "actions",
      numeric: false,
      disablePadding: true,
      label: "Actions",
    },
  ];

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
      const newSelected = rows.map((n) => n.dpmId);
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
              {selected.length} collections are selected&nbsp;
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
        <Table aria-label="collapsible table">
          {/* <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead> */}
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
            {/* {rows.map((row) => (
              <Row key={row.name} row={row} />
            ))} */}

            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.dpmId);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <Row
                    key={index}
                    row={row}
                    isItemSelected={isItemSelected}
                    labelId={labelId}
                    handleClick={handleClick}
                  />
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
}
