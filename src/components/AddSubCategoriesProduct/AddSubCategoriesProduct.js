import React, { forwardRef, useEffect, useState } from "react";
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
  DialogActions,
  FormControlLabel,
  Chip,
  FormHelperText,
  FormControl,
  OutlinedInput,
  MenuItem,
  Select,
  DialogContent,
  DialogTitle,
  Dialog,
  Slide,
} from "@mui/material";
// ! MATERIAL ICONS IMPORTS
import SearchIcon from "@mui/icons-material/Search";
import { useCreateSubCategoryMutation, useDeleteSubCategoryMutation, useGetAllCategoriesQuery, useGetAllSubCategoriesQuery, useSubCategoryBulkCreateTagMutation } from "../../features/parameters/categories/categoriesApiSlice";
import { LoadingButton } from "@mui/lab";
import { useFormik } from "formik";
import * as Yup from "yup";



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

const multipleSubCategorySchema = Yup.object({
  name: Yup.string().trim().min(3,"Name must be at least 3 characters long"),
});
const subCategoryValidationSchema = Yup.object({
  name: Yup.string().trim().min(3).required("required"),
  description: Yup.string().trim().min(3).optional(),
  status: Yup.mixed().oneOf(["active", "inactive"]).optional(),
  categoryId: Yup.string().required("required"),
});

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddSubCategoriesProducts = ({id}) => {
  const [subCategoryList,setSubCategoryList] = useState([])
  const [searchValue, setSearchValue] = useState("");
  const [showCreateSubModal, setShowCreateSubModal] = useState(false);
  const [multipleTagsForSub,setMultipleTagsForSub] = useState([])
  const filterParameter = {};

  if (searchValue) {
    filterParameter.name = searchValue;
  }
  

  const {
    data: subCategoriesData,
    isLoading: subCategoriesIsLoading,
    isSuccess: subCategoriesIsSuccess,
    error: subCategoriesError,
  } = useGetAllSubCategoriesQuery({
    categoryId:id,
    ...filterParameter
  });

  const {
    data: categoriesData,
    isLoading: categoriesIsLoading,
    isSuccess: categoriesIsSuccess,
    error: categoriesError,
  } = useGetAllCategoriesQuery({});

  const [
    bulkCreateSubCategory,
    {
      isLoading: bulkCreateSubTagsIsLoading,
      isSuccess: bulkCreateSubTagsIsSuccess,
      error: bulkCreateSubTagsError,
    },
  ] = useSubCategoryBulkCreateTagMutation();
  const [
    createSubCategory,
    {
      isLoading: createSubCategoryIsLoading,
      isSuccess: createSubCategoryIsSuccess,
      error: createSubCategoryError,
    },
  ] = useCreateSubCategoryMutation();

  const [
    deleteSubCategory,
    {
      isLoading: deleteSubCategoryIsLoading,
      isSuccess: deleteSubCategoryIsSuccess,
      error: deleteSubCategoryError,
    },
  ] = useDeleteSubCategoryMutation();

  const subCategoryFormik = useFormik({
    initialValues: {
      name: "",
      description: "<p></P>",
      status: "active",
      categoryId: "",
      showFilter: true,
    },
    enableReinitialize: true,
    validationSchema: multipleTagsForSub.length > 0? multipleSubCategorySchema : subCategoryValidationSchema,
    onSubmit: (values) => {
      if (multipleTagsForSub.length > 0) {
        bulkCreateSubCategory(multipleTagsForSub).unwrap()
        .then(() => {
          subCategoryFormik.resetForm()
          setMultipleTagsForSub([])
          setShowCreateSubModal(false)
        });
      } else {
        createSubCategory(values)
          .unwrap()
          .then(() => {
            setShowCreateSubModal(false)
            subCategoryFormik.resetForm()
          });
      }
    },
  });

  useEffect(()=>{
    if(subCategoriesData?.data?.data){

      setSubCategoryList(subCategoriesData?.data?.data);
    }
  },[subCategoriesIsSuccess,subCategoriesData,deleteSubCategoryIsSuccess])

  const handleAddMultiple = (event,Formik,Tags,data,flag) => {
    if (event.key === "Enter") {
      event.preventDefault();
      Formik.validateForm().then(() => {
        if (Formik.isValid && Formik.values.name !== "") {
          Formik.setFieldTouched("name", true);
          Tags((prevValues) => [
            ...prevValues,
            data,
          ]);
          if(flag){  
            Formik.resetForm();
          }else{
            Formik.setFieldValue("name", "");
          }
        }
      });
    }
  };

  const handleDelete = (value,setMultipleTags) => {
    setMultipleTagsForSub((prevValues) => prevValues.filter((v) => v.name !== value));
  };

  const toggleCreateSubModalHandler = () => {
    setShowCreateSubModal((prevState) => !prevState);
    subCategoryFormik.resetForm();
    
    setMultipleTagsForSub([])
  };

  const subModalOpenHandler= ()=>{
    setShowCreateSubModal(prev => !prev)
    subCategoryFormik.setFieldValue("categoryId",id)
  }


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

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  }

  

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
          <Dialog
            TransitionComponent={Transition}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
            maxWidth="sm"
            fullWidth={true}
            open={showCreateSubModal}
            onClose={toggleCreateSubModalHandler}
          >
            <DialogTitle>
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column ">
                  <h5 className="text-lightBlue fw-500">
                    {`Sub Category`}
                  </h5>

                  <small className="text-grey-6 mt-1 d-block">
                    ⓘ Some Dummy Content to explain
                  </small>
                </div>
                <img
                  src={cancel}
                  alt="cancel"
                  width={30}
                  className="c-pointer"
                  onClick={toggleCreateSubModalHandler}
                />
              </div>
            </DialogTitle>
            <hr className="hr-grey-6 my-0" />

            <form noValidate onSubmit={subCategoryFormik.handleSubmit}>
              <DialogContent className="py-3 px-4">
                <p className="text-lightBlue mb-2">Select Category</p>
                <FormControl
                  //   sx={{ m: 0, minWidth: 120, width: "100%" }}
                  size="small"
                  className="col-md-7"
                >
                  {categoriesData?.data?.data && (
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      size="small"
                      MenuProps={{ PaperProps: { sx: { maxHeight: 150 } } }}
                      name="categoryId"
                      value={subCategoryFormik.values.categoryId}
                      onBlur={subCategoryFormik.handleBlur}
                      onChange={subCategoryFormik.handleChange}
                    >
                      <MenuItem key={""} value={"Select Category"}>
                        Select Category
                      </MenuItem>
                      {categoriesData.data.data.map((option) => (
                        <MenuItem key={option._id} value={option._id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                  {!!subCategoryFormik.touched.categoryId &&
                    subCategoryFormik.errors.categoryId && (
                      <FormHelperText error>
                        {subCategoryFormik.errors.categoryId}
                      </FormHelperText>
                    )}
                </FormControl>
                <p className="text-lightBlue mb-2 mt-3">Sub Category</p>
                <FormControl className="col-md-7 px-0">
                  <OutlinedInput
                    placeholder="Enter Sub Category Name"
                    size="small"
                    name="name"
                    value={subCategoryFormik.values.name}
                    onBlur={subCategoryFormik.handleBlur}
                    onChange={subCategoryFormik.handleChange}
                    onKeyDown={(e)=>handleAddMultiple(e,subCategoryFormik,setMultipleTagsForSub,{
                      name: subCategoryFormik.values.name,
                      description: "<p></p>",
                      status: "active",
                      categoryId: subCategoryFormik.values.categoryId,
                      showFilter: subCategoryFormik.values.showFilter,
                    },false)}
                  />
                  {!!subCategoryFormik.touched.name &&
                    subCategoryFormik.errors.name && (
                      <FormHelperText error>
                        {subCategoryFormik.errors.name}
                      </FormHelperText>
                    )}
                </FormControl>

                <div className="d-flex">
                  {multipleTagsForSub &&
                    multipleTagsForSub.map((data, index) => {
                      return (
                        <Chip
                          label={data.name}
                          onDelete={() => handleDelete(data.name,setMultipleTagsForSub)}
                          onClick={() => {}}
                          size="small"
                          className="mt-3 me-2"
                        ></Chip>
                      );
                    })}
                </div>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="showFilter"
                      checked={subCategoryFormik.values.showFilter}
                      onChange={subCategoryFormik.handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                      size="small"
                      style={{
                        color: "#5C6D8E",
                        marginRight: 0,
                        width: "auto",
                      }}
                    />
                  }
                  label="Include in Filters"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: "0.875rem",
                      color: "#c8d8ff",
                    },
                  }}
                  className=" px-0"
                />
              </DialogContent>
              <hr className="hr-grey-6 my-0" />
              <DialogActions className="d-flex justify-content-between px-4 py-3">
                <button
                  onClick={toggleCreateSubModalHandler}
                  type="button"
                  className="button-grey py-2 px-5"
                >
                  <p className="text-lightBlue">Cancel</p>
                </button>
                <LoadingButton
                  loading={
                    createSubCategoryIsLoading 
                  }
                  disabled={
                    createSubCategoryIsLoading 
                  }
                  type="submit"
                  className="button-gradient py-2 px-5"
                >
                  <p>Save</p>
                </LoadingButton>
              </DialogActions>
            </form>
          </Dialog>
            <TableSearch searchValue={searchValue} handleSearchChange={handleSearchChange} />
          </div>
          <div className="col-md-3 pe-md-1 py-2">
            <button
              className="button-gradient w-100 py-2 px-3"
              onClick={subModalOpenHandler}
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
