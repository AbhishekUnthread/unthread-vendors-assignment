import { forwardRef, useState, useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import { Box, Paper, Tab, Tabs, Tooltip } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import CollectionsTable from "./CollectionsTable";
import ViewLogsDrawer from "../../../components/ViewLogsDrawer/ViewLogsDrawer";
import TableSearch from "../../../components/TableSearch/TableSearch";
import ExportDialog from "../../../components/ExportDialog/ExportDialog";
import ImportSecondDialog from "../../../components/ImportSecondDialog/ImportSecondDialog";
import ViewTutorial from "../../../components/ViewTutorial/ViewTutorial";
import TabPanel from "../../../components/TabPanel/TabPanel";

import parameters from "../../../assets/icons/sidenav/parameters.svg";

import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";

import {
  showSuccess,
  showError,
} from "../../../features/snackbar/snackbarAction";

import {
  useGetAllCollectionsQuery,
  useCreateCollectionMutation,
  useDeleteCollectionMutation,
  useEditCollectionMutation,
} from "../../../features/parameters/collections/collectionsApiSlice";

const eventHandler = (e) => {
  e.stopPropagation();
  console.log(e.target);
};

const initialCollectionState = {
  status: "",
  start: 0,
  limit: 10,
  total: null,
};

const collectionsReducer = (state, action) => {
  switch (action.type) {
    case "STATUS": {
      return {
        ...state,
        status: action.payload,
      };
    }
    default: {
      return initialCollectionState;
    }
  }
};

const Collections = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [error, setError] = useState(false);
  const [collectionList, setCollectionList] = useState([]);
  const [collectionType, setCollectionType] = useState(0);
  const [collectionsStatus, setCollectionsStatus] = useState("");
  const [collectionState, collectionDispatch] = useReducer(
    collectionsReducer,
    initialCollectionState
  );

  const {
    data: collectionData,
    isLoading: collectionIsLoading,
    isSuccess: collectionIsSuccess,
    error: collectionError
  } = useGetAllCollectionsQuery({ createdAt: -1 });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (collectionError) {
      setError(true);
      if (collectionError?.data?.message) {
        dispatch(showError({ message: collectionError.data.message }));
      } else {
        dispatch(
          showError({ message: "Something went wrong!, please try again" })
        );
      }
    }
    if (collectionIsSuccess) {
      setError(false);
      if (collectionType === 0) {
        setCollectionList(collectionData.data.data);
      }
      if (collectionType === 1) {
        setCollectionList(collectionData.data.data);
      }
    }
  }, [
    collectionData,
    collectionIsSuccess,
    collectionError,
    collectionType,
    dispatch,
  ]);

  return (
    <div className="container-fluid page">
      <div className="row justify-content-between align-items-center">
        <h4 className="page-heading w-auto ps-0">Collections</h4>
        <Tooltip title="Lorem ipsum" placement="top">
          <InfoOutlinedIcon
            sx={{ color: "#c8d8ff", fontSize: 20 }}
            className="c-pointer"
          />
        </Tooltip>
        <div className="d-flex align-items-center w-auto pe-0">
          <ViewTutorial />
          <ViewLogsDrawer
            headingName={"Parameters / Collections"}
            icon={parameters}
          />
          <ExportDialog dialogName={"Collections"} />
          <ImportSecondDialog dialogName={"Collections"} />
          <Link to="create" className="button-gradient py-2 px-4 ms-3">
            <p>+ Create Collection</p>
          </Link>
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
              <Tab label="All" className="tabs-head" />
              <Tab label="Active" className="tabs-head" />
              <Tab label="Draft" className="tabs-head" />
            </Tabs>
          </Box>
          <div className="d-flex align-items-center mt-3 mb-3 px-2 justify-content-between">
            <TableSearch />
          </div>
          <TabPanel value={value} index={0}>
            <CollectionsTable
              isLoading={collectionIsLoading}
              error={error}
              list={collectionList}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <CollectionsTable />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <CollectionsTable />
          </TabPanel>
        </Paper>
      </div>
    </div>
  );
};

export default Collections;
