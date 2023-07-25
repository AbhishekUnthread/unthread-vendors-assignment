import React, { useEffect, useMemo, useReducer, useState } from "react";
import "./AllProducts.scss";
import { useDropzone } from "react-dropzone";
import { Link, useSearchParams } from "react-router-dom";
// ! IMAGES IMPORTS
import indiaFlag from "../../../assets/images/products/indiaFlag.svg";
import columns from "../../../assets/icons/columns.svg";
import cancel from "../../../assets/icons/cancel.svg";
import tutorial from "../../../assets/icons/tutorial.svg";
import allFlag from "../../../assets/images/products/allFlag.svg";
import usaFlag from "../../../assets/images/products/usaFlag.svg";
import ukFlag from "../../../assets/images/products/ukFlag.svg";
import arrowDown from "../../../assets/icons/arrowDown.svg";
import sort from "../../../assets/icons/sort.svg";
import uploadLineSheet from "../../../assets/images/products/uploadLineSheet.svg";
import uploadCompanySheet1 from "../../../assets/images/products/uploadCompanySheet1.svg";
import uploadCompanySheet2 from "../../../assets/images/products/uploadCompanySheet2.svg";
import info from "../../../assets/icons/info.svg";
import filter from "../../../assets/icons/filter.svg";
import products from "../../../assets/icons/sidenav/products.svg";
// ! COMPONENT IMPORTS
import AllProductsTable from "./AllProductsTable";
import TabPanel from "../../../components/TabPanel/TabPanel";
// ! MATERIAL IMPORTS
import {
  Autocomplete,
  Box,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  OutlinedInput,
  Paper,
  Popover,
  Radio,
  RadioGroup,
  Slide,
  SwipeableDrawer,
  Tab,
  Tabs,
  TextField,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
// ! MATERIAL ICONS IMPORTS
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import TableSearch from "../../../components/TableSearch/TableSearch";
import ViewLogsDrawer from "../../../components/ViewLogsDrawer/ViewLogsDrawer";
import { useBulkEditProductMutation, useEditProductMutation, useGetAllProductsQuery } from "../../../features/products/product/productApiSlice";
import { useGetAllVendorsQuery } from "../../../features/parameters/vendors/vendorsApiSlice";
import {
  useGetAllCategoriesQuery,
  useGetAllSubCategoriesQuery,
} from "../../../features/parameters/categories/categoriesApiSlice";
import { useGetAllCollectionsQuery } from "../../../features/parameters/collections/collectionsApiSlice";
import { useGetAllTagsQuery } from "../../../features/parameters/tagsManager/tagsManagerApiSlice";

// ? FILTER ACCORDIAN STARTS HERE
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  // border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem", color: "#c8d8ff" }} />
    }
    {...props}
  />
))(({ theme }) => ({
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    padding: "0px",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: "0 16px ",
}));
// ? FILTER ACCORDIAN ENDS HERE

// ? DIALOG TRANSITION STARTS HERE
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// ? DIALOG TRANSITION ENDS HERE

// ? FILE UPLOAD STARTS HERE
const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "0",
  borderWidth: 2,
  borderRadius: 8,
  borderColor: "#38395c",
  borderStyle: "dashed",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  cursor: "pointer",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};
// ? FILE UPLOAD ENDS HERE

const taggedWithData = [
  { title: "Tag 1", value: "tag1" },
  { title: "Tag 2", value: "tag2" },
  { title: "Tag 3", value: "tag3" },
  { title: "Tag 4", value: "tag4" },
  { title: "Tag 5", value: "tag5" },
  { title: "Tag 6", value: "tag6" },
  { title: "Tag 7", value: "tag7" },
  { title: "Tag 8", value: "tag8" },
  { title: "Tag 9", value: "tag9" },
  { title: "Tag 10", value: "tag10" },
  { title: "Tag 11", value: "tag11" },
  { title: "Tag 12", value: "tag12" },
];

const initialQueryFilterState = {
  pageSize: 10,
  pageNo: 1,
  totalCount: 0,
  title: "",
  category: null,
  subCategory: null,
  vendor: null,
  collection: null,
  tagManager: null,
};
const productTypeInitialState = {
  category: [],
  subCategory: [],
  tags: [],
  collection: [],
  vendor: [],
  isEditing: false,
};

const productTypeReducer = (state, action) => {
  if (action.type === "SET_CATEGORY_DATA") {
    return {
      ...state,
      category: action.data,
    };
  }
  if (action.type === "SET_SUB_CATEGORY_DATA") {
    return {
      ...state,
      subCategory: action.data,
    };
  }
  if (action.type === "SET_TAG_DATA") {
    return {
      ...state,
      tags: action.data,
    };
  }
  if (action.type === "SET_COLLECTION_DATA") {
    return {
      ...state,
      collection: action.data,
    };
  }

  if (action.type === "SET_VENDOR_DATA") {
    return {
      ...state,
      vendor: action.data,
    };
  }

  if (action.type === "ENABLE_EDIT") {
    return {
      ...state,
      isEditing: true,
    };
  }
  if (action.type === "DISABLE_EDIT") {
    return {
      ...state,
      isEditing: false,
    };
  }
  return productTypeInitialState;
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
  if (action.type === "SEARCH") {
    return {
      ...state,
      pageNo: initialQueryFilterState.pageNo,
      title: action.name,
    };
  }
  if (action.type === "SEARCH_CATEGORY") {
    return {
      ...state,
      pageNo: initialQueryFilterState.pageNo,
      category: action.data,
    };
  }
  if (action.type === "SEARCH_SUB_CATEGORY") {
    return {
      ...state,
      pageNo: initialQueryFilterState.pageNo,
      subCategory: action.data,
    };
  }
  if (action.type === "SEARCH_COLLECTION") {
    return {
      ...state,
      pageNo: initialQueryFilterState.pageNo,
      collection: action.data,
    };
  }
  if (action.type === "SEARCH_TAG") {
    return {
      ...state,
      pageNo: initialQueryFilterState.pageNo,
      tagManager: action.data,
    };
  }
  if (action.type === "SEARCH_VENDOR") {
    return {
      ...state,
      pageNo: initialQueryFilterState.pageNo,
      vendor: action.data,
    };
  }
  return initialQueryFilterState;
};

const AllProducts = () => {
  const [productTypeState, dispatchProductType] = useReducer(
    productTypeReducer,
    productTypeInitialState
  );
  const [queryFilterState, dispatchQueryFilter] = useReducer(
    queryFilterReducer,
    initialQueryFilterState
  );
  const [productType, setProductType] = React.useState(0);
  const [valueExport, setExportValue] = React.useState(0);
  const [importValue, setImportValue] = React.useState("importProducts");
  const [sortFilter, setSortFilter] = React.useState("newestToOldest");
  const [statusFilter, setStatusFilter] = React.useState([]);
  const [importSecondValue, setImportSecondValue] =
    React.useState("uploadLineSheet");
  const [searchValue, setSearchValue] = useState("");
  const [productList, SetProductList] = useState([]);
  const [totalProduct, setTotalProduct] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [chipData, setChipData] = useState([]);

  const filterParameter = {};

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    dispatchQueryFilter({ type: "SEARCH", name: event.target.value });
    setChipData((data) => {
      // Filter out any chip that starts with "title"
      const filteredData = data.filter((item) => !item.startsWith("title"));

      // If event.target.value is not empty, add the new title chip
      if (event.target.value.trim() !== "") {
        filteredData.push(`title is ${event.target.value}`);
      }

      return filteredData;
    });
  };

  if (sortFilter) {
    if (
      sortFilter === "alphabeticalAtoZ" ||
      sortFilter === "alphabeticalZtoA"
    ) {
      filterParameter.alphabetical =
        sortFilter === "alphabeticalAtoZ" ? "1" : "-1";
    } else if (
      sortFilter === "oldestToNewest" ||
      sortFilter === "newestToOldest"
    ) {
      filterParameter.createdAt = sortFilter === "oldestToNewest" ? "1" : "-1";
    }
  }

  const ProductTypeQuery =
    productType === 0
      ? {
          createdAt: -1,
          status:
            statusFilter.length > 0
              ? statusFilter
              : "active,in-active,scheduled",
        }
      : productType === 1
      ? { createdAt: -1, status: "active" }
      : productType === 2
      ? { createdAt: -1, status: "in-active" }
      : productType === 3
      ? { createdAt: -1, status: "archived" }
      : {};

  const filterParams = { ...filterParameter, ...ProductTypeQuery };

  const {
    data: productsData,
    isLoading: productsIsLoading,
    isSuccess: productsIsSuccess,
    error: productsError,
  } = useGetAllProductsQuery({ ...filterParams, ...queryFilterState });

  const {
    data: vendorsData, // Data received from the useGetAllVendorsQuery hook
    isLoading: vendorsIsLoading, // Loading state of the vendors data
    isSuccess: vendorsIsSuccess, // Success state of the vendors data
    error: vendorsError, // Error state of the vendors data
  } = useGetAllVendorsQuery();

  const {
    data: categoriesData,
    isLoading: categoriesIsLoading,
    isSuccess: categoriesIsSuccess,
    error: categoriesError,
  } = useGetAllCategoriesQuery();

  const {
    data: subCategoriesData,
    isLoading: subCategoriesIsLoading,
    isSuccess: subCategoriesIsSuccess,
    error: subCategoriesError,
  } = useGetAllSubCategoriesQuery();

  const {
    data: tagsData,
    isLoading: tagsIsLoading,
    isSuccess: tagsIsSuccess,
    error: tagsError,
  } = useGetAllTagsQuery();

  const {
    data: collectionData,
    isLoading: collectionIsLoading,
    isSuccess: collectionIsSuccess,
    error: collectionError,
  } = useGetAllCollectionsQuery();

  const [
    editProduct,
    {
      isLoading: editProductIsLoading,
      isSuccess: editProductIsSuccess,
      error: editProductError,
    },
  ] = useEditProductMutation();

  const [
    bulkUpdateProduct,
    {
      isLoading: bulkCreateTagsIsLoading,
      isSuccess: bulkCreateTagsIsSuccess,
      error: bulkCreateTagsError,
    },
  ] = useBulkEditProductMutation();

  useEffect(() => {
    if (productsIsSuccess && productsData?.data?.data) {
      SetProductList(productsData?.data?.data);
      setTotalProduct(productsData?.data?.totalCount);
    }
  }, [productsIsSuccess, productsData]);

  useEffect(() => {
    if (categoriesIsSuccess) {
      dispatchProductType({
        type: "SET_CATEGORY_DATA",
        data: categoriesData?.data?.data,
      });
    }
    if (subCategoriesIsSuccess) {
      dispatchProductType({
        type: "SET_SUB_CATEGORY_DATA",
        data: subCategoriesData?.data?.data,
      });
    }

    if (tagsIsSuccess) {
      dispatchProductType({ type: "SET_TAG_DATA", data: tagsData?.data?.data });
    }

    if (vendorsIsSuccess) {
      dispatchProductType({
        type: "SET_VENDOR_DATA",
        data: vendorsData?.data?.data,
      });
    }

    if (collectionIsSuccess) {
      dispatchProductType({
        type: "SET_COLLECTION_DATA",
        data: collectionData?.data?.data,
      });
    }
  }, [
    categoriesIsSuccess,
    subCategoriesIsSuccess,
    tagsIsSuccess,
    vendorsIsSuccess,
    collectionIsSuccess,
  ]);

  const handleDelete = (item) => {
    setChipData(chipData.filter((i) => i !== item));
    if (item.startsWith("vendor")) {
      dispatchQueryFilter({
        type: "SEARCH_VENDOR",
        data: null,
      });
    }
    if (item.startsWith("Tag")) {
      dispatchQueryFilter({
        type: "SEARCH_TAG",
        data: null,
      });
    }
    if (item.startsWith("Category")) {
      dispatchQueryFilter({
        type: "SEARCH_CATEGORY",
        data: null,
      });
    }
    if (item.startsWith("Sub")) {
      dispatchQueryFilter({
        type: "SEARCH_SUB_CATEGORY",
        data: null,
      });
    }
    if (item.startsWith("Collection")) {
      dispatchQueryFilter({
        type: "SEARCH_COLLECTION",
        data: null,
      });
    }
    if (item.startsWith("title")) {
      dispatchQueryFilter({ type: "SEARCH", name: "" });
      setSearchValue("");
    }
  };

  function handleVendorChange(e, newValue) {
    dispatchQueryFilter({
      type: "SEARCH_VENDOR",
      data: newValue?.name || null,
    });
    if (newValue?.name) {
      setChipData((data) => {
        // Filter out any chip that starts with
        const filteredData = data.filter((item) => !item.startsWith("vendor"));
        filteredData.push(`vendor is ${newValue?.name}`);

        return filteredData;
      });
    } else {
      setChipData((data) => {
        // Filter out any chip that starts with
        const filteredData = data.filter((item) => !item.startsWith("vendor"));

        return filteredData;
      });
    }
  }

  function handleTagChange(e, newValue) {
    dispatchQueryFilter({
      type: "SEARCH_TAG",
      data: newValue?.name || null,
    });
    if (newValue?.name) {
      setChipData((data) => {
        // Filter out any chip that starts with
        const filteredData = data.filter((item) => !item.startsWith("Tag"));
        filteredData.push(`Tag is ${newValue?.name}`);

        return filteredData;
      });
    } else {
      setChipData((data) => {
        // Filter out any chip that starts with
        const filteredData = data.filter((item) => !item.startsWith("Tag"));

        return filteredData;
      });
    }
  }

  function handleCategoryChange(e, newValue) {
    dispatchQueryFilter({
      type: "SEARCH_CATEGORY",
      data: newValue?.name || null,
    });
    if (newValue?.name) {
      setChipData((data) => {
        // Filter out any chip that starts with
        const filteredData = data.filter(
          (item) => !item.startsWith("Category")
        );
        filteredData.push(`Category is ${newValue?.name}`);

        return filteredData;
      });
    } else {
      setChipData((data) => {
        // Filter out any chip that starts with
        const filteredData = data.filter(
          (item) => !item.startsWith("Category")
        );

        return filteredData;
      });
    }
  }

  function handleSubCategoryChange(e, newValue) {
    dispatchQueryFilter({
      type: "SEARCH_SUB_CATEGORY",
      data: newValue?.name || null,
    });
    if (newValue?.name) {
      setChipData((data) => {
        // Filter out any chip that starts with
        const filteredData = data.filter((item) => !item.startsWith("Sub"));
        filteredData.push(`Sub category is ${newValue?.name}`);

        return filteredData;
      });
    } else {
      setChipData((data) => {
        // Filter out any chip that starts with
        const filteredData = data.filter((item) => !item.startsWith("Sub"));

        return filteredData;
      });
    }
  }
  function handleCollectionChange(e, newValue) {
    dispatchQueryFilter({
      type: "SEARCH_COLLECTION",
      data: newValue?.title || null,
    });
    if (newValue?.name) {
      setChipData((data) => {
        // Filter out any chip that starts with
        const filteredData = data.filter(
          (item) => !item.startsWith("Collection")
        );
        filteredData.push(`Collection is ${newValue?.name}`);

        return filteredData;
      });
    } else {
      setChipData((data) => {
        // Filter out any chip that starts with
        const filteredData = data.filter(
          (item) => !item.startsWith("Collection")
        );

        return filteredData;
      });
    }
  }

  function clearAllFilter() {
    setChipData([]);
    dispatchQueryFilter({
      type: "SEARCH_VENDOR",
      data: null,
    });
    dispatchQueryFilter({
      type: "SEARCH_TAG",
      data: null,
    });
    dispatchQueryFilter({
      type: "SEARCH_CATEGORY",
      data: null,
    });
    dispatchQueryFilter({
      type: "SEARCH_SUB_CATEGORY",
      data: null,
    });
    dispatchQueryFilter({
      type: "SEARCH_COLLECTION",
      data: null,
    });
    dispatchQueryFilter({ type: "SEARCH", name: "" });
    setSearchValue("");
    setStatusFilter([]);
  }

  const handleImportChange = (event, newValue) => {
    setImportValue(newValue);
  };
  const handleImportSecondChange = (event, newValue) => {
    setImportSecondValue(newValue);
  };

  const handleChange = (event, tabIndex) => {
    setProductType(tabIndex);
    dispatchQueryFilter({ type: "SEARCH", name: "" });
    setSearchParams({ status: tabIndex });
    setSearchValue("");
  };

  const handleStatusChange = (event) => {
    const selectedStatus = event.target.value;
    if (event.target.value) {
      if (statusFilter.length === 0) {
        let item = [];
        item.push(selectedStatus);
        setStatusFilter(item);
      }
      if (statusFilter.length > 0 && statusFilter.includes(selectedStatus)) {
        setStatusFilter((item) => item.filter((i) => i !== selectedStatus));
      }
      if (statusFilter.length > 0 && !statusFilter.includes(selectedStatus)) {
        let item = [...statusFilter];
        item.push(selectedStatus);
        setStatusFilter(item);
      }
    }
  };
  const handleExportChange = (event, newValue) => {
    setExportValue(newValue);
  };

  const handleChangeRowsPerPage = (event) => {
    dispatchQueryFilter({ type: "SET_PAGE_SIZE", value: event.target.value });
  };

  const handleChangePage = (_, pageNo) => {
    dispatchQueryFilter({ type: "CHANGE_PAGE", pageNo:pageNo+1 });
  };

  // ? FILTER DRAWER STARTS HERE
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
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

  // ? POPOVERS STARTS HERE

  // * FLAG POPOVERS STARTS
  const [anchorFlagEl, setAnchorFlagEl] = React.useState(null);
  const handleFlagClick = (event) => {
    setAnchorFlagEl(event.currentTarget);
  };
  const handleFlagClose = () => {
    setAnchorFlagEl(null);
  };
  const openFlag = Boolean(anchorFlagEl);
  const idFlag = openFlag ? "simple-popover" : undefined;
  // * FLAG POPOVERS ENDS

  // * SAVE FILTER POPOVERS STARTS
  const [anchorSaveFilterEl, setAnchorSaveFilterEl] = React.useState(null);
  const handleSaveFilterClick = (event) => {
    setAnchorSaveFilterEl(event.currentTarget);
  };
  const handleSaveFilterClose = () => {
    setAnchorSaveFilterEl(null);
  };
  const openSaveFilter = Boolean(anchorSaveFilterEl);
  const idSaveFilter = openSaveFilter ? "simple-popover" : undefined;
  // * SAVE FILTER POPOVERS ENDS

  // * COLUMNS POPOVERS STARTS
  const [anchorColumnsEl, setAnchorColumnsEl] = React.useState(null);

  const handleColumnsClick = (event) => {
    setAnchorColumnsEl(event.currentTarget);
  };

  const handleColumnsClose = () => {
    setAnchorColumnsEl(null);
  };

  const openColumns = Boolean(anchorColumnsEl);
  const idColumns = openColumns ? "simple-popover" : undefined;
  // * COLUMNS POPOVERS ENDS

  // * SORT POPOVERS STARTS
  const [anchorSortEl, setAnchorSortEl] = React.useState(null);

  const handleSortClick = (event) => {
    setAnchorSortEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setAnchorSortEl(null);
  };

  const openSort = Boolean(anchorSortEl);
  const idSort = openSort ? "simple-popover" : undefined;
  // * SORT POPOVERS ENDS

  // * VENDOR POPOVERS STARTS
  const [anchorVendorEl, setAnchorVendorEl] = React.useState(null);

  const handleVendorClick = (event) => {
    setAnchorVendorEl(event.currentTarget);
  };

  const handleVendorClose = () => {
    setAnchorVendorEl(null);
  };

  const openVendor = Boolean(anchorVendorEl);
  const idVendor = openVendor ? "simple-popover" : undefined;
  // * VENDOR POPOVERS ENDS

  // * CATEGORY POPOVERS STARTS
  const [anchorCategoryEl, setAnchorCategoryEl] = React.useState(null);

  const handleCategoryClick = (event) => {
    setAnchorCategoryEl(event.currentTarget);
  };

  const handleCategoryClose = () => {
    setAnchorCategoryEl(null);
  };

  const openCategory = Boolean(anchorCategoryEl);
  const idCategory = openCategory ? "simple-popover" : undefined;
  // * CATEGORY POPOVERS ENDS

  // * TAGGED WITH POPOVERS STARTS
  const [anchorTaggedWithEl, setAnchorTaggedWithEl] = React.useState(null);

  const handleTaggedWithClick = (event) => {
    setAnchorTaggedWithEl(event.currentTarget);
  };

  const handleTaggedWithClose = () => {
    setAnchorTaggedWithEl(null);
  };

  const openTaggedWith = Boolean(anchorTaggedWithEl);
  const idTaggedWith = openTaggedWith ? "simple-popover" : undefined;
  // * TAGGED WITH POPOVERS ENDS

  // ? POPOVERS ENDS HERE

  // ? FILTER ACCORDIAN STARTS HERE
  const [expanded, setExpanded] = React.useState("panel1");

  const handleAccordianChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  // ? FILTER ACCORDIAN ENDS HERE

  // ? EXPORT DIALOG STARTS HERE
  const [openExport, setOpenExport] = React.useState(false);

  const handleExportOpen = () => {
    setOpenExport(true);
  };

  const handleExportClose = () => {
    setOpenExport(false);
  };
  // ? EXPORT DIALOG ENDS HERE

  // ? IMPORT DIALOG STARTS HERE
  const [openImport, setOpenImport] = React.useState(false);

  const handleImportOpen = () => {
    setOpenImport(true);
  };

  const handleImportClose = () => {
    setOpenImport(false);
  };
  // ? IMPORT DIALOG ENDS HERE

  // ? IMPORT SECOND DIALOG STARTS HERE
  const [openImportSecond, setOpenImportSecond] = React.useState(false);

  const handleImportSecondOpen = () => {
    setOpenImport(false);
    setOpenImportSecond(true);
  };

  const handleSortRadioChange = (event) => {
    setSortFilter(event.target.value);
    setAnchorSortEl(null); // Close the popover after selecting a value
  };

  const handleImportSecondClose = () => {
    setOpenImportSecond(false);
  };
  // ? IMPORT SECOND DIALOG ENDS HERE

  // ? FILE UPLOAD STARTS HERE
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        "image/*": [".jpeg", ".jpg", ".png"],
      },
    });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );
  // ? FILE UPLOAD ENDS HERE

  useEffect(() => {
    if (+searchParams.get("status") === 0) {
      setProductType(0);
    } else if (+searchParams.get("status") === 1) {
      setProductType(1);
    } else if (+searchParams.get("status") === 2) {
      setProductType(2);
    } else if (+searchParams.get("status") === 3) {
      setProductType(3);
    }
  }, [searchParams]);

  return (
    <div className="container-fluid page">
      <div className="row justify-content-between align-items-center">
        <h4 className="page-heading w-auto ps-0">All Products</h4>
        <div className="d-flex align-items-center w-auto pe-0">
          <button className="button-transparent me-1 py-2 px-3">
            <img src={tutorial} alt="tutorial" className="me-2" width={20} />
            <p className="text-blue-gradient">Tutorial</p>
          </button>
          <ViewLogsDrawer headingName={"Product Module"} icon={products} />
          <button
            className="button-transparent me-1 py-2 px-3"
            onClick={handleExportOpen}
          >
            <p className="text-lightBlue">Export</p>
          </button>

          <button
            className="button-transparent me-3 py-2 px-3 me-3"
            onClick={handleImportOpen}
          >
            <p className="text-lightBlue">Import</p>
          </button>
          <Link
            to="/products/allProducts/addProduct"
            className="button-gradient py-2 px-4"
          >
            <p>+ Add Product</p>
          </Link>
        </div>
        <Dialog
          open={openExport}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleExportClose}
          aria-describedby="alert-dialog-slide-description"
          maxWidth="sm"
          fullWidth={true}
        >
          <DialogTitle>
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="text-lightBlue fw-500">Export Products</h5>
              <img
                src={cancel}
                alt="cancel"
                width={30}
                onClick={handleExportClose}
                className="c-pointer"
              />
            </div>
          </DialogTitle>
          <hr className="hr-grey-6 my-0" />
          <DialogContent className="py-3 px-4">
            <p className="text-lightBlue mb-2">Export</p>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={valueExport}
                onChange={handleExportChange}
              >
                <FormControlLabel
                  value="currentPage"
                  control={<Radio size="small" />}
                  label="Current Page"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: 13,
                      color: "#c8d8ff",
                    },
                  }}
                />
                <FormControlLabel
                  value="allProducts"
                  control={<Radio size="small" />}
                  label="All Products"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: 13,
                      color: "#c8d8ff",
                    },
                  }}
                />
              </RadioGroup>
            </FormControl>
            <p className="text-lightBlue mb-2 mt-3">Export as</p>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={valueExport}
                onChange={handleExportChange}
              >
                <FormControlLabel
                  value="csvForExcel"
                  control={<Radio size="small" />}
                  label="CSV for Excel, Number or other Spreadsheet program"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: 13,
                      color: "#c8d8ff",
                    },
                  }}
                />
                <FormControlLabel
                  value="plainCsvFile"
                  control={<Radio size="small" />}
                  label="Plain CSV File"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: 13,
                      color: "#c8d8ff",
                    },
                  }}
                />
              </RadioGroup>
            </FormControl>
            <p className="text-lightBlue mb-2 mt-3">HTML format</p>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={valueExport}
                onChange={handleExportChange}
              >
                <FormControlLabel
                  value="normalText"
                  control={<Radio size="small" />}
                  label="Normal Text"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: 13,
                      color: "#c8d8ff",
                    },
                  }}
                />
                <FormControlLabel
                  value="htmlCodedText"
                  control={<Radio size="small" />}
                  label="HTML Coded Text"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: 13,
                      color: "#c8d8ff",
                    },
                  }}
                />
              </RadioGroup>
            </FormControl>
          </DialogContent>
          <hr className="hr-grey-6 my-0" />
          <DialogActions className="d-flex justify-content-between px-4 py-3">
            <button
              className="button-grey py-2 px-5"
              onClick={handleExportClose}
            >
              <p className="text-lightBlue">Cancel</p>
            </button>
            <button
              className="button-gradient py-2 px-5"
              onClick={handleExportClose}
            >
              <p className="">Continue</p>
            </button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openImport}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleImportClose}
          aria-describedby="alert-dialog-slide-description"
          maxWidth="sm"
          fullWidth={true}
        >
          <DialogTitle>
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="text-lightBlue fw-500">Import Products</h5>
              <img
                src={cancel}
                alt="cancel"
                width={30}
                onClick={handleImportClose}
                className="c-pointer"
              />
            </div>
          </DialogTitle>
          <hr className="hr-grey-6 my-0" />
          <DialogContent className="py-2 px-4">
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={importValue}
                onChange={handleImportChange}
              >
                <FormControlLabel
                  value="importProducts"
                  control={<Radio size="small" />}
                  label="Import Products from Existing Site"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: 13,
                      color: "#c8d8ff",
                    },
                  }}
                />
                <FormControlLabel
                  value="bulkImportProducts"
                  control={<Radio size="small" />}
                  label="Bulk Import Products"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: 13,
                      color: "#c8d8ff",
                    },
                  }}
                />
              </RadioGroup>
            </FormControl>
          </DialogContent>
          <hr className="hr-grey-6 my-0" />
          <DialogActions className="d-flex justify-content-between px-4 py-3">
            <button
              className="button-grey py-2 px-5"
              onClick={handleImportClose}
            >
              <p className="text-lightBlue">Cancel</p>
            </button>
            <button
              className="button-gradient py-2 px-5"
              onClick={handleImportSecondOpen}
            >
              <p>Continue</p>
            </button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openImportSecond}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleImportSecondClose}
          aria-describedby="alert-dialog-slide-description"
          maxWidth="sm"
          fullWidth={true}
        >
          <DialogTitle>
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="text-lightBlue fw-500">Import Products</h5>
              <img
                src={cancel}
                alt="cancel"
                width={30}
                onClick={handleImportSecondClose}
                className="c-pointer"
              />
            </div>
          </DialogTitle>
          <hr className="hr-grey-6 my-0" />
          <DialogContent className="py-2 px-4">
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={importSecondValue}
                onChange={handleImportSecondChange}
              >
                <FormControlLabel
                  value="uploadCompanySheet"
                  control={<Radio size="small" />}
                  label="Upload Company line sheet"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: 13,
                      color: "#c8d8ff",
                    },
                  }}
                />

                <FormControlLabel
                  value="uploadLineSheet"
                  control={<Radio size="small" />}
                  label="Upload your own line sheet"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: 13,
                      color: "#c8d8ff",
                    },
                  }}
                />

                {importSecondValue === "uploadCompanySheet" && (
                  <div className="d-flex flex-column">
                    <small className="text-grey-6"> Note :</small>
                    <small className="text-grey-6">
                      1. Upload the skeleton file and Map it with the Company
                      Data.
                    </small>
                    <small className="text-grey-6">
                      2. You can watch the Tutorial on how to do it.&nbsp;
                      <span className="text-blue-gradient c-pointer">
                        Watch here
                      </span>
                    </small>
                    <small className="text-grey-6">
                      3. Do not upload more than 50 products at a time.
                    </small>
                    <small className="text-grey-6">
                      4. Select the folder containing Product Images with
                      Product folder name equal to SKU
                    </small>
                    <small className="text-grey-6">
                      5. Products should be uploaded successfully.
                    </small>
                    <div {...getRootProps({ style })} className="mt-3">
                      <input
                        id="primary"
                        {...getInputProps()}
                        // onChange={(event) => {
                        //   uploadFileToCloud(event, "primary");
                        //   event.target.value = null;
                        // }}
                      />
                      <img src={uploadCompanySheet1} className="w-100" alt="" />
                    </div>
                    <small className="mt-2 text-lightBlue">
                      Don't have our line sheet?&nbsp;
                      <span className="text blue-gradient c-pointer">
                        Download here
                      </span>
                    </small>
                    <div {...getRootProps({ style })} className="mt-3 mb-3">
                      <input
                        id="primary"
                        {...getInputProps()}
                        // onChange={(event) => {
                        //   uploadFileToCloud(event, "primary");
                        //   event.target.value = null;
                        // }}
                      />
                      <img src={uploadCompanySheet2} className="w-100" alt="" />
                    </div>
                  </div>
                )}
              </RadioGroup>
            </FormControl>
            {importSecondValue === "uploadLineSheet" && (
              <div className="d-flex flex-column">
                <small className="text-grey-6"> Note :</small>
                <small className="text-grey-6">
                  1. Upload the skeleton file and Map it with the Company Data.
                </small>
                <small className="text-grey-6">
                  2. You can watch the Tutorial on how to do it.&nbsp;
                  <span className="text-blue-gradient c-pointer">
                    Watch here
                  </span>
                </small>
                <small className="text-grey-6">
                  3. Do not upload more than 50 products at a time.
                </small>
                <small className="text-grey-6">
                  4. Select the folder containing Product Images with Product
                  folder name equal to SKU
                </small>
                <small className="text-grey-6">
                  5. Products should be uploaded successfully.
                </small>
                <div {...getRootProps({ style })} className="mt-3">
                  <input
                    id="primary"
                    {...getInputProps()}
                    // onChange={(event) => {
                    //   uploadFileToCloud(event, "primary");
                    //   event.target.value = null;
                    // }}
                  />
                  <img src={uploadLineSheet} className="w-100" alt="" />
                </div>
                <small className="mt-2 text-lightBlue">
                  Please make sure to leave a single row at the top of the Sheet
                </small>
              </div>
            )}
          </DialogContent>
          <hr className="hr-grey-6 my-0" />
          <DialogActions className="d-flex justify-content-between px-4 py-3">
            <button
              className="button-grey py-2 px-5"
              onClick={handleImportSecondClose}
            >
              <p className="text-lightBlue">Cancel</p>
            </button>
            <button
              className="button-gradient py-2 px-5"
              onClick={handleImportSecondClose}
            >
              <p>Continue</p>
            </button>
          </DialogActions>
        </Dialog>
      </div>
      <div className="row">
        <Paper
          sx={{ width: "100%", mb: 2, mt: 3, p: 0 }}
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
              value={productType}
              onChange={handleChange}
              aria-label="scrollable force tabs example"
              className="tabs"
            >
              <Tab label="All" className="tabs-head" />
              <Tab label="Active" className="tabs-head" />
              <Tab label="In Active" className="tabs-head" />
              <Tab label="Archived" className="tabs-head" />
            </Tabs>
            <div
              className="tabs-country c-pointer"
              aria-describedby={idFlag}
              variant="contained"
              onClick={handleFlagClick}
            >
              <img src={indiaFlag} alt="indiaFlag" height={15} />
              <p className="mx-2 text-lightBlue">India</p>
              <img src={arrowDown} alt="arrowDown" />
            </div>
            <Popover
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              id={idFlag}
              open={openFlag}
              anchorEl={anchorFlagEl}
              onClose={handleFlagClose}
            >
              <div className="px-1 py-2">
                <div className="d-flex align-items-center c-pointer hover-back px-3 py-1 my-1 rounded-3">
                  <img src={allFlag} alt="allFlag" height={20} />
                  <p className="ms-2 text-lightBlue">All</p>
                </div>
                <div className="d-flex align-items-center c-pointer hover-back px-3 py-1 my-1 rounded-3">
                  <img src={ukFlag} alt="usaFlag" height={15} />
                  <p className="ms-2 text-lightBlue">UK</p>
                </div>
                <div className="d-flex align-items-center c-pointer hover-back px-3 py-1 my-1 rounded-3">
                  <img src={usaFlag} alt="usaFlag" height={15} />
                  <p className="ms-2 text-lightBlue">USA</p>
                </div>
              </div>
            </Popover>
          </Box>
          <div className="d-flex align-items-center mt-3 px-2 justify-content-between">
            <TableSearch
              searchValue={searchValue}
              handleSearchChange={handleSearchChange}
            />
            <div className="d-flex">
              <div className="d-flex product-button__box ms-2">
                <button
                  className="button-grey py-2 px-3 d-none d-md-block"
                  aria-describedby={idVendor}
                  variant="contained"
                  onClick={handleVendorClick}
                >
                  <small className="text-lightBlue">Vendor</small>
                  <img src={arrowDown} alt="arrowDown" className="ms-2" />
                </button>
                <Popover
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  id={idVendor}
                  open={openVendor}
                  anchorEl={anchorVendorEl}
                  onClose={handleVendorClose}
                >
                  <div className="py-2">
                    <Autocomplete
                      id="free-solo-demo"
                      freeSolo
                      size="small"
                      options={productTypeState.vendor}
                      onChange={handleVendorChange}
                      getOptionLabel={(option) => option.name}
                      renderOption={(props, option) => (
                        <li {...props}>
                          <small className="text-lightBlue my-1">
                            {option.name}
                          </small>
                        </li>
                      )}
                      sx={{
                        width: 200,
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Search"
                          inputRef={(input) => input?.focus()}
                        />
                      )}
                    />
                  </div>
                </Popover>
                <button
                  className="button-grey py-2 px-3 d-none d-md-block"
                  aria-describedby={idCategory}
                  variant="contained"
                  onClick={handleCategoryClick}
                >
                  <small className="text-lightBlue">Category</small>
                  <img src={arrowDown} alt="arrowDown" className="ms-2" />
                </button>
                <Popover
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  id={idCategory}
                  open={openCategory}
                  anchorEl={anchorCategoryEl}
                  onClose={handleCategoryClose}
                >
                  <div className="py-2">
                    <Autocomplete
                      id="free-solo-demo"
                      freeSolo
                      size="small"
                      sx={{ width: 200 }}
                      options={productTypeState.category}
                      onChange={handleCategoryChange}
                      getOptionLabel={(option) => option.name}
                      renderOption={(props, option) => (
                        <li {...props}>
                          <small className="text-lightBlue my-1">
                            {option.name}
                          </small>
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Search"
                          inputRef={(input) => input?.focus()}
                        />
                      )}
                    />
                  </div>
                </Popover>

                <button
                  className="button-grey py-2 px-3 d-none d-md-block"
                  aria-describedby={idTaggedWith}
                  variant="contained"
                  onClick={handleTaggedWithClick}
                >
                  <small className="text-lightBlue">Tagged With</small>
                  <img src={arrowDown} alt="arrowDown" className="ms-2" />
                </button>

                <Popover
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  id={idTaggedWith}
                  open={openTaggedWith}
                  anchorEl={anchorTaggedWithEl}
                  onClose={handleTaggedWithClose}
                >
                  <div className="py-2">
                    <Autocomplete
                      id="free-solo-demo"
                      freeSolo
                      size="small"
                      options={productTypeState.tags}
                      onChange={handleTagChange}
                      getOptionLabel={(option) => option.name}
                      renderOption={(props, option) => (
                        <li {...props}>
                          <small className="text-lightBlue my-1">
                            {option.name}
                          </small>
                        </li>
                      )}
                      sx={{
                        width: 200,
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Search"
                          inputRef={(input) => input?.focus()}
                        />
                      )}
                    />
                  </div>
                </Popover>

                <React.Fragment key="right">
                  <button
                    className="button-grey py-2 px-3"
                    onClick={toggleDrawer("right", true)}
                  >
                    <small className="text-lightBlue">More Filters</small>
                    <img src={filter} alt="filter" className="ms-2" />
                  </button>
                  <SwipeableDrawer
                    anchor="right"
                    open={state["right"]}
                    onClose={toggleDrawer("right", false)}
                    onOpen={toggleDrawer("right", true)}
                  >
                    <div className="d-flex justify-content-between py-3 px-3 ms-2 me-1">
                      <h6 className="text-lightBlue">Filters</h6>
                      <img
                        src={cancel}
                        alt="cancel"
                        className="c-pointer filter-icon"
                        onClick={toggleDrawer("right", false)}
                      />
                    </div>

                    <div className="px-2">
                      <Accordion
                        expanded={expanded === "panel1"}
                        onChange={handleAccordianChange("panel1")}
                      >
                        <AccordionSummary
                          aria-controls="panel1d-content"
                          id="panel1d-header"
                        >
                          <p className="text-lightBlue">Product Category</p>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Autocomplete
                            id="free-solo-demo"
                            freeSolo
                            size="small"
                            onChange={handleCategoryChange}
                            options={productTypeState.category}
                            getOptionLabel={(option) => option.name}
                            renderOption={(props, option) => (
                              <li {...props}>
                                <small className="text-lightBlue my-1">
                                  {option.name}
                                </small>
                              </li>
                            )}
                            sx={{
                              width: "100%",
                            }}
                            renderInput={(params) => (
                              <TextField {...params} placeholder="Search" />
                            )}
                          />
                        </AccordionDetails>
                      </Accordion>
                      <Accordion
                        expanded={expanded === "panel2"}
                        onChange={handleAccordianChange("panel2")}
                      >
                        <AccordionSummary
                          aria-controls="panel2d-content"
                          id="panel2d-header"
                        >
                          <p className="text-lightBlue">Sub Category</p>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Autocomplete
                            id="free-solo-demo"
                            freeSolo
                            size="small"
                            onChange={handleSubCategoryChange}
                            options={productTypeState.subCategory}
                            getOptionLabel={(option) => option.name}
                            renderOption={(props, option) => (
                              <li {...props}>
                                <small className="text-lightBlue my-1">
                                  {option.name}
                                </small>
                              </li>
                            )}
                            sx={{
                              width: "100%",
                            }}
                            renderInput={(params) => (
                              <TextField {...params} placeholder="Search" />
                            )}
                          />
                        </AccordionDetails>
                      </Accordion>
                      <Accordion
                        expanded={expanded === "panel3"}
                        onChange={handleAccordianChange("panel3")}
                      >
                        <AccordionSummary
                          aria-controls="panel3d-content"
                          id="panel3d-header"
                        >
                          <p className="text-lightBlue">Vendor</p>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Autocomplete
                            id="free-solo-demo"
                            freeSolo
                            size="small"
                            onChange={handleVendorChange}
                            options={productTypeState.vendor}
                            getOptionLabel={(option) => option.name}
                            renderOption={(props, option) => (
                              <li {...props}>
                                <small className="text-lightBlue my-1">
                                  {option.name}
                                </small>
                              </li>
                            )}
                            sx={{
                              width: "100%",
                            }}
                            renderInput={(params) => (
                              <TextField {...params} placeholder="Search" />
                            )}
                          />
                        </AccordionDetails>
                      </Accordion>
                      <Accordion
                        expanded={expanded === "panel4"}
                        onChange={handleAccordianChange("panel4")}
                      >
                        <AccordionSummary
                          aria-controls="panel4d-content"
                          id="panel4d-header"
                        >
                          <p className="text-lightBlue">Collection</p>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Autocomplete
                            id="free-solo-demo"
                            freeSolo
                            size="small"
                            onChange={handleCollectionChange}
                            options={productTypeState.collection}
                            getOptionLabel={(option) => option.title}
                            renderOption={(props, option) => (
                              <li {...props}>
                                <small className="text-lightBlue my-1">
                                  {option.title}
                                </small>
                              </li>
                            )}
                            sx={{
                              width: "100%",
                            }}
                            renderInput={(params) => (
                              <TextField {...params} placeholder="Search" />
                            )}
                          />
                        </AccordionDetails>
                      </Accordion>
                      <Accordion
                        expanded={expanded === "panel5"}
                        onChange={handleAccordianChange("panel5")}
                      >
                        <AccordionSummary
                          aria-controls="panel5d-content"
                          id="panel5d-header"
                        >
                          <p className="text-lightBlue">Tagged With</p>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Autocomplete
                            id="free-solo-demo"
                            freeSolo
                            size="small"
                            onChange={handleTagChange}
                            options={productTypeState.tags}
                            getOptionLabel={(option) => option.name}
                            renderOption={(props, option) => (
                              <li {...props}>
                                <small className="text-lightBlue my-1">
                                  {option.name}
                                </small>
                              </li>
                            )}
                            sx={{
                              width: "100%",
                            }}
                            renderInput={(params) => (
                              <TextField {...params} placeholder="Search" />
                            )}
                          />
                        </AccordionDetails>
                      </Accordion>
                      <Accordion
                        expanded={expanded === "panel6"}
                        onChange={handleAccordianChange("panel6")}
                      >
                        <AccordionSummary
                          aria-controls="panel6d-content"
                          id="panel6d-header"
                        >
                          <p className="text-lightBlue">Product Status</p>
                        </AccordionSummary>
                        <AccordionDetails>
                          <RadioGroup
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            // value={recommendedProductRadio}
                            // onChange={handleRecommendedProductRadio}
                          >
                            <FormControlLabel
                              value="active"
                              control={
                                <Checkbox
                                  size="small"
                                  sx={{ color: "#C8D8FF" }}
                                />
                              }
                              label="Active"
                              onChange={handleStatusChange}
                              checked={statusFilter.includes("active")}
                              sx={{
                                "& .MuiTypography-root": {
                                  fontSize: 13,
                                  color: "#c8d8ff",
                                },
                              }}
                            />
                            <FormControlLabel
                              value="in-active"
                              control={
                                <Checkbox
                                  size="small"
                                  sx={{ color: "#C8D8FF" }}
                                />
                              }
                              label="In Active"
                              onChange={handleStatusChange}
                              checked={statusFilter.includes("in-active")}
                              sx={{
                                "& .MuiTypography-root": {
                                  fontSize: 13,
                                  color: "#c8d8ff",
                                },
                              }}
                            />
                            <FormControlLabel
                              value="scheduled"
                              control={
                                <Checkbox
                                  size="small"
                                  sx={{ color: "#C8D8FF" }}
                                />
                              }
                              label="Scheduled"
                              onChange={handleStatusChange}
                              checked={statusFilter.includes("scheduled")}
                              sx={{
                                "& .MuiTypography-root": {
                                  fontSize: 13,
                                  color: "#c8d8ff",
                                },
                              }}
                            />
                          </RadioGroup>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion
                        expanded={expanded === "panel7"}
                        onChange={handleAccordianChange("panel7")}
                      >
                        <AccordionSummary
                          aria-controls="panel7d-content"
                          id="panel7d-header"
                        >
                          <p className="text-lightBlue">Inventory</p>
                        </AccordionSummary>
                        <AccordionDetails>
                          <RadioGroup
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            // value={recommendedProductRadio}
                            // onChange={handleRecommendedProductRadio}
                          >
                            <FormControlLabel
                              value="1"
                              control={<Radio size="small" />}
                              label="Content 1"
                              sx={{
                                "& .MuiTypography-root": {
                                  fontSize: 13,
                                  color: "#c8d8ff",
                                },
                              }}
                            />
                            <FormControlLabel
                              value="2"
                              control={<Radio size="small" />}
                              label="Content 2"
                              sx={{
                                "& .MuiTypography-root": {
                                  fontSize: 13,
                                  color: "#c8d8ff",
                                },
                              }}
                            />
                            <FormControlLabel
                              value="3"
                              control={<Radio size="small" />}
                              label="Content 3"
                              sx={{
                                "& .MuiTypography-root": {
                                  fontSize: 13,
                                  color: "#c8d8ff",
                                },
                              }}
                            />
                          </RadioGroup>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion
                        expanded={expanded === "panel8"}
                        onChange={handleAccordianChange("panel8")}
                      >
                        <AccordionSummary
                          aria-controls="panel8d-content"
                          id="panel8d-header"
                        >
                          <p className="text-lightBlue">Labels</p>
                        </AccordionSummary>
                        <AccordionDetails>
                          <FormGroup className="tags-checkbox">
                            <FormControlLabel
                              control={
                                <Checkbox
                                  size="small"
                                  style={{
                                    color: "#5C6D8E",
                                    marginRight: 0,
                                  }}
                                />
                              }
                              label="Content 1"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  size="small"
                                  style={{
                                    color: "#5C6D8E",
                                    marginRight: 0,
                                  }}
                                />
                              }
                              label="Content 2"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  size="small"
                                  style={{
                                    color: "#5C6D8E",
                                    marginRight: 0,
                                  }}
                                />
                              }
                              label="Content 3"
                            />
                          </FormGroup>
                        </AccordionDetails>
                      </Accordion>
                    </div>

                    <div className="d-flex flex-column py-3 px-4 filter-buttons">
                      <hr className="hr-grey-6 my-3 w-100" />
                      <div className="d-flex justify-content-between">
                        <button
                          onClick={clearAllFilter}
                          className="button-lightBlue-outline py-2 px-3"
                        >
                          <p>Clear all Filters</p>
                        </button>
                        <button
                          onClick={toggleDrawer("right", false)}
                          className="button-gradient py-2 px-5 w-auto "
                        >
                          <p>Done</p>
                        </button>
                      </div>
                    </div>
                  </SwipeableDrawer>
                </React.Fragment>
              </div>
              <button
                className="button-grey py-2 px-3 ms-2"
                aria-describedby={idSort}
                variant="contained"
                onClick={handleSortClick}
              >
                <small className="text-lightBlue me-2">Sort</small>
                <img src={sort} alt="sort" className="" />
              </button>
              <button
                className="button-grey py-2 px-3 ms-2"
                aria-describedby={idColumns}
                variant="contained"
                onClick={handleColumnsClick}
              >
                <small className="text-lightBlue">Columns</small>
                <img src={columns} alt="columns" className="ms-2" />
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
                anchorEl={anchorSortEl}
                onClose={handleSortClose}
                className="columns"
              >
                <FormControl className="px-2 py-1">
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={sortFilter}
                    onChange={handleSortRadioChange}
                    // value={value}
                    // onChange={handleRadioChange}
                  >
                    <FormControlLabel
                      value="productName"
                      control={<Radio size="small" />}
                      label="Product Name"
                    />
                    <FormControlLabel
                      value="category"
                      control={<Radio size="small" />}
                      label="Category"
                    />
                    <FormControlLabel
                      value="subCategory"
                      control={<Radio size="small" />}
                      label="Sub Category"
                    />
                    <FormControlLabel
                      value="vendor"
                      control={<Radio size="small" />}
                      label="Vendor"
                    />
                    <FormControlLabel
                      value="uploadDate"
                      control={<Radio size="small" />}
                      label="Upload Date"
                    />
                    <FormControlLabel
                      value="alphabeticalAtoZ"
                      control={<Radio size="small" />}
                      label="Alphabetical (A-Z)"
                    />
                    <FormControlLabel
                      value="alphabeticalZtoA"
                      control={<Radio size="small" />}
                      label="Alphabetical (Z-A)"
                    />
                    <FormControlLabel
                      value="oldestToNewest"
                      control={<Radio size="small" />}
                      label="Oldest to Newest"
                    />
                    <FormControlLabel
                      value="newestToOldest"
                      control={<Radio size="small" />}
                      label="Newest to Oldest"
                    />
                  </RadioGroup>
                </FormControl>
              </Popover>

              <Popover
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                id={idColumns}
                open={openColumns}
                anchorEl={anchorColumnsEl}
                onClose={handleColumnsClose}
                className="columns"
              >
                <FormGroup className="px-2 py-1">
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
                    label="Catgory"
                    className="me-0"
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
                    label="Sub Catgory"
                    className="me-0"
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
                    label="Collection"
                    className="me-0"
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
                    label="Vendor"
                    className="me-0"
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
                    label="Price"
                    className="me-0"
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
                    label="Activity"
                    className="me-0"
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
                    label="Status"
                    className="me-0"
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
                    label="Action"
                    className="me-0"
                  />
                </FormGroup>
              </Popover>
            </div>
          </div>
          {chipData.length > 0 && (
            <div className="d-flex justify-content-between mb-3 px-2">
              <div className="d-flex">
                {chipData.map((item) => (
                  <Chip
                    label={item}
                    onDelete={() => handleDelete(item)}
                    size="small"
                    className="mt-3 me-2 px-1"
                  />
                ))}
              </div>
              <div className="d-flex">
                <small
                  onClick={clearAllFilter}
                  className="text-blue-2 me-3 mt-3 c-pointer"
                >
                  Clear all
                </small>
                <small
                  className="text-blue-2 mt-3 c-pointer"
                  aria-describedby={idSaveFilter}
                  variant="contained"
                  onClick={handleSaveFilterClick}
                >
                  Save this filter
                </small>

                <Popover
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  id={idSaveFilter}
                  open={openSaveFilter}
                  anchorEl={anchorSaveFilterEl}
                  onClose={handleSaveFilterClose}
                >
                  <div className="px-1 py-3">
                    <div className="d-flex mb-1">
                      <small className="text-lightBlue me-2">Filter Name</small>
                      <Tooltip title="Lorem ipsum" placement="top">
                        <img
                          src={info}
                          alt="info"
                          className="c-pointer ms-2"
                          width={13.5}
                        />
                      </Tooltip>
                    </div>
                    <FormControl className="px-0">
                      <OutlinedInput
                        placeholder="Enter Category Name"
                        size="small"
                      />
                    </FormControl>
                    {/* <div className="d-flex"> */}
                    <button className="ms-auto button-gradient py-1 px-4 mt-3">
                      <p>Save</p>
                    </button>
                    {/* </div> */}
                  </div>
                </Popover>
              </div>
            </div>
          )}

          <TabPanel value={productType} index={0}>
            <AllProductsTable
            editProduct={editProduct}
              list={productList}
              totalCount={totalProduct}
              changeRowsPerPage={handleChangeRowsPerPage}
              rowsPerPage={queryFilterState.pageSize}
              changePage={handleChangePage}
              page={queryFilterState.pageNo}
              bulkEdit={bulkUpdateProduct}
            />
          </TabPanel>
          <TabPanel value={productType} index={1}>
            <AllProductsTable
              list={productList}
              totalCount={totalProduct}
              editProduct={editProduct}
              changeRowsPerPage={handleChangeRowsPerPage}
              rowsPerPage={queryFilterState.pageSize}
              changePage={handleChangePage}
              page={queryFilterState.pageNo}
              bulkEdit={bulkUpdateProduct}
            />
          </TabPanel>
          <TabPanel value={productType} index={2}>
            <AllProductsTable
              list={productList}
              totalCount={totalProduct}
              changeRowsPerPage={handleChangeRowsPerPage}
              editProduct={editProduct}
              rowsPerPage={queryFilterState.pageSize}
              changePage={handleChangePage}
              page={queryFilterState.pageNo}
              bulkEdit={bulkUpdateProduct}
            />
          </TabPanel>
          <TabPanel value={productType} index={3}>
            <AllProductsTable
              list={productList}
              totalCount={totalProduct}
              changeRowsPerPage={handleChangeRowsPerPage}
              editProduct={editProduct}
              rowsPerPage={queryFilterState.pageSize}
              changePage={handleChangePage}
              page={queryFilterState.pageNo}
              bulkEdit={bulkUpdateProduct}
              archived={false}
            />
          </TabPanel>
        </Paper>
      </div>
    </div>
  );
};

export default AllProducts;
