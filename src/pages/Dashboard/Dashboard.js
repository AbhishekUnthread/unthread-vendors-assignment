import React from "react";
import {useSelector,useDispatch} from 'react-redux'
import { Link,useNavigate } from "react-router-dom";

const Dashboard = () => {
  let navigate = useNavigate();

  const loginData=useSelector(state=>state.data)
  return <div>Dashboard</div>;
};

export default Dashboard;
