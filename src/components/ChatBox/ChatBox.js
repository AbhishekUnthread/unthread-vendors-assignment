import { useState } from "react";
import {
  Avatar,
  Badge,
  Popover,
  SwipeableDrawer,
  TextareaAutosize
} from "@mui/material";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import SearchIcon from '@mui/icons-material/Search';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LinkIcon from '@mui/icons-material/Link';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import AttachmentIcon from '@mui/icons-material/Attachment';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';

import "./ChatBox.scss";

import userLarge from "../../assets/images/users/userLarge.svg";
import read from "../../assets/images/users/Read.svg";
import send from "../../assets/icons/send.svg";

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
        <h6 className="d-flex justify-content-between text-lightBlue chatProfileLeft">
          <SearchIcon />
          <LocalPhoneIcon />
          <MoreVertIcon />
        </h6>
      </div>

      <div className="d-flex flex-column px-4">
        <hr className="hr-grey-6 my-3 w-100" />
      </div>

      <div className="chatMessagesContainer">
        
        <div className="d-flex ms-4 chatResponses mb-3">
          <Avatar sx={{ bgcolor: "#c8d8ff" }} sizes={33}>S</Avatar>
          <div className="responsesBox ms-3">
            <div className="d-flex enquiry py-2">
              <div>Enquiry ID :</div> 
              <div className="enquiryIdLink ms-3">#ENQ12345</div>
            </div>
            <div className="d-flex enquiry py-2">
              <div>Subject : </div> 
              <div className="enquiryId ms-3">Book an Appointment</div>
            </div>
            <div className="d-flex enquiry py-2">
              <div>Message : </div> 
              <div className="enquiryId ms-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. A nunc nunc, ac aliquam lectus. Mauris elementum libero, amet quis. Vitae, egestas tellus pellentesque dui augue. Etiam lectus lectus venenatis, eu.
              </div>
            </div>
          </div>
        </div>

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
        <div>
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

         
        <div className="d-flex ms-4 chatResponses mb-3">
          <Avatar sx={{ bgcolor: "#c8d8ff" }} sizes={33}>S</Avatar>
          <div className="responsesBox ms-3">
            <div className="d-flex enquiry py-2">
              <div>Enquiry ID :</div> 
              <div className="enquiryIdLink ms-3">#ENQ12345</div>
            </div>
            <div className="d-flex enquiry py-2">
              <div>Subject : </div> 
              <div className="enquiryId ms-3">Book an Appointment</div>
            </div>
            <div className="d-flex enquiry py-2">
              <div>Message : </div> 
              <div className="enquiryId ms-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. A nunc nunc, ac aliquam lectus. Mauris elementum libero, amet quis. Vitae, egestas tellus pellentesque dui augue. Etiam lectus lectus venenatis, eu.
              </div>
            </div>
          </div>
        </div>
        
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
        <div>
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

         
        <div className="d-flex ms-4 chatResponses mb-3">
          <Avatar sx={{ bgcolor: "#c8d8ff" }} sizes={33}>S</Avatar>
          <div className="responsesBox ms-3">
            <div className="d-flex enquiry py-2">
              <div>Enquiry ID :</div> 
              <div className="enquiryIdLink ms-3">#ENQ12345</div>
            </div>
            <div className="d-flex enquiry py-2">
              <div>Subject : </div> 
              <div className="enquiryId ms-3">Book an Appointment</div>
            </div>
            <div className="d-flex enquiry py-2">
              <div>Message : </div> 
              <div className="enquiryId ms-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. A nunc nunc, ac aliquam lectus. Mauris elementum libero, amet quis. Vitae, egestas tellus pellentesque dui augue. Etiam lectus lectus venenatis, eu.
              </div>
            </div>
          </div>
        </div>
        
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

      <div className="chatKeypad d-flex">
        <div className="chatTextArea">
          <TextareaAutosize
            aria-label="meta description"
            placeholder="Write your message here..."
            style={{
              background: "#15142A",
              color: "#c8d8ff",
              borderRadius: 5,
              width: "100%",
              padding: 15,
            }}
            minRows={2}
          />
          <div className="text-lightBlue c-pointer">
            <SentimentSatisfiedAltIcon />
            <AttachmentIcon /> 
            <KeyboardVoiceIcon />
            <LinkIcon />
          </div>
        </div>

        <button className="button-gradient py-2 px-4 chatSendButton ms-4">
          <img src={send} className="me-2"/>
          <p> Send </p>
        </button>
      </div>
      

    </SwipeableDrawer>
  );
};

export default ChatBox;