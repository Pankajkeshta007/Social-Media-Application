import { Grid } from "@mui/material";
import React from "react";
import Sidebar from "../components/SideBar/Sidebar";
import { BrowserRouter, Route, Router, Routes, useLocation } from "react-router-dom";
import MiddlePart from "../components/MiddlePart/MiddlePart";
import Reels from "../components/Reels/Reels";
import CreateReelsForm from "../components/Reels/CreateReelsForm";
import Profile from "../Pages/Profile/Profile";
import HomeRight from "../components/HomeRight/HomeRight";

const HomePage1 = () => {
  const location = useLocation();
  return (
    <div className="px-20">
      <Grid container spacing={0}>
        <Grid item xs={0} lg={3}>
          <div className="sticky top-0">
            <Sidebar />
          </div>
        </Grid>
        <Grid
          lg={location.pathname == "/" ? 6 : 9}
          item
          className="px-5 flex justify-center"
          xs={12}
        >
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MiddlePart />} />
              <Route path="/reels" element={<Reels />} />
              <Route path="/createreels" element={<CreateReelsForm />} />
              <Route path="/profile/:id" element={<Profile />} />
            </Routes>
          </BrowserRouter>
        </Grid>
        <Grid item lg={3} className="relative">
          <div className="sticky top-0 w-full">
            <HomeRight />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage1;
