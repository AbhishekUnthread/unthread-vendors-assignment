import React, { useEffect, useState } from "react";
import "../AddProducts/AddProducts.scss";
// ! COMPONENT IMPORTS
import {
  EnhancedTableHead,
  stableSort,
  getComparator,
} from "../TableDependencies/TableDependencies";
import TableSearch from "../TableSearch/TableSearch";
// ! IMAGES IMPORTS
import ringSmall from "../../assets/images/ringSmall.svg";
import deleteButton from "../../assets/icons/deleteButton.svg";
import cancel from "../../assets/icons/cancel.svg";
import arrowDown from "../../assets/icons/arrowDown.svg";
// ! MATERIAL IMPORTS
import {
  Checkbox,
  styled,
  InputBase,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Popover,
  SwipeableDrawer,
} from "@mui/material";
// ! MATERIAL ICONS IMPORTS
import SearchIcon from "@mui/icons-material/Search";
import { useDeleteSubCategoryMutation, useGetAllSubCategoriesQuery } from "../../features/parameters/categories/categoriesApiSlice";

// ? SEARCH INPUT STARTS HERE
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  "&:hover": {},
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
  height: "30.6px",
  border: "1px solid #38395c",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1.5),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(0.8, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    borderRadius: "5px",
  },
}));
// ? SEARCH INPUT ENDS HERE

// ? TABLE STARTS HERE
function createData(pId, productName, category, price) {
  return { pId, productName, category, price };
}

const rows = [
  createData(
    34,
    "The Fringe Diamond Ring",
    "Gold Products",
    "₹ 20,600 - ₹ 50,000"
  ),
  createData(
    35,
    "The Fringe Diamond Ring",
    "Gold Products",
    "₹ 20,600 - ₹ 50,000"
  ),
  createData(
    36,
    "The Fringe Diamond Ring",
    "Gold Products",
    "₹ 20,600 - ₹ 50,000"
  ),
  createData(
    37,
    "The Fringe Diamond Ring",
    "Gold Products",
    "₹ 20,600 - ₹ 50,000"
  ),
  createData(
    38,
    "The Fringe Diamond Ring",
    "Gold Products",
    "₹ 20,600 - ₹ 50,000"
  ),
];

const drawerHeadCells = [
  {
    id: "productName",
    numeric: false,
    disablePadding: true,
    label: "Sub Categories Name",
  },
  {
    id: "price",
    numeric: false,
    disablePadding: false,
    label: "No. of Products",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "Action",
  },
];

// ? TABLE ENDS HERE

// ? LIKE PRODUCTS TABLE STARTS HERE
function createLikeProductData(pId, productName, category, price) {
  return { pId, productName, category, price };
}


const likeProductRows = [
  createLikeProductData(
    1,
    "The Fringe Diamond Ring",
    "Gold Products",
    "25"
  ),
  createLikeProductData(2, "Fringe Diamond Ring", "Gold Products", "25"),
  createLikeProductData(
    3,
    "The Fringe Diamond Ring",
    "Gold Products",
    "25"
  ),
];
// ? LIKE PRODUCTS TABLE ENDS HERE

const AddSubCategoriesProducts = ({id}) => {
  const [subCategoryList,setSubCategoryList] = useState([])
  

  const {
    data: subCategoriesData,
    isLoading: subCategoriesIsLoading,
    isSuccess: subCategoriesIsSuccess,
    error: subCategoriesError,
  } = useGetAllSubCategoriesQuery({
    categoryId:id
  });

  const [
    deleteSubCategory,
    {
      isLoading: deleteSubCategoryIsLoading,
      isSuccess: deleteSubCategoryIsSuccess,
      error: deleteSubCategoryError,
    },
  ] = useDeleteSubCategoryMutation();

  useEffect(()=>{
    if(subCategoriesData?.data?.data){

      setSubCategoryList(subCategoriesData?.data?.data);
    }
  },[subCategoriesIsSuccess,subCategoriesData,deleteSubCategoryIsSuccess])


  // * TABLE STARTS HERE
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("productName");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  

  const handleLikeSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = likeProductRows.map((n) => n.pId);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  // * TABLE ENDS HERE

  return (
    <React.Fragment>
      <div className="col-12 px-0">
        <div className="row align-items-center">
          <div className="col-md-9 ps-1 pe-0 py-2">
            <TableSearch />
          </div>
          <div className="col-md-3 pe-md-1 py-2">
            <button
              className="button-gradient w-100 py-2 px-3"
              // onClick={toggleAddProductDrawer("right", true)}
            >
              <p>+ Add Sub Categories</p>
            </button>
          </div>
        </div>
      </div>
      <div className="col-12 px-0 ">
        <div className="add-products">
          {selected.length > 0 && (
            <div className="d-flex justify-content-between align-items-center px-2  mt-2 mb-3">
              <button className="button-grey py-2 px-3">
                <small className="text-lightBlue">
                  {selected.length} products are selected&nbsp;
                  <span
                    className="text-blue-2 c-pointer"
                    onClick={() => setSelected([])}
                  >
                    (Clear Selection)
                  </span>
                </small>
              </button>
            </div>
          )}
          <TableContainer className="mt-3">
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size="medium"
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleLikeSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={subCategoryList?.length}
                headCells={drawerHeadCells}
              />
              <TableBody>
                {stableSort(subCategoryList, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.pId);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.pId}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                            size="small"
                            onClick={(event) => handleClick(event, row._id)}
                            style={{
                              color: "#5C6D8E",
                              marginRight: 0,
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <p className="text-lightBlue">{row.name}</p>
                        </TableCell>
                        <TableCell>
                          <div className="d-flex align-items-center c-pointer ">
                            <p className="text-lightBlue">{row.totalProduct}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="d-flex align-items-center c-pointer ">
                            <img
                            onClick={()=>{
                              deleteSubCategory(row._id)
                            }}
                              src={deleteButton}
                              alt="deleteButton"
                              width={75}
                              className="c-pointer"
                            />
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
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddSubCategoriesProducts;
