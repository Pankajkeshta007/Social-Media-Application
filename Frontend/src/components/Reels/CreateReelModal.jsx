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
import { createReelAction } from "../../Redux/Reels/reel.action";

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
const CreateReelModal = ({ handleClose, open }) => {
  const [selectedImage, setSelectedImage] = useState();

  const [selectedVideo, setSelectedVideo] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const {auth} = useSelector(store=>store);

  const handleSelectVideo = async(event) => {
    setIsLoading(true);
    const imageUrl = await uploadToCloudnary(event.target.files[0],"video");
    setSelectedVideo(imageUrl);
    setIsLoading(false);
    formik.setFieldValue("video", imageUrl);
  };
  
  const handleSelect = async(event) => {
    console.log("handle Select videos")
    setIsLoading(true);
    const videoUrl = await uploadToCloudnary(event.target.files[0],"video");
    setSelectedVideo (videoUrl);
    setIsLoading(false);
    formik.setFieldValue("video", videoUrl);
  };
  const formik = useFormik({
    initialValues: {
      title:"", 
      video:""
    },
    onSubmit:(values) => {
      console.log("formik values ", values);
      dispatch(createReelAction(values));
    },
  });
  return (
    <Modal
      open={open}
      onClose={handleClose}
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
              name="title"
              id=""
              rows="4"
              values={formik.values.title}
              onChange={formik.handleChange}
            ></textarea>
            <div className="flex items-center space-x-5 mt-2">
            <div>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleSelectVideo}
                  style={{ display: "none" }}
                  id="image-input"
                />
                <label htmlFor="image-input">
                  <IconButton color="white" component="span">
                  <VideocamIcon />
                  </IconButton>
                </label>
                <span>Video</span>
              </div>
             

             
            </div>
            {selectedVideo && 
              <div>
                {/* <img className=" h-[10rem]" src={selectedVideo } alt="" /> */}
                <video className="h-[10rem]" controls>
                  <source src={selectedVideo} type="video/mp4" />
                  
                </video>
              </div>
            }
            <div className="flex w-full justify-end">
              <Button
                variant="contained"
                type="submit"
                sx={{ borderRadius: "1.5rem" }}
              >
                Post
              </Button>
            </div>
          </div>
        </form>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </Modal>
  );
};

export default CreateReelModal;