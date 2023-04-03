import React from "react";
import "./Signup.scss";
import { FormControl, InputAdornment, OutlinedInput } from "@mui/material";
import AppMobileCodeSelect from "../../../components/AppMobileCodeSelect/AppMobileCodeSelect";

const Signup = () => {
  return (
    <div className="container-fluid signup">
      <div className="row align-items-center justify-content-center py-5 align-items-center signup-row">
        <div className="col-auto signup-box border-grey-5 rounded-8 px-4 py-5 justify-content-center text-center">
          <h3 className="text-lightBlue fw-600 text-center">
            Sign up in 10mins
          </h3>
          <p className="text-grey-6 text-center mt-3">
            Already have an account?&nbsp;
            <span className="text-blue-gradient">Sign Up</span>
          </p>
          <div className="row">
            <div className="col-md-6">
              <div className="mt-4">
                <p className="text-lightBlue mb-1 text-start">
                  Enter First Name
                </p>
                <FormControl className="w-100 px-0">
                  <OutlinedInput
                    placeholder="Your First Name"
                    size="small"
                    sx={{ paddingLeft: 0 }}
                  />
                </FormControl>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mt-4">
                <p className="text-lightBlue mb-1 text-start">
                  Enter Last Name
                </p>
                <FormControl className="w-100 px-0">
                  <OutlinedInput
                    placeholder="Your Last Name"
                    size="small"
                    sx={{ paddingLeft: 0 }}
                  />
                </FormControl>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-lightBlue mb-1 text-start">Mobile Number</p>
            <FormControl className="w-100 px-0">
              <OutlinedInput
                placeholder="Enter Mobile Number"
                size="small"
                sx={{ paddingLeft: 0 }}
                startAdornment={
                  <InputAdornment position="start">
                    <AppMobileCodeSelect />
                    {/* &nbsp;&nbsp;&nbsp;&nbsp;| */}
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
          <div className="mt-4">
            <p className="text-lightBlue mb-1 text-start">Enter OTP</p>
            <FormControl className="w-100 px-0">
              <OutlinedInput
                placeholder="Enter four digit OTP"
                size="small"
                sx={{ paddingLeft: 0 }}
              />
            </FormControl>
            <small className="d-block mt-2 text-start text-lightBlue">
              Haven't received code?&nbsp;
              <span className="text-blue-gradient">Resend in 0:59 sec</span>
            </small>
          </div>
          <button className="button-gradient py-2 w-100 px-3 mt-4">
            <p>Create your Store</p>
          </button>
          <div className="d-flex row">
            <div className="col-12 mt-4 text-center d-flex justify-content-center">
              <small className="text-grey-6 w-75 d-block text-center">
                By creating an account means you agree to the Terms & Conditions
                and our Privacy Policy
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
