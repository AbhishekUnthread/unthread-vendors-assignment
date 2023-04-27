import { useState, useEffect } from "react";
import {
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import login from "../../../assets/icons/login.svg";
import facebook from "../../../assets/icons/facebook.svg";
import google from "../../../assets/icons/google.svg";

import { showSuccess } from "../../../features/snackbar/snackbarAction";
import { useDispatch } from "react-redux";

import "./Login.scss";

import Messages from "../../../components/Snackbar/Snackbar";

import { signIn, validatetoken } from "../services/authService";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPasswordHandler = () =>
    setShowPassword((prevState) => !prevState);

  let [message, setMessage] = useState("dsdsa");

  const [formValues, setFormValues] = useState({
    identifier: "",
    password: "",
  });

  const updateFormFields = (key, value) => {
    const updatedFields = { ...formValues };
    updatedFields[key] = value;
    setFormValues(updatedFields);
  };

  let onKeyUp = (event) => {
    if (event.charCode === 13) {
      updateLogin();
    }
  };

  const updateLogin = () => {
    let allValues = Object.values(formValues).every((v) => v);
    if (!allValues) {
      setMessage("Please enter all fields!");
      return;
    }

    setMessage("Signing In");

    signIn(formValues)
      .then((res) => {
        responsehandled(res);
      })
      .catch((err) => {
        setMessage(err);
      });
  };
  let googleLogin = () => {
    window.open("https://backend.unthread.in/api/connect/google", "_self");
  };
  let facebookLogin = () => {
    window.open("https://backend.unthread.in/api/connect/facebook", "_self");
  };

  let responsehandled = (res) => {
    if (res?.error?.message) {
      setMessage(res?.error?.message);
      return;
    }

    sessionStorage.setItem("userData", JSON.stringify(res));

    navigate("/dashboard", { replace: true });
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setMessage("Validating");
      validatetoken(
        `/api/auth/google/callback/?id_token=${sessionStorage.getItem("token")}`
      ).then((res) => {
        sessionStorage.removeItem("token");
        responsehandled(res);
      });
    }
  }, []);

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
          <img src={login} alt="login" className="w-100 login-image" />
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
            <div className="mt-4">
              <p className="text-lightBlue mb-1 text-start">Enter Email</p>
              <FormControl className="w-100 px-0">
                <OutlinedInput
                  placeholder="Enter Email"
                  size="small"
                  sx={{ paddingLeft: 0 }}
                />
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
              </FormControl>
            </div>

            <button className="button-gradient py-2 w-100 px-3 mt-4">
              <p>Login</p>
            </button>
            <p className="text-grey-6 my-4">or sign in with</p>
            <div className="d-flex row">
              <div className="col-6">
                <button className="button-lightBlue-outline w-100 px-2 py-2">
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
      <Messages messageLine={message} setMessage={setMessage}></Messages>
    </div>
  );
};

export default Login;
