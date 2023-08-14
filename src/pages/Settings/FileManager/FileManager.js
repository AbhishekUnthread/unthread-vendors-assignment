import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
// ! COMPONENT IMPORTS
import AllFiles from "./AllFiles/AllFiles";
import FoldersOnly from "./FoldersOnly/FoldersOnly";
import StorageIndicator from "./StorageIndicator";
// ! IMAGES IMPORTS
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
// ! MATERIAL IMPORTS
import { Button, Menu, MenuItem, Tab, Tabs, ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
// import FolderIcon from "@mui/icons-material/Folder";
import AddIcon from "@mui/icons-material/Add";
import IconMenuItem from "./IconMenuItem";
import ImagesOnly from "./ImagesOnly/ImagesOnly";
import VideosOnly from "./VideosOnly/VideosOnly";
import FolderNameDialog from "./FolderNameDialog";
import { useCreateFolderMutation } from "../../../features/settings/filemanager/filemanagerApiSlice";
import { showError, showSuccess } from "../../../features/snackbar/snackbarAction";
import UseFileUpload from "../../../features/fileUpload/fileUploadHook";
import FoldersInside from "./FoldersInside/FoldersInside";

const FileManager = () => {
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
    console.log(file);
    const check = file.type === "video/mp4";
    uploadFile({ file, format: check ? "video" : "image", module: "others" });
    setTabIndex(check ? 3 : 2);
  };

  const [openAddFolder, setOpenAddFolder] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [addAnchorEl, setAddAnchorEl] = useState(null);
  const [views, setViews] = useState("icon");

  const handleViews = (_, v) => setViews(v);
  const handleSortClick = (e) => setSortAnchorEl(e.currentTarget);
  const handleSortClose = () => setSortAnchorEl(null);
  const handleAddNewClick = (e) => setAddAnchorEl(e.currentTarget);
  const handleAddNewClose = () => setAddAnchorEl(null);
  const handleTabChange = (_, tab) => setTabIndex(tab);
  const handleAddNewFolderClick = () => setOpenAddFolder(true);
  const handleAddFolderClose = () => setOpenAddFolder(false);

  const openSortMenu = Boolean(sortAnchorEl);

  const [viewingFolderId, setViewingFolderId] = useState(null);

  const handleViewingFolder = (fid) => {
    setViewingFolderId(fid);
    setTabIndex(4);
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
            <Button
              variant="text"
              startIcon={
                <img
                  src={searchVertical}
                  alt="icon"
                  width={15}
                />
              }>
              <span className="text-grey-6">Search</span>
            </Button>

            <Button
              variant="text"
              endIcon={
                <img
                  src={sortVertical}
                  alt="icon"
                  width={15}
                />
              }
              onClick={handleSortClick}>
              <span className="text-grey-6">Sort</span>
            </Button>

            <Menu
              anchorEl={sortAnchorEl}
              open={openSortMenu}
              onClose={handleSortClose}>
              <MenuItem onClick={handleSortClose}>File Size (High to Low)</MenuItem>

              <MenuItem onClick={handleSortClose}>File Size (Low to High)</MenuItem>

              <MenuItem onClick={handleSortClose}>Modified (Newest)</MenuItem>

              <MenuItem onClick={handleSortClose}>Modified (Oldest)</MenuItem>

              <MenuItem onClick={handleSortClose}>File Name (A-Z)</MenuItem>

              <MenuItem onClick={handleSortClose}>File Name (Z-A)</MenuItem>
            </Menu>

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
          changeTab={handleTabChange}
          onExplore={handleViewingFolder}
          refetchFiles={!uploadState.isLoading && uploadState.isSuccess}
        />
      )}
      {tabIndex === 1 && <FoldersOnly onExplore={handleViewingFolder} />}
      {tabIndex === 2 && (
        <ImagesOnly
          fileType="image"
          refetchFiles={!uploadState.isLoading && uploadState.isSuccess}
        />
      )}
      {tabIndex === 3 && (
        <ImagesOnly
          fileType="video"
          refetchFiles={!uploadState.isLoading && uploadState.isSuccess}
        />
      )}
      {tabIndex === 4 && <FoldersInside fid={viewingFolderId} />}
    </div>
  );
};

export default FileManager;
