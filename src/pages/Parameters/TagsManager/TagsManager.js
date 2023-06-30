import React, {
  forwardRef,
  useState,
  useEffect,
  useReducer,
  useSyncExternalStore,
} from "react";
import "../../Products/AllProducts/AllProducts.scss";
// ! COMPONENT IMPORTS
import TagsManagerTable from "./TagsManagerTable";
import ViewLogsDrawer from "../../../components/ViewLogsDrawer/ViewLogsDrawer";
import TableSearch from "../../../components/TableSearch/TableSearch";
import ExportDialog from "../../../components/ExportDialog/ExportDialog";
import ImportSecondDialog from "../../../components/ImportSecondDialog/ImportSecondDialog";
import ViewTutorial from "../../../components/ViewTutorial/ViewTutorial";
import TabPanel from "../../../components/TabPanel/TabPanel";
import {
  EnhancedTableHead,
  stableSort,
  getComparator,
} from "../../../components/TableDependencies/TableDependencies";
// ! IMAGES IMPORTS
import cancel from "../../../assets/icons/cancel.svg";
import ringSmall from "../../../assets/images/ringSmall.svg";
import deleteWhite from "../../../assets/icons/deleteWhite.svg";
import editWhite from "../../../assets/icons/editWhite.svg";
import deleteButton from "../../../assets/icons/deleteButton.svg";
import parameters from "../../../assets/icons/sidenav/parameters.svg";
// ! MATERIAL IMPORTS
import {
  Box,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Paper,
  Tab,
  Tabs,
  MenuItem,
  FormControl,
  Select,
  Slide,
  OutlinedInput,
  Checkbox,
  SwipeableDrawer,
  FormControlLabel,
  InputAdornment,
  InputBase,
  Radio,
  RadioGroup,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Chip,
  FormHelperText,
  Popover,
  FormGroup,
} from "@mui/material";
// ! MATERIAL ICONS IMPORTS
import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  showSuccess,
  showError,
} from "../../../features/snackbar/snackbarAction";
import SearchIcon from "@mui/icons-material/Search";
import {
  useGetAllTagsQuery,
  useCreateTagMutation,
  useDeleteTagMutation,
  useEditTagMutation,
  useBulkCreateTagMutation,
  useBulkEditTagMutation,
} from "../../../features/parameters/tagsManager/tagsManagerApiSlice";
import { useNavigate } from "react-router-dom";
import { updateTagId } from "../../../features/parameters/tagsManager/tagsManagerSlice";
import sort from "../../../assets/icons/sort.svg";


// ? DIALOG TRANSITION STARTS HERE
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// ? DIALOG TRANSITION ENDS HERE

// ? SEARCH INPUT STARTS HERE
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: "auto",
  },
  height: "30.6px",
  border: "1px solid #38395c",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  // padding: theme.spacing(0, 2),
  padding: "0 8px",
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

// ? LIKE PRODUCTS TABLE STARTS HERE
function createLikeProductData(pId, productName, category, price) {
  return { pId, productName, category, price };
}

const likeProductRows = [
  createLikeProductData(
    1,
    "The Fringe Diamond Ring",
    "Gold Products",
    "₹ 25,000"
  ),
  createLikeProductData(2, "Fringe Diamond Ring", "Gold Products", "₹ 25,000"),
  createLikeProductData(
    3,
    "The Fringe Diamond Ring",
    "Gold Products",
    "₹ 25,000"
  ),
];

const likeHeadCells = [
  {
    id: "productName",
    numeric: false,
    disablePadding: true,
    label: "Product Name",
  },
  {
    id: "category",
    numeric: false,
    disablePadding: false,
    label: "Category",
  },
  {
    id: "price",
    numeric: false,
    disablePadding: false,
    label: "Price",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "Action",
  },
];

// ? TABLE ENDS HERE

const TagsManager = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [tagsType, setTagsType] = useState(0);
  const [tagsList, setTagsList] = useState([]);
  const [error, setError] = useState(false);
  const [multipleTags,setMultipleTags] = useState([]);
  const [selectedSortOption, setSelectedSortOption] = React.useState(null);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  const tagsValidationSchema = Yup.object({
    name: Yup.string().trim().min(3).required("Required"),
    // name: Yup.string().min(3, 'Name must be at least 3 characters long').required('Name is required'),
    // description: Yup.string().trim().min(3).required(),
    // status: Yup.mixed().oneOf(["active", "inactive"]).optional(),
    // name: Yup.string()
    // .when('multipleTags', {
    //   is: (multipleTags) => !multipleTags || multipleTags.length === 0,
    //   then: Yup.string()
    //     .trim()
    //     .min(3, 'Name must be at least 3 characters long')
    //     .required('Name is required when tags are empty'),
    //   otherwise: Yup.string()
    //     .trim()
    //     .min(3, 'Name must be at least 3 characters long'),
    // }),
  });

  const multipleTagsSchema = Yup.object({
    name: Yup.string().trim().min(3,"Name must be at least 3 characters long"),
  });

  const queryParameters = {};
  if (selectedSortOption) {
    // Check alphabetical sort options
    if (selectedSortOption === "alphabeticalAtoZ" || selectedSortOption === "alphabeticalZtoA") {
      queryParameters.alphabetical = selectedSortOption === "alphabeticalAtoZ" ? "1" : "-1";
    }
    // Check createdAt sort options
    else if (selectedSortOption === "oldestToNewest" || selectedSortOption === "newestToOldest") {
      queryParameters.createdAt = selectedSortOption === "oldestToNewest" ? "1" : "-1";
    }
  }
  if(searchValue)
  {
  queryParameters.name = searchValue;
  }
  if (!selectedSortOption && !searchValue) {
    queryParameters.createdAt = "-1"; // Set default createdAt value
  }
  const TagTypeQuery = tagsType === 1 ? { status: "draft" }
  : tagsType === 2 ? { status: "active" }
  : {};
  
  const[editTag,{
    data: editData,
    isLoading: editTagIsLoading,
    isSuccess: editTagIsSuccess,
    error: editTagError, 
  }]=useEditTagMutation();

  const changeTagsTypeHandler
   = (_event, tabIndex) => {
    setTagsType(tabIndex);
  };
  const[deleteTags,
  {
    isLoading: deleteTagsIsLoading, 
    isSuccess: deleteTagsIsSuccess, 
    error: deleteTagsError, 
  }]= useDeleteTagMutation();

const[createTag,
{
  isLoading: createTagsIsLoading, 
  isSuccess: createTagsIsSuccess, 
  error:createTagsError, 
}]= useCreateTagMutation();

const[bulkCreateTag,{
  isLoading: bulkCreateTagsIsLoading, 
  isSuccess: bulkCreateTagsIsSuccess, 
  error:bulkCreateTagsError, 
  
}]=useBulkCreateTagMutation();

const[bulkEdit,
  {
    data: bulkEditTag,
    isLoading: bulkTagEditLoading,
    isSuccess: bulkTagEditIsSuccess,
    error: bulkTagEditError,
  }]=useBulkEditTagMutation();

// const queryOptions =
//   tagsType === 0
//     ? { createdAt: -1 }
//     : tagsType === 1
//     ? { status: "draft" }
//     : tagsType === 2
//     ? { status: "active" }
//     : {};

const {
  data: tagsData,
  isLoading: tagsIsLoading,
  isSuccess: tagsIsSuccess,
  error: tagsError,
} = useGetAllTagsQuery({...queryParameters,...TagTypeQuery}, { enabled: Object.keys(queryParameters).length > 0 });

    
    useEffect(() => {
      if (tagsError) {
        setError(true);
        if (tagsError?.data?.message) {
          dispatch(showError({ message: tagsError.data.message }));
        } else {
          dispatch(
            showError({ message: "Something went wrong!, please try again" })
          );
        }
      }
      if (tagsIsSuccess || bulkCreateTagsIsSuccess || bulkTagEditIsSuccess) {
        setError(false);
        if (tagsType === 0) {
          setTagsList(tagsData.data.data);
        }
        if (tagsType === 1) {
          setTagsList(tagsData.data.data);
        }
        if(tagsType==2){
          setTagsList(tagsData.data.data);
        }
      }

      if (createTagsIsSuccess) {
        setShowCreateModal(false);
        dispatch(showSuccess({ message: "Vendor created successfully" }));
      }
      if(bulkCreateTagsIsSuccess)
      {
        setShowCreateModal(false);
        dispatch(showSuccess({ message: "Vendors created successfully" }));
      }
      
    }, [tagsType,tagsIsSuccess,tagsError,tagsData,dispatch,bulkCreateTagsIsSuccess,bulkTagEditIsSuccess])
    
    const editTagsPageNavigationHandler = (data) => {
      dispatch(updateTagId(data._id)); 
      navigate('edit');
    };

    const ArchiveTagsHandler = (data) => {
      const newStatus = data?.status === "draft" ? "active" : "draft";
      editTag({
        id: data?._id,
        details: {
          status: newStatus,
        },
      });
    };
    
  
  const toggleCreateModalHandler = () => {
    setShowCreateModal((prevState) => !prevState);
    TagFormik.resetForm();
    setMultipleTags([]);
    TagFormik.setFieldTouched('name', false);
    TagFormik.setFieldError('name', '');
  };
  
  const TagFormik = useFormik({
    initialValues: {
      name : "",
      status:"active",
      showFilter:true,
    },
    enableReinitialize: true,
    validationSchema: multipleTags.length > 0 ? multipleTagsSchema : tagsValidationSchema,
    
    onSubmit: (values) => {
      if(multipleTags.length>0)
      {
        bulkCreateTag(multipleTags)
      }
      else{
        createTag(values);
      }
    },
  });

  const handleAddMultiple = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      TagFormik.validateForm().then(() => {
        if (TagFormik.isValid && TagFormik.values.name !== '') {
          TagFormik.setFieldTouched('name', true);
          setMultipleTags((prevValues) => [
            ...prevValues,
            { name: TagFormik.values.name, status: 'active', filter: TagFormik.values.showFilter },
          ]);
          TagFormik.resetForm();
        }
      });
    }
  };
  
  const handleDelete = (value) => {
    setMultipleTags((prevValues) => prevValues.filter((v) => v.name !== value));
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };


     // * SORT POPOVERS STARTS HERE
     const [anchorSortE1, setAnchorSortE1] = React.useState(null);
     const openSort = Boolean(anchorSortE1);
     const idSort = openSort ? "simple-popover" : undefined;
   
     const handleSortClose = () => {
       setAnchorSortE1(null);
     };
     
     const handleSortClick = (event) => {
       setAnchorSortE1(event.currentTarget);
     };
     const handleSortCheckboxChange = (event) => {
       const { value, checked } = event.target;
       setSelectedSortOption(checked ? value : null);
       setAnchorSortE1(null);
     };
      // * SORT POPOVERS ENDS

  return (
    <div className="container-fluid page">
      <div className="row justify-content-between align-items-center">
        <h4 className="page-heading w-auto ps-0">Tag Manager</h4>
        <div className="d-flex align-items-center w-auto pe-0">
          <ViewTutorial />
          <ViewLogsDrawer
            headingName={"Parameters / Tag Manager"}
            icon={parameters}
          />
          <ExportDialog dialogName={"Tag Manager"} />
          <ImportSecondDialog dialogName={"Tag Manager"} />
          <button className="button-lightBlue-outline py-2 px-4 ms-3">
            <p>Bulk Add Tags</p>
          </button>
          <button
           className="button-gradient py-2 px-4 ms-3" 
           onClick={toggleCreateModalHandler}
           >
            <p>+ Create Tag</p>
          </button>

          <Dialog
            TransitionComponent={Transition}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
            maxWidth="sm"
            fullWidth={true}
            open={showCreateModal}
          >
            <DialogTitle>
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column ">
                  <h5 className="text-lightBlue fw-500">
                    {true ? "Create Tags" : "Update Tags"}
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
                  onClick={toggleCreateModalHandler}
                />
              </div>
            </DialogTitle>
            <hr className="hr-grey-6 my-0" />
            <form noValidate onSubmit={TagFormik.handleSubmit}>
            <DialogContent className="py-3 px-4">
              <p className="text-lightBlue mb-2">Create Tags</p>
              <FormControl className="col-7 px-0">
                <OutlinedInput
                 placeholder="Enter Tag Name" 
                 size="small"
                 name="name"
                 value={TagFormik.values.name}
                 onChange={TagFormik.handleChange}
                 onBlur={TagFormik.handleBlur}
                 onKeyDown={handleAddMultiple}
                  />
                {!!TagFormik.touched.name && TagFormik.errors.name && (
                    <FormHelperText error>
                        {TagFormik.errors.name}
                    </FormHelperText>
                  )}
              </FormControl>

              <div className="d-flex">
                {multipleTags && multipleTags.map((data, index) => {
                  return (
                    <Chip
                      label={data.name}
                      onDelete={() => handleDelete(data.name)}
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
                      checked={TagFormik.values.showFilter}
                      onChange={TagFormik.handleChange}
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
                  className="button-grey py-2 px-5"
                  onClick={toggleCreateModalHandler}
                  type="button"
                >
                  <p className="text-lightBlue">Cancel</p>
                </button>
              <LoadingButton 
              className="button-gradient py-2 px-5"
              // loading={createTagsIsLoading}
              // disabled={createTagsIsLoading}
              type="submit"
              >
                <p>Save</p>
              </LoadingButton>
            </DialogActions>
            </form>
          </Dialog>

          <SwipeableDrawer anchor="right" className="bulk-drawer">
            <div className="d-flex flex-column bulk-top">
              <div className="d-flex justify-content-between pt-3 px-3 ms-2 me-1">
                <div className="d-flex flex-column w-100">
                  <h6 className="text-lightBlue">Bulk Add Tags</h6>

                  <small className="text-grey-6 mt-1 d-block">
                    ⓘ Some Dummy Content to explain
                  </small>
                </div>
                <img
                  src={cancel}
                  alt="cancel"
                  className="c-pointer filter-icon"
                />
              </div>
              <hr className="hr-grey-6 my-3 w-100" />
            </div>

            <div className="px-3 ms-2 me-1 mb-4">
              <p className="text-lightBlue mb-2">Select Tags</p>
              <FormControl size="small" className="col-md-8">
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  size="small"
                >
                  <MenuItem value="" sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    None
                  </MenuItem>
                  <MenuItem value={10} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    Express Shipping
                  </MenuItem>
                  <MenuItem value={20} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    Try On
                  </MenuItem>
                  <MenuItem value={30} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    Lifetime
                  </MenuItem>
                  <MenuItem value={40} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    Rings
                  </MenuItem>
                  <MenuItem value={50} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    Top Selleing{" "}
                  </MenuItem>
                </Select>
              </FormControl>

              <div className="bg-black-11 rounded-8 p-3 shadow-sm mt-3">
                <div className="d-flex justify-content-between">
                  <div className="d-flex align-items-center">
                    <p className="text-lightBlue me-4">Should Match:</p>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      className="features-radio"
                    >
                      <FormControlLabel
                        value="allCondition"
                        control={<Radio size="small" />}
                        label="All Condition"
                        sx={{
                          "& .MuiTypography-root": {
                            fontSize: 13,
                            color: "#c8d8ff",
                          },
                        }}
                      />
                      <FormControlLabel
                        value="anyCondition"
                        control={<Radio size="small" />}
                        label="Any Condition"
                        sx={{
                          "& .MuiTypography-root": {
                            fontSize: 13,
                            color: "#c8d8ff",
                          },
                        }}
                      />
                    </RadioGroup>
                  </div>
                  <button className="button-gradient py-1 px-4">
                    <p>Add Condition</p>
                  </button>
                </div>
                <div className="bg-black-9 align-items-center rounded-8 py-2 px-3 d-flex justify-content-between mt-3 shadow-lg">
                  <FormControlLabel
                    control={
                      <Checkbox
                        inputProps={{ "aria-label": "controlled" }}
                        size="small"
                        style={{
                          color: "#5C6D8E",
                          marginRight: 0,
                          width: "auto",
                        }}
                      />
                    }
                    label="Summary"
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: "0.875rem",
                        color: "#c8d8ff",
                      },
                    }}
                    className=" px-0"
                  />
                  <p className="text-lightBlue c-pointer">Action</p>
                </div>
                {true && (
                  <div className="d-flex px-3 justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <FormControlLabel
                        control={
                          <Checkbox
                            inputProps={{ "aria-label": "controlled" }}
                            size="small"
                            style={{
                              color: "#5C6D8E",
                              marginRight: 0,
                              width: "auto",
                            }}
                          />
                        }
                        sx={{
                          "& .MuiTypography-root": {
                            fontSize: "0.875rem",
                            color: "#c8d8ff",
                          },
                        }}
                        className="px-0 me-0"
                      />
                      <small className="ms-0 text-lightBlue">
                        <span className="text-blue-2">Price</span>&nbsp;is equal
                        to&nbsp;
                        <span className="text-blue-2">₹&nbsp;25,000</span>
                      </small>
                    </div>
                    <div className="d-flex align-items-center">
                      <img
                        src={editWhite}
                        alt="editWhite"
                        width={30}
                        className="me-1"
                      />
                      <img src={deleteWhite} alt="deleteWhite" width={30} />
                    </div>
                  </div>
                )}
                {true && (
                  <div className="row">
                    <div className="col-sm-6 col-md-3 mt-3 mb-1 ps-4">
                      <p className="text-lightBlue mb-1">Field</p>

                      <FormControl className="w-100 px-0" size="small">
                        <Select
                          labelId="demo-select-small"
                          id="demo-select-small"
                          size="small"
                        >
                          <MenuItem
                            value="price"
                            sx={{ fontSize: 13, color: "#5c6d8e" }}
                          >
                            Price
                          </MenuItem>
                          <MenuItem
                            value={"collection"}
                            sx={{ fontSize: 13, color: "#5c6d8e" }}
                          >
                            Collection
                          </MenuItem>
                          <MenuItem
                            value={"tags"}
                            sx={{ fontSize: 13, color: "#5c6d8e" }}
                          >
                            Tags
                          </MenuItem>
                          <MenuItem
                            value={"category"}
                            sx={{ fontSize: 13, color: "#5c6d8e" }}
                          >
                            Catagory
                          </MenuItem>
                          <MenuItem
                            value={"subCategory"}
                            sx={{ fontSize: 13, color: "#5c6d8e" }}
                          >
                            Sub Category
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div className="col-sm-6 col-md-3 mt-3 mb-1">
                      <p className="text-lightBlue mb-1">Operator</p>

                      <FormControl className="w-100 px-0" size="small">
                        <Select
                          labelId="demo-select-small"
                          id="demo-select-small"
                          size="small"
                        >
                          <MenuItem
                            value="equals"
                            sx={{ fontSize: 13, color: "#5c6d8e" }}
                          >
                            Equals
                          </MenuItem>
                          <MenuItem
                            value={"notEquals"}
                            sx={{ fontSize: 13, color: "#5c6d8e" }}
                          >
                            Not Equals
                          </MenuItem>
                          <MenuItem
                            value={"greaterThan"}
                            sx={{ fontSize: 13, color: "#5c6d8e" }}
                          >
                            Greater Than
                          </MenuItem>
                          <MenuItem
                            value={"less"}
                            sx={{ fontSize: 13, color: "#5c6d8e" }}
                          >
                            Less
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div className="col-sm-6 col-md-3 mt-3 mb-1">
                      <p className="text-lightBlue mb-1">Value</p>

                      <FormControl className="w-100 px-0">
                        <OutlinedInput
                          placeholder="Enter Value"
                          size="small"
                          defaultValue="25000"
                          startAdornment={
                            <InputAdornment position="start">
                              <p className="text-lightBlue">₹</p>
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </div>
                    <div className="col-sm-6 col-md-3 mt-3 mb-1">
                      <button className="button-gradient py-1 px-3 w-100 mb-2">
                        <p>Apply</p>
                      </button>
                      <button className="button-lightBlue-outline py-1 px-3 w-100">
                        <p>Cancel</p>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {true && (
                <>
                  <div className="col-12 mt-3">
                    <div className="row align-items-center">
                      <div className="col-md-12  py-2">
                        <Search className="mx-0">
                          <SearchIconWrapper>
                            <SearchIcon sx={{ color: "#c8d8ff" }} />
                          </SearchIconWrapper>
                          <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ "aria-label": "search" }}
                          />
                        </Search>
                      </div>
                      {/* <div className="col-md-3 pe-md-0 py-2">
                        <button className="button-gradient w-100 py-1 px-3">
                          <p>Apply</p>
                        </button>
                      </div> */}
                    </div>
                  </div>
                  <div className="col-12 px-0">
                    <TableContainer className="mt-3">
                      <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size="medium"
                      >
                        <EnhancedTableHead
                          rowCount={likeProductRows.length}
                          headCells={likeHeadCells}
                        />
                        <TableBody>
                          {[].map((row, index) => {
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                              <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={row.pId}
                              >
                                <TableCell padding="checkbox">
                                  <Checkbox
                                    color="primary"
                                    inputProps={{
                                      "aria-labelledby": labelId,
                                    }}
                                    size="small"
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
                                  <div className="d-flex align-items-center my-2">
                                    <img
                                      src={ringSmall}
                                      alt="ringSmall"
                                      className="me-2"
                                      height={45}
                                      width={45}
                                    />
                                    <div>
                                      <p className="text-lightBlue fw-600">
                                        {row.productName}
                                      </p>
                                      <small className="mt-2 text-grey-6">
                                        SKU: TFDR012345
                                      </small>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <p className="text-lightBlue">
                                    {row.category}
                                  </p>
                                </TableCell>
                                <TableCell>
                                  <div className="d-flex align-items-center c-pointer ">
                                    <p className="text-lightBlue">
                                      {row.price}
                                    </p>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="d-flex align-items-center c-pointer ">
                                    <img
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
                          {
                            <TableRow
                              style={{
                                height: 53,
                              }}
                            >
                              <TableCell colSpan={6} />
                            </TableRow>
                          }
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      component="div"
                      count={likeProductRows.length}
                      className="table-pagination"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="d-flex flex-column py-3 px-4 bulk-buttons">
              <hr className="hr-grey-6 my-3 w-100" />
              <div className="d-flex justify-content-between">
                <button className="button-gradient py-2 px-5 w-auto ">
                  <p>Add to 53 Products</p>
                </button>
                <button className="button-lightBlue-outline py-2 px-4">
                  <p>Cancel</p>
                </button>
              </div>
            </div>
          </SwipeableDrawer>
        </div>
      </div>

      <div className="row mt-4">
        <Paper
          sx={{ width: "100%", mb: 2, mt: 0, p: 0 }}
          className="border-grey-5 bg-black-15"
        >
          <Box
            sx={{ width: "100%" }}
            className="d-flex justify-content-between tabs-header-box"
          >
            {/* variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile */}
            <Tabs 
            value={tagsType}
            onChange={changeTagsTypeHandler}
            aria-label="scrollable force tabs example" 
            className="tabs">
              <Tab label="All" className="tabs-head" />{" "}
              <Tab label="Draft" className="tabs-head" />
              <Tab label="Active" className="tabs-head" />
            </Tabs>
          </Box>
          <div className="d-flex align-items-center mt-3 mb-3 px-2 justify-content-between">
            <TableSearch searchValue={searchValue} handleSearchChange={handleSearchChange}/>
            
            <button
                className="button-grey py-2 px-3 ms-2"
                aria-describedby={idSort}
                variant="contained"
                onClick={handleSortClick}
              >
                <small className="text-lightBlue me-2">Sort</small>
                <img src={sort} alt="sort" className="" />
              </button>
              <Popover
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                id={idSort}
                open={openSort}
                anchorEl={anchorSortE1}
                onClose={handleSortClose}
                className="columns"
              >
                <FormGroup className="px-2 py-1"                   
                  onChange={handleSortCheckboxChange}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked
                        size="small"
                        style={{
                          color: "#5C6D8E",
                        }}
                      />
                    }
                    label="Alphabetical (A-Z)"
                    value="alphabeticalAtoZ"
                    className="me-0"
                    checked={selectedSortOption === "alphabeticalAtoZ"}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        style={{
                          color: "#5C6D8E",
                        }}
                      />
                    }
                    label="Alphabetical (Z-A)"
                    className="me-0"
                    value="alphabeticalZtoA"
                    checked={selectedSortOption === "alphabeticalZtoA"}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        style={{
                          color: "#5C6D8E",
                        }}
                      />
                    }
                    label="Oldest to Newest"
                    className="me-0"
                    value="oldestToNewest"
                    checked={selectedSortOption === "oldestToNewest"}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        style={{
                          color: "#5C6D8E",
                        }}
                      />
                    }
                    label="Newest to Oldest"
                    className="me-0"
                    value="newestToOldest"
                    checked={selectedSortOption === "newestToOldest"}
                  />
                </FormGroup>
              </Popover>
          </div>
          <TabPanel value={tagsType} index={0}>
            <TagsManagerTable 
              isLoading={tagsIsLoading}
              deleteData={ArchiveTagsHandler}
              error={error}
              list={tagsList}
              edit={editTagsPageNavigationHandler}
              bulkEdit={bulkEdit}
            />
          </TabPanel>
          <TabPanel value={tagsType} index={1}>
            <TagsManagerTable
              isLoading={tagsIsLoading}
              deleteData={ArchiveTagsHandler}
              error={error}
              list={tagsList}
              edit={editTagsPageNavigationHandler}
             />
          </TabPanel>
          <TabPanel value={tagsType} index={2}>
            <TagsManagerTable
              isLoading={tagsIsLoading}
              deleteData={ArchiveTagsHandler}
              error={error}
              list={tagsList}
              edit={editTagsPageNavigationHandler}
             />
          </TabPanel>
        </Paper>
      </div>
    </div>
  );
};

export default TagsManager;
