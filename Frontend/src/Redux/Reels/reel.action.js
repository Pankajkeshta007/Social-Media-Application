import { api } from "../../config/api"
import { CREATE_REEL_FAILURE, CREATE_REEL_REQUEST, CREATE_REEL_SUCCESS, FETCH_USER_REELS_SUCCESS, GET_ALL_REEL_FAILURE, GET_ALL_REEL_REQUEST, GET_ALL_REEL_SUCCESS } from "./reel.actionType"

export const createReelAction=(reelData)=>async(dispatch)=>{
    dispatch({type:CREATE_REEL_REQUEST})

    try{

        const {data}=await api.post('/api/reels',reelData)
        dispatch({type:CREATE_REEL_SUCCESS,payload:data})
        console.log("created reel",data)
    }catch(error)
    {
        console.log("error---",error)
        dispatch({type:CREATE_REEL_FAILURE,payload:error})

    }
}

export const getAllReelsAction = () => async(dispatch)=>{
    dispatch({type:GET_ALL_REEL_REQUEST})

    try{

        const {data}=await api.get("/api/reels")
        dispatch({type:GET_ALL_REEL_SUCCESS,payload:data})
        console.log("get all reels",data)
    }catch(error)
    {
        console.log("error---",error)
        dispatch({type:GET_ALL_REEL_FAILURE,payload:error})

    }
}

export const fetchUserReelsSuccess = (reels) => ({
    type: FETCH_USER_REELS_SUCCESS,
    payload: reels,
  });