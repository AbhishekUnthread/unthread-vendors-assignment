import {
  Button,
  FormControl,
  FormHelperText,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  Tooltip,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import info from "../../assets/icons/info.svg";

function DiscountFormat({ value, field, formik, touched, error }) {
  const [IsTouched, setIsTouched] = useState(false);


  const generateRandomCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const codeLength = 6;
    let result = "";

    for (let i = 0; i < codeLength; i++) {
      // Ensure the first character is a letter
      const charSet = i === 0 ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : characters;
      result += charSet.charAt(Math.floor(Math.random() * charSet.length));
    }

    return result;
  };

  const handleGenerateCode = () => {
    const randomCode = generateRandomCode();
    formik.setFieldValue(`${field}.discountCode`, randomCode);
  };

  const handleDiscountFormatChange = (event) => {
    formik.setFieldValue(`${field}.discountFormat`, event.target.value);
    formik.setFieldValue(`${field}.discountCode`, "");
  };

  useEffect(() => {
    if (formik.isSubmitting) {
      setIsTouched(true)
    }
  }, [formik.isSubmitting]);


  // useEffect(() => {
  //   formik.setFieldValue(`${field}.discountCode`, "");
  // }, [value?.discountFormat]);

  return (
    <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes mt-4">
      <div className="d-flex col-12 px-0 justify-content-between">
        <div className="d-flex align-items-center">
          <h6 className="text-lightBlue me-auto text-lightBlue fw-500">
            Discount Method
          </h6>
          <Tooltip title="Lorem ipsum" placement="top">
            <img
              src={info}
              alt="info"
              className="ms-2 c-pointer"
              width={13.5}
            />
          </Tooltip>
        </div>
      </div>
      <hr className="hr-grey-6 mt-3 mb-0" />
      <div className="col-12 px-0">
        <div className="column">
          <FormControl className="px-0 py-2 ">
            <RadioGroup
              className="d-flex flex-row text-grey-6"
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value?.discountFormat}
              onChange={handleDiscountFormatChange}
              defaultValue="code"
            >
              <FormControlLabel
                value="code"
                control={<Radio size="small" />}
                label=<p>Discount Coupon Code</p>
                className={value?.discountFormat === "code" ? "text-lightBlue" : "text-grey-6"}
              />
              <FormControlLabel
                value="automatic"
                control={<Radio size="small" />}
                label=<p>Automatic Discount</p>
                className={value?.discountFormat === "automatic" ? "text-lightBlue" : "text-grey-6"}

              />
            </RadioGroup>
          </FormControl>
          <div className="col-md-7 mt-3 discount-gradient-inputs">
            <div className="d-flex mb-1">
              <p className="text-lightBlue">{`${
                value?.discountFormat === "automatic"
                  ? `Discount Name`
                  : `Type Discount Code`
              }`}</p>
              <Tooltip title="Lorem ipsum" placement="top">
                <img
                  src={info}
                  alt="info"
                  className="ms-2 c-pointer"
                  width={13.5}
                />
              </Tooltip>
            </div>

            <FormControl className="w-100 px-0">
              <OutlinedInput
                placeholder="Enter Discount Code"
                size="small"
                value={value?.discountCode}
                // onChange={(e) => {
                //   const capitalizedValue = e.target.value.toUpperCase();
                //   formik.setFieldValue(`${field}.discountCode`, capitalizedValue);
                // }}
                onChange={formik.handleChange}
                onBlur={formik?.handleBlur}
                name={`${field}.discountCode`}
                endAdornment={
                  value?.discountFormat === "automatic" ? null : (
                    <InputAdornment position="end" onClick={handleGenerateCode}>
                      Generate Code
                    </InputAdornment>
                  )
                }
              />
            </FormControl>
            <small className="mt-1 text-grey-6 font1">
              {!!touched && error?.discountCode ? (
                <FormHelperText error>{error?.discountCode}</FormHelperText>
              ) : (
                <>
                  {value?.discountFormat === "automatic"
                    ? "Customer will have to enter in coupons to avail discount"
                    : "User will have to enter in coupons to avail Discount"}
                </>
              )}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiscountFormat;
