import { useState } from "react";
import {
  Avatar,
  Badge,
  Popover,
  SwipeableDrawer,
} from "@mui/material";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import SearchIcon from '@mui/icons-material/Search';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import "./ChatBox.scss";

import userLarge from "../../assets/images/users/userLarge.svg";
import read from "../../assets/images/users/Read.svg";

const ChatBox = ({ handleCloseDrawer, handleOpenDrawer, stateOpen }) => {

const [anchorFlagEl, setAnchorFlagEl] = useState(null);
  const handleFlagClick = (event) => {
    setAnchorFlagEl(event.currentTarget);
  };
  const handleFlagClose = () => {
    setAnchorFlagEl(null);
  };
  const openFlag = Boolean(anchorFlagEl);
  const idFlag = openFlag ? "simple-popover" : undefined;
  return (
    <SwipeableDrawer
      anchor="right"
      open={stateOpen}
      onClose={handleCloseDrawer}
      onOpen={handleOpenDrawer}
      className="chatBox"
    >
      <div className="d-flex justify-content-between align-items-center py-3 px-3 ms-2 me-1">
        <div>
          <NavigateBeforeIcon />
            <Badge badgeContent="."  variant="dot" color="success"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }} 
            >
              <Avatar 
                sx={{ width: 52, height: 52 }} 
                src={userLarge} 
                className="chatBoxUser"
              />
            </Badge>
            <span>
            <span>
              <span className="page-heading ms-2 ps-1">Saniya Shaikh</span>
              <span className="text-blue-2 c-pointer ms-2">( View Profile )</span>
            </span>
            <h6 className="c-pointer ms-2 online">Online</h6>
            </span>

        </div>
        <h6 className="text-lightBlue">
          <SearchIcon />
          <LocalPhoneIcon />
          <MoreVertIcon />
        </h6>
      </div>

      <div className="d-flex flex-column px-4">
        <hr className="hr-grey-6 my-3 w-100" />
      </div>

      <div className="chatMessagesContainer">
        <div>
          <div>
        <span className="d-flex align-items-center justify-content-end me-4">
        <span className="py-3 px-4 mb-2 chatBoxReply">
          Hey what's app
        </span>
        </span>
        <span className="d-flex align-items-center justify-content-end me-4">
          <span className="chatTime me-1">
            05:40 am  
          </span>
          • 
          <span>
          <Avatar src={read} sx={{ width: 17, height: 9 }} className="ms-1"/>
          </span>
        </span>

        </div>
        </div>
        <span className="d-flex align-items-center justify-content-end me-4">
        <span className="py-3 px-4 mb-2 chatBoxReply">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Sit sem maecenas turpis orci mi.
        </span>
        </span>
        <span className="d-flex align-items-center justify-content-end me-4">
          <span className="chatTime me-1">
            05:40 am  
          </span>
          •
          <span>
          <Avatar src={read} sx={{ width: 17, height: 9 }} className="ms-1"/>
          </span>
        </span>
      </div>

      <div className="chatSend">
        <div>
        <hr className="hr-grey-6 my-3 w-100" />
        <div className="chatEnquiry">
          <div>
            <span className="enquiry">
              Enquiry ID :
            </span>
            <span className="enquiryId ms-2">
              #ENQ12345
            </span>
            <button
              className="button-lightBlue-outline py-2 px-3 me-4 ms-3"
            >
              <p>Escalate</p>
            </button>
          </div>

          <div className="rightEnquiryBox">
            <span className="enquiry">
              Enquiry status :
            </span>
            <span
              className="d-flex c-pointer me-2"
              aria-describedby={idFlag}
              variant="contained"
              onClick={handleFlagClick}
              style={{width: "100px"}}
            >
              <p className="mx-2 optionColor"
                style={{background: anchorFlagEl == "Open" ? "#C8D8FF" : "#FFD79D"}}
              >Open</p>
              <KeyboardArrowDownIcon />
            </span>
            <Popover
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              open={openFlag}
              anchorEl={anchorFlagEl}
              onClose={handleFlagClose}
            >
              <div className="px-1 py-2">
                <div className="d-flex align-items-center c-pointer hover-back px-3 py-1 my-1 rounded-3">
                  <p className="ms-2 optionColor" style={{background: "#C8D8FF"}}>Open</p>
                </div>
                <div className="d-flex align-items-center c-pointer hover-back px-3 py-1 my-1 rounded-3">
                  <p className="ms-2 optionColor" style={{background: "#FFD79D"}}>Pending</p>
                </div>
                <div className="d-flex align-items-center c-pointer hover-back px-3 py-1 my-1 rounded-3">
                  <p className="ms-2 optionColor" style={{background: "#A6FAAF"}}>Resolved</p>
                </div>
              </div>
            </Popover>
          </div>
        </div>
        </div>
      </div>

    </SwipeableDrawer>
  );
};

export default ChatBox;