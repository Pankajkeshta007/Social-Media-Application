import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./Auth/auth.reducer";
import { postReducer } from "./Post/post.reducer";
import { messageReducer } from "./Message/message.reducer";
import { reelReducer } from "./Reels/reel.reducer";
import { storyReducer } from "./Story/story.reducer";


const rootReducers=combineReducers({

auth:authReducer,
post:postReducer,
message:messageReducer,
reel:reelReducer,
story:storyReducer

})
export const store =legacy_createStore(rootReducers,applyMiddleware(thunk));