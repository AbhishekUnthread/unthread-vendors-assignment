import React from "react";
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
import SearchIcon from "@mui/icons-material/Search";
import { callGetApi, createTag, updateTag } from '../services/parameter.service';

// ? DIALOG TRANSITION STARTS HERE
const Transition = React.forwardRef(function Transition(props, ref) {
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
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
 


  // ? CATEGORY SELECT STARTS HERE
  const [category, setCategory] = React.useState("");

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  // ? CATEGORY SELECT ENDS HERE

  // ? CREATE TAG DIALOG STARTS HERE
  const [openCreateTag, setOpenCreateTag] = React.useState(false);

  const handleCreateTag = () => {
    setOpenCreateTag(true);
  };

  const handleCreateTagClose = () => {
    setOpenCreateTag(false);
  };
  // ? CREATE TAG DIALOG ENDS HERE

  // ? FILTER DRAWER STARTS HERE
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleBulkTagDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  // ? FILTER DRAWER ENDS HERE

  // ? RADIO BUTTON STARTS HERE
  const [likeMatchRadio, setLikeMatchRadio] = React.useState("allCondition");
  const handleLikeMatchRadio = (event) => {
    setLikeMatchRadio(event.target.value);
  };

  // ? RADIO BUTTON ENDS HERE

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
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - likeProductRows.length)
      : 0;
  // * TABLE ENDS HERE

  // ? SIZE SELECT STARTS HERE
  const [field, setField] = React.useState("price");

  const handleFieldChange = (event) => {
    setField(event.target.value);
  };
  // ? SIZE SELECT ENDS HERE

  // ? OPERATOR SELECT STARTS HERE
  const [operator, setOperator] = React.useState("equals");

  const handleOperatorChange = (event) => {
    setOperator(event.target.value);
  };
  // ? OPERATOR SELECT ENDS HERE

  // ? CHECKBOX STARTS HERE
  const [checked, setChecked] = React.useState(false);

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };
  // ? CHECKBOX ENDS HERE

  // ? LIKE ADD CONDITION STARTS HERE
  const [likeAddCondition, setLikeAddCondition] = React.useState(false);
  const handleLikeAddCondition = () => {
    if (!likeAddCondition) {
      setLikeAddCondition(true);
    } else {
      setLikeAddCondition(false);
      setLikeApplyCondition(false);
    }
  };
  // ? LIKE ADD CONDITION ENDS HERE

  // ? LIKE APPLY CONDITION STARTS HERE
  const [likeApplyCondition, setLikeApplyCondition] = React.useState(false);
  const handleLikeApplyCondition = () => {
    if (likeApplyCondition) {
      setLikeApplyCondition(false);
    } else {
      setLikeApplyCondition(true);
      setLikeAddCondition(false);
    }
  };
  // ? LIKE APPLY CONDITION ENDS HERE

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

//aman
  let [message, setMessage] = React.useState('');
  const [allTags, setallTags] = React.useState([]);
  const [allTagsArchived, setallTagsArchived] = React.useState([]);

  const [tagName, settagName] = React.useState('');
  const [editData, seteditData] = React.useState('');

  React.useEffect(()=>{
    gettags();
  },[])


  let gettags=()=>{
    callGetApi('/api/product-tags','GET').then((res) => {
      setallTags(res.data.filter(data=>data.attributes.status==='Active'))
      setallTagsArchived(res.data.filter(data=>data.attributes.status!=='Active'))


     })
   .catch((err) => {
     setMessage(err);
   });
   }

   let edit=(data)=>{
    seteditData(data)
    settagName(data.attributes.name)
    handleCreateTag()
   }

   let deleteData=(data)=>{

    seteditData(data)
    settagName(data.attributes.name)
    createupdatetag('Draft')

  }

  let createupdatetag=(status)=>{
    if (!tagName) {
      setMessage('Please enter tagName field');
      return;
    }

    let request = {
      data: {
        name: tagName,
        status
      },
    };

    if(!editData){
      createTag(request)
      .then((res) => {
        responseHandled(res)
      })
      .catch((err) => {
        setMessage(err);
      });
    }else{
      updateTag(request,editData.id)
      .then((res) => {
        responseHandled(res)
      })
      .catch((err) => {
        setMessage(err);
      });
    }

  }
 

  let responseHandled=(res)=>{
    if (res?.error?.message) {
      setMessage(res?.error?.message);
      return;
    }
    resetdata()
    gettags()
    handleCreateTagClose();
  }

  let resetdata=()=>{
    settagName('')
    seteditData('')
  }

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
          <button
            className="button-lightBlue-outline py-2 px-4 ms-3"
            onClick={toggleBulkTagDrawer("right", true)}
          >
            <p>Bulk Add Tags</p>
          </button>
          <button
            className="button-gradient py-2 px-4 ms-3"
            onClick={handleCreateTag}
          >
            <p>+ Create Tag</p>
          </button>

          <Dialog
            open={openCreateTag}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCreateTagClose}
            aria-describedby="alert-dialog-slide-description"
            maxWidth="sm"
            fullWidth={true}
          >
            <DialogTitle>
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column ">
                  <h5 className="text-lightBlue fw-500">
                  {!editData?'Create Tags':'Update Tags'}

                     </h5>

                  <small className="text-grey-6 mt-1 d-block">
                    ⓘ Some Dummy Content to explain
                  </small>
                </div>
                <img
                  src={cancel}
                  alt="cancel"
                  width={30}
                  onClick={handleCreateTagClose}
                  className="c-pointer"
                />
              </div>
            </DialogTitle>
            <hr className="hr-grey-6 my-0" />

            <DialogContent className="py-3 px-4">
              <p className="text-lightBlue mb-2">Tag Name</p>
              <FormControl className="col-7 px-0">
                <OutlinedInput  
                value={tagName}
                onChange={(e) => settagName(e.target.value)}
                placeholder="Enter Tag Name" size="small" />
              </FormControl>
           
              {/* <div className="d-flex">
                <Chip
                  label="Silver Products"
                  onDelete={handleDelete}
                  size="small"
                  className="mt-3 me-2"
                />
                <Chip
                  label="Diamond Products"
                  onDelete={handleDelete}
                  className="me-2 mt-3"
                  size="small"
                />
              </div> */}
            </DialogContent>
            <hr className="hr-grey-6 my-0" />
            <DialogActions className="d-flex justify-content-between px-4 py-3">
              <button
                className="button-grey py-2 px-5"
                onClick={handleCreateTagClose}
              >
                <p className="text-lightBlue">Cancel</p>
              </button>
              <button
                className="button-gradient py-2 px-5"
                onClick={e=>{
                  createupdatetag('Active')
                }}
              >
                <p>Save</p>
              </button>
            </DialogActions>
          </Dialog>

          <SwipeableDrawer
            anchor="right"
            open={state["right"]}
            onClose={toggleBulkTagDrawer("right", false)}
            onOpen={toggleBulkTagDrawer("right", true)}
            className="bulk-drawer"
          >
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
                  onClick={toggleBulkTagDrawer("right", false)}
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
                  value={category}
                  onChange={handleCategoryChange}
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
                      value={likeMatchRadio}
                      onChange={handleLikeMatchRadio}
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
                  <button
                    className="button-gradient py-1 px-4"
                    onClick={handleLikeAddCondition}
                  >
                    <p>Add Condition</p>
                  </button>
                </div>
                <div className="bg-black-9 align-items-center rounded-8 py-2 px-3 d-flex justify-content-between mt-3 shadow-lg">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={handleCheckboxChange}
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
                {likeApplyCondition && (
                  <div className="d-flex px-3 justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={checked}
                            onChange={handleCheckboxChange}
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
                {likeAddCondition && (
                  <div className="row">
                    <div className="col-sm-6 col-md-3 mt-3 mb-1 ps-4">
                      <p className="text-lightBlue mb-1">Field</p>

                      <FormControl className="w-100 px-0" size="small">
                        <Select
                          labelId="demo-select-small"
                          id="demo-select-small"
                          value={field}
                          onChange={handleFieldChange}
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
                          value={operator}
                          onChange={handleOperatorChange}
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
                      <button
                        className="button-gradient py-1 px-3 w-100 mb-2"
                        onClick={handleLikeApplyCondition}
                      >
                        <p>Apply</p>
                      </button>
                      <button
                        className="button-lightBlue-outline py-1 px-3 w-100"
                        onClick={handleLikeApplyCondition}
                      >
                        <p>Cancel</p>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {likeApplyCondition && (
                <React.Fragment>
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
                          numSelected={selected.length}
                          order={order}
                          orderBy={orderBy}
                          onSelectAllClick={handleLikeSelectAllClick}
                          onRequestSort={handleRequestSort}
                          rowCount={likeProductRows.length}
                          headCells={likeHeadCells}
                        />
                        <TableBody>
                          {stableSort(
                            likeProductRows,
                            getComparator(order, orderBy)
                          )
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
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
                                      onClick={(event) =>
                                        handleClick(event, row.pId)
                                      }
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
                      count={likeProductRows.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      className="table-pagination"
                    />
                  </div>
                </React.Fragment>
              )}
            </div>

            <div className="d-flex flex-column py-3 px-4 bulk-buttons">
              <hr className="hr-grey-6 my-3 w-100" />
              <div className="d-flex justify-content-between">
                <button
                  className="button-gradient py-2 px-5 w-auto "
                  onClick={toggleBulkTagDrawer("right", false)}
                >
                  <p>Add to 53 Products</p>
                </button>
                <button
                  className="button-lightBlue-outline py-2 px-4"
                  onClick={toggleBulkTagDrawer("right", false)}
                >
                  ><p>Cancel</p>
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
              value={value}
              onChange={handleChange}
              aria-label="scrollable force tabs example"
              className="tabs"
            >
              <Tab label="All" className="tabs-head" />{" "}
              <Tab label="Archived" className="tabs-head" />
            </Tabs>
          </Box>
          <div className="d-flex align-items-center mt-3 mb-3 px-2 justify-content-between">
            <TableSearch />
          </div>
          <TabPanel value={value} index={0}>
            <TagsManagerTable   list={allTags}  edit={edit} deleteData={deleteData}/>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TagsManagerTable   list={allTagsArchived}/>
          </TabPanel>
        </Paper>
      </div>
    </div>
  );
};

export default TagsManager;
