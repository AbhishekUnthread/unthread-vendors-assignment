import React from "react";
import "./Login.scss";
import login from "../../../assets/icons/login.svg";
import facebook from "../../../assets/icons/facebook.svg";
import google from "../../../assets/icons/google.svg";
import { FormControl, InputAdornment, OutlinedInput } from "@mui/material";
import AppMobileCodeSelect from "../../../components/AppMobileCodeSelect/AppMobileCodeSelect";
import { Link,useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux'
import  Messages from '../../../components/snackbar/snackbar.js'
import { signIn } from "../services/authService";

const Login = () => {
  let navigate = useNavigate();

  
  
  let [message,setMessage]=React.useState('')

  const [formValues, setFormValues] = React.useState({
    "identifier":"",
    "password":"",
  });

  const updateFormFields = (key, value) => {
    const updatedFields = { ...formValues };
    updatedFields[key] = value;
    setFormValues(updatedFields);
  };

  const dispatcher=useDispatch();

  const updateLogin=()=>{

    let allValues=Object.values(formValues).every((v) => v)
    if(!allValues){
      setMessage('Please enter all fields!')
      return;
    }

    setMessage('Signing In')
   
    signIn(formValues).then(res=>{
      if(res?.error?.message){
        setMessage(res?.error?.message)
        return;
      }

      dispatcher({type:'',data:res})

      navigate("/dashboard", { replace: true });

    }).catch(err=>{
      setMessage(err)
    })

  }

  return (
    <div className="container-fluid login">
      <div className="row align-items-center justify-content-center py-5">
        <div className="col-md-8 ps-md-0 ps-3">
          <h1 className="text-blue-gradient fw-bold ps-0 ps-md-5">LOGO</h1>
          <p className="text-blue-gradient mt-4 w-75 ps-0 ps-md-5">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet
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
            {/* <div className="mt-4">
              <p className="text-lightBlue mb-1 text-start">Mobile Number</p>
              <FormControl className="w-100 px-0">
                <OutlinedInput
                  placeholder="Enter Mobile Number"
                  size="small"
                  sx={{ paddingLeft: 0 }}
                  startAdornment={
                    <InputAdornment position="start">
                      <AppMobileCodeSelect />
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
            </div> */}


                <div className="mt-4">
              <p className="text-lightBlue mb-1 text-start">Enter Email</p>
              <FormControl className="w-100 px-0">
                <OutlinedInput
                  placeholder="Enter Email"
                  size="small"
                  sx={{ paddingLeft: 0 }}
                  value={formValues.identifier}
                onChange={(e) => updateFormFields("identifier", e.target.value)}
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
                  value={formValues.password}
                onChange={(e) => updateFormFields("password", e.target.value)}
                />
              </FormControl>
            
            </div>

            <button onClick={updateLogin} className="button-gradient py-2 w-100 px-3 mt-4">
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
