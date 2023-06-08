import React from "react";
// ! IMAGES IMPORTS
import timelineIcon from "../../assets/icons/timelineIcon.svg";
import timelineTag from "../../assets/icons/timelineTag.svg";
import timelineMicrophone from "../../assets/icons/timelineMicrophone.svg";
import timelineAttachment from "../../assets/icons/timelineAttachment.svg";
import timelineSmile from "../../assets/icons/timelineSmile.svg";
// ! MATERIAL IMPORTS
import {
  FormControlLabel,
  Checkbox,
  FormControl,
  OutlinedInput,
} from "@mui/material";

const OrderTimelines = () => {
  // ? CHECKBOX STARTS HERE
  const [checked, setChecked] = React.useState(false);

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };
  // ? CHECKBOX ENDS HERE

  return (
    <div className="bg-black-15 border-grey-5 rounded-8 p-3 row mt-4">
      <div className="d-flex justify-content-between align-items-center col-12 px-0">
        <div className="d-flex align-items-center">
          <img src={timelineIcon} alt="userIcon" width={16} />
          <h6 className="text-lightBlue fw-500 ms-2">Timelines</h6>
        </div>
      </div>

      <div className="d-flex justify-content-center col-12 px-0">
        <hr className="hr-grey-6 w-100 mt-3 mb-0" />
      </div>
      <div className="d-flex justify-content-center col-12 px-0 mt-3 align-items-start">
        {/* <div className="d-flex"> */}
        <img
          src={timelineSmile}
          alt="timelineSmile"
          width={18}
          className="me-2 c-pointer mt-2"
        />
        <img
          src={timelineAttachment}
          alt="timelineAttachment"
          width={18}
          className="me-2 c-pointer mt-2"
        />
        <img
          src={timelineTag}
          alt="timelineTag"
          width={18}
          className="me-2 c-pointer mt-2"
        />
        <img
          src={timelineMicrophone}
          alt="timelineMicrophone"
          width={18}
          className="me-2 c-pointer mt-2"
        />
        <div className="d-flex flex-column w-100">
          <FormControl className="w-100 px-0">
            <OutlinedInput
              placeholder="Write your message here..."
              size="small"
            />
          </FormControl>
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
            label="Send Notification to Customer"
            sx={{
              "& .MuiTypography-root": {
                fontSize: "0.75rem",
                color: "#c8d8ff",
                // color: "#5c6d8e",
              },
            }}
            className=" px-0"
          />
        </div>
        <button className="button-gradient ms-2 px-4 py-2">
          <p>Post</p>
        </button>
        {/* </div> */}
      </div>
      <table className="table table-borderless w-100 mt-3 mb-0 create-table">
        <thead className="">
          <tr className="bg-black-18">
            <th scope="col" className="">
              <small className="text-lightBlue fw-400">Date</small>
            </th>
            <th scope="col" className="">
              <small className="text-lightBlue fw-400">Team Member</small>
            </th>
            <th scope="col" className="">
              <small className="text-lightBlue fw-400">Activity</small>
            </th>
          </tr>
        </thead>
        <tbody>
          {[...Array(1)].map((elementInArray, index) => (
            <React.Fragment>
              <tr>
                <td width={200}>
                  <div className="d-flex flex-column py-2">
                    <p className="text-lightBlue">Today at 5:25pm</p>
                  </div>
                </td>
                <td width={200}>
                  <div className="d-flex flex-column py-2">
                    <p className="text-lightBlue">Sanjay Chauhan</p>
                  </div>
                </td>
                <td>
                  <div className="d-flex flex-column py-2">
                    <p className="text-lightBlue">
                      Order Created, Payment Pending
                    </p>
                    <small className="text-lightBlue mt-2 text-green-2">
                      <i className=" text-green-2">Customer Notified</i>
                    </small>
                  </div>
                </td>
              </tr>
              <tr>
                <td width={200}>
                  <div className="d-flex flex-column py-2">
                    <p className="text-lightBlue">Yesterday at 5:25pm</p>
                  </div>
                </td>
                <td width={200}>
                  <div className="d-flex flex-column py-2">
                    <p className="text-lightBlue">Sanjay Chauhan</p>
                  </div>
                </td>
                <td>
                  <div className="d-flex flex-column py-2">
                    <p className="text-lightBlue">Order Shipped</p>
                    <small className="text-lightBlue mt-2 text-green-2">
                      <i className="text-blue-1">
                        Hi Customer , your package has now been shipped through
                        Delhivery Tracking Number: 123456789. View tracking
                        details: https://www.delhivery.com/track/123456789
                      </i>
                    </small>
                    <small className="text-lightBlue mt-2 text-green-2">
                      <i className=" text-green-2">Customer Notified</i>
                    </small>
                  </div>
                </td>
              </tr>
              <tr>
                <td width={200}>
                  <div className="d-flex flex-column py-2">
                    <p className="text-lightBlue">Yesterday at 5:25pm</p>
                  </div>
                </td>
                <td width={200}>
                  <div className="d-flex flex-column py-2">
                    <p className="text-lightBlue">Sanjay Chauhan</p>
                  </div>
                </td>
                <td>
                  <div className="d-flex flex-column py-2">
                    <p className="text-lightBlue">QC Completed</p>

                    <small className="text-lightBlue mt-2">
                      <i className="text-grey-6">Customer not Notified</i>
                    </small>
                  </div>
                </td>
              </tr>
              <tr>
                <td width={200}>
                  <div className="d-flex flex-column py-2">
                    <p className="text-lightBlue">Yesterday at 5:25pm</p>
                  </div>
                </td>
                <td width={200}>
                  <div className="d-flex flex-column py-2">
                    <p className="text-lightBlue">Sanjay Chauhan</p>
                  </div>
                </td>
                <td>
                  <div className="d-flex flex-column py-2">
                    <p className="text-lightBlue">Invoice Cereated</p>

                    <small className="text-lightBlue mt-2">
                      <i className="text-grey-6">Customer not Notified</i>
                    </small>
                  </div>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTimelines;
