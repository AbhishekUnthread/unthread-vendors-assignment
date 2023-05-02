import { useState, useEffect } from "react";
import {
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { useFormik } from "formik";

import {
  showSuccess,
  showError,
} from "../../../features/snackbar/snackbarAction";
import { useSignUpMutation } from "../../../features/auth/authApiSlice";

import "./Signup.scss";

YupPassword(Yup);

const signUpValidationSchema = Yup.object({
  email: Yup.string().trim().email("email is not valid").required("required"),
  password: Yup.string()
    .trim()
    // .password()
    // .min(8, "must be minimum 8 characters")
    // .minLowercase(1, "must include 1 lowercase letter")
    // .minUppercase(1, "must include 1 uppercase letter")
    // .minSymbols(1, "must include 1 special letter")
    // .minNumbers(1, "must include 1 number letter")
    .required("required"),
  username: Yup.string().trim().min(3).required("required"),
});

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const [
    signUp,
    {
      data: signUpData,
      isSuccess: signUpIsSuccess,
      isLoading: signUpIsLoading,
      error: signUpError,
    },
  ] = useSignUpMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      username: "",
    },
    enableReinitialize: true,
    validationSchema: signUpValidationSchema,
    onSubmit: (values) => {
      signUp(values)
        .unwrap()
        .then(() => formik.resetForm());
    },
  });

  const toggleShowPasswordHandler = () =>
    setShowPassword((prevState) => !prevState);

  useEffect(() => {
    if (signUpError) {
      if (signUpError.data?.error?.message) {
        dispatch(showError({ message: signUpError.data.error.message }));
      } else {
        dispatch(
          showError({ message: "Something went wrong!, please try again" })
        );
      }
    }

    if (signUpIsSuccess) {
      console.log(signUpData);
      // const {
      //   jwt: accessToken,
      //   user: { email, id, provider, username },
      // } = signUpData;
      // dispatch(signUpHandler({ accessToken, refreshToken: "" }));
      // dispatch(setUserHandler({ email, id, provider, username }));
      // dispatch(showSuccess({ message: "Logged in successful" }));
      // navigate("/dashboard", { replace: true });
    }
  }, [signUpError, signUpIsSuccess, signUpData, dispatch, navigate]);

  return (
    <div className="container-fluid signup">
      <div className="row align-items-center justify-content-center py-5 align-items-center signup-row">
        <div className="col-auto signup-box border-grey-5 rounded-8 px-4 py-5 justify-content-center text-center">
          <h3 className="text-lightBlue fw-600 text-center">
            Sign up in 10mins
          </h3>
          <p className="text-grey-6 text-center mt-3">
            Already have an account?&nbsp;
            <span className="text-blue-gradient">
              <Link to="/auth/login"> Sign In</Link>
            </span>
          </p>

          <form noValidate onSubmit={formik.handleSubmit}>
            <div className="mt-4">
              <p className="text-lightBlue mb-1 text-start">Username</p>
              <FormControl className="w-100 px-0">
                <OutlinedInput
                  placeholder="Enter Username"
                  size="small"
                  sx={{ paddingLeft: 0 }}
                  name="username"
                  value={formik.values.username}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {!!formik.touched.username && formik.errors.username && (
                  <FormHelperText error>
                    {formik.errors.username}
                  </FormHelperText>
                )}
              </FormControl>
            </div>

            <div className="mt-4">
              <p className="text-lightBlue mb-1 text-start">Enter Email</p>
              <FormControl className="w-100 px-0">
                <OutlinedInput
                  placeholder="Enter Email"
                  size="small"
                  sx={{ paddingLeft: 0 }}
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {!!formik.touched.email && formik.errors.email && (
                  <FormHelperText error>{formik.errors.email}</FormHelperText>
                )}
              </FormControl>
            </div>

            <div className="mt-4">
              <p className="text-lightBlue mb-1 text-start">Enter Password</p>
              <FormControl className="w-100 px-0">
                <OutlinedInput
                  placeholder="Enter Password"
                  size="small"
                  sx={{ paddingLeft: 0 }}
                  type={!showPassword ? "password" : "text"}
                  name="password"
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={toggleShowPasswordHandler}
                        type="button"
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {!!formik.touched.password && formik.errors.password && (
                  <FormHelperText error>
                    {formik.errors.password}
                  </FormHelperText>
                )}
              </FormControl>
            </div>
            <LoadingButton
              loading={signUpIsLoading}
              disabled={signUpIsLoading || signUpIsSuccess}
              type="submit"
              className="button-gradient py-2 w-100 px-3 mt-4"
            >
              <p>Create your Store</p>
            </LoadingButton>
          </form>
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
