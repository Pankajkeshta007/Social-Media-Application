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
import './postcard.css';
const PostCard = ({item}) => {
  const [showComments, setShowComments]=useState(false);
  const { auth}=useSelector(store=>store)

  const handleShowComment=()=>setShowComments(!showComments)

  const dispatch=useDispatch();

  const handleLikePost=()=>{
    dispatch(likePostAction(item.id))
  }
  const handleCreateComment=(content)=>{
    const reqData={
      postId:item.id,
      data:{
        content

      }
    }
    dispatch(createCommentAction(reqData))
  }
  return (
    <div data-aos="zoom-in" className=" Post-Card-Style">
    

    <CardHeader
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
      <CardMedia
        className='Image-Styling'
        component="img"
        height="100"
        image={item.image}
        alt="Paella dish"
      />

<CardContent>
        <Typography variant="body2" color="text.secondary">
          {item.caption}
        </Typography>
        
      </CardContent>

      <CardActions className='flex justify-between'disableSpacing>
        <div>
            <IconButton onClick={handleLikePost}>
                {isLikeByReqUser(auth.user?.id, item)?<FavoriteIcon/>:<FavoriteBorderIcon/>}
            </IconButton>
            <IconButton>
                {<ShareIcon/>}
            </IconButton>
            <IconButton onClick={handleShowComment}>
                {<ChatBubbleIcon/>}
            </IconButton>
        </div>
        <div>
            <IconButton>
            {true?<BookmarkIcon/>:<BookmarkBorderIcon/>}



            </IconButton>
        </div>
      </CardActions>
     { showComments && <section>
        <div className='flex items-center space-x-3 mx-3 my-5 '>

          <Avatar sx={{}}/>

          <input onKeyPress={(e)=>{
            if(e.key==="Enter"){
              handleCreateComment(e.target.value)
              console.log("enter pressed---",e.target.value)
            }
          }} className="w-full outline-none bg-transparent border border-[#3b4054] rounded-full px-5 py-2 " type="text" placeholder="write your comment..." />

        </div>
        <Divider/>
        <div className='mx-1 space-y-2 my-5 text-xs'>
            {item.comments?.map((comment)=> <div className='flex items-center space-x-5'>
              <Avatar sx={{width:"2rem", height:"2rem", fontSize:".8rem"}}>
                {comment.user?.firstName[0]}

              </Avatar>
              <p>{comment.content}</p>

            </div>)}

         

        </div>
      </section>}
      
    </div>
  )
}

export default PostCard
