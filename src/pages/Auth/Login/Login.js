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

import loginImage from "../../../assets/icons/login.svg";
import facebook from "../../../assets/icons/facebook.svg";
import google from "../../../assets/icons/google.svg";

import {
  showSuccess,
  showError,
} from "../../../features/snackbar/snackbarAction";
import {
  useLoginMutation,
  useGoogleLoginQuery,
} from "../../../features/auth/authApiSlice";
import { loginHandler } from "../../../features/auth/authAction";
import { setUserHandler } from "../../../features/user/userAction";

import "./Login.scss";

YupPassword(Yup);

const loginValidationSchema = Yup.object({
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
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [googleLogin, setGoogleLogin] = useState(false);

  const [
    login,
    {
      data: loginData,
      isSuccess: loginIsSuccess,
      isLoading: loginIsLoading,
      error: loginError,
    },
  ] = useLoginMutation();

  useGoogleLoginQuery(
    {},
    {
      skip: !googleLogin,
    }
  );

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    enableReinitialize: true,
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      login(values)
        .unwrap()
        .then(() => formik.resetForm());
    },
  });

  const toggleShowPasswordHandler = () =>
    setShowPassword((prevState) => !prevState);

  const googleLoginHandler = () => setGoogleLogin(true);

  useEffect(() => {
    if (loginError) {
      if (loginError.data?.message) {
        dispatch(showError({ message: loginError.data.message }));
      } else {
        dispatch(
          showError({ message: "Something went wrong!, please try again" })
        );
      }
    }

    if (loginIsSuccess) {
      const {
        data: {
          data: { userId, userName, email },
          Authorization: accessToken,
        },
      } = loginData;
      dispatch(loginHandler({ accessToken, refreshToken: "" }));
      dispatch(setUserHandler({ email, userId, userName }));
      dispatch(showSuccess({ message: "Logged in successful" }));
      navigate("/dashboard", { replace: true });
    }
  }, [loginError, loginIsSuccess, loginData, dispatch, navigate]);

  return (
    <div className="container-fluid login">
      <div className="row align-items-center justify-content-center py-5">
        <div className="col-md-8 ps-md-0 ps-3">
          <h1 className="text-blue-gradient fw-bold ps-0 ps-md-5">LOGO</h1>
          <p className="text-blue-gradient mt-4 w-75 ps-0 ps-md-5">
            TestLorem ipsum dolor, sit amet consectetur adipisicing elit. Amet
            eligendi dolor, earum nisi accusantium laboriosam non perspiciatis
            eos sed. Dicta, vitae hic. Non molestias quisquam obcaecati sed
            omnis rem est!
          </p>
          <img src={loginImage} alt="login" className="w-100 login-image" />
        </div>
        <div className="col-md-4 pe-md-5 pe-3">
          <div className="login-box border-grey-5 rounded-8 px-4 py-5 justify-content-center text-center">
            <h3 className="text-white fw-600 text-center">Welcome</h3>
            <p className="text-grey-6 text-center mt-3">
              Don't have an account?&nbsp;
              <Link
                className="text-decoration-none text-blue-gradient"
                to="/auth/signup"
              >
                Sign Up
              </Link>
            </p>
            <form noValidate onSubmit={formik.handleSubmit}>
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
                loading={loginIsLoading}
                disabled={loginIsLoading || loginIsSuccess}
                type="submit"
                className="button-gradient py-2 w-100 px-3 mt-4"
              >
                <p>Login</p>
              </LoadingButton>
            </form>
            <p className="text-grey-6 my-4">or sign in with</p>
            <div className="d-flex row">
              <div className="col-6">
                <button
                  onClick={googleLoginHandler}
                  className="button-lightBlue-outline w-100 px-2 py-2"
                >
                  <img src={google} alt="google" className="w-auto me-2" />
                  Google
                </button>
              </div>
              <div className="col-6">
                <button className="button-lightBlue-outline w-100 px-2 py-2">
                  <img src={facebook} alt="facebook" className="w-auto me-2" />
                  Facebook
                </button>
              </div>
              <div className="col-12 mt-4 text-center d-flex justify-content-center">
                <small className="text-grey-6 w-75 d-block text-center">
                  By creating an account means you agree to the Terms &
                  Conditions and our Privacy Policy
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
