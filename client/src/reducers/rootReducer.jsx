import { combineReducers } from 'redux';
import firstName from './registration/firstNameReducer';
import lastName from './registration/lastNameReducer';
import email from './registration/emailReducer';
import username from './registration/usernameReducer';
import password from './registration/passwordReducer';
import rePassword from './registration/rePasswordReducer';
import isAuthenticated from '../reducers/authReducer';
import userInfo from './userInfoReducer';
import profileInfo from './profileReducer';
import postText from './posts/postTextReducer';
import rank from './posts/rankReducer';
import posts from './posts/getPostsReducer';
import showMenu from './showMenuReducer';
import getPosts from './getAllPostsReducer';

const rootReducer = combineReducers({
	firstName,
	lastName,
	email,
	username,
	password,
	rePassword,
	isAuthenticated,
	userInfo,
	profileInfo,
	postText,
	rank,
	posts,
	showMenu,
	getPosts,
});

export default rootReducer;
