import logo from "./logo.svg";
import "./App.css";
import Authentication from "./Pages/Authentication/Authentication";
import { Route, Routes } from "react-router-dom";
import Message from "./Pages/Message/Message";
import HomePage2 from "./HomePage/HomePage2";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfileAction } from "./Redux/Auth/auth.action";
import { store } from "./Redux/store";

function App() {

  const {auth} = useSelector(store=>store);
  const dispatch= useDispatch();
  const jwt = localStorage.getItem("jwt");

  useEffect(()=>{
    dispatch(getProfileAction(jwt));
    
        },[dispatch, jwt])
  return (
    <div className="">
      <Routes>
        <Route path="/*" element={auth.user?<HomePage2/>:<Authentication/>}/>
        <Route path="/message" element={<Message />} />
        {/* <Route path="/login" element={<Authentication />} /> */}
      </Routes>
    </div>
  );
}

export default App;
