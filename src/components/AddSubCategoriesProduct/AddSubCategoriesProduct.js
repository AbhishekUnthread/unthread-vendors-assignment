import React, { forwardRef, useEffect, useReducer, useState } from "react";
import "../AddProducts/AddProducts.scss";
// ! COMPONENT IMPORTS
import {
  EnhancedTableHead,
  stableSort,
  getComparator,
} from "../TableDependencies/TableDependencies";
import TableSearch from "../TableSearch/TableSearch";
// ! IMAGES IMPORTS
import cancel from "../../assets/icons/cancel.svg";
import question from "../../assets/images/products/question.svg";
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
  Tooltip,
  InputAdornment,
} from "@mui/material";
// ! MATERIAL ICONS IMPORTS
import {
  useBulkEditTagSubCategoryMutation,
  useCreateSubCategoryMutation,
  useDeleteSubCategoryMutation,
  useEditSubCategoryMutation,
  useGetAllCategoriesQuery,
  useGetAllSubCategoriesQuery,
  useSubCategoryBulkCreateTagMutation,
} from "../../features/parameters/categories/categoriesApiSlice";
import info from "../../assets/icons/info.svg";
import { LoadingButton } from "@mui/lab";
import { useFormik } from "formik";
import * as Yup from "yup";
import { showError, showSuccess } from "../../features/snackbar/snackbarAction";
import { useDispatch } from "react-redux";
import TableEditStatusButton from "../TableEditStatusButton/TableEditStatusButton";
import { Link, useNavigate,createSearchParams } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InventoryIcon from "@mui/icons-material/Inventory";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

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
    id: "subCategoriesName",
    numeric: false,
    disablePadding: true,
    label: "Sub Categories Name",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: true,
    label: "Status",
  },
  {
    id: "actions",
    numeric: false,
    disablePadding: true,
    label: "Actions",
  },
];

// ? TABLE ENDS HERE

// ? LIKE PRODUCTS TABLE STARTS HERE
function createLikeProductData(pId, productName, category, price) {
  return { pId, productName, category, price };
}

const likeProductRows = [
  createLikeProductData(1, "The Fringe Diamond Ring", "Gold Products", "25"),
  createLikeProductData(2, "Fringe Diamond Ring", "Gold Products", "25"),
  createLikeProductData(3, "The Fringe Diamond Ring", "Gold Products", "25"),
];
// ? LIKE PRODUCTS TABLE ENDS HERE

const multipleSubCategorySchema = Yup.object({
  name: Yup.string().trim().min(3, "Name must be at least 3 characters long"),
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

const initialQueryFilterState = {
  pageSize: 10,
  pageNo: 1,
  totalCount: 0,
};

const queryFilterReducer = (state, action) => {
  if (action.type === "SET_PAGE_SIZE") {
    return {
      ...state,
      pageNo: initialQueryFilterState.pageNo,
      pageSize: +action.value,
    };
  }
  if (action.type === "CHANGE_PAGE") {
    return {
      ...state,
      pageNo: action.pageNo,
    };
  }
  return initialQueryFilterState;
};

const AddSubCategoriesProducts = ({ id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [queryFilterState, dispatchQueryFilter] = useReducer(
    queryFilterReducer,
    initialQueryFilterState
  );
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [showCreateSubModal, setShowCreateSubModal] = useState(false);
  const [multipleTagsForSub, setMultipleTagsForSub] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selected, setSelected] = React.useState([]);
  const [totalCount, setTotalCount] = React.useState(0);
  const [showCreateDeleteModal, setShowCreateDeleteModal] = useState(false);
  const [rowData, setRowData] = useState({});
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
    categoryId: id,
    status: ["active", "in-active"],
    ...filterParameter,
    pageSize: queryFilterState.pageSize,
    pageNo: queryFilterState.pageNo,
    skip: queryFilterState.pageNo ? false : true,
  });

  const [
    editSubCategory,
    {
      isLoading: editSubCategoryIsLoading,
      isSuccess: editSubCategoryIsSuccess,
      error: editSubCategoryError,
    },
  ] = useEditSubCategoryMutation();

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

  const [
    bulkEditSubCategory,
    {
      data: bulkEditSubCategoryTag,
      isLoading: bulkTagEditSubCategoryLoading,
      isSuccess: bulkTagEditSubCategoryIsSuccess,
      error: bulkTagEditSubCategoryError,
    },
  ] = useBulkEditTagSubCategoryMutation();

  const subCategoryFormik = useFormik({
    initialValues: {
      name: "",
      description: "<p></P>",
      status: "active",
      categoryId: "",
      showFilter: false,
    },
    enableReinitialize: true,
    validationSchema:
      multipleTagsForSub.length > 0
        ? multipleSubCategorySchema
        : subCategoryValidationSchema,
    onSubmit: (values) => {
      if (multipleTagsForSub.length > 0) {
        bulkCreateSubCategory(multipleTagsForSub)
          .unwrap()
          .then(() => {
            subCategoryFormik.resetForm();
            setMultipleTagsForSub([]);
            setShowCreateSubModal(false);
          });
      } else {
        createSubCategory(values)
          .unwrap()
          .then(() => {
            setShowCreateSubModal(false);
            subCategoryFormik.resetForm();
          })
          .catch((err) => {
            dispatch(showError({ message: err?.data?.message }));
          });
      }
    },
  });
  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
  };

  useEffect(() => {
    if (subCategoriesData?.data?.data) {
      setSubCategoryList(subCategoriesData?.data?.data);
      setTotalCount(subCategoriesData?.data?.totalCount);
    }
  }, [
    subCategoriesIsSuccess,
    subCategoriesData,
    deleteSubCategoryIsSuccess,
    bulkTagEditSubCategoryIsSuccess,
    editSubCategoryIsSuccess,
  ]);

  const handleAddMultiple = (event, Formik, setTags, tags, data, flag) => {
    if (event.key === "Enter" || event.type === "click") {
      event.preventDefault();
      Formik.validateForm().then(() => {
        if (Formik.isValid && Formik.values.name !== "") {
          Formik.setFieldTouched("name", true);
          let tagName = tags.map((item) => item.name?.trim()?.toLowerCase());
          let valueExists = tagName.includes(data.name?.trim()?.toLowerCase());
          if (valueExists) {
            dispatch(
              showError({
                message: `${Formik.values.name.trim()} already exists`,
              })
            );
          }
          if (!valueExists) {
            setTags((prevValues) => [...prevValues, data]);
            if (flag) {
              Formik.resetForm();
            } else {
              Formik.setFieldValue("name", "");
            }
          }
        }
      });
    }
  };
  useEffect(() => {
    // Update the state only if the selectedStatus state has a value
    if (selectedStatus !== null) {
      const newState = selected.map((id) => {
        if (selectedStatus === "Set as Active") {
          return {
            id,
            status: "active",
          };
        } else if (selectedStatus === "Set as Archieved") {
          return {
            id,
            status: "archieved",
          };
        } else {
          return {
            id,
            status: "", // Set a default value here if needed
          };
        }
      });
      bulkEditSubCategory({ updates: newState })
        .unwrap()
        .then(() =>
          dispatch(
            showSuccess({
              message: "Sub Categories Status updated successfully",
            })
          )
        );
      setSelectedStatus(null);
    }
  }, [selected, selectedStatus]);

  const handleDelete = (value, setMultipleTags) => {
    setMultipleTagsForSub((prevValues) =>
      prevValues.filter((v) => v.name !== value)
    );
  };

  const toggleCreateSubModalHandler = () => {
    setShowCreateSubModal((prevState) => !prevState);
    subCategoryFormik.resetForm();

    setMultipleTagsForSub([]);
  };

  function handlesubmit() {
    setShowCreateSubModal((prevState) => !prevState);
    setMultipleTagsForSub([]);
    subCategoryFormik.handleSubmit();
  }

  const subModalOpenHandler = () => {
    setShowCreateSubModal((prev) => !prev);
    subCategoryFormik.setFieldValue("categoryId", id);
  };

  useEffect(() => {
    if (createSubCategoryIsSuccess) {
      dispatch(showSuccess({ message: "Sub Category Created successfully" }));
    }
  }, [createSubCategoryIsSuccess]);

  // * TABLE STARTS HERE
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("productName");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleLikeSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = subCategoryList.map((n) => n._id);
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

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // * TABLE ENDS HERE

  const handleChangeRowsPerPage = (event) => {
    dispatchQueryFilter({ type: "SET_PAGE_SIZE", value: event.target.value });
  };

  const handleChangePage = (_, pageNo) => {
    dispatchQueryFilter({ type: "CHANGE_PAGE", pageNo });
  };

  const toggleArchiveModalHandler = (row) => {
    setShowCreateDeleteModal((prevState) => !prevState);
    setRowData(row);
  };

  function deleteRowData() {
    setShowCreateDeleteModal(false);
    editSubCategory({
      id: rowData._id,
      details: {
        status: "archieved",
      },
    });
    dispatch(
      showSuccess({ message: "Archived this Sub category successfully" })
    );
  }

  const editSubPageHandler = (data,index) => {
    navigate({
      pathname: `/parameters/subCategories/edit/${data ? data._id : ""}`,
      search: `?${createSearchParams({
        filter: JSON.stringify({ ...queryFilterState, goBack:-1 }),
      })}`,
    });  };

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
                    <h5 className="text-lightBlue fw-500">{`Sub Category`}</h5>

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

              <div>
                <DialogContent className="py-3 px-4">
                <div className="d-flex mb-2 mt-2">
                <p className="text-lightBlue me-2 ">Select Category </p>
                <Tooltip title="Select category" placement="top">
                  <img
                    src={info}
                    alt="info"
                    className=" c-pointer"
                    width={13.5}
                  />
                </Tooltip>
                </div>
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
                  <div className="d-flex mb-2 mt-2">
                <p className="text-lightBlue me-2 ">Sub Category Name </p>
                <Tooltip title="Enter Name" placement="top">
                  <img
                    src={info}
                    alt="info"
                    className=" c-pointer"
                    width={13.5}
                  />
                </Tooltip>
                </div>
                  <FormControl className="col-md-7 px-0">
                    <OutlinedInput
                      placeholder="Enter Sub Category Name"
                      size="small"
                      name="name"
                      value={subCategoryFormik.values.name}
                      onBlur={subCategoryFormik.handleBlur}
                      onChange={subCategoryFormik.handleChange}
                      onKeyDown={(e) =>
                        handleAddMultiple(
                          e,
                          subCategoryFormik,
                          setMultipleTagsForSub,
                          multipleTagsForSub,
                          {
                            name: subCategoryFormik.values.name,
                            description: "<p></p>",
                            status: "active",
                            categoryId: subCategoryFormik.values.categoryId,
                            showFilter: subCategoryFormik.values.showFilter,
                          },
                          false
                        )
                      }
                      endAdornment={
                        <InputAdornment position="end">
                           <Tooltip title="Create Multiple Sub Category" placement="top">

                          <ChevronRightIcon
                            className="c-pointer"
                            onClick={(e) =>
                              handleAddMultiple(
                                e,
                                subCategoryFormik,
                                setMultipleTagsForSub,
                                multipleTagsForSub,
                                {
                                  name: subCategoryFormik.values.name,
                                  description: "<p></p>",
                                  status: "active",
                                  categoryId:
                                    subCategoryFormik.values.categoryId,
                                  showFilter:
                                    subCategoryFormik.values.showFilter,
                                },
                                false
                              )
                            }
                          />
                           </Tooltip>
                        </InputAdornment>
                      }
                    />
                    {!!subCategoryFormik.touched.name &&
                      subCategoryFormik.errors.name && (
                        <FormHelperText error>
                          {subCategoryFormik.errors.name}
                        </FormHelperText>
                      )}
                  </FormControl>
                  <br />
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

                  <div className="d-flex">
                    {multipleTagsForSub &&
                      multipleTagsForSub.map((data, index) => {
                        return (
                          <Chip
                            label={data.name}
                            onDelete={() =>
                              handleDelete(data.name, setMultipleTagsForSub)
                            }
                            onClick={() => {}}
                            size="small"
                            className="mt-3 me-2"
                          ></Chip>
                        );
                      })}
                  </div>
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
                    type="button"
                    loading={createSubCategoryIsLoading}
                    disabled={createSubCategoryIsLoading}
                    onClick={handlesubmit}
                    className="button-gradient py-2 px-5"
                  >
                    <p>Save</p>
                  </LoadingButton>
                </DialogActions>
              </div>
            </Dialog>
            <TableSearch
              searchValue={searchValue}
              handleSearchChange={handleSearchChange}
            />
          </div>
          <div className="col-md-3 pe-md-1 py-2">
            <button
              className="button-gradient w-100 py-2 px-3"
              onClick={subModalOpenHandler}
              type="button"
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
              <TableEditStatusButton
                onSelect={handleStatusSelect}
                defaultValue={["Set as Active", "Set as Archieved"]}
                headingName="Edit Status"
              />
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
                {stableSort(subCategoryList, getComparator(order, orderBy)).map(
                  (row, index) => {
                    const isItemSelected = isSelected(row._id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row._id}
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
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          <p className="text-lightBlue">{row.name}</p>
                        </TableCell>
                        <TableCell style={{ width: 180, padding: 0 }}>
                          <div className="d-flex align-items-center">
                            <div
                              className="rounded-pill d-flex px-2 py-1 "
                              style={{
                                background:
                                  row.status == "active"
                                    ? "#A6FAAF"
                                    : row.status == "in-active"
                                    ? "#F67476"
                                    : row.status == "archieved"
                                    ? "#C8D8FF"
                                    : "#FEE1A3",
                              }}
                            >
                              <small className="text-black fw-400">
                                {row.status == "active"
                                  ? "Active"
                                  : row.status == "in-active"
                                  ? "In-Active"
                                  : row.status == "archieved"
                                  ? "Archived"
                                  : "Scheduled"}
                              </small>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell style={{ width: 120, padding: 0 }}>
                          <div className="d-flex align-items-center">
                            <Tooltip title="Edit" placement="top">
                              <Link
                                className="text-decoration-none"
                                onClick={()=>editSubPageHandler(row,index)}
                              >
                                <div className="table-edit-icon rounded-4 p-2">
                                  <EditOutlinedIcon
                                    sx={{
                                      color: "#5c6d8e",
                                      fontSize: 18,
                                      cursor: "pointer",
                                    }}
                                  />
                                </div>
                              </Link>
                            </Tooltip>
                            <Tooltip title={"Archived"} placement="top">
                              <div
                                onClick={(e) => {
                                  toggleArchiveModalHandler(row);
                                }}
                                className="table-edit-icon rounded-4 p-2"
                              >
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
                  }
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalCount}
            rowsPerPage={queryFilterState.pageSize}
            page={queryFilterState.pageNo}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            className="table-pagination"
          />
        </div>
      </div>

      <Dialog
        open={showCreateDeleteModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={toggleArchiveModalHandler}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="sm"
      >
        <DialogContent className="py-2 px-4 text-center">
          <img src={question} alt="question" width={200} />
          <div className="row"></div>
          <h6 className="text-lightBlue mt-2 mb-2">
            Are you sure you want to Archive this Sub category
            <span className="text-blue-2">{rowData?.name} </span> ?
          </h6>
          <div className="d-flex justify-content-center mt-4">
            <hr className="hr-grey-6 w-100" />
          </div>
        </DialogContent>
        <DialogActions className="d-flex justify-content-between px-4 pb-4">
          <button
            className="button-red-outline py-2 px-3 me-5"
            onClick={toggleArchiveModalHandler}
          >
            <p>No</p>
          </button>
          <button
            className="button-gradient py-2 px-3 ms-5"
            onClick={deleteRowData}
          >
            <p>Yes</p>
          </button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AddSubCategoriesProducts;
