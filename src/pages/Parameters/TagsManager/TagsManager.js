import {
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
} from "../../../features/parameters/tagsManager/tagsManagerApiSlice";

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

const tagsValidationSchema = Yup.object({
  name: Yup.string().trim().min(3).required("required"),
  description: Yup.string().trim().min(3).required(),
  status: Yup.mixed().oneOf(["active", "inactive"]).optional(),
});

const TagsManager = () => {
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
          <button className="button-gradient py-2 px-4 ms-3">
            <p>+ Create Tag</p>
          </button>

          <Dialog
            TransitionComponent={Transition}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
            maxWidth="sm"
            fullWidth={true}
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
                />
              </div>
            </DialogTitle>
            <hr className="hr-grey-6 my-0" />

            <DialogContent className="py-3 px-4">
              <p className="text-lightBlue mb-2">Tag Name</p>
              <FormControl className="col-7 px-0">
                <OutlinedInput placeholder="Enter Tag Name" size="small" />
              </FormControl>
              <div className="d-flex">
                {[].map((data, index) => {
                  return (
                    <Chip
                      label={data}
                      onDelete={() => {}}
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
              <button className="button-grey py-2 px-5">
                <p className="text-lightBlue">Cancel</p>
              </button>
              <button className="button-gradient py-2 px-5">
                <p>Save</p>
              </button>
            </DialogActions>
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
            <Tabs aria-label="scrollable force tabs example" className="tabs">
              <Tab label="All" className="tabs-head" />{" "}
              <Tab label="Draft" className="tabs-head" />
            </Tabs>
          </Box>
          <div className="d-flex align-items-center mt-3 mb-3 px-2 justify-content-between">
            <TableSearch />
          </div>
          <TabPanel index={0}>
            <TagsManagerTable />
          </TabPanel>
          <TabPanel index={1}>
            <TagsManagerTable />
          </TabPanel>
        </Paper>
      </div>
    </div>
  );
};

export default TagsManager;
