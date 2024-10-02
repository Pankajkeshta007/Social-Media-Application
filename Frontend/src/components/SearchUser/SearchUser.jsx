import React, { useState } from "react";
import { Avatar, Card, CardHeader, Input } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { searchUser } from "../../Redux/Auth/auth.action";
import { createChat } from "../../Redux/Message/message.action";

const SearchUser = () => {

  const [username, setUsername]=useState("");
   const dispatch=useDispatch();

   const {message,auth}=useSelector(store=>store)

  const handleSearchUser = (e) => {
    setUsername(e.target.value)


    console.log("search user....");
    dispatch(searchUser(username))
  };

  const handleClick = (id) => {
    dispatch(createChat({userId:id}))
   
  };
  return (
    <div>
      <div className="py-2 relative ">
        <Input
      
        // className=" bg-transparent border border-[#3b40544] rounded-full w-[90%] py-3 px-5 "
        // placeholder="Type message..."
        // type="text"
      
          className=" w-full  px-2 py-2 outline-none  bg-transparent border border-[#3b40544] rounded-full "
          type="text"
          placeholder="search for user..."
          onChange={handleSearchUser}
        />

{username && (
       auth.searchUser.map((item)=>
       <Card  key= {item.id} className="absolute w-full z-10 top-[4.5rem] cursor-pointer">
          <CardHeader
            onClick={() => {
              handleClick(item.id);
              setUsername("")
            }}
            avatar={
              <Avatar src="https://cdn.pixabay.com/photo/2016/01/11/23/05/girl-1134567_640.jpg" />
            }
            title={item.firstName+" "+item.lastName}
            subheader={"@"+item.firstName.toLowerCase()+"_"+item.lastName.toLowerCase()}
          />
        </Card>
      )
      )}
      </div>

      
    </div>
  );
};

export default SearchUser;
