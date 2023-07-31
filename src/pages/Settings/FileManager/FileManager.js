import { useLayoutEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
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
import folderLargePurple from "../../../assets/icons/folderLargePurple.svg";
import searchVertical from "../../../assets/icons/searchVertical.svg";
import uploadCloud from "../../../assets/icons/uploadCloud.svg";
import folderPlus from "../../../assets/icons/folderPlus.svg";
import cancel from "../../../assets/icons/cancel.svg";
// ! MATERIAL IMPORTS
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from "@mui/material";
// import FolderIcon from "@mui/icons-material/Folder";
import AddIcon from "@mui/icons-material/Add";
import IconMenuItem from "./IconMenuItem";

const FileManager = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [openAddFolder, setOpenAddFolder] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [addAnchorEl, setAddAnchorEl] = useState(null);
  const [views, setViews] = useState("icon");

  const handleViews = (_, v) => setViews(v);
  const handleSortClick = (e) => setSortAnchorEl(e.currentTarget);
  const handleSortClose = () => setSortAnchorEl(null);
  const handleAddClick = (e) => setAddAnchorEl(e.currentTarget);
  const handleAddClose = () => setAddAnchorEl(null);
  const handleTabChange = (_, tab) => setSearchParams({ tab });
  const handleAddFolderClick = () => setOpenAddFolder(true);
  const handleAddFolderClose = () => setOpenAddFolder(false);

  const open = Boolean(sortAnchorEl);

  useLayoutEffect(() => {
    if (searchParams.has("tab")) {
      const ix = parseInt(searchParams.get("tab"));
      setTabIndex(isNaN(ix) ? 0 : ix);
    } else {
      setSearchParams({ tab: 0 });
    }
  }, [searchParams, setSearchParams]);

  return (
    <div className="col-lg-10 border-grey-5 rounded-8 mt-5 p-4">
      <div className="my-3">
        <div className="row mb-2">
          <div className="col d-flex align-items-center">
            <h4 className="text-lightBlue fw-600 me-2">File Manager</h4>

            <Tooltip title="Lorem ipsum" placement="top">
              <img src={info} alt="info" className="c-pointer" width={13.5} />
            </Tooltip>
          </div>

          <div className="col-auto">
            <Button variant="text" className="me-2">
              <span className="text-lightBlue">Connect Storage</span>
            </Button>

            <Button
              variant="contained"
              className="button-gradient text-white ms-2"
              startIcon={<AddIcon />}
              onClick={handleAddClick}
            >
              Add New
            </Button>
            <Menu
              anchorEl={addAnchorEl}
              open={Boolean(addAnchorEl)}
              onClose={handleAddClose}
            >
              <IconMenuItem
                icon={uploadCloud}
                text="Upload"
                close={handleAddClose}
              />

              <IconMenuItem
                icon={folderPlus}
                text="Add New Folder"
                action={handleAddFolderClick}
                close={handleAddClose}
              />
            </Menu>
          </div>

          <Dialog
            fullWidth
            keepMounted
            maxWidth="sm"
            open={openAddFolder}
            onClose={handleAddFolderClose}
          >
            <DialogTitle>
              <div className="d-flex justify-content-between align-items-center">
                <div className="m-0 p-0">
                  <h4 className="text-lightBlue fw-500">Create New Folder</h4>
                  <small className="text-grey-6 fw-200">
                    Lorem ipsum dolor sit amet.
                  </small>
                </div>
                <img
                  src={cancel}
                  alt="cancel"
                  width={24}
                  onClick={handleAddFolderClose}
                  className="c-pointer"
                />
              </div>
            </DialogTitle>
            <hr className="hr-grey-6 my-0" />
            <DialogContent className="p-3">
              <div className="row align-items-center">
                <div className="col-auto">
                  <div className="folder-icon rounded-8 p-4 m-3">
                    <img src={folderLargePurple} alt="folder" width={66} />
                  </div>
                </div>
                <div className="col">
                  <label className="text-lightBlue mb-2">Folder Name</label>
                  <TextField size="small" fullWidth />
                </div>
              </div>
            </DialogContent>
            <hr className="hr-grey-6 my-0" />
            <DialogActions className="d-flex justify-content-between px-4 py-3">
              <button
                className="button-lightBlue-outline py-2 px-4"
                onClick={handleAddFolderClose}
              >
                <p className="text-lightBlue">Cancel</p>
              </button>
              <button className="button-gradient py-2 px-4" onClick={null}>
                <p>Create</p>
              </button>
            </DialogActions>
          </Dialog>
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
            <Tabs className="tabs" value={tabIndex} onChange={handleTabChange}>
              <Tab
                icon={<img src={allfiles} alt="icon" width={15} />}
                iconPosition="start"
                label="All Files"
                className="tabs-head"
              />

              <Tab
                icon={<img src={folderOpen} alt="icon" width={15} />}
                iconPosition="start"
                label="Folders"
                className="tabs-head"
              />

              <Tab
                icon={<img src={imagesOn} alt="icon" width={15} />}
                iconPosition="start"
                label="Images"
                className="tabs-head"
              />

              <Tab
                icon={<img src={videosOn} alt="icon" width={15} />}
                iconPosition="start"
                label="Videos"
                className="tabs-head"
              />
            </Tabs>
          </div>

          <div className="col-auto d-flex align-items-center">
            <Button
              variant="text"
              startIcon={<img src={searchVertical} alt="icon" width={15} />}
            >
              <span className="text-grey-6">Search</span>
            </Button>

            <Button
              variant="text"
              endIcon={<img src={sortVertical} alt="icon" width={15} />}
              onClick={handleSortClick}
            >
              <span className="text-grey-6">Sort</span>
            </Button>

            <Menu anchorEl={sortAnchorEl} open={open} onClose={handleSortClose}>
              <MenuItem onClick={handleSortClose}>
                File Size (High to Low)
              </MenuItem>

              <MenuItem onClick={handleSortClose}>
                File Size (Low to High)
              </MenuItem>

              <MenuItem onClick={handleSortClose}>Modified (Newest)</MenuItem>

              <MenuItem onClick={handleSortClose}>Modified (Oldest)</MenuItem>

              <MenuItem onClick={handleSortClose}>File Name (A-Z)</MenuItem>

              <MenuItem onClick={handleSortClose}>File Name (Z-A)</MenuItem>
            </Menu>

            <ToggleButtonGroup
              exclusive
              value={views}
              onChange={handleViews}
              className="ms-2"
            >
              <ToggleButton value="icon">
                <img src={allfiles} alt="icon" width={15} />
              </ToggleButton>

              <ToggleButton value="list">
                <img src={listFiles} alt="icon" width={15} />
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>

        <hr className="hr-grey-6 my-0" />
      </div>

      {/* Tab contents for each index */}
      {tabIndex === 0 && <AllFiles />}
      {tabIndex === 1 && <FoldersOnly />}
    </div>
  );
};

export default FileManager;
