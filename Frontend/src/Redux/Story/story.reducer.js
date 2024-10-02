import { CREATE_STORY_FAILURE, CREATE_STORY_REQUEST, CREATE_STORY_SUCCESS, DELETE_STORY, GET_ALL_STORY_FAILURE, GET_ALL_STORY_REQUEST, GET_ALL_STORY_SUCCESS } from "./story.actionType";

  const initialState = {
    story: null,
    loading: false,
    error: null,
    stories: [],
  };
  
  export const storyReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_STORY_REQUEST:
      case GET_ALL_STORY_REQUEST:
        return { ...state, loading: false, error: null };
  
      case CREATE_STORY_SUCCESS:
        return {
          ...state,
          story: action.payload,
        
          stories: [action.payload, ...state.stories ],
          loading: false,
          error: null,
        };
  
     
  
      case GET_ALL_STORY_SUCCESS:
          return{
              ...state,
              stories:action.payload,
              loading:false,
              error:null
          }


          case DELETE_STORY:
            return {
              ...state,
              stories: state.stories.filter(story => story.id !== action.payload),
            };
      
      
  
      case CREATE_STORY_FAILURE:
      case GET_ALL_STORY_FAILURE:
          return{...state, error:action.payload, loading:false}
  
      default:
        return state;
    }
  };