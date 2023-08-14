import { useState, forwardRef } from "react";
import _ from "lodash";
import { useDispatch } from "react-redux";
import {
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Tab,
  Tabs
} from "@mui/material";

import { 
    useGetAllCustomersQuery, 
    useEditCustomerMutation 
} from "../../features/customers/customer/customerApiSlice";
import { useGetAllCustomerGroupQuery } from "../../features/customers/customerGroup/customerGroupApiSlice";
import {
  showSuccess,
} from "../../features/snackbar/snackbarAction";

import TabPanel from "../../components/TabPanel/TabPanel";
import TableSearch from "../../components/TableSearch/TableSearch";

import cancel from "../../assets/icons/cancel.svg";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddCustomerGroup = ({ onConfirm, customerId, show }) => {
    const dispatch = useDispatch();
    const [showTab, setShowTab] = useState(0);
    const {
        data: customerData,
        isLoading: customerIsLoading,
        error: customerIsError,
        isSuccess: customerIsSuccess,
    } = useGetAllCustomersQuery({id: customerId});

    const [
        editCustomer,
        {
        data: editData,
        isLoading: editCustomerIsLoading,
        isSuccess: editCustomerIsSuccess,
        error: editCustomerError,
        }
    ] = useEditCustomerMutation();

  const {
    data: customerGroupData,
    isLoading: customerGroupIsLoading,
    isSuccess: customerGroupIsSuccess,
    error: customerGroupError,
  } = useGetAllCustomerGroupQuery();

  const selectedGroups = customerGroupData?.data?.data?.filter(group =>
    customerData?.data?.data[0]?.userGroup.includes(group._id)
  );

  const handleTab = (_, index) => {
    setShowTab(index)
  }

  const saveGroups = () => {
    editCustomer({
        id: customerId,
        // details : values
      })
        .unwrap()
          .then(() => {
            dispatch(showSuccess({ message: "Custormer group added successfully" }));
          });
  }

  return (
    <Dialog
        open={show}
        TransitionComponent={Transition}
        keepMounted
        onClose={onConfirm}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="md"
        fullWidth={true}
    >
        <DialogTitle>
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column ">
                    <h5 className="text-lightBlue fw-500">Manage Customer Group</h5>

                    <small className="text-grey-6 mt-1 d-block">
                        ⓘ Add or remove group from the customer.Manage tags in 
                    </small>
                </div>
                <img
                    src={cancel}
                    alt="cancel"
                    width={30}
                    onClick={onConfirm}
                    className="c-pointer"
                />
            </div>
        </DialogTitle>
        <DialogContent className="pb-4 px-4">
            <Tabs
                aria-label="scrollable force tabs example"
                className="tabs"
                value={showTab}
                onChange={handleTab}
            >
              <Tab label="Add" className="tabs-head" />
              <Tab label="Remove" className="tabs-head" />
            </Tabs>
            <TabPanel value={showTab} index={0}>
                <div className="mt-4 mb-3">
                    <TableSearch />
                </div>
                    {customerGroupData?.data?.data?.map((group) => (
                        <div className="mt-1">
                            <Checkbox 
                                size="small"
                                style={{
                                    color: "#5C6D8E",
                                    marginRight: 0,
                                }}
                            />
                            {group?.name}
                        </div>
                    ))}
            </TabPanel>
            <TabPanel value={showTab} index={1}>
                <div className="mt-4 mb-3">
                    <TableSearch />
                </div>
                    {customerGroupData?.data?.data?.map((group) => (
                        <div className="mt-1">
                            <Checkbox 
                                size="small"
                                style={{
                                    color: "#5C6D8E",
                                    marginRight: 0,
                                }}
                            />
                            {group?.name}
                        </div>
                    ))}
            </TabPanel>
        </DialogContent>
        <hr className="hr-grey-6 my-0" />
        <DialogActions className="d-flex justify-content-between px-4 py-3">
            <button
                className="button-grey py-2 px-5"
            >
                <p className="text-lightBlue">Cancel</p>
            </button>
            <button
                className="button-gradient py-2 px-5"
                onClick={() => saveGroups()}
            >
                <p>Save</p>
            </button>
        </DialogActions>
    </Dialog>
  );
};

export default AddCustomerGroup;