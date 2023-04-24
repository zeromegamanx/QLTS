import { combineReducers } from 'redux';
import postsReducer from '../reducer';

const rootReducer = combineReducers({
    posts: postsReducer,
});
export default rootReducer;