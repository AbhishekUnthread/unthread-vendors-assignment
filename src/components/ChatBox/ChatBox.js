import { Dialog, DialogActions, DialogContent, DialogTitle, Tooltip, Typography } from "@mui/material";
import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import CallIcon from '@mui/icons-material/Call';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function ChatBox() {
  const messages = [
    'Heyy wassupp',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit sem maecenas turpis orci mi.',
    'Wow! Thank you for this quick solution!',
    'Ye tho mera kaam hai!'
    // Add more messages as needed
  ];
  return (
    <React.Fragment>
      <Dialog
        open={true}
        fullWidth={true}
      >
        <DialogTitle>
          <div className="d-flex">
            <img
                src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
                alt="user"
                className="me-2 rounded-circle"
                height={45}
                width={45}
            />
            <div>
            <h2>Saniya Shaikh</h2>
            <small>Online</small>
            </div>
            <p>( View Profile )</p>
          <div className="d-flex align-items-center">
                          <Tooltip title="Search" placement="top">
                            <div className="table-edit-icon rounded-4 p-2" 
                                // onClick={(e) => {
                                //   handleSearch()
                                // }}
                            >
                              <SearchIcon
                                sx={{
                                  color: "#5c6d8e",
                                  fontSize: 18,
                                  cursor: "pointer",
                                }}
                              />
                            </div>
                          </Tooltip>

                          <Tooltip
                            //   onClick={() => {
                            //     handleCall()
                            //     }
                            //   }
                                  title="Call"
                                  placement="top"
                                >
                                  <div className="table-edit-icon rounded-4 p-2">
                                    <CallIcon
                                      sx={{
                                        color: "#5c6d8e",
                                        fontSize: 18,
                                        cursor: "pointer",
                                      }}
                                    />
                                  </div>
                          </Tooltip>
                          <Tooltip
                            //   onClick={() => {
                            //     handleCall()
                            //     }
                            //   }
                                  title="More"
                                  placement="top"
                                >
                                  <div className="table-edit-icon rounded-4 p-2">
                                    <MoreVertIcon
                                      sx={{
                                        color: "#5c6d8e",
                                        fontSize: 18,
                                        cursor: "pointer",
                                      }}
                                    />
                                  </div>
                          </Tooltip>
                        </div>
                        </div>
        </DialogTitle>
        <hr className="hr-grey-6 my-0" />
        <DialogContent className="py-3 px-4">
        {messages.map((message, index) => (
        <div
          style={{
            display: "flex",
            padding: "20px",
            flexDirection: "column",
            alignItems: "flex-start",
            marginBottom: "13px",
            borderRadius: "18px 18px 18px 0px",
            background: "var(--surface-4, #22233F)",
            maxWidth : "fit-content"
            ,
          }}
        >{messages}
        </div>
        ))}
      </DialogContent>
        <hr className="hr-grey-6 my-0" />
        <DialogActions className="d-flex justify-content-between px-4 py-3">

        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default ChatBox;
