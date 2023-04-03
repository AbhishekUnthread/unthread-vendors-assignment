import React from "react";
import {useSelector,useDispatch} from 'react-redux'
import { Link,useNavigate } from "react-router-dom";

const Dashboard = () => {
  let navigate = useNavigate();

  const isLogin=useSelector(state=>state.data)
  React.useEffect(()=>{
    if(!isLogin){
      navigate("/auth/login", { replace: true });
    }
  },[])
  return <div>Dashboard</div>;
};

export default Dashboard;
