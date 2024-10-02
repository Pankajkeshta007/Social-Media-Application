import { api } from "../../config/api"
import { CREATE_STORY_FAILURE, CREATE_STORY_REQUEST, CREATE_STORY_SUCCESS, DELETE_STORY, GET_ALL_STORY_FAILURE, GET_ALL_STORY_REQUEST, GET_ALL_STORY_SUCCESS } from "./story.actionType"

export const createStoryAction=(storyData)=>async(dispatch)=>{
    dispatch({type:CREATE_STORY_REQUEST})

    try{

        const {data}=await api.post('/api/story',storyData)
        dispatch({type:CREATE_STORY_SUCCESS,payload:data})
        console.log("created story",data)
    }catch(error)
    {
        console.log("error---",error)
        dispatch({type:CREATE_STORY_FAILURE,payload:error})

    }
}

export const getAllStoryAction = () => async(dispatch)=>{
    dispatch({type:GET_ALL_STORY_REQUEST})

    try{

        const {data}=await api.get("/api/stories")
        dispatch({type:GET_ALL_STORY_SUCCESS,payload:data})
        console.log("get all story",data)
    }catch(error)
    {
        console.log("error---",error)
        dispatch({type:GET_ALL_STORY_FAILURE,payload:error})

    }
}


export const deleteStoryAction = (storyId) => {
    return {
      type: DELETE_STORY,
      payload: storyId,
    };
  };