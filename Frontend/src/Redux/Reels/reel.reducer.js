import { CREATE_REEL_FAILURE, CREATE_REEL_REQUEST, CREATE_REEL_SUCCESS, FETCH_USER_REELS_SUCCESS, GET_ALL_REEL_FAILURE, GET_ALL_REEL_REQUEST, GET_ALL_REEL_SUCCESS } from "./reel.actionType";

  const initialState = {
    reel: null,
    loading: false,
    error: null,
    reels: [],
    userReels: [],
    
  };
  
  export const reelReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_REEL_REQUEST:
      case GET_ALL_REEL_REQUEST:
        return { ...state, loading: false, error: null };
  
      case CREATE_REEL_SUCCESS:
        return {
          ...state,
          reel: action.payload,
        
          reels: [action.payload, ...state.reels ],
          loading: false,
          error: null,
        };
  
        case FETCH_USER_REELS_SUCCESS:
          return {...state,
            userReels:action.payload,
            loading:false,
            error:null

          };
  
      case GET_ALL_REEL_SUCCESS:
          return{
              ...state,
              reels:action.payload,
              loading:false,
              error:null
          }
      
     
  
      case CREATE_REEL_FAILURE:
      case GET_ALL_REEL_FAILURE:
          return{...state, error:action.payload, loading:false}
  
      default:
        return state;
    }
  };