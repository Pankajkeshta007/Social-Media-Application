import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Formik, useFormik } from "formik";
import {
  Avatar,
  Backdrop,
  ButtonBase,
  CircularProgress,
  IconButton,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import { uploadToCloudnary } from "../../Utils/UploadToCloudniry";
import { useDispatch, useSelector } from "react-redux";
import { createPostAction } from "../../Redux/Post/post.action";
import StoryCard from "./StoryCard";
import StoryCircle from "../MiddlePart/StoryCircle";
import { createStoryAction, deleteStoryAction } from "../../Redux/Story/story.action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: ".6rem",
  outline: "none",
};
const CreateStoryModal = ({ handleCloseStory, handleOpenStory }) => {
  const [selectedImage, setSelectedImage] = useState();
  const [selectedVideo, setSelectedVideo] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [stories, setStories] = useState([]); // State to store created stories
  const [selectedStory, setSelectedStory] = useState(null); // State to track the selected story for displaying in card form

  // Your existing code... 

  const dispatch = useDispatch();

  const {auth} = useSelector(store=>store);

  const handleSelectImage = async(event) => {
    setIsLoading(true);
    const imageUrl = await uploadToCloudnary(event.target.files[0],"image");
    setSelectedImage(imageUrl);
    setIsLoading(false);
    formik.setFieldValue("image", imageUrl);
  };
  const handleSelectVideo = async(event) => {
    setIsLoading(true);
    const videoUrl = await uploadToCloudnary(event.target.files[0],"video");
    setSelectedVideo (videoUrl);
    setIsLoading(false);
    formik.setFieldValue("video", videoUrl);
  };
  const formik = useFormik({
    initialValues: {
      captions:"", 
      image:"",
      video:""
    },
    onSubmit:(values) => {
      console.log("formik values ", values);
      dispatch(createStoryAction(values));
      handleCreateStory(values);

      setTimeout(() => {
        deleteStory(values);
      }, 10 * 60 * 1000); // 10 minutes in milliseconds
    },
  });
  const deleteStory = (story) => {
    // Dispatch an action to delete the story from Redux store
    dispatch(deleteStoryAction(story.id)); 
  };
  const handleCreateStory = (values) => {
    const newStory = {
      captions: values.captions,
      image: values.image,
      video: values.video,
    };
    setStories([...stories, newStory]);
    setSelectedStory(newStory);
    handleCloseStory();
  };

 
  

 

  return (
    <Modal
      open={ handleOpenStory}
      onClose={handleCloseStory}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <div className="flex space-x-3 items-center">
              <Avatar />
              <div>
                <p className="font-bold text-lg">{auth.user.firstName+" "+auth.user.lastName}</p>
                <p className="text-sm">{"@"+auth.user.firstName.toLowerCase()+"_"+auth.user.lastName.toLowerCase()}</p>
              </div>
            </div>
            <textarea
              className="outline-none w-full mt-3 p-2 bg-transparent border border-[#3b4054] rounded-sm"
              placeholder="write caption..."
              name="captions"
              id=""
              rows="4"
              values={formik.values.captions}
              onChange={formik.handleChange}
            ></textarea>
            <div className="flex items-center space-x-5 mt-2">
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleSelectImage}
                  style={{ display: "none" }}
                  id="image-input"
                />
                <label htmlFor="image-input">
                  <IconButton color="white" component="span">
                    <ImageIcon />
                  </IconButton>
                </label>
                <span>Image</span>
              </div>

              <div>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleSelectVideo}
                  style={{ display: "none" }}
                  id="video-input"
                />
                <label htmlFor="video-input">
                  <IconButton color="white">
                    <VideocamIcon />
                  </IconButton>
                </label>
                <span>Video</span>
              </div>
            </div>
            {selectedImage && 
              <div>
                <img className=" h-[10rem]" src={selectedImage} alt="" />
              </div>
            }
            <div className="flex w-full justify-end">
              <Button
                variant="contained"
                type="submit"
                sx={{ borderRadius: "1.5rem" }}
              >
                
                Create
              </Button>
            </div>
          </div>
        </form>
        {/* <div className="flex space-x-2">
          {stories.map((story, index) => (
            <StoryCircle
              key={index}
              story={story}
              onClick={() => handleStoryClick(story)}
            />
          ))}
        </div> */}
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
          onClick={handleCloseStory}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

       
      </Box>
    </Modal>
  );
};

export default CreateStoryModal;