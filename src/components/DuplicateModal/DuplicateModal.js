import { forwardRef } from "react";
import {
  DialogContent,
  OutlinedInput,
  FormControl,
  Dialog,
  DialogActions,
  DialogTitle,
  Slide,
  FormHelperText,
  Tooltip,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import cancel from "../../assets/icons/cancel.svg";
import info from "../../assets/icons/info.svg";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DuplicateModal = (props) => {
  const {
    formik,
    onCancel,
    show,
    isLoading,
    duplicateList,
    message,
    fieldTitle,
  } = props;

  return (
    <Dialog
      TransitionComponent={Transition}
      keepMounted
      maxWidth="sm"
      fullWidth={true}
      open={show}
      onClose={onCancel}
    >
      <form noValidate onSubmit={formik.handleSubmit}>
        <DialogTitle>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex flex-column ">
              <h5 className="text-lightBlue fw-500">
                {message ? `Duplicate ${message}` : "Duplicate"}
              </h5>
              <small className="text-grey-6 mt-1 d-block">
                ⓘ Some Dummy Content to explain
              </small>
            </div>
            <button type="button" className="reset" onClick={onCancel}>
              <img src={cancel} alt="cancel" width={30} className="c-pointer" />
            </button>
          </div>
        </DialogTitle>
        <hr className="hr-grey-6 my-0" />
        <DialogContent className="py-3 px-4 schedule-product">
          <div className="d-flex mb-1">
            <label className="small text-lightBlue me-2">{fieldTitle}</label>
            <Tooltip title="Lorem ipsum" placement="top">
              <img src={info} alt="info" className=" c-pointer" width={13.5} />
            </Tooltip>
          </div>
          <FormControl className="w-100 px-0">
            <OutlinedInput
              size="small"
              name="title"
              value={formik.values?.title}
              onBlur={formik?.handleBlur}
              onChange={formik?.handleChange}
            />
            {!!formik.touched?.title && formik.error?.title && (
              <FormHelperText error>{formik.error?.title}</FormHelperText>
            )}
          </FormControl>
        </DialogContent>
        <hr className="hr-grey-6 my-0" />
        <DialogActions className="d-flex justify-content-between px-4 py-3">
          <button
            type="button"
            onClick={onCancel}
            className="button-grey py-2 px-5"
          >
            <p className="text-lightBlue">Cancel</p>
          </button>
          <LoadingButton
            loading={isLoading}
            disabled={isLoading}
            className="button-red-outline py-2 px-5"
            type="submit"
          >
            <p>Yes</p>
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default DuplicateModal;
