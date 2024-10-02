
import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import Sidebar from "../components/SideBar/Sidebar";
import {  Route, Routes, useLocation } from "react-router-dom";
import MiddlePart from "../components/MiddlePart/MiddlePart";
import Reels from "../components/Reels/Reels";
import CreateReelsForm from "../components/Reels/CreateReelsForm";
import Profile from "../Pages/Profile/Profile";
import HomeRight from "../components/HomeRight/HomeRight";
import { getProfileAction } from "../Redux/Auth/auth.action";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../Redux/store";

const HomePage2 = () => {
    const location = useLocation();
    const dispatch= useDispatch();
    const jwt = localStorage.getItem("jwt");
    const {auth}=useSelector(store => store);


    useEffect(()=>{
dispatch(getProfileAction(jwt));

    },[])
    return (
      <div className="">
        <Grid container spacing={0}>
          <Grid item xs={0} lg={3}>
            <div className="sticky top-0">
              <Sidebar />
            </div>
          </Grid>
          <Grid
            lg={location.pathname === "/" ? 6:9}
            item
            className=" flex justify-center"
            xs={12}
          >
            
              <Routes>
                <Route path="/*" element={<MiddlePart />} />
                <Route path="/reels" element={<Reels />} />
                <Route path="/createreels" element={<CreateReelsForm />} />
                <Route path="/profile/:id" element={<Profile />} />
              </Routes>
            
          </Grid>
          {location.pathname==="/" && <Grid item lg={3} className="relative">
            <div className="sticky top-0  mt-2 w-full">
              <HomeRight/>
            </div>
          </Grid>}
        </Grid>
      </div>
    );
}

export default HomePage2
