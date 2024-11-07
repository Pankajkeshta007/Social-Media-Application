import React from "react";
import { red } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import { Button } from "@mui/material";
const PopularUserCard = () => {
  return (
    <div>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            S
          </Avatar>
        }
        action={<Button size="small" sx={{color:"white"}}>Follow</Button>}
        title="Sumit Verma"
        subheader="@sumit_verma"
      />
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            N
          </Avatar>
        }
        action={<Button size="small" sx={{color:"white"}}>Follow</Button>}
        title="Nikhil Sharma"
        subheader="@nikhil_sharma07"
      />
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={<Button size="small" sx={{color:"white"}}>Follow</Button>}
        title="Rohit Chauhan"
        subheader="@rohit_chauhan"
      />
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={<Button size="small" sx={{color:"white"}}>Follow</Button>}
        title="Riya Sharma"
        subheader="@riya_sharma"
      />
    </div>
  );
};

export default PopularUserCard;
