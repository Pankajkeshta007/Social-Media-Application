import React from "react";
import Avatar from "@mui/material/Avatar";
import './MiddlePart.css'

const StoryCircle = ({ story, onClick,userName }) => {
  return (
    <div className="story-circle" onClick={onClick} style={{ cursor: "pointer" }}>
      <Avatar className="Story-Circle" src={story?.image} alt={story?.captions} sx={{ width: "5rem", height: "5rem" }}/>
      <p className="user-name">{userName}</p>
    </div>
  );
};

export default StoryCircle;








// import React from "react";

// import Avatar from "@mui/material/Avatar";
// import { useSelector } from "react-redux";
// export const StoryCircle = () => {

//   const {auth}=useSelector(store=>store)
//   return (
//     <div>
//       <div className="flex flex-col items-center mr-2 cursor-pointer">
//         <Avatar
//           sx={{ width: "5rem", height: "5rem" }}
//           src="https://cdn.pixabay.com/photo/2024/01/29/20/40/cat-8540772_640.jpg"
//         ></Avatar>
//         <p>{auth.user.firstName.toLowerCase()+"_"+auth.user.lastName.toLowerCase()}</p>
//       </div>

      
//     </div>
//   );
// };

// export default StoryCircle;
