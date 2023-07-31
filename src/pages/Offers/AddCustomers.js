import { forwardRef } from "react";
import {
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Tooltip
} from "@mui/material";

import TableSearch from "../../components/TableSearch/TableSearch";

import cancel from "../../assets/icons/cancel.svg";
import info from "../../assets/icons/info.svg";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const data = [
  {name: "Jane Cooper", email: "bill.senders@example.com"},
  {name: "Jane Cooper", email: "bill.senders@example.com"},
  {name: "Jane Cooper", email: "bill.senders@example.com"},
  {name: "Jane Cooper", email: "bill.senders@example.com"},
  {name: "Jane Cooper", email: "bill.senders@example.com"}
]

const AddCustomerModal = ({
    openAddCustomerModal, 
    closeAddCustomerModal
}) => {

  return (
    <Dialog
      open={openAddCustomerModal}
      TransitionComponent={Transition}
      keepMounted
      onClose={closeAddCustomerModal}
      aria-describedby="alert-dialog-slide-description"
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogTitle>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="text-lightBlue fw-500">Add Customer</h5>
          <img
            src={cancel}
            alt="cancel"
            width={30}
            onClick={closeAddCustomerModal}
            className="c-pointer"
          />
        </div>
        <Tooltip title="Lorem ipsum" placement="top">
          <img
              src={info}
              alt="info"
              className=" c-pointer"
              width={13.5}
          />
        </Tooltip>
        <small className="text-grey-6">
          {" "}Manage customers in{" "} 
        </small>
        <small className="text-blue-2">
          Customer Module
        </small>
      </DialogTitle>
      <hr className="hr-grey-6 my-0" />
      <DialogContent className="py-3 px-4 schedule-product">
        <TableSearch />
        { data?.map((item) => (
          <div className="d-flex mt-4">
            <Checkbox />
            <div>
              <div className="text-decoration-none c-pointer">
                <p className="text-lightBlue fw-600">
                  {item?.name}
                </p>
              </div>
              <small className="text-grey-6">
                {item?.email}
              </small>
            </div>
          </div>
        ))}
      </DialogContent>
      <DialogActions className="d-flex flex-column justify-content-start px-4 py-3 mt-4">
        <div className="d-flex justify-content-between w-100">
          <button
            className="button-grey py-2 px-5"
            onClick={closeAddCustomerModal}
          >
            <p className="text-lightBlue">Cancel</p>
          </button>
          <button
            className="button-gradient py-2 px-5"
            onClick={closeAddCustomerModal}
          >
            <p>Add (4)</p>
          </button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default AddCustomerModal;
