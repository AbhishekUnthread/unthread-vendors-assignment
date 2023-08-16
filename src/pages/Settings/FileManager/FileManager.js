import { useEffect, useReducer, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import AllFiles from "./AllFiles/AllFiles";
import FoldersOnly from "./FoldersOnly/FoldersOnly";
import StorageIndicator from "./StorageIndicator";
import info from "../../../assets/icons/info.svg";
import company from "../../../assets/icons/company.svg";
import googledrive from "../../../assets/icons/googledrive.svg";
import dropbox from "../../../assets/icons/dropbox.svg";
import onedrive from "../../../assets/icons/onedrive.svg";
import allfiles from "../../../assets/icons/allfiles.svg";
import listFiles from "../../../assets/icons/listFiles.png";
import folderOpen from "../../../assets/icons/folderOpen.svg";
import imagesOn from "../../../assets/icons/imagesOn.svg";
import videosOn from "../../../assets/icons/videosOn.svg";
import sortVertical from "../../../assets/icons/sortVertical.svg";
import searchVertical from "../../../assets/icons/searchVertical.svg";
import uploadCloud from "../../../assets/icons/uploadCloud.svg";
import folderPlus from "../../../assets/icons/folderPlus.svg";
import { Button, FormControl, FormControlLabel, Menu, Popover, Radio, RadioGroup, Tab, Tabs, ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import IconMenuItem from "./IconMenuItem";
import ImagesOnly from "./ImagesOnly/ImagesOnly";
import FolderNameDialog from "./FolderNameDialog";
import { TableSearchSecondary } from "../../../components/TableSearch/TableSearch";
import { useCreateFolderMutation } from "../../../features/settings/filemanager/filemanagerApiSlice";
import { showError, showSuccess } from "../../../features/snackbar/snackbarAction";
import UseFileUpload from "../../../features/fileUpload/fileUploadHook";
import FoldersInside from "./FoldersInside/FoldersInside";
import FilePreviewDialog from "./FilePreviewDialog";

const initialQueries = {
  name: "",
  sizeSort: "",
  createdAt: "-1",
  alphabetical: "",
};

const queryFilterReducer = (state, action) => {
  switch (action.type) {
    case "SET_NAME":
      return {
        ...state,
        name: action.name,
      };
    case "SET_SIZE_SORT":
      return {
        ...state,
        sizeSort: action.sizeSort,
        createdAt: "",
        alphabetical: "",
      };
    case "SET_CREATED_AT":
      return {
        ...state,
        sizeSort: "",
        createdAt: action.createdAt,
        alphabetical: "",
      };
    case "SET_ALPHABETICAL":
      return {
        ...state,
        sizeSort: "",
        createdAt: "",
        alphabetical: action.alphabetical,
      };
    case "SET_DEFAULT":
      return initialQueries;

    default:
      return state;
  }
};

export default function FileManager() {
  const [searchValue, setSearchValue] = useState("");
  const [queryFilters, dispatchQueryFilters] = useReducer(queryFilterReducer, initialQueries);

  const dispatch = useDispatch();
  const [createNewFolder] = useCreateFolderMutation();

  const handleCreateNewFolder = (name = "") => {
    createNewFolder({ name })
      .unwrap()
      .then(() => {
        handleAddFolderClose();
        dispatch(showSuccess({ message: `${name} created successfully` }));
      })
      .catch((e) => {
        console.log(e);
        dispatch(showError({ message: "Something went wrong" }));
      });
  };

  const inputFileRef = useRef(null);
  const [uploadFile, uploadState] = UseFileUpload();

  useEffect(() => {
    if (!uploadState.isLoading) {
      if (uploadState.isSuccess) dispatch(showSuccess({ message: "File Uploaded Successfully" }));
      if (uploadState.isError) dispatch(showError({ message: "Something went wrong" }));
    }
  }, [uploadState, dispatch]);

  const handleUploadNewFile = () => inputFileRef.current?.click();
  const handleUploadFilesChanged = (file) => {
    const check = file.type === "video/mp4";
    const format = check ? "video" : "image";
    const limit = check ? 10 : 5;
    if (file.size > limit * 1024 * 1024) dispatch(showError({ message: `File too large, ${format}s upto ${limit}MB supported.` }));
    else {
      uploadFile({ file, format, module: "others" });
      handleTabChange(null, check ? 3 : 2);
    }
  };

  const [tabIndex, setTabIndex] = useState(0);
  const [openAddFolder, setOpenAddFolder] = useState(false);
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [addAnchorEl, setAddAnchorEl] = useState(null);
  const [views, setViews] = useState("icon");

  const handleViews = (_, v) => setViews(v);
  const handleSortClick = (e) => setSortAnchorEl(e.currentTarget);
  const handleSortClose = () => setSortAnchorEl(null);
  const handleAddNewClick = (e) => setAddAnchorEl(e.currentTarget);
  const handleAddNewClose = () => setAddAnchorEl(null);
  const handleAddNewFolderClick = () => setOpenAddFolder(true);
  const handleAddFolderClose = () => setOpenAddFolder(false);
  const handleTabChange = (_, tab) => {
    dispatchQueryFilters({ type: "SET_DEFAULT" });
    setSearchValue("");
    setTabIndex(tab);
  };
  const openSortMenu = Boolean(sortAnchorEl);

  const [viewingFileId, setViewingFileId] = useState("");

  const handleViewingFile = (fid) => setViewingFileId(fid);

  const [viewingFolder, setViewingFolder] = useState(null);

  const handleViewingFolder = (folder) => {
    setViewingFolder(folder);
    handleTabChange(null, 4);
  };

  const handleClearViewingFolder = () => {
    setViewingFolder(null);
    handleTabChange(null, 1);
  };

  return (
    <div className="col-lg-10 border-grey-5 rounded-8 mt-5 p-4">
      <div className="my-3">
        <div className="row mb-2">
          <div className="col d-flex align-items-center">
            <h4 className="text-lightBlue fw-600 me-2">File Manager</h4>

            <Tooltip
              title="Lorem ipsum"
              placement="top">
              <img
                src={info}
                alt="info"
                className="c-pointer"
                width={13.5}
              />
            </Tooltip>
          </div>

          <div className="col-auto">
            <Button
              variant="text"
              className="me-2">
              <span className="text-lightBlue">Connect Storage</span>
            </Button>

            <Button
              variant="contained"
              className="button-gradient text-white ms-2"
              startIcon={<AddIcon />}
              onClick={handleAddNewClick}>
              Add New
            </Button>
            <Menu
              anchorEl={addAnchorEl}
              open={Boolean(addAnchorEl)}
              onClose={handleAddNewClose}>
              <IconMenuItem
                icon={uploadCloud}
                text="Upload"
                close={handleAddNewClose}
                action={handleUploadNewFile}
              />

              <IconMenuItem
                icon={folderPlus}
                text="Add New Folder"
                close={handleAddNewClose}
                action={handleAddNewFolderClick}
              />
            </Menu>
          </div>
          <FolderNameDialog
            buttonText="Create"
            isOpen={openAddFolder}
            headingText="Create New Folder"
            onClose={handleAddFolderClose}
            onAction={handleCreateNewFolder}
          />
        </div>

        <div className="row py-3">
          <div className="col-3">
            <StorageIndicator
              icon={company}
              name="Company Space"
              used={30}
              total={100}
              color="#7577f8"
            />
          </div>

          <div className="col-3">
            <StorageIndicator
              icon={googledrive}
              name="Google Drive"
              used={12}
              total={15}
              color="#34a853"
            />
          </div>

          <div className="col-3">
            <StorageIndicator
              icon={dropbox}
              name="Dropbox"
              used={12}
              total={30}
              color="#0061ff"
            />
          </div>

          <div className="col-3">
            <StorageIndicator
              icon={onedrive}
              name="One Drive"
              used={12}
              total={30}
              color="#0a84d9"
            />
          </div>
        </div>
      </div>

      <div className="my-3">
        <div className="row align-items-center">
          <div className="col">
            <Tabs
              className="tabs"
              value={tabIndex}
              onChange={handleTabChange}>
              <Tab
                icon={
                  <img
                    src={allfiles}
                    alt="icon"
                    width={15}
                  />
                }
                iconPosition="start"
                label="All Files"
                className="tabs-head"
              />

              <Tab
                icon={
                  <img
                    src={folderOpen}
                    alt="icon"
                    width={15}
                  />
                }
                iconPosition="start"
                label="Folders"
                className="tabs-head"
              />

              <Tab
                icon={
                  <img
                    src={imagesOn}
                    alt="icon"
                    width={15}
                  />
                }
                iconPosition="start"
                label="Images"
                className="tabs-head"
              />

              <Tab
                icon={
                  <img
                    src={videosOn}
                    alt="icon"
                    width={15}
                  />
                }
                iconPosition="start"
                label="Videos"
                className="tabs-head"
              />
            </Tabs>
          </div>

          <div className="col-auto d-flex align-items-center">
            <TableSearchSecondary
              value={searchValue}
              onSearchValueChange={(v) => setSearchValue(v)}
              onChange={(v) => dispatchQueryFilters({ type: "SET_NAME", name: v })}
            />

            <Button
              variant="text"
              onClick={handleSortClick}
              endIcon={
                <img
                  src={sortVertical}
                  alt="icon"
                  width={15}
                />
              }>
              <span className="text-grey-6">Sort</span>
            </Button>

            <Popover
              className="columns"
              open={openSortMenu}
              anchorEl={sortAnchorEl}
              onClose={handleSortClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}>
              <FormControl className="px-2 py-1">
                <RadioGroup
                  name="controlled-radio-buttons-group"
                  onClick={handleSortClose}>
                  {tabIndex !== 1 && (
                    <>
                      <FormControlLabel
                        value="-1"
                        label="File Size (High to Low)"
                        onChange={(e) => dispatchQueryFilters({ type: "SET_SIZE_SORT", sizeSort: e.target.value })}
                        control={
                          <Radio
                            size="small"
                            checked={queryFilters.sizeSort === "-1"}
                          />
                        }
                      />
                      <FormControlLabel
                        value="1"
                        label="File Size (Low to High)"
                        onChange={(e) => dispatchQueryFilters({ type: "SET_SIZE_SORT", sizeSort: e.target.value })}
                        control={
                          <Radio
                            size="small"
                            checked={queryFilters.sizeSort === "1"}
                          />
                        }
                      />
                    </>
                  )}

                  <FormControlLabel
                    value="-1"
                    label="Modified (Newest)"
                    onChange={(e) => dispatchQueryFilters({ type: "SET_CREATED_AT", createdAt: e.target.value })}
                    control={
                      <Radio
                        size="small"
                        checked={queryFilters.createdAt === "-1"}
                      />
                    }
                  />
                  <FormControlLabel
                    value="1"
                    label="Modified (Oldest)"
                    onChange={(e) => dispatchQueryFilters({ type: "SET_CREATED_AT", createdAt: e.target.value })}
                    control={
                      <Radio
                        size="small"
                        checked={queryFilters.createdAt === "1"}
                      />
                    }
                  />

                  <FormControlLabel
                    value="1"
                    label="File Name (A-Z)"
                    onChange={(e) => dispatchQueryFilters({ type: "SET_ALPHABETICAL", alphabetical: e.target.value })}
                    control={
                      <Radio
                        size="small"
                        checked={queryFilters.alphabetical === "1"}
                      />
                    }
                  />
                  <FormControlLabel
                    value="-1"
                    label="File Name (Z-A)"
                    onChange={(e) => dispatchQueryFilters({ type: "SET_ALPHABETICAL", alphabetical: e.target.value })}
                    control={
                      <Radio
                        size="small"
                        checked={queryFilters.alphabetical === "-1"}
                      />
                    }
                  />
                </RadioGroup>
              </FormControl>
            </Popover>

            <ToggleButtonGroup
              exclusive
              value={views}
              onChange={handleViews}
              className="ms-2">
              <ToggleButton value="icon">
                <img
                  src={allfiles}
                  alt="icon"
                  width={15}
                />
              </ToggleButton>

              <ToggleButton value="list">
                <img
                  src={listFiles}
                  alt="icon"
                  width={15}
                />
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>

        <hr className="hr-grey-6 my-0" />
      </div>

      <input
        type="file"
        ref={inputFileRef}
        accept="image/png, image/jpeg, image/webp, video/mp4"
        onChange={(e) => handleUploadFilesChanged(e.target.files[0])}
        style={{ display: "none" }}
      />

      {/* Tab contents for each index */}
      {tabIndex === 0 && (
        <AllFiles
          views={views}
          queryFilters={queryFilters}
          changeTab={handleTabChange}
          onPopup={handleViewingFile}
          onExplore={handleViewingFolder}
          refetchFiles={!uploadState.isLoading && uploadState.isSuccess}
        />
      )}
      {tabIndex === 1 && (
        <FoldersOnly
          views={views}
          queryFilters={queryFilters}
          onExplore={handleViewingFolder}
        />
      )}
      {tabIndex === 2 && (
        <ImagesOnly
          views={views}
          fileType="image"
          onPopup={handleViewingFile}
          queryFilters={queryFilters}
          refetchFiles={!uploadState.isLoading && uploadState.isSuccess}
        />
      )}
      {tabIndex === 3 && (
        <ImagesOnly
          views={views}
          fileType="video"
          onPopup={handleViewingFile}
          queryFilters={queryFilters}
          refetchFiles={!uploadState.isLoading && uploadState.isSuccess}
        />
      )}
      {tabIndex === 4 && (
        <FoldersInside
          views={views}
          folder={viewingFolder}
          onPopup={handleViewingFile}
          queryFilters={queryFilters}
          goBack={handleClearViewingFolder}
        />
      )}

      <FilePreviewDialog
        fileId={viewingFileId}
        headingText="Preview and edit"
        subText="Lorem ipsum dolor sit amet consectetur."
        buttonText="Save"
        onClose={() => setViewingFileId("")}
        // onAction={}
      />
    </div>
  );
}
