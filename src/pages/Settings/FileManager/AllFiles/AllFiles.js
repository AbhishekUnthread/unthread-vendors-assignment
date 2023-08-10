import { useState } from "react";
import "./AllFiles.scss";
// ! COMPONENT IMPORTS
import IconMenuItem from "../IconMenuItem";
// ! IMAGES IMPORTS
import info from "../../../../assets/icons/info.svg";
import folderLargePurple from "../../../../assets/icons/folderLargePurple.svg";
import archive from "../../../../assets/icons/folderdropdown/archive.svg";
import download from "../../../../assets/icons/folderdropdown/download.svg";
import edit from "../../../../assets/icons/folderdropdown/edit.svg";
import folderUp from "../../../../assets/icons/folderdropdown/folderUp.svg";
import linkAngled from "../../../../assets/icons/folderdropdown/linkAngled.svg";
import share from "../../../../assets/icons/folderdropdown/share.svg";
// ! MATERIAL IMPORTS
import { Button, Checkbox, Fab, Menu, Tooltip } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ImageIconView from "./ImageIconView";
import VideoIconView from "./VideoIconView";

export default function AllFiles({ changeTab }) {
  const seeAllFolders = () => changeTab(null, 1);
  const seeAllImages = () => changeTab(null, 2);
  const seeAllVideos = () => changeTab(null, 3);

  return (
    <>
      <div className="my-3">
        <div className="row mb-3">
          <div className="col d-flex align-items-center">
            <h4 className="text-lightBlue fs-6 fw-500 me-2">Folders</h4>
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
              className="me-2"
              onClick={seeAllFolders}>
              <span className="text-lightBlue">See All</span>
            </Button>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col-3">
            <FolderIconView
              name="Brand Assets"
              count={10}
            />
          </div>
          <div className="col-3">
            <FolderIconView
              name="Products"
              count={10}
            />
          </div>
          <div className="col-3">
            <FolderIconView
              name="Videos"
              count={10}
            />
          </div>
          <div className="col-3">
            <FolderIconView
              name="Banners"
              count={10}
            />
          </div>
          <div className="col-3">
            <FolderIconView
              name="Campaign Shoots"
              count={10}
            />
          </div>
          <div className="col-3">
            <FolderIconView
              name="GIF"
              count={10}
            />
          </div>
        </div>
      </div>

      <hr className="hr-grey-6 my-3" />

      <div className="my-3">
        <div className="row mb-3">
          <div className="col d-flex align-items-center">
            <h4 className="text-lightBlue fs-6 fw-500 me-2">Images</h4>
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
              className="me-2"
              onClick={seeAllImages}>
              <span className="text-lightBlue">See All</span>
            </Button>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col-2">
            <ImageIconView
              name="Images-products_1"
              size="456kb"
              type="JPG"
              isGreen
            />
          </div>
          <div className="col-2">
            <ImageIconView
              name="Images-products_1"
              size="456kb"
              type="JPG"
              isGreen
            />
          </div>
          <div className="col-2">
            <ImageIconView
              name="Images-products_1"
              size="456kb"
              type="JPG"
            />
          </div>
          <div className="col-2">
            <ImageIconView
              name="Images-products_1"
              size="456kb"
              type="JPG"
            />
          </div>
          <div className="col-2">
            <ImageIconView
              name="Images-products_1"
              size="456kb"
              type="JPG"
              isGreen
            />
          </div>
          <div className="col-2">
            <ImageIconView
              name="Images-products_1"
              size="456kb"
              type="JPG"
            />
          </div>
        </div>
      </div>

      <hr className="hr-grey-6 my-3" />

      <div className="my-3">
        <div className="row mb-3">
          <div className="col d-flex align-items-center">
            <h4 className="text-lightBlue fs-6 fw-500 me-2">Videos</h4>
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
              className="me-2"
              onClick={seeAllVideos}>
              <span className="text-lightBlue">See All</span>
            </Button>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col-2">
            <VideoIconView
              name="Product 1 Video"
              size="4mb"
              type="mp4"
              isGreen
            />
          </div>
          <div className="col-2">
            <VideoIconView
              name="Product 1 Video"
              size="4mb"
              type="mp4"
              isGreen
            />
          </div>
          <div className="col-2">
            <VideoIconView
              name="Product 1 Video"
              size="4mb"
              type="mp4"
            />
          </div>
          <div className="col-2">
            <VideoIconView
              name="Product 1 Video"
              size="4mb"
              type="mp4"
            />
          </div>
          <div className="col-2">
            <VideoIconView
              name="Product 1 Video"
              size="4mb"
              type="mp4"
              isGreen
            />
          </div>
          <div className="col-2">
            <VideoIconView
              name="Product 1 Video"
              size="4mb"
              type="mp4"
            />
          </div>
        </div>
      </div>
    </>
  );
}

function FolderIconView({ name, count }) {
  const [showMore, setShowMore] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePointerEnter = () => setShowMore(true);
  const handlePointerLeave = () => setShowMore(false || Boolean(anchorEl));

  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => {
    setAnchorEl(null);
    setShowMore(false);
  };

  return (
    <div
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={`folder-icon-view position-relative d-flex align-items-center rounded-8${showMore ? " folder-icon-view-hovering" : ""}`}>
      <div className="folder-icon rounded-8 p-3 m-2">
        <img
          src={folderLargePurple}
          alt="icon"
          width={30}
        />
      </div>
      <div className="d-flex flex-column justify-content-center">
        <span>{name}</span>
        <small>{count} items</small>
      </div>
      {showMore && (
        <>
          <div className="position-absolute top-0 start-0">
            <Checkbox
              size="small"
              color="primary"
              className="rounded-4"
            />
          </div>
          <div className="position-absolute top-50 end-0 translate-middle-y">
            <Fab
              size="small"
              onClick={handleClick}>
              <MoreHorizIcon
                fontSize="small"
                color="primary"
              />
            </Fab>
            <Menu
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={handleClose}>
              <IconMenuItem
                icon={linkAngled}
                text="Copy Link"
                close={handleClose}
              />
              <IconMenuItem
                icon={share}
                text="Share With"
                close={handleClose}
              />
              <IconMenuItem
                icon={folderUp}
                text="Move to Folder"
                close={handleClose}
              />
              <IconMenuItem
                icon={edit}
                text="Rename"
                close={handleClose}
              />
              <IconMenuItem
                icon={download}
                text="Download"
                close={handleClose}
              />
              <IconMenuItem
                icon={archive}
                text="Delete"
                isRed
                close={handleClose}
              />
            </Menu>
          </div>
        </>
      )}
    </div>
  );
}
