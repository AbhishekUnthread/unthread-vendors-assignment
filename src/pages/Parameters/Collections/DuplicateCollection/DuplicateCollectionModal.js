import { useState, useEffect, forwardRef } from "react";
import { useDispatch } from "react-redux";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  OutlinedInput,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Slide,
  Tooltip,
} from "@mui/material";

import {
  showSuccess,
  showError,
} from "../../../../features/snackbar/snackbarAction";
import {
  useCreateCollectionMutation,
} from "../../../../features/parameters/collections/collectionsApiSlice";

import "../../CreateCollection/CreateCollection.scss";

import info from "../../../../assets/icons/info.svg";
import cancel from "../../../../assets/icons/cancel.svg";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DuplicateCollection = ({
    duplicateData,
    openDuplicateCollection, 
    handleDuplicateCollectionClose,
    newDuplicateCollection
}) => {
    const dispatch = useDispatch();
    const [collectionTitle, setCollectionTitle] = useState("");
    const [duplicateTitle, setDuplicateTitle] = useState("");
    const [duplicateDescription, setDuplicateDescription] = useState(false);

    useEffect(() => {
      if (duplicateData != null) {
        setCollectionTitle(duplicateData?.title);
      }
    }, [duplicateData]);

    useEffect(() => {
      if(duplicateTitle == "" && collectionTitle) {
        setDuplicateTitle(`${collectionTitle} copy`);
      }
    }, [collectionTitle]);

    const handleDuplicateTitle = (e) => {
      const value = e.target.value;
      setDuplicateTitle(value)
    };

    const [
      createCollection,
      {
        isLoading: createCollectionIsLoading,
        isSuccess: createCollectionIsSuccess,
        error: createCollectionError
      },
    ] = useCreateCollectionMutation();

    const createDuplicateCollection = () => {
      const collectionData = {
        title: duplicateTitle,
        filter: duplicateData?.filter,
        status: duplicateData?.status,
        isVisibleFrontend: duplicateData?.isVisibleFrontend,
        notes: duplicateData?.notes
      };

      if (duplicateDescription === true) {
        collectionData.description = duplicateData?.description;
      }

      createCollection(collectionData)
      .unwrap()
      .then((res) => {
          newDuplicateCollection(res)
          handleDuplicateCollectionClose(false);
          dispatch(showSuccess({ message: "Duplicate Created successfully" }));
      });
    };

    useEffect(() => {
      if (createCollectionError) {
        if (createCollectionError?.data?.message) {
          dispatch(showError({ message: createCollectionError.data.message }));
        } else {
          dispatch(
            showError({ message: "Failed to update Collection. Please try again." })
          );
        }
      }
    }, [createCollectionError, dispatch]);

  return (
    <Dialog
      open={openDuplicateCollection}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleDuplicateCollectionClose}
      aria-describedby="alert-dialog-slide-description"
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogTitle>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="text-lightBlue fw-500">Duplicate Collection</h5>
          <img
            src={cancel}
            alt="cancel"
            width={30}
            onClick={handleDuplicateCollectionClose}
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
        <small className="mt-1 text-grey-6 font1">
          These banner will be see no PLP page as promotional banner
        </small>
      </DialogTitle>
      <hr className="hr-grey-6 my-0" />
      <DialogContent className="py-3 px-4 schedule-product">
        <div className="d-flex mb-1">
          <p className="text-lightBlue me-2">Collection Title</p>
        </div>
        <FormControl className="w-100 px-0">
          <OutlinedInput
            placeholder="Mirosa Collection_copy"
            size="small"
            name="title"
            value={duplicateTitle}
            onChange={handleDuplicateTitle}
          />
        </FormControl>
        <hr className="hr-grey-6 my-0" />
        <div className="d-flex mb-1 mt-3">
          <p className="text-lightBlue me-2">What to Include in this Duplicate</p>
        </div>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                name="filter"
                checked={duplicateDescription}
                onChange={(e)=>setDuplicateDescription(e.target.checked)}
                inputProps={{ "aria-label": "controlled" }}
                size="small"
                style={{
                  color: "#5C6D8E",
                  marginRight: 0,
                }}
              />
            }
            label="Description"
            sx={{
              "& .MuiTypography-root": {
                fontSize: 13,
                color: "#99a6c0",
              },
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="filter"
                inputProps={{ "aria-label": "controlled" }}
                size="small"
                style={{
                  color: "#5C6D8E",
                  marginRight: 0,
                }}
              />
            }
            label="Products"
            sx={{
              "& .MuiTypography-root": {
                fontSize: 13,
                color: "#99a6c0",
              },
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="filter"
                inputProps={{ "aria-label": "controlled" }}
                size="small"
                style={{
                  color: "#5C6D8E",
                  marginRight: 0,
                }}
              />
            }
            label="Up Selling Banners"
            sx={{
              "& .MuiTypography-root": {
                fontSize: 13,
                color: "#99a6c0",
              },
            }}
          />
        </FormGroup>
      </DialogContent>
      <hr className="hr-grey-6 my-0" />
      <DialogActions className="d-flex flex-column justify-content-start px-4 py-3">
        <div className="d-flex justify-content-between w-100">
          <button
            className="button-grey py-2 px-5"
            onClick={handleDuplicateCollectionClose}
          >
            <p className="text-lightBlue">Cancel</p>
          </button>
          <button
            className="button-gradient py-2 px-5"
            onClick={createDuplicateCollection}
          >
            <p>Save</p>
          </button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default DuplicateCollection;
