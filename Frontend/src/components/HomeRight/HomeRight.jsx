import React from "react";
import SearchUser from "../SearchUser/SearchUser";
import { Card } from "@mui/material";
import PopularUserCard from "./PopularUserCard";
import "./homeright.css";

const popularUser = [1];
const HomeRight = () => {
  return (
    <div className="pr-5">
      <SearchUser />

      <div className="Suggestion">
        <div className="flex justify-between p-2 items-center">
          <p className="font-semibold opacity-70">Suggestions for you</p>
          <p className="text-xs opacity-95 font-semibold">View All</p>
        </div>
        <div className="">
          {popularUser.map((item) => (
            <PopularUserCard />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeRight;
