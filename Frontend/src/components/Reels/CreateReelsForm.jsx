import React, { useEffect, useState } from 'react'
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import ArticleIcon from "@mui/icons-material/Article";
import { Avatar, Card, IconButton, Input } from '@mui/material';
import CreateReelModal from './CreateReelModal';
import ReelCard from './ReelCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReelsAction } from '../../Redux/Reels/reel.action';


const CreateReelsForm = () => {

  const dispatch=useDispatch();
  const {reel}=useSelector(store=>store)

  const [openCreateReelModal, setOpenCreateReelModal] = useState(false);

  const handleCloseCreateReelModal = () => {
    setOpenCreateReelModal(false);
  };

  const handleOpenCreateReelMaodal = () => {
    setOpenCreateReelModal(true);
    console.log("open Reel modal...");
  };

  useEffect(() => {
    dispatch(getAllReelsAction());
  }, []);
  return (
    <div className='px-5'>
      <Card className="p-5 mt-5 px-5 space-y-5 space-x-3">
        <div className="flex justify-between space-x-8">
          <Avatar />
          <Input
            onClick={handleOpenCreateReelMaodal}
            readOnly
            className="outline-none w-[90%]  rounded-full px-5 bg-transparent border border-[#3b4054]  "
            type="text"
          />
        </div>
        <div className="flex justify-center space-x-9 mt-3">
          
          <div className="flex items-center">
            <IconButton color="white" onClick={handleOpenCreateReelMaodal}>
              <VideocamIcon />
            </IconButton>
            <span>video</span>
          </div>
         
        </div>
      </Card>
      <div className="mt-5 space-y-5">
        {reel.reels.map((item) => (
          <ReelCard item={item} />
        ))}
      </div>
      <div>
        <CreateReelModal
          handleClose={handleCloseCreateReelModal}
          open={openCreateReelModal}
        />
      </div>
      
    </div>
  )
}

export default CreateReelsForm
