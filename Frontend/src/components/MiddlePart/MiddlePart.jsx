import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import StoryCircle from "./StoryCircle";
import ImageIcon from "@mui/icons-material/Image";
import { Card, Input } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import VideocamIcon from "@mui/icons-material/Videocam";
import ArticleIcon from "@mui/icons-material/Article";
import PostCard from "../Post/PostCard";
import CreatePostModal from "../CreatePost/CreatePostModal";
import { useDispatch, useSelector } from "react-redux";
import { getALlPostAction } from "../../Redux/Post/post.action";
import CreateStoryModal from "../CreateStory/CreateStoryModal";
import StoryCard from "../CreateStory/StoryCard";
import { getAllStoryAction } from "../../Redux/Story/story.action";

//const story = [11, 1, 1];
// const posts = [1, 1, 1, 1, 1];
const MiddlePart = () => {
  const dispatch = useDispatch();
  const { post, story,auth } = useSelector((store) => store);
  const [openCreatePostModal, setOpenCreatePostModal] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);

  const handleCloseCreatePostModal = () => {
    setOpenCreatePostModal(false);
  };

  const handleOpenCreatePostMaodal = () => {
    setOpenCreatePostModal(true);
    console.log("open post modal...");
  };

  const [openCreateStoryModal, setOpenCreateStoryModal] = useState(false);

  const handleOpenCreateStoryModal = () => {
    setOpenCreateStoryModal(true);
    console.log("open Story Modal");
  };

  const handleCloseCreateStoryModal = () => {
    setOpenCreateStoryModal(false);
  };
  useEffect(() => {
    dispatch(getALlPostAction());
  }, [post.newComment]);

  const handleStoryClick = (story) => {
    setSelectedStory(story);
  };

  const handleCloseCard = () => {
    setSelectedStory(null);
  };
  useEffect(() => {
    dispatch(getAllStoryAction());
  }, []);
  return (
    <div className="px-5">
      <div className="flex  items-center rounded-b-md p-3 mt-2 Story-Styling">
        <div className="flex flex-col items-center mr-2 cursor-pointer mt-4 mb-0"  onClick={handleOpenCreateStoryModal}>
          <Avatar
           
            sx={{ width: "5rem", height: "5rem" }}
            //src="https://cdn.pixabay.com/photo/2024/01/29/20/40/cat-8540772_640.jpg"
          >
            <AddIcon sx={{ fontSize: "3rem" }} />
          </Avatar>
          <p>New</p>
        </div>
        <div className="flex space-x-3 " >
          {story.stories.map((story, index) => (
            <StoryCircle
              key={index}
              story={story}
              userName={story.user.firstName.toLowerCase()+"..."}
              onClick={() => handleStoryClick(story)}
            />
          ))}
        </div>
        
      </div>
      {selectedStory && (
        <StoryCard story={selectedStory} onClose={handleCloseCard} />
      )}

      <Card className="p-3 mt-5">
        <div className="flex justify-between">
          <Avatar />
          <Input
            onClick={handleOpenCreatePostMaodal}
            readOnly
            className="outline-none w-[85%]  rounded-full px-5 bg-transparent border border-[#3b4054]  "
            type="text"
          />
        </div>
        <div className="flex justify-center space-x-11 mt-3">
          <div className="flex items-center">
            <IconButton color="white" onClick={handleOpenCreatePostMaodal}>
              <ImageIcon />
            </IconButton>
            <span>media</span>
          </div>
          <div className="flex items-center">
            <IconButton color="white" onClick={handleOpenCreatePostMaodal}>
              <VideocamIcon />
            </IconButton>
            <span>video</span>
          </div>
          <div className="flex items-center">
            <IconButton color="white" onClick={handleOpenCreatePostMaodal}>
              <ArticleIcon />
            </IconButton>
            <span>Article</span>
          </div>
        </div>
      </Card>
      <div className="mt-5 space-y-5">
        {post.posts.map((item) => (
          <PostCard item={item} />
        ))}
      </div>
      <div>
        <CreatePostModal
          handleClose={handleCloseCreatePostModal}
          open={openCreatePostModal}
        />
      </div>
      <div>
        <CreateStoryModal
          handleCloseStory={handleCloseCreateStoryModal}
          handleOpenStory={openCreateStoryModal}
        />
      </div>
    </div>
  );
};

export default MiddlePart;
