import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PostCard from "../../components/Post/PostCard";
import { Card } from "@mui/material";
import UserReelCard from "../../components/Reels/UserReelCard";
import ProfileModal from "./ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../Redux/store";
import { fetchUserPostsSuccess, getALlPostAction, getUsersPostAction } from "../../Redux/Post/post.action";
import { fetchUserReelsSuccess, getAllReelsAction } from "../../Redux/Reels/reel.action";
import { api } from "../../config/api";
import ReelCard from "../../components/Reels/ReelCard";
import './profile.css';

const tabs = [
  { value: "post", name: "Post" },
  { value: "reels", name: "Reels" },
  { value: "saved", name: "Saved" },
  { value: "repost", name: "Repost" },
];

//const posts = [1, 1, 1, 1];
//const reels = [1, 1, 1, 1];
//const savedPost = [1,1,1,1];
const Profile = () => {
  const { userReels,auth,post,reel} = useSelector(store=>store);
  const {userPosts}=useSelector(store=>store);

  const [value, setValue] = useState("post");

  const dispatch = useDispatch();
  //const userPosts=auth.user.post?.posts || [];
  //const currentUserPosts = userPosts.filter((post) => post.user === auth.user.id);
//console.log("Profile Section------user posts",currentUserPosts)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [open, setOpen] = useState(false);
  const handleOpenProfileModal = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch(getUsersPostAction(`${auth.user.id}`));
  }, [auth]);

  useEffect(() => {
    const fetchUserReels = async () => {
      try {
        // Make API call to fetch user reels
        const response = await api.get(`/api/reels/user/${auth.user.id}`);
        const userReelsData = response.data;
        
        // Dispatch action to update user posts in Redux state
        dispatch(fetchUserReelsSuccess(userReelsData));
        console.log("Profile Section------user Reels",userReelsData)
      } catch (error) {
        console.log("Error fetching user Reels :", error);
      }
    };
    fetchUserReels();
  }, [auth, dispatch]);

 
 console.log("Profile Page ---user Posts",post.userPosts);
 console.log("Profile Page-------user Reels",reel.userReels);



  // useEffect(() => {
  //   const fetchUserPosts = async () => {
  //     try {
  //       // Make API call to fetch user posts
  //       const response = await api.get(`/api/posts/user/${auth.user.id}`);
  //       const userPostsData = response.data;
        
  //       // Dispatch action to update user posts in Redux state
  //       dispatch(fetchUserPostsSuccess(userPostsData));
  //       console.log("Profile Section------user Posts",userPostsData)
  //     } catch (error) {
  //       console.log("Error fetching user posts:", error);
  //     }
  //   };
  
  //   fetchUserPosts();
  // }, [auth, dispatch]);
  return (
    <Card className="my-10 w-[70%]">
      <div className="rounded-md">
        <div className="h-[15rem]">
          <img
            className="w-full h-full rounded-t-md"
            src="https://cdn.pixabay.com/photo/2024/01/27/18/24/squirrel-8536537_1280.jpg"
            alt=""
          />
        </div>
        <div className="px-5 flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            className="transform -translate-y-36"
            sx={{ width: "10rem", height: "10rem" }}
            src=" https://cdn.pixabay.com/photo/2017/02/08/17/24/fantasy-2049567_640.jpg"
          />
          {true ? (
            <Button onClick={handleOpenProfileModal} className="Edit-Profile-Button" sx={{ borderRadius: "20px",color:"white" }} variant="outlined">
              Edit Profile
            </Button>
          ) : (
            <Button sx={{ borderRadius: "20px" }} variant="outlined">
              Follow
            </Button>
          )}
        </div>
        <div className="p-4">
          <div>
            <h1 className="py-1 font-bold text-xl User-Name">{auth.user?.firstName +" "+ auth.user?.lastName}</h1>
            <p>@{auth.user?.firstName.toLowerCase()+"_"+ auth.user?.lastName.toLowerCase()}</p>
          </div>
          <div className="flex gap-5 items-center py-1">
            <span>30 Post</span>
            <span>55 Followers</span>
            <span>5 Followings</span>
          </div>
          <div className="Bio-text">
          ---Success is the sum of small efforts -repeated day in and day out----
          </div>
        </div>
        <section className="py-2">
          <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="wrapped label tabs example"
            >
              {tabs.map((item) => (
                <Tab  value={item.value} label={item.name} wrapped />
              ))}
            </Tabs>
          </Box>
          <div className="flex justify-center Tabs-Style">
            {value === "post" && post.userPosts ? (
              <div className="space-y-5 w-[70%] my-10">
                {post.userPosts.map((item) => (
                  <div  className="">
                    <PostCard item={item} />
                  </div>
                ))}
              </div>
            ) : value === "reels" && reel.userReels ? (
              <div   className="flex gap-2 flex-wrap  justify-center my-10 ">
                {reel.userReels.map((item ) => (
                  <ReelCard item={item}/>
                ))}
              </div>
            ) : value === "saved" && post.userPosts ? (
              <div className="space-y-5 w-[70%] my-10">
                {post.userPosts.map((item ) => (
                  <div  className="">
                    <PostCard item={item}/>
                  </div>
                ))}
              </div>
            ): (
              <div>Repost</div>
            )}
          </div>
        </section>
      </div>
      <section>
        <ProfileModal  open={open} handleClose={handleClose}/>
      </section>
    </Card>
  );
};

export default Profile;
