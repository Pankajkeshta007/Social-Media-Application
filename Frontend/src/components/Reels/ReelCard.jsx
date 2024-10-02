import React, { useState } from 'react'
import { Card, Divider } from "@mui/material";
import { red } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CardMedia from '@mui/material/CardMedia';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useDispatch, useSelector } from 'react-redux';
import { createCommentAction, likePostAction } from '../../Redux/Post/post.action';
import { isLikeByReqUser } from '../../Utils/isLikeByReqUser';
import './reel.css';
const ReelCard = ({item}) => {
  const {reel, auth}=useSelector(store=>store)


  const dispatch=useDispatch();

  
 
  return (
    <div data-aos="zoom-in" className="space-y-5 Card-Styling">
    

    <CardHeader
     className='Reel-Header'
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {item.user?.firstName[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={item.user?.firstName+" "+item.user?.lastName}
        subheader={"@"+item.user?.firstName.toLowerCase()+"_"+item.user?.lastName.toLowerCase()}
      />
      {/* <Divider /> */}
      <CardMedia 
      className='Card-Reel-Styling'
        component="video"
        
        src={item.video}
        alt="Paella dish"
        controls
      />

<CardContent>
        <Typography variant="body2" color="text.secondary">
          {item.title}
        </Typography>
        
      </CardContent>

      
    
      
    </div>
  )
}

export default ReelCard
