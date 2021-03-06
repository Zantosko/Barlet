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
import showMenu from './showMenuReducer';
import rating from './reviews/ratingReducer';
import reviewText from './reviews/reviewTextReducer';
import title from './reviews/titleReducer';

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
	showMenu,
	rating,
	reviewText,
	title,
});

export default rootReducer;
