import React, { useEffect } from "react";
import UserReelCard from "./UserReelCard";
import { useDispatch, useSelector } from "react-redux";
import ReelCard from "./ReelCard";
import { getAllReelsAction } from "../../Redux/Reels/reel.action";
import { Card } from "@mui/material";

//const reels=[11,1,1,1,1,1];
const Reels = () => {
  const dispatch = useDispatch();
  const { reel } = useSelector((store) => store);
  useEffect(() => {
    dispatch(getAllReelsAction());
  }, []);
  return (
    <div>
      <div className="mt-5 space-y-5">
        {reel.reels.map((item) => (
          <ReelCard item={item} />
        ))}
      </div>
    </div>
  );
};

export default Reels;
