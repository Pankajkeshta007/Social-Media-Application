import React from "react";
import { navigationMenu } from "./SideBarNavigation";
import Avatar from "@mui/material/Avatar";

import Divider from "@mui/material/Divider";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Card } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Login } from "@mui/icons-material";
import { logoutAction } from "../../Redux/Auth/auth.action";
import './sidebar.css';

const Sidebar = () => {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    dispatch(logoutAction());
  // Redirect to login or register page
  navigate('/login'); 
  };

  const handleNavigate = (item) => {
    if (item.title === "Profile") {
      navigate(`/profile/${auth.user?.id}`);
    }
  };
  return (
    <div className="Card h-screen flex flex-col justify-between py-5 ">
      <div className="space-y-8 pl-5 mx-auto">
        <div className="">
          <span className="logo font-bold text-xl">Social App</span>
        </div>
        <div className="space-y-3">
          {navigationMenu.map((item) => (
            <div 
              onClick={() => handleNavigate(item)}
              
            >
              <Link className=" Sidebar-Element cursor-pointer flex space-x-5 h-[3rem] p-2" to={item.path}>
                {item.icon}
                <p className="text-xl">{item.title}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="pl-5 flex items-center justify-between pt-3 mx-auto Logout-Section">
          <div className="flex items-center space-x-3">
            <Avatar src="https://cdn.pixabay.com/photo/2018/01/06/09/25/hijab-3064633_1280.jpg" />
            <div>
              <p className="font-bold">
                {auth.user?.firstName + " " + auth.user?.lastName}
              </p>
              <p className="opacity-70">
                @
                {auth.user?.firstName.toLowerCase() +
                  "_" +
                  auth.user?.lastName.toLowerCase()}
              </p>
            </div>
          </div>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreVertIcon  className="text-white" />
          </Button>
          <Menu
         
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
